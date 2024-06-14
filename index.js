/*  __  ___________  __     _____  ____  
*   \ \/ /___ /___ \ \ \   / / _ \|  _ \ 
*    \  /  |_ \ __) | \ \ / / | | | |_) |
*    /  \ ___) / __/   \ V /| |_| |  _ < 
*   /_/\_\____/_____|___\_/  \___/|_| \_\
*   (c) 2024 J.T.Sage, ISC License
*/

// Main Module, run this

const dgram            = require('node:dgram')
const commandLineArgs  = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const {x32State}       = require('./lib/state_lib.js')
const {winLib}         = require('./lib/window_lib.js')
const osc              = require('simple-osc-lib')
const osc_x32          = require('simple-osc-lib/x32.js')

/* eslint-disable sort-keys */
const CLI_OPTIONS = [
	{ name : 'ip',                           type : String,  defaultOption : true },
	{ name : 'port',            alias : 'p', type : Number,  defaultValue : 10023 },
	{ name : 'keepAlive',                    type : Number,  defaultValue : 5000 },

	{ name : 'listen',          alias : 'l', type : String,  defaultValue : ['cue', 'dca'], multiple : true },

	{ name : 'vorJitter',                    type : Number,  defaultValue : 0.05 },
	{ name : 'vorFreq',                      type : Number,  defaultValue : 100  },
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
				description : 'Print all incoming X32 OSC messages',
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
const VALID_LISTEN = new Set([
	'cue', 'dca1', 'dca2', 'dca3', 'dca4',
	'dca5', 'dca6', 'dca7', 'dca8', 'bus01',
	'bus02', 'bus03', 'bus04', 'bus05', 'bus06',
	'bus07', 'bus08', 'bus09', 'bus10', 'bus11',
	'bus12', 'bus13', 'bus14', 'bus15', 'bus16'
])

const options = commandLineArgs(CLI_OPTIONS)
const usage   = commandLineUsage(CLI_HELP)

if ( options.help ) {
	// eslint-disable-next-line no-console
	console.log(usage)
	process.exit(0)
}
if ( !options.ip ) {
	// eslint-disable-next-line no-console
	console.log('ERROR :: IP Address of X32 Required')
	// eslint-disable-next-line no-console
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
	if ( ! VALID_LISTEN.has(thisListenItem) ) {
		// eslint-disable-next-line no-console
		console.log(`ERROR :: Invalid Listener Specified :: ${thisListenItem}`)
		// eslint-disable-next-line no-console
		console.log(usage)
		process.exit(1)
	}
}

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
const thisWindow  = new winLib(X32_STATE)

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
	X32_STATE.addMsg(`listening to X32 on ${address.address}:${address.port}`)
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
				processMessage(oscMessage)
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

function processMessage(oscMessage) {
	if ( ! oscMessage.wasProcessed ) { return }

	X32_STATE.processState(oscMessage)
}
