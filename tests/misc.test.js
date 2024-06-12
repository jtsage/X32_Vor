// const oscMain = require('../lib/osc-min.js')
const osc  = require('../lib/osc-utilities.js')

test('toIntegerBuffer throws when passed a non-number', () => {
	expect(() => osc.toIntegerBuffer('abcdefg')).toThrow(Error)
})

test('splitInteger fails when sent a buffer that\'s too small', () => {
	expect(() => osc.splitInteger(Buffer.alloc(3), 'Int32')).toThrow(Error)
})

test('splitOscArgument fails when given a bogus type', () => {
	expect(() => osc.splitOscArgument(Buffer.alloc(0), 'bogus')).toThrow(Error)
})