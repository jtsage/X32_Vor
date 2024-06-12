const UNIX_EPOCH = 2208988800
const TWO_POW_32 = 4294967296
const binpack    = require('binpack')

const oscTypeCodes = {
	s : {
		representation : 'string',
		split : (buffer, strict = false) => {
			const split = exportedFunctions.splitOscString(buffer, strict)
			return {
				value : split.string,
				rest  : split.rest,
			}
		},
		toArg : (value, strict = false) => {
			if (typeof value !== 'string') {
				throw new Error('expected string')
			}
			return exports.toOscString(value, strict)
		},
	},

	i : {
		representation : 'integer',
		split : (buffer, _strict) => {
			const split = exportedFunctions.splitInteger(buffer)
			return {
				value : split.integer,
				rest  : split.rest,
			}
		},
		toArg : (value, _strict) => {
			if (typeof value !== 'number') {
				throw new Error('expected number')
			}
			return exportedFunctions.toIntegerBuffer(value)
		},
	},

	t : {
		representation : 'timetag',
		split : (buffer, _strict) => {
			const split = exportedFunctions.splitTimetag(buffer)
			return {
				value : split.timetag,
				rest  : split.rest,
			}
		},
		toArg : (value, _strict) => {
			return exportedFunctions.toTimetagBuffer(value)
		},
	},

	f : {
		representation : 'float',
		split : (buffer, _strict) => {
			return {
				value : binpack.unpackFloat32(buffer.slice(0, 4), 'big'),
				rest  : buffer.slice(4, buffer.length),
			}
		},
		toArg : (value, _strict) => {
			if (typeof value !== 'number') {
				throw new Error('expected number')
			}
			return binpack.packFloat32(value, 'big')
		},
	},

	d : {
		representation : 'double',
		split : (buffer, _strict) => {
			return {
				value : binpack.unpackFloat64(buffer.slice(0, 8), 'big'),
				rest  : buffer.slice(8, buffer.length),
			}
		},
		toArg : (value, _strict) => {
			if (typeof value !== 'number') {
				throw new Error('expected number')
			}
			return binpack.packFloat64(value, 'big')
		},
	},

	b : {
		representation : 'blob',
		split : (buffer, _strict) => {
			const ref    = exportedFunctions.splitInteger(buffer)
			const length = ref.integer
			const rest   = ref.rest
			return {
				value : rest.slice(0, length),
				rest  : rest.slice(length, rest.length),
			}
		},
		toArg : (value, _strict) => {
			if (!Buffer.isBuffer(value)) {
				throw new Error('expected node.js Buffer')
			}
			const size = exportedFunctions.toIntegerBuffer(value.length)
			return exportedFunctions.concatBuffers([size, value])
		},
	},

	T : {
		representation : 'true',
		split : (buffer, _strict) => {
			return {
				rest  : buffer,
				value : true,
			}
		},
		toArg : (value, strict = false) => {
			if (!value && strict) {
				throw new Error('true must be true')
			}
			return new Buffer.alloc(0)
		},
	},

	F : {
		representation : 'false',
		split : (buffer, _strict) => {
			return {
				rest  : buffer,
				value : false,
			}
		},
		toArg : (value, strict) => {
			if (value && strict) {
				throw new Error('false must be false')
			}
			return new Buffer.alloc(0)
		},
	},

	N : {
		representation : 'null',
		split : (buffer, _strict) => {
			return {
				rest  : buffer,
				value : null,
			}
		},
		toArg : (value, strict = false) => {
			if (value && strict) {
				throw new Error('null must be false')
			}
			return new Buffer.alloc(0)
		},
	},

	I : {
		representation : 'bang',
		split : (buffer, _strict) => {
			return {
				rest  : buffer,
				value : 'bang',
			}
		},
		toArg : (_value, _strict) => {
			return new Buffer.alloc(0)
		},
	},
}

const fourBytePad = (inputString) => {
	const buffLength = Buffer.byteLength(inputString)
	return 4 - ( buffLength % 4 )
}

const makeTimetag = (unixSeconds, fracSeconds) => {
	return [
		unixSeconds + UNIX_EPOCH,
		Math.round(TWO_POW_32 * fracSeconds)
	]
}

const isOscBundleBuffer = (buffer, strict) => {
	return exportedFunctions.splitOscString(buffer, strict).string === '#bundle'
}

const getArrayArg = (arg) => {
	if ( typeof arg !== 'object' ) {
		return null
	} else if ( Array.isArray(arg) ) {
		return arg
	} else if ( typeof arg.value !== 'undefined' && Array.isArray(arg.value) ) {
		return arg.value
	}
	return null
}

/* eslint-disable */
const mapBundleList = (buffer, callback) => {
	var e, elem, elems, j, len, nonNullElems, size, thisElemBuffer;
	elems = (function() {
		var ref, results;
		results = [];
		while (buffer.length) {
			ref = exports.splitInteger(buffer), size = ref.integer, buffer = ref.rest;
			if (size > buffer.length) {
				throw new Error("Invalid bundle list: size of element is bigger than buffer");
			}
			thisElemBuffer = buffer.slice(0, size);
			buffer = buffer.slice(size, buffer.length);
			try {
				results.push(func(thisElemBuffer));
			} catch (error) {
				e = error;
				results.push(null);
			}
		}
		return results;
	})();
	nonNullElems = [];
	for (j = 0, len = elems.length; j < len; j++) {
		elem = elems[j];
		if (elem != null) {
			nonNullElems.push(elem);
		}
	}
	return nonNullElems;
};
/* eslint-enable */

const exportedFunctions = {
	concatBuffers : (arrayOfBuffers) => {
		if ( ! Array.isArray(arrayOfBuffers) ) {
			throw new Error('concat must take an array of buffers')
		}

		for (const buffer_ of arrayOfBuffers) {
			if ( ! Buffer.isBuffer(buffer_) ) {
				throw new Error('concat must take an array of buffers')
			}
		}

		return Buffer.concat(arrayOfBuffers)
	},

	toOscString : (inputString, useStrict = false) => {
		if ( typeof inputString !== 'string' ) {
			throw new Error('cannot pack a non-string into an osc-string')
		}

		const nullIndex = inputString.indexOf('\u0000')
		let   thisStr   = inputString

		if (nullIndex !== -1 ) {
			if ( useStrict ) {
				throw new Error('Strict Error : Cannot pack an osc-string that contains NULL characters')
			}
			thisStr = inputString.slice(0, nullIndex)
		}

		for ( let i = fourBytePad(thisStr); i > 0; i-- ) {
			thisStr += '\u0000'
		}

		return Buffer.from(thisStr)
	},

	splitOscString : (buffer, useStrict = false) => {
		if ( ! Buffer.isBuffer(buffer) ) {
			throw new Error('Strict Error : Can\'t split something that isn\'t a buffer')
		}

		const rawString = buffer.toString('utf8')
		const nullIndex = rawString.indexOf('\u0000')

		if (nullIndex === -1) {
			if (useStrict) {
				throw new Error('All osc-strings must contain a null character')
			}
			return {
				string : rawString,
				rest   : Buffer.alloc(0),
			}
		}

		const goodString = rawString.slice(0, nullIndex)
		const splitPoint = Buffer.byteLength(goodString) + fourBytePad(goodString)

		
		if ( useStrict ) {
			if ( splitPoint > buffer.length) {
				throw new Error('Strict Error : Not enough padding for osc-string')
			}
		
			for ( let i = Buffer.byteLength(goodString); i < splitPoint; i++ ) {
				if (buffer[i] !== 0) {
					throw new Error('Strict Error : Not enough or incorrect padding for osc-string')
				}
			}
		}

		return {
			string : goodString,
			rest   : buffer.slice(splitPoint, buffer.length),
		}
	},

	splitInteger : (buffer, passedType = null) => {
		const thisType = ( passedType === null ) ? 'Int32' : passedType
		const bytes    = (binpack[`pack${thisType}`](0)).length
		if (buffer.length < bytes) {
			throw new Error('buffer is not big enough for integer type')
		}

		return {
			integer : binpack[`unpack${thisType}`](buffer.slice(0, bytes), 'big'),
			rest    : buffer.slice(bytes, buffer.length),
		}
	},

	splitTimetag : (buffer) => {
		const intSize = (binpack.packUInt32(0)).length

		if ( buffer.length < (intSize * 2) ) {
			throw new Error('buffer is not big enough to contain a timetag')
		}

		return {
			timetag : [
				binpack.unpackUInt32(buffer.slice(0, intSize), 'big'),
				binpack.unpackUInt32(buffer.slice(intSize, intSize * 2), 'big')
			],
			rest    : buffer.slice(intSize * 2, buffer.length),
		}
	},

	dateToTimetag : (date) => {
		//TODO fix
		return exportedFunctions.timestampToTimetag(date.getTime() / 1000)
	},

	timestampToTimetag : (secs) => {
		const wholeSecs = Math.floor(secs)
		const fracSeconds = secs - wholeSecs
		return makeTimetag(wholeSecs, fracSeconds)
	},

	timetagToTimestamp : (timetag) => {
		const seconds = timetag[0] + exportedFunctions.ntpToFractionalSeconds(timetag[1])
		return seconds - UNIX_EPOCH
	},

	timetagToDate : (timetag) => {
		const seconds    = timetag[0] - UNIX_EPOCH
		const fractional = exportedFunctions.ntpToFractionalSeconds(timetag[1])
		const date       = new Date()
		const dd         = new Date()

		date.setTime((seconds * 1000) + (fractional * 1000))

		dd.setUTCFullYear(date.getUTCFullYear())
		dd.setUTCMonth(date.getUTCMonth())
		dd.setUTCDate(date.getUTCDate())
		dd.setUTCHours(date.getUTCHours())
		dd.setUTCMinutes(date.getUTCMinutes())
		dd.setUTCSeconds(date.getUTCSeconds())
		dd.setUTCMilliseconds(fractional * 1000)
		return dd
	},

	deltaTimetag : (seconds, now = null) => {
		const n = (now !== null ? now : new Date()) / 1000
		return exportedFunctions.timestampToTimetag(n + seconds)
	},

	ntpToFractionalSeconds : (fracSeconds) => {
		return parseFloat(fracSeconds) / TWO_POW_32
	},

	toTimetagBuffer : (timetag) => {
		let realTimeTag = timetag

		if ( typeof timetag === 'number') {
			realTimeTag = exportedFunctions.timestampToTimetag(timetag)
		} else if (typeof timetag === 'object' && ('getTime' in timetag)) {
			realTimeTag = exportedFunctions.dateToTimetag(timetag)
		} else if (timetag.length !== 2) {
			throw new Error(`Invalid timetag : ${timetag}`)
		}

		return Buffer.concat([
			binpack.packUInt32(realTimeTag[0], 'big'),
			binpack.packUInt32(realTimeTag[1], 'big')
		])
	},

	toIntegerBuffer : (number, passedType = null) => {
		const realType = (passedType === null) ? 'Int32' : passedType
		
		if (typeof number !== 'number') {
			throw new Error('cannot pack a non-number into an integer buffer')
		}
		return binpack[`pack${realType}`](number, 'big')
	},

	
	oscTypeCodeToTypeString : (code) => {
		if ( typeof oscTypeCodes[code] !== 'undefined' ) {
			return oscTypeCodes[code].representation
		}
		return void 0
	},

	typeStringToOscTypeCode : (rep) => {
		for ( const singleCharCode of Object.keys(oscTypeCodes) ) {
			if ( oscTypeCodes[singleCharCode].representation === rep ) {
				return singleCharCode
			}
		}
		return null
	},

	// returns single type code, e.g. 's' = 'String'
	argToTypeCode : (arg, strict) => {
		//Got an object, assume with checks it is {type:'string', value:value}
		if ( typeof arg === 'object' ) {
			if ( arg === null )         { return 'N' }
			if ( Buffer.isBuffer(arg) ) { return 'b'}

			if ( typeof arg.type !== 'string' || typeof arg.value === 'undefined') {
				throw new Error('Malformed argument object')
			}
			if ( arg.type.length === 1 ) { return arg.type }
			return exportedFunctions.typeStringToOscTypeCode(arg.type)
		}

		// bare argument, guess the type
		switch ( typeof arg ) {
			case 'undefined' : {
				if ( strict ) { throw new Error('Strict error: argument has no value')}
				return 'N'
			}
			case 'string' :
				return 's'
			case 'number' :
				return Number.isInteger(arg) ? 'i' : 'f'
			case 'boolean' :
				return arg ? 'T' : 'F'
			default :
				throw new Error('unexpected type encountered, unable to guess')
		}
	},

	splitOscArgument : (buffer, type, strict = false) => {
		const oscType = exportedFunctions.typeStringToOscTypeCode(type)
		if (oscType !== null) {
			return oscTypeCodes[oscType].split(buffer, strict)
		}
		throw new Error(`unable to unpack argument of type ${type}`)
	},

	toOscArgument : (value, type, strict = false) => {
		const oscType = exportedFunctions.typeStringToOscTypeCode(type)
		if (oscType !== null) {
			return oscTypeCodes[oscType].toArg(value, strict)
		}
		throw new Error(`unable to pack argument of type ${type}`)
	},

	fromOscMessage : (buffer, strict = false) => {
		const splitString  = exportedFunctions.splitOscString(buffer, strict)
		const oscAddress   = splitString.string
		const oscArgBuffer = splitString.rest

		if (strict && oscAddress[0] !== '/') {
			throw new Error('Strict Error: addresses must start with /')
		}

		if (oscArgBuffer.length === 0) {
			return {
				address : oscAddress,
				args    : [],
			}
		}

		const splitArgList  = exportedFunctions.splitOscString(oscArgBuffer, strict)
		const argListTypes  = splitArgList.string
		let   argListBuffer = splitArgList.rest

		if (argListTypes[0] !== ',') {
			if (strict) {
				throw new Error('Strict Error: Argument lists must begin with ","')
			}
			return {
				address : oscAddress,
				args    : [],
			}
		}

		const typeList   = argListTypes.slice(1, argListTypes.length+1 | 9e9)
		const args       = []
		const arrayStack = [args]

		for ( const thisType of typeList) {
			if (thisType === '[') {
				arrayStack.push([])
				continue
			}
			if (thisType === ']') {
				if ( arrayStack.length <= 1 ) {
					if (strict) {
						throw new Error('Strict Error: Mismatched "]" character.')
					}
				} else {
					const built = arrayStack.pop()
					arrayStack[arrayStack.length - 1].push({
						type  : 'array',
						value : built,
					})
				}
				continue
			}

			const thisTypeString = exportedFunctions.oscTypeCodeToTypeString(thisType)

			if (thisTypeString === null) {
				throw new Error(`unknown argument code of type ${thisType}`)
			}

			const thisArg = exportedFunctions.splitOscArgument(argListBuffer, thisTypeString, strict)

			if (thisArg !== null) {
				argListBuffer = thisArg.rest
			}
			arrayStack[arrayStack.length - 1].push({
				type  : thisTypeString,
				value : thisArg !== null ? thisArg.value : void 0,
			})
		}

		if (arrayStack.length !== 1 && strict) {
			throw new Error('Strict Error: Mismatched "]" character.')
		}

		return {
			address : oscAddress,
			args    : args,
			oscType : 'message',
		}
	},

	fromOscBundle : (bufferIN, strict = false) => {
		const topLevel   = exportedFunctions.splitOscString(bufferIN, strict)
		const bundleTag  = topLevel.string
		let bufferRemain = topLevel.rest

		if (bundleTag !== '#bundle') {
			throw new Error('osc-bundles must begin with #bundle')
		}

		const timetagLevel = exports.splitTimetag(bufferRemain)
		const timetag      = timetagLevel.timetag
		bufferRemain       = timetagLevel.rest

		const elements = mapBundleList(bufferRemain, (thisBuffer) => {
			return exportedFunctions.fromOscPacket(thisBuffer, strict)
		})

		return {
			timetag  : timetag,
			elements : elements,
			oscType  : 'bundle',
		}
	},

	fromOscPacket : (buffer, strict = false) => {
		if (isOscBundleBuffer(buffer, strict)) {
			return exportedFunctions.fromOscBundle(buffer, strict)
		}
		return exportedFunctions.fromOscMessage(buffer, strict)
	},


/*
	

	toOscTypeAndArgs = function(argList, strict) {
		var arg, buff, j, len, oscargs, osctype, ref, thisArgs, thisType, typeCode, value;
		osctype = "";
		oscargs = [];
		for (j = 0, len = argList.length; j < len; j++) {
			arg = argList[j];
			if ((getArrayArg(arg)) != null) {
				ref = toOscTypeAndArgs(getArrayArg(arg), strict), thisType = ref[0], thisArgs = ref[1];
				osctype += "[" + thisType + "]";
				oscargs = oscargs.concat(thisArgs);
				continue;
			}
			typeCode = exports.argToTypeCode(arg, strict);
			if (typeCode != null) {
				value = arg != null ? arg.value : void 0;
				if (value === void 0) {
					value = arg;
				}
				buff = exports.toOscArgument(value, exports.oscTypeCodeToTypeString(typeCode), strict);
				if (buff != null) {
					oscargs.push(buff);
					osctype += typeCode;
				}
			}
		}
		return [osctype, oscargs];
	};

	exports.toOscMessage = function(message, strict) {
		var address, allArgs, args, old_arg, oscaddr, oscargs, osctype, ref;
		address = (message != null ? message.address : void 0) != null ? message.address : message;
		if (typeof address !== "string") {
			throw new Error("message must contain an address");
		}
		args = message != null ? message.args : void 0;
		if (args === void 0) {
			args = [];
		}
		if (!IsArray(args)) {
			old_arg = args;
			args = [];
			args[0] = old_arg;
		}
		oscaddr = exports.toOscString(address, strict);
		ref = toOscTypeAndArgs(args, strict), osctype = ref[0], oscargs = ref[1];
		osctype = "," + osctype;
		allArgs = exports.concat(oscargs);
		osctype = exports.toOscString(osctype);
		return exports.concat([oscaddr, osctype, allArgs]);
	};

	exports.toOscBundle = function(bundle, strict) {
		var allElems, buff, e, elem, elements, elemstr, j, len, oscBundleTag, oscElems, oscTimeTag, ref, ref1, size, timetag;
		if (strict && ((bundle != null ? bundle.timetag : void 0) == null)) {
			throw StrictError("bundles must have timetags.");
		}
		timetag = (ref = bundle != null ? bundle.timetag : void 0) != null ? ref : new Date();
		elements = (ref1 = bundle != null ? bundle.elements : void 0) != null ? ref1 : [];
		if (!IsArray(elements)) {
			elemstr = elements;
			elements = [];
			elements.push(elemstr);
		}
		oscBundleTag = exports.toOscString("\#bundle");
		oscTimeTag = exports.toTimetagBuffer(timetag);
		oscElems = [];
		for (j = 0, len = elements.length; j < len; j++) {
			elem = elements[j];
			try {
				buff = exports.toOscPacket(elem, strict);
				size = exports.toIntegerBuffer(buff.length);
				oscElems.push(exports.concat([size, buff]));
			} catch (error) {
				e = error;
				null;
			}
		}
		allElems = exports.concat(oscElems);
		return exports.concat([oscBundleTag, oscTimeTag, allElems]);
	};

	exports.toOscPacket = function(bundleOrMessage, strict) {
		if ((bundleOrMessage != null ? bundleOrMessage.oscType : void 0) != null) {
			if (bundleOrMessage.oscType === "bundle") {
				return exports.toOscBundle(bundleOrMessage, strict);
			}
			return exports.toOscMessage(bundleOrMessage, strict);
		}
		if (((bundleOrMessage != null ? bundleOrMessage.timetag : void 0) != null) || ((bundleOrMessage != null ? bundleOrMessage.elements : void 0) != null)) {
			return exports.toOscBundle(bundleOrMessage, strict);
		}
		return exports.toOscMessage(bundleOrMessage, strict);
	};

	exports.applyMessageTranformerToBundle = function(transform) {
		return function(buffer) {
			var bundleTagBuffer, copyIndex, elem, elems, j, k, len, len1, lengthBuff, outBuffer, ref, string, timetagBuffer, totalLength;
			ref = exports.splitOscString(buffer), string = ref.string, buffer = ref.rest;
			if (string !== "\#bundle") {
				throw new Error("osc-bundles must begin with \#bundle");
			}
			bundleTagBuffer = exports.toOscString(string);
			timetagBuffer = buffer.slice(0, 8);
			buffer = buffer.slice(8, buffer.length);
			elems = mapBundleList(buffer, function(buffer) {
				return exports.applyTransform(buffer, transform, exports.applyMessageTranformerToBundle(transform));
			});
			totalLength = bundleTagBuffer.length + timetagBuffer.length;
			for (j = 0, len = elems.length; j < len; j++) {
				elem = elems[j];
				totalLength += 4 + elem.length;
			}
			outBuffer = new Buffer(totalLength);
			bundleTagBuffer.copy(outBuffer, 0);
			timetagBuffer.copy(outBuffer, bundleTagBuffer.length);
			copyIndex = bundleTagBuffer.length + timetagBuffer.length;
			for (k = 0, len1 = elems.length; k < len1; k++) {
				elem = elems[k];
				lengthBuff = exports.toIntegerBuffer(elem.length);
				lengthBuff.copy(outBuffer, copyIndex);
				copyIndex += 4;
				elem.copy(outBuffer, copyIndex);
				copyIndex += elem.length;
			}
			return outBuffer;
		};
	};

	exports.applyTransform = function(buffer, mTransform, bundleTransform) {
		if (bundleTransform == null) {
			bundleTransform = exports.applyMessageTranformerToBundle(mTransform);
		}
		if (isOscBundleBuffer(buffer)) {
			return bundleTransform(buffer);
		} else {
			return mTransform(buffer);
		}
	};

	exports.addressTransform = function(transform) {
		return function(buffer) {
			var ref, rest, string;
			ref = exports.splitOscString(buffer), string = ref.string, rest = ref.rest;
			string = transform(string);
			return exports.concat([exports.toOscString(string), rest]);
		};
	};

	exports.messageTransform = function(transform) {
		return function(buffer) {
			var message;
			message = exports.fromOscMessage(buffer);
			return exports.toOscMessage(transform(message));
		};
	};

	

	
	*/
}

module.exports = exportedFunctions


