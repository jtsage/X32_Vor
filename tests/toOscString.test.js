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