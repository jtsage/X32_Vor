const utils = require('./osc-utilities.js')

module.exports.fromBuffer = (buffer, strict) => {
	let outBuffer = buffer
	if (buffer instanceof ArrayBuffer) {
		outBuffer = Buffer.from(new Uint8Array(buffer))
	} else if (buffer instanceof Uint8Array) {
		outBuffer = Buffer.from(buffer)
	}
	return utils.fromOscPacket(outBuffer, strict)
}

module.exports.toBuffer = (object, strict, opt) => {
	if ( typeof object === 'string' ) {
		return utils.toOscPacket({'address' : object, 'args' : strict}, opt)
	}
	return utils.toOscPacket(object, strict)
}

module.exports.applyAddressTransform = function(buffer, transform) {
	return utils.applyTransform(buffer, utils.addressTransform(transform))
}

module.exports.applyMessageTransform = function(buffer, transform) {
	return utils.applyTransform(buffer, utils.messageTransform(transform))
}

module.exports.timetagToDate = utils.timetagToDate
module.exports.dateToTimetag = utils.dateToTimetag
module.exports.timetagToTimestamp = utils.timetagToTimestamp
module.exports.timestampToTimetag = utils.timestampToTimetag
