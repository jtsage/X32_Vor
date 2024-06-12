// const oscMain = require('../lib/osc-min.js')
const osc  = require('../lib/osc-utilities.js')


//function test() { return }


test('fail to concatBuffer a string', () => {
	expect(() => osc.concatBuffers('aaa')).toThrow(Error)
})
test('fail to concatBuffer an array of strings', () => {
	expect(() => osc.concatBuffers(['aaa', 'bbb'])).toThrow(Error)
})
test('concatBuffer two buffers', () => {
	expect(osc.concatBuffers([Buffer.from('aaa'), Buffer.from('bbb'), Buffer.from('ccc')]))
		.toEqual(Buffer.from('aaabbbccc'))
})
