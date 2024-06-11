var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../node_modules/lodash.camelcase/index.js
var require_lodash = __commonJS({
  "../node_modules/lodash.camelcase/index.js"(exports2, module2) {
    var INFINITY = 1 / 0;
    var symbolTag = "[object Symbol]";
    var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
    var rsAstralRange = "\\ud800-\\udfff";
    var rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23";
    var rsComboSymbolsRange = "\\u20d0-\\u20f0";
    var rsDingbatRange = "\\u2700-\\u27bf";
    var rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff";
    var rsMathOpRange = "\\xac\\xb1\\xd7\\xf7";
    var rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf";
    var rsPunctuationRange = "\\u2000-\\u206f";
    var rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000";
    var rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde";
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
    var rsApos = "['\u2019]";
    var rsAstral = "[" + rsAstralRange + "]";
    var rsBreak = "[" + rsBreakRange + "]";
    var rsCombo = "[" + rsComboMarksRange + rsComboSymbolsRange + "]";
    var rsDigits = "\\d+";
    var rsDingbat = "[" + rsDingbatRange + "]";
    var rsLower = "[" + rsLowerRange + "]";
    var rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]";
    var rsFitz = "\\ud83c[\\udffb-\\udfff]";
    var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
    var rsNonAstral = "[^" + rsAstralRange + "]";
    var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    var rsUpper = "[" + rsUpperRange + "]";
    var rsZWJ = "\\u200d";
    var rsLowerMisc = "(?:" + rsLower + "|" + rsMisc + ")";
    var rsUpperMisc = "(?:" + rsUpper + "|" + rsMisc + ")";
    var rsOptLowerContr = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?";
    var rsOptUpperContr = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?";
    var reOptMod = rsModifier + "?";
    var rsOptVar = "[" + rsVarRange + "]?";
    var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq;
    var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reApos = RegExp(rsApos, "g");
    var reComboMark = RegExp(rsCombo, "g");
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
    var reUnicodeWord = RegExp([
      rsUpper + "?" + rsLower + "+" + rsOptLowerContr + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
      rsUpperMisc + "+" + rsOptUpperContr + "(?=" + [rsBreak, rsUpper + rsLowerMisc, "$"].join("|") + ")",
      rsUpper + "?" + rsLowerMisc + "+" + rsOptLowerContr,
      rsUpper + "+" + rsOptUpperContr,
      rsDigits,
      rsEmoji
    ].join("|"), "g");
    var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + "]");
    var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
    var deburredLetters = {
      // Latin-1 Supplement block.
      "\xC0": "A",
      "\xC1": "A",
      "\xC2": "A",
      "\xC3": "A",
      "\xC4": "A",
      "\xC5": "A",
      "\xE0": "a",
      "\xE1": "a",
      "\xE2": "a",
      "\xE3": "a",
      "\xE4": "a",
      "\xE5": "a",
      "\xC7": "C",
      "\xE7": "c",
      "\xD0": "D",
      "\xF0": "d",
      "\xC8": "E",
      "\xC9": "E",
      "\xCA": "E",
      "\xCB": "E",
      "\xE8": "e",
      "\xE9": "e",
      "\xEA": "e",
      "\xEB": "e",
      "\xCC": "I",
      "\xCD": "I",
      "\xCE": "I",
      "\xCF": "I",
      "\xEC": "i",
      "\xED": "i",
      "\xEE": "i",
      "\xEF": "i",
      "\xD1": "N",
      "\xF1": "n",
      "\xD2": "O",
      "\xD3": "O",
      "\xD4": "O",
      "\xD5": "O",
      "\xD6": "O",
      "\xD8": "O",
      "\xF2": "o",
      "\xF3": "o",
      "\xF4": "o",
      "\xF5": "o",
      "\xF6": "o",
      "\xF8": "o",
      "\xD9": "U",
      "\xDA": "U",
      "\xDB": "U",
      "\xDC": "U",
      "\xF9": "u",
      "\xFA": "u",
      "\xFB": "u",
      "\xFC": "u",
      "\xDD": "Y",
      "\xFD": "y",
      "\xFF": "y",
      "\xC6": "Ae",
      "\xE6": "ae",
      "\xDE": "Th",
      "\xFE": "th",
      "\xDF": "ss",
      // Latin Extended-A block.
      "\u0100": "A",
      "\u0102": "A",
      "\u0104": "A",
      "\u0101": "a",
      "\u0103": "a",
      "\u0105": "a",
      "\u0106": "C",
      "\u0108": "C",
      "\u010A": "C",
      "\u010C": "C",
      "\u0107": "c",
      "\u0109": "c",
      "\u010B": "c",
      "\u010D": "c",
      "\u010E": "D",
      "\u0110": "D",
      "\u010F": "d",
      "\u0111": "d",
      "\u0112": "E",
      "\u0114": "E",
      "\u0116": "E",
      "\u0118": "E",
      "\u011A": "E",
      "\u0113": "e",
      "\u0115": "e",
      "\u0117": "e",
      "\u0119": "e",
      "\u011B": "e",
      "\u011C": "G",
      "\u011E": "G",
      "\u0120": "G",
      "\u0122": "G",
      "\u011D": "g",
      "\u011F": "g",
      "\u0121": "g",
      "\u0123": "g",
      "\u0124": "H",
      "\u0126": "H",
      "\u0125": "h",
      "\u0127": "h",
      "\u0128": "I",
      "\u012A": "I",
      "\u012C": "I",
      "\u012E": "I",
      "\u0130": "I",
      "\u0129": "i",
      "\u012B": "i",
      "\u012D": "i",
      "\u012F": "i",
      "\u0131": "i",
      "\u0134": "J",
      "\u0135": "j",
      "\u0136": "K",
      "\u0137": "k",
      "\u0138": "k",
      "\u0139": "L",
      "\u013B": "L",
      "\u013D": "L",
      "\u013F": "L",
      "\u0141": "L",
      "\u013A": "l",
      "\u013C": "l",
      "\u013E": "l",
      "\u0140": "l",
      "\u0142": "l",
      "\u0143": "N",
      "\u0145": "N",
      "\u0147": "N",
      "\u014A": "N",
      "\u0144": "n",
      "\u0146": "n",
      "\u0148": "n",
      "\u014B": "n",
      "\u014C": "O",
      "\u014E": "O",
      "\u0150": "O",
      "\u014D": "o",
      "\u014F": "o",
      "\u0151": "o",
      "\u0154": "R",
      "\u0156": "R",
      "\u0158": "R",
      "\u0155": "r",
      "\u0157": "r",
      "\u0159": "r",
      "\u015A": "S",
      "\u015C": "S",
      "\u015E": "S",
      "\u0160": "S",
      "\u015B": "s",
      "\u015D": "s",
      "\u015F": "s",
      "\u0161": "s",
      "\u0162": "T",
      "\u0164": "T",
      "\u0166": "T",
      "\u0163": "t",
      "\u0165": "t",
      "\u0167": "t",
      "\u0168": "U",
      "\u016A": "U",
      "\u016C": "U",
      "\u016E": "U",
      "\u0170": "U",
      "\u0172": "U",
      "\u0169": "u",
      "\u016B": "u",
      "\u016D": "u",
      "\u016F": "u",
      "\u0171": "u",
      "\u0173": "u",
      "\u0174": "W",
      "\u0175": "w",
      "\u0176": "Y",
      "\u0177": "y",
      "\u0178": "Y",
      "\u0179": "Z",
      "\u017B": "Z",
      "\u017D": "Z",
      "\u017A": "z",
      "\u017C": "z",
      "\u017E": "z",
      "\u0132": "IJ",
      "\u0133": "ij",
      "\u0152": "Oe",
      "\u0153": "oe",
      "\u0149": "'n",
      "\u017F": "ss"
    };
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    function arrayReduce(array, iteratee, accumulator, initAccum) {
      var index = -1, length = array ? array.length : 0;
      if (initAccum && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }
    function asciiToArray(string) {
      return string.split("");
    }
    function asciiWords(string) {
      return string.match(reAsciiWord) || [];
    }
    function basePropertyOf(object) {
      return function(key) {
        return object == null ? void 0 : object[key];
      };
    }
    var deburrLetter = basePropertyOf(deburredLetters);
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }
    function hasUnicodeWord(string) {
      return reHasUnicodeWord.test(string);
    }
    function stringToArray(string) {
      return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
    }
    function unicodeToArray(string) {
      return string.match(reUnicode) || [];
    }
    function unicodeWords(string) {
      return string.match(reUnicodeWord) || [];
    }
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var Symbol2 = root.Symbol;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseSlice(array, start, end) {
      var index = -1, length = array.length;
      if (start < 0) {
        start = -start > length ? 0 : length + start;
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : end - start >>> 0;
      start >>>= 0;
      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === void 0 ? length : end;
      return !start && end >= length ? array : baseSlice(array, start, end);
    }
    function createCaseFirst(methodName) {
      return function(string) {
        string = toString(string);
        var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
        var chr = strSymbols ? strSymbols[0] : string.charAt(0);
        var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
        return chr[methodName]() + trailing;
      };
    }
    function createCompounder(callback) {
      return function(string) {
        return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
      };
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? capitalize(word) : word);
    });
    function capitalize(string) {
      return upperFirst(toString(string).toLowerCase());
    }
    function deburr(string) {
      string = toString(string);
      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
    }
    var upperFirst = createCaseFirst("toUpperCase");
    function words(string, pattern, guard) {
      string = toString(string);
      pattern = guard ? void 0 : pattern;
      if (pattern === void 0) {
        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
      }
      return string.match(pattern) || [];
    }
    module2.exports = camelCase;
  }
});

// ../node_modules/command-line-args/dist/index.js
var require_dist = __commonJS({
  "../node_modules/command-line-args/dist/index.js"(exports2, module2) {
    "use strict";
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var camelCase = _interopDefault(require_lodash());
    function isObject(input) {
      return typeof input === "object" && input !== null;
    }
    function isArrayLike(input) {
      return isObject(input) && typeof input.length === "number";
    }
    function arrayify(input) {
      if (Array.isArray(input)) {
        return input;
      }
      if (input === void 0) {
        return [];
      }
      if (isArrayLike(input) || input instanceof Set) {
        return Array.from(input);
      }
      return [input];
    }
    function isObject$1(input) {
      return typeof input === "object" && input !== null;
    }
    function isArrayLike$1(input) {
      return isObject$1(input) && typeof input.length === "number";
    }
    function arrayify$1(input) {
      if (Array.isArray(input)) {
        return input;
      } else {
        if (input === void 0) {
          return [];
        } else if (isArrayLike$1(input)) {
          return Array.prototype.slice.call(input);
        } else {
          return [input];
        }
      }
    }
    function findReplace(array, testFn) {
      const found = [];
      const replaceWiths = arrayify$1(arguments);
      replaceWiths.splice(0, 2);
      arrayify$1(array).forEach((value, index) => {
        let expanded = [];
        replaceWiths.forEach((replaceWith) => {
          if (typeof replaceWith === "function") {
            expanded = expanded.concat(replaceWith(value));
          } else {
            expanded.push(replaceWith);
          }
        });
        if (testFn(value)) {
          found.push({
            index,
            replaceWithValue: expanded
          });
        }
      });
      found.reverse().forEach((item) => {
        const spliceArgs = [item.index, 1].concat(item.replaceWithValue);
        array.splice.apply(array, spliceArgs);
      });
      return array;
    }
    var re = {
      short: /^-([^\d-])$/,
      long: /^--(\S+)/,
      combinedShort: /^-[^\d-]{2,}$/,
      optEquals: /^(--\S+?)=(.*)/
    };
    var ArgvArray = class extends Array {
      /**
       * Clears the array has loads the supplied input.
       * @param {string[]} argv - The argv list to load. Defaults to `process.argv`.
       */
      load(argv) {
        this.clear();
        if (argv && argv !== process.argv) {
          argv = arrayify(argv);
        } else {
          argv = process.argv.slice(0);
          const deleteCount = process.execArgv.some(isExecArg) ? 1 : 2;
          argv.splice(0, deleteCount);
        }
        argv.forEach((arg) => this.push(String(arg)));
      }
      /**
       * Clear the array.
       */
      clear() {
        this.length = 0;
      }
      /**
       * expand ``--option=value` style args.
       */
      expandOptionEqualsNotation() {
        if (this.some((arg) => re.optEquals.test(arg))) {
          const expandedArgs = [];
          this.forEach((arg) => {
            const matches = arg.match(re.optEquals);
            if (matches) {
              expandedArgs.push(matches[1], matches[2]);
            } else {
              expandedArgs.push(arg);
            }
          });
          this.clear();
          this.load(expandedArgs);
        }
      }
      /**
       * expand getopt-style combinedShort options.
       */
      expandGetoptNotation() {
        if (this.hasCombinedShortOptions()) {
          findReplace(this, re.combinedShort, expandCombinedShortArg);
        }
      }
      /**
       * Returns true if the array contains combined short options (e.g. `-ab`).
       * @returns {boolean}
       */
      hasCombinedShortOptions() {
        return this.some((arg) => re.combinedShort.test(arg));
      }
      static from(argv) {
        const result = new this();
        result.load(argv);
        return result;
      }
    };
    function expandCombinedShortArg(arg) {
      arg = arg.slice(1);
      return arg.split("").map((letter) => "-" + letter);
    }
    function isOptionEqualsNotation(arg) {
      return re.optEquals.test(arg);
    }
    function isOption(arg) {
      return (re.short.test(arg) || re.long.test(arg)) && !re.optEquals.test(arg);
    }
    function isLongOption(arg) {
      return re.long.test(arg) && !isOptionEqualsNotation(arg);
    }
    function getOptionName(arg) {
      if (re.short.test(arg)) {
        return arg.match(re.short)[1];
      } else if (isLongOption(arg)) {
        return arg.match(re.long)[1];
      } else if (isOptionEqualsNotation(arg)) {
        return arg.match(re.optEquals)[1].replace(/^--/, "");
      } else {
        return null;
      }
    }
    function isValue(arg) {
      return !(isOption(arg) || re.combinedShort.test(arg) || re.optEquals.test(arg));
    }
    function isExecArg(arg) {
      return ["--eval", "-e"].indexOf(arg) > -1 || arg.startsWith("--eval=");
    }
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function isPlainObject(input) {
      return input !== null && typeof input === "object" && input.constructor === Object;
    }
    function isArrayLike$2(input) {
      return isObject$2(input) && typeof input.length === "number";
    }
    function isObject$2(input) {
      return typeof input === "object" && input !== null;
    }
    function isDefined(input) {
      return typeof input !== "undefined";
    }
    function isString(input) {
      return typeof input === "string";
    }
    function isBoolean(input) {
      return typeof input === "boolean";
    }
    function isFunction(input) {
      return typeof input === "function";
    }
    function isClass(input) {
      if (isFunction(input)) {
        return /^class /.test(Function.prototype.toString.call(input));
      } else {
        return false;
      }
    }
    function isPrimitive(input) {
      if (input === null) return true;
      switch (typeof input) {
        case "string":
        case "number":
        case "symbol":
        case "undefined":
        case "boolean":
          return true;
        default:
          return false;
      }
    }
    function isPromise(input) {
      if (input) {
        const isPromise2 = isDefined(Promise) && input instanceof Promise;
        const isThenable = input.then && typeof input.then === "function";
        return !!(isPromise2 || isThenable);
      } else {
        return false;
      }
    }
    function isIterable(input) {
      if (input === null || !isDefined(input)) {
        return false;
      } else {
        return typeof input[Symbol.iterator] === "function" || typeof input[Symbol.asyncIterator] === "function";
      }
    }
    var t = {
      isNumber,
      isString,
      isBoolean,
      isPlainObject,
      isArrayLike: isArrayLike$2,
      isObject: isObject$2,
      isDefined,
      isFunction,
      isClass,
      isPrimitive,
      isPromise,
      isIterable
    };
    var OptionDefinition = class {
      constructor(definition) {
        this.name = definition.name;
        this.type = definition.type || String;
        this.alias = definition.alias;
        this.multiple = definition.multiple;
        this.lazyMultiple = definition.lazyMultiple;
        this.defaultOption = definition.defaultOption;
        this.defaultValue = definition.defaultValue;
        this.group = definition.group;
        for (const prop in definition) {
          if (!this[prop]) this[prop] = definition[prop];
        }
      }
      isBoolean() {
        return this.type === Boolean || t.isFunction(this.type) && this.type.name === "Boolean";
      }
      isMultiple() {
        return this.multiple || this.lazyMultiple;
      }
      static create(def) {
        const result = new this(def);
        return result;
      }
    };
    var Definitions = class extends Array {
      /**
       * validate option definitions
       * @param {boolean} [caseInsensitive=false] - whether arguments will be parsed in a case insensitive manner
       * @returns {string}
       */
      validate(caseInsensitive) {
        const someHaveNoName = this.some((def) => !def.name);
        if (someHaveNoName) {
          halt(
            "INVALID_DEFINITIONS",
            "Invalid option definitions: the `name` property is required on each definition"
          );
        }
        const someDontHaveFunctionType = this.some((def) => def.type && typeof def.type !== "function");
        if (someDontHaveFunctionType) {
          halt(
            "INVALID_DEFINITIONS",
            "Invalid option definitions: the `type` property must be a setter fuction (default: `Boolean`)"
          );
        }
        let invalidOption;
        const numericAlias = this.some((def) => {
          invalidOption = def;
          return t.isDefined(def.alias) && t.isNumber(def.alias);
        });
        if (numericAlias) {
          halt(
            "INVALID_DEFINITIONS",
            "Invalid option definition: to avoid ambiguity an alias cannot be numeric [--" + invalidOption.name + " alias is -" + invalidOption.alias + "]"
          );
        }
        const multiCharacterAlias = this.some((def) => {
          invalidOption = def;
          return t.isDefined(def.alias) && def.alias.length !== 1;
        });
        if (multiCharacterAlias) {
          halt(
            "INVALID_DEFINITIONS",
            "Invalid option definition: an alias must be a single character"
          );
        }
        const hypenAlias = this.some((def) => {
          invalidOption = def;
          return def.alias === "-";
        });
        if (hypenAlias) {
          halt(
            "INVALID_DEFINITIONS",
            'Invalid option definition: an alias cannot be "-"'
          );
        }
        const duplicateName = hasDuplicates(this.map((def) => caseInsensitive ? def.name.toLowerCase() : def.name));
        if (duplicateName) {
          halt(
            "INVALID_DEFINITIONS",
            "Two or more option definitions have the same name"
          );
        }
        const duplicateAlias = hasDuplicates(this.map((def) => caseInsensitive && t.isDefined(def.alias) ? def.alias.toLowerCase() : def.alias));
        if (duplicateAlias) {
          halt(
            "INVALID_DEFINITIONS",
            "Two or more option definitions have the same alias"
          );
        }
        const duplicateDefaultOption = this.filter((def) => def.defaultOption === true).length > 1;
        if (duplicateDefaultOption) {
          halt(
            "INVALID_DEFINITIONS",
            "Only one option definition can be the defaultOption"
          );
        }
        const defaultBoolean = this.some((def) => {
          invalidOption = def;
          return def.isBoolean() && def.defaultOption;
        });
        if (defaultBoolean) {
          halt(
            "INVALID_DEFINITIONS",
            `A boolean option ["${invalidOption.name}"] can not also be the defaultOption.`
          );
        }
      }
      /**
       * Get definition by option arg (e.g. `--one` or `-o`)
       * @param {string} [arg] the argument name to get the definition for
       * @param {boolean} [caseInsensitive] whether to use case insensitive comparisons when finding the appropriate definition
       * @returns {Definition}
       */
      get(arg, caseInsensitive) {
        if (isOption(arg)) {
          if (re.short.test(arg)) {
            const shortOptionName = getOptionName(arg);
            if (caseInsensitive) {
              const lowercaseShortOptionName = shortOptionName.toLowerCase();
              return this.find((def) => t.isDefined(def.alias) && def.alias.toLowerCase() === lowercaseShortOptionName);
            } else {
              return this.find((def) => def.alias === shortOptionName);
            }
          } else {
            const optionName = getOptionName(arg);
            if (caseInsensitive) {
              const lowercaseOptionName = optionName.toLowerCase();
              return this.find((def) => def.name.toLowerCase() === lowercaseOptionName);
            } else {
              return this.find((def) => def.name === optionName);
            }
          }
        } else {
          return this.find((def) => def.name === arg);
        }
      }
      getDefault() {
        return this.find((def) => def.defaultOption === true);
      }
      isGrouped() {
        return this.some((def) => def.group);
      }
      whereGrouped() {
        return this.filter(containsValidGroup);
      }
      whereNotGrouped() {
        return this.filter((def) => !containsValidGroup(def));
      }
      whereDefaultValueSet() {
        return this.filter((def) => t.isDefined(def.defaultValue));
      }
      static from(definitions, caseInsensitive) {
        if (definitions instanceof this) return definitions;
        const result = super.from(arrayify(definitions), (def) => OptionDefinition.create(def));
        result.validate(caseInsensitive);
        return result;
      }
    };
    function halt(name, message) {
      const err = new Error(message);
      err.name = name;
      throw err;
    }
    function containsValidGroup(def) {
      return arrayify(def.group).some((group) => group);
    }
    function hasDuplicates(array) {
      const items = {};
      for (let i = 0; i < array.length; i++) {
        const value = array[i];
        if (items[value]) {
          return true;
        } else {
          if (t.isDefined(value)) items[value] = true;
        }
      }
    }
    var ArgvParser = class {
      /**
       * @param {OptionDefinitions} - Definitions array
       * @param {object} [options] - Options
       * @param {string[]} [options.argv] - Overrides `process.argv`
       * @param {boolean} [options.stopAtFirstUnknown] -
       * @param {boolean} [options.caseInsensitive] - Arguments will be parsed in a case insensitive manner. Defaults to false.
       */
      constructor(definitions, options2) {
        this.options = Object.assign({}, options2);
        this.definitions = Definitions.from(definitions, this.options.caseInsensitive);
        this.argv = ArgvArray.from(this.options.argv);
        if (this.argv.hasCombinedShortOptions()) {
          findReplace(this.argv, re.combinedShort.test.bind(re.combinedShort), (arg) => {
            arg = arg.slice(1);
            return arg.split("").map((letter) => ({ origArg: `-${arg}`, arg: "-" + letter }));
          });
        }
      }
      /**
       * Yields one `{ event, name, value, arg, def }` argInfo object for each arg in `process.argv` (or `options.argv`).
       */
      *[Symbol.iterator]() {
        const definitions = this.definitions;
        let def;
        let value;
        let name;
        let event;
        let singularDefaultSet = false;
        let unknownFound = false;
        let origArg;
        for (let arg of this.argv) {
          if (t.isPlainObject(arg)) {
            origArg = arg.origArg;
            arg = arg.arg;
          }
          if (unknownFound && this.options.stopAtFirstUnknown) {
            yield { event: "unknown_value", arg, name: "_unknown", value: void 0 };
            continue;
          }
          if (isOption(arg)) {
            def = definitions.get(arg, this.options.caseInsensitive);
            value = void 0;
            if (def) {
              value = def.isBoolean() ? true : null;
              event = "set";
            } else {
              event = "unknown_option";
            }
          } else if (isOptionEqualsNotation(arg)) {
            const matches = arg.match(re.optEquals);
            def = definitions.get(matches[1], this.options.caseInsensitive);
            if (def) {
              if (def.isBoolean()) {
                yield { event: "unknown_value", arg, name: "_unknown", value, def };
                event = "set";
                value = true;
              } else {
                event = "set";
                value = matches[2];
              }
            } else {
              event = "unknown_option";
            }
          } else if (isValue(arg)) {
            if (def) {
              value = arg;
              event = "set";
            } else {
              def = this.definitions.getDefault();
              if (def && !singularDefaultSet) {
                value = arg;
                event = "set";
              } else {
                event = "unknown_value";
                def = void 0;
              }
            }
          }
          name = def ? def.name : "_unknown";
          const argInfo = { event, arg, name, value, def };
          if (origArg) {
            argInfo.subArg = arg;
            argInfo.arg = origArg;
          }
          yield argInfo;
          if (name === "_unknown") unknownFound = true;
          if (def && def.defaultOption && !def.isMultiple() && event === "set") singularDefaultSet = true;
          if (def && def.isBoolean()) def = void 0;
          if (def && !def.multiple && t.isDefined(value) && value !== null) {
            def = void 0;
          }
          value = void 0;
          event = void 0;
          name = void 0;
          origArg = void 0;
        }
      }
    };
    var _value = /* @__PURE__ */ new WeakMap();
    var Option = class {
      constructor(definition) {
        this.definition = new OptionDefinition(definition);
        this.state = null;
        this.resetToDefault();
      }
      get() {
        return _value.get(this);
      }
      set(val) {
        this._set(val, "set");
      }
      _set(val, state) {
        const def = this.definition;
        if (def.isMultiple()) {
          if (val !== null && val !== void 0) {
            const arr = this.get();
            if (this.state === "default") arr.length = 0;
            arr.push(def.type(val));
            this.state = state;
          }
        } else {
          if (!def.isMultiple() && this.state === "set") {
            const err = new Error(`Singular option already set [${this.definition.name}=${this.get()}]`);
            err.name = "ALREADY_SET";
            err.value = val;
            err.optionName = def.name;
            throw err;
          } else if (val === null || val === void 0) {
            _value.set(this, val);
          } else {
            _value.set(this, def.type(val));
            this.state = state;
          }
        }
      }
      resetToDefault() {
        if (t.isDefined(this.definition.defaultValue)) {
          if (this.definition.isMultiple()) {
            _value.set(this, arrayify(this.definition.defaultValue).slice());
          } else {
            _value.set(this, this.definition.defaultValue);
          }
        } else {
          if (this.definition.isMultiple()) {
            _value.set(this, []);
          } else {
            _value.set(this, null);
          }
        }
        this.state = "default";
      }
      static create(definition) {
        definition = new OptionDefinition(definition);
        if (definition.isBoolean()) {
          return FlagOption.create(definition);
        } else {
          return new this(definition);
        }
      }
    };
    var FlagOption = class extends Option {
      set(val) {
        super.set(true);
      }
      static create(def) {
        return new this(def);
      }
    };
    var Output = class extends Map {
      constructor(definitions) {
        super();
        this.definitions = Definitions.from(definitions);
        this.set("_unknown", Option.create({ name: "_unknown", multiple: true }));
        for (const def of this.definitions.whereDefaultValueSet()) {
          this.set(def.name, Option.create(def));
        }
      }
      toObject(options2) {
        options2 = options2 || {};
        const output = {};
        for (const item of this) {
          const name = options2.camelCase && item[0] !== "_unknown" ? camelCase(item[0]) : item[0];
          const option = item[1];
          if (name === "_unknown" && !option.get().length) continue;
          output[name] = option.get();
        }
        if (options2.skipUnknown) delete output._unknown;
        return output;
      }
    };
    var GroupedOutput = class extends Output {
      toObject(options2) {
        const superOutputNoCamel = super.toObject({ skipUnknown: options2.skipUnknown });
        const superOutput = super.toObject(options2);
        const unknown = superOutput._unknown;
        delete superOutput._unknown;
        const grouped = {
          _all: superOutput
        };
        if (unknown && unknown.length) grouped._unknown = unknown;
        this.definitions.whereGrouped().forEach((def) => {
          const name = options2.camelCase ? camelCase(def.name) : def.name;
          const outputValue = superOutputNoCamel[def.name];
          for (const groupName of arrayify(def.group)) {
            grouped[groupName] = grouped[groupName] || {};
            if (t.isDefined(outputValue)) {
              grouped[groupName][name] = outputValue;
            }
          }
        });
        this.definitions.whereNotGrouped().forEach((def) => {
          const name = options2.camelCase ? camelCase(def.name) : def.name;
          const outputValue = superOutputNoCamel[def.name];
          if (t.isDefined(outputValue)) {
            if (!grouped._none) grouped._none = {};
            grouped._none[name] = outputValue;
          }
        });
        return grouped;
      }
    };
    function commandLineArgs2(optionDefinitions, options2) {
      options2 = options2 || {};
      if (options2.stopAtFirstUnknown) options2.partial = true;
      optionDefinitions = Definitions.from(optionDefinitions, options2.caseInsensitive);
      const parser = new ArgvParser(optionDefinitions, {
        argv: options2.argv,
        stopAtFirstUnknown: options2.stopAtFirstUnknown,
        caseInsensitive: options2.caseInsensitive
      });
      const OutputClass = optionDefinitions.isGrouped() ? GroupedOutput : Output;
      const output = new OutputClass(optionDefinitions);
      for (const argInfo of parser) {
        const arg = argInfo.subArg || argInfo.arg;
        if (!options2.partial) {
          if (argInfo.event === "unknown_value") {
            const err = new Error(`Unknown value: ${arg}`);
            err.name = "UNKNOWN_VALUE";
            err.value = arg;
            throw err;
          } else if (argInfo.event === "unknown_option") {
            const err = new Error(`Unknown option: ${arg}`);
            err.name = "UNKNOWN_OPTION";
            err.optionName = arg;
            throw err;
          }
        }
        let option;
        if (output.has(argInfo.name)) {
          option = output.get(argInfo.name);
        } else {
          option = Option.create(argInfo.def);
          output.set(argInfo.name, option);
        }
        if (argInfo.name === "_unknown") {
          option.set(arg);
        } else {
          option.set(argInfo.value);
        }
      }
      return output.toObject({ skipUnknown: !options2.partial, camelCase: options2.camelCase });
    }
    module2.exports = commandLineArgs2;
  }
});

// ../node_modules/command-line-usage/dist/index.cjs
var require_dist2 = __commonJS({
  "../node_modules/command-line-usage/dist/index.cjs"(exports2, module2) {
    "use strict";
    var require$$0 = require("os");
    var require$$1 = require("tty");
    function isObject$2(input) {
      return typeof input === "object" && input !== null;
    }
    function isArrayLike$2(input) {
      return isObject$2(input) && typeof input.length === "number";
    }
    function arrayify(input) {
      if (Array.isArray(input)) {
        return input;
      } else if (input === void 0) {
        return [];
      } else if (isArrayLike$2(input) || input instanceof Set) {
        return Array.from(input);
      } else {
        return [input];
      }
    }
    var colorName;
    var hasRequiredColorName;
    function requireColorName() {
      if (hasRequiredColorName) return colorName;
      hasRequiredColorName = 1;
      colorName = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
      };
      return colorName;
    }
    var conversions;
    var hasRequiredConversions;
    function requireConversions() {
      if (hasRequiredConversions) return conversions;
      hasRequiredConversions = 1;
      const cssKeywords = requireColorName();
      const reverseKeywords = {};
      for (const key of Object.keys(cssKeywords)) {
        reverseKeywords[cssKeywords[key]] = key;
      }
      const convert = {
        rgb: { channels: 3, labels: "rgb" },
        hsl: { channels: 3, labels: "hsl" },
        hsv: { channels: 3, labels: "hsv" },
        hwb: { channels: 3, labels: "hwb" },
        cmyk: { channels: 4, labels: "cmyk" },
        xyz: { channels: 3, labels: "xyz" },
        lab: { channels: 3, labels: "lab" },
        lch: { channels: 3, labels: "lch" },
        hex: { channels: 1, labels: ["hex"] },
        keyword: { channels: 1, labels: ["keyword"] },
        ansi16: { channels: 1, labels: ["ansi16"] },
        ansi256: { channels: 1, labels: ["ansi256"] },
        hcg: { channels: 3, labels: ["h", "c", "g"] },
        apple: { channels: 3, labels: ["r16", "g16", "b16"] },
        gray: { channels: 1, labels: ["gray"] }
      };
      conversions = convert;
      for (const model of Object.keys(convert)) {
        if (!("channels" in convert[model])) {
          throw new Error("missing channels property: " + model);
        }
        if (!("labels" in convert[model])) {
          throw new Error("missing channel labels property: " + model);
        }
        if (convert[model].labels.length !== convert[model].channels) {
          throw new Error("channel and label counts mismatch: " + model);
        }
        const { channels, labels } = convert[model];
        delete convert[model].channels;
        delete convert[model].labels;
        Object.defineProperty(convert[model], "channels", { value: channels });
        Object.defineProperty(convert[model], "labels", { value: labels });
      }
      convert.rgb.hsl = function(rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b2 = rgb[2] / 255;
        const min = Math.min(r, g, b2);
        const max = Math.max(r, g, b2);
        const delta = max - min;
        let h;
        let s;
        if (max === min) {
          h = 0;
        } else if (r === max) {
          h = (g - b2) / delta;
        } else if (g === max) {
          h = 2 + (b2 - r) / delta;
        } else if (b2 === max) {
          h = 4 + (r - g) / delta;
        }
        h = Math.min(h * 60, 360);
        if (h < 0) {
          h += 360;
        }
        const l = (min + max) / 2;
        if (max === min) {
          s = 0;
        } else if (l <= 0.5) {
          s = delta / (max + min);
        } else {
          s = delta / (2 - max - min);
        }
        return [h, s * 100, l * 100];
      };
      convert.rgb.hsv = function(rgb) {
        let rdif;
        let gdif;
        let bdif;
        let h;
        let s;
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b2 = rgb[2] / 255;
        const v = Math.max(r, g, b2);
        const diff = v - Math.min(r, g, b2);
        const diffc = function(c) {
          return (v - c) / 6 / diff + 1 / 2;
        };
        if (diff === 0) {
          h = 0;
          s = 0;
        } else {
          s = diff / v;
          rdif = diffc(r);
          gdif = diffc(g);
          bdif = diffc(b2);
          if (r === v) {
            h = bdif - gdif;
          } else if (g === v) {
            h = 1 / 3 + rdif - bdif;
          } else if (b2 === v) {
            h = 2 / 3 + gdif - rdif;
          }
          if (h < 0) {
            h += 1;
          } else if (h > 1) {
            h -= 1;
          }
        }
        return [
          h * 360,
          s * 100,
          v * 100
        ];
      };
      convert.rgb.hwb = function(rgb) {
        const r = rgb[0];
        const g = rgb[1];
        let b2 = rgb[2];
        const h = convert.rgb.hsl(rgb)[0];
        const w = 1 / 255 * Math.min(r, Math.min(g, b2));
        b2 = 1 - 1 / 255 * Math.max(r, Math.max(g, b2));
        return [h, w * 100, b2 * 100];
      };
      convert.rgb.cmyk = function(rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b2 = rgb[2] / 255;
        const k = Math.min(1 - r, 1 - g, 1 - b2);
        const c = (1 - r - k) / (1 - k) || 0;
        const m = (1 - g - k) / (1 - k) || 0;
        const y = (1 - b2 - k) / (1 - k) || 0;
        return [c * 100, m * 100, y * 100, k * 100];
      };
      function comparativeDistance(x, y) {
        return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
      }
      convert.rgb.keyword = function(rgb) {
        const reversed = reverseKeywords[rgb];
        if (reversed) {
          return reversed;
        }
        let currentClosestDistance = Infinity;
        let currentClosestKeyword;
        for (const keyword of Object.keys(cssKeywords)) {
          const value = cssKeywords[keyword];
          const distance = comparativeDistance(rgb, value);
          if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
          }
        }
        return currentClosestKeyword;
      };
      convert.keyword.rgb = function(keyword) {
        return cssKeywords[keyword];
      };
      convert.rgb.xyz = function(rgb) {
        let r = rgb[0] / 255;
        let g = rgb[1] / 255;
        let b2 = rgb[2] / 255;
        r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
        g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
        b2 = b2 > 0.04045 ? ((b2 + 0.055) / 1.055) ** 2.4 : b2 / 12.92;
        const x = r * 0.4124 + g * 0.3576 + b2 * 0.1805;
        const y = r * 0.2126 + g * 0.7152 + b2 * 0.0722;
        const z = r * 0.0193 + g * 0.1192 + b2 * 0.9505;
        return [x * 100, y * 100, z * 100];
      };
      convert.rgb.lab = function(rgb) {
        const xyz = convert.rgb.xyz(rgb);
        let x = xyz[0];
        let y = xyz[1];
        let z = xyz[2];
        x /= 95.047;
        y /= 100;
        z /= 108.883;
        x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
        y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
        z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
        const l = 116 * y - 16;
        const a = 500 * (x - y);
        const b2 = 200 * (y - z);
        return [l, a, b2];
      };
      convert.hsl.rgb = function(hsl) {
        const h = hsl[0] / 360;
        const s = hsl[1] / 100;
        const l = hsl[2] / 100;
        let t2;
        let t3;
        let val;
        if (s === 0) {
          val = l * 255;
          return [val, val, val];
        }
        if (l < 0.5) {
          t2 = l * (1 + s);
        } else {
          t2 = l + s - l * s;
        }
        const t1 = 2 * l - t2;
        const rgb = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
          t3 = h + 1 / 3 * -(i - 1);
          if (t3 < 0) {
            t3++;
          }
          if (t3 > 1) {
            t3--;
          }
          if (6 * t3 < 1) {
            val = t1 + (t2 - t1) * 6 * t3;
          } else if (2 * t3 < 1) {
            val = t2;
          } else if (3 * t3 < 2) {
            val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
          } else {
            val = t1;
          }
          rgb[i] = val * 255;
        }
        return rgb;
      };
      convert.hsl.hsv = function(hsl) {
        const h = hsl[0];
        let s = hsl[1] / 100;
        let l = hsl[2] / 100;
        let smin = s;
        const lmin = Math.max(l, 0.01);
        l *= 2;
        s *= l <= 1 ? l : 2 - l;
        smin *= lmin <= 1 ? lmin : 2 - lmin;
        const v = (l + s) / 2;
        const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
        return [h, sv * 100, v * 100];
      };
      convert.hsv.rgb = function(hsv) {
        const h = hsv[0] / 60;
        const s = hsv[1] / 100;
        let v = hsv[2] / 100;
        const hi = Math.floor(h) % 6;
        const f = h - Math.floor(h);
        const p = 255 * v * (1 - s);
        const q = 255 * v * (1 - s * f);
        const t2 = 255 * v * (1 - s * (1 - f));
        v *= 255;
        switch (hi) {
          case 0:
            return [v, t2, p];
          case 1:
            return [q, v, p];
          case 2:
            return [p, v, t2];
          case 3:
            return [p, q, v];
          case 4:
            return [t2, p, v];
          case 5:
            return [v, p, q];
        }
      };
      convert.hsv.hsl = function(hsv) {
        const h = hsv[0];
        const s = hsv[1] / 100;
        const v = hsv[2] / 100;
        const vmin = Math.max(v, 0.01);
        let sl;
        let l;
        l = (2 - s) * v;
        const lmin = (2 - s) * vmin;
        sl = s * vmin;
        sl /= lmin <= 1 ? lmin : 2 - lmin;
        sl = sl || 0;
        l /= 2;
        return [h, sl * 100, l * 100];
      };
      convert.hwb.rgb = function(hwb) {
        const h = hwb[0] / 360;
        let wh = hwb[1] / 100;
        let bl = hwb[2] / 100;
        const ratio = wh + bl;
        let f;
        if (ratio > 1) {
          wh /= ratio;
          bl /= ratio;
        }
        const i = Math.floor(6 * h);
        const v = 1 - bl;
        f = 6 * h - i;
        if ((i & 1) !== 0) {
          f = 1 - f;
        }
        const n = wh + f * (v - wh);
        let r;
        let g;
        let b2;
        switch (i) {
          default:
          case 6:
          case 0:
            r = v;
            g = n;
            b2 = wh;
            break;
          case 1:
            r = n;
            g = v;
            b2 = wh;
            break;
          case 2:
            r = wh;
            g = v;
            b2 = n;
            break;
          case 3:
            r = wh;
            g = n;
            b2 = v;
            break;
          case 4:
            r = n;
            g = wh;
            b2 = v;
            break;
          case 5:
            r = v;
            g = wh;
            b2 = n;
            break;
        }
        return [r * 255, g * 255, b2 * 255];
      };
      convert.cmyk.rgb = function(cmyk) {
        const c = cmyk[0] / 100;
        const m = cmyk[1] / 100;
        const y = cmyk[2] / 100;
        const k = cmyk[3] / 100;
        const r = 1 - Math.min(1, c * (1 - k) + k);
        const g = 1 - Math.min(1, m * (1 - k) + k);
        const b2 = 1 - Math.min(1, y * (1 - k) + k);
        return [r * 255, g * 255, b2 * 255];
      };
      convert.xyz.rgb = function(xyz) {
        const x = xyz[0] / 100;
        const y = xyz[1] / 100;
        const z = xyz[2] / 100;
        let r;
        let g;
        let b2;
        r = x * 3.2406 + y * -1.5372 + z * -0.4986;
        g = x * -0.9689 + y * 1.8758 + z * 0.0415;
        b2 = x * 0.0557 + y * -0.204 + z * 1.057;
        r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
        g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
        b2 = b2 > 31308e-7 ? 1.055 * b2 ** (1 / 2.4) - 0.055 : b2 * 12.92;
        r = Math.min(Math.max(0, r), 1);
        g = Math.min(Math.max(0, g), 1);
        b2 = Math.min(Math.max(0, b2), 1);
        return [r * 255, g * 255, b2 * 255];
      };
      convert.xyz.lab = function(xyz) {
        let x = xyz[0];
        let y = xyz[1];
        let z = xyz[2];
        x /= 95.047;
        y /= 100;
        z /= 108.883;
        x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
        y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
        z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
        const l = 116 * y - 16;
        const a = 500 * (x - y);
        const b2 = 200 * (y - z);
        return [l, a, b2];
      };
      convert.lab.xyz = function(lab) {
        const l = lab[0];
        const a = lab[1];
        const b2 = lab[2];
        let x;
        let y;
        let z;
        y = (l + 16) / 116;
        x = a / 500 + y;
        z = y - b2 / 200;
        const y2 = y ** 3;
        const x2 = x ** 3;
        const z2 = z ** 3;
        y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
        x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
        z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
        x *= 95.047;
        y *= 100;
        z *= 108.883;
        return [x, y, z];
      };
      convert.lab.lch = function(lab) {
        const l = lab[0];
        const a = lab[1];
        const b2 = lab[2];
        let h;
        const hr = Math.atan2(b2, a);
        h = hr * 360 / 2 / Math.PI;
        if (h < 0) {
          h += 360;
        }
        const c = Math.sqrt(a * a + b2 * b2);
        return [l, c, h];
      };
      convert.lch.lab = function(lch) {
        const l = lch[0];
        const c = lch[1];
        const h = lch[2];
        const hr = h / 360 * 2 * Math.PI;
        const a = c * Math.cos(hr);
        const b2 = c * Math.sin(hr);
        return [l, a, b2];
      };
      convert.rgb.ansi16 = function(args, saturation = null) {
        const [r, g, b2] = args;
        let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
        value = Math.round(value / 50);
        if (value === 0) {
          return 30;
        }
        let ansi = 30 + (Math.round(b2 / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
        if (value === 2) {
          ansi += 60;
        }
        return ansi;
      };
      convert.hsv.ansi16 = function(args) {
        return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
      };
      convert.rgb.ansi256 = function(args) {
        const r = args[0];
        const g = args[1];
        const b2 = args[2];
        if (r === g && g === b2) {
          if (r < 8) {
            return 16;
          }
          if (r > 248) {
            return 231;
          }
          return Math.round((r - 8) / 247 * 24) + 232;
        }
        const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b2 / 255 * 5);
        return ansi;
      };
      convert.ansi16.rgb = function(args) {
        let color = args % 10;
        if (color === 0 || color === 7) {
          if (args > 50) {
            color += 3.5;
          }
          color = color / 10.5 * 255;
          return [color, color, color];
        }
        const mult = (~~(args > 50) + 1) * 0.5;
        const r = (color & 1) * mult * 255;
        const g = (color >> 1 & 1) * mult * 255;
        const b2 = (color >> 2 & 1) * mult * 255;
        return [r, g, b2];
      };
      convert.ansi256.rgb = function(args) {
        if (args >= 232) {
          const c = (args - 232) * 10 + 8;
          return [c, c, c];
        }
        args -= 16;
        let rem;
        const r = Math.floor(args / 36) / 5 * 255;
        const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
        const b2 = rem % 6 / 5 * 255;
        return [r, g, b2];
      };
      convert.rgb.hex = function(args) {
        const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
        const string = integer.toString(16).toUpperCase();
        return "000000".substring(string.length) + string;
      };
      convert.hex.rgb = function(args) {
        const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
        if (!match) {
          return [0, 0, 0];
        }
        let colorString = match[0];
        if (match[0].length === 3) {
          colorString = colorString.split("").map((char) => {
            return char + char;
          }).join("");
        }
        const integer = parseInt(colorString, 16);
        const r = integer >> 16 & 255;
        const g = integer >> 8 & 255;
        const b2 = integer & 255;
        return [r, g, b2];
      };
      convert.rgb.hcg = function(rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b2 = rgb[2] / 255;
        const max = Math.max(Math.max(r, g), b2);
        const min = Math.min(Math.min(r, g), b2);
        const chroma = max - min;
        let grayscale;
        let hue;
        if (chroma < 1) {
          grayscale = min / (1 - chroma);
        } else {
          grayscale = 0;
        }
        if (chroma <= 0) {
          hue = 0;
        } else if (max === r) {
          hue = (g - b2) / chroma % 6;
        } else if (max === g) {
          hue = 2 + (b2 - r) / chroma;
        } else {
          hue = 4 + (r - g) / chroma;
        }
        hue /= 6;
        hue %= 1;
        return [hue * 360, chroma * 100, grayscale * 100];
      };
      convert.hsl.hcg = function(hsl) {
        const s = hsl[1] / 100;
        const l = hsl[2] / 100;
        const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
        let f = 0;
        if (c < 1) {
          f = (l - 0.5 * c) / (1 - c);
        }
        return [hsl[0], c * 100, f * 100];
      };
      convert.hsv.hcg = function(hsv) {
        const s = hsv[1] / 100;
        const v = hsv[2] / 100;
        const c = s * v;
        let f = 0;
        if (c < 1) {
          f = (v - c) / (1 - c);
        }
        return [hsv[0], c * 100, f * 100];
      };
      convert.hcg.rgb = function(hcg) {
        const h = hcg[0] / 360;
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
        if (c === 0) {
          return [g * 255, g * 255, g * 255];
        }
        const pure = [0, 0, 0];
        const hi = h % 1 * 6;
        const v = hi % 1;
        const w = 1 - v;
        let mg = 0;
        switch (Math.floor(hi)) {
          case 0:
            pure[0] = 1;
            pure[1] = v;
            pure[2] = 0;
            break;
          case 1:
            pure[0] = w;
            pure[1] = 1;
            pure[2] = 0;
            break;
          case 2:
            pure[0] = 0;
            pure[1] = 1;
            pure[2] = v;
            break;
          case 3:
            pure[0] = 0;
            pure[1] = w;
            pure[2] = 1;
            break;
          case 4:
            pure[0] = v;
            pure[1] = 0;
            pure[2] = 1;
            break;
          default:
            pure[0] = 1;
            pure[1] = 0;
            pure[2] = w;
        }
        mg = (1 - c) * g;
        return [
          (c * pure[0] + mg) * 255,
          (c * pure[1] + mg) * 255,
          (c * pure[2] + mg) * 255
        ];
      };
      convert.hcg.hsv = function(hcg) {
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
        const v = c + g * (1 - c);
        let f = 0;
        if (v > 0) {
          f = c / v;
        }
        return [hcg[0], f * 100, v * 100];
      };
      convert.hcg.hsl = function(hcg) {
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
        const l = g * (1 - c) + 0.5 * c;
        let s = 0;
        if (l > 0 && l < 0.5) {
          s = c / (2 * l);
        } else if (l >= 0.5 && l < 1) {
          s = c / (2 * (1 - l));
        }
        return [hcg[0], s * 100, l * 100];
      };
      convert.hcg.hwb = function(hcg) {
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
        const v = c + g * (1 - c);
        return [hcg[0], (v - c) * 100, (1 - v) * 100];
      };
      convert.hwb.hcg = function(hwb) {
        const w = hwb[1] / 100;
        const b2 = hwb[2] / 100;
        const v = 1 - b2;
        const c = v - w;
        let g = 0;
        if (c < 1) {
          g = (v - c) / (1 - c);
        }
        return [hwb[0], c * 100, g * 100];
      };
      convert.apple.rgb = function(apple) {
        return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
      };
      convert.rgb.apple = function(rgb) {
        return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
      };
      convert.gray.rgb = function(args) {
        return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
      };
      convert.gray.hsl = function(args) {
        return [0, 0, args[0]];
      };
      convert.gray.hsv = convert.gray.hsl;
      convert.gray.hwb = function(gray) {
        return [0, 100, gray[0]];
      };
      convert.gray.cmyk = function(gray) {
        return [0, 0, 0, gray[0]];
      };
      convert.gray.lab = function(gray) {
        return [gray[0], 0, 0];
      };
      convert.gray.hex = function(gray) {
        const val = Math.round(gray[0] / 100 * 255) & 255;
        const integer = (val << 16) + (val << 8) + val;
        const string = integer.toString(16).toUpperCase();
        return "000000".substring(string.length) + string;
      };
      convert.rgb.gray = function(rgb) {
        const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
        return [val / 255 * 100];
      };
      return conversions;
    }
    var route;
    var hasRequiredRoute;
    function requireRoute() {
      if (hasRequiredRoute) return route;
      hasRequiredRoute = 1;
      const conversions2 = requireConversions();
      function buildGraph() {
        const graph = {};
        const models = Object.keys(conversions2);
        for (let len = models.length, i = 0; i < len; i++) {
          graph[models[i]] = {
            // http://jsperf.com/1-vs-infinity
            // micro-opt, but this is simple.
            distance: -1,
            parent: null
          };
        }
        return graph;
      }
      function deriveBFS(fromModel) {
        const graph = buildGraph();
        const queue = [fromModel];
        graph[fromModel].distance = 0;
        while (queue.length) {
          const current = queue.pop();
          const adjacents = Object.keys(conversions2[current]);
          for (let len = adjacents.length, i = 0; i < len; i++) {
            const adjacent = adjacents[i];
            const node = graph[adjacent];
            if (node.distance === -1) {
              node.distance = graph[current].distance + 1;
              node.parent = current;
              queue.unshift(adjacent);
            }
          }
        }
        return graph;
      }
      function link(from, to) {
        return function(args) {
          return to(from(args));
        };
      }
      function wrapConversion(toModel, graph) {
        const path = [graph[toModel].parent, toModel];
        let fn = conversions2[graph[toModel].parent][toModel];
        let cur = graph[toModel].parent;
        while (graph[cur].parent) {
          path.unshift(graph[cur].parent);
          fn = link(conversions2[graph[cur].parent][cur], fn);
          cur = graph[cur].parent;
        }
        fn.conversion = path;
        return fn;
      }
      route = function(fromModel) {
        const graph = deriveBFS(fromModel);
        const conversion = {};
        const models = Object.keys(graph);
        for (let len = models.length, i = 0; i < len; i++) {
          const toModel = models[i];
          const node = graph[toModel];
          if (node.parent === null) {
            continue;
          }
          conversion[toModel] = wrapConversion(toModel, graph);
        }
        return conversion;
      };
      return route;
    }
    var colorConvert$1;
    var hasRequiredColorConvert;
    function requireColorConvert() {
      if (hasRequiredColorConvert) return colorConvert$1;
      hasRequiredColorConvert = 1;
      const conversions2 = requireConversions();
      const route2 = requireRoute();
      const convert = {};
      const models = Object.keys(conversions2);
      function wrapRaw(fn) {
        const wrappedFn = function(...args) {
          const arg0 = args[0];
          if (arg0 === void 0 || arg0 === null) {
            return arg0;
          }
          if (arg0.length > 1) {
            args = arg0;
          }
          return fn(args);
        };
        if ("conversion" in fn) {
          wrappedFn.conversion = fn.conversion;
        }
        return wrappedFn;
      }
      function wrapRounded(fn) {
        const wrappedFn = function(...args) {
          const arg0 = args[0];
          if (arg0 === void 0 || arg0 === null) {
            return arg0;
          }
          if (arg0.length > 1) {
            args = arg0;
          }
          const result = fn(args);
          if (typeof result === "object") {
            for (let len = result.length, i = 0; i < len; i++) {
              result[i] = Math.round(result[i]);
            }
          }
          return result;
        };
        if ("conversion" in fn) {
          wrappedFn.conversion = fn.conversion;
        }
        return wrappedFn;
      }
      models.forEach((fromModel) => {
        convert[fromModel] = {};
        Object.defineProperty(convert[fromModel], "channels", { value: conversions2[fromModel].channels });
        Object.defineProperty(convert[fromModel], "labels", { value: conversions2[fromModel].labels });
        const routes = route2(fromModel);
        const routeModels = Object.keys(routes);
        routeModels.forEach((toModel) => {
          const fn = routes[toModel];
          convert[fromModel][toModel] = wrapRounded(fn);
          convert[fromModel][toModel].raw = wrapRaw(fn);
        });
      });
      colorConvert$1 = convert;
      return colorConvert$1;
    }
    var wrapAnsi16 = (fn, offset) => (...args) => {
      const code = fn(...args);
      return `\x1B[${code + offset}m`;
    };
    var wrapAnsi256 = (fn, offset) => (...args) => {
      const code = fn(...args);
      return `\x1B[${38 + offset};5;${code}m`;
    };
    var wrapAnsi16m = (fn, offset) => (...args) => {
      const rgb = fn(...args);
      return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };
    var ansi2ansi = (n) => n;
    var rgb2rgb = (r, g, b2) => [r, g, b2];
    var setLazyProperty = (object, property, get) => {
      Object.defineProperty(object, property, {
        get: () => {
          const value = get();
          Object.defineProperty(object, property, {
            value,
            enumerable: true,
            configurable: true
          });
          return value;
        },
        enumerable: true,
        configurable: true
      });
    };
    var colorConvert;
    var makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
      if (colorConvert === void 0) {
        colorConvert = requireColorConvert();
      }
      const offset = isBackground ? 10 : 0;
      const styles2 = {};
      for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
        const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
        if (sourceSpace === targetSpace) {
          styles2[name] = wrap(identity, offset);
        } else if (typeof suite === "object") {
          styles2[name] = wrap(suite[targetSpace], offset);
        }
      }
      return styles2;
    };
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles2 = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          // Bright color
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          // Bright color
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles2.color.gray = styles2.color.blackBright;
      styles2.bgColor.bgGray = styles2.bgColor.bgBlackBright;
      styles2.color.grey = styles2.color.blackBright;
      styles2.bgColor.bgGrey = styles2.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles2)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles2[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles2[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles2, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles2, "codes", {
        value: codes,
        enumerable: false
      });
      styles2.color.close = "\x1B[39m";
      styles2.bgColor.close = "\x1B[49m";
      setLazyProperty(styles2.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
      setLazyProperty(styles2.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
      setLazyProperty(styles2.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
      setLazyProperty(styles2.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
      setLazyProperty(styles2.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
      setLazyProperty(styles2.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
      return styles2;
    }
    var ansiStyles$1 = assembleStyles();
    var hasFlag$1 = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
    var os = require$$0;
    var tty = require$$1;
    var hasFlag = hasFlag$1;
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    var supportsColor_1 = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
    var stringReplaceAll$1 = (string, substring, replacer) => {
      let index = string.indexOf(substring);
      if (index === -1) {
        return string;
      }
      const substringLength = substring.length;
      let endIndex = 0;
      let returnValue = "";
      do {
        returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
        endIndex = index + substringLength;
        index = string.indexOf(substring, endIndex);
      } while (index !== -1);
      returnValue += string.substr(endIndex);
      return returnValue;
    };
    var stringEncaseCRLFWithFirstIndex$1 = (string, prefix, postfix, index) => {
      let endIndex = 0;
      let returnValue = "";
      do {
        const gotCR = string[index - 1] === "\r";
        returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
        endIndex = index + 1;
        index = string.indexOf("\n", endIndex);
      } while (index !== -1);
      returnValue += string.substr(endIndex);
      return returnValue;
    };
    var util = {
      stringReplaceAll: stringReplaceAll$1,
      stringEncaseCRLFWithFirstIndex: stringEncaseCRLFWithFirstIndex$1
    };
    var templates;
    var hasRequiredTemplates;
    function requireTemplates() {
      if (hasRequiredTemplates) return templates;
      hasRequiredTemplates = 1;
      const TEMPLATE_REGEX2 = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
      const STYLE_REGEX2 = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
      const STRING_REGEX2 = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
      const ESCAPE_REGEX2 = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
      const ESCAPES2 = /* @__PURE__ */ new Map([
        ["n", "\n"],
        ["r", "\r"],
        ["t", "	"],
        ["b", "\b"],
        ["f", "\f"],
        ["v", "\v"],
        ["0", "\0"],
        ["\\", "\\"],
        ["e", "\x1B"],
        ["a", "\x07"]
      ]);
      function unescape2(c) {
        const u = c[0] === "u";
        const bracket = c[1] === "{";
        if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
          return String.fromCharCode(parseInt(c.slice(1), 16));
        }
        if (u && bracket) {
          return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
        }
        return ESCAPES2.get(c) || c;
      }
      function parseArguments2(name, arguments_) {
        const results = [];
        const chunks = arguments_.trim().split(/\s*,\s*/g);
        let matches;
        for (const chunk of chunks) {
          const number = Number(chunk);
          if (!Number.isNaN(number)) {
            results.push(number);
          } else if (matches = chunk.match(STRING_REGEX2)) {
            results.push(matches[2].replace(ESCAPE_REGEX2, (m, escape, character) => escape ? unescape2(escape) : character));
          } else {
            throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
          }
        }
        return results;
      }
      function parseStyle2(style) {
        STYLE_REGEX2.lastIndex = 0;
        const results = [];
        let matches;
        while ((matches = STYLE_REGEX2.exec(style)) !== null) {
          const name = matches[1];
          if (matches[2]) {
            const args = parseArguments2(name, matches[2]);
            results.push([name].concat(args));
          } else {
            results.push([name]);
          }
        }
        return results;
      }
      function buildStyle2(chalk2, styles2) {
        const enabled = {};
        for (const layer of styles2) {
          for (const style of layer.styles) {
            enabled[style[0]] = layer.inverse ? null : style.slice(1);
          }
        }
        let current = chalk2;
        for (const [styleName, styles3] of Object.entries(enabled)) {
          if (!Array.isArray(styles3)) {
            continue;
          }
          if (!(styleName in current)) {
            throw new Error(`Unknown Chalk style: ${styleName}`);
          }
          current = styles3.length > 0 ? current[styleName](...styles3) : current[styleName];
        }
        return current;
      }
      templates = (chalk2, temporary) => {
        const styles2 = [];
        const chunks = [];
        let chunk = [];
        temporary.replace(TEMPLATE_REGEX2, (m, escapeCharacter, inverse, style, close, character) => {
          if (escapeCharacter) {
            chunk.push(unescape2(escapeCharacter));
          } else if (style) {
            const string = chunk.join("");
            chunk = [];
            chunks.push(styles2.length === 0 ? string : buildStyle2(chalk2, styles2)(string));
            styles2.push({ inverse, styles: parseStyle2(style) });
          } else if (close) {
            if (styles2.length === 0) {
              throw new Error("Found extraneous } in Chalk template literal");
            }
            chunks.push(buildStyle2(chalk2, styles2)(chunk.join("")));
            chunk = [];
            styles2.pop();
          } else {
            chunk.push(character);
          }
        });
        chunks.push(chunk.join(""));
        if (styles2.length > 0) {
          const errMessage = `Chalk template literal is missing ${styles2.length} closing bracket${styles2.length === 1 ? "" : "s"} (\`}\`)`;
          throw new Error(errMessage);
        }
        return chunks.join("");
      };
      return templates;
    }
    var ansiStyles = ansiStyles$1;
    var { stdout: stdoutColor, stderr: stderrColor } = supportsColor_1;
    var {
      stringReplaceAll,
      stringEncaseCRLFWithFirstIndex
    } = util;
    var { isArray: isArray$1 } = Array;
    var levelMapping = [
      "ansi",
      "ansi",
      "ansi256",
      "ansi16m"
    ];
    var styles = /* @__PURE__ */ Object.create(null);
    var applyOptions = (object, options2 = {}) => {
      if (options2.level && !(Number.isInteger(options2.level) && options2.level >= 0 && options2.level <= 3)) {
        throw new Error("The `level` option should be an integer from 0 to 3");
      }
      const colorLevel = stdoutColor ? stdoutColor.level : 0;
      object.level = options2.level === void 0 ? colorLevel : options2.level;
    };
    var ChalkClass = class {
      constructor(options2) {
        return chalkFactory(options2);
      }
    };
    var chalkFactory = (options2) => {
      const chalk2 = {};
      applyOptions(chalk2, options2);
      chalk2.template = (...arguments_) => chalkTag(chalk2.template, ...arguments_);
      Object.setPrototypeOf(chalk2, Chalk.prototype);
      Object.setPrototypeOf(chalk2.template, chalk2);
      chalk2.template.constructor = () => {
        throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
      };
      chalk2.template.Instance = ChalkClass;
      return chalk2.template;
    };
    function Chalk(options2) {
      return chalkFactory(options2);
    }
    for (const [styleName, style] of Object.entries(ansiStyles)) {
      styles[styleName] = {
        get() {
          const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
          Object.defineProperty(this, styleName, { value: builder });
          return builder;
        }
      };
    }
    styles.visible = {
      get() {
        const builder = createBuilder(this, this._styler, true);
        Object.defineProperty(this, "visible", { value: builder });
        return builder;
      }
    };
    var usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
    for (const model of usedModels) {
      styles[model] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    }
    for (const model of usedModels) {
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles[bgModel] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    }
    var proto = Object.defineProperties(() => {
    }, {
      ...styles,
      level: {
        enumerable: true,
        get() {
          return this._generator.level;
        },
        set(level) {
          this._generator.level = level;
        }
      }
    });
    var createStyler = (open, close, parent) => {
      let openAll;
      let closeAll;
      if (parent === void 0) {
        openAll = open;
        closeAll = close;
      } else {
        openAll = parent.openAll + open;
        closeAll = close + parent.closeAll;
      }
      return {
        open,
        close,
        openAll,
        closeAll,
        parent
      };
    };
    var createBuilder = (self2, _styler, _isEmpty) => {
      const builder = (...arguments_) => {
        if (isArray$1(arguments_[0]) && isArray$1(arguments_[0].raw)) {
          return applyStyle(builder, chalkTag(builder, ...arguments_));
        }
        return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
      };
      Object.setPrototypeOf(builder, proto);
      builder._generator = self2;
      builder._styler = _styler;
      builder._isEmpty = _isEmpty;
      return builder;
    };
    var applyStyle = (self2, string) => {
      if (self2.level <= 0 || !string) {
        return self2._isEmpty ? "" : string;
      }
      let styler = self2._styler;
      if (styler === void 0) {
        return string;
      }
      const { openAll, closeAll } = styler;
      if (string.indexOf("\x1B") !== -1) {
        while (styler !== void 0) {
          string = stringReplaceAll(string, styler.close, styler.open);
          styler = styler.parent;
        }
      }
      const lfIndex = string.indexOf("\n");
      if (lfIndex !== -1) {
        string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
      }
      return openAll + string + closeAll;
    };
    var template$1;
    var chalkTag = (chalk2, ...strings) => {
      const [firstString] = strings;
      if (!isArray$1(firstString) || !isArray$1(firstString.raw)) {
        return strings.join(" ");
      }
      const arguments_ = strings.slice(1);
      const parts = [firstString.raw[0]];
      for (let i = 1; i < firstString.length; i++) {
        parts.push(
          String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"),
          String(firstString.raw[i])
        );
      }
      if (template$1 === void 0) {
        template$1 = requireTemplates();
      }
      return template$1(chalk2, parts.join(""));
    };
    Object.defineProperties(Chalk.prototype, styles);
    var chalk = Chalk();
    chalk.supportsColor = stdoutColor;
    chalk.stderr = Chalk({ level: stderrColor ? stderrColor.level : 0 });
    chalk.stderr.supportsColor = stderrColor;
    var source = chalk;
    var TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.))|(?:{(~)?(#?[\w:]+(?:\([^)]*\))?(?:\.#?[\w:]+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(})|((?:.|[\r\n\f])+?)/gi;
    var STYLE_REGEX = /(?:^|\.)(?:(?:(\w+)(?:\(([^)]*)\))?)|(?:#(?=[:a-fA-F\d]{2,})([a-fA-F\d]{6})?(?::([a-fA-F\d]{6}))?))/g;
    var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    var ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
    var ESCAPES = /* @__PURE__ */ new Map([
      ["n", "\n"],
      ["r", "\r"],
      ["t", "	"],
      ["b", "\b"],
      ["f", "\f"],
      ["v", "\v"],
      ["0", "\0"],
      ["\\", "\\"],
      ["e", "\x1B"],
      ["a", "\x07"]
    ]);
    function unescape(c) {
      const u = c[0] === "u";
      const bracket = c[1] === "{";
      if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
        return String.fromCharCode(Number.parseInt(c.slice(1), 16));
      }
      if (u && bracket) {
        return String.fromCodePoint(Number.parseInt(c.slice(2, -1), 16));
      }
      return ESCAPES.get(c) || c;
    }
    function parseArguments(name, arguments_) {
      const results = [];
      const chunks = arguments_.trim().split(/\s*,\s*/g);
      let matches;
      for (const chunk of chunks) {
        const number = Number(chunk);
        if (!Number.isNaN(number)) {
          results.push(number);
        } else if (matches = chunk.match(STRING_REGEX)) {
          results.push(matches[2].replace(ESCAPE_REGEX, (_, escape, character) => escape ? unescape(escape) : character));
        } else {
          throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
        }
      }
      return results;
    }
    function parseHex(hex) {
      const n = Number.parseInt(hex, 16);
      return [
        // eslint-disable-next-line no-bitwise
        n >> 16 & 255,
        // eslint-disable-next-line no-bitwise
        n >> 8 & 255,
        // eslint-disable-next-line no-bitwise
        n & 255
      ];
    }
    function parseStyle(style) {
      STYLE_REGEX.lastIndex = 0;
      const results = [];
      let matches;
      while ((matches = STYLE_REGEX.exec(style)) !== null) {
        const name = matches[1];
        if (matches[2]) {
          results.push([name, ...parseArguments(name, matches[2])]);
        } else if (matches[3] || matches[4]) {
          if (matches[3]) {
            results.push(["rgb", ...parseHex(matches[3])]);
          }
          if (matches[4]) {
            results.push(["bgRgb", ...parseHex(matches[4])]);
          }
        } else {
          results.push([name]);
        }
      }
      return results;
    }
    function buildStyle(styles2) {
      const enabled = {};
      for (const layer of styles2) {
        for (const style of layer.styles) {
          enabled[style[0]] = layer.inverse ? null : style.slice(1);
        }
      }
      let current = source;
      for (const [styleName, styles3] of Object.entries(enabled)) {
        if (!Array.isArray(styles3)) {
          continue;
        }
        if (!(styleName in current)) {
          throw new Error(`Unknown Chalk style: ${styleName}`);
        }
        current = styles3.length > 0 ? current[styleName](...styles3) : current[styleName];
      }
      return current;
    }
    function template(string) {
      const styles2 = [];
      const chunks = [];
      let chunk = [];
      string.replace(TEMPLATE_REGEX, (_, escapeCharacter, inverse, style, close, character) => {
        if (escapeCharacter) {
          chunk.push(unescape(escapeCharacter));
        } else if (style) {
          const string2 = chunk.join("");
          chunk = [];
          chunks.push(styles2.length === 0 ? string2 : buildStyle(styles2)(string2));
          styles2.push({ inverse, styles: parseStyle(style) });
        } else if (close) {
          if (styles2.length === 0) {
            throw new Error("Found extraneous } in Chalk template literal");
          }
          chunks.push(buildStyle(styles2)(chunk.join("")));
          chunk = [];
          styles2.pop();
        } else {
          chunk.push(character);
        }
      });
      chunks.push(chunk.join(""));
      if (styles2.length > 0) {
        throw new Error(`Chalk template literal is missing ${styles2.length} closing bracket${styles2.length === 1 ? "" : "s"} (\`}\`)`);
      }
      return chunks.join("");
    }
    function chalkTemplate(firstString, ...arguments_) {
      if (!Array.isArray(firstString) || !Array.isArray(firstString.raw)) {
        throw new TypeError("A tagged template literal must be provided");
      }
      const parts = [firstString.raw[0]];
      for (let index = 1; index < firstString.raw.length; index++) {
        parts.push(
          String(arguments_[index - 1]).replace(/[{}\\]/g, "\\$&"),
          String(firstString.raw[index])
        );
      }
      return template(parts.join(""));
    }
    function chalkFormat(str) {
      if (str) {
        str = str.replace(/`/g, "\\`");
        return chalkTemplate(Object.assign([], { raw: [str] }));
      } else {
        return "";
      }
    }
    var Section = class {
      constructor() {
        this.lines = [];
      }
      add(lines) {
        if (lines) {
          arrayify(lines).forEach((line) => this.lines.push(line));
        } else {
          this.lines.push("");
        }
      }
      toString() {
        return this.lines.join(require$$0.EOL);
      }
      header(text) {
        if (text) {
          this.add(chalkFormat(`{bold ${text}}`));
          this.add();
        }
      }
    };
    var _value = /* @__PURE__ */ new WeakMap();
    var _column = /* @__PURE__ */ new WeakMap();
    var Cell = class {
      constructor(value, column) {
        this.value = value;
        _column.set(this, column);
      }
      set value(val) {
        _value.set(this, val);
      }
      /**
      * Must return a string or object with a `.toString()` method.
      * @returns {string}
      */
      get value() {
        let cellValue = _value.get(this);
        const column = _column.get(this);
        if (column.get) {
          cellValue = column.get(cellValue);
        }
        if (cellValue === void 0) {
          cellValue = "";
        } else {
          cellValue = String(cellValue);
        }
        return cellValue;
      }
    };
    var Rows = class {
      constructor(rows, columns) {
        this.list = [];
        this.load(rows, columns);
      }
      load(rows, columns) {
        for (const row of arrayify(rows)) {
          const map = new Map(columns.list.map((column) => [column, new Cell(row[column.name], column)]));
          this.list.push(map);
        }
      }
    };
    function isNumber(n) {
      return !isNaN(parseFloat(n));
    }
    function isFiniteNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function isPlainObject(input) {
      return input !== null && typeof input === "object" && input.constructor === Object;
    }
    function isArrayLike$1(input) {
      return isObject$1(input) && typeof input.length === "number";
    }
    function isObject$1(input) {
      return typeof input === "object" && input !== null;
    }
    function isDefined(input) {
      return typeof input !== "undefined";
    }
    function isUndefined(input) {
      return !isDefined(input);
    }
    function isNull(input) {
      return input === null;
    }
    function isDefinedValue(input) {
      return isDefined(input) && !isNull(input) && !Number.isNaN(input);
    }
    function isClass(input) {
      if (typeof input === "function") {
        return /^class /.test(Function.prototype.toString.call(input));
      } else {
        return false;
      }
    }
    function isPrimitive(input) {
      if (input === null) return true;
      switch (typeof input) {
        case "string":
        case "number":
        case "symbol":
        case "undefined":
        case "boolean":
          return true;
        default:
          return false;
      }
    }
    function isPromise(input) {
      if (input) {
        const isPromise2 = isDefined(Promise) && input instanceof Promise;
        const isThenable = input.then && typeof input.then === "function";
        return !!(isPromise2 || isThenable);
      } else {
        return false;
      }
    }
    function isIterable(input) {
      if (input === null || !isDefined(input)) {
        return false;
      } else {
        return typeof input[Symbol.iterator] === "function" || typeof input[Symbol.asyncIterator] === "function";
      }
    }
    function isString(input) {
      return typeof input === "string";
    }
    function isFunction$1(input) {
      return typeof input === "function";
    }
    var t = {
      isNumber,
      isFiniteNumber,
      isPlainObject,
      isArrayLike: isArrayLike$1,
      isObject: isObject$1,
      isDefined,
      isUndefined,
      isNull,
      isDefinedValue,
      isClass,
      isPrimitive,
      isPromise,
      isIterable,
      isString,
      isFunction: isFunction$1
    };
    var Padding = class {
      constructor(padding) {
        this.left = padding.left;
        this.right = padding.right;
      }
      length() {
        return this.left.length + this.right.length;
      }
    };
    var _padding = /* @__PURE__ */ new WeakMap();
    var Column = class {
      constructor(column = {}) {
        this.name = column.name;
        this.width = column.width;
        this.maxWidth = column.maxWidth;
        this.minWidth = column.minWidth;
        this.noWrap = column.noWrap;
        this.break = column.break;
        this.contentWrappable = column.contentWrappable;
        this.contentWidth = column.contentWidth;
        this.minContentWidth = column.minContentWidth;
        this.padding = column.padding || { left: " ", right: " " };
        this.generatedWidth = null;
      }
      set padding(padding) {
        _padding.set(this, new Padding(padding));
      }
      get padding() {
        return _padding.get(this);
      }
      /**
       * The width of the content (excluding padding) after being wrapped
       */
      get wrappedContentWidth() {
        return Math.max(this.generatedWidth - this.padding.length(), 0);
      }
      isResizable() {
        return !this.isFixed();
      }
      isFixed() {
        return t.isDefined(this.width) || this.noWrap || !this.contentWrappable;
      }
      generateWidth() {
        this.generatedWidth = this.width || this.contentWidth + this.padding.length();
      }
      generateMinWidth() {
        this.minWidth = this.minContentWidth + this.padding.length();
      }
    };
    var _maxWidth = /* @__PURE__ */ new WeakMap();
    var Columns = class _Columns {
      constructor(columns) {
        this.list = [];
        for (const column of arrayify(columns)) {
          this.add(column);
        }
      }
      /**
       * sum of all generatedWidth fields
       * @return {number}
       */
      totalWidth() {
        return this.list.length ? this.list.map((col) => col.generatedWidth).reduce((a, b2) => a + b2) : 0;
      }
      totalFixedWidth() {
        return this.getFixed().map((col) => col.generatedWidth).reduce((a, b2) => a + b2, 0);
      }
      get(columnName) {
        return this.list.find((column) => column.name === columnName);
      }
      getResizable() {
        return this.list.filter((column) => column.isResizable());
      }
      getFixed() {
        return this.list.filter((column) => column.isFixed());
      }
      add(column) {
        const col = column instanceof Column ? column : new Column(column);
        this.list.push(col);
        return col;
      }
      get maxWidth() {
        _maxWidth.get(this);
      }
      set maxWidth(val) {
        _maxWidth.set(this, val);
      }
      /**
       * sets `generatedWidth` for each column
       * @chainable
       */
      autoSize() {
        const maxWidth = _maxWidth.get(this);
        for (const column of this.list) {
          column.generateWidth();
          column.generateMinWidth();
        }
        for (const column of this.list) {
          if (t.isDefined(column.maxWidth) && column.generatedWidth > column.maxWidth) {
            column.generatedWidth = column.maxWidth;
          }
          if (t.isDefined(column.minWidth) && column.generatedWidth < column.minWidth) {
            column.generatedWidth = column.minWidth;
          }
        }
        const width = {
          total: this.totalWidth(),
          view: maxWidth,
          diff: this.totalWidth() - maxWidth,
          totalFixed: this.totalFixedWidth(),
          totalResizable: Math.max(maxWidth - this.totalFixedWidth(), 0)
        };
        if (width.diff > 0) {
          const resizableColumns = this.getResizable();
          for (const column of resizableColumns) {
            column.generatedWidth = Math.floor(width.totalResizable / resizableColumns.length);
          }
          const grownColumns = this.list.filter((column) => column.generatedWidth > column.contentWidth);
          const shrunkenColumns = this.list.filter((column) => column.generatedWidth < column.contentWidth);
          let salvagedSpace = 0;
          for (const column of grownColumns) {
            const currentGeneratedWidth = column.generatedWidth;
            column.generateWidth();
            salvagedSpace += currentGeneratedWidth - column.generatedWidth;
          }
          for (const column of shrunkenColumns) {
            column.generatedWidth += Math.floor(salvagedSpace / shrunkenColumns.length);
          }
        }
        return this;
      }
      /**
       * Factory method returning all distinct columns from input
       * @param  {object[]} - input recordset
       * @return {module:columns}
       */
      static getColumns(rows) {
        const columns = new _Columns();
        for (const row of arrayify(rows)) {
          for (const columnName in row) {
            let column = columns.get(columnName);
            if (!column) {
              column = columns.add({ name: columnName, contentWidth: 0, minContentWidth: 0 });
            }
          }
        }
        return columns;
      }
    };
    var re = {
      chunk: /[^\s-]+?-\b|\S+|\s+|\r\n?|\n/g,
      ansiEscapeSequence: /\u001b.*?m/g
    };
    var Wordwrap = class {
      /**
       * @param {string} text - The input text to wrap.
       * @param {module:wordwrapjs~WordwrapOptions} [options]
       */
      constructor(text = "", options2 = {}) {
        this._lines = String(text).split(/\r\n|\n/g);
        this.options = {
          eol: "\n",
          width: 30,
          ...options2
        };
      }
      lines() {
        return this._lines.map(trimLine, this).map((line) => line.match(re.chunk) || ["~~empty~~"]).map(
          (lineWords) => this.options.break ? lineWords.map(breakWord, this) : lineWords
        ).map((lineWords) => lineWords.flat()).map((lineWords) => {
          return lineWords.reduce((lines, word) => {
            const currentLine = lines[lines.length - 1];
            if (replaceAnsi(word).length + replaceAnsi(currentLine).length > this.options.width) {
              lines.push(word);
            } else {
              lines[lines.length - 1] += word;
            }
            return lines;
          }, [""]);
        }).flat().map(trimLine, this).filter((line) => line.trim()).map((line) => line.replace("~~empty~~", ""));
      }
      wrap() {
        return this.lines().join(this.options.eol);
      }
      toString() {
        return this.wrap();
      }
      /**
       * @param {string} text - the input text to wrap
       * @param {module:wordwrapjs~WordwrapOptions} [options]
       */
      static wrap(text, options2) {
        const block = new this(text, options2);
        return block.wrap();
      }
      /**
       * Wraps the input text, returning an array of strings (lines).
       * @param {string} text - input text
       * @param {module:wordwrapjs~WordwrapOptions} [options]
       */
      static lines(text, options2) {
        const block = new this(text, options2);
        return block.lines();
      }
      /**
       * Returns true if the input text would be wrapped if passed into `.wrap()`.
       * @param {string} text - input text
       * @return {boolean}
       */
      static isWrappable(text = "") {
        const matches = String(text).match(re.chunk);
        return matches ? matches.length > 1 : false;
      }
      /**
       * Splits the input text into an array of words and whitespace.
       * @param {string} text - input text
       * @returns {string[]}
       */
      static getChunks(text) {
        return text.match(re.chunk) || [];
      }
    };
    function trimLine(line) {
      return this.options.noTrim ? line : line.trim();
    }
    function replaceAnsi(string) {
      return string.replace(re.ansiEscapeSequence, "");
    }
    function breakWord(word) {
      if (replaceAnsi(word).length > this.options.width) {
        const letters = word.split("");
        let piece;
        const pieces = [];
        while ((piece = letters.splice(0, this.options.width)).length) {
          pieces.push(piece.join(""));
        }
        return pieces;
      } else {
        return word;
      }
    }
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0:
          return func.call(thisArg);
        case 1:
          return func.call(thisArg, args[0]);
        case 2:
          return func.call(thisArg, args[0], args[1]);
        case 3:
          return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeKeys = overArg(Object.keys, Object);
    var nativeMax = Math.max;
    function arrayLikeKeys(value, inherited) {
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
        object[key] = value;
      }
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function baseRest(func, start) {
      start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
      return function() {
        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = array;
        return apply(func, this, otherArgs);
      };
    }
    function copyObject(source2, props, object, customizer) {
      object || (object = {});
      var index = -1, length = props.length;
      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source2[key], key, object, source2) : void 0;
        assignValue(object, key, newValue === void 0 ? source2[key] : newValue);
      }
      return object;
    }
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
        customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? void 0 : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source2 = sources[index];
          if (source2) {
            assigner(object, source2, index, customizer);
          }
        }
        return object;
      });
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
        return eq(object[index], value);
      }
      return false;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto2 = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto2;
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    var assignWith = createAssigner(function(object, source2, srcIndex, customizer) {
      copyObject(source2, keys(source2), object, customizer);
    });
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    var lodash_assignwith = assignWith;
    function customiser(previousValue, newValue, key, object, source2) {
      if (isPlainObject(previousValue) && isPlainObject(newValue)) {
        return lodash_assignwith(previousValue, newValue, customiser);
      } else if (Array.isArray(previousValue) && Array.isArray(newValue) && newValue.length) {
        return newValue;
      } else if (Array.isArray(newValue) && !newValue.length) {
        return previousValue;
      } else if (!isDefined(previousValue) && Array.isArray(newValue)) {
        return newValue;
      }
    }
    function deepMerge(...args) {
      return lodash_assignwith(...args, customiser);
    }
    var ansiEscapeSequence = /\u001b.*?m/g;
    function remove(input) {
      return input.replace(ansiEscapeSequence, "");
    }
    function has(input) {
      return ansiEscapeSequence.test(input);
    }
    function getLongestArray(arrays) {
      const lengths = arrays.map((array) => array.length);
      return Math.max(...lengths);
    }
    function padCell(cellValue, padding, width) {
      const ansiLength = cellValue.length - remove(cellValue).length;
      cellValue = cellValue || "";
      return (padding.left || "") + cellValue.padEnd(width - padding.length() + ansiLength) + (padding.right || "");
    }
    function getLongestWord(line) {
      const words = Wordwrap.getChunks(line);
      return words.reduce((max, word) => Math.max(word.length, max), 0);
    }
    function removeEmptyColumns(data) {
      const distinctColumnNames = data.reduce((columnNames, row) => {
        for (const key of Object.keys(row)) {
          if (!columnNames.includes(key)) {
            columnNames.push(key);
          }
        }
        return columnNames;
      }, []);
      const emptyColumns = distinctColumnNames.filter((columnName) => {
        const hasValue = data.some((row) => {
          const value = row[columnName];
          return t.isDefined(value) && typeof value !== "string" || typeof value === "string" && /\S+/.test(value);
        });
        return !hasValue;
      });
      return data.map((row) => {
        for (const emptyCol of emptyColumns) {
          delete row[emptyCol];
        }
        return row;
      });
    }
    var Table = class {
      /**
       * @param {object[]} - input data
       * @param [options] {object} - optional settings
       * @param [options.maxWidth] {number} - maximum width of layout
       * @param [options.noWrap] {boolean} - disable wrapping on all columns
       * @param [options.noTrim] {boolean} - disable line-trimming
       * @param [options.break] {boolean} - enable word-breaking on all columns
       * @param [options.columns] {module:table-layout~columnOption} - array of column-specific options
       * @param [options.ignoreEmptyColumns] {boolean} - If set, empty columns or columns containing only whitespace are not rendered.
       * @param [options.padding] {object} - Padding values to set on each column. Per-column overrides can be set in the `options.columns` array.
       * @param [options.padding.left] {string} - Defaults to a single space.
       * @param [options.padding.right] {string} - Defaults to a single space.
       * @param [options.eol] {string} - EOL character used. Defaults to `\n`.
       * @alias module:table-layout
       */
      constructor(data, options2 = {}) {
        const defaults = {
          padding: {
            left: " ",
            right: " "
          },
          maxWidth: 80,
          columns: [],
          eol: "\n"
        };
        this.options = deepMerge(defaults, options2);
        this.rows = null;
        this.columns = null;
        this.load(data);
      }
      /**
      * Set the input data to display. Must be an array of objects.
      * @param data {object[]}
      */
      load(data) {
        const options2 = this.options;
        if (options2.ignoreEmptyColumns) {
          data = removeEmptyColumns(data);
        }
        this.columns = Columns.getColumns(data);
        this.columns.maxWidth = options2.maxWidth;
        for (const column of this.columns.list) {
          column.padding = options2.padding;
          column.noWrap = options2.noWrap;
          column.break = options2.break;
          if (options2.break) {
            column.contentWrappable = true;
          }
        }
        for (const optionColumn of options2.columns) {
          const column = this.columns.get(optionColumn.name);
          if (column) {
            if (optionColumn.padding) {
              column.padding.left = optionColumn.padding.left;
              column.padding.right = optionColumn.padding.right;
            }
            column.width = optionColumn.width;
            column.maxWidth = optionColumn.maxWidth;
            column.minWidth = optionColumn.minWidth;
            column.noWrap = optionColumn.noWrap;
            column.break = optionColumn.break;
            if (optionColumn.break) {
              column.contentWrappable = true;
            }
            column.get = optionColumn.get;
          }
        }
        for (const row of arrayify(data)) {
          for (const columnName in row) {
            const column = this.columns.get(columnName);
            const cell = new Cell(row[columnName], column);
            let cellValue = cell.value;
            if (has(cellValue)) {
              cellValue = remove(cellValue);
            }
            if (cellValue.length > column.contentWidth) {
              column.contentWidth = cellValue.length;
            }
            const longestWord = getLongestWord(cellValue);
            if (longestWord > column.minContentWidth) {
              column.minContentWidth = longestWord;
            }
            if (!column.contentWrappable) {
              column.contentWrappable = Wordwrap.isWrappable(cellValue);
            }
          }
        }
        this.columns.autoSize();
        this.rows = new Rows(data, this.columns);
        return this;
      }
      getWrapped() {
        this.columns.autoSize();
        return this.rows.list.map((row) => {
          const line = [];
          for (const [column, cell] of row.entries()) {
            if (column.noWrap) {
              line.push(cell.value.split(/\r\n?|\n/));
            } else {
              line.push(Wordwrap.lines(cell.value, {
                width: column.wrappedContentWidth,
                break: column.break,
                noTrim: this.options.noTrim
              }));
            }
          }
          return line;
        });
      }
      getLines() {
        const wrappedLines = this.getWrapped();
        const lines = [];
        wrappedLines.forEach((wrapped) => {
          const mostLines = getLongestArray(wrapped);
          for (let i = 0; i < mostLines; i++) {
            const line = [];
            wrapped.forEach((cell) => {
              line.push(cell[i] || "");
            });
            lines.push(line);
          }
        });
        return lines;
      }
      /**
       * Identical to `.toString()` with the exception that the result will be an array of lines, rather than a single, multi-line string.
       * @returns {string[]}
       */
      renderLines() {
        const lines = this.getLines();
        return lines.map((line) => {
          return line.reduce((prev, cell, index) => {
            const column = this.columns.list[index];
            return prev + padCell(cell, column.padding, column.generatedWidth);
          }, "");
        });
      }
      /**
       * Returns the input data as a text table.
       * @returns {string}
       */
      toString() {
        return this.renderLines().join(this.options.eol) + this.options.eol;
      }
    };
    var OptionList = class extends Section {
      constructor(data) {
        super();
        let definitions = arrayify(data.optionList);
        const hide = arrayify(data.hide);
        const groups = arrayify(data.group);
        if (hide.length) {
          definitions = definitions.filter((definition) => {
            return hide.indexOf(definition.name) === -1;
          });
        }
        if (data.header) this.header(data.header);
        if (groups.length) {
          definitions = definitions.filter((def) => {
            const noGroupMatch = groups.indexOf("_none") > -1 && !t.isDefined(def.group);
            const groupMatch = intersect(arrayify(def.group), groups);
            return noGroupMatch || groupMatch ? def : void 0;
          });
        }
        const rows = definitions.map((def) => {
          return {
            option: getOptionNames(def, data.reverseNameOrder),
            description: chalkFormat(def.description)
          };
        });
        const tableOptions = data.tableOptions || {
          padding: { left: "  ", right: " " },
          columns: [
            { name: "option", noWrap: true },
            { name: "description", maxWidth: 80 }
          ]
        };
        const table = new Table(rows, tableOptions);
        this.add(table.renderLines());
        this.add();
      }
    };
    function getOptionNames(definition, reverseNameOrder) {
      let type = definition.type ? definition.type.name.toLowerCase() : "string";
      const multiple = definition.multiple || definition.lazyMultiple ? "[]" : "";
      if (type) {
        type = type === "boolean" ? "" : `{underline ${type}${multiple}}`;
      }
      type = chalkFormat(definition.typeLabel || type);
      let result = "";
      if (definition.alias) {
        if (definition.name) {
          if (reverseNameOrder) {
            result = chalkFormat(`{bold --${definition.name}}, {bold -${definition.alias}} ${type}`);
          } else {
            result = chalkFormat(`{bold -${definition.alias}}, {bold --${definition.name}} ${type}`);
          }
        } else {
          if (reverseNameOrder) {
            result = chalkFormat(`{bold -${definition.alias}} ${type}`);
          } else {
            result = chalkFormat(`{bold -${definition.alias}} ${type}`);
          }
        }
      } else {
        result = chalkFormat(`{bold --${definition.name}} ${type}`);
      }
      return result;
    }
    function intersect(arr1, arr2) {
      return arr1.some(function(item1) {
        return arr2.some(function(item2) {
          return item1 === item2;
        });
      });
    }
    var ContentSection = class extends Section {
      constructor(section) {
        super();
        this.header(section.header);
        if (section.content) {
          if (section.raw) {
            const content = arrayify(section.content).map((line) => chalkFormat(line));
            this.add(content);
          } else {
            this.add(getContentLines(section.content));
          }
          this.add();
        }
      }
    };
    function getContentLines(content) {
      const defaultPadding = { left: "  ", right: " " };
      if (content) {
        if (t.isString(content)) {
          const table = new Table({ column: chalkFormat(content) }, {
            padding: defaultPadding,
            maxWidth: 80
          });
          return table.renderLines();
        } else if (Array.isArray(content) && content.every(t.isString)) {
          const rows = content.map((string) => ({ column: chalkFormat(string) }));
          const table = new Table(rows, {
            padding: defaultPadding,
            maxWidth: 80
          });
          return table.renderLines();
        } else if (Array.isArray(content) && content.every(t.isPlainObject)) {
          const table = new Table(content.map((row) => ansiFormatRow(row)), {
            padding: defaultPadding
          });
          return table.renderLines();
        } else if (t.isPlainObject(content)) {
          if (!content.options || !content.data) {
            throw new Error('must have an "options" or "data" property\n' + JSON.stringify(content));
          }
          const options2 = Object.assign(
            { padding: defaultPadding },
            content.options
          );
          if (options2.columns) {
            options2.columns = options2.columns.map((column) => {
              if (column.nowrap) {
                column.noWrap = column.nowrap;
                delete column.nowrap;
              }
              return column;
            });
          }
          const table = new Table(
            content.data.map((row) => ansiFormatRow(row)),
            options2
          );
          return table.renderLines();
        } else {
          const message = `invalid input - 'content' must be a string, array of strings, or array of plain objects:

${JSON.stringify(content)}`;
          throw new Error(message);
        }
      }
    }
    function ansiFormatRow(row) {
      for (const key in row) {
        row[key] = chalkFormat(row[key]);
      }
      return row;
    }
    function commandLineUsage2(sections) {
      sections = arrayify(sections);
      if (sections.length) {
        const output = sections.map((section) => {
          if (section.optionList) {
            return new OptionList(section);
          } else {
            return new ContentSection(section);
          }
        });
        return "\n" + output.join("\n");
      } else {
        return "";
      }
    }
    module2.exports = commandLineUsage2;
  }
});

// ../node_modules/binpack/index.js
var require_binpack = __commonJS({
  "../node_modules/binpack/index.js"(exports2, module2) {
    var sizeOfType = function(t) {
      if (t[0] === "U") {
        t = t.slice(1);
      }
      return {
        "Float32": 4,
        "Float64": 8,
        "Int8": 1,
        "Int16": 2,
        "Int32": 4,
        "Int64": 8
      }[t];
    };
    var endianConv = function(e, t) {
      if (t[t.length - 1] === "8")
        return "";
      if (e === "big") {
        return "BE";
      }
      return "LE";
    };
    var addBindings = function(binpackTypename, nodeTypename) {
      if (!(typeof nodeTypename !== "undefined" && nodeTypename !== null)) {
        nodeTypename = binpackTypename;
      }
      module2.exports["pack" + binpackTypename] = function(num, endian) {
        b = new Buffer(sizeOfType(binpackTypename));
        b["write" + nodeTypename + endianConv(endian, binpackTypename)](num, 0, true);
        return b;
      };
      module2.exports["unpack" + binpackTypename] = function(buff, endian) {
        return buff["read" + nodeTypename + endianConv(endian, binpackTypename)](0);
      };
    };
    var addIntBindings = function(n) {
      addBindings("Int" + n);
      addBindings("UInt" + n);
    };
    addIntBindings(8);
    addIntBindings(16);
    addIntBindings(32);
    twoToThe32 = Math.pow(2, 32);
    var read64 = function(unsigned) {
      return function(buff, endian) {
        var e = endianConv(endian, "");
        var u = unsigned ? "U" : "";
        var low, high;
        if (e === "LE") {
          low = buff.readUInt32LE(0);
          high = buff["read" + u + "Int32LE"](4);
        } else {
          low = buff.readUInt32BE(4);
          high = buff["read" + u + "Int32BE"](0);
        }
        return high * twoToThe32 + low;
      };
    };
    var write64 = function(unsigned) {
      return function(num, endian) {
        var e = endianConv(endian, "");
        var u = unsigned ? "U" : "";
        var b2 = new Buffer(8);
        var high = Math.floor(num / twoToThe32);
        var low = Math.floor(num - high * twoToThe32);
        if (e == "LE") {
          b2.writeUInt32LE(low, 0, true);
          b2["write" + u + "Int32LE"](high, 4, true);
        } else {
          b2.writeUInt32BE(low, 4, true);
          b2["write" + u + "Int32BE"](high, 0, true);
        }
        return b2;
      };
    };
    module2.exports.unpackInt64 = read64(false);
    module2.exports.unpackUInt64 = read64(true);
    module2.exports.packInt64 = write64(false);
    module2.exports.packUInt64 = write64(true);
    addBindings("Float32", "Float");
    addBindings("Float64", "Double");
  }
});

// ../node_modules/osc-min/lib/osc-utilities.js
var require_osc_utilities = __commonJS({
  "../node_modules/osc-min/lib/osc-utilities.js"(exports2) {
    (function() {
      var IsArray, StrictError, TWO_POW_32, UNIX_EPOCH, binpack, getArrayArg, isOscBundleBuffer, makeTimetag, mapBundleList, oscTypeCodes, padding, toOscTypeAndArgs, hasProp = {}.hasOwnProperty;
      binpack = require_binpack();
      exports2.concat = function(buffers) {
        var buffer, copyTo, destBuffer, j, k, l, len, len1, len2, sumLength;
        if (!IsArray(buffers)) {
          throw new Error("concat must take an array of buffers");
        }
        for (j = 0, len = buffers.length; j < len; j++) {
          buffer = buffers[j];
          if (!Buffer.isBuffer(buffer)) {
            throw new Error("concat must take an array of buffers");
          }
        }
        sumLength = 0;
        for (k = 0, len1 = buffers.length; k < len1; k++) {
          buffer = buffers[k];
          sumLength += buffer.length;
        }
        destBuffer = new Buffer(sumLength);
        copyTo = 0;
        for (l = 0, len2 = buffers.length; l < len2; l++) {
          buffer = buffers[l];
          buffer.copy(destBuffer, copyTo);
          copyTo += buffer.length;
        }
        return destBuffer;
      };
      exports2.toOscString = function(str, strict) {
        var i, j, nullIndex, ref;
        if (!(typeof str === "string")) {
          throw new Error("can't pack a non-string into an osc-string");
        }
        nullIndex = str.indexOf("\0");
        if (nullIndex !== -1 && strict) {
          throw StrictError("Can't pack an osc-string that contains NULL characters");
        }
        if (nullIndex !== -1) {
          str = str.slice(0, nullIndex);
        }
        for (i = j = 0, ref = padding(str); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          str += "\0";
        }
        return new Buffer(str);
      };
      exports2.splitOscString = function(buffer, strict) {
        var i, j, nullIndex, rawStr, ref, ref1, rest, splitPoint, str;
        if (!Buffer.isBuffer(buffer)) {
          throw StrictError("Can't split something that isn't a buffer");
        }
        rawStr = buffer.toString("utf8");
        nullIndex = rawStr.indexOf("\0");
        if (nullIndex === -1) {
          if (strict) {
            throw new Error("All osc-strings must contain a null character");
          }
          return {
            string: rawStr,
            rest: new Buffer(0)
          };
        }
        str = rawStr.slice(0, nullIndex);
        splitPoint = Buffer.byteLength(str) + padding(str);
        if (strict && splitPoint > buffer.length) {
          throw StrictError("Not enough padding for osc-string");
        }
        if (strict) {
          for (i = j = ref = Buffer.byteLength(str), ref1 = splitPoint; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
            if (buffer[i] !== 0) {
              throw StrictError("Not enough or incorrect padding for osc-string");
            }
          }
        }
        rest = buffer.slice(splitPoint, buffer.length);
        return {
          string: str,
          rest
        };
      };
      exports2.splitInteger = function(buffer, type) {
        var bytes, num, rest, value;
        if (type == null) {
          type = "Int32";
        }
        bytes = binpack["pack" + type](0).length;
        if (buffer.length < bytes) {
          throw new Error("buffer is not big enough for integer type");
        }
        num = 0;
        value = binpack["unpack" + type](buffer.slice(0, bytes), "big");
        rest = buffer.slice(bytes, buffer.length);
        return {
          integer: value,
          rest
        };
      };
      exports2.splitTimetag = function(buffer) {
        var a, b2, bytes, c, d, fractional, rest, seconds, type;
        type = "UInt32";
        bytes = binpack["pack" + type](0).length;
        if (buffer.length < bytes * 2) {
          throw new Error("buffer is not big enough to contain a timetag");
        }
        a = 0;
        b2 = bytes;
        seconds = binpack["unpack" + type](buffer.slice(a, b2), "big");
        c = bytes;
        d = bytes + bytes;
        fractional = binpack["unpack" + type](buffer.slice(c, d), "big");
        rest = buffer.slice(d, buffer.length);
        return {
          timetag: [seconds, fractional],
          rest
        };
      };
      UNIX_EPOCH = 2208988800;
      TWO_POW_32 = 4294967296;
      exports2.dateToTimetag = function(date) {
        return exports2.timestampToTimetag(date.getTime() / 1e3);
      };
      exports2.timestampToTimetag = function(secs) {
        var fracSeconds, wholeSecs;
        wholeSecs = Math.floor(secs);
        fracSeconds = secs - wholeSecs;
        return makeTimetag(wholeSecs, fracSeconds);
      };
      exports2.timetagToTimestamp = function(timetag) {
        var seconds;
        seconds = timetag[0] + exports2.ntpToFractionalSeconds(timetag[1]);
        return seconds - UNIX_EPOCH;
      };
      makeTimetag = function(unixseconds, fracSeconds) {
        var ntpFracs, ntpSecs;
        ntpSecs = unixseconds + UNIX_EPOCH;
        ntpFracs = Math.round(TWO_POW_32 * fracSeconds);
        return [ntpSecs, ntpFracs];
      };
      exports2.timetagToDate = function(timetag) {
        var date, dd, fracs, fractional, seconds;
        seconds = timetag[0], fractional = timetag[1];
        seconds = seconds - UNIX_EPOCH;
        fracs = exports2.ntpToFractionalSeconds(fractional);
        date = /* @__PURE__ */ new Date();
        date.setTime(seconds * 1e3 + fracs * 1e3);
        dd = /* @__PURE__ */ new Date();
        dd.setUTCFullYear(date.getUTCFullYear());
        dd.setUTCMonth(date.getUTCMonth());
        dd.setUTCDate(date.getUTCDate());
        dd.setUTCHours(date.getUTCHours());
        dd.setUTCMinutes(date.getUTCMinutes());
        dd.setUTCSeconds(date.getUTCSeconds());
        dd.setUTCMilliseconds(fracs * 1e3);
        return dd;
      };
      exports2.deltaTimetag = function(seconds, now) {
        var n;
        n = (now != null ? now : /* @__PURE__ */ new Date()) / 1e3;
        return exports2.timestampToTimetag(n + seconds);
      };
      exports2.ntpToFractionalSeconds = function(fracSeconds) {
        return parseFloat(fracSeconds) / TWO_POW_32;
      };
      exports2.toTimetagBuffer = function(timetag) {
        var high, low, type;
        if (typeof timetag === "number") {
          timetag = exports2.timestampToTimetag(timetag);
        } else if (typeof timetag === "object" && "getTime" in timetag) {
          timetag = exports2.dateToTimetag(timetag);
        } else if (timetag.length !== 2) {
          throw new Error("Invalid timetag" + timetag);
        }
        type = "UInt32";
        high = binpack["pack" + type](timetag[0], "big");
        low = binpack["pack" + type](timetag[1], "big");
        return exports2.concat([high, low]);
      };
      exports2.toIntegerBuffer = function(number, type) {
        if (type == null) {
          type = "Int32";
        }
        if (typeof number !== "number") {
          throw new Error("cannot pack a non-number into an integer buffer");
        }
        return binpack["pack" + type](number, "big");
      };
      oscTypeCodes = {
        s: {
          representation: "string",
          split: function(buffer, strict) {
            var split;
            split = exports2.splitOscString(buffer, strict);
            return {
              value: split.string,
              rest: split.rest
            };
          },
          toArg: function(value, strict) {
            if (typeof value !== "string") {
              throw new Error("expected string");
            }
            return exports2.toOscString(value, strict);
          }
        },
        i: {
          representation: "integer",
          split: function(buffer, strict) {
            var split;
            split = exports2.splitInteger(buffer);
            return {
              value: split.integer,
              rest: split.rest
            };
          },
          toArg: function(value, strict) {
            if (typeof value !== "number") {
              throw new Error("expected number");
            }
            return exports2.toIntegerBuffer(value);
          }
        },
        t: {
          representation: "timetag",
          split: function(buffer, strict) {
            var split;
            split = exports2.splitTimetag(buffer);
            return {
              value: split.timetag,
              rest: split.rest
            };
          },
          toArg: function(value, strict) {
            return exports2.toTimetagBuffer(value);
          }
        },
        f: {
          representation: "float",
          split: function(buffer, strict) {
            return {
              value: binpack.unpackFloat32(buffer.slice(0, 4), "big"),
              rest: buffer.slice(4, buffer.length)
            };
          },
          toArg: function(value, strict) {
            if (typeof value !== "number") {
              throw new Error("expected number");
            }
            return binpack.packFloat32(value, "big");
          }
        },
        d: {
          representation: "double",
          split: function(buffer, strict) {
            return {
              value: binpack.unpackFloat64(buffer.slice(0, 8), "big"),
              rest: buffer.slice(8, buffer.length)
            };
          },
          toArg: function(value, strict) {
            if (typeof value !== "number") {
              throw new Error("expected number");
            }
            return binpack.packFloat64(value, "big");
          }
        },
        b: {
          representation: "blob",
          split: function(buffer, strict) {
            var length, ref;
            ref = exports2.splitInteger(buffer), length = ref.integer, buffer = ref.rest;
            return {
              value: buffer.slice(0, length),
              rest: buffer.slice(length, buffer.length)
            };
          },
          toArg: function(value, strict) {
            var size;
            if (!Buffer.isBuffer(value)) {
              throw new Error("expected node.js Buffer");
            }
            size = exports2.toIntegerBuffer(value.length);
            return exports2.concat([size, value]);
          }
        },
        T: {
          representation: "true",
          split: function(buffer, strict) {
            return {
              rest: buffer,
              value: true
            };
          },
          toArg: function(value, strict) {
            if (!value && strict) {
              throw new Error("true must be true");
            }
            return new Buffer(0);
          }
        },
        F: {
          representation: "false",
          split: function(buffer, strict) {
            return {
              rest: buffer,
              value: false
            };
          },
          toArg: function(value, strict) {
            if (value && strict) {
              throw new Error("false must be false");
            }
            return new Buffer(0);
          }
        },
        N: {
          representation: "null",
          split: function(buffer, strict) {
            return {
              rest: buffer,
              value: null
            };
          },
          toArg: function(value, strict) {
            if (value && strict) {
              throw new Error("null must be false");
            }
            return new Buffer(0);
          }
        },
        I: {
          representation: "bang",
          split: function(buffer, strict) {
            return {
              rest: buffer,
              value: "bang"
            };
          },
          toArg: function(value, strict) {
            return new Buffer(0);
          }
        }
      };
      exports2.oscTypeCodeToTypeString = function(code) {
        var ref;
        return (ref = oscTypeCodes[code]) != null ? ref.representation : void 0;
      };
      exports2.typeStringToOscTypeCode = function(rep) {
        var code, str;
        for (code in oscTypeCodes) {
          if (!hasProp.call(oscTypeCodes, code)) continue;
          str = oscTypeCodes[code].representation;
          if (str === rep) {
            return code;
          }
        }
        return null;
      };
      exports2.argToTypeCode = function(arg, strict) {
        var code, value;
        if ((arg != null ? arg.type : void 0) != null && typeof arg.type === "string" && (code = exports2.typeStringToOscTypeCode(arg.type)) != null) {
          return code;
        }
        value = (arg != null ? arg.value : void 0) != null ? arg.value : arg;
        if (strict && value == null) {
          throw new Error("Argument has no value");
        }
        if (typeof value === "string") {
          return "s";
        }
        if (typeof value === "number") {
          return "f";
        }
        if (Buffer.isBuffer(value)) {
          return "b";
        }
        if (typeof value === "boolean") {
          if (value) {
            return "T";
          } else {
            return "F";
          }
        }
        if (value === null) {
          return "N";
        }
        throw new Error("I don't know what type this is supposed to be.");
      };
      exports2.splitOscArgument = function(buffer, type, strict) {
        var osctype;
        osctype = exports2.typeStringToOscTypeCode(type);
        if (osctype != null) {
          return oscTypeCodes[osctype].split(buffer, strict);
        } else {
          throw new Error("I don't understand how I'm supposed to unpack " + type);
        }
      };
      exports2.toOscArgument = function(value, type, strict) {
        var osctype;
        osctype = exports2.typeStringToOscTypeCode(type);
        if (osctype != null) {
          return oscTypeCodes[osctype].toArg(value, strict);
        } else {
          throw new Error("I don't know how to pack " + type);
        }
      };
      exports2.fromOscMessage = function(buffer, strict) {
        var address, arg, args, arrayStack, built, j, len, ref, ref1, type, typeString, types;
        ref = exports2.splitOscString(buffer, strict), address = ref.string, buffer = ref.rest;
        if (strict && address[0] !== "/") {
          throw StrictError("addresses must start with /");
        }
        if (!buffer.length) {
          return {
            address,
            args: []
          };
        }
        ref1 = exports2.splitOscString(buffer, strict), types = ref1.string, buffer = ref1.rest;
        if (types[0] !== ",") {
          if (strict) {
            throw StrictError("Argument lists must begin with ,");
          }
          return {
            address,
            args: []
          };
        }
        types = types.slice(1, +types.length + 1 || 9e9);
        args = [];
        arrayStack = [args];
        for (j = 0, len = types.length; j < len; j++) {
          type = types[j];
          if (type === "[") {
            arrayStack.push([]);
            continue;
          }
          if (type === "]") {
            if (arrayStack.length <= 1) {
              if (strict) {
                throw new StrictError("Mismatched ']' character.");
              }
            } else {
              built = arrayStack.pop();
              arrayStack[arrayStack.length - 1].push({
                type: "array",
                value: built
              });
            }
            continue;
          }
          typeString = exports2.oscTypeCodeToTypeString(type);
          if (typeString == null) {
            throw new Error("I don't understand the argument code " + type);
          }
          arg = exports2.splitOscArgument(buffer, typeString, strict);
          if (arg != null) {
            buffer = arg.rest;
          }
          arrayStack[arrayStack.length - 1].push({
            type: typeString,
            value: arg != null ? arg.value : void 0
          });
        }
        if (arrayStack.length !== 1 && strict) {
          throw new StrictError("Mismatched '[' character");
        }
        return {
          address,
          args,
          oscType: "message"
        };
      };
      exports2.fromOscBundle = function(buffer, strict) {
        var bundleTag, convertedElems, ref, ref1, timetag;
        ref = exports2.splitOscString(buffer, strict), bundleTag = ref.string, buffer = ref.rest;
        if (bundleTag !== "#bundle") {
          throw new Error("osc-bundles must begin with #bundle");
        }
        ref1 = exports2.splitTimetag(buffer), timetag = ref1.timetag, buffer = ref1.rest;
        convertedElems = mapBundleList(buffer, function(buffer2) {
          return exports2.fromOscPacket(buffer2, strict);
        });
        return {
          timetag,
          elements: convertedElems,
          oscType: "bundle"
        };
      };
      exports2.fromOscPacket = function(buffer, strict) {
        if (isOscBundleBuffer(buffer, strict)) {
          return exports2.fromOscBundle(buffer, strict);
        } else {
          return exports2.fromOscMessage(buffer, strict);
        }
      };
      getArrayArg = function(arg) {
        if (IsArray(arg)) {
          return arg;
        } else if ((arg != null ? arg.type : void 0) === "array" && IsArray(arg != null ? arg.value : void 0)) {
          return arg.value;
        } else if (arg != null && arg.type == null && IsArray(arg.value)) {
          return arg.value;
        } else {
          return null;
        }
      };
      toOscTypeAndArgs = function(argList, strict) {
        var arg, buff, j, len, oscargs, osctype, ref, thisArgs, thisType, typeCode, value;
        osctype = "";
        oscargs = [];
        for (j = 0, len = argList.length; j < len; j++) {
          arg = argList[j];
          if (getArrayArg(arg) != null) {
            ref = toOscTypeAndArgs(getArrayArg(arg), strict), thisType = ref[0], thisArgs = ref[1];
            osctype += "[" + thisType + "]";
            oscargs = oscargs.concat(thisArgs);
            continue;
          }
          typeCode = exports2.argToTypeCode(arg, strict);
          if (typeCode != null) {
            value = arg != null ? arg.value : void 0;
            if (value === void 0) {
              value = arg;
            }
            buff = exports2.toOscArgument(value, exports2.oscTypeCodeToTypeString(typeCode), strict);
            if (buff != null) {
              oscargs.push(buff);
              osctype += typeCode;
            }
          }
        }
        return [osctype, oscargs];
      };
      exports2.toOscMessage = function(message, strict) {
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
        oscaddr = exports2.toOscString(address, strict);
        ref = toOscTypeAndArgs(args, strict), osctype = ref[0], oscargs = ref[1];
        osctype = "," + osctype;
        allArgs = exports2.concat(oscargs);
        osctype = exports2.toOscString(osctype);
        return exports2.concat([oscaddr, osctype, allArgs]);
      };
      exports2.toOscBundle = function(bundle, strict) {
        var allElems, buff, e, elem, elements, elemstr, j, len, oscBundleTag, oscElems, oscTimeTag, ref, ref1, size, timetag;
        if (strict && (bundle != null ? bundle.timetag : void 0) == null) {
          throw StrictError("bundles must have timetags.");
        }
        timetag = (ref = bundle != null ? bundle.timetag : void 0) != null ? ref : /* @__PURE__ */ new Date();
        elements = (ref1 = bundle != null ? bundle.elements : void 0) != null ? ref1 : [];
        if (!IsArray(elements)) {
          elemstr = elements;
          elements = [];
          elements.push(elemstr);
        }
        oscBundleTag = exports2.toOscString("#bundle");
        oscTimeTag = exports2.toTimetagBuffer(timetag);
        oscElems = [];
        for (j = 0, len = elements.length; j < len; j++) {
          elem = elements[j];
          try {
            buff = exports2.toOscPacket(elem, strict);
            size = exports2.toIntegerBuffer(buff.length);
            oscElems.push(exports2.concat([size, buff]));
          } catch (error) {
            e = error;
            null;
          }
        }
        allElems = exports2.concat(oscElems);
        return exports2.concat([oscBundleTag, oscTimeTag, allElems]);
      };
      exports2.toOscPacket = function(bundleOrMessage, strict) {
        if ((bundleOrMessage != null ? bundleOrMessage.oscType : void 0) != null) {
          if (bundleOrMessage.oscType === "bundle") {
            return exports2.toOscBundle(bundleOrMessage, strict);
          }
          return exports2.toOscMessage(bundleOrMessage, strict);
        }
        if ((bundleOrMessage != null ? bundleOrMessage.timetag : void 0) != null || (bundleOrMessage != null ? bundleOrMessage.elements : void 0) != null) {
          return exports2.toOscBundle(bundleOrMessage, strict);
        }
        return exports2.toOscMessage(bundleOrMessage, strict);
      };
      exports2.applyMessageTranformerToBundle = function(transform) {
        return function(buffer) {
          var bundleTagBuffer, copyIndex, elem, elems, j, k, len, len1, lengthBuff, outBuffer, ref, string, timetagBuffer, totalLength;
          ref = exports2.splitOscString(buffer), string = ref.string, buffer = ref.rest;
          if (string !== "#bundle") {
            throw new Error("osc-bundles must begin with #bundle");
          }
          bundleTagBuffer = exports2.toOscString(string);
          timetagBuffer = buffer.slice(0, 8);
          buffer = buffer.slice(8, buffer.length);
          elems = mapBundleList(buffer, function(buffer2) {
            return exports2.applyTransform(buffer2, transform, exports2.applyMessageTranformerToBundle(transform));
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
            lengthBuff = exports2.toIntegerBuffer(elem.length);
            lengthBuff.copy(outBuffer, copyIndex);
            copyIndex += 4;
            elem.copy(outBuffer, copyIndex);
            copyIndex += elem.length;
          }
          return outBuffer;
        };
      };
      exports2.applyTransform = function(buffer, mTransform, bundleTransform) {
        if (bundleTransform == null) {
          bundleTransform = exports2.applyMessageTranformerToBundle(mTransform);
        }
        if (isOscBundleBuffer(buffer)) {
          return bundleTransform(buffer);
        } else {
          return mTransform(buffer);
        }
      };
      exports2.addressTransform = function(transform) {
        return function(buffer) {
          var ref, rest, string;
          ref = exports2.splitOscString(buffer), string = ref.string, rest = ref.rest;
          string = transform(string);
          return exports2.concat([exports2.toOscString(string), rest]);
        };
      };
      exports2.messageTransform = function(transform) {
        return function(buffer) {
          var message;
          message = exports2.fromOscMessage(buffer);
          return exports2.toOscMessage(transform(message));
        };
      };
      IsArray = Array.isArray;
      StrictError = function(str) {
        return new Error("Strict Error: " + str);
      };
      padding = function(str) {
        var bufflength;
        bufflength = Buffer.byteLength(str);
        return 4 - bufflength % 4;
      };
      isOscBundleBuffer = function(buffer, strict) {
        var string;
        string = exports2.splitOscString(buffer, strict).string;
        return string === "#bundle";
      };
      mapBundleList = function(buffer, func) {
        var e, elem, elems, j, len, nonNullElems, size, thisElemBuffer;
        elems = function() {
          var ref, results;
          results = [];
          while (buffer.length) {
            ref = exports2.splitInteger(buffer), size = ref.integer, buffer = ref.rest;
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
        }();
        nonNullElems = [];
        for (j = 0, len = elems.length; j < len; j++) {
          elem = elems[j];
          if (elem != null) {
            nonNullElems.push(elem);
          }
        }
        return nonNullElems;
      };
    }).call(exports2);
  }
});

// ../node_modules/osc-min/lib/index.js
var require_lib = __commonJS({
  "../node_modules/osc-min/lib/index.js"(exports2) {
    (function() {
      var utils, coffee;
      utils = require_osc_utilities();
      exports2.fromBuffer = function(buffer, strict) {
        if (buffer instanceof ArrayBuffer) {
          buffer = new Buffer(new Uint8Array(buffer));
        } else if (buffer instanceof Uint8Array) {
          buffer = new Buffer(buffer);
        }
        return utils.fromOscPacket(buffer, strict);
      };
      exports2.toBuffer = function(object, strict, opt) {
        if (typeof object === "string")
          return utils.toOscPacket({ "address": object, "args": strict }, opt);
        return utils.toOscPacket(object, strict);
      };
      exports2.applyAddressTransform = function(buffer, transform) {
        return utils.applyTransform(buffer, utils.addressTransform(transform));
      };
      exports2.applyMessageTransform = function(buffer, transform) {
        return utils.applyTransform(buffer, utils.messageTransform(transform));
      };
      exports2.timetagToDate = utils.timetagToDate;
      exports2.dateToTimetag = utils.dateToTimetag;
      exports2.timetagToTimestamp = utils.timetagToTimestamp;
      exports2.timestampToTimetag = utils.timestampToTimetag;
    }).call(exports2);
  }
});

// ../lib/x32_adapt.js
var require_x32_adapt = __commonJS({
  "../lib/x32_adapt.js"(exports2, module2) {
    var osc = require_lib();
    function oscNode(...args) {
      return oscMessage("/node", ...args);
    }
    function oscObject(address, ...args) {
      const messageObject = {
        address,
        args: []
      };
      for (const thisArg of args) {
        let argumentType;
        if (typeof thisArg === "string") {
          argumentType = "string";
        } else if (typeof thisArg === "number") {
          if (Number.isInteger(thisArg)) {
            argumentType = "integer";
          } else {
            argumentType = "float";
          }
        }
        messageObject.args.push({ type: argumentType, value: thisArg });
      }
      return messageObject;
    }
    function oscMessage(address, ...args) {
      return osc.toBuffer(oscObject(address, ...args));
    }
    function addMsg(text, state) {
      state.messages.push([/* @__PURE__ */ new Date(), text]);
    }
    function getStateMap() {
      const initFader = ["-oo dB", "OFF", ""];
      const stateMap = {
        bus: [[]],
        cue_list: [],
        current_cue: 0,
        dca: [[]],
        last_size: 0,
        messages: [],
        mode: "cue"
        //CUES, SCENES,SNIPPETS 
      };
      for (let i = 1; i <= 8; i++) {
        stateMap.dca.push([...initFader]);
      }
      for (let i = 1; i <= 16; i++) {
        stateMap.bus.push([...initFader]);
      }
      addMsg("X32 Vor Adapter starting...", stateMap);
      return stateMap;
    }
    function getNameMap() {
      const nameMap = {
        cue: [oscNode("-show/prepos/current")]
      };
      for (let i = 1; i <= 8; i++) {
        nameMap[`dca${i}`] = [
          oscNode(`dca/${i}`),
          oscNode(`dca/${i}/config`)
        ];
      }
      for (let i = 1; i <= 16; i++) {
        nameMap[`bus${_z(i)}`] = [
          oscNode(`bus/${_z(i)}/mix`),
          oscNode(`bus/${_z(i)}/config`)
        ];
      }
      return nameMap;
    }
    function _z(num) {
      return num.toString().padStart(2, "0");
    }
    function sanitizeMessage(decoded) {
      const message = [];
      message.push(decoded.address);
      for (const arg of decoded.args) {
        message.push(arg.value);
      }
      return message;
    }
    function sanitizeBundle(decoded) {
      decoded.elements = decoded.elements.map((element) => {
        if (element.oscType === "bundle") {
          return sanitizeBundle(element);
        } else if (element.oscType === "message") {
          return sanitizeMessage(element);
        }
      });
      return decoded;
    }
    function decode(data) {
      const decoded = osc.fromBuffer(data);
      if (decoded.oscType === "bundle") {
        return sanitizeBundle(decoded);
      } else if (decoded.oscType === "message") {
        return sanitizeMessage(decoded);
      }
      throw new Error("Malformed Packet");
    }
    function float2Db(f) {
      let returnVal = -0;
      if (f >= 0.5) {
        returnVal = f * 40 - 30;
      } else if (f >= 0.25) {
        returnVal = f * 80 - 50;
      } else if (f >= 0.0625) {
        returnVal = f * 160 - 70;
      } else if (f >= 0) {
        returnVal = f * 480 - 90;
      }
      const returnString = returnVal.toFixed(1);
      if (returnString === "-90.0") {
        return "-oo dB";
      }
      return `${returnString} dB`;
    }
    function splitNodeString(nodeString) {
      const parts = nodeString.replace(/\n/, "").split(/ (.*)/s);
      return [parts[0], parts[1]];
    }
    function decodeStringArguments(args) {
      if (typeof args !== "string") {
        return null;
      }
      return args.match(/(?<=")\w[^"]*(?=")|[\w-]+|"[\s\w-]*"/g);
    }
    function decodeOSCAddress(address) {
      const slashRemoved = address.replace(/^\//, "");
      const endPointPath = slashRemoved.split("/");
      switch (endPointPath[0]) {
        case "bus": {
          const operation = endPointPath.slice(2).join("/");
          if (!["mix/fader", "mix/on", "config/name", "mix", "config"].includes(operation)) {
            return null;
          }
          return {
            faderNum: endPointPath[1],
            faderNumI: parseInt(endPointPath[1]),
            operation: endPointPath.slice(2).join("/"),
            type: "bus"
          };
        }
        case "dca": {
          const operation = endPointPath.slice(2).join("/");
          if (!["fader", "on", "config/name", "", "config"].includes(operation)) {
            return null;
          }
          return {
            faderNum: endPointPath[1],
            faderNumI: parseInt(endPointPath[1]),
            operation: operation === "" ? "mix" : operation,
            type: "dca"
          };
        }
        case "-prefs": {
          if (endPointPath[1] === "show_control") {
            return { type: "mode" };
          }
          return null;
        }
        case "-show":
          if (endPointPath[1] === "prepos" && endPointPath[2] === "current") {
            return { type: "currentCue" };
          }
          if (endPointPath[1] !== "showfile") {
            return null;
          }
          if (endPointPath[2] === "show") {
            return { type: "rebuildCueList" };
          }
          if (endPointPath[2] === "cue" || endPointPath[2] === "snippet" || endPointPath[2] === "scene") {
            if (endPointPath.length !== 4) {
              return { type: "cueListDirty" };
            }
            return {
              type: "cue",
              subtype: endPointPath[2],
              cueNum: parseInt(endPointPath[3])
            };
          }
          return null;
        case "add":
        case "delete":
        case "save":
          return { type: "cueListDirty" };
        default:
          return null;
      }
    }
    function processOSCMessage(payload) {
      const [address, ...args] = payload;
      const oscOperation = { endpoint: null };
      if (address === "/node" || address === "node") {
        const [nodeAddress, nodeOSCString] = splitNodeString(args[0]);
        oscOperation.endpoint = decodeOSCAddress(nodeAddress);
        if (oscOperation.endpoint !== null) {
          oscOperation.args = decodeStringArguments(nodeOSCString);
        }
      } else {
        oscOperation.endpoint = decodeOSCAddress(address);
        oscOperation.args = [...args];
      }
      return oscOperation;
    }
    module2.exports = {
      addMsg,
      decode,
      float2Db,
      getNameMap,
      getStateMap,
      now: () => (/* @__PURE__ */ new Date()).getTime() / 1e3,
      oscMessage,
      oscObject,
      processOSCMessage,
      showData: oscMessage("/showdata"),
      toOSCBuffer: (data) => osc.toBuffer(data),
      xRemote: oscMessage("/xremote")
    };
  }
});

// ../node_modules/ansi/lib/newlines.js
var require_newlines = __commonJS({
  "../node_modules/ansi/lib/newlines.js"(exports2, module2) {
    var assert = require("assert");
    var NEWLINE = "\n".charCodeAt(0);
    function emitNewlineEvents(stream) {
      if (stream._emittingNewlines) {
        return;
      }
      var write = stream.write;
      stream.write = function(data) {
        var rtn = write.apply(stream, arguments);
        if (stream.listeners("newline").length > 0) {
          var len = data.length, i = 0;
          if (typeof data == "string") {
            for (; i < len; i++) {
              processByte(stream, data.charCodeAt(i));
            }
          } else {
            for (; i < len; i++) {
              processByte(stream, data[i]);
            }
          }
        }
        return rtn;
      };
      stream._emittingNewlines = true;
    }
    module2.exports = emitNewlineEvents;
    function processByte(stream, b2) {
      assert.equal(typeof b2, "number");
      if (b2 === NEWLINE) {
        stream.emit("newline");
      }
    }
  }
});

// ../node_modules/ansi/lib/ansi.js
var require_ansi = __commonJS({
  "../node_modules/ansi/lib/ansi.js"(exports2, module2) {
    var emitNewlineEvents = require_newlines();
    var prefix = "\x1B[";
    var suffix = "m";
    var codes = {
      up: "A",
      down: "B",
      forward: "C",
      back: "D",
      nextLine: "E",
      previousLine: "F",
      horizontalAbsolute: "G",
      eraseData: "J",
      eraseLine: "K",
      scrollUp: "S",
      scrollDown: "T",
      savePosition: "s",
      restorePosition: "u",
      queryPosition: "6n",
      hide: "?25l",
      show: "?25h"
    };
    var styles = {
      bold: 1,
      italic: 3,
      underline: 4,
      inverse: 7
    };
    var reset = {
      bold: 22,
      italic: 23,
      underline: 24,
      inverse: 27
    };
    var colors = {
      white: 37,
      black: 30,
      blue: 34,
      cyan: 36,
      green: 32,
      magenta: 35,
      red: 31,
      yellow: 33,
      grey: 90,
      brightBlack: 90,
      brightRed: 91,
      brightGreen: 92,
      brightYellow: 93,
      brightBlue: 94,
      brightMagenta: 95,
      brightCyan: 96,
      brightWhite: 97
    };
    function ansi(stream, options2) {
      if (stream._ansicursor) {
        return stream._ansicursor;
      } else {
        return stream._ansicursor = new Cursor(stream, options2);
      }
    }
    module2.exports = exports2 = ansi;
    function Cursor(stream, options2) {
      if (!(this instanceof Cursor)) {
        return new Cursor(stream, options2);
      }
      if (typeof stream != "object" || typeof stream.write != "function") {
        throw new Error("a valid Stream instance must be passed in");
      }
      this.stream = stream;
      this.enabled = options2 && options2.enabled;
      if (typeof this.enabled === "undefined") {
        this.enabled = stream.isTTY;
      }
      this.enabled = !!this.enabled;
      this.buffering = !!(options2 && options2.buffering);
      this._buffer = [];
      this.fg = this.foreground = new Colorer(this, 0);
      this.bg = this.background = new Colorer(this, 10);
      this.Bold = false;
      this.Italic = false;
      this.Underline = false;
      this.Inverse = false;
      this.newlines = 0;
      emitNewlineEvents(stream);
      stream.on("newline", function() {
        this.newlines++;
      }.bind(this));
    }
    exports2.Cursor = Cursor;
    Cursor.prototype.write = function(data) {
      if (this.buffering) {
        this._buffer.push(arguments);
      } else {
        this.stream.write.apply(this.stream, arguments);
      }
      return this;
    };
    Cursor.prototype.buffer = function() {
      this.buffering = true;
      return this;
    };
    Cursor.prototype.flush = function() {
      this.buffering = false;
      var str = this._buffer.map(function(args) {
        if (args.length != 1) throw new Error("unexpected args length! " + args.length);
        return args[0];
      }).join("");
      this._buffer.splice(0);
      this.write(str);
      return this;
    };
    function Colorer(cursor, base) {
      this.current = null;
      this.cursor = cursor;
      this.base = base;
    }
    exports2.Colorer = Colorer;
    Colorer.prototype._setColorCode = function setColorCode(code) {
      var c = String(code);
      if (this.current === c) return;
      this.cursor.enabled && this.cursor.write(prefix + c + suffix);
      this.current = c;
      return this;
    };
    Object.keys(codes).forEach(function(name) {
      var code = String(codes[name]);
      Cursor.prototype[name] = function() {
        var c = code;
        if (arguments.length > 0) {
          c = toArray(arguments).map(Math.round).join(";") + code;
        }
        this.enabled && this.write(prefix + c);
        return this;
      };
    });
    Object.keys(styles).forEach(function(style) {
      var name = style[0].toUpperCase() + style.substring(1), c = styles[style], r = reset[style];
      Cursor.prototype[style] = function() {
        if (this[name]) return this;
        this.enabled && this.write(prefix + c + suffix);
        this[name] = true;
        return this;
      };
      Cursor.prototype["reset" + name] = function() {
        if (!this[name]) return this;
        this.enabled && this.write(prefix + r + suffix);
        this[name] = false;
        return this;
      };
    });
    Object.keys(colors).forEach(function(color) {
      var code = colors[color];
      Colorer.prototype[color] = function() {
        this._setColorCode(this.base + code);
        return this.cursor;
      };
      Cursor.prototype[color] = function() {
        return this.foreground[color]();
      };
    });
    Cursor.prototype.beep = function() {
      this.enabled && this.write("\x07");
      return this;
    };
    Cursor.prototype.goto = function(x, y) {
      x = x | 0;
      y = y | 0;
      this.enabled && this.write(prefix + y + ";" + x + "H");
      return this;
    };
    Colorer.prototype.reset = function() {
      this._setColorCode(this.base + 39);
      return this.cursor;
    };
    Cursor.prototype.reset = function() {
      this.enabled && this.write(prefix + "0" + suffix);
      this.Bold = false;
      this.Italic = false;
      this.Underline = false;
      this.Inverse = false;
      this.foreground.current = null;
      this.background.current = null;
      return this;
    };
    Colorer.prototype.rgb = function(r, g, b2) {
      var base = this.base + 38, code = rgb(r, g, b2);
      this._setColorCode(base + ";5;" + code);
      return this.cursor;
    };
    Cursor.prototype.rgb = function(r, g, b2) {
      return this.foreground.rgb(r, g, b2);
    };
    Colorer.prototype.hex = function(color) {
      return this.rgb.apply(this, hex(color));
    };
    Cursor.prototype.hex = function(color) {
      return this.foreground.hex(color);
    };
    function rgb(r, g, b2) {
      var red = r / 255 * 5, green = g / 255 * 5, blue = b2 / 255 * 5;
      return rgb5(red, green, blue);
    }
    function rgb5(r, g, b2) {
      var red = Math.round(r), green = Math.round(g), blue = Math.round(b2);
      return 16 + red * 36 + green * 6 + blue;
    }
    function hex(color) {
      var c = color[0] === "#" ? color.substring(1) : color, r = c.substring(0, 2), g = c.substring(2, 4), b2 = c.substring(4, 6);
      return [parseInt(r, 16), parseInt(g, 16), parseInt(b2, 16)];
    }
    function toArray(a) {
      var i = 0, l = a.length, rtn = [];
      for (; i < l; i++) {
        rtn.push(a[i]);
      }
      return rtn;
    }
  }
});

// ../lib/window_lib.js
var require_window_lib = __commonJS({
  "../lib/window_lib.js"(exports2, module2) {
    var ansi = require_ansi();
    var cursor = ansi(process.stdout);
    var winLib2 = class {
      #layout = {
        bars: [1, 4, 27],
        bus: 15,
        //12 lines
        cue: 3,
        // 1 line
        dca: 9,
        // 6 lines
        msg: 5,
        // 4 lines
        time: 2,
        // 1 line
        title: 1
        // 1 line
      };
      #color = {
        head1: "#FFFFFF",
        head2: "#19439C",
        msg: "#3C3C3C",
        off: "#931711",
        on: "#29F12A",
        outline: "#8540E7",
        text: "#9C9DA0"
      };
      #cols = null;
      #winSize = [80, 24];
      #lineEnd = 80;
      #stateMap = null;
      constructor(stateMap) {
        this.#stateMap = stateMap;
      }
      doSetupAndClear() {
        this.#winSize = process.stdout.getWindowSize();
        this.#lineEnd = this.#winSize[0];
        this.#cols = this.#getColumns();
        if (this.#winSize[1] < 28) {
          this.#stateMap.messages.push([/* @__PURE__ */ new Date(), "Your terminal has less than 28 lines, info may be truncated!"]);
        }
        cursor.write(Array.apply(null, new Array(process.stdout.getWindowSize()[1])).map(() => "\n").join("")).eraseData(2).goto(1, 1);
        this.#doDecoration();
      }
      paint() {
        const data = this.#stateMap;
        this.#clearLine(this.#layout.time);
        this.#colonHead("Current Time", (/* @__PURE__ */ new Date()).toLocaleString(), this.#layout.time);
        this.#colonHead("Packet Size", `${data.last_size} b`, this.#layout.time, true);
        const currentCue = [
          data.cue_list?.[data.current_cue]?.[0] ?? "0.0.0",
          data.cue_list?.[data.current_cue]?.[1] ?? ""
        ];
        this.#clearLine(this.#layout.cue);
        this.#colonHead("Current Cue", currentCue.join(" "), this.#layout.cue);
        this.#colonHead("Cue List Size", `${data.cue_list.length}`, this.#layout.cue, true);
        for (let i = 1; i <= 4; i++) {
          this.#doMeasure(this.#layout.dca + 1, i, i, data.dca[i]);
          this.#doMeasure(this.#layout.dca + 4, i, i + 4, data.dca[i + 4]);
        }
        for (let i = 1; i <= 4; i++) {
          this.#doMeasure(this.#layout.bus + 1, i, i, data.bus[i]);
          this.#doMeasure(this.#layout.bus + 4, i, i + 4, data.bus[i + 4]);
          this.#doMeasure(this.#layout.bus + 7, i, i + 8, data.bus[i + 8]);
          this.#doMeasure(this.#layout.bus + 10, i, i + 12, data.bus[i + 12]);
        }
        data.messages = data.messages.slice(-8);
        const displayMessage = data.messages.slice(-4);
        for (const [i, element] of displayMessage.entries()) {
          const dateString = new Date(element[0].getTime() - element[0].getTimezoneOffset() * 6e4).toJSON();
          const availLength = this.#lineEnd - 4 - dateString.length;
          cursor.goto(3, this.#layout.msg + i).hex(this.#color.msg).write(dateString.substring(0, dateString.length - 1)).write(" ").hex(this.#color.text).write(element[1].substring(0, availLength).padEnd(availLength, " "));
        }
        cursor.reset();
        cursor.goto(1, this.#winSize[1]).write("CTRL+C to stop and exit. ");
      }
      #clearLine(line) {
        cursor.goto(2, line).write("".padEnd(this.#lineEnd - 2, " "));
      }
      #doMeasure(startRow, column, number, dataPoint) {
        this.#doFourCols(startRow, column, dataPoint[1] === "ON" ? this.#color.on : this.#color.off, `[${number}] ${dataPoint[2]}`, true);
        this.#doFourCols(startRow + 1, column, this.#color.text, dataPoint[0], true);
      }
      #colonHead(caption, text, line, right = false) {
        let startText = 3;
        if (right) {
          const fullText = caption.length + text.length + 3;
          startText = this.#lineEnd - 1 - fullText;
        }
        cursor.goto(startText, line).hex(this.#color.head2).write(caption).write(" : ").hex(this.#color.text).write(text);
      }
      #center(line, text, color) {
        const halfText = Math.floor(text.length / 2);
        const startText = Math.max(2, Math.floor(this.#winSize[0] / 2) - halfText);
        cursor.goto(startText, line).hex(color).write(text);
      }
      #doBars(line) {
        cursor.goto(1, line).hex(this.#color.outline).write("|");
        cursor.goto(this.#lineEnd, line).hex(this.#color.outline).write("|");
      }
      #getColumns() {
        const columnSize = Math.floor((this.#lineEnd - 3) / 4);
        return {
          bar: [1, 2 + columnSize, 2 + columnSize * 2, 2 + columnSize * 3, this.#lineEnd],
          text: [null, 3, 4 + columnSize, 4 + columnSize * 2, 4 + columnSize * 3],
          max: columnSize - 2
        };
      }
      #doFourBars(line) {
        cursor.goto(this.#cols.bar[0], line).hex(this.#color.outline).write("|");
        cursor.goto(this.#cols.bar[1], line).hex(this.#color.outline).write("|");
        cursor.goto(this.#cols.bar[2], line).hex(this.#color.outline).write("|");
        cursor.goto(this.#cols.bar[3], line).hex(this.#color.outline).write("|");
        cursor.goto(this.#cols.bar[4], line).hex(this.#color.outline).write("|");
      }
      #truncText(text, center = false) {
        const retText = text.substring(0, this.#cols.max);
        if (center) {
          const pad = Math.floor((this.#cols.max - retText.length) / 2);
          return `${"".padStart(pad, " ")}${retText}`.padEnd(this.#cols.max, " ");
        }
        return retText;
      }
      #doFourCols(line, column, color, text, center = false) {
        cursor.goto(this.#cols.text[column], line).hex(color).write(this.#truncText(text, center));
      }
      #doDecoration() {
        for (const lineNum of this.#layout.bars) {
          this.#doLine(lineNum);
        }
        this.#center(this.#layout.title, " X32 Vor Adapter ", this.#color.head1);
        this.#doBars(this.#layout.time);
        this.#doBars(this.#layout.cue);
        this.#doLine(this.#layout.dca);
        this.#doLine(this.#layout.dca + 3);
        this.#center(this.#layout.dca, " DCA Block ", this.#color.head2);
        this.#doFourBars(this.#layout.dca + 1);
        this.#doFourBars(this.#layout.dca + 2);
        this.#doFourBars(this.#layout.dca + 4);
        this.#doFourBars(this.#layout.dca + 5);
        this.#doLine(this.#layout.bus);
        this.#doLine(this.#layout.bus + 3);
        this.#doLine(this.#layout.bus + 6);
        this.#doLine(this.#layout.bus + 9);
        this.#center(this.#layout.bus, " BUS Block ", this.#color.head2);
        this.#doFourBars(this.#layout.bus + 1);
        this.#doFourBars(this.#layout.bus + 2);
        this.#doFourBars(this.#layout.bus + 4);
        this.#doFourBars(this.#layout.bus + 5);
        this.#doFourBars(this.#layout.bus + 7);
        this.#doFourBars(this.#layout.bus + 8);
        this.#doFourBars(this.#layout.bus + 10);
        this.#doFourBars(this.#layout.bus + 11);
        this.#doBars(this.#layout.time);
        this.#doBars(this.#layout.msg);
        this.#doBars(this.#layout.msg + 1);
        this.#doBars(this.#layout.msg + 2);
        this.#doBars(this.#layout.msg + 3);
      }
      #doLine(line) {
        cursor.goto(1, line).hex(this.#color.outline).write("".padStart(this.#lineEnd, "-"));
      }
    };
    module2.exports = {
      winLib: winLib2
    };
  }
});

// ../test_dev/fake_data.js
var require_fake_data = __commonJS({
  "../test_dev/fake_data.js"(exports2, module2) {
    module2.exports.nodeLines = [
      ["/node", "/config/chlink OFF OFF OFF OFF OFF OFF OFF OFF OFF OFF OFF OFF OFF OFF OFF OFF"],
      ["/node", "/config/auxlink ON OFF OFF ON"],
      ["/node", "/config/fxlink ON ON ON OFF"],
      ["/node", "/config/buslink OFF OFF OFF OFF OFF ON OFF OFF"],
      ["/node", "/config/mtxlink OFF OFF OFF"],
      ["/node", "/config/mute OFF OFF OFF OFF OFF OFF"],
      ["/node", "/config/linkcfg ON ON ON ON"],
      ["/node", "/config/mono LR+M ON"],
      ["/node", "/config/solo +10.0 LR 12.0 PFL PFL PFL ON OFF ON -20 OFF OFF ON  47.5 OFF OFF OFF"],
      ["/node", "/config/talk ON EXT"],
      ["/node", "/config/talk/A  -5.3 OFF ON %010000000000000000"],
      ["/node", "/config/talk/B -12.0 ON ON %000000000000000001"],
      ["/node", "/config/osc -40.0 100.2 1k00 F1 PINK 0"],
      ["/node", "/config/userrout/out 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"],
      ["/node", "/config/userrout/in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 33 34 35 36 37 38 39 40"],
      ["/node", "/config/routing REC"],
      ["/node", "/config/routing/IN UIN1-8 UIN9-16 UIN17-24 UIN25-32 AUX1-4"],
      ["/node", "/config/routing/AES50A OUT1-8 OUT9-16 OUT1-8 OUT9-16 P161-8 P169-16"],
      ["/node", "/config/routing/AES50B OUT1-8 OUT9-16 OUT1-8 OUT9-16 P161-8 P169-16"],
      ["/node", "/config/routing/CARD UIN1-8 UIN9-16 UIN17-24 UIN25-32"],
      ["/node", "/config/routing/OUT OUT1-4 OUT5-8 OUT9-12 OUT13-16"],
      ["/node", "/config/routing/PLAY CARD1-8 CARD9-16 CARD17-24 CARD25-32 AUX1-4"],
      ["/node", "/config/userctrl/A GN"],
      ["/node", '/config/userctrl/A/enc "F60" "F61" "F62" "F63"'],
      ["/node", '/config/userctrl/A/btn "P600S" "P610S" "P620S" "P630S" "P0051" "P0052" "P0053" "P0054"'],
      ["/node", "/config/userctrl/B YEi"],
      ["/node", '/config/userctrl/B/enc "F58" "F59" "" "F48"'],
      ["/node", '/config/userctrl/B/btn "P580S" "P590S" "" "P480S" "O58" "O59" "" "O48"'],
      ["/node", "/config/userctrl/C MG"],
      ["/node", '/config/userctrl/C/enc "F32" "F35" "F36" "F37"'],
      ["/node", '/config/userctrl/C/btn "S210" "S211" "MN01040" "MN01041" "MN01039" "" "" "MN01036"'],
      ["/node", "/config/tape 18.0 18.0 ON"],
      ["/node", "/config/amixenable OFF OFF"],
      ["/node", "/config/dp48 %0000 0 AESA"],
      ["/node", "/config/dp48/assign 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"],
      ["/node", "/config/dp48/link 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 0 0 0 0 0 0 1 0"],
      ["/node", '/config/dp48/grpname "" "" "" "" "" "" "" "" "" "" "" ""'],
      ["/node", '/ch/01/config "" 1 YE 1'],
      ["/node", "/ch/01/delay OFF   0.3"],
      ["/node", "/ch/01/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/01/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/01/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/01/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/01/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/01/insert OFF POST OFF"],
      ["/node", "/ch/01/eq ON"],
      ["/node", "/ch/01/eq/1 PEQ 124.7 +0.00 1.9"],
      ["/node", "/ch/01/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/01/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/01/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/01/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/01/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/01/mix/02 ON   -oo"],
      ["/node", "/ch/01/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/01/mix/04 ON   -oo"],
      ["/node", "/ch/01/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/01/mix/06 ON   -oo"],
      ["/node", "/ch/01/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/01/mix/08 ON   -oo"],
      ["/node", "/ch/01/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/01/mix/10 ON   -oo"],
      ["/node", "/ch/01/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/01/mix/12 ON   -oo"],
      ["/node", "/ch/01/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/01/mix/14 ON -50.0"],
      ["/node", "/ch/01/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/01/mix/16 ON   -oo"],
      ["/node", "/ch/01/grp %00000000 %000000"],
      ["/node", "/ch/01/automix OFF -12.0"],
      ["/node", '/ch/02/config "" 1 YE 2'],
      ["/node", "/ch/02/delay OFF   0.3"],
      ["/node", "/ch/02/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/02/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/02/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/02/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/02/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/02/insert OFF POST OFF"],
      ["/node", "/ch/02/eq ON"],
      ["/node", "/ch/02/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/02/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/02/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/02/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/02/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/02/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/02/mix/02 ON   -oo"],
      ["/node", "/ch/02/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/02/mix/04 ON   -oo"],
      ["/node", "/ch/02/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/02/mix/06 ON   -oo"],
      ["/node", "/ch/02/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/02/mix/08 ON   -oo"],
      ["/node", "/ch/02/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/02/mix/10 ON   -oo"],
      ["/node", "/ch/02/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/02/mix/12 ON   -oo"],
      ["/node", "/ch/02/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/02/mix/14 ON -50.0"],
      ["/node", "/ch/02/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/02/mix/16 ON   -oo"],
      ["/node", "/ch/02/grp %00000000 %000000"],
      ["/node", "/ch/02/automix OFF -12.0"],
      ["/node", '/ch/03/config "" 1 YE 3'],
      ["/node", "/ch/03/delay OFF   0.3"],
      ["/node", "/ch/03/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/03/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/03/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/03/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/03/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/03/insert OFF POST OFF"],
      ["/node", "/ch/03/eq ON"],
      ["/node", "/ch/03/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/03/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/03/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/03/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/03/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/03/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/03/mix/02 ON   -oo"],
      ["/node", "/ch/03/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/03/mix/04 ON   -oo"],
      ["/node", "/ch/03/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/03/mix/06 ON   -oo"],
      ["/node", "/ch/03/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/03/mix/08 ON   -oo"],
      ["/node", "/ch/03/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/03/mix/10 ON   -oo"],
      ["/node", "/ch/03/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/03/mix/12 ON   -oo"],
      ["/node", "/ch/03/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/03/mix/14 ON -50.0"],
      ["/node", "/ch/03/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/03/mix/16 ON   -oo"],
      ["/node", "/ch/03/grp %00000000 %000000"],
      ["/node", "/ch/03/automix OFF -12.0"],
      ["/node", '/ch/04/config "" 1 YE 4'],
      ["/node", "/ch/04/delay OFF   0.3"],
      ["/node", "/ch/04/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/04/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/04/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/04/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/04/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/04/insert OFF POST OFF"],
      ["/node", "/ch/04/eq ON"],
      ["/node", "/ch/04/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/04/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/04/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/04/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/04/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/04/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/04/mix/02 ON   -oo"],
      ["/node", "/ch/04/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/04/mix/04 ON   -oo"],
      ["/node", "/ch/04/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/04/mix/06 ON   -oo"],
      ["/node", "/ch/04/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/04/mix/08 ON   -oo"],
      ["/node", "/ch/04/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/04/mix/10 ON   -oo"],
      ["/node", "/ch/04/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/04/mix/12 ON   -oo"],
      ["/node", "/ch/04/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/04/mix/14 ON -50.0"],
      ["/node", "/ch/04/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/04/mix/16 ON   -oo"],
      ["/node", "/ch/04/grp %00000000 %000000"],
      ["/node", "/ch/04/automix OFF -12.0"],
      ["/node", '/ch/05/config "" 1 YE 5'],
      ["/node", "/ch/05/delay OFF   0.3"],
      ["/node", "/ch/05/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/05/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/05/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/05/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/05/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/05/insert OFF POST OFF"],
      ["/node", "/ch/05/eq ON"],
      ["/node", "/ch/05/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/05/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/05/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/05/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/05/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/05/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/05/mix/02 ON   -oo"],
      ["/node", "/ch/05/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/05/mix/04 ON   -oo"],
      ["/node", "/ch/05/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/05/mix/06 ON   -oo"],
      ["/node", "/ch/05/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/05/mix/08 ON   -oo"],
      ["/node", "/ch/05/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/05/mix/10 ON   -oo"],
      ["/node", "/ch/05/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/05/mix/12 ON   -oo"],
      ["/node", "/ch/05/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/05/mix/14 ON -50.0"],
      ["/node", "/ch/05/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/05/mix/16 ON   -oo"],
      ["/node", "/ch/05/grp %00000000 %000000"],
      ["/node", "/ch/05/automix OFF -12.0"],
      ["/node", '/ch/06/config "" 1 YE 6'],
      ["/node", "/ch/06/delay OFF   0.3"],
      ["/node", "/ch/06/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/06/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/06/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/06/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/06/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/06/insert OFF POST OFF"],
      ["/node", "/ch/06/eq ON"],
      ["/node", "/ch/06/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/06/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/06/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/06/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/06/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/06/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/06/mix/02 ON   -oo"],
      ["/node", "/ch/06/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/06/mix/04 ON   -oo"],
      ["/node", "/ch/06/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/06/mix/06 ON   -oo"],
      ["/node", "/ch/06/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/06/mix/08 ON   -oo"],
      ["/node", "/ch/06/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/06/mix/10 ON   -oo"],
      ["/node", "/ch/06/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/06/mix/12 ON   -oo"],
      ["/node", "/ch/06/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/06/mix/14 ON -50.0"],
      ["/node", "/ch/06/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/06/mix/16 ON   -oo"],
      ["/node", "/ch/06/grp %00000000 %000000"],
      ["/node", "/ch/06/automix OFF -12.0"],
      ["/node", '/ch/07/config "" 1 YE 7'],
      ["/node", "/ch/07/delay OFF   0.3"],
      ["/node", "/ch/07/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/07/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/07/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/07/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/07/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/07/insert OFF POST OFF"],
      ["/node", "/ch/07/eq ON"],
      ["/node", "/ch/07/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/07/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/07/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/07/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/07/mix OFF -84.8 OFF +0 OFF   -oo"],
      ["/node", "/ch/07/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/07/mix/02 ON   -oo"],
      ["/node", "/ch/07/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/07/mix/04 ON   -oo"],
      ["/node", "/ch/07/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/07/mix/06 ON   -oo"],
      ["/node", "/ch/07/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/07/mix/08 ON   -oo"],
      ["/node", "/ch/07/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/07/mix/10 ON   -oo"],
      ["/node", "/ch/07/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/07/mix/12 ON   -oo"],
      ["/node", "/ch/07/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/07/mix/14 ON -50.0"],
      ["/node", "/ch/07/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/07/mix/16 ON   -oo"],
      ["/node", "/ch/07/grp %00000000 %000000"],
      ["/node", "/ch/07/automix OFF -12.0"],
      ["/node", '/ch/08/config "" 1 YE 8'],
      ["/node", "/ch/08/delay OFF   0.3"],
      ["/node", "/ch/08/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/08/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/08/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/08/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/08/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/08/insert OFF POST OFF"],
      ["/node", "/ch/08/eq ON"],
      ["/node", "/ch/08/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/08/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/08/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/08/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/08/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/08/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/08/mix/02 ON   -oo"],
      ["/node", "/ch/08/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/08/mix/04 ON   -oo"],
      ["/node", "/ch/08/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/08/mix/06 ON   -oo"],
      ["/node", "/ch/08/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/08/mix/08 ON   -oo"],
      ["/node", "/ch/08/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/08/mix/10 ON   -oo"],
      ["/node", "/ch/08/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/08/mix/12 ON   -oo"],
      ["/node", "/ch/08/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/08/mix/14 ON -50.0"],
      ["/node", "/ch/08/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/08/mix/16 ON   -oo"],
      ["/node", "/ch/08/grp %00000000 %000000"],
      ["/node", "/ch/08/automix OFF -12.0"],
      ["/node", '/ch/09/config "" 1 YE 9'],
      ["/node", "/ch/09/delay OFF   0.3"],
      ["/node", "/ch/09/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/09/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/09/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/09/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/09/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/09/insert OFF POST OFF"],
      ["/node", "/ch/09/eq ON"],
      ["/node", "/ch/09/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/09/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/09/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/09/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/09/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/09/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/09/mix/02 ON   -oo"],
      ["/node", "/ch/09/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/09/mix/04 ON   -oo"],
      ["/node", "/ch/09/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/09/mix/06 ON   -oo"],
      ["/node", "/ch/09/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/09/mix/08 ON   -oo"],
      ["/node", "/ch/09/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/09/mix/10 ON   -oo"],
      ["/node", "/ch/09/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/09/mix/12 ON   -oo"],
      ["/node", "/ch/09/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/09/mix/14 ON -50.0"],
      ["/node", "/ch/09/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/09/mix/16 ON   -oo"],
      ["/node", "/ch/09/grp %00000000 %000000"],
      ["/node", "/ch/09/automix OFF -12.0"],
      ["/node", '/ch/10/config "" 1 YE 10'],
      ["/node", "/ch/10/delay OFF   0.3"],
      ["/node", "/ch/10/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/10/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/10/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/10/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/10/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/10/insert OFF POST OFF"],
      ["/node", "/ch/10/eq ON"],
      ["/node", "/ch/10/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/10/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/10/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/10/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/10/mix OFF -78.3 OFF +0 OFF   -oo"],
      ["/node", "/ch/10/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/10/mix/02 ON   -oo"],
      ["/node", "/ch/10/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/10/mix/04 ON   -oo"],
      ["/node", "/ch/10/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/10/mix/06 ON   -oo"],
      ["/node", "/ch/10/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/10/mix/08 ON   -oo"],
      ["/node", "/ch/10/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/10/mix/10 ON   -oo"],
      ["/node", "/ch/10/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/10/mix/12 ON   -oo"],
      ["/node", "/ch/10/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/10/mix/14 ON -50.0"],
      ["/node", "/ch/10/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/10/mix/16 ON   -oo"],
      ["/node", "/ch/10/grp %00000000 %000000"],
      ["/node", "/ch/10/automix OFF -12.0"],
      ["/node", '/ch/11/config "" 1 YE 11'],
      ["/node", "/ch/11/delay OFF   0.3"],
      ["/node", "/ch/11/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/11/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/11/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/11/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/11/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/11/insert OFF POST OFF"],
      ["/node", "/ch/11/eq ON"],
      ["/node", "/ch/11/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/11/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/11/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/11/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/11/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/11/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/11/mix/02 ON   -oo"],
      ["/node", "/ch/11/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/11/mix/04 ON   -oo"],
      ["/node", "/ch/11/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/11/mix/06 ON   -oo"],
      ["/node", "/ch/11/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/11/mix/08 ON   -oo"],
      ["/node", "/ch/11/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/11/mix/10 ON   -oo"],
      ["/node", "/ch/11/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/11/mix/12 ON   -oo"],
      ["/node", "/ch/11/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/11/mix/14 ON -50.0"],
      ["/node", "/ch/11/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/11/mix/16 ON   -oo"],
      ["/node", "/ch/11/grp %00000000 %000000"],
      ["/node", "/ch/11/automix OFF -12.0"],
      ["/node", '/ch/12/config "" 1 YE 12'],
      ["/node", "/ch/12/delay OFF   0.3"],
      ["/node", "/ch/12/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/12/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/12/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/12/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/12/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/12/insert OFF POST OFF"],
      ["/node", "/ch/12/eq ON"],
      ["/node", "/ch/12/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/12/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/12/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/12/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/12/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/12/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/12/mix/02 ON   -oo"],
      ["/node", "/ch/12/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/12/mix/04 ON   -oo"],
      ["/node", "/ch/12/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/12/mix/06 ON   -oo"],
      ["/node", "/ch/12/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/12/mix/08 ON   -oo"],
      ["/node", "/ch/12/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/12/mix/10 ON   -oo"],
      ["/node", "/ch/12/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/12/mix/12 ON   -oo"],
      ["/node", "/ch/12/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/12/mix/14 ON -50.0"],
      ["/node", "/ch/12/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/12/mix/16 ON   -oo"],
      ["/node", "/ch/12/grp %00000000 %000000"],
      ["/node", "/ch/12/automix OFF -12.0"],
      ["/node", '/ch/13/config "" 1 YE 13'],
      ["/node", "/ch/13/delay OFF   0.3"],
      ["/node", "/ch/13/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/13/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/13/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/13/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/13/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/13/insert OFF POST OFF"],
      ["/node", "/ch/13/eq ON"],
      ["/node", "/ch/13/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/13/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/13/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/13/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/13/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/13/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/13/mix/02 ON   -oo"],
      ["/node", "/ch/13/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/13/mix/04 ON   -oo"],
      ["/node", "/ch/13/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/13/mix/06 ON   -oo"],
      ["/node", "/ch/13/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/13/mix/08 ON   -oo"],
      ["/node", "/ch/13/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/13/mix/10 ON   -oo"],
      ["/node", "/ch/13/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/13/mix/12 ON   -oo"],
      ["/node", "/ch/13/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/13/mix/14 ON -50.0"],
      ["/node", "/ch/13/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/13/mix/16 ON   -oo"],
      ["/node", "/ch/13/grp %00000000 %000000"],
      ["/node", "/ch/13/automix OFF -12.0"],
      ["/node", '/ch/14/config "" 1 YE 14'],
      ["/node", "/ch/14/delay OFF   0.3"],
      ["/node", "/ch/14/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/14/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/14/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/14/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/14/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/14/insert OFF POST OFF"],
      ["/node", "/ch/14/eq ON"],
      ["/node", "/ch/14/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/14/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/14/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/14/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/14/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/14/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/14/mix/02 ON   -oo"],
      ["/node", "/ch/14/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/14/mix/04 ON   -oo"],
      ["/node", "/ch/14/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/14/mix/06 ON   -oo"],
      ["/node", "/ch/14/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/14/mix/08 ON   -oo"],
      ["/node", "/ch/14/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/14/mix/10 ON   -oo"],
      ["/node", "/ch/14/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/14/mix/12 ON   -oo"],
      ["/node", "/ch/14/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/14/mix/14 ON -50.0"],
      ["/node", "/ch/14/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/14/mix/16 ON   -oo"],
      ["/node", "/ch/14/grp %00000000 %000000"],
      ["/node", "/ch/14/automix OFF -12.0"],
      ["/node", '/ch/15/config "" 1 YE 15'],
      ["/node", "/ch/15/delay OFF   0.3"],
      ["/node", "/ch/15/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/15/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/15/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/15/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/15/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/15/insert OFF POST OFF"],
      ["/node", "/ch/15/eq ON"],
      ["/node", "/ch/15/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/15/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/15/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/15/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/15/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/15/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/15/mix/02 ON   -oo"],
      ["/node", "/ch/15/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/15/mix/04 ON   -oo"],
      ["/node", "/ch/15/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/15/mix/06 ON   -oo"],
      ["/node", "/ch/15/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/15/mix/08 ON   -oo"],
      ["/node", "/ch/15/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/15/mix/10 ON   -oo"],
      ["/node", "/ch/15/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/15/mix/12 ON   -oo"],
      ["/node", "/ch/15/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/15/mix/14 ON -50.0"],
      ["/node", "/ch/15/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/15/mix/16 ON   -oo"],
      ["/node", "/ch/15/grp %00000000 %000000"],
      ["/node", "/ch/15/automix OFF -12.0"],
      ["/node", '/ch/16/config "" 1 YE 16'],
      ["/node", "/ch/16/delay OFF   0.3"],
      ["/node", "/ch/16/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/16/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/16/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/16/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/16/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/16/insert OFF POST OFF"],
      ["/node", "/ch/16/eq ON"],
      ["/node", "/ch/16/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/16/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/16/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/16/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/16/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/16/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/16/mix/02 ON   -oo"],
      ["/node", "/ch/16/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/16/mix/04 ON   -oo"],
      ["/node", "/ch/16/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/16/mix/06 ON   -oo"],
      ["/node", "/ch/16/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/16/mix/08 ON   -oo"],
      ["/node", "/ch/16/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/16/mix/10 ON   -oo"],
      ["/node", "/ch/16/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/16/mix/12 ON   -oo"],
      ["/node", "/ch/16/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/16/mix/14 ON -50.0"],
      ["/node", "/ch/16/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/16/mix/16 ON   -oo"],
      ["/node", "/ch/16/grp %00000000 %000000"],
      ["/node", "/ch/16/automix OFF -12.0"],
      ["/node", '/ch/17/config "" 1 YE 17'],
      ["/node", "/ch/17/delay OFF   0.3"],
      ["/node", "/ch/17/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/17/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/17/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/17/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/17/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/17/insert OFF POST OFF"],
      ["/node", "/ch/17/eq ON"],
      ["/node", "/ch/17/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/17/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/17/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/17/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/17/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/17/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/17/mix/02 ON   -oo"],
      ["/node", "/ch/17/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/17/mix/04 ON   -oo"],
      ["/node", "/ch/17/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/17/mix/06 ON   -oo"],
      ["/node", "/ch/17/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/17/mix/08 ON   -oo"],
      ["/node", "/ch/17/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/17/mix/10 ON   -oo"],
      ["/node", "/ch/17/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/17/mix/12 ON   -oo"],
      ["/node", "/ch/17/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/17/mix/14 ON -50.0"],
      ["/node", "/ch/17/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/17/mix/16 ON   -oo"],
      ["/node", "/ch/17/grp %00000000 %000000"],
      ["/node", "/ch/17/automix OFF -12.0"],
      ["/node", '/ch/18/config "" 1 YE 18'],
      ["/node", "/ch/18/delay OFF   0.3"],
      ["/node", "/ch/18/preamp +0.0 OFF ON 24 128"],
      ["/node", "/ch/18/gate ON GATE -74.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/18/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/18/dyn ON COMP PEAK LOG -34.0 4.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/18/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/18/insert OFF POST OFF"],
      ["/node", "/ch/18/eq ON"],
      ["/node", "/ch/18/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/18/eq/2 PEQ 248.9 -7.00 2.4"],
      ["/node", "/ch/18/eq/3 PEQ 677.7 -5.75 2.8"],
      ["/node", "/ch/18/eq/4 HShv 10k37 -14.5 2.0"],
      ["/node", "/ch/18/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/18/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/18/mix/02 ON   -oo"],
      ["/node", "/ch/18/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/18/mix/04 ON   -oo"],
      ["/node", "/ch/18/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/18/mix/06 ON   -oo"],
      ["/node", "/ch/18/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/18/mix/08 ON   -oo"],
      ["/node", "/ch/18/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/18/mix/10 ON   -oo"],
      ["/node", "/ch/18/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/18/mix/12 ON   -oo"],
      ["/node", "/ch/18/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/18/mix/14 ON -50.0"],
      ["/node", "/ch/18/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/18/mix/16 ON   -oo"],
      ["/node", "/ch/18/grp %00000000 %000000"],
      ["/node", "/ch/18/automix OFF -12.0"],
      ["/node", '/ch/19/config "HH 1" 1 BL 19'],
      ["/node", "/ch/19/delay OFF   0.3"],
      ["/node", "/ch/19/preamp +0.0 OFF ON 24 207"],
      ["/node", "/ch/19/gate ON GATE -72.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/19/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/19/dyn ON COMP PEAK LOG -26.5 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/19/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/19/insert OFF POST OFF"],
      ["/node", "/ch/19/eq ON"],
      ["/node", "/ch/19/eq/1 PEQ 295.8 -11.0 2.8"],
      ["/node", "/ch/19/eq/2 PEQ 677.7 -7.00 1.9"],
      ["/node", "/ch/19/eq/3 PEQ 924.8 -3.00  10"],
      ["/node", "/ch/19/eq/4 HShv 8k14 -15.0 2.0"],
      ["/node", "/ch/19/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/19/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/19/mix/02 ON   -oo"],
      ["/node", "/ch/19/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/19/mix/04 ON   -oo"],
      ["/node", "/ch/19/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/19/mix/06 ON   -oo"],
      ["/node", "/ch/19/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/19/mix/08 ON   -oo"],
      ["/node", "/ch/19/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/19/mix/10 ON   -oo"],
      ["/node", "/ch/19/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/19/mix/12 ON   -oo"],
      ["/node", "/ch/19/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/19/mix/14 ON   -oo"],
      ["/node", "/ch/19/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/19/mix/16 ON   -oo"],
      ["/node", "/ch/19/grp %00000000 %000000"],
      ["/node", "/ch/19/automix OFF -12.0"],
      ["/node", '/ch/20/config "HH 2" 1 BL 20'],
      ["/node", "/ch/20/delay OFF   0.3"],
      ["/node", "/ch/20/preamp +0.0 OFF ON 24 207"],
      ["/node", "/ch/20/gate ON GATE -72.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/20/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/20/dyn ON COMP PEAK LOG -26.5 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/20/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/20/insert OFF POST OFF"],
      ["/node", "/ch/20/eq ON"],
      ["/node", "/ch/20/eq/1 PEQ 295.8 -11.0 2.8"],
      ["/node", "/ch/20/eq/2 PEQ 677.7 -7.00 1.9"],
      ["/node", "/ch/20/eq/3 PEQ 924.8 -3.00  10"],
      ["/node", "/ch/20/eq/4 HShv 8k14 -15.0 2.0"],
      ["/node", "/ch/20/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/20/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/20/mix/02 ON   -oo"],
      ["/node", "/ch/20/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/20/mix/04 ON   -oo"],
      ["/node", "/ch/20/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/20/mix/06 ON   -oo"],
      ["/node", "/ch/20/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/20/mix/08 ON   -oo"],
      ["/node", "/ch/20/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/20/mix/10 ON   -oo"],
      ["/node", "/ch/20/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/20/mix/12 ON   -oo"],
      ["/node", "/ch/20/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/20/mix/14 ON   -oo"],
      ["/node", "/ch/20/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/20/mix/16 ON   -oo"],
      ["/node", "/ch/20/grp %00000000 %000000"],
      ["/node", "/ch/20/automix OFF -12.0"],
      ["/node", '/ch/21/config "HH 3" 1 BL 21'],
      ["/node", "/ch/21/delay OFF   0.3"],
      ["/node", "/ch/21/preamp +0.0 OFF ON 24 207"],
      ["/node", "/ch/21/gate ON GATE -72.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/21/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/21/dyn ON COMP PEAK LOG -26.5 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/21/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/21/insert OFF POST OFF"],
      ["/node", "/ch/21/eq ON"],
      ["/node", "/ch/21/eq/1 PEQ 295.8 -11.0 2.8"],
      ["/node", "/ch/21/eq/2 PEQ 677.7 -7.00 1.9"],
      ["/node", "/ch/21/eq/3 PEQ 924.8 -3.00  10"],
      ["/node", "/ch/21/eq/4 HShv 8k14 -15.0 2.0"],
      ["/node", "/ch/21/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/21/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/21/mix/02 ON   -oo"],
      ["/node", "/ch/21/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/21/mix/04 ON   -oo"],
      ["/node", "/ch/21/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/21/mix/06 ON   -oo"],
      ["/node", "/ch/21/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/21/mix/08 ON   -oo"],
      ["/node", "/ch/21/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/21/mix/10 ON   -oo"],
      ["/node", "/ch/21/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/21/mix/12 ON   -oo"],
      ["/node", "/ch/21/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/21/mix/14 ON   -oo"],
      ["/node", "/ch/21/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/21/mix/16 ON   -oo"],
      ["/node", "/ch/21/grp %00000000 %000000"],
      ["/node", "/ch/21/automix OFF -12.0"],
      ["/node", '/ch/22/config "HH 4" 1 BL 22'],
      ["/node", "/ch/22/delay OFF   0.3"],
      ["/node", "/ch/22/preamp +0.0 OFF ON 24 207"],
      ["/node", "/ch/22/gate ON GATE -72.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/22/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/22/dyn ON COMP PEAK LOG -26.5 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/22/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/22/insert OFF POST OFF"],
      ["/node", "/ch/22/eq ON"],
      ["/node", "/ch/22/eq/1 PEQ 295.8 -11.0 2.8"],
      ["/node", "/ch/22/eq/2 PEQ 677.7 -7.00 1.9"],
      ["/node", "/ch/22/eq/3 PEQ 924.8 -3.00  10"],
      ["/node", "/ch/22/eq/4 HShv 8k14 -15.0 2.0"],
      ["/node", "/ch/22/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/22/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/22/mix/02 ON   -oo"],
      ["/node", "/ch/22/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/22/mix/04 ON   -oo"],
      ["/node", "/ch/22/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/22/mix/06 ON   -oo"],
      ["/node", "/ch/22/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/22/mix/08 ON   -oo"],
      ["/node", "/ch/22/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/22/mix/10 ON   -oo"],
      ["/node", "/ch/22/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/22/mix/12 ON   -oo"],
      ["/node", "/ch/22/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/22/mix/14 ON   -oo"],
      ["/node", "/ch/22/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/22/mix/16 ON   -oo"],
      ["/node", "/ch/22/grp %00000000 %000000"],
      ["/node", "/ch/22/automix OFF -12.0"],
      ["/node", '/ch/23/config "HH X" 1 BL 23'],
      ["/node", "/ch/23/delay OFF   0.3"],
      ["/node", "/ch/23/preamp +0.0 OFF ON 24 207"],
      ["/node", "/ch/23/gate ON GATE -72.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/23/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/23/dyn ON COMP PEAK LOG -26.5 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/23/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/23/insert OFF POST OFF"],
      ["/node", "/ch/23/eq ON"],
      ["/node", "/ch/23/eq/1 PEQ 295.8 -11.0 2.8"],
      ["/node", "/ch/23/eq/2 PEQ 677.7 -7.00 1.9"],
      ["/node", "/ch/23/eq/3 PEQ 924.8 -3.00  10"],
      ["/node", "/ch/23/eq/4 HShv 8k14 -15.0 2.0"],
      ["/node", "/ch/23/mix OFF   -oo OFF +0 OFF   -oo"],
      ["/node", "/ch/23/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/23/mix/02 ON   -oo"],
      ["/node", "/ch/23/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/23/mix/04 ON   -oo"],
      ["/node", "/ch/23/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/23/mix/06 ON   -oo"],
      ["/node", "/ch/23/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/23/mix/08 ON   -oo"],
      ["/node", "/ch/23/mix/09 ON   0.0 +0 POST 0"],
      ["/node", "/ch/23/mix/10 ON   -oo"],
      ["/node", "/ch/23/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/23/mix/12 ON   -oo"],
      ["/node", "/ch/23/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/23/mix/14 ON   -oo"],
      ["/node", "/ch/23/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/23/mix/16 ON   -oo"],
      ["/node", "/ch/23/grp %00000000 %000000"],
      ["/node", "/ch/23/automix OFF -12.0"],
      ["/node", '/ch/24/config "" 1 OFF 24'],
      ["/node", "/ch/24/delay OFF   0.3"],
      ["/node", "/ch/24/preamp +0.0 OFF ON 24  20"],
      ["/node", "/ch/24/gate OFF GATE -80.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/24/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/24/dyn OFF COMP PEAK LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/24/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/24/insert OFF POST OFF"],
      ["/node", "/ch/24/eq ON"],
      ["/node", "/ch/24/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/24/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/ch/24/eq/3 PEQ 1k97 +0.00 1.9"],
      ["/node", "/ch/24/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/ch/24/mix OFF   -oo ON +0 OFF   -oo"],
      ["/node", "/ch/24/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/24/mix/02 ON   -oo"],
      ["/node", "/ch/24/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/24/mix/04 ON   -oo"],
      ["/node", "/ch/24/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/24/mix/06 ON   -oo"],
      ["/node", "/ch/24/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/24/mix/08 ON   -oo"],
      ["/node", "/ch/24/mix/09 ON   -oo +0 POST 0"],
      ["/node", "/ch/24/mix/10 ON   -oo"],
      ["/node", "/ch/24/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/24/mix/12 ON   -oo"],
      ["/node", "/ch/24/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/24/mix/14 ON   -oo"],
      ["/node", "/ch/24/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/24/mix/16 ON   -oo"],
      ["/node", "/ch/24/grp %00000000 %000000"],
      ["/node", "/ch/24/automix OFF -12.0"],
      ["/node", '/ch/25/config "KEYS" 1 MG 25'],
      ["/node", "/ch/25/delay OFF   0.3"],
      ["/node", "/ch/25/preamp +0.0 OFF ON 24  20"],
      ["/node", "/ch/25/gate OFF GATE -80.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/25/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/25/dyn OFF COMP PEAK LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/25/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/25/insert OFF POST OFF"],
      ["/node", "/ch/25/eq ON"],
      ["/node", "/ch/25/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/25/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/ch/25/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/ch/25/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/ch/25/mix OFF   -oo ON +0 OFF   -oo"],
      ["/node", "/ch/25/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/25/mix/02 ON   -oo"],
      ["/node", "/ch/25/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/25/mix/04 ON   -oo"],
      ["/node", "/ch/25/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/25/mix/06 ON   -oo"],
      ["/node", "/ch/25/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/25/mix/08 ON   -oo"],
      ["/node", "/ch/25/mix/09 ON   -oo +0 POST 0"],
      ["/node", "/ch/25/mix/10 ON   -oo"],
      ["/node", "/ch/25/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/25/mix/12 ON   -oo"],
      ["/node", "/ch/25/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/25/mix/14 ON   -oo"],
      ["/node", "/ch/25/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/25/mix/16 ON   -oo"],
      ["/node", "/ch/25/grp %00000000 %000000"],
      ["/node", "/ch/25/automix OFF -12.0"],
      ["/node", '/ch/26/config "D PAD" 1 MG 26'],
      ["/node", "/ch/26/delay OFF   0.3"],
      ["/node", "/ch/26/preamp +0.0 OFF ON 24  20"],
      ["/node", "/ch/26/gate OFF GATE -80.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/26/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/26/dyn OFF COMP PEAK LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/26/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/26/insert OFF POST OFF"],
      ["/node", "/ch/26/eq ON"],
      ["/node", "/ch/26/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/26/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/ch/26/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/ch/26/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/ch/26/mix OFF -82.0 ON +0 OFF   -oo"],
      ["/node", "/ch/26/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/26/mix/02 ON   -oo"],
      ["/node", "/ch/26/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/26/mix/04 ON   -oo"],
      ["/node", "/ch/26/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/26/mix/06 ON   -oo"],
      ["/node", "/ch/26/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/26/mix/08 ON   -oo"],
      ["/node", "/ch/26/mix/09 ON   -oo +0 POST 0"],
      ["/node", "/ch/26/mix/10 ON   -oo"],
      ["/node", "/ch/26/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/26/mix/12 ON   -oo"],
      ["/node", "/ch/26/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/26/mix/14 ON   -oo"],
      ["/node", "/ch/26/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/26/mix/16 ON   -oo"],
      ["/node", "/ch/26/grp %00000000 %000000"],
      ["/node", "/ch/26/automix OFF -12.0"],
      ["/node", '/ch/27/config "D CAT" 1 MG 27'],
      ["/node", "/ch/27/delay OFF   0.3"],
      ["/node", "/ch/27/preamp +0.0 OFF ON 24  20"],
      ["/node", "/ch/27/gate OFF GATE -80.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/27/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/27/dyn OFF COMP PEAK LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/27/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/27/insert OFF POST OFF"],
      ["/node", "/ch/27/eq ON"],
      ["/node", "/ch/27/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/27/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/ch/27/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/ch/27/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/ch/27/mix OFF -83.4 ON +0 OFF   -oo"],
      ["/node", "/ch/27/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/27/mix/02 ON   -oo"],
      ["/node", "/ch/27/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/27/mix/04 ON   -oo"],
      ["/node", "/ch/27/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/27/mix/06 ON   -oo"],
      ["/node", "/ch/27/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/27/mix/08 ON   -oo"],
      ["/node", "/ch/27/mix/09 ON   -oo +0 POST 0"],
      ["/node", "/ch/27/mix/10 ON   -oo"],
      ["/node", "/ch/27/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/27/mix/12 ON   -oo"],
      ["/node", "/ch/27/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/27/mix/14 ON   -oo"],
      ["/node", "/ch/27/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/27/mix/16 ON   -oo"],
      ["/node", "/ch/27/grp %00000000 %000000"],
      ["/node", "/ch/27/automix OFF -12.0"],
      ["/node", '/ch/28/config "GTR A" 1 GN 28'],
      ["/node", "/ch/28/delay OFF   0.3"],
      ["/node", "/ch/28/preamp +0.0 OFF ON 24  20"],
      ["/node", "/ch/28/gate OFF GATE -80.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/28/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/28/dyn OFF COMP PEAK LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/28/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/28/insert OFF POST OFF"],
      ["/node", "/ch/28/eq ON"],
      ["/node", "/ch/28/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/28/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/ch/28/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/ch/28/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/ch/28/mix OFF -84.4 ON +0 OFF   -oo"],
      ["/node", "/ch/28/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/28/mix/02 ON   -oo"],
      ["/node", "/ch/28/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/28/mix/04 ON   -oo"],
      ["/node", "/ch/28/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/28/mix/06 ON   -oo"],
      ["/node", "/ch/28/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/28/mix/08 ON   -oo"],
      ["/node", "/ch/28/mix/09 ON   -oo +0 POST 0"],
      ["/node", "/ch/28/mix/10 ON   -oo"],
      ["/node", "/ch/28/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/28/mix/12 ON   -oo"],
      ["/node", "/ch/28/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/28/mix/14 ON   -oo"],
      ["/node", "/ch/28/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/28/mix/16 ON   -oo"],
      ["/node", "/ch/28/grp %00000000 %000000"],
      ["/node", "/ch/28/automix OFF -12.0"],
      ["/node", '/ch/29/config "GTR E" 1 GN 29'],
      ["/node", "/ch/29/delay OFF   0.3"],
      ["/node", "/ch/29/preamp +0.0 OFF ON 24  20"],
      ["/node", "/ch/29/gate OFF GATE -80.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/29/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/29/dyn OFF COMP PEAK LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/29/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/29/insert OFF POST OFF"],
      ["/node", "/ch/29/eq ON"],
      ["/node", "/ch/29/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/29/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/ch/29/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/ch/29/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/ch/29/mix OFF -89.5 ON +0 OFF   -oo"],
      ["/node", "/ch/29/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/29/mix/02 ON   -oo"],
      ["/node", "/ch/29/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/29/mix/04 ON   -oo"],
      ["/node", "/ch/29/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/29/mix/06 ON   -oo"],
      ["/node", "/ch/29/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/29/mix/08 ON   -oo"],
      ["/node", "/ch/29/mix/09 ON   -oo +0 POST 0"],
      ["/node", "/ch/29/mix/10 ON   -oo"],
      ["/node", "/ch/29/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/29/mix/12 ON   -oo"],
      ["/node", "/ch/29/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/29/mix/14 ON   -oo"],
      ["/node", "/ch/29/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/29/mix/16 ON   -oo"],
      ["/node", "/ch/29/grp %00000000 %000000"],
      ["/node", "/ch/29/automix OFF -12.0"],
      ["/node", '/ch/30/config "S16 6" 1 OFF 30'],
      ["/node", "/ch/30/delay OFF   0.3"],
      ["/node", "/ch/30/preamp +0.0 OFF ON 24  20"],
      ["/node", "/ch/30/gate OFF GATE -80.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/30/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/30/dyn OFF COMP PEAK LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/30/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/30/insert OFF POST OFF"],
      ["/node", "/ch/30/eq ON"],
      ["/node", "/ch/30/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/30/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/ch/30/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/ch/30/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/ch/30/mix OFF   -oo ON +0 OFF   -oo"],
      ["/node", "/ch/30/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/30/mix/02 ON   -oo"],
      ["/node", "/ch/30/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/30/mix/04 ON   -oo"],
      ["/node", "/ch/30/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/30/mix/06 ON   -oo"],
      ["/node", "/ch/30/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/30/mix/08 ON   -oo"],
      ["/node", "/ch/30/mix/09 ON   -oo +0 POST 0"],
      ["/node", "/ch/30/mix/10 ON   -oo"],
      ["/node", "/ch/30/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/30/mix/12 ON   -oo"],
      ["/node", "/ch/30/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/30/mix/14 ON   -oo"],
      ["/node", "/ch/30/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/30/mix/16 ON   -oo"],
      ["/node", "/ch/30/grp %00000000 %000000"],
      ["/node", "/ch/30/automix OFF -12.0"],
      ["/node", '/ch/31/config "S16 7" 1 OFF 31'],
      ["/node", "/ch/31/delay OFF   0.3"],
      ["/node", "/ch/31/preamp +0.0 OFF ON 24  20"],
      ["/node", "/ch/31/gate OFF GATE -80.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/31/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/31/dyn OFF COMP PEAK LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/31/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/31/insert OFF POST OFF"],
      ["/node", "/ch/31/eq ON"],
      ["/node", "/ch/31/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/31/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/ch/31/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/ch/31/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/ch/31/mix OFF   -oo ON +0 OFF   -oo"],
      ["/node", "/ch/31/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/31/mix/02 ON   -oo"],
      ["/node", "/ch/31/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/31/mix/04 ON   -oo"],
      ["/node", "/ch/31/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/31/mix/06 ON   -oo"],
      ["/node", "/ch/31/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/31/mix/08 ON   -oo"],
      ["/node", "/ch/31/mix/09 ON   -oo +0 POST 0"],
      ["/node", "/ch/31/mix/10 ON   -oo"],
      ["/node", "/ch/31/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/31/mix/12 ON   -oo"],
      ["/node", "/ch/31/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/31/mix/14 ON   -oo"],
      ["/node", "/ch/31/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/31/mix/16 ON   -oo"],
      ["/node", "/ch/31/grp %00000000 %000000"],
      ["/node", "/ch/31/automix OFF -12.0"],
      ["/node", '/ch/32/config "OS MIC" 1 WH 32'],
      ["/node", "/ch/32/delay OFF   0.3"],
      ["/node", "/ch/32/preamp +0.0 OFF ON 24  20"],
      ["/node", "/ch/32/gate OFF GATE -80.0 60.0 10 50.2  258 0"],
      ["/node", "/ch/32/gate/filter OFF 3.0 990.9"],
      ["/node", "/ch/32/dyn OFF COMP PEAK LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/ch/32/dyn/filter OFF 3.0 990.9"],
      ["/node", "/ch/32/insert OFF POST OFF"],
      ["/node", "/ch/32/eq ON"],
      ["/node", "/ch/32/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/ch/32/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/ch/32/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/ch/32/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/ch/32/mix OFF   -oo ON +0 OFF   -oo"],
      ["/node", "/ch/32/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/32/mix/02 ON   -oo"],
      ["/node", "/ch/32/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/32/mix/04 ON   -oo"],
      ["/node", "/ch/32/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/32/mix/06 ON   -oo"],
      ["/node", "/ch/32/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/ch/32/mix/08 ON   -oo"],
      ["/node", "/ch/32/mix/09 ON   -oo +0 POST 0"],
      ["/node", "/ch/32/mix/10 ON   -oo"],
      ["/node", "/ch/32/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/ch/32/mix/12 ON   -oo"],
      ["/node", "/ch/32/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/ch/32/mix/14 ON   -oo"],
      ["/node", "/ch/32/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/ch/32/mix/16 ON   -oo"],
      ["/node", "/ch/32/grp %00000000 %000000"],
      ["/node", "/ch/32/automix OFF -12.0"],
      ["/node", '/auxin/01/config "Q Main-L" 1 RD 33'],
      ["/node", "/auxin/01/preamp -18.0 OFF"],
      ["/node", "/auxin/01/eq ON"],
      ["/node", "/auxin/01/eq/1 PEQ 124.7 +0.00 1.9"],
      ["/node", "/auxin/01/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/auxin/01/eq/3 PEQ 2k19 +4.00 2.0"],
      ["/node", "/auxin/01/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/auxin/01/mix ON   0.0 ON -100 OFF   -oo"],
      ["/node", "/auxin/01/mix/01 ON   -oo -100 EQ-> 0"],
      ["/node", "/auxin/01/mix/02 ON   -oo"],
      ["/node", "/auxin/01/mix/03 ON   -oo -100 EQ-> 0"],
      ["/node", "/auxin/01/mix/04 ON   -oo"],
      ["/node", "/auxin/01/mix/05 ON   -oo -100 EQ-> 0"],
      ["/node", "/auxin/01/mix/06 ON   -oo"],
      ["/node", "/auxin/01/mix/07 ON   -oo -100 EQ-> 0"],
      ["/node", "/auxin/01/mix/08 ON   -oo"],
      ["/node", "/auxin/01/mix/09 ON   -oo -100 POST 0"],
      ["/node", "/auxin/01/mix/10 ON   -oo"],
      ["/node", "/auxin/01/mix/11 ON   -oo -100 POST 0"],
      ["/node", "/auxin/01/mix/12 ON   -oo"],
      ["/node", "/auxin/01/mix/13 ON   -oo -100 POST 0"],
      ["/node", "/auxin/01/mix/14 ON   -oo"],
      ["/node", "/auxin/01/mix/15 ON   -oo -100 POST 0"],
      ["/node", "/auxin/01/mix/16 ON   -oo"],
      ["/node", "/auxin/01/grp %00000000 %000000"],
      ["/node", '/auxin/02/config "Q Main-R" 1 RD 34'],
      ["/node", "/auxin/02/preamp -18.0 OFF"],
      ["/node", "/auxin/02/eq ON"],
      ["/node", "/auxin/02/eq/1 PEQ 124.7 +0.00 1.9"],
      ["/node", "/auxin/02/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/auxin/02/eq/3 PEQ 2k19 +4.00 2.0"],
      ["/node", "/auxin/02/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/auxin/02/mix ON   0.0 ON +100 OFF   -oo"],
      ["/node", "/auxin/02/mix/01 ON   -oo +100 EQ-> 0"],
      ["/node", "/auxin/02/mix/02 ON   -oo"],
      ["/node", "/auxin/02/mix/03 ON   -oo +100 EQ-> 0"],
      ["/node", "/auxin/02/mix/04 ON   -oo"],
      ["/node", "/auxin/02/mix/05 ON   -oo +100 EQ-> 0"],
      ["/node", "/auxin/02/mix/06 ON   -oo"],
      ["/node", "/auxin/02/mix/07 ON   -oo +100 EQ-> 0"],
      ["/node", "/auxin/02/mix/08 ON   -oo"],
      ["/node", "/auxin/02/mix/09 ON   -oo +100 POST 0"],
      ["/node", "/auxin/02/mix/10 ON   -oo"],
      ["/node", "/auxin/02/mix/11 ON   -oo +100 POST 0"],
      ["/node", "/auxin/02/mix/12 ON   -oo"],
      ["/node", "/auxin/02/mix/13 ON   -oo +100 POST 0"],
      ["/node", "/auxin/02/mix/14 ON   -oo"],
      ["/node", "/auxin/02/mix/15 ON   -oo +100 POST 0"],
      ["/node", "/auxin/02/mix/16 ON   -oo"],
      ["/node", "/auxin/02/grp %00000000 %000000"],
      ["/node", '/auxin/03/config "Q Monitor" 1 RD 35'],
      ["/node", "/auxin/03/preamp -18.0 OFF"],
      ["/node", "/auxin/03/eq OFF"],
      ["/node", "/auxin/03/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/auxin/03/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/auxin/03/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/auxin/03/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/auxin/03/mix ON   0.0 OFF +0 OFF   -oo"],
      ["/node", "/auxin/03/mix/01 ON   0.0 +0 EQ-> 0"],
      ["/node", "/auxin/03/mix/02 ON   -oo"],
      ["/node", "/auxin/03/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/auxin/03/mix/04 ON   -oo"],
      ["/node", "/auxin/03/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/auxin/03/mix/06 ON   -oo"],
      ["/node", "/auxin/03/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/auxin/03/mix/08 ON   -oo"],
      ["/node", "/auxin/03/mix/09 ON   -oo +0 POST 0"],
      ["/node", "/auxin/03/mix/10 ON   -oo"],
      ["/node", "/auxin/03/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/auxin/03/mix/12 ON   -oo"],
      ["/node", "/auxin/03/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/auxin/03/mix/14 ON   -oo"],
      ["/node", "/auxin/03/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/auxin/03/mix/16 ON   -oo"],
      ["/node", "/auxin/03/grp %00000000 %000000"],
      ["/node", '/auxin/04/config "Q Sub" 1 RD 36'],
      ["/node", "/auxin/04/preamp -18.0 OFF"],
      ["/node", "/auxin/04/eq OFF"],
      ["/node", "/auxin/04/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/auxin/04/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/auxin/04/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/auxin/04/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/auxin/04/mix ON   0.0 OFF +0 OFF   -oo"],
      ["/node", "/auxin/04/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/auxin/04/mix/02 ON   -oo"],
      ["/node", "/auxin/04/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/auxin/04/mix/04 ON   -oo"],
      ["/node", "/auxin/04/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/auxin/04/mix/06 ON   -oo"],
      ["/node", "/auxin/04/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/auxin/04/mix/08 ON   -oo"],
      ["/node", "/auxin/04/mix/09 ON   -oo +0 POST 0"],
      ["/node", "/auxin/04/mix/10 ON   -oo"],
      ["/node", "/auxin/04/mix/11 ON  +1.3 +0 POST 0"],
      ["/node", "/auxin/04/mix/12 ON  +1.3"],
      ["/node", "/auxin/04/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/auxin/04/mix/14 ON   -oo"],
      ["/node", "/auxin/04/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/auxin/04/mix/16 ON   -oo"],
      ["/node", "/auxin/04/grp %00000000 %000000"],
      ["/node", '/auxin/05/config "Q Sur-L" 1 RD 37'],
      ["/node", "/auxin/05/preamp -18.0 OFF"],
      ["/node", "/auxin/05/eq ON"],
      ["/node", "/auxin/05/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/auxin/05/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/auxin/05/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/auxin/05/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/auxin/05/mix ON   0.0 OFF +0 OFF   -oo"],
      ["/node", "/auxin/05/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/auxin/05/mix/02 ON   -oo"],
      ["/node", "/auxin/05/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/auxin/05/mix/04 ON   -oo"],
      ["/node", "/auxin/05/mix/05 ON   0.0 +0 EQ-> 0"],
      ["/node", "/auxin/05/mix/06 ON   -oo"],
      ["/node", "/auxin/05/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/auxin/05/mix/08 ON -87.0"],
      ["/node", "/auxin/05/mix/09 ON   -oo +0 POST 0"],
      ["/node", "/auxin/05/mix/10 ON   -oo"],
      ["/node", "/auxin/05/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/auxin/05/mix/12 ON   -oo"],
      ["/node", "/auxin/05/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/auxin/05/mix/14 ON   -oo"],
      ["/node", "/auxin/05/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/auxin/05/mix/16 ON   -oo"],
      ["/node", "/auxin/05/grp %00000000 %000000"],
      ["/node", '/auxin/06/config "Q Sur-R" 1 RD 38'],
      ["/node", "/auxin/06/preamp -18.0 OFF"],
      ["/node", "/auxin/06/eq ON"],
      ["/node", "/auxin/06/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/auxin/06/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/auxin/06/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/auxin/06/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/auxin/06/mix ON   0.0 OFF +0 OFF   -oo"],
      ["/node", "/auxin/06/mix/01 ON   -oo +0 EQ-> 0"],
      ["/node", "/auxin/06/mix/02 ON   -oo"],
      ["/node", "/auxin/06/mix/03 ON   -oo +0 EQ-> 0"],
      ["/node", "/auxin/06/mix/04 ON   -oo"],
      ["/node", "/auxin/06/mix/05 ON   -oo +0 EQ-> 0"],
      ["/node", "/auxin/06/mix/06 ON   0.0"],
      ["/node", "/auxin/06/mix/07 ON   -oo +0 EQ-> 0"],
      ["/node", "/auxin/06/mix/08 ON -87.0"],
      ["/node", "/auxin/06/mix/09 ON   -oo +0 POST 0"],
      ["/node", "/auxin/06/mix/10 ON   -oo"],
      ["/node", "/auxin/06/mix/11 ON   -oo +0 POST 0"],
      ["/node", "/auxin/06/mix/12 ON   -oo"],
      ["/node", "/auxin/06/mix/13 ON   -oo +0 POST 0"],
      ["/node", "/auxin/06/mix/14 ON   -oo"],
      ["/node", "/auxin/06/mix/15 ON   -oo +0 POST 0"],
      ["/node", "/auxin/06/mix/16 ON   -oo"],
      ["/node", "/auxin/06/grp %00000000 %000000"],
      ["/node", '/auxin/07/config "MuzacL" 60 CY 33'],
      ["/node", "/auxin/07/preamp -18.0 OFF"],
      ["/node", "/auxin/07/eq OFF"],
      ["/node", "/auxin/07/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/auxin/07/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/auxin/07/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/auxin/07/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/auxin/07/mix OFF   0.0 ON -100 OFF   -oo"],
      ["/node", "/auxin/07/mix/01 ON   -oo -100 EQ-> 0"],
      ["/node", "/auxin/07/mix/02 ON   -oo"],
      ["/node", "/auxin/07/mix/03 ON   -oo -100 EQ-> 0"],
      ["/node", "/auxin/07/mix/04 ON   -oo"],
      ["/node", "/auxin/07/mix/05 ON  -8.0 -100 EQ-> 0"],
      ["/node", "/auxin/07/mix/06 ON  -8.0"],
      ["/node", "/auxin/07/mix/07 ON   -oo -100 EQ-> 0"],
      ["/node", "/auxin/07/mix/08 ON   -oo"],
      ["/node", "/auxin/07/mix/09 ON   -oo -100 POST 0"],
      ["/node", "/auxin/07/mix/10 ON   -oo"],
      ["/node", "/auxin/07/mix/11 ON   0.0 -100 POST 0"],
      ["/node", "/auxin/07/mix/12 ON   0.0"],
      ["/node", "/auxin/07/mix/13 ON   -oo -100 POST 0"],
      ["/node", "/auxin/07/mix/14 ON   -oo"],
      ["/node", "/auxin/07/mix/15 ON   -oo -100 POST 0"],
      ["/node", "/auxin/07/mix/16 ON   -oo"],
      ["/node", "/auxin/07/grp %00000000 %000000"],
      ["/node", '/auxin/08/config "MuazcR" 60 CY 34'],
      ["/node", "/auxin/08/preamp -18.0 OFF"],
      ["/node", "/auxin/08/eq OFF"],
      ["/node", "/auxin/08/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/auxin/08/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/auxin/08/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/auxin/08/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/auxin/08/mix OFF   0.0 ON +100 OFF   -oo"],
      ["/node", "/auxin/08/mix/01 ON   -oo +100 EQ-> 0"],
      ["/node", "/auxin/08/mix/02 ON   -oo"],
      ["/node", "/auxin/08/mix/03 ON   -oo +100 EQ-> 0"],
      ["/node", "/auxin/08/mix/04 ON   -oo"],
      ["/node", "/auxin/08/mix/05 ON  -8.0 +100 EQ-> 0"],
      ["/node", "/auxin/08/mix/06 ON  -8.0"],
      ["/node", "/auxin/08/mix/07 ON   -oo +100 EQ-> 0"],
      ["/node", "/auxin/08/mix/08 ON   -oo"],
      ["/node", "/auxin/08/mix/09 ON   -oo +100 POST 0"],
      ["/node", "/auxin/08/mix/10 ON   -oo"],
      ["/node", "/auxin/08/mix/11 ON   0.0 +100 POST 0"],
      ["/node", "/auxin/08/mix/12 ON   0.0"],
      ["/node", "/auxin/08/mix/13 ON   -oo +100 POST 0"],
      ["/node", "/auxin/08/mix/14 ON   -oo"],
      ["/node", "/auxin/08/mix/15 ON   -oo +100 POST 0"],
      ["/node", "/auxin/08/mix/16 ON   -oo"],
      ["/node", "/auxin/08/grp %00000000 %000000"],
      ["/node", '/fxrtn/01/config "" 61 MG'],
      ["/node", "/fxrtn/01/eq OFF"],
      ["/node", "/fxrtn/01/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/fxrtn/01/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/fxrtn/01/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/fxrtn/01/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/fxrtn/01/mix ON   0.0 ON -100 OFF   -oo"],
      ["/node", "/fxrtn/01/mix/01 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/01/mix/02 ON   -oo"],
      ["/node", "/fxrtn/01/mix/03 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/01/mix/04 ON   -oo"],
      ["/node", "/fxrtn/01/mix/05 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/01/mix/06 ON   -oo"],
      ["/node", "/fxrtn/01/mix/07 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/01/mix/08 ON   -oo"],
      ["/node", "/fxrtn/01/mix/09 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/01/mix/10 ON   -oo"],
      ["/node", "/fxrtn/01/mix/11 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/01/mix/12 ON   -oo"],
      ["/node", "/fxrtn/01/mix/13 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/01/mix/14 ON   -oo"],
      ["/node", "/fxrtn/01/mix/15 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/01/mix/16 ON   -oo"],
      ["/node", "/fxrtn/01/grp %00000000 %000000"],
      ["/node", '/fxrtn/02/config "" 61 MG'],
      ["/node", "/fxrtn/02/eq OFF"],
      ["/node", "/fxrtn/02/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/fxrtn/02/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/fxrtn/02/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/fxrtn/02/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/fxrtn/02/mix ON   0.0 ON +100 OFF   -oo"],
      ["/node", "/fxrtn/02/mix/01 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/02/mix/02 ON   -oo"],
      ["/node", "/fxrtn/02/mix/03 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/02/mix/04 ON   -oo"],
      ["/node", "/fxrtn/02/mix/05 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/02/mix/06 ON   -oo"],
      ["/node", "/fxrtn/02/mix/07 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/02/mix/08 ON   -oo"],
      ["/node", "/fxrtn/02/mix/09 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/02/mix/10 ON   -oo"],
      ["/node", "/fxrtn/02/mix/11 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/02/mix/12 ON   -oo"],
      ["/node", "/fxrtn/02/mix/13 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/02/mix/14 ON   -oo"],
      ["/node", "/fxrtn/02/mix/15 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/02/mix/16 ON   -oo"],
      ["/node", "/fxrtn/02/grp %00000000 %000000"],
      ["/node", '/fxrtn/03/config "" 61 MG'],
      ["/node", "/fxrtn/03/eq OFF"],
      ["/node", "/fxrtn/03/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/fxrtn/03/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/fxrtn/03/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/fxrtn/03/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/fxrtn/03/mix ON   0.0 ON -100 OFF   -oo"],
      ["/node", "/fxrtn/03/mix/01 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/03/mix/02 ON   -oo"],
      ["/node", "/fxrtn/03/mix/03 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/03/mix/04 ON   -oo"],
      ["/node", "/fxrtn/03/mix/05 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/03/mix/06 ON   -oo"],
      ["/node", "/fxrtn/03/mix/07 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/03/mix/08 ON   -oo"],
      ["/node", "/fxrtn/03/mix/09 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/03/mix/10 ON   -oo"],
      ["/node", "/fxrtn/03/mix/11 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/03/mix/12 ON   -oo"],
      ["/node", "/fxrtn/03/mix/13 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/03/mix/14 ON   -oo"],
      ["/node", "/fxrtn/03/mix/15 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/03/mix/16 ON   -oo"],
      ["/node", "/fxrtn/03/grp %00000000 %000000"],
      ["/node", '/fxrtn/04/config "" 61 MG'],
      ["/node", "/fxrtn/04/eq OFF"],
      ["/node", "/fxrtn/04/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/fxrtn/04/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/fxrtn/04/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/fxrtn/04/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/fxrtn/04/mix ON   0.0 ON +100 OFF   -oo"],
      ["/node", "/fxrtn/04/mix/01 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/04/mix/02 ON   -oo"],
      ["/node", "/fxrtn/04/mix/03 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/04/mix/04 ON   -oo"],
      ["/node", "/fxrtn/04/mix/05 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/04/mix/06 ON   -oo"],
      ["/node", "/fxrtn/04/mix/07 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/04/mix/08 ON   -oo"],
      ["/node", "/fxrtn/04/mix/09 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/04/mix/10 ON   -oo"],
      ["/node", "/fxrtn/04/mix/11 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/04/mix/12 ON   -oo"],
      ["/node", "/fxrtn/04/mix/13 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/04/mix/14 ON   -oo"],
      ["/node", "/fxrtn/04/mix/15 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/04/mix/16 ON   -oo"],
      ["/node", "/fxrtn/04/grp %00000000 %000000"],
      ["/node", '/fxrtn/05/config "" 61 MG'],
      ["/node", "/fxrtn/05/eq OFF"],
      ["/node", "/fxrtn/05/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/fxrtn/05/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/fxrtn/05/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/fxrtn/05/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/fxrtn/05/mix ON   0.0 ON -100 OFF   -oo"],
      ["/node", "/fxrtn/05/mix/01 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/05/mix/02 ON   -oo"],
      ["/node", "/fxrtn/05/mix/03 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/05/mix/04 ON   -oo"],
      ["/node", "/fxrtn/05/mix/05 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/05/mix/06 ON   -oo"],
      ["/node", "/fxrtn/05/mix/07 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/05/mix/08 ON   -oo"],
      ["/node", "/fxrtn/05/mix/09 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/05/mix/10 ON   -oo"],
      ["/node", "/fxrtn/05/mix/11 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/05/mix/12 ON   -oo"],
      ["/node", "/fxrtn/05/mix/13 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/05/mix/14 ON   -oo"],
      ["/node", "/fxrtn/05/mix/15 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/05/mix/16 ON   -oo"],
      ["/node", "/fxrtn/05/grp %00000000 %000000"],
      ["/node", '/fxrtn/06/config "" 61 MG'],
      ["/node", "/fxrtn/06/eq OFF"],
      ["/node", "/fxrtn/06/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/fxrtn/06/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/fxrtn/06/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/fxrtn/06/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/fxrtn/06/mix ON   0.0 ON +100 OFF   -oo"],
      ["/node", "/fxrtn/06/mix/01 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/06/mix/02 ON   -oo"],
      ["/node", "/fxrtn/06/mix/03 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/06/mix/04 ON   -oo"],
      ["/node", "/fxrtn/06/mix/05 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/06/mix/06 ON   -oo"],
      ["/node", "/fxrtn/06/mix/07 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/06/mix/08 ON   -oo"],
      ["/node", "/fxrtn/06/mix/09 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/06/mix/10 ON   -oo"],
      ["/node", "/fxrtn/06/mix/11 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/06/mix/12 ON   -oo"],
      ["/node", "/fxrtn/06/mix/13 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/06/mix/14 ON   -oo"],
      ["/node", "/fxrtn/06/mix/15 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/06/mix/16 ON   -oo"],
      ["/node", "/fxrtn/06/grp %00000000 %000000"],
      ["/node", '/fxrtn/07/config "" 61 MG'],
      ["/node", "/fxrtn/07/eq OFF"],
      ["/node", "/fxrtn/07/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/fxrtn/07/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/fxrtn/07/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/fxrtn/07/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/fxrtn/07/mix ON   0.0 ON -100 OFF   -oo"],
      ["/node", "/fxrtn/07/mix/01 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/07/mix/02 ON   -oo"],
      ["/node", "/fxrtn/07/mix/03 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/07/mix/04 ON   -oo"],
      ["/node", "/fxrtn/07/mix/05 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/07/mix/06 ON   -oo"],
      ["/node", "/fxrtn/07/mix/07 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/07/mix/08 ON   -oo"],
      ["/node", "/fxrtn/07/mix/09 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/07/mix/10 ON   -oo"],
      ["/node", "/fxrtn/07/mix/11 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/07/mix/12 ON   -oo"],
      ["/node", "/fxrtn/07/mix/13 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/07/mix/14 ON   -oo"],
      ["/node", "/fxrtn/07/mix/15 ON   -oo -100 POST 0"],
      ["/node", "/fxrtn/07/mix/16 ON   -oo"],
      ["/node", "/fxrtn/07/grp %00000000 %000000"],
      ["/node", '/fxrtn/08/config "" 61 MG'],
      ["/node", "/fxrtn/08/eq OFF"],
      ["/node", "/fxrtn/08/eq/1 PEQ 124.7 +0.00 2.0"],
      ["/node", "/fxrtn/08/eq/2 PEQ 496.6 +0.00 2.0"],
      ["/node", "/fxrtn/08/eq/3 PEQ 1k97 +0.00 2.0"],
      ["/node", "/fxrtn/08/eq/4 HShv 10k02 +0.00 2.0"],
      ["/node", "/fxrtn/08/mix ON   0.0 ON +100 OFF   -oo"],
      ["/node", "/fxrtn/08/mix/01 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/08/mix/02 ON   -oo"],
      ["/node", "/fxrtn/08/mix/03 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/08/mix/04 ON   -oo"],
      ["/node", "/fxrtn/08/mix/05 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/08/mix/06 ON   -oo"],
      ["/node", "/fxrtn/08/mix/07 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/08/mix/08 ON   -oo"],
      ["/node", "/fxrtn/08/mix/09 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/08/mix/10 ON   -oo"],
      ["/node", "/fxrtn/08/mix/11 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/08/mix/12 ON   -oo"],
      ["/node", "/fxrtn/08/mix/13 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/08/mix/14 ON   -oo"],
      ["/node", "/fxrtn/08/mix/15 ON   -oo +100 POST 0"],
      ["/node", "/fxrtn/08/mix/16 ON   -oo"],
      ["/node", "/fxrtn/08/grp %00000000 %000000"],
      ["/node", '/bus/01/config "StgMon" 63 YEi'],
      ["/node", "/bus/01/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/bus/01/dyn/filter OFF 3.0 990.9"],
      ["/node", "/bus/01/insert OFF PRE FX7L"],
      ["/node", "/bus/01/eq OFF"],
      ["/node", "/bus/01/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/bus/01/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/bus/01/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/bus/01/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/bus/01/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/bus/01/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/bus/01/mix ON -11.0 OFF +0 OFF   -oo"],
      ["/node", "/bus/01/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/bus/01/mix/02 ON   -oo"],
      ["/node", "/bus/01/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/bus/01/mix/04 ON   -oo"],
      ["/node", "/bus/01/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/bus/01/mix/06 ON   -oo"],
      ["/node", "/bus/01/grp %00000000 %000000"],
      ["/node", '/bus/02/config "MixBus 2" 71 OFFi'],
      ["/node", "/bus/02/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/bus/02/dyn/filter OFF 3.0 990.9"],
      ["/node", "/bus/02/insert OFF PRE OFF"],
      ["/node", "/bus/02/eq OFF"],
      ["/node", "/bus/02/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/bus/02/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/bus/02/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/bus/02/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/bus/02/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/bus/02/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/bus/02/mix ON   -oo OFF +0 OFF   -oo"],
      ["/node", "/bus/02/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/bus/02/mix/02 ON   -oo"],
      ["/node", "/bus/02/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/bus/02/mix/04 ON   -oo"],
      ["/node", "/bus/02/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/bus/02/mix/06 ON   -oo"],
      ["/node", "/bus/02/grp %00000000 %000000"],
      ["/node", '/bus/03/config "MixBus 3" 71 OFFi'],
      ["/node", "/bus/03/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/bus/03/dyn/filter OFF 3.0 990.9"],
      ["/node", "/bus/03/insert OFF PRE OFF"],
      ["/node", "/bus/03/eq OFF"],
      ["/node", "/bus/03/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/bus/03/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/bus/03/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/bus/03/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/bus/03/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/bus/03/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/bus/03/mix ON   -oo OFF +0 OFF   -oo"],
      ["/node", "/bus/03/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/bus/03/mix/02 ON   -oo"],
      ["/node", "/bus/03/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/bus/03/mix/04 ON   -oo"],
      ["/node", "/bus/03/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/bus/03/mix/06 ON   -oo"],
      ["/node", "/bus/03/grp %00000000 %000000"],
      ["/node", '/bus/04/config "MixBus 4" 71 OFFi'],
      ["/node", "/bus/04/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/bus/04/dyn/filter OFF 3.0 990.9"],
      ["/node", "/bus/04/insert OFF PRE OFF"],
      ["/node", "/bus/04/eq OFF"],
      ["/node", "/bus/04/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/bus/04/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/bus/04/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/bus/04/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/bus/04/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/bus/04/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/bus/04/mix ON   -oo OFF +0 OFF   -oo"],
      ["/node", "/bus/04/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/bus/04/mix/02 ON   -oo"],
      ["/node", "/bus/04/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/bus/04/mix/04 ON   -oo"],
      ["/node", "/bus/04/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/bus/04/mix/06 ON   -oo"],
      ["/node", "/bus/04/grp %00000000 %000000"],
      ["/node", '/bus/05/config "SURR L" 71 YEi'],
      ["/node", "/bus/05/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/bus/05/dyn/filter OFF 3.0 990.9"],
      ["/node", "/bus/05/insert OFF PRE OFF"],
      ["/node", "/bus/05/eq OFF"],
      ["/node", "/bus/05/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/bus/05/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/bus/05/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/bus/05/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/bus/05/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/bus/05/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/bus/05/mix ON   0.0 OFF +0 OFF   -oo"],
      ["/node", "/bus/05/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/bus/05/mix/02 ON   -oo"],
      ["/node", "/bus/05/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/bus/05/mix/04 ON   -oo"],
      ["/node", "/bus/05/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/bus/05/mix/06 ON   -oo"],
      ["/node", "/bus/05/grp %00000000 %000000"],
      ["/node", '/bus/06/config "SURR R" 71 YEi'],
      ["/node", "/bus/06/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/bus/06/dyn/filter OFF 3.0 990.9"],
      ["/node", "/bus/06/insert OFF PRE OFF"],
      ["/node", "/bus/06/eq OFF"],
      ["/node", "/bus/06/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/bus/06/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/bus/06/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/bus/06/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/bus/06/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/bus/06/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/bus/06/mix ON   0.0 OFF +0 OFF   -oo"],
      ["/node", "/bus/06/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/bus/06/mix/02 ON   -oo"],
      ["/node", "/bus/06/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/bus/06/mix/04 ON   -oo"],
      ["/node", "/bus/06/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/bus/06/mix/06 ON   -oo"],
      ["/node", "/bus/06/grp %00000000 %000000"],
      ["/node", '/bus/07/config "MixBus 7" 71 OFFi'],
      ["/node", "/bus/07/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/bus/07/dyn/filter OFF 3.0 990.9"],
      ["/node", "/bus/07/insert OFF PRE OFF"],
      ["/node", "/bus/07/eq OFF"],
      ["/node", "/bus/07/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/bus/07/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/bus/07/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/bus/07/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/bus/07/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/bus/07/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/bus/07/mix ON -83.4 OFF +0 OFF   -oo"],
      ["/node", "/bus/07/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/bus/07/mix/02 ON   -oo"],
      ["/node", "/bus/07/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/bus/07/mix/04 ON   -oo"],
      ["/node", "/bus/07/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/bus/07/mix/06 ON   -oo"],
      ["/node", "/bus/07/grp %00000000 %000000"],
      ["/node", '/bus/08/config "MixBus 8" 71 OFFi'],
      ["/node", "/bus/08/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/bus/08/dyn/filter OFF 3.0 990.9"],
      ["/node", "/bus/08/insert OFF PRE OFF"],
      ["/node", "/bus/08/eq OFF"],
      ["/node", "/bus/08/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/bus/08/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/bus/08/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/bus/08/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/bus/08/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/bus/08/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/bus/08/mix ON -83.9 OFF +0 OFF   -oo"],
      ["/node", "/bus/08/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/bus/08/mix/02 ON   -oo"],
      ["/node", "/bus/08/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/bus/08/mix/04 ON   -oo"],
      ["/node", "/bus/08/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/bus/08/mix/06 ON   -oo"],
      ["/node", "/bus/08/grp %00000000 %000000"],
      ["/node", '/bus/09/config "Vocal GEQ" 43 CY'],
      ["/node", "/bus/09/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/bus/09/dyn/filter OFF 3.0 990.9"],
      ["/node", "/bus/09/insert OFF PRE FX6L"],
      ["/node", "/bus/09/eq OFF"],
      ["/node", "/bus/09/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/bus/09/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/bus/09/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/bus/09/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/bus/09/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/bus/09/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/bus/09/mix ON   0.0 ON +0 OFF   -oo"],
      ["/node", "/bus/09/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/bus/09/mix/02 ON   -oo"],
      ["/node", "/bus/09/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/bus/09/mix/04 ON   -oo"],
      ["/node", "/bus/09/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/bus/09/mix/06 ON   -oo"],
      ["/node", "/bus/09/grp %00000000 %000000"],
      ["/node", '/bus/10/config "MixBus 10" 71 OFFi'],
      ["/node", "/bus/10/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/bus/10/dyn/filter OFF 3.0 990.9"],
      ["/node", "/bus/10/insert OFF PRE OFF"],
      ["/node", "/bus/10/eq OFF"],
      ["/node", "/bus/10/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/bus/10/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/bus/10/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/bus/10/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/bus/10/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/bus/10/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/bus/10/mix ON   -oo OFF +0 OFF   -oo"],
      ["/node", "/bus/10/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/bus/10/mix/02 ON   -oo"],
      ["/node", "/bus/10/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/bus/10/mix/04 ON   -oo"],
      ["/node", "/bus/10/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/bus/10/mix/06 ON   -oo"],
      ["/node", "/bus/10/grp %00000000 %000000"],
      ["/node", '/bus/11/config "SUB - Wall" 26 YEi'],
      ["/node", "/bus/11/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/bus/11/dyn/filter OFF 3.0 990.9"],
      ["/node", "/bus/11/insert OFF PRE OFF"],
      ["/node", "/bus/11/eq OFF"],
      ["/node", "/bus/11/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/bus/11/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/bus/11/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/bus/11/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/bus/11/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/bus/11/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/bus/11/mix ON   0.0 OFF +0 OFF   -oo"],
      ["/node", "/bus/11/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/bus/11/mix/02 ON   -oo"],
      ["/node", "/bus/11/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/bus/11/mix/04 ON   -oo"],
      ["/node", "/bus/11/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/bus/11/mix/06 ON   -oo"],
      ["/node", "/bus/11/grp %00000000 %000000"],
      ["/node", '/bus/12/config "SUB - Big" 26 YEi'],
      ["/node", "/bus/12/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/bus/12/dyn/filter OFF 3.0 990.9"],
      ["/node", "/bus/12/insert OFF PRE FX7R"],
      ["/node", "/bus/12/eq OFF"],
      ["/node", "/bus/12/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/bus/12/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/bus/12/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/bus/12/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/bus/12/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/bus/12/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/bus/12/mix ON   0.0 OFF +0 OFF   -oo"],
      ["/node", "/bus/12/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/bus/12/mix/02 ON   -oo"],
      ["/node", "/bus/12/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/bus/12/mix/04 ON   -oo"],
      ["/node", "/bus/12/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/bus/12/mix/06 ON   -oo"],
      ["/node", "/bus/12/grp %00000000 %000000"],
      ["/node", '/bus/13/config "AMBI" 61 MG'],
      ["/node", "/bus/13/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/bus/13/dyn/filter OFF 3.0 990.9"],
      ["/node", "/bus/13/insert OFF PRE OFF"],
      ["/node", "/bus/13/eq OFF"],
      ["/node", "/bus/13/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/bus/13/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/bus/13/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/bus/13/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/bus/13/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/bus/13/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/bus/13/mix ON   0.0 OFF +0 OFF   -oo"],
      ["/node", "/bus/13/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/bus/13/mix/02 ON   -oo"],
      ["/node", "/bus/13/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/bus/13/mix/04 ON   -oo"],
      ["/node", "/bus/13/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/bus/13/mix/06 ON   -oo"],
      ["/node", "/bus/13/grp %00000000 %000000"],
      ["/node", '/bus/14/config "REV" 61 MG'],
      ["/node", "/bus/14/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/bus/14/dyn/filter OFF 3.0 990.9"],
      ["/node", "/bus/14/insert OFF PRE OFF"],
      ["/node", "/bus/14/eq OFF"],
      ["/node", "/bus/14/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/bus/14/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/bus/14/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/bus/14/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/bus/14/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/bus/14/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/bus/14/mix ON   0.0 OFF +0 OFF   -oo"],
      ["/node", "/bus/14/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/bus/14/mix/02 ON   -oo"],
      ["/node", "/bus/14/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/bus/14/mix/04 ON   -oo"],
      ["/node", "/bus/14/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/bus/14/mix/06 ON   -oo"],
      ["/node", "/bus/14/grp %00000000 %000000"],
      ["/node", '/bus/15/config "DELAY" 61 MG'],
      ["/node", "/bus/15/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/bus/15/dyn/filter OFF 3.0 990.9"],
      ["/node", "/bus/15/insert OFF PRE OFF"],
      ["/node", "/bus/15/eq OFF"],
      ["/node", "/bus/15/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/bus/15/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/bus/15/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/bus/15/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/bus/15/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/bus/15/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/bus/15/mix ON   0.0 OFF +0 OFF   -oo"],
      ["/node", "/bus/15/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/bus/15/mix/02 ON   -oo"],
      ["/node", "/bus/15/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/bus/15/mix/04 ON   -oo"],
      ["/node", "/bus/15/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/bus/15/mix/06 ON   -oo"],
      ["/node", "/bus/15/grp %00000000 %000000"],
      ["/node", '/bus/16/config "EXTRA" 61 MG'],
      ["/node", "/bus/16/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 0 100 OFF"],
      ["/node", "/bus/16/dyn/filter OFF 3.0 990.9"],
      ["/node", "/bus/16/insert OFF PRE OFF"],
      ["/node", "/bus/16/eq OFF"],
      ["/node", "/bus/16/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/bus/16/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/bus/16/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/bus/16/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/bus/16/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/bus/16/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/bus/16/mix ON   0.0 OFF +0 OFF   -oo"],
      ["/node", "/bus/16/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/bus/16/mix/02 ON   -oo"],
      ["/node", "/bus/16/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/bus/16/mix/04 ON   -oo"],
      ["/node", "/bus/16/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/bus/16/mix/06 ON   -oo"],
      ["/node", "/bus/16/grp %00000000 %000000"],
      ["/node", '/mtx/01/config "SMAART" 72 RDi'],
      ["/node", "/mtx/01/preamp OFF"],
      ["/node", "/mtx/01/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 100 OFF"],
      ["/node", "/mtx/01/dyn/filter OFF 3.0 990.9"],
      ["/node", "/mtx/01/insert OFF PRE OFF"],
      ["/node", "/mtx/01/eq OFF"],
      ["/node", "/mtx/01/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/mtx/01/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/mtx/01/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/mtx/01/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/mtx/01/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/mtx/01/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/mtx/01/mix ON   0.0"],
      ["/node", "/mtx/01/grp %00000000 %000000"],
      ["/node", '/mtx/02/config "DROOM" 72 BLi'],
      ["/node", "/mtx/02/preamp OFF"],
      ["/node", "/mtx/02/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 100 OFF"],
      ["/node", "/mtx/02/dyn/filter OFF 3.0 990.9"],
      ["/node", "/mtx/02/insert OFF PRE OFF"],
      ["/node", "/mtx/02/eq OFF"],
      ["/node", "/mtx/02/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/mtx/02/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/mtx/02/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/mtx/02/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/mtx/02/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/mtx/02/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/mtx/02/mix ON   0.0"],
      ["/node", "/mtx/02/grp %00000000 %000000"],
      ["/node", '/mtx/03/config "" 72 OFFi'],
      ["/node", "/mtx/03/preamp OFF"],
      ["/node", "/mtx/03/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 100 OFF"],
      ["/node", "/mtx/03/dyn/filter OFF 3.0 990.9"],
      ["/node", "/mtx/03/insert OFF PRE OFF"],
      ["/node", "/mtx/03/eq OFF"],
      ["/node", "/mtx/03/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/mtx/03/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/mtx/03/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/mtx/03/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/mtx/03/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/mtx/03/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/mtx/03/mix ON   -oo"],
      ["/node", "/mtx/03/grp %00000000 %000000"],
      ["/node", '/mtx/04/config "" 72 OFFi'],
      ["/node", "/mtx/04/preamp OFF"],
      ["/node", "/mtx/04/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 100 OFF"],
      ["/node", "/mtx/04/dyn/filter OFF 3.0 990.9"],
      ["/node", "/mtx/04/insert OFF PRE OFF"],
      ["/node", "/mtx/04/eq OFF"],
      ["/node", "/mtx/04/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/mtx/04/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/mtx/04/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/mtx/04/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/mtx/04/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/mtx/04/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/mtx/04/mix ON   -oo"],
      ["/node", "/mtx/04/grp %00000000 %000000"],
      ["/node", '/mtx/05/config "" 72 OFFi'],
      ["/node", "/mtx/05/preamp OFF"],
      ["/node", "/mtx/05/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 100 OFF"],
      ["/node", "/mtx/05/dyn/filter OFF 3.0 990.9"],
      ["/node", "/mtx/05/insert OFF PRE OFF"],
      ["/node", "/mtx/05/eq OFF"],
      ["/node", "/mtx/05/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/mtx/05/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/mtx/05/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/mtx/05/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/mtx/05/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/mtx/05/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/mtx/05/mix ON   -oo"],
      ["/node", "/mtx/05/grp %00000000 %000000"],
      ["/node", '/mtx/06/config "" 72 OFFi'],
      ["/node", "/mtx/06/preamp OFF"],
      ["/node", "/mtx/06/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 100 OFF"],
      ["/node", "/mtx/06/dyn/filter OFF 3.0 990.9"],
      ["/node", "/mtx/06/insert OFF PRE OFF"],
      ["/node", "/mtx/06/eq OFF"],
      ["/node", "/mtx/06/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/mtx/06/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/mtx/06/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/mtx/06/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/mtx/06/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/mtx/06/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/mtx/06/mix ON   -oo"],
      ["/node", "/mtx/06/grp %00000000 %000000"],
      ["/node", '/main/st/config "MainArray" 66 YEi'],
      ["/node", "/main/st/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 100 OFF"],
      ["/node", "/main/st/dyn/filter OFF 3.0 990.9"],
      ["/node", "/main/st/insert OFF PRE FX8L"],
      ["/node", "/main/st/eq OFF"],
      ["/node", "/main/st/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/main/st/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/main/st/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/main/st/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/main/st/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/main/st/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/main/st/mix ON   0.0 +0"],
      ["/node", "/main/st/mix/01 ON   0.0 +0 POST 0"],
      ["/node", "/main/st/mix/02 ON  +2.0"],
      ["/node", "/main/st/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/main/st/mix/04 ON   -oo"],
      ["/node", "/main/st/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/main/st/mix/06 ON   -oo"],
      ["/node", "/main/st/grp %00000000 %000000"],
      ["/node", '/main/m/config "" 67 WH'],
      ["/node", "/main/m/dyn OFF COMP RMS LOG 0.0 3.0 1 0.00 10 10.0  151 POST 100 OFF"],
      ["/node", "/main/m/dyn/filter OFF 3.0 990.9"],
      ["/node", "/main/m/insert OFF PRE OFF"],
      ["/node", "/main/m/eq OFF"],
      ["/node", "/main/m/eq/1 LShv 79.6 +0.00 2.0"],
      ["/node", "/main/m/eq/2 PEQ 158.9 +0.00 2.0"],
      ["/node", "/main/m/eq/3 PEQ 496.6 +0.00 2.0"],
      ["/node", "/main/m/eq/4 PEQ 1k97 +0.00 2.0"],
      ["/node", "/main/m/eq/5 PEQ 5k02 +0.00 2.0"],
      ["/node", "/main/m/eq/6 HShv 10k02 +0.00 2.0"],
      ["/node", "/main/m/mix ON   -oo"],
      ["/node", "/main/m/mix/01 ON   -oo +0 POST 0"],
      ["/node", "/main/m/mix/02 ON   -oo"],
      ["/node", "/main/m/mix/03 ON   -oo +0 POST 0"],
      ["/node", "/main/m/mix/04 ON   -oo"],
      ["/node", "/main/m/mix/05 ON   -oo +0 POST 0"],
      ["/node", "/main/m/mix/06 ON   -oo"],
      ["/node", "/main/m/grp %00000000 %000000"],
      ["/node", "/dca/1 ON -23.6"],
      ["/node", '/dca/1/config "GARGARO" 1 RD'],
      ["/node", "/dca/2 OFF   -32.5"],
      ["/node", '/dca/2/config "THEATER" 1 RD'],
      ["/node", "/dca/3 OFF   -oo"],
      ["/node", '/dca/3/config "--" 1 RD'],
      ["/node", "/dca/4 OFF   -oo"],
      ["/node", '/dca/4/config "ALCC" 1 RD'],
      ["/node", "/dca/5 OFF   -oo"],
      ["/node", '/dca/5/config "2023" 1 RD'],
      ["/node", "/dca/6 OFF   -oo"],
      ["/node", '/dca/6/config "--" 1 RD'],
      ["/node", "/dca/7 OFF   -oo"],
      ["/node", '/dca/7/config "JTSAGE" 1 RD'],
      ["/node", "/dca/8 OFF   -oo"],
      ["/node", '/dca/8/config "--" 1 RD'],
      ["/node", "/fx/1 AMBI"],
      ["/node", "/fx/1/source MIX13 MIX13"],
      ["/node", "/fx/1/par 4 0.84 60 5k06 30 0.0 71 7k9 20 50 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"],
      ["/node", "/fx/2 RPLT"],
      ["/node", "/fx/2/source MIX14 MIX14"],
      ["/node", "/fx/2/par 10 1.70 27 4k47 100 0.0 89 5k0 0.81 18 26 50 90 80 34 -28 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"],
      ["/node", "/fx/3 DLY"],
      ["/node", "/fx/3/source MIX15 MIX15"],
      ["/node", "/fx/3/par 100 26 ST 1 1 13 10 20k0 97 30 30 20k0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"],
      ["/node", "/fx/4 CR/R"],
      ["/node", "/fx/4/source MIX16 MIX16"],
      ["/node", "/fx/4/par 0.47 20 15.1 180 100 +10 20 1.32 56 6k4 83 100 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"],
      ["/node", "/fx/5 GEQ2"],
      ["/node", "/fx/5/par 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0"],
      ["/node", "/fx/6 GEQ2"],
      ["/node", "/fx/6/par -15.0 -15.0 -15.0 -15.0 -15.0 -15.0 -15.0 -15.0 -15.0 -15.0 -9.5 -12.5 -3.0 0.0 0.0 0.0 -2.0 1.0 -5.5 -3.5 0.0 0.0 0.0 0.0 -2.0 0.0 -3.0 -7.0 0.0 0.5 0.0 0.0 -15.0 -15.0 -15.0 -15.0 -15.0 -15.0 -15.0 -6.5 0.0 -6.0 1.5 3.0 0.0 0.0 4.0 5.0 0.0 0.0 0.0 0.0 0.0 2.0 0.0 -3.0 0.0 3.0 3.5 3.0 3.0 2.5 2.0 0.0"],
      ["/node", "/fx/7 GEQ2"],
      ["/node", "/fx/7/par 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 -1.5 -3.0 -1.0 -2.0 -6.0 -2.5 -0.5 -1.0 -1.5 0.0 -2.0 -6.0 -1.0 -0.5 -1.5 -5.0 -1.5 -1.5 -1.5 -1.5 0.0 0.0 0.0 0.0 1.5 -2.5 1.5 -2.0 5.5 -2.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 2.5"],
      ["/node", "/fx/8 GEQ"],
      ["/node", "/fx/8/par 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 0.0 -2.0 -9.0 0.0 -3.0 -9.0 0.0 0.0 0.0 -2.0 -4.5 -2.0 -1.5 -2.5 -1.5 -2.5 -1.0 -2.0 -2.0 -1.0 0.0 0.0 1.5 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"],
      ["/node", "/outputs/main/01 4 POST OFF"],
      ["/node", "/outputs/main/01/delay OFF   0.3"],
      ["/node", "/outputs/main/02 0 POST OFF"],
      ["/node", "/outputs/main/02/delay OFF   0.3"],
      ["/node", "/outputs/main/03 0 POST OFF"],
      ["/node", "/outputs/main/03/delay OFF   0.3"],
      ["/node", "/outputs/main/04 0 POST OFF"],
      ["/node", "/outputs/main/04/delay OFF   0.3"],
      ["/node", "/outputs/main/05 8 POST OFF"],
      ["/node", "/outputs/main/05/delay ON  39.1"],
      ["/node", "/outputs/main/06 9 POST OFF"],
      ["/node", "/outputs/main/06/delay ON  39.1"],
      ["/node", "/outputs/main/07 0 POST OFF"],
      ["/node", "/outputs/main/07/delay OFF   0.3"],
      ["/node", "/outputs/main/08 0 POST OFF"],
      ["/node", "/outputs/main/08/delay OFF   0.3"],
      ["/node", "/outputs/main/09 0 POST OFF"],
      ["/node", "/outputs/main/09/delay OFF   0.3"],
      ["/node", "/outputs/main/10 0 POST OFF"],
      ["/node", "/outputs/main/10/delay OFF   0.3"],
      ["/node", "/outputs/main/11 0 POST OFF"],
      ["/node", "/outputs/main/11/delay OFF   0.3"],
      ["/node", "/outputs/main/12 0 POST OFF"],
      ["/node", "/outputs/main/12/delay OFF   0.3"],
      ["/node", "/outputs/main/13 15 POST OFF"],
      ["/node", "/outputs/main/13/delay OFF   0.3"],
      ["/node", "/outputs/main/14 14 POST OFF"],
      ["/node", "/outputs/main/14/delay OFF   0.3"],
      ["/node", "/outputs/main/15 1 POST OFF"],
      ["/node", "/outputs/main/15/delay OFF   0.3"],
      ["/node", "/outputs/main/16 2 POST OFF"],
      ["/node", "/outputs/main/16/delay OFF   0.3"],
      ["/node", "/outputs/aux/01 20 POST OFF"],
      ["/node", "/outputs/aux/02 0 POST OFF"],
      ["/node", "/outputs/aux/03 21 POST OFF"],
      ["/node", "/outputs/aux/04 0 POST OFF"],
      ["/node", "/outputs/aux/05 0 POST OFF"],
      ["/node", "/outputs/aux/06 0 POST OFF"],
      ["/node", "/outputs/p16/01 12 <-EQ+M OFF"],
      ["/node", "/outputs/p16/01/iQ OFF none Linear 0"],
      ["/node", "/outputs/p16/02 0 <-EQ OFF"],
      ["/node", "/outputs/p16/02/iQ OFF none Linear 0"],
      ["/node", "/outputs/p16/03 0 <-EQ OFF"],
      ["/node", "/outputs/p16/03/iQ OFF none Linear 0"],
      ["/node", "/outputs/p16/04 0 <-EQ OFF"],
      ["/node", "/outputs/p16/04/iQ OFF none Linear 0"],
      ["/node", "/outputs/p16/05 57 <-EQ OFF"],
      ["/node", "/outputs/p16/05/iQ OFF none Linear 0"],
      ["/node", "/outputs/p16/06 56 <-EQ OFF"],
      ["/node", "/outputs/p16/06/iQ OFF none Linear 0"],
      ["/node", "/outputs/p16/07 0 <-EQ OFF"],
      ["/node", "/outputs/p16/07/iQ OFF none Linear 0"],
      ["/node", "/outputs/p16/08 0 <-EQ OFF"],
      ["/node", "/outputs/p16/08/iQ OFF none Linear 0"],
      ["/node", "/outputs/p16/09 53 <-EQ OFF"],
      ["/node", "/outputs/p16/09/iQ OFF none Linear 0"],
      ["/node", "/outputs/p16/10 52 <-EQ OFF"],
      ["/node", "/outputs/p16/10/iQ OFF none Linear 0"],
      ["/node", "/outputs/p16/11 48 <-EQ OFF"],
      ["/node", "/outputs/p16/11/iQ OFF none Linear 0"],
      ["/node", "/outputs/p16/12 49 <-EQ OFF"],
      ["/node", "/outputs/p16/12/iQ OFF none Linear 0"],
      ["/node", "/outputs/p16/13 58 <-EQ OFF"],
      ["/node", "/outputs/p16/13/iQ OFF none Linear 0"],
      ["/node", "/outputs/p16/14 59 <-EQ OFF"],
      ["/node", "/outputs/p16/14/iQ OFF none Linear 0"],
      ["/node", "/outputs/p16/15 50 <-EQ OFF"],
      ["/node", "/outputs/p16/15/iQ OFF none Linear 0"],
      ["/node", "/outputs/p16/16 51 <-EQ OFF"],
      ["/node", "/outputs/p16/16/iQ OFF none Linear 0"],
      ["/node", "/outputs/aes/01 1 POST OFF"],
      ["/node", "/outputs/aes/02 2 POST OFF"],
      ["/node", "/outputs/rec/01 1 <-EQ"],
      ["/node", "/outputs/rec/02 2 <-EQ"],
      ["/node", "/headamp/000 +0.0 OFF"],
      ["/node", "/headamp/001 +0.0 OFF"],
      ["/node", "/headamp/002 +0.0 OFF"],
      ["/node", "/headamp/003 +0.0 OFF"],
      ["/node", "/headamp/004 +0.0 OFF"],
      ["/node", "/headamp/005 +0.0 OFF"],
      ["/node", "/headamp/006 +0.0 OFF"],
      ["/node", "/headamp/007 +0.0 OFF"],
      ["/node", "/headamp/008 +0.0 OFF"],
      ["/node", "/headamp/009 +0.0 OFF"],
      ["/node", "/headamp/010 +0.0 OFF"],
      ["/node", "/headamp/011 +0.0 OFF"],
      ["/node", "/headamp/012 +0.0 OFF"],
      ["/node", "/headamp/013 +0.0 OFF"],
      ["/node", "/headamp/014 +0.0 OFF"],
      ["/node", "/headamp/015 +0.0 OFF"],
      ["/node", "/headamp/016 +0.0 OFF"],
      ["/node", "/headamp/017 +0.0 OFF"],
      ["/node", "/headamp/018 +9.5 OFF"],
      ["/node", "/headamp/019 +22.5 OFF"],
      ["/node", "/headamp/020 +23.5 OFF"],
      ["/node", "/headamp/021 +14.0 OFF"],
      ["/node", "/headamp/022 +5.0 OFF"],
      ["/node", "/headamp/023 +0.0 OFF"],
      ["/node", "/headamp/024 +0.0 OFF"],
      ["/node", "/headamp/025 +0.0 OFF"],
      ["/node", "/headamp/026 +0.0 OFF"],
      ["/node", "/headamp/027 +0.0 OFF"],
      ["/node", "/headamp/028 +0.0 OFF"],
      ["/node", "/headamp/029 +0.0 OFF"],
      ["/node", "/headamp/030 +0.0 OFF"],
      ["/node", "/headamp/031 +0.0 OFF"],
      ["/node", "/headamp/032 +13.5 OFF"],
      ["/node", "/headamp/033 +12.5 OFF"],
      ["/node", "/headamp/034 +16.5 ON"],
      ["/node", "/headamp/035 +14.0 ON"],
      ["/node", "/headamp/036 +32.0 ON"],
      ["/node", "/headamp/037 +21.0 ON"],
      ["/node", "/headamp/038 +29.5 OFF"],
      ["/node", "/headamp/039 +29.5 OFF"],
      ["/node", "/headamp/040 +6.5 OFF"],
      ["/node", "/headamp/041 +3.5 OFF"],
      ["/node", "/headamp/042 +0.0 OFF"],
      ["/node", "/headamp/043 +0.0 OFF"],
      ["/node", "/headamp/044 +0.0 OFF"],
      ["/node", "/headamp/045 +0.0 OFF"],
      ["/node", "/headamp/046 +0.0 OFF"],
      ["/node", "/headamp/047 +0.0 OFF"],
      ["/node", "/headamp/048 +0.0 OFF"],
      ["/node", "/headamp/049 +0.0 OFF"],
      ["/node", "/headamp/050 +0.0 OFF"],
      ["/node", "/headamp/051 +0.0 OFF"],
      ["/node", "/headamp/052 +0.0 OFF"],
      ["/node", "/headamp/053 +0.0 OFF"],
      ["/node", "/headamp/054 +0.0 OFF"],
      ["/node", "/headamp/055 +0.0 OFF"],
      ["/node", "/headamp/056 +0.0 OFF"],
      ["/node", "/headamp/057 +0.0 OFF"],
      ["/node", "/headamp/058 +0.0 OFF"],
      ["/node", "/headamp/059 +0.0 OFF"],
      ["/node", "/headamp/060 +0.0 OFF"],
      ["/node", "/headamp/061 +0.0 OFF"],
      ["/node", "/headamp/062 +0.0 OFF"],
      ["/node", "/headamp/063 +0.0 OFF"],
      ["/node", "/headamp/064 +0.0 OFF"],
      ["/node", "/headamp/065 +0.0 OFF"],
      ["/node", "/headamp/066 +0.0 OFF"],
      ["/node", "/headamp/067 +0.0 OFF"],
      ["/node", "/headamp/068 +0.0 OFF"],
      ["/node", "/headamp/069 +0.0 OFF"],
      ["/node", "/headamp/070 +0.0 OFF"],
      ["/node", "/headamp/071 +0.0 OFF"],
      ["/node", "/headamp/072 +0.0 OFF"],
      ["/node", "/headamp/073 +0.0 OFF"],
      ["/node", "/headamp/074 +0.0 OFF"],
      ["/node", "/headamp/075 +0.0 OFF"],
      ["/node", "/headamp/076 +0.0 OFF"],
      ["/node", "/headamp/077 +0.0 OFF"],
      ["/node", "/headamp/078 +0.0 OFF"],
      ["/node", "/headamp/079 +0.0 OFF"],
      ["/node", "/headamp/080 +16.5 OFF"],
      ["/node", "/headamp/081 +18.5 OFF"],
      ["/node", "/headamp/082 -2.0 OFF"],
      ["/node", "/headamp/083 +0.0 OFF"],
      ["/node", "/headamp/084 +0.0 OFF"],
      ["/node", "/headamp/085 +0.0 OFF"],
      ["/node", "/headamp/086 +0.0 OFF"],
      ["/node", "/headamp/087 +0.0 OFF"],
      ["/node", "/headamp/088 +0.0 OFF"],
      ["/node", "/headamp/089 +0.0 OFF"],
      ["/node", "/headamp/090 +0.0 OFF"],
      ["/node", "/headamp/091 +0.0 OFF"],
      ["/node", "/headamp/092 +0.0 OFF"],
      ["/node", "/headamp/093 +0.0 OFF"],
      ["/node", "/headamp/094 +0.0 OFF"],
      ["/node", "/headamp/095 +0.0 OFF"],
      ["/node", "/headamp/096 +0.0 OFF"],
      ["/node", "/headamp/097 +0.0 OFF"],
      ["/node", "/headamp/098 +0.0 OFF"],
      ["/node", "/headamp/099 +0.0 OFF"],
      ["/node", "/headamp/100 +0.0 OFF"],
      ["/node", "/headamp/101 +0.0 OFF"],
      ["/node", "/headamp/102 +0.0 OFF"],
      ["/node", "/headamp/103 +0.0 OFF"],
      ["/node", "/headamp/104 +0.0 OFF"],
      ["/node", "/headamp/105 +0.0 OFF"],
      ["/node", "/headamp/106 +0.0 OFF"],
      ["/node", "/headamp/107 +0.0 OFF"],
      ["/node", "/headamp/108 +0.0 OFF"],
      ["/node", "/headamp/109 +0.0 OFF"],
      ["/node", "/headamp/110 +0.0 OFF"],
      ["/node", "/headamp/111 +0.0 OFF"],
      ["/node", "/headamp/112 +0.0 OFF"],
      ["/node", "/headamp/113 +0.0 OFF"],
      ["/node", "/headamp/114 +0.0 OFF"],
      ["/node", "/headamp/115 +0.0 OFF"],
      ["/node", "/headamp/116 +0.0 OFF"],
      ["/node", "/headamp/117 +0.0 OFF"],
      ["/node", "/headamp/118 +0.0 OFF"],
      ["/node", "/headamp/119 +0.0 OFF"],
      ["/node", "/headamp/120 +0.0 OFF"],
      ["/node", "/headamp/121 +0.0 OFF"],
      ["/node", "/headamp/122 +0.0 OFF"],
      ["/node", "/headamp/123 +0.0 OFF"],
      ["/node", "/headamp/124 +0.0 OFF"],
      ["/node", "/headamp/125 +0.0 OFF"],
      ["/node", "/headamp/126 +0.0 OFF"],
      ["/node", "/headamp/127 +0.0 OFF"],
      ["/node", '/-show/showfile/show "MyShow" 0 0 0 0 0 0 0 0 0 0 "2.08"'],
      ["/node", '/-show/showfile/cue/000 1200 "Cue Idx0 Num1200" 0 -1 -1 0 1 0 0'],
      ["/node", '/-show/showfile/cue/001 1210 "Cue Idx1 Num1210" 0 1 -1 0 1 0 0'],
      ["/node", '/-show/showfile/scene/001 "AAA" "aaa" %111111110 1'],
      ["/node", '/-show/showfile/scene/002 "BBB" "bbb" %000000010 1'],
      ["/node", '/-show/showfile/snippet/000 "Aaa" 1 1 0 32768 1 '],
      ["/-show/prepos/current", 1],
      ["/-show/prepos", 1],
      ["/bus/14/mix/fader", 0.4878],
      ["/dca/1/fader", 0.7498],
      ["/dca/1/on", 1],
      ["/bus/08/mix/on", 1],
      ["/bus/08/config/name", "HEAD"],
      ["/dca/1/config/name", "TESTER"]
    ];
  }
});

// ../index.js
var dgram = require("node:dgram");
var commandLineArgs = require_dist();
var commandLineUsage = require_dist2();
var x32 = require_x32_adapt();
var { winLib } = require_window_lib();
var CLI_OPTIONS = [
  { name: "ip", type: String, defaultOption: true },
  { name: "port", alias: "p", type: Number, defaultValue: 10023 },
  { name: "keepAlive", type: Number, defaultValue: 5e3 },
  { name: "listen", alias: "l", type: String, defaultValue: ["cue", "dca"], multiple: true },
  { name: "vorJitter", type: Number, defaultValue: 0.05 },
  { name: "vorFreq", type: Number, defaultValue: 500 },
  { name: "vorPort", alias: "o", type: Number, defaultValue: 3333 },
  { name: "vorIP", type: String, defaultValue: "127.0.0.1" },
  { name: "help", alias: "h", type: Boolean, defaultValue: false },
  { name: "debug", alias: "d", type: Boolean, defaultValue: false },
  { name: "verbose", alias: "v", type: Boolean, defaultValue: false },
  { name: "noGUI", type: Boolean, defaultValue: false },
  { name: "testData", type: Boolean, defaultValue: false }
];
var CLI_HELP = [
  {
    content: "Make your X32 talk to Vor",
    header: "X32/M32 Vor Adapter"
  },
  {
    content: [
      "$ npm start [{bold --verbose}] {underline x32_address}",
      "$ npm start [{bold --verbose}] {bold --listen} cue dca bus {bold --ip} {underline x32_address}",
      "$ npm start {bold --help}"
    ],
    header: "Synopsis"
  },
  {
    header: "X32 Configuration",
    optionList: [
      {
        defaultOption: true,
        description: "IP Address of the X32 {bold [required]}",
        name: "ip",
        type: String,
        typeLabel: "{underline address}"
      },
      {
        alias: "p",
        description: "Port of the X32 {italic (10023)}",
        name: "port",
        type: Number,
        typeLabel: "{underline port}"
      }
    ]
  },
  {
    header: "Vor Configuration",
    optionList: [
      {
        alias: "l",
        description: "Updates to populate to Vor.\nItems: {italic cue, dca, dca1 - dca8, bus, bus01 - bus16}.\nDefault is {italic cue, dca}",
        multiple: true,
        name: "listen",
        type: String,
        typeLabel: "{underline item} ..."
      },
      {
        description: "IP for Vor {italic (127.0.0.1)}",
        name: "vorIP",
        type: String,
        typeLabel: "{underline address}"
      },
      {
        alias: "o",
        description: "Port for Vor {italic (3333)}",
        name: "vorPort",
        type: Number,
        typeLabel: "{underline port}"
      },
      {
        description: "Vor update frequency in milliseconds {italic (500ms)}",
        name: "vorFreq",
        type: Number,
        typeLabel: "{underline ms}"
      },
      {
        description: "Vor jitter frequency in milliseconds {italic (50ms)}",
        name: "vorJitter",
        type: Number,
        typeLabel: "{underline ms}"
      }
    ]
  },
  {
    header: "Options",
    optionList: [
      {
        description: "Print this usage guide.",
        name: "help",
        type: Boolean
      },
      {
        alias: "v",
        description: "Print lots of debug data",
        name: "verbose",
        type: Boolean
      },
      {
        alias: "d",
        description: "Print all incoming X32 OSC messages (implies {bold --noGUI})",
        name: "debug",
        type: Boolean
      },
      {
        description: "Suppress usual display",
        name: "noGUI",
        type: Boolean
      }
    ]
  }
];
var VALID_LISTEN = [
  "cue",
  "dca1",
  "dca2",
  "dca3",
  "dca4",
  "dca5",
  "dca6",
  "dca7",
  "dca8",
  "bus01",
  "bus02",
  "bus03",
  "bus04",
  "bus05",
  "bus06",
  "bus07",
  "bus08",
  "bus09",
  "bus10",
  "bus11",
  "bus12",
  "bus13",
  "bus14",
  "bus15",
  "bus16"
];
var options = commandLineArgs(CLI_OPTIONS);
var usage = commandLineUsage(CLI_HELP);
if (options.help) {
  console.log(usage);
  process.exit(0);
}
if (options.debug) {
  options.noGUI = true;
}
if (!options.ip) {
  console.log("ERROR :: IP Address of X32 Required");
  console.log(usage);
  process.exit(1);
}
options.listen = [...new Set(options.listen)];
if (options.listen.includes("dca")) {
  options.listen.splice(options.listen.indexOf("dca"), 1);
  options.listen.push("dca1", "dca2", "dca3", "dca4", "dca5", "dca6", "dca7", "dca8");
}
if (options.listen.includes("bus")) {
  options.listen.splice(options.listen.indexOf("bus"), 1);
  options.listen.push("bus01", "bus02", "bus03", "bus04", "bus05", "bus06", "bus07", "bus08", "bus09", "bus10", "bus11", "bus12", "bus13", "bus14", "bus15", "bus16");
}
options.listen = [...new Set(options.listen)];
for (const thisListenItem of options.listen) {
  if (!VALID_LISTEN.includes(thisListenItem)) {
    console.log(`ERROR :: Invalid Listener Specified :: ${thisListenItem}`);
    console.log(usage);
    process.exit(1);
  }
}
var CURRENT_STATE = x32.getStateMap();
var START_MAP = x32.getNameMap();
var thisWindow = new winLib(CURRENT_STATE);
if (!options.noGUI) {
  thisWindow.doSetupAndClear();
  thisWindow.paint();
  setInterval(() => {
    thisWindow.paint();
  }, 1e3);
}
var x32Socket = dgram.createSocket({ type: "udp4", reuseAddr: true });
var vorSocket = dgram.createSocket({ type: "udp4", reuseAddr: true });
x32Socket.on("message", processFromX32);
x32Socket.on("error", (err) => {
  printInfo(`x32 listener error:
${err.stack}`, true);
  x32Socket.close();
});
x32Socket.on("listening", () => {
  const address = x32Socket.address();
  printInfo(`listening to X32 on ${address.address}:${address.port}`, true);
});
x32Socket.bind(options.port);
if (options.testData) {
  const { nodeLines } = require_fake_data();
  for (let i = 1; i < nodeLines.length; i++) {
    const oscOperation = x32.processOSCMessage(nodeLines[i]);
    try {
      processOSCOperation(oscOperation);
    } catch (err) {
      printInfo(`Bad OSC Handling :: ${err}`);
    }
  }
}
getInitialData();
setInterval(() => {
  sendToX32(x32.xRemote);
  if (options.verbose || !options.noGUI) {
    printInfo("pinging x32...");
  }
}, options.keepAlive);
setInterval(() => {
  sendToX32(x32.showData);
  if (options.verbose || !options.noGUI) {
    printInfo("pinging x32 show data...");
  }
}, options.keepAlive * 10);
setInterval(updateVor, options.updateFrequency);
function getInitialData() {
  for (const thisItem of VALID_LISTEN) {
    if (Object.hasOwn(START_MAP, thisItem)) {
      for (const oscMsg of START_MAP[thisItem]) {
        sendToX32(oscMsg);
      }
    }
  }
  sendToX32(x32.oscMessage("/node", "-prefs/show_control"));
  sendToX32(x32.showData);
  sendToX32(x32.xRemote);
}
function updateVor() {
  const updateBundle = {
    elements: [],
    timetag: x32.now() + options.vorJitter / 1e3
    // Offset for transit time
  };
  for (const thisItem of options.listen) {
    if (thisItem === "cue") {
      updateBundle.elements.push(x32.oscObject(
        "/currentCue",
        CURRENT_STATE.cue_list?.[CURRENT_STATE.current_cue]?.[0] ?? "0.0.0",
        CURRENT_STATE.cue_list?.[CURRENT_STATE.current_cue]?.[1] ?? ""
      ));
    } else if (thisItem.startsWith("dca")) {
      const dcaNumber = parseInt(thisItem.substring(thisItem.length - 1), 10);
      const dcaState = CURRENT_STATE.dca[dcaNumber];
      const dcaName = dcaState[2] === "" ? thisItem.toUpperCase() : dcaState[2];
      updateBundle.elements.push(x32.oscObject(
        `/dca/${dcaNumber}`,
        dcaState[0],
        dcaState[1],
        dcaName
      ));
    } else if (thisItem.startsWith("bus")) {
      const busNumber = thisItem.substring(thisItem.length - 2);
      const busNumberI = parseInt(busNumber, 10);
      const busState = CURRENT_STATE.bus[busNumberI];
      const busName = busState[2] === "" ? thisItem.toUpperCase() : busState[2];
      updateBundle.elements.push(x32.oscObject(
        `/bus/${busNumber}`,
        busState[0],
        busState[1],
        busName
      ));
    }
  }
  sendToVor(x32.toOSCBuffer(updateBundle));
}
function sendToX32(data) {
  x32Socket.send(data, 0, data.length, options.port, options.ip);
}
function sendToVor(data) {
  CURRENT_STATE.last_size = data.length;
  vorSocket.send(data, 0, data.length, options.vorPort, options.vorIP);
}
function processFromX32(msg, _rinfo) {
  try {
    const oscMessage = x32.decode(msg);
    if (options.debug) {
      console.log("From X32 :: ", oscMessage);
    }
    try {
      const oscOperation = x32.processOSCMessage(oscMessage);
      try {
        processOSCOperation(oscOperation);
      } catch (err) {
        printInfo(`bad OSC handling :: ${oscMessage} :: ${err}`);
      }
    } catch (err) {
      printInfo(`bad OSC decode :: ${oscMessage} :: ${err}`);
    }
  } catch (err) {
    printInfo(`invalid OSC packet :: ${err}`);
  }
}
function processOSCOperation(oscOperation) {
  if (oscOperation.endpoint === null) {
    return;
  }
  if (oscOperation.endpoint.type === "cueListDirty") {
    sendToX32(x32.showData);
  } else if (oscOperation.endpoint.type === "rebuildCueList") {
    printInfo("clearing cue data...");
    CURRENT_STATE.cue_list = [];
  } else if (oscOperation.args === null) {
    return;
  } else if (oscOperation.endpoint.type === "mode") {
    printInfo("setting new cue mode...");
    sendToX32(x32.showData);
    if (typeof oscOperation.args[0] === "number") {
      CURRENT_STATE.mode = ["cue", "scene", "snippet"][oscOperation.args[0]];
    } else {
      CURRENT_STATE.mode = oscOperation.args[0].toLowerCase().slice(0, -1);
    }
  } else if (oscOperation.endpoint.type === "currentCue") {
    CURRENT_STATE.current_cue = parseInt(oscOperation.args[0], 10);
    printInfo(`setting current cue... ${oscOperation.args[0]}`);
  } else if (oscOperation.endpoint.type === "dca") {
    const faderIdx = oscOperation.endpoint.faderNumI;
    switch (oscOperation.endpoint.operation) {
      case "on":
        CURRENT_STATE.dca[faderIdx][1] = oscOperation.args[0] ? "ON" : "OFF";
        break;
      case "config/name":
        CURRENT_STATE.dca[faderIdx][2] = oscOperation.args[0] === "" ? `DCA${faderIdx}` : oscOperation.args[0];
        break;
      case "fader":
        CURRENT_STATE.dca[faderIdx][0] = x32.float2Db(oscOperation.args[0]);
        break;
      case "config": {
        const newName = oscOperation.args[0].replace(/^"|"$/g, "");
        CURRENT_STATE.dca[faderIdx][2] = newName === "" ? `DCA${faderIdx}` : newName;
        break;
      }
      case "mix":
        CURRENT_STATE.dca[faderIdx][1] = oscOperation.args[0];
        CURRENT_STATE.dca[faderIdx][0] = `${oscOperation.args[1]} dB`;
        break;
      default:
        break;
    }
  } else if (oscOperation.endpoint.type === "bus") {
    const faderIdx = oscOperation.endpoint.faderNumI;
    switch (oscOperation.endpoint.operation) {
      case "mix/on":
        CURRENT_STATE.bus[faderIdx][1] = oscOperation.args[0] ? "ON" : "OFF";
        break;
      case "config/name":
        CURRENT_STATE.bus[faderIdx][2] = oscOperation.args[0] === "" ? `MixBus ${oscOperation.endpoint.faderNum}` : oscOperation.args[0];
        break;
      case "mix/fader":
        CURRENT_STATE.bus[faderIdx][0] = x32.float2Db(oscOperation.args[0]);
        break;
      case "config": {
        const newName = oscOperation.args[0].replace(/^"|"$/g, "");
        CURRENT_STATE.bus[faderIdx][2] = newName === "" ? `MixBus ${oscOperation.endpoint.faderNum}` : newName;
        break;
      }
      case "mix":
        CURRENT_STATE.bus[faderIdx][1] = oscOperation.args[0];
        CURRENT_STATE.bus[faderIdx][0] = `${oscOperation.args[1]} dB`;
        break;
      default:
        break;
    }
  } else if (oscOperation.endpoint.type === "cue" && oscOperation.endpoint.subtype === CURRENT_STATE.mode) {
    if (oscOperation.endpoint.subtype === "cue") {
      const cueParts = [...oscOperation.args[0]];
      let cueNum = cueParts.pop();
      cueNum = `${cueParts.pop()}.${cueNum}`;
      cueNum = `${cueParts.join("")}.${cueNum}`;
      const cueName = oscOperation.args[1].replace(/^"|"$/g, "");
      CURRENT_STATE.cue_list[oscOperation.endpoint.cueNum] = [cueNum, cueName];
      printInfo(`adding ${CURRENT_STATE.mode} ${cueNum} :: ${cueName}`);
    } else {
      const cueName = oscOperation.args[0].replace(/^"|"$/g, "");
      CURRENT_STATE.cue_list[oscOperation.endpoint.cueNum] = [oscOperation.endpoint.cueNum, cueName];
      printInfo(`adding ${CURRENT_STATE.mode} ${cueName}`);
    }
  } else if (oscOperation.endpoint.type !== "cue") {
    printInfo(`MISSED :: ${oscOperation.endpoint.type}`);
  }
}
function printInfo(text, skipVerbose = false) {
  if (options.noGUI && (options.verbose || skipVerbose)) {
    console.log(text);
  } else {
    x32.addMsg(text.toString(), CURRENT_STATE);
  }
}
