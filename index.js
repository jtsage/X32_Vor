/*  __  ___________  __     _____  ____  
*   \ \/ /___ /___ \ \ \   / / _ \|  _ \ 
*    \  /  |_ \ __) | \ \ / / | | | |_) |
*    /  \ ___) / __/   \ V /| |_| |  _ < 
*   /_/\_\____/_____|___\_/  \___/|_| \_\
*   (c) 2024 J.T.Sage, ISC License
*/

// Main Module, run this

const dgram             = require('node:dgram')
const path              = require('node:path')
const fs                = require('node:fs')
const {parseArgs}       = require('node:util')
const {x32State}        = require('./lib/state_lib.js')
const {winLib}          = require('./lib/window_lib.js')
const {defaultSettings} = require('./lib/default_settings.js')
const osc               = require('simple-osc-lib')
const osc_x32           = require('simple-osc-lib/x32.js')
const ansi              = require('ansi')

const cursor = ansi(process.stdout)

const CLI_OPT_LIST = {
	'help'       : { type : 'boolean', short : 'h', default : false },
	'no-gui'     : { type : 'boolean', short : 't' },

	'ip'         : { type : 'string',  short : 'i'},
	'vor-ip'     : { type : 'string',  short : 'o'},
	'vor-port'   : { type : 'string',  short : 'p'},

	'config'     : { type : 'string',  short : 'c'},
	'write'      : { type : 'string',  short : 'w'},
}

const VALID_LISTEN = new Set([
	'cue', 'dca1', 'dca2', 'dca3', 'dca4',
	'dca5', 'dca6', 'dca7', 'dca8', 'bus01',
	'bus02', 'bus03', 'bus04', 'bus05', 'bus06',
	'bus07', 'bus08', 'bus09', 'bus10', 'bus11',
	'bus12', 'bus13', 'bus14', 'bus15', 'bus16'
])

const options = prepArguments()
const x32MessageQueue = []

const x32Pre = new osc_x32.x32PreProcessor(['show*', 'dca*', 'bus*'])

const oscX32 = new osc.simpleOscLib({
	strictMode   : true,
	preprocessor : (msg) => x32Pre.readMessage(msg),
})

const X32_STATE   = new x32State(options, null)
const thisWindow  = new winLib(X32_STATE, cursor)

if ( ! options.textOnlyMode ) {
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
x32Socket.bind(options.x32.port)

sendToX32(X32_STATE.oscFullState())

setInterval(() => {
	queueSendToX32()
}, options.x32.queueInterval)

// Keeps the /xremote command alive every keepAlive
setInterval(() => {
	sendToX32(X32_STATE.oscXRemote())
	X32_STATE.addMsg('pinging x32...', options.showMessages.pings)
}, options.x32.keepAlive)

// Refreshes the cue list and all data every keepAlive x 10
setInterval(() => {
	sendToX32(X32_STATE.oscFullState())
	X32_STATE.addMsg('pinging x32 show data...', options.showMessages.pings)
}, options.x32.keepShowAlive )

// Update VOR
setInterval(sendToVor, options.vor.frequency)


/* -=-=-=-=-=-=-
Worker Functions
-=-=-=-=-=-=- */



// queue a packet to the X32
function sendToX32(messageList) {
	x32MessageQueue.push(...messageList)
}

// process the X32 message queue
function queueSendToX32() {
	if ( x32MessageQueue.length === 0 ) { return }
	const thisMessage = x32MessageQueue.shift()
	const data = oscX32.buildMessage(thisMessage)
	
	x32Socket.send(data, 0, data.length, options.x32.port, options.x32.address)
}

// Send a packet to VOR
function sendToVor() {
	const messageList = X32_STATE.vorUpdate()
	if ( messageList.length !== 0 ) {
		try {
			const data = oscX32.buildBundle({
				timetag  : oscX32.getTimeTagBufferFromDelta(options.vor.jitter / 1000),
				elements : messageList,
			})
			X32_STATE.last_packet_size = data.length
			vorSocket.send(data, 0, data.length, options.vor.port, options.vor.address)
		} catch {
			X32_STATE.addMsg('inconsistent data, vor update not sent')
		}
	}
}

// Process packet from the X32
function processFromX32(msg, _rinfo) {
	try {
		try {
			const oscMessage = oscX32.readMessage(msg)
			if ( options.showMessages.oscReceived ) {
				X32_STATE.addMsg(`${oscMessage.wasProcessed.toString().padEnd(6, ' ')}${oscX32.printableBuffer(msg)}`)
			}
			try {
				if ( ! oscMessage.wasProcessed ) { return }

				X32_STATE.processState(oscMessage)
			} catch (err) {
				X32_STATE.addMsg(`bad OSC handling :: ${oscMessage} :: ${err}`, options.showMessages.oscErrors)
			}
		} catch (err) {
			X32_STATE.addMsg(`bad OSC decode :: ${oscX32.printableBuffer(msg)} :: ${err}`, options.showMessages.oscErrors)
		}
	} catch (err) {
		X32_STATE.addMsg(`invalid OSC packet :: ${err}`, options.showMessages.oscErrors)
	}
}

function normalizeConfigFile(value) {
	if ( typeof value === 'undefined' ) {
		return null
	}
	
	if ( /[/\\]/.test(value) ) {
		return path.resolve(value)
	}

	return path.join(__dirname, value)
}

function argMerge(overrides) {
	// only need 2 levels
	const theseOptions = defaultSettings

	for ( const [key, value] of Object.entries(overrides) ) {
		if ( typeof value === 'object' ) {
			for ( const [nestKey, nestValue] of Object.entries(value) ) {
				theseOptions[key][nestKey] = nestValue
			}
		} else {
			theseOptions[key] = value
		}
	}
	return theseOptions
}

function prepArguments() {
	// step 1 : process CLI
	// step 2 : load defaults
	// step 3 : merge config (or default config)
	// step 4 : merge CLI
	// step 5 : validate
	try {
		const cliOpts = parseArgs({options : CLI_OPT_LIST})

		if ( cliOpts.values.help ) { exitUsage() }

		const configFileIN   = normalizeConfigFile(cliOpts.values.config)
		const configFileAUTO = normalizeConfigFile('x32_vor.config.json')
		const configFileOUT  = normalizeConfigFile(cliOpts.values.write)

		let theseOptions = { ...defaultSettings }
		
		if ( configFileIN !== null ) {
			if ( fs.existsSync(configFileIN) ) {
				try {
					const fileSettings = JSON.parse(fs.readFileSync(configFileIN))
					theseOptions = argMerge(fileSettings)
				} catch (err) {
					exitError(`Unable to parse config file :: ${err}`)
				}
			} else {
				exitError('Configuration file not found')
			}
		} else if ( fs.existsSync(configFileAUTO) ) {
			try {
				const fileSettings = JSON.parse(fs.readFileSync(configFileAUTO))
				theseOptions = argMerge(fileSettings)
			} catch (err) {
				exitError(`Unable to parse config file :: ${err}`)
			}
		}

		if ( cliOpts.values['no-gui'] === true ) { theseOptions.textOnlyMode = true }
		if ( typeof cliOpts.values.ip !== 'undefined' ) { theseOptions.x32.address = cliOpts.values.ip }
		if ( typeof cliOpts.values['vor-ip'] !== 'undefined' ) { theseOptions.vor.address = cliOpts.values['vor-ip'] }
		if ( typeof cliOpts.values['vor-port'] !== 'undefined' ) { theseOptions.vor.port = cliOpts.values['vor-port'] }

		const testOutputType = new Set(theseOptions.vor.output)

		if ( testOutputType.has('dca') ) {
			testOutputType.delete('dca')
			for ( let i = 1; i <= 8; i++ ) { testOutputType.add(`dca${i}`) }
		}

		if ( testOutputType.has('bus') ) {
			testOutputType.delete('bus')
			for ( let i = 1; i <= 9; i++ ) { testOutputType.add(`bus0${i}`) }
			for ( let i = 10; i <= 16; i++ ) { testOutputType.add(`bus${i}`) }
		}

		for ( const thisListenItem of testOutputType ) {
			if ( ! VALID_LISTEN.has(thisListenItem) ) {
				exitError('Invalid listener specified')
			}
		}

		if ( theseOptions.x32.address === null ) {
			exitError('At least the X32 IP Address is required')
		}

		if ( typeof cliOpts.values.write !== 'undefined' ) {
			theseOptions.vor.output = [...testOutputType]
			fs.writeFileSync(configFileOUT, JSON.stringify(theseOptions, null, 4))
		}

		theseOptions.vor.output = testOutputType

		return theseOptions
	} catch (err) {
		exitError(err.message)
	}
}

function exitError(text) {
	printUsage()
	cursor.bold().red().write(`\nERROR :: ${text}\n`).reset()
	process.exit(0)
}

function exitUsage() {
	printUsage()
	process.exit(0)
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
		`  $ node index.js ${B}--ip${R} ${U}x32_address`,
		`  $ node index.js ${B}--config${R} ${U}config.json`, '',
		`${B}X32 Configuration`, '',
		`  ${B}-i${R}, ${B}--ip${R} ${U}address${R}           IP Address of the X32`, '',
		`${B}Vor Configuration`, '',
		`  ${B}-o${R}, ${B}--vor-ip${R} ${U}address${R}       IP to broadcast Vor packets to    ${I}[127.0.0.1]`,
		`  ${B}-p${R}, ${B}--vor-port${R} ${U}port${R}        Port to broadcast Vor packets to  ${I}[3333]`, '',
		`${B}Options`, '',
		`  ${B}-c${R}, ${B}--config${R} ${U}config.json${R}   Configuration file to read`,
		`  ${B}-w${R}, ${B}--write${R} ${U}config.json${R}    Configuration file to write`,
		`  ${B}--no-gui${R}                   Do not use full screen ANSI interface`,
		`  ${B}--help${R}                     Print this usage guide`, '',
		`${I}(c)2024 J.T.Sage${R}  ${U}https://github.com/jtsage/X32_Vor`
	]
	for ( const thisLine of CLI_HELP ) {
		cursor.write(thisLine).write('\n').reset()
	}
}