// const oscMain = require('../lib/osc-min.js')
const osc  = require('../lib/osc-utilities.js')

test('toIntegerBuffer throws when passed a non-number', () => {
	expect(() => osc.toIntegerBuffer('abcdefg')).toThrow(Error)
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


const testDecode = (addr, type, arg = null, strict = false) => {
	const oscAddr = osc.toOscString(addr)
	const oscType = osc.toOscString(type)
	return osc.fromOscMessage( (arg === null ) ?
		osc.concatBuffers([oscAddr, oscType]) :
		osc.concatBuffers([oscAddr, oscType, arg])
	, strict)
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

test('fromOscMessage with mismatched array doesn\'t throw', () => {
	const expected = {
		address : '/stuff',
		args : [],
		oscType : 'message',
	}

	const oscAddr = osc.toOscString('/stuff')

	expect(osc.fromOscMessage(osc.concatBuffers([oscAddr, osc.toOscString(',[')]))).toEqual(expected)
	expect(osc.fromOscMessage(osc.concatBuffers([oscAddr, osc.toOscString(',]')]))).toEqual(expected)
})

test('fromOscMessage with mismatched array throws in strict', () => {
	const oscAddr = osc.toOscString('/stuff')

	expect(() => osc.fromOscMessage(osc.concatBuffers([oscAddr, osc.toOscString(',[')]), true)).toThrow(Error)
	expect(() => osc.fromOscMessage(osc.concatBuffers([oscAddr, osc.toOscString(',]')]), true)).toThrow(Error)
})




test('fromOscMessage with empty array argument works', () => {
	const expected = {
		address : '/stuff',
		args : [{ type : 'array', value : [] }],
		oscType : 'message',
	}
	expect(testDecode('/stuff', ',[]')).toEqual(expected)
})

test('fromOscMessage with bang array argument works', () => {
	const expected = {
		address : '/stuff',
		args : [{ type : 'array', value : [{ type : 'bang', value : 'bang' }] }],
		oscType : 'message',
	}
	expect(testDecode('/stuff', ',[I]')).toEqual(expected)
})

test('fromOscMessage with string array argument works', () => {
	const expected = {
		address : '/stuff',
		args : [{ type : 'array', value : [{ type : 'string', value : 'argument' }] }],
		oscType : 'message',
	}
	expect(testDecode('/stuff', ',[s]', osc.toOscString('argument'))).toEqual(expected)
})

test('fromOscMessage with nested array argument works', () => {
	const expected = {
		address : '/stuff',
		args : [{ type : 'array', value : [{ type : 'array', value : [{ type : 'bang', value : 'bang' }] }] }],
		oscType : 'message',
	}
	expect(testDecode('/stuff', ',[[I]]', osc.toOscString('argument'))).toEqual(expected)
})

test('fromOscMessage with multiple args works', () => {
	const expected = {
		address : '/stuff',
		args : [
			{ type : 'string', value : 'string1' },
			{ type : 'string', value : 'string2' },
			{ type : 'integer', value : 69 },
		],
		oscType : 'message',
	}
	const args = [
		osc.toOscString('string1'),
		osc.toOscString('string2'),
		osc.toIntegerBuffer(69)
	]
	expect(testDecode('/stuff', ',ssi', osc.concatBuffers(args))).toEqual(expected)
})


test('fromOscMessage strict fails if type string has no comma', () => {
	expect(() => testDecode('/stuff', 'fake', null, true)).toThrow(Error)
})

test('fromOscMessage non-strict works if type string has no comma', () => {
	const expected = {
		address : '/stuff',
		args : [],
	}
	expect(testDecode('/stuff', 'fake', null, false)).toEqual(expected)
})

test('fromOscMessage strict fails if address doesn\'t begin with /', () => {
	expect(() => testDecode('stuff', ',', null, true)).toThrow(Error)
})