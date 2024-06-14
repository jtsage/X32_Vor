/*  __  ___________  __     _____  ____  
*   \ \/ /___ /___ \ \ \   / / _ \|  _ \ 
*    \  /  |_ \ __) | \ \ / / | | | |_) |
*    /  \ ___) / __/   \ V /| |_| |  _ < 
*   /_/\_\____/_____|___\_/  \___/|_| \_\
*   (c) 2024 J.T.Sage, ISC License
*/

// Main Module, run this

const dgram            = require('node:dgram')
const {parseArgs}      = require('node:util')
const {x32State}       = require('./lib/state_lib.js')
const {winLib}         = require('./lib/window_lib.js')
const osc              = require('simple-osc-lib')
const osc_x32          = require('simple-osc-lib/x32.js')
const ansi             = require('ansi')

const cursor = ansi(process.stdout)

/* eslint-disable sort-keys */
const CLI_OPT_LIST = {
	'debug'      : { type : 'boolean', short : 'd', default : false },
	'help'       : { type : 'boolean', short : 'h', default : false },
	'ip'         : { type : 'string',  short : 'i', default : '' },
	'keepAlive'  : { type : 'string',               default : '5000' },
	'listen'     : { type : 'string',  short : 'l', default : ['cue', 'dca'], multiple : true },
	'port'       : { type : 'string',  short : 'p', default : '10023' },
	'verbose'    : { type : 'boolean', short : 'v', default : false },
	'vor-freq'   : { type : 'string',               default : '100'  },
	'vor-ip'     : { type : 'string',               default : '127.0.0.1' },
	'vor-jitter' : { type : 'string',               default : '50' },
	'vor-port'   : { type : 'string',  short : 'o', default : '3333' },
}
/* eslint-enable sort-keys */

const VALID_LISTEN = new Set([
	'cue', 'dca1', 'dca2', 'dca3', 'dca4',
	'dca5', 'dca6', 'dca7', 'dca8', 'bus01',
	'bus02', 'bus03', 'bus04', 'bus05', 'bus06',
	'bus07', 'bus08', 'bus09', 'bus10', 'bus11',
	'bus12', 'bus13', 'bus14', 'bus15', 'bus16'
])

const options = prepArguments()

const x32Pre = new osc_x32.x32PreProcessor({
	activeNodeTypes : [
		'busConfig',  'busMix',
		'cue',        'cueCurrent',
		'dcaConfig',  'dcaMix',
		'scene',      'show',
		'showMode',   'snippet'
	],
	activeRegularTypes : [
		'busLevel',  'busMute',
		'busName',   'cueCurrent',
		'dcaLevel',  'dcaMute',
		'dcaName',   'showMode'
	],
})

const oscX32 = new osc.simpleOscLib({
	strictMode : true,
	preprocessor : (msg) => x32Pre.readMessage(msg),
})

const X32_STATE   = new x32State(options, null)
const thisWindow  = new winLib(X32_STATE, cursor)

if ( ! options.noGUI ) {
	thisWindow.doSetupAndClear()
	thisWindow.paint()

	setInterval(() => { thisWindow.paint() }, 1000)
}

const x32Socket = dgram.createSocket({type : 'udp4', reuseAddr : true})
const vorSocket = dgram.createSocket({type : 'udp4', reuseAddr : true})

x32Socket.on('message', processFromX32)
x32Socket.on('error', (err) => {
	X32_STATE.addMsg(`x32 listener error:\n${err.stack}`)
	x32Socket.close()
})
x32Socket.on('listening', () => {
	const address = x32Socket.address()
	X32_STATE.addMsg(`listening to X32 replies on ${address.address}:${address.port}`)
})
x32Socket.bind(options.port)

sendToX32(X32_STATE.oscFullState())

// Keeps the /xremote command alive every keepAlive
setInterval(() => {
	sendToX32(X32_STATE.oscXRemote())
	X32_STATE.addMsg('pinging x32...', true)
}, options.keepAlive)

// Refreshes the cue list and all data every keepAlive x 10
setInterval(() => {
	sendToX32(X32_STATE.oscFullState())
	X32_STATE.addMsg('pinging x32 show data...', true)
}, options.keepAlive * 10 )

// Update VOR
setInterval(sendToVor, options.vorFreq)


/* -=-=-=-=-=-=-
Worker Functions
-=-=-=-=-=-=- */

// Send a packet to the X32
function sendToX32(messageList) {
	for ( const thisMessage of messageList ) {
		const data = oscX32.buildMessage(thisMessage)
		x32Socket.send(data, 0, data.length, options.port, options.ip)
	}
}

// Send a packet to VOR
function sendToVor() {
	const messageList = X32_STATE.vorUpdate()
	if ( messageList.length !== 0 ) {
		const data = oscX32.buildBundle({
			timetag  : oscX32.getTimeTagBufferFromDelta(options.vorJitter / 1000),
			elements : messageList,
		})
		X32_STATE.last_packet_size = data.length
		vorSocket.send(data, 0, data.length, options.vorPort, options.vorIP)
	}
}

// Process packet from the X32
function processFromX32(msg, _rinfo) {
	try {
		try {
			const oscMessage = oscX32.readMessage(msg)
			if ( options.debug ) {
				X32_STATE.addMsg(`${oscMessage.wasProcessed.toString().padEnd(6, ' ')}${oscX32.printableBuffer(msg)}`, true)
			}
			try {
				if ( ! oscMessage.wasProcessed ) { return }

				X32_STATE.processState(oscMessage)
			} catch (err) {
				X32_STATE.addMsg(`bad OSC handling :: ${oscMessage} :: ${err}`)
			}
		} catch (err) {
			X32_STATE.addMsg(`bad OSC decode :: ${oscX32.printableBuffer(msg)} :: ${err}`)
		}
	} catch (err) {
		X32_STATE.addMsg(`invalid OSC packet :: ${err}`, false)
	}
}

function prepArguments() {
	const { values, positionals } = parseArgs({options : CLI_OPT_LIST, allowPositionals : true})

	if ( values.help ) { printUsage(); process.exit(0) }
	if ( values.ip === '' && positionals.length !== 1 ) { printUsage(); printError('Listen IP Address Required'); process.exit(1) }

	const newOptions = {
		debug     : values.debug,
		ip        : values.ip === '' ? positionals[0] : values.ip,
		keepAlive : parseInt(values.keepAlive),
		port      : parseInt(values.port),
		verbose   : values.verbose,
		vorFreq   : parseInt(values['vor-freq']),
		vorIP     : values['vor-ip'],
		vorJitter : parseInt(values['vor-jitter']),
		vorPort   : parseInt(values['vor-port']),
	}

	newOptions.listen = new Set(values.listen)

	if ( newOptions.listen.has('dca') ) {
		newOptions.listen.delete('dca')
		for ( let i = 1; i <= 8; i++ ) { newOptions.listen.add(`dca${i}`) }
	}

	if ( newOptions.listen.has('bus') ) {
		newOptions.listen.delete('bus')
		for ( let i = 1; i <= 9; i++ ) { newOptions.listen.add(`bus0${i}`) }
		for ( let i = 10; i <= 16; i++ ) { newOptions.listen.add(`bus${i}`) }
	}

	for ( const thisListenItem of newOptions.listen ) {
		if ( ! VALID_LISTEN.has(thisListenItem) ) {
			printUsage()
			printError('Invalid listener specified')
			process.exit(1)
		}
	}

	return newOptions
}

function printError(text) {
	cursor.bold().red().write(`ERROR :: ${text}\n`).reset()
}

function printUsage() {
	const R = '\u001B[0m'
	const B = '\u001B[1m'
	const I = '\u001B[3m'
	const U = '\u001B[4m'
	
	const CLI_HELP = [
		`${B}Make your X32 talk to Vor`, '',
		'  X32/M32 Vor Adapter', '',
		`${B}Synopsis`, '',
		`  $ npm start [${B}--verbose${R}] ${U}x32_address`,
		`  $ npm start [${B}--verbose${R}] ${B}--listen${R} cue ${B}-l${R} dca ${B}-l${R} bus ${B}--ip${R} ${U}x32_address`, '',
		`${B}X32 Configuration`, '',
		`  ${B}-i${R}, ${B}--ip${R} ${U}address${R}      IP Address of the X32`,
		`  ${B}-p${R}, ${B}--port${R} ${U}port${R}       Port of the X32                      ${I}[10023]`, '',
		`${B}Vor Configuration`, '',
		`  ${B}-l${R}, ${B}--listen${R} ${U}item${R}    Updates to populate to Vor.           ${I}[cue, dca]`, '',
		'                       Valid options:',
		`                         ${I}cue, dca, dca[1-8], bus, bus[01-16]`, '',
		`  ${B}--vor-ip${R} ${U}address${R}     IP to broadcast Vor packets to        ${I}[127.0.0.1]`,
		`  ${B}-o${R}, ${B}--vor-port${R} ${U}port${R}  Port to broadcast Vor packets to      ${I}[3333]`,
		`  ${B}--vor-freq${R} ${U}ms${R}        Vor update frequency in milliseconds  ${I}[100]`,
		`  ${B}--vor-jitter${R} ${U}ms${R}      Vor jitter correction in milliseconds ${I}[50]`, '',
		`${B}Options`, '',
		`  ${B}-v${R}, ${B}--verbose${R}        Show extra debugging messages`,
		`  ${B}-d${R}, ${B}--debug${R}          Show all incoming packets`,
		`  ${B}--no-gui${R}             Do not use full screen ANSI interface`,
		`  ${B}--help${R}               Print this usage guide`, '',
		`${I}(c)2024 J.T.Sage${R}  ${U}https://github.com/jtsage/X32_Vor`
	]
	for ( const thisLine of CLI_HELP ) {
		cursor.write(thisLine).write('\n').reset()
	}
}