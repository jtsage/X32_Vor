/*  __  ___________  __     _____  ____  
*   \ \/ /___ /___ \ \ \   / / _ \|  _ \ 
*    \  /  |_ \ __) | \ \ / / | | | |_) |
*    /  \ ___) / __/   \ V /| |_| |  _ < 
*   /_/\_\____/_____|___\_/  \___/|_| \_\
*   (c) 2024 J.T.Sage, ISC License
*/
// Utility Functions
const osc = require('osc-min')

// Make an OSC node message
function oscNode(...args) {
	return oscMessage('/node', ...args)
}

function oscObject(address, ...args) {
	const messageObject = {
		address : address,
		args    : [],
	}
	for ( const thisArg of args ) {
		let argumentType
		if ( typeof thisArg === 'string' ) { argumentType = 'string' }
		else if ( typeof thisArg === 'number' ) {
			if ( Number.isInteger(thisArg) ) { argumentType = 'integer' }
			else { argumentType = 'float' }
		}
		messageObject.args.push({ type : argumentType, value : thisArg })
	}
	return messageObject
}
// Make an OSC message
function oscMessage(address, ...args) {
	return osc.toBuffer(oscObject(address, ...args))
}

function addMsg(text, state) {
	state.messages.push([new Date(), text])
}

// Generate a starting state map
function getStateMap() {
	const initFader = ['-oo dB', 'OFF', '']
	const stateMap  = {
		bus         : [[]],
		cue_list    : [],
		current_cue : 0,
		dca         : [[]],
		last_size   : 0,
		messages    : [],
		mode        : 'cue', //CUES, SCENES,SNIPPETS 
	}

	for ( let i = 1; i <= 8; i++ ) { stateMap.dca.push([...initFader]) }
	for ( let i = 1; i <= 16; i++ ) { stateMap.bus.push([...initFader]) }

	addMsg('X32 Vor Adapter starting...', stateMap)
	return stateMap
}

// Generate a startup OSC message map
function getNameMap() {
	const nameMap = {
		cue : [oscNode('-show/prepos/current')],
	}
	
	for ( let i = 1; i <= 8; i++ ) {
		nameMap[`dca${i}`] = [
			oscNode(`dca/${i}`),
			oscNode(`dca/${i}/config`)
		]
	}

	for ( let i = 1; i <= 16; i++ ) {
		nameMap[`bus${_z(i)}`] = [
			oscNode(`bus/${_z(i)}/mix`),
			oscNode(`bus/${_z(i)}/config`)
		]
	}
	return nameMap
}

// Zero pad
function _z(num) { return num.toString().padStart(2, '0') }

// Incoming message handlers
function sanitizeMessage(decoded) {
	const message = []
	message.push(decoded.address)
	for (const arg of decoded.args) {
		message.push(arg.value)
	}
	return message
}

function sanitizeBundle(decoded) {
	decoded.elements = decoded.elements.map((element) => {
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
	}
	
	throw new Error('Malformed Packet')
}

// Convert float to db value
function float2Db(f) {
	let returnVal = -0.0
	if      (f >= 0.5)    { returnVal = f * 40.0 - 30.0 }
 	else if (f >= 0.25)   { returnVal = f * 80.0 - 50.0 }
 	else if (f >= 0.0625) { returnVal = f * 160.0 - 70.0 }
 	else if (f >= 0.0)    { returnVal = f * 480.0 - 90.0 }
	const returnString = returnVal.toFixed(1)
	if ( returnString === '-90.0' ) { return '-oo dB' }
	return `${returnString} dB`
}


function splitNodeString(nodeString) {
	const parts = nodeString.replace(/\n/, '').split(/ (.*)/s)
	return [parts[0], parts[1]]
}

function decodeStringArguments(args) {
	
	if ( typeof args !== 'string' ) { return null }
	// This is some bullshit, but it works for the ones we care about
	return args.match(/(?<=")\w[^"]*(?=")|[\w-]+|"[\s\w-]*"/g)
}

function decodeOSCAddress(address) {
	const slashRemoved = address.replace(/^\//, '')
	const endPointPath = slashRemoved.split('/')
	switch ( endPointPath[0] ) {
		case 'bus' : {
			const operation = endPointPath.slice(2).join('/')
			if ( ! ['mix/fader', 'mix/on', 'config/name', 'mix', 'config'].includes(operation) ) {
				return null
			}
			return {
				faderNum  : endPointPath[1],
				faderNumI : parseInt(endPointPath[1]),
				operation : endPointPath.slice(2).join('/'),
				type      : 'bus',
			}
		}
		case 'dca' : {
			const operation = endPointPath.slice(2).join('/')
			if ( ! ['fader', 'on', 'config/name', '', 'config'].includes(operation) ) {
				return null
			}
			return {
				faderNum  : endPointPath[1],
				faderNumI : parseInt(endPointPath[1]),
				operation : operation === '' ? 'mix' : operation,
				type      : 'dca',
			}
		}
		case '-prefs' : {
			if ( endPointPath[1] === 'show_control' ) {
				return { type : 'mode'}
			}
			return null
		}
		case '-show':
			if ( endPointPath[1] === 'prepos' &&  endPointPath[2] === 'current' ) {
				return { type  : 'currentCue' }
			}
			if ( endPointPath[1] !== 'showfile' ) { return null }
			if ( endPointPath[2] === 'show' ) {
				return { type : 'rebuildCueList' }
			}
			if ( endPointPath[2] === 'cue' || endPointPath[2] === 'snippet' || endPointPath[2] === 'scene') {
				if ( endPointPath.length !== 4 ) { return { type : 'cueListDirty' } }
				return {
					type : 'cue',
					subtype : endPointPath[2],
					cueNum : parseInt(endPointPath[3]),
				}
			}
			return null
		case 'add' :
		case 'delete' :
		case 'save' :
			return { type : 'cueListDirty' }
		default :
			return null
	}
}

function processOSCMessage(payload) {
	const [address, ...args] = payload
	const oscOperation       = { endpoint : null }

	if ( address === '/node' || address === 'node' ) {
		
		const [nodeAddress, nodeOSCString] = splitNodeString(args[0])

		oscOperation.endpoint = decodeOSCAddress(nodeAddress)

		if ( oscOperation.endpoint !== null ) {
			oscOperation.args = decodeStringArguments(nodeOSCString)
		}
	} else {
		oscOperation.endpoint = decodeOSCAddress(address)
		oscOperation.args     = [...args]
	}

	return oscOperation
}

module.exports = {
	addMsg            : addMsg,
	decode            : decode,
	float2Db          : float2Db,
	getNameMap        : getNameMap,
	getStateMap       : getStateMap,
	now               : () => (new Date()).getTime() / 1000,
	oscMessage        : oscMessage,
	oscObject         : oscObject,
	processOSCMessage : processOSCMessage,
	showData          : oscMessage('/showdata'),
	toOSCBuffer       : (data) => osc.toBuffer(data),
	xRemote           : oscMessage('/xremote'),
}