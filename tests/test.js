// const oscMain = require('../lib/osc-min.js')
const osc  = require('../lib/osc-utilities.js')



test('toOscString (padding \'a\' -> 4)', () => {
	expect(osc.toOscString('a').length).toBe(4)
})
test('toOscString (padding \'bb\' -> 4)', () => {
	expect(osc.toOscString('bb').length).toBe(4)
})
test('toOscString (padding \'ccc\' -> 4)', () => {
	expect(osc.toOscString('ccc').length).toBe(4)
})
test('toOscString (padding \'dddd\' -> 8)', () => {
	expect(osc.toOscString('dddd').length).toBe(8)
})


test('non strings fail toOscString', () => {
	expect(() => osc.toOscString(7)).toThrow(Error)
})
test('strings with null characters don\'t fail toOscString by default', () => {
	expect(osc.toOscString('\u0000')).toBeDefined()
})
test('strings with null characters fail toOscString in strict mode', () => {
	expect(() => {return osc.toOscString('\u0000hi', true)}).toThrow(Error)
})

const testRoundTrip = (input) => {
	const oscString = osc.toOscString(input)
	return osc.splitOscString(oscString).string
}

test('round trip simple string "hello world"', () => {
	expect(testRoundTrip('hello world')).toEqual('hello world')
})

test('osc buffers with no null characters fail splitOscString in strict mode', () => {
	expect(() => osc.splitOscString(Buffer.from('abc'), true)).toThrow(Error)
})

test('splitOscString throws when passed a non-buffer', () => {
	expect(() => { osc.splitOscString('test', true) }).toThrow(Error)
})

test('fromOscMessage with no type string works', () => {
	const expected = { address : '/stuff', args : [] }
	expect(osc.fromOscMessage(osc.toOscString('/stuff'))).toEqual(expected)
})

const testWithTypeNoArgs = () => {
	const oscAddr = osc.toOscString('/stuff')
	const oscType = osc.toOscString(',')
	const oscMessage = Buffer.alloc(oscAddr.length + oscType.length)
	oscAddr.copy(oscMessage)
	oscType.copy(oscMessage, oscAddr.length)
	return osc.fromOscMessage(oscMessage)
}

test('fromOscMessage with type string and no args works', () => {
	const expected = { address : '/stuff', args : [], oscType : 'message' }
	expect(testWithTypeNoArgs()).toEqual(expected)
})




const testDecode = (addr, type, arg = null) => {
	const oscAddr = osc.toOscString(addr)
	const oscType = osc.toOscString(type)
	return osc.fromOscMessage( (arg === null ) ?
		osc.concatBuffers([oscAddr, oscType]) :
		osc.concatBuffers([oscAddr, oscType, arg])
	)
}

test('fromOscMessage with string argument works', () => {
	const expected = {
		address : '/stuff',
		args : [{ type : 'string', value : 'argument' }],
		oscType : 'message',
	}
	expect(testDecode('/stuff', ',s', osc.toOscString('argument'))).toEqual(expected)
})


test('fromOscMessage with true argument works', () => {
	const expected = {
		address : '/stuff',
		args : [{ type : 'true', value : true }],
		oscType : 'message',
	}
	expect(testDecode('/stuff', ',T')).toEqual(expected)
})
test('fromOscMessage with false argument works', () => {
	const expected = {
		address : '/stuff',
		args : [{ type : 'false', value : false }],
		oscType : 'message',
	}
	expect(testDecode('/stuff', ',F')).toEqual(expected)
})
test('fromOscMessage with null argument works', () => {
	const expected = {
		address : '/stuff',
		args : [{ type : 'null', value : null }],
		oscType : 'message',
	}
	expect(testDecode('/stuff', ',N')).toEqual(expected)
})
test('fromOscMessage with bang argument works', () => {
	const expected = {
		address : '/stuff',
		args : [{ type : 'bang', value : 'bang' }],
		oscType : 'message',
	}
	expect(testDecode('/stuff', ',I')).toEqual(expected)
})
test('fromOscMessage with integer argument works', () => {
	const expected = {
		address : '/stuff',
		args : [{ type : 'integer', value : 69 }],
		oscType : 'message',
	}
	expect(testDecode('/stuff', ',i', osc.toIntegerBuffer(69))).toEqual(expected)
})

test('toIntegerBuffer throws when passed a non-number', () => {
	expect(() => osc.toIntegerBuffer('abcdefg')).toThrow(Error)
})

test('fromOscMessage with integer argument works', () => {
	const expected = {
		address : '/stuff',
		args : [{ type : 'integer', value : 69 }],
		oscType : 'message',
	}
	expect(testDecode('/stuff', ',i', osc.toIntegerBuffer(69))).toEqual(expected)
})

test('fromOscMessage with blob argument works', () => {
	const expected = {
		address : '/stuff',
		args : [{ type : 'blob', value : expect.anything() }],
		oscType : 'message',
	}
	expect(testDecode('/stuff', ',b', osc.concatBuffers([osc.toIntegerBuffer(69), Buffer.from('argument')]))).toEqual(expected)
})

test('fromOscMessage with timetag argument works', () => {
	const expected = {
		address : '/stuff',
		args : [{ type : 'timetag', value : [8888, 9999] }],
		oscType : 'message',
	}
	expect(testDecode('/stuff', ',t', osc.toTimetagBuffer([8888, 9999]))).toEqual(expected)
})


test('splitOscString works with an over-allocated buffer', () => {
	const expected = {
		string : 'testing it',
		rest : expect.any(Buffer),
	}

	const actualBuffer = osc.toOscString('testing it')
	const overBuffer   = Buffer.alloc(16)
	actualBuffer.copy(overBuffer)
	expect(osc.splitOscString(overBuffer)).toEqual(expected)
})

test('splitOscString works with just a string by default', () => {
	const expected = {
		string : 'testing it',
		rest : expect.any(Buffer),
	}
	expect(osc.splitOscString(Buffer.from('testing it'))).toEqual(expected)
})

test('splitOscString strict fails for just a string', () => {
	expect(() => osc.splitOscString(Buffer.from('testing it'), true)).toThrow(Error)
})

test('splitOscString strict fails for string with not enough padding', () => {
	expect(() => osc.splitOscString(Buffer.from('testing \u0000\u0000'), true)).toThrow(Error)
})

test('splitOscString strict succeeds for strings with valid padding', () => {
	const expected = {
		string : 'testing it',
		rest : expect.any(Buffer),
	}
	expect(osc.splitOscString(Buffer.from('testing it\u0000\u0000aaaa'), true)).toEqual(expected)
})

test('splitOscString strict fails for string with invalid padding', () => {
	expect(() => osc.splitOscString(Buffer.from('testing it\u0000aaaaa'), true)).toThrow(Error)
})
