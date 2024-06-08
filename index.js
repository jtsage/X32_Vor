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
const Table            = require('table-layout')
const x32              = require('./lib/x32_adapt.js')

/* eslint-disable sort-keys */
const CLI_OPTIONS = [
	{ name : 'ip',                           type : String,  defaultOption : true },
	{ name : 'keepAlive',                    type : Number,  defaultValue : 5000 },
	{ name : 'listen',          alias : 'l', type : String,  defaultValue : ['cue', 'dca'], multiple : true },
	{ name : 'port',            alias : 'p', type : Number,  defaultValue : 10023 },
	{ name : 'updateFrequency',              type : Number,  defaultValue : 1000 },
	{ name : 'verbose',         alias : 'v', type : Boolean, defaultValue : false },
	{ name : 'vorPort',         alias : 'o', type : Number,  defaultValue : 3333 },
	{ name : 'vorIP',                        type : String,  defaultValue : '127.0.0.1' },
	{ name : 'help',                         type : Boolean, defaultValue : false },
	{ name : 'debug',           alias : 'd', type : Boolean, defaultValue : false },
]
/* eslint-enable sort-keys */
const CLI_HELP = [
	{
		content : 'Make your X32 talk to Vor',
		header  : 'X32/M32 Vor Adapter',
	},
	{
		header     : 'Options',
		optionList : [
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
				description : 'Updates to populate to Vor. Options: [cue, dca, dca1 - dca8, bus, bus01 - bus16]. Default is [cue, dca (all)]',
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
				description : 'Print all incoming (X32) osc messages',
				name        : 'debug',
				type        : Boolean,
			},
		],
	}
]

const options = commandLineArgs(CLI_OPTIONS)
const usage   = commandLineUsage(CLI_HELP)

if ( options.help ) {
	console.log(usage)
	process.exit(0)
}
if ( !options.ip ) {
	console.log('ERROR :: IP Address of X32 Required')
	console.log(usage)
	process.exit(1)
}
options.listen = [...new Set(options.listen)]
if ( options.listen.includes('dca') ) {
	options.listen.splice(options.listen.indexOf('dca'), 1)
	options.listen.push('dca1', 'dca2', 'dca3', 'dca4', 'dca5', 'dca6', 'dca7', 'dca8')
}
if ( options.listen.includes('bus') ) {
	options.listen.splice(options.listen.indexOf('bus'), 1)
	options.listen.push('bus01', 'bus02', 'bus03', 'bus04', 'bus05', 'bus06', 'bus07', 'bus08', 'bus09', 'bus10', 'bus11', 'bus12', 'bus13', 'bus14', 'bus15', 'bus16')
}
options.listen = [...new Set(options.listen)]
if ( options.verbose ) {
	console.log('Current Options:')
	console.log(options)
	setInterval(printState, 2500)
}


const CURRENT_STATE = x32.getStateMap()
const START_MAP     = x32.getNameMap()

const x32Socket = dgram.createSocket({type : 'udp4', reuseAddr : true})
const vorSocket = dgram.createSocket({type : 'udp4', reuseAddr : true})

x32Socket.on('message', processFromX32)
x32Socket.on('error', (err) => {
	console.log(`x32 listener error:\n${err.stack}`)
	x32Socket.close()
})
x32Socket.on('listening', () => {
	const address = x32Socket.address()
	console.log(`listening to X32 on ${address.address}:${address.port}`)
})
x32Socket.bind(options.port)

getInitialData()

setInterval(() => {
	// Keeps the /xremote command alive
	sendToX32(x32.xRemote)
	if ( options.verbose ) { console.log('pinging x32...')}
}, options.keepAlive)

setInterval(() => {
	// Refreshes the cue list
	sendToX32(x32.showData)
	if ( options.verbose ) { console.log('pinging x32 show data...')}
}, options.keepAlive * 10 )

// Update VOR
setInterval(updateVor, options.updateFrequency)


/* -=-=-=-=-=-=-
Worker Functions
-=-=-=-=-=-=- */

// Get initial data from X32 (otherwise no update until change)
function getInitialData() {
	for ( const thisItem of options.listen ) {
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
	for ( const thisItem of options.listen ) {
		switch (thisItem) {
			case 'cue' :
				sendToVor(x32.oscMessage('/currentCue', CURRENT_STATE.cue_list?.[CURRENT_STATE.current_cue]?.[0] ?? '0.0.0', CURRENT_STATE.cue_list?.[CURRENT_STATE.current_cue]?.[1] ?? ''))
				break
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
				break
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
				break
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
function processFromX32(msg, _rinfo) {
	try {
		const oscMessage   = x32.decode(msg)
		if ( options.debug ) { console.log('From X32 :: ', oscMessage) }
		try {
			const oscOperation = x32.processOSCMessage(oscMessage)

			try {
				processOSCOperation(oscOperation)
			} catch (err) {
				console.log(`bad OSC handling ${options.verbose ? ` :: ${err}` : '' }`)
			}
		} catch (err) {
			console.log(`bad OSC decode ${options.verbose ? ` :: ${err}` : '' }`)
			if ( options.verbose ) { console.log(oscMessage) }
		}
	} catch (err) {
		console.log(`invalid OSC packet ${options.verbose ? ` :: ${err}` : '' }`)
		if ( options.verbose ) { console.log(msg) }
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
		console.log('TODO:', oscOperation.endpoint.type)
	}
}


function printState() {
	const lineBreak = '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n'
	process.stdout.write(lineBreak)
	process.stdout.write(`Adapter Current State : ${new Date().toLocaleString()}\n`)
	process.stdout.write(lineBreak)
	process.stdout.write(`Cue List [ current : ${CURRENT_STATE.current_cue} ]\n`)
	process.stdout.write(new Table(CURRENT_STATE.cue_list, { maxWidth : 79 }).toString())
	
	const dcaList = [[], [], [], []]
	for ( let i = 1; i <= 4; i++ ) {
		dcaList[0].push(`[${i}] ${CURRENT_STATE.dca[i][2]}`)
		dcaList[1].push(`  ${CURRENT_STATE.dca[i][1]} : ${CURRENT_STATE.dca[i][0]}`)
		dcaList[2].push(`[${i+4}]  ${CURRENT_STATE.dca[i+4][2]}`)
		dcaList[3].push(`  ${CURRENT_STATE.dca[i+4][1]} : ${CURRENT_STATE.dca[i+4][0]}`)
	}
	process.stdout.write(lineBreak)
	process.stdout.write(new Table(dcaList, { maxWidth : 80, padding : { left : '| ', right : ' |'}}).toString())

	const busList = [[], [], [], [], [], [], [], []]
	for ( let i = 1; i <= 4; i++ ) {
		busList[0].push(`[${i}] ${CURRENT_STATE.bus[i][2]}`)
		busList[1].push(`  ${CURRENT_STATE.bus[i][1]} : ${CURRENT_STATE.bus[i][0]}`)
		busList[2].push(`[${i+4}]  ${CURRENT_STATE.bus[i+4][2]}`)
		busList[3].push(`  ${CURRENT_STATE.bus[i+4][1]} : ${CURRENT_STATE.bus[i+4][0]}`)
		busList[4].push(`[${i+8}]  ${CURRENT_STATE.bus[i+8][2]}`)
		busList[5].push(`  ${CURRENT_STATE.bus[i+8][1]} : ${CURRENT_STATE.bus[i+8][0]}`)
		busList[6].push(`[${i+12}]  ${CURRENT_STATE.bus[i+12][2]}`)
		busList[7].push(`  ${CURRENT_STATE.bus[i+12][1]} : ${CURRENT_STATE.bus[i+12][0]}`)
	}
	process.stdout.write(lineBreak)
	process.stdout.write(new Table(busList, { maxWidth : 80, padding : { left : '| ', right : ' |'}}).toString())
	process.stdout.write(lineBreak)
}