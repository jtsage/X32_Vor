/*  __  ___________  __     _____  ____  
*   \ \/ /___ /___ \ \ \   / / _ \|  _ \ 
*    \  /  |_ \ __) | \ \ / / | | | |_) |
*    /  \ ___) / __/   \ V /| |_| |  _ < 
*   /_/\_\____/_____|___\_/  \___/|_| \_\
*   (c) 2024 J.T.Sage, ISC License
*/
// State Manager

class x32State {
	bus              = []
	busDirty         = false
	cueCurrent       = -1
	cueList          = []
	cueDirty         = false
	dca              = []
	dcaDirty         = false
	last_packet_size = 0
	messages         = []
	sceneList        = []
	showMode         = 0
	showName         = ''
	snippetList      = []

	#vorUpdateCount = 0

	#show_modes = ['CUES', 'SCENES', 'SNIPPETS']

	#options = null

	constructor(options) {
		this.#options = options
		this.clearState()
	}

	initFader(name) {
		return {
			level : {
				db    : '-oo dB',
				float : 0,
			},
			isOn : {
				text : 'OFF',
				bool : 0,
			},
			name : name,
		}
	}

	clearCueLists() {
		this.sceneList        = []
		this.snippetList      = []
		this.cueList          = []
	}
	clearState() {
		this.bus              = [[]]
		this.busDirty         = false
		this.cueCurrent       = -1
		this.cueList          = []
		this.cueDirty         = false
		this.dca              = [[]]
		this.dcaDirty         = false
		this.last_packet_size = 0
		this.messages         = []
		this.sceneList        = []
		this.showMode         = 0
		this.showName         = ''
		this.snippetList      = []

		for ( let i = 1; i <= 8; i++ )  { this.dca.push(this.initFader(`DCA${i}`)) }
		for ( let i = 1; i <= 16; i++ ) { this.bus.push(this.initFader(`BUS${this.#zPad(i)}`)) }

		this.addMsg('X32 Vor Adapter starting...')
	}

	addMsg(text, isVerbose = false) {
		if ( this.#options.noGUI && ( !isVerbose || this.#options.verbose ) ) {
			// eslint-disable-next-line no-console
			console.log(text)
		}
		this.messages.push([new Date(), text])
		this.messages = this.messages.slice(-4)
	}

	#zPad(value, pad = 2) { return value.toString().padStart(pad, '0') }

	#oscNode(string) {
		return {
			address : '/node',
			args : [{type : 'string', value : string}],
		}
	}

	oscShowInfo() {
		return [{ address : '/showdata', args : [] }]
	}
	oscXRemote() {
		return [{ address : '/xremote', args : [] }]
	}
	oscFullState() {
		const messageList = [
			this.#oscNode('-show/prepos/current'),
			this.#oscNode('-prefs/show_control'),
			...this.oscShowInfo(),
			...this.oscXRemote(),
		]
		for ( let i = 1; i <= 8; i++ ) {
			messageList.push(
				this.#oscNode(`dca/${i}`),
				this.#oscNode(`dca/${i}/config`)
			)
		}
		for ( let i = 1; i <= 16; i++ ) {
			messageList.push(
				this.#oscNode(`bus/${this.#zPad(i)}/mix`),
				this.#oscNode(`bus/${this.#zPad(i)}/config`)
			)
		}
		return messageList
	}

	processState(oscMessage) {
		if ( typeof this.messageHandlers[oscMessage.props.subtype] === 'function' ) {
			this.messageHandlers[oscMessage.props.subtype](oscMessage.props)
		} else {
			this.addMsg(`un-handle-able processed message :: ${oscMessage.props.subtype}`)
		}
	}

	fixName(props) {
		if ( props.name !== '' ) { return props.name }
		if ( props.subtype === 'dcaName' || props.subtype === 'node-dcaConfig' ) {
			return `DCA${props.index}`
		}
		return `BUS${props.zIndex}`
	}

	makeSceneName(index, withNote = true ) {
		if ( this.showMode === 1 && index === -1 ) { return 'no current scene' }
		if ( index === -1 || typeof this.sceneList[index] === 'undefined' ) { return '--' }
		if ( withNote ) { return `${this.sceneList[index].name} (${this.sceneList[index].note})` }
		return this.sceneList[index].name
	}

	makeSnippetName(index) {
		if ( this.showMode === 2 && index === -1 ) { return 'no current snippet' }
		if ( index === -1 || typeof this.snippetList[index] === 'undefined' ) { return '--' }
		return this.snippetList[index]
	}

	makeCueText(index) {
		if ( index === -1 ) { return 'no current cue' }

		const thisCue = this.cueList[this.cueCurrent]

		if ( typeof thisCue === 'undefined' ) { return 'unknown cue' }

		const sceneName   = this.makeSceneName(thisCue.cueScene, false)
		const snippetName = this.makeSnippetName(thisCue.cueSnippet)

		return `${thisCue.cueNumber} :: ${thisCue.name} [${sceneName}] [${snippetName}]`
	}

	makeCurrentMode() {
		const currentMode = this.#show_modes[this.showMode]
		return currentMode.slice(0, 1) + currentMode.slice(1, currentMode.length-1).toLowerCase()
	}

	makeCurrentCue() {
		if ( this.showMode === 2 ) { return this.makeSnippetName(this.cueCurrent ) }
		else if ( this.showMode === 1 ) { return this.makeSceneName(this.cueCurrent) }
		return this.makeCueText(this.cueCurrent)
	}

	getCueListSize() {
		if ( this.showMode === 2 ) { return this.snippetList.length }
		else if ( this.showMode === 1 ) { return this.sceneList.length }
		return this.cueList.length
	}

	vorUpdate(userForce = false) {
		if ( this.#vorUpdateCount % 10 === 0 ) { this.#vorUpdateCount = 0 }

		// send full update every 10th call
		const force = userForce || this.#vorUpdateCount === 0
		
		this.#vorUpdateCount++

		const messageList = []

		if ( this.#options.listen.has('cue') && (this.cueDirty || force) ) {
			messageList.push({ address : '/currentCue', args : [
				{ type : 'string', value : this.makeCurrentCue() },
				{ type : 'string', value : this.makeCurrentMode() },
			]})
		}

		if ( this.dcaDirty || force ) {
			for ( let i = 1; i <= 8; i++ ) {
				if ( this.#options.listen.has(`dca${i}`) ) {
					messageList.push({ address : `/dca/${i}`, args : [
						{ type : 'string', value : this.dca[i].level.db },
						{ type : 'string', value : this.dca[i].isOn.text },
						{ type : 'string', value : this.dca[i].name },
					]})
				}
			}
		}

		if ( this.busDirty || force ) {
			for ( let i = 1; i <= 16; i++ ) {
				const busPadded = this.#zPad(i)
				if ( this.#options.listen.has(`bus${busPadded}`) ) {
					messageList.push({ address : `/bus/${busPadded}`, args : [
						{ type : 'string', value : this.bus[i].level.db },
						{ type : 'string', value : this.bus[i].isOn.text },
						{ type : 'string', value : this.bus[i].name },
					]})
				}
			}
		}

		this.busDirty = false
		this.dcaDirty = false
		this.cueDirty = false

		return messageList
	}

	messageHandlers = {
		'busLevel'        : (props) => { this.bus[props.index].level = props.level; this.busDirty = true },
		'busMute'         : (props) => { this.bus[props.index].isOn  = props.isOn; this.busDirty = true },
		'busName'         : (props) => { this.bus[props.index].name = this.fixName(props); this.busDirty = true },
		'cueCurrent'      : (props) => { this.cueCurrent = props.index },
		'dcaLevel'        : (props) => { this.dca[props.index].level = props.level; this.dcaDirty = true },
		'dcaMute'         : (props) => { this.dca[props.index].isOn  = props.isOn; this.dcaDirty = true },
		'dcaName'         : (props) => { this.dca[props.index].name = this.fixName(props); this.dcaDirty = true },
		'node-busConfig'  : (props) => { this.bus[props.index].name = this.fixName(props); this.busDirty = true },
		'node-busMix'     : (props) => {
			this.bus[props.index].level = props.level
			this.bus[props.index].isOn  = props.isOn
			this.busDirty = true
		},
		'node-cue'        : (props) => { this.cueList[props.index] = props },
		'node-cueCurrent' : (props) => { this.cueCurrent = props.index; this.cueDirty = true },
		'node-dcaConfig'  : (props) => { this.dca[props.index].name = this.fixName(props); this.dcaDirty = true },
		'node-dcaMix'     : (props) => {
			this.dca[props.index].level = props.level
			this.dca[props.index].isOn  = props.isOn
			this.dcaDirty = true
		},
		'node-scene'      : (props) => { this.sceneList[props.index] = props },
		'node-show'       : (props) => { this.showName = props.name; this.clearCueLists(); this.cueDirty = true },
		'node-showMode'   : (props) => { this.showMode = this.#show_modes.indexOf(props.text); this.cueDirty = true },
		'node-snippet'    : (props) => { this.snippetList[props.index] = props.name },
		'showMode'        : (props) => { this.showMode = props.index; this.cueDirty = true },
	}
}

module.exports.x32State = x32State