
const ansi = require('ansi')

const cursor = ansi(process.stdout)

class winLib {
	#layout = {
		bars : [1, 4, 27],
		bus   : 15, //12 lines
		cue   : 3,  // 1 line
		dca   : 9,  // 6 lines
		msg   : 5,  // 4 lines
		time  : 2,  // 1 line
		title : 1,  // 1 line
	}
	#color = {
		head1   : '#FFFFFF',
		head2   : '#19439C',
		msg     : '#3C3C3C',
		off     : '#931711',
		on      : '#29F12A',
		outline : '#8540E7',
		text    : '#9C9DA0',
	}
	#cols    = null
	#winSize = [80, 24]
	#lineEnd = 80

	#stateMap = null

	constructor (stateMap) {
		this.#stateMap = stateMap
	}

	doSetupAndClear() {
		this.#winSize = process.stdout.getWindowSize()
		this.#lineEnd = this.#winSize[0]
		this.#cols    = this.#getColumns()

		if ( this.#winSize[1] < 28 ) {
			this.#stateMap.messages.push([new Date(), 'Your terminal has less than 28 lines, info may be truncated!'])
		}

		cursor
			.write(Array.apply(null, new Array(process.stdout.getWindowSize()[1])).map(() => '\n').join(''))
			.eraseData(2)
			.goto(1, 1)

		this.#doDecoration()
	}

	paint() {
		const data = this.#stateMap

		this.#clearLine(this.#layout.time)
		this.#colonHead('Current Time', new Date().toLocaleString(), this.#layout.time)
		this.#colonHead('Packet Size', `${data.last_size} b`, this.#layout.time, true)

		const currentCue = [
			data.cue_list?.[data.current_cue]?.[0] ?? '0.0.0',
			data.cue_list?.[data.current_cue]?.[1] ?? ''
		]

		this.#clearLine(this.#layout.cue)
		this.#colonHead('Current Cue', currentCue.join(' '), this.#layout.cue)
		this.#colonHead('Cue List Size', `${data.cue_list.length}`, this.#layout.cue, true)

		for ( let i = 1; i <= 4; i++ ) {
			this.#doMeasure(this.#layout.dca+1, i, i, data.dca[i])
			this.#doMeasure(this.#layout.dca+4, i, i+4, data.dca[i+4])
		}

		for ( let i = 1; i <= 4; i++ ) {
			this.#doMeasure(this.#layout.bus+1, i, i, data.bus[i])
			this.#doMeasure(this.#layout.bus+4, i, i+4, data.bus[i+4])
			this.#doMeasure(this.#layout.bus+7, i, i+8, data.bus[i+8])
			this.#doMeasure(this.#layout.bus+10, i, i+12, data.bus[i+12])
		}

		const displayMessage = data.messages.slice(-4)

		for ( const [i, element] of displayMessage.entries() ) {
			const dateString  = new Date(element[0].getTime() - (element[0].getTimezoneOffset() * 60000)).toJSON()
			const availLength = this.#lineEnd - 4 - dateString.length
			cursor
				.goto(3, this.#layout.msg + i)
				.hex(this.#color.msg)
				.write(dateString.substring(0, dateString.length - 1)).write(' ')
				.hex(this.#color.text)
				.write(element[1].substring(0, availLength).padEnd(availLength, ' '))
		}

		cursor.reset()
		cursor.goto(1, this.#winSize[1]).write('CTRL+C to stop and exit. ')
	}

	#clearLine(line) {
		cursor.goto(2, line).write(''.padEnd(this.#lineEnd - 2, ' '))
	}

	#doMeasure(startRow, column, number, dataPoint) {
		this.#doFourCols(startRow, column, dataPoint[1] === 'ON' ? this.#color.on : this.#color.off, `[${number}] ${dataPoint[2]}`, true)
		this.#doFourCols(startRow+1, column, this.#color.text, dataPoint[0], true)
	}

	#colonHead(caption, text, line, right = false) {
		let startText = 3
		if ( right ) {
			const fullText = caption.length + text.length + 3
			startText = this.#lineEnd - 1 - fullText
		}
		cursor
			.goto(startText, line)
			.hex(this.#color.head2)
			.write(caption).write(' : ')
			.hex(this.#color.text)
			.write(text)
	}

	#center(line, text, color) {
		const halfText = Math.floor(text.length / 2)
		const startText = Math.max(2, Math.floor(this.#winSize[0] / 2) - halfText)
		cursor.goto(startText, line).hex(color).write(text)
	}

	#doBars(line) {
		cursor.goto(1, line).hex(this.#color.outline).write('|')
		cursor.goto(this.#lineEnd, line).hex(this.#color.outline).write('|')
	}

	#getColumns () {
		const columnSize = Math.floor((this.#lineEnd - 3) / 4)

		return {
			bar  : [1, 2 + columnSize, 2 + columnSize * 2, 2 + columnSize * 3, this.#lineEnd],
			text : [null, 3, 4 + columnSize, 4 + columnSize * 2, 4 + columnSize * 3],
			max  : columnSize - 2,
		}
	}
	
	#doFourBars(line) {
		cursor.goto(this.#cols.bar[0], line).hex(this.#color.outline).write('|')
		cursor.goto(this.#cols.bar[1], line).hex(this.#color.outline).write('|')
		cursor.goto(this.#cols.bar[2], line).hex(this.#color.outline).write('|')
		cursor.goto(this.#cols.bar[3], line).hex(this.#color.outline).write('|')
		cursor.goto(this.#cols.bar[4], line).hex(this.#color.outline).write('|')
	}

	#truncText(text, center = false) {
		const retText = text.substring(0, this.#cols.max)

		if ( center ) {
			const pad = Math.floor((this.#cols.max - retText.length) / 2)
			return `${''.padStart(pad, ' ')}${retText}`.padEnd(this.#cols.max, ' ')
		}
		return retText
	}

	#doFourCols(line, column, color, text, center = false) {
		cursor.goto(this.#cols.text[column], line).hex(color).write(this.#truncText(text, center))
	}


	#doDecoration() {
		for ( const lineNum of this.#layout.bars) {
			this.#doLine(lineNum)
		}
		
		this.#center(this.#layout.title, ' X32 Vor Adapter ', this.#color.head1)

		this.#doBars(this.#layout.time)
		this.#doBars(this.#layout.cue)

		this.#doLine(this.#layout.dca)
		this.#doLine(this.#layout.dca+3)
		this.#center(this.#layout.dca, ' DCA Block ', this.#color.head2)
		this.#doFourBars(this.#layout.dca+1)
		this.#doFourBars(this.#layout.dca+2)
		this.#doFourBars(this.#layout.dca+4)
		this.#doFourBars(this.#layout.dca+5)


		this.#doLine(this.#layout.bus)
		this.#doLine(this.#layout.bus+3)
		this.#doLine(this.#layout.bus+6)
		this.#doLine(this.#layout.bus+9)
		this.#center(this.#layout.bus, ' BUS Block ', this.#color.head2)
		this.#doFourBars(this.#layout.bus+1)
		this.#doFourBars(this.#layout.bus+2)
		this.#doFourBars(this.#layout.bus+4)
		this.#doFourBars(this.#layout.bus+5)
		this.#doFourBars(this.#layout.bus+7)
		this.#doFourBars(this.#layout.bus+8)
		this.#doFourBars(this.#layout.bus+10)
		this.#doFourBars(this.#layout.bus+11)

		this.#doBars(this.#layout.time)

		this.#doBars(this.#layout.msg)
		this.#doBars(this.#layout.msg+1)
		this.#doBars(this.#layout.msg+2)
		this.#doBars(this.#layout.msg+3)
	}

	#doLine(line) {
		cursor.goto(1, line).hex(this.#color.outline).write(''.padStart(this.#lineEnd, '-'))
	}
}


module.exports = {
	winLib : winLib,
}