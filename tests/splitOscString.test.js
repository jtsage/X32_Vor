// const oscMain = require('../lib/osc-min.js')
const osc  = require('../lib/osc-utilities.js')

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
