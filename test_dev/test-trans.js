/*  __  ___________  __     _____  ____  
*   \ \/ /___ /___ \ \ \   / / _ \|  _ \ 
*    \  /  |_ \ __) | \ \ / / | | | |_) |
*    /  \ ___) / __/   \ V /| |_| |  _ < 
*   /_/\_\____/_____|___\_/  \___/|_| \_\
*   (c) 2024 J.T.Sage, ISC License
*/
/* eslint-disable no-console */

// Test the OSC translator
const x32              = require('../lib/x32_adapt.js')
const {nodeLines}      = require('./fake_data.js')
const CURRENT_STATE    = x32.getStateMap()

for ( let i = 1; i < nodeLines.length; i++ ) {
	const oscOperation = x32.processOSCMessage(nodeLines[i])
	try {
		processOSCOperation(oscOperation)
	} catch (err) {
		console.error(`Bad OSC Handling :: ${err}`)
	}
}


function processOSCOperation (oscOperation) {
	if ( oscOperation.endpoint === null ) { return }

	if ( oscOperation.endpoint.type === 'cueListDirty' ) {
		// request new cue list now
	} else if ( oscOperation.endpoint.type === 'currentCue' ) {
		CURRENT_STATE.current_cue = parseInt(oscOperation.args[0], 10)
	} else if ( oscOperation.endpoint.type === 'rebuildCueList' ) {
		CURRENT_STATE.cue_list = []
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

console.log(CURRENT_STATE)