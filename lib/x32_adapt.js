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

// Make an OSC message
function oscMessage(address, ...args) {
	const messageObject = {
		address : address,
		args    : []
	}
	for ( const thisArg of [...args] ) {
		let argumentType
		if ( typeof thisArg === 'string' ) { argumentType = 'string' }
		else if ( typeof thisArg === 'number' ) {
			if ( Number.isInteger(thisArg) ) { argumentType = 'integer' }
			else { argumentType = 'float' }
		}
		messageObject.args.push({ type : argumentType, value : thisArg })
	}
	return osc.toBuffer(messageObject)
}

// Generate a starting state map
function getStateMap() {
	const initFader = ['-oo dB',0,'']
	const stateMap  = {
		cue_list    : [],
		current_cue : 0,
		dca         : [[]],
		bus         : [[]],
	}

	for ( let i = 1; i <= 8; i++ ) { stateMap.dca.push(initFader) }
	for ( let i = 1; i <= 16; i++ ) { stateMap.bus.push(initFader) }

	return stateMap
}

// Generate a startup OSC message map
function getNameMap() {
	const nameMap = {
		cue : [oscNode('-show/prepos/current')]
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

// Convert float to db value
function float2Db(f) {
	returnVal = -0.0
	if      (f >= 0.5)    { returnVal = f * 40. - 30. }
 	else if (f >= 0.25)   { returnVal = f * 80. - 50. }
 	else if (f >= 0.0625) { returnVal = f * 160. - 70. }
 	else if (f >= 0.0)    { returnVal = f * 480. - 90. }
	const returnTrunc = returnVal.toFixed(1)
	if ( returnTrunc === '-90.0' ) { return '-oo dB' } else { return `${returnTrunc} dB`}
}

module.exports = {
	decode      : decode,
	float2Db    : float2Db,
	getNameMap  : getNameMap,
	getStateMap : getStateMap,
	oscMessage  : oscMessage,
	showData    : oscMessage('/showdata'),
	xRemote     : oscMessage('/xremote'),
}