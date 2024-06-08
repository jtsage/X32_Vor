/*  __  ___________  __     _____  ____  
*   \ \/ /___ /___ \ \ \   / / _ \|  _ \ 
*    \  /  |_ \ __) | \ \ / / | | | |_) |
*    /  \ ___) / __/   \ V /| |_| |  _ < 
*   /_/\_\____/_____|___\_/  \___/|_| \_\
*   (c) 2024 J.T.Sage, ISC License
*/

// Main Module, run this

const dgram            = require('dgram')
const commandLineArgs  = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const x32              = require('./lib/x32_adapt.js')

const CLI_OPTIONS = [
	{ name: 'ip', type: String, multiple: false, defaultOption: true },
	{ name: 'keepAlive', type: Number, multiple: false, defaultValue: 5000 },
	{ name: 'listen', alias: 'l', type: String, multiple:true, defaultValue: ['cue', 'dca1', 'dca2', 'dca3', 'dca4', 'dca5', 'dca6', 'dca7', 'dca8']},
	{ name: 'port', alias: 'p', type: Number, multiple: false, defaultValue: 10023 },
	{ name: 'updateFrequency', type: Number, multiple: false, defaultValue: 1000 },
	{ name: 'verbose', alias: 'v', type: Boolean, defaultValue: true },
	{ name: 'vorPort', alias: 'o', type: Number, defaultValue: 3333 },
	{ name: 'vorIP', type: String, defaultValue: '127.0.0.1' },
	{ name: 'help', type: Boolean, defaultValue: false },
]
const CLI_HELP = [
	{
		header: 'X32/M32 Vor Adapter',
		content: 'Make your X32 talk to Vor'
	},
	{
		header: 'Options',
		optionList: [
			{
				defaultOption : true,
				description   : 'IP Address of the X32 [required]',
				name          : 'ip',
				type          : String,
				typeLabel     : '{underline address}',
			},
			{
				alias       : 'p',
				description : 'Port of the X32 [10023]',
				name        : 'port',
				type        : Number,
				typeLabel   : '{underline port}',
			},
			{
				alias       : 'o',
				description : 'Port for Vor [3333]',
				name        : 'vorPort',
				type        : Number,
				typeLabel   : '{underline port}',
			},
			{
				description : 'IP for Vor [127.0.0.1]',
				name        : 'vorIP',
				type        : String,
				typeLabel   : '{underline address}',
			},
			{
				alias       : 'l',
				description : 'Updates to populate to Vor. Options: [cue, dca1 - dca8, bus01 - bus16]. Default is [cue, dca1 - dca8]',
				multiple    : true,
				name        : 'listen',
				type        : String,
				typeLabel   : '{underline item} ...',
			},
			{
				description : 'Updates frequency in ms [1000ms]',
				name        : 'updateFrequency',
				type        : Number,
				typeLabel   : '{underline ms}',
			},
			{
				description : 'Print this usage guide.',
				name        : 'help',
				type        : Boolean
			},
			{
				alias       : 'v',
				description : 'Print lots of debug data',
				name        : 'verbose',
				type        : Boolean
			}
		]
	}
]

const options = commandLineArgs(CLI_OPTIONS)
const usage   = commandLineUsage(CLI_HELP)

if ( options.help ) {
	console.log(usage)
	process.exit(0)
}
if ( !options.ip ) {
	console.error('ERROR :: IP Address of X32 Required')
	console.log(usage)
	process.exit(1)
}
if ( options.verbose ) {
	console.log('Current Options::')
	console.log(options)
	setInterval(() => { console.log(CURRENT_STATE) }, 2500)
}

const CURRENT_STATE = x32.getStateMap()
const START_MAP     = x32.getNameMap()

console.log(CURRENT_STATE)
const x32Socket = dgram.createSocket({type: 'udp4', reuseAddr : true})
const vorSocket = dgram.createSocket({type: 'udp4', reuseAddr : true})

x32Socket.on('message', processFromX32)
x32Socket.on('error', (err) => {
	console.error(`x32 listener error:\n${err.stack}`)
	x32Socket.close()
 })
 x32Socket.on('listening', () => {
	const address = x32Socket.address()
	console.log(`listening to X32 on ${address.address}:${address.port}`)
})
x32Socket.bind(options.port)

getInitialData()

const x32Ping_xr = setInterval(() => {
	// Keeps the /xremote command alive
	sendToX32(x32.xRemote)
	if ( options.verbose ) { console.log('pinging x32...')}
}, options.keepAlive)

const x32Ping_sd = setInterval(() => {
	// Refreshes the cue list
	sendToX32(x32.showData)
	if ( options.verbose ) { console.log('pinging x32 show data...')}
}, options.keepAlive * 10 )

// Update VOR
const VorPing = setInterval(updateVor, options.updateFrequency)


/* -=-=-=-=-=-=-
Worker Functions
-=-=-=-=-=-=- */

// Get initial data from X32 (otherwise no update until change)
function getInitialData() {
	for ( thisItem of options.listen ) {
		if ( Object.hasOwn(START_MAP, thisItem) ) {
			for ( const oscMsg of START_MAP[thisItem] ) {
				sendToX32(oscMsg)
			}
		}
	}
	sendToX32(x32.showData)
	sendToX32(x32.xRemote)
}

// Send an update to VOR
function updateVor() {
	for ( thisItem of options.listen ) {
		switch (thisItem) {
			case 'cue' :
				sendToVor(x32.oscMessage('/currentCue', CURRENT_STATE.cue_list?.[CURRENT_STATE.current_cue]?.[0] ?? '0.0.0', CURRENT_STATE.cue_list?.[CURRENT_STATE.current_cue]?.[1] ?? ''))
				break;
			case 'dca1' :
			case 'dca2' :
			case 'dca3' :
			case 'dca4' :
			case 'dca5' :
			case 'dca6' :
			case 'dca7' :
			case 'dca8' : {
				const dcaNumber = thisItem.substring(thisItem.length - 1)
				const dcaState  = CURRENT_STATE.dca[dcaNumber]
				const dcaName   = dcaState[2] === '' ? thisItem.toUpperCase() : dcaState[2]
				sendToVor(x32.oscMessage(`/dca/${dcaNumber}`, dcaState[0], dcaState[1], dcaName))
				break;
			}
			case 'bus01' :
			case 'bus02' :
			case 'bus03' :
			case 'bus04' :
			case 'bus05' :
			case 'bus06' :
			case 'bus07' :
			case 'bus08' :
			case 'bus09' :
			case 'bus10' :
			case 'bus11' :
			case 'bus12' :
			case 'bus13' :
			case 'bus14' :
			case 'bus15' :
			case 'bus16' : {
				const busNumber = thisItem.substring(thisItem.length - 2)
				const busState  = CURRENT_STATE.bus[parseInt(busNumber, 10)]
				const busName   = busState[2] === '' ? thisItem.toUpperCase() : busState[2]
				sendToVor(x32.oscMessage(`/bus/${busNumber}`, busState[0], busState[1], busName))
				break;
			}
			default :
				console.log('NOTE: invalid listener specified at run!', thisItem)

		}
	}
}

// Send a packet to the X32
function sendToX32(data) {
	x32Socket.send(data, 0, data.length, options.port, options.ip)
}

// Send a packet to VOR
function sendToVor(data) {
	vorSocket.send(data, 0, data.length, options.vorPort, options.vorIP)
}

// Process packet from the X32
function processFromX32(msg, rinfo) {
	try {
		const thisMessage = x32.decode(msg)
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
			console.log('Unhandled Message', thisMessage)
		}
	} catch (err) {
		console.log(`invalid OSC packet ${options.verbose ? ` :: ${err}` : '' }`);
	}
}
