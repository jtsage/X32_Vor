/*  __  ___________  __     _____  ____  
*   \ \/ /___ /___ \ \ \   / / _ \|  _ \ 
*    \  /  |_ \ __) | \ \ / / | | | |_) |
*    /  \ ___) / __/   \ V /| |_| |  _ < 
*   /_/\_\____/_____|___\_/  \___/|_| \_\
*   (c) 2024 J.T.Sage, ISC License
*/
/* eslint-disable no-console */

// Main Module, run this

const dgram            = require('node:dgram')
const commandLineArgs  = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const x32              = require('./lib/x32_adapt.js')
const {winLib}         = require('./lib/window_lib.js')

/* eslint-disable sort-keys */
const CLI_OPTIONS = [
	{ name : 'ip',                           type : String,  defaultOption : true },
	{ name : 'port',            alias : 'p', type : Number,  defaultValue : 10023 },
	{ name : 'keepAlive',                    type : Number,  defaultValue : 5000 },

	{ name : 'listen',          alias : 'l', type : String,  defaultValue : ['cue', 'dca'], multiple : true },

	{ name : 'vorJitter',                    type : Number,  defaultValue : 0.05 },
	{ name : 'vorFreq',                      type : Number,  defaultValue : 500 },
	{ name : 'vorPort',         alias : 'o', type : Number,  defaultValue : 3333 },
	{ name : 'vorIP',                        type : String,  defaultValue : '127.0.0.1' },

	{ name : 'help',            alias : 'h', type : Boolean, defaultValue : false },
	{ name : 'debug',           alias : 'd', type : Boolean, defaultValue : false },
	{ name : 'verbose',         alias : 'v', type : Boolean, defaultValue : false },
	{ name : 'noGUI',                        type : Boolean, defaultValue : false },
	{ name : 'testData',                     type : Boolean, defaultValue : false },
]
/* eslint-enable sort-keys */
const CLI_HELP = [
	{
		content : 'Make your X32 talk to Vor',
		header  : 'X32/M32 Vor Adapter',
	},
	{
		content : [
			'$ npm start [{bold --verbose}] {underline x32_address}',
			'$ npm start [{bold --verbose}] {bold --listen} cue dca bus {bold --ip} {underline x32_address}',
			'$ npm start {bold --help}'
		],
		header  : 'Synopsis',
	},
	{
		header     : 'X32 Configuration',
		optionList : [
			{
				defaultOption : true,
				description   : 'IP Address of the X32 {bold [required]}',
				name          : 'ip',
				type          : String,
				typeLabel     : '{underline address}',
			},
			{
				alias       : 'p',
				description : 'Port of the X32 {italic (10023)}',
				name        : 'port',
				type        : Number,
				typeLabel   : '{underline port}',
			},
		],
	},
	{
		header     : 'Vor Configuration',
		optionList : [
			{
				alias       : 'l',
				description : 'Updates to populate to Vor.\nItems: {italic cue, dca, dca1 - dca8, bus, bus01 - bus16}.\nDefault is {italic cue, dca}',
				multiple    : true,
				name        : 'listen',
				type        : String,
				typeLabel   : '{underline item} ...',
			},
			{
				description : 'IP for Vor {italic (127.0.0.1)}',
				name        : 'vorIP',
				type        : String,
				typeLabel   : '{underline address}',
			},
			{
				alias       : 'o',
				description : 'Port for Vor {italic (3333)}',
				name        : 'vorPort',
				type        : Number,
				typeLabel   : '{underline port}',
			},
			{
				description : 'Vor update frequency in milliseconds {italic (500ms)}',
				name        : 'vorFreq',
				type        : Number,
				typeLabel   : '{underline ms}',
			},
			{
				description : 'Vor jitter frequency in milliseconds {italic (50ms)}',
				name        : 'vorJitter',
				type        : Number,
				typeLabel   : '{underline ms}',
			},
		],
	},
	{
		header     : 'Options',
		optionList : [
			{
				description : 'Print this usage guide.',
				name        : 'help',
				type        : Boolean,
			},
			{
				alias       : 'v',
				description : 'Print lots of debug data',
				name        : 'verbose',
				type        : Boolean,
			},
			{
				alias       : 'd',
				description : 'Print all incoming X32 OSC messages (implies {bold --noGUI})',
				name        : 'debug',
				type        : Boolean,
			},
			{
				description : 'Suppress usual display',
				name        : 'noGUI',
				type        : Boolean,
			},
		],
	}
]
const VALID_LISTEN = [
	'cue', 'dca1', 'dca2', 'dca3', 'dca4',
	'dca5', 'dca6', 'dca7', 'dca8', 'bus01',
	'bus02', 'bus03', 'bus04', 'bus05', 'bus06',
	'bus07', 'bus08', 'bus09', 'bus10', 'bus11',
	'bus12', 'bus13', 'bus14', 'bus15', 'bus16'
]

const options = commandLineArgs(CLI_OPTIONS)
const usage   = commandLineUsage(CLI_HELP)

if ( options.help ) {
	console.log(usage)
	process.exit(0)
}
if ( options.debug ) {
	options.noGUI = true
}
if ( !options.ip ) {
	console.log('ERROR :: IP Address of X32 Required')
	console.log(usage)
	process.exit(1)
}

options.listen = [...new Set(options.listen)] // remove duplicates
if ( options.listen.includes('dca') ) {
	options.listen.splice(options.listen.indexOf('dca'), 1)
	options.listen.push('dca1', 'dca2', 'dca3', 'dca4', 'dca5', 'dca6', 'dca7', 'dca8')
}
if ( options.listen.includes('bus') ) {
	options.listen.splice(options.listen.indexOf('bus'), 1)
	options.listen.push('bus01', 'bus02', 'bus03', 'bus04', 'bus05', 'bus06', 'bus07', 'bus08', 'bus09', 'bus10', 'bus11', 'bus12', 'bus13', 'bus14', 'bus15', 'bus16')
}
options.listen = [...new Set(options.listen)] // remove duplicates, again

for ( const thisListenItem of options.listen ) {
	if ( ! VALID_LISTEN.includes(thisListenItem) ) {
		console.log(`ERROR :: Invalid Listener Specified :: ${thisListenItem}`)
		console.log(usage)
		process.exit(1)
	}
}

const CURRENT_STATE = x32.getStateMap()
const START_MAP     = x32.getNameMap()
const thisWindow    = new winLib(CURRENT_STATE)

if ( ! options.noGUI ) {
	thisWindow.doSetupAndClear()
	thisWindow.paint()

	setInterval(() => { thisWindow.paint() }, 1000)
	// process.on('SIGWINCH', () => {this.doSetupAndClear()})
}

const x32Socket = dgram.createSocket({type : 'udp4', reuseAddr : true})
const vorSocket = dgram.createSocket({type : 'udp4', reuseAddr : true})

x32Socket.on('message', processFromX32)
x32Socket.on('error', (err) => {
	printInfo(`x32 listener error:\n${err.stack}`, true)
	x32Socket.close()
})
x32Socket.on('listening', () => {
	const address = x32Socket.address()
	printInfo(`listening to X32 on ${address.address}:${address.port}`, true)
})
x32Socket.bind(options.port)

if ( options.testData ) {
	const {nodeLines} = require('./test_dev/fake_data.js')

	for ( let i = 1; i < nodeLines.length; i++ ) {
		const oscOperation = x32.processOSCMessage(nodeLines[i])
		try {
			processOSCOperation(oscOperation)
		} catch (err) {
			console.error(`Bad OSC Handling :: ${err}`)
		}
	}
}

getInitialData()

// Keeps the /xremote command alive every keepAlive
setInterval(() => {
	sendToX32(x32.xRemote)
	if ( options.verbose || !options.noGUI ) { printInfo('pinging x32...')}
}, options.keepAlive)

// Refreshes the cue list every keepAlive x 10
setInterval(() => {
	sendToX32(x32.showData)
	if ( options.verbose || !options.noGUI ) { printInfo('pinging x32 show data...')}
}, options.keepAlive * 10 )

// Update VOR
setInterval(updateVor, options.updateFrequency)


/* -=-=-=-=-=-=-
Worker Functions
-=-=-=-=-=-=- */

// Get initial data from X32 (otherwise no update until change)
function getInitialData() {
	for ( const thisItem of VALID_LISTEN ) {
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
	const updateBundle = {
		elements : [],
		timetag  : x32.now() + options.vorJitter/1000, // Offset for transit time
	}

	for ( const thisItem of options.listen ) {
		if ( thisItem === 'cue' ) {
			updateBundle.elements.push(x32.oscObject(
				'/currentCue',
				CURRENT_STATE.cue_list?.[CURRENT_STATE.current_cue]?.[0] ?? '0.0.0',
				CURRENT_STATE.cue_list?.[CURRENT_STATE.current_cue]?.[1] ?? ''
			))
		} else if ( thisItem.startsWith('dca') ) {
			const dcaNumber = parseInt(thisItem.substring(thisItem.length - 1), 10)
			const dcaState  = CURRENT_STATE.dca[dcaNumber]
			const dcaName   = dcaState[2] === '' ? thisItem.toUpperCase() : dcaState[2]
			updateBundle.elements.push(x32.oscObject(
				`/dca/${dcaNumber}`, dcaState[0], dcaState[1], dcaName
			))
		} else if ( thisItem.startsWith('bus') ) {
			const busNumber  = thisItem.substring(thisItem.length - 2)
			const busNumberI = parseInt(busNumber, 10)
			const busState  = CURRENT_STATE.bus[busNumberI]
			const busName   = busState[2] === '' ? thisItem.toUpperCase() : busState[2]
			updateBundle.elements.push(x32.oscObject(
				`/bus/${busNumber}`, busState[0], busState[1], busName
			))
		}
	}

	sendToVor(x32.toOSCBuffer(updateBundle))
}

// Send a packet to the X32
function sendToX32(data) {
	x32Socket.send(data, 0, data.length, options.port, options.ip)
}

// Send a packet to VOR
function sendToVor(data) {
	CURRENT_STATE.last_size = data.length
	vorSocket.send(data, 0, data.length, options.vorPort, options.vorIP)
}

// Process packet from the X32
function processFromX32(msg, _rinfo) {
	try {
		const oscMessage   = x32.decode(msg)
		if ( options.debug ) { console.log('From X32 :: ', oscMessage) }
		try {
			const oscOperation = x32.processOSCMessage(oscMessage)
			try {
				processOSCOperation(oscOperation)
			} catch (err) {
				printInfo(`bad OSC handling :: ${err}`)
			}
		} catch (err) {
			printInfo(`bad OSC decode :: ${err}`)
		}
	} catch (err) {
		printInfo(`invalid OSC packet :: ${err}`)
	}
}

function processOSCOperation (oscOperation) {
	if ( oscOperation.endpoint === null ) { return }

	if ( oscOperation.endpoint.type === 'cueListDirty' ) {
		sendToX32(x32.showData)
	} else if ( oscOperation.endpoint.type === 'rebuildCueList' ) {
		CURRENT_STATE.cue_list = []
	} else if ( oscOperation.args === null ) {
		// payload-less real operation - this shouldn't happen in production, ever.
		return
	} else if ( oscOperation.endpoint.type === 'currentCue' ) {
		CURRENT_STATE.current_cue = parseInt(oscOperation.args[0], 10)
	} else if ( oscOperation.endpoint.type === 'dca' ) {
		const faderIdx = oscOperation.endpoint.faderNumI
		switch ( oscOperation.endpoint.operation ) {
			case 'on' :
				CURRENT_STATE.dca[faderIdx][1] = oscOperation.args[0] ? 'ON' : 'OFF'
				break
			case 'config/name' :
				CURRENT_STATE.dca[faderIdx][2] = oscOperation.args[0] === '' ? `DCA${faderIdx}` : oscOperation.args[0]
				break
			case 'fader' :
				CURRENT_STATE.dca[faderIdx][0] = x32.float2Db(oscOperation.args[0])
				break
			case 'config' : {
				const newName = oscOperation.args[0].replace(/^"|"$/g, '')
				CURRENT_STATE.dca[faderIdx][2] = newName === '' ? `DCA${faderIdx}` : newName
				break
			}
			case 'mix' :
				CURRENT_STATE.dca[faderIdx][1] = oscOperation.args[0]
				CURRENT_STATE.dca[faderIdx][0] = `${oscOperation.args[1]} dB`
				break
			default :
				break
		}
	} else if ( oscOperation.endpoint.type === 'bus' ) {
		const faderIdx = oscOperation.endpoint.faderNumI
		switch ( oscOperation.endpoint.operation ) {
			case 'mix/on' :
				CURRENT_STATE.bus[faderIdx][1] = oscOperation.args[0] ? 'ON' : 'OFF'
				break
			case 'config/name' :
				CURRENT_STATE.bus[faderIdx][2] = oscOperation.args[0] === '' ? `MixBus ${oscOperation.endpoint.faderNum}` : oscOperation.args[0]
				break
			case 'mix/fader' :
				CURRENT_STATE.bus[faderIdx][0] = x32.float2Db(oscOperation.args[0])
				break
			case 'config' : {
				const newName = oscOperation.args[0].replace(/^"|"$/g, '')
				CURRENT_STATE.bus[faderIdx][2] = newName === '' ? `MixBus ${oscOperation.endpoint.faderNum}` : newName
				break
			}
			case 'mix' :
				CURRENT_STATE.bus[faderIdx][1] = oscOperation.args[0]
				CURRENT_STATE.bus[faderIdx][0] = `${oscOperation.args[1]} dB`
				break
			default :
				break
		}
	} else if ( oscOperation.endpoint.type === 'cue' ) {
		const cueParts = [...oscOperation.args[0]]
		let cueNum = cueParts.pop()
		cueNum = `${cueParts.pop()}.${cueNum}`
		cueNum = `${cueParts.join('')}.${cueNum}`
		const cueName = oscOperation.args[1].replace(/^"|"$/g, '')
		CURRENT_STATE.cue_list[oscOperation.endpoint.cueNum] = [cueNum, cueName]
	} else {
		printInfo('TODO:', oscOperation.endpoint.type)
	}
}


function printInfo(text, skipVerbose = false) {
	if ( options.noGUI && (options.verbose || skipVerbose) ) {
		console.log(text)
	} else {
		x32.addMsg(text.toString(), CURRENT_STATE)
	}
}