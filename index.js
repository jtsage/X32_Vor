const osc             = require('osc-min')
const dgram           = require('dgram')
const commandLineArgs = require('command-line-args')

const UPDATE_FROM_X32 = 20
const X_REMOTE        = osc.toBuffer({ address: "/xremote" })
const SHOW_DUMP       = osc.toBuffer({ address: "/showdump" })

const CURRENT_STATE   = {
	cue_list    : [],
	current_cue : 0,
	dca : [
		null,
		[0, 0, ''],
		[0, 0, ''],
		[0, 0, ''],
		[0, 0, ''],
		[0, 0, ''],
		[0, 0, ''],
		[0, 0, ''],
		[0, 0, ''],
	]
}

const CLI_OPTIONS = [
	{ name: 'verbose', alias: 'v', type: Boolean, defaultValue: true },
	{ name: 'port', type: Number, multiple: false, defaultValue: 10023 },
	{ name: 'ip', type: String, multiple: false, defaultOption: true },
	{ name: 'keepAlive', type: Number, multiple: false, defaultValue: 5000 },
	// { name: 'updateFrequency', type: Number, multiple: false, defaultValue: 1000 },
]

const options = commandLineArgs(CLI_OPTIONS)

sock = dgram.createSocket("udp4", function(msg, rinfo) {
	try {
		const thisMessage = decode(msg)
		if ( thisMessage[0].startsWith('/dca') ) {
			const msgParts = thisMessage[0].split('/')
			const dcaNumber = parseInt(msgParts[2], 10)
			if ( msgParts[3] === "fader" ) {
				CURRENT_STATE.dca[dcaNumber][0] = levelToDB(thisMessage[1])
			} else if ( msgParts[3] === "config" && msgParts[4] === "name" ) {
				CURRENT_STATE.dca[dcaNumber][2] = thisMessage[1]
			} else if ( msgParts[3] === "on" ) {
				CURRENT_STATE.dca[dcaNumber][1] = thisMessage[1]
			}
		} else if ( thisMessage[0] === 'node' ) {
			const msgParts = thisMessage[1].split(' ')
			if ( msgParts[0].startsWith('/-show/showfile/show') ) {
				CURRENT_STATE.cue_list = []
			} else if ( msgParts[0].includes('/cue/') ) {
				const cueNum  = msgParts[1].split('').join('.')
				const cueName = msgParts[2]
				const cueIdx  = parseInt(msgParts[0].split('/')[4],10)
				CURRENT_STATE.cue_list[cueIdx] = [cueNum, cueName]
			}
		} else if ( thisMessage[0] === '/-show/prepos/current' ) {
			CURRENT_STATE.current_cue = thisMessage[1]
		} else {
			// console.log('Unhandled Message', thisMessage)
		}
	} catch (err) {
		console.log(`invalid OSC packet ${options.verbose ? ` :: ${err}` : '' }`);
	}
});

sock.bind(options.port);

getOSCSub = (address) => {
	return osc.toBuffer({
		address: "/subscribe",
		args: [
			{
				type: "string",
				value: address,
			},
			{ type : "integer", value : UPDATE_FROM_X32 }
		]
	});
}

getDCABuffers = (dcaNumber) => {
	return [
		getOSCSub(`/dca/${dcaNumber}/on`),
		getOSCSub(`/dca/${dcaNumber}/fader`),
		getOSCSub(`/dca/${dcaNumber}/config/name`),
	]
}

startMonitor = function() {
	for ( var dcaNum = 1; dcaNum <= 8; dcaNum++ ) {
		for ( const monPart of getDCABuffers(dcaNum)) {
			sock.send(monPart, 0, monPart.length, options.port, options.ip)
		}
	}
	sock.send(X_REMOTE, 0, X_REMOTE.length, options.port, options.ip)

	console.log('starting X32Vor Adapter')
};

function sendHeartbeat() {
	const buf = osc.toBuffer({ address: "/renew" });
	if ( options.verbose ) { console.log('pinging') }
	sock.send(X_REMOTE, 0, X_REMOTE.length, options.port, options.ip)
	sock.send(buf, 0, buf.length, options.port, options.ip)
}

function sendDumper() {
	if ( options.verbose ) { console.log('pinging cue list') }
	sock.send(SHOW_DUMP, 0, SHOW_DUMP.length, options.port, options.ip)
}

startMonitor()
sendDumper()
setInterval(sendHeartbeat, options.keepAlive);
setInterval(sendDumper, options.keepAlive * 60);

if ( options.verbose ) {
	setInterval(() => { console.log(CURRENT_STATE) }, 2500)
}

function levelToDB(f) {
	return _levelToDB(f).toFixed(1)
}
function _levelToDB(f) {
	if      (f >= 0.5)    { return f * 40. - 30. }
 	else if (f >= 0.25)   { return f * 80. - 50. }
 	else if (f >= 0.0625) { return f * 160. - 70. }
 	else if (f >= 0.0)    { return f * 480. - 90. }
	return f
}

function sanitizeMessage(decoded) {
	const message = []
	message.push(decoded.address)
	decoded.args.forEach(arg => {
		message.push(arg.value)
	})
	return message
}

function sanitizeBundle(decoded) {
	decoded.elements = decoded.elements.map(element => {
		if (element.oscType === 'bundle')       { return sanitizeBundle(element) }
		else if (element.oscType === 'message') { return sanitizeMessage(element) }
	})
	return decoded
}

function decode(data) {
	const decoded = osc.fromBuffer(data)
	if (decoded.oscType === 'bundle') {
		return sanitizeBundle(decoded)
	} else if (decoded.oscType === 'message') {
		return sanitizeMessage(decoded)
	} else {
		throw new Error ('Malformed Packet')
	}
}