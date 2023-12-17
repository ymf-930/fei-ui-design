import {
  LogLevel,
  Logger,
  __assign,
  __awaiter,
  __extends,
  __generator,
  __read,
  __spread,
  __values,
  init_index_esm,
  init_tslib_es6,
  require_index_cjs
} from "./chunk-GNQUU5TR.js";
import {
  __toESM
} from "./chunk-CEQRFMJQ.js";

// node_modules/.pnpm/@firebase+database@0.6.13_@firebase+app-types@0.6.1/node_modules/@firebase/database/dist/index.esm.js
var import_app = __toESM(require_index_cjs());
init_tslib_es6();

// node_modules/.pnpm/@firebase+util@0.3.2/node_modules/@firebase/util/dist/index.esm.js
init_tslib_es6();
var CONSTANTS = {
  /**
   * @define {boolean} Whether this is the client Node.js SDK.
   */
  NODE_CLIENT: false,
  /**
   * @define {boolean} Whether this is the Admin Node.js SDK.
   */
  NODE_ADMIN: false,
  /**
   * Firebase SDK Version
   */
  SDK_VERSION: "${JSCORE_VERSION}"
};
var assert = function(assertion, message) {
  if (!assertion) {
    throw assertionError(message);
  }
};
var assertionError = function(message) {
  return new Error("Firebase Database (" + CONSTANTS.SDK_VERSION + ") INTERNAL ASSERT FAILED: " + message);
};
var stringToByteArray = function(str) {
  var out = [];
  var p = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if ((c & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
      c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(++i) & 1023);
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }
  return out;
};
var byteArrayToString = function(bytes) {
  var out = [];
  var pos = 0, c = 0;
  while (pos < bytes.length) {
    var c1 = bytes[pos++];
    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else if (c1 > 191 && c1 < 224) {
      var c2 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
    } else if (c1 > 239 && c1 < 365) {
      var c2 = bytes[pos++];
      var c3 = bytes[pos++];
      var c4 = bytes[pos++];
      var u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 65536;
      out[c++] = String.fromCharCode(55296 + (u >> 10));
      out[c++] = String.fromCharCode(56320 + (u & 1023));
    } else {
      var c2 = bytes[pos++];
      var c3 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
    }
  }
  return out.join("");
};
var base64 = {
  /**
   * Maps bytes to characters.
   */
  byteToCharMap_: null,
  /**
   * Maps characters to bytes.
   */
  charToByteMap_: null,
  /**
   * Maps bytes to websafe characters.
   * @private
   */
  byteToCharMapWebSafe_: null,
  /**
   * Maps websafe characters to bytes.
   * @private
   */
  charToByteMapWebSafe_: null,
  /**
   * Our default alphabet, shared between
   * ENCODED_VALS and ENCODED_VALS_WEBSAFE
   */
  ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  /**
   * Our default alphabet. Value 64 (=) is special; it means "nothing."
   */
  get ENCODED_VALS() {
    return this.ENCODED_VALS_BASE + "+/=";
  },
  /**
   * Our websafe alphabet.
   */
  get ENCODED_VALS_WEBSAFE() {
    return this.ENCODED_VALS_BASE + "-_.";
  },
  /**
   * Whether this browser supports the atob and btoa functions. This extension
   * started at Mozilla but is now implemented by many browsers. We use the
   * ASSUME_* variables to avoid pulling in the full useragent detection library
   * but still allowing the standard per-browser compilations.
   *
   */
  HAS_NATIVE_SUPPORT: typeof atob === "function",
  /**
   * Base64-encode an array of bytes.
   *
   * @param input An array of bytes (numbers with
   *     value in [0, 255]) to encode.
   * @param webSafe Boolean indicating we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeByteArray: function(input, webSafe) {
    if (!Array.isArray(input)) {
      throw Error("encodeByteArray takes an array as a parameter");
    }
    this.init_();
    var byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
    var output = [];
    for (var i = 0; i < input.length; i += 3) {
      var byte1 = input[i];
      var haveByte2 = i + 1 < input.length;
      var byte2 = haveByte2 ? input[i + 1] : 0;
      var haveByte3 = i + 2 < input.length;
      var byte3 = haveByte3 ? input[i + 2] : 0;
      var outByte1 = byte1 >> 2;
      var outByte2 = (byte1 & 3) << 4 | byte2 >> 4;
      var outByte3 = (byte2 & 15) << 2 | byte3 >> 6;
      var outByte4 = byte3 & 63;
      if (!haveByte3) {
        outByte4 = 64;
        if (!haveByte2) {
          outByte3 = 64;
        }
      }
      output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
    }
    return output.join("");
  },
  /**
   * Base64-encode a string.
   *
   * @param input A string to encode.
   * @param webSafe If true, we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeString: function(input, webSafe) {
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return btoa(input);
    }
    return this.encodeByteArray(stringToByteArray(input), webSafe);
  },
  /**
   * Base64-decode a string.
   *
   * @param input to decode.
   * @param webSafe True if we should use the
   *     alternative alphabet.
   * @return string representing the decoded value.
   */
  decodeString: function(input, webSafe) {
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return atob(input);
    }
    return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
  },
  /**
   * Base64-decode a string.
   *
   * In base-64 decoding, groups of four characters are converted into three
   * bytes.  If the encoder did not apply padding, the input length may not
   * be a multiple of 4.
   *
   * In this case, the last group will have fewer than 4 characters, and
   * padding will be inferred.  If the group has one or two characters, it decodes
   * to one byte.  If the group has three characters, it decodes to two bytes.
   *
   * @param input Input to decode.
   * @param webSafe True if we should use the web-safe alphabet.
   * @return bytes representing the decoded value.
   */
  decodeStringToByteArray: function(input, webSafe) {
    this.init_();
    var charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
    var output = [];
    for (var i = 0; i < input.length; ) {
      var byte1 = charToByteMap[input.charAt(i++)];
      var haveByte2 = i < input.length;
      var byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
      ++i;
      var haveByte3 = i < input.length;
      var byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      var haveByte4 = i < input.length;
      var byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
        throw Error();
      }
      var outByte1 = byte1 << 2 | byte2 >> 4;
      output.push(outByte1);
      if (byte3 !== 64) {
        var outByte2 = byte2 << 4 & 240 | byte3 >> 2;
        output.push(outByte2);
        if (byte4 !== 64) {
          var outByte3 = byte3 << 6 & 192 | byte4;
          output.push(outByte3);
        }
      }
    }
    return output;
  },
  /**
   * Lazy static initialization function. Called before
   * accessing any of the static map variables.
   * @private
   */
  init_: function() {
    if (!this.byteToCharMap_) {
      this.byteToCharMap_ = {};
      this.charToByteMap_ = {};
      this.byteToCharMapWebSafe_ = {};
      this.charToByteMapWebSafe_ = {};
      for (var i = 0; i < this.ENCODED_VALS.length; i++) {
        this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
        this.charToByteMap_[this.byteToCharMap_[i]] = i;
        this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
        this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
        if (i >= this.ENCODED_VALS_BASE.length) {
          this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
          this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
        }
      }
    }
  }
};
var base64Encode = function(str) {
  var utf8Bytes = stringToByteArray(str);
  return base64.encodeByteArray(utf8Bytes, true);
};
var base64Decode = function(str) {
  try {
    return base64.decodeString(str, true);
  } catch (e) {
    console.error("base64Decode failed: ", e);
  }
  return null;
};
function deepCopy(value) {
  return deepExtend(void 0, value);
}
function deepExtend(target, source) {
  if (!(source instanceof Object)) {
    return source;
  }
  switch (source.constructor) {
    case Date:
      var dateValue = source;
      return new Date(dateValue.getTime());
    case Object:
      if (target === void 0) {
        target = {};
      }
      break;
    case Array:
      target = [];
      break;
    default:
      return source;
  }
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) {
      continue;
    }
    target[prop] = deepExtend(target[prop], source[prop]);
  }
  return target;
}
var Deferred = (
  /** @class */
  function() {
    function Deferred2() {
      var _this = this;
      this.reject = function() {
      };
      this.resolve = function() {
      };
      this.promise = new Promise(function(resolve, reject) {
        _this.resolve = resolve;
        _this.reject = reject;
      });
    }
    Deferred2.prototype.wrapCallback = function(callback) {
      var _this = this;
      return function(error2, value) {
        if (error2) {
          _this.reject(error2);
        } else {
          _this.resolve(value);
        }
        if (typeof callback === "function") {
          _this.promise.catch(function() {
          });
          if (callback.length === 1) {
            callback(error2);
          } else {
            callback(error2, value);
          }
        }
      };
    };
    return Deferred2;
  }()
);
function getUA() {
  if (typeof navigator !== "undefined" && typeof navigator["userAgent"] === "string") {
    return navigator["userAgent"];
  } else {
    return "";
  }
}
function isMobileCordova() {
  return typeof window !== "undefined" && // @ts-ignore Setting up an broadly applicable index signature for Window
  // just to deal with this case would probably be a bad idea.
  !!(window["cordova"] || window["phonegap"] || window["PhoneGap"]) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
}
function isReactNative() {
  return typeof navigator === "object" && navigator["product"] === "ReactNative";
}
function isNodeSdk() {
  return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
}
var ERROR_NAME = "FirebaseError";
var FirebaseError = (
  /** @class */
  function(_super) {
    __extends(FirebaseError2, _super);
    function FirebaseError2(code, message) {
      var _this = _super.call(this, message) || this;
      _this.code = code;
      _this.name = ERROR_NAME;
      Object.setPrototypeOf(_this, FirebaseError2.prototype);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(_this, ErrorFactory.prototype.create);
      }
      return _this;
    }
    return FirebaseError2;
  }(Error)
);
var ErrorFactory = (
  /** @class */
  function() {
    function ErrorFactory2(service, serviceName, errors) {
      this.service = service;
      this.serviceName = serviceName;
      this.errors = errors;
    }
    ErrorFactory2.prototype.create = function(code) {
      var data = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        data[_i - 1] = arguments[_i];
      }
      var customData = data[0] || {};
      var fullCode = this.service + "/" + code;
      var template = this.errors[code];
      var message = template ? replaceTemplate(template, customData) : "Error";
      var fullMessage = this.serviceName + ": " + message + " (" + fullCode + ").";
      var error2 = new FirebaseError(fullCode, fullMessage);
      for (var _a = 0, _b = Object.keys(customData); _a < _b.length; _a++) {
        var key = _b[_a];
        if (key.slice(-1) !== "_") {
          if (key in error2) {
            console.warn('Overwriting FirebaseError base field "' + key + '" can cause unexpected behavior.');
          }
          error2[key] = customData[key];
        }
      }
      return error2;
    };
    return ErrorFactory2;
  }()
);
function replaceTemplate(template, data) {
  return template.replace(PATTERN, function(_, key) {
    var value = data[key];
    return value != null ? String(value) : "<" + key + "?>";
  });
}
var PATTERN = /\{\$([^}]+)}/g;
function jsonEval(str) {
  return JSON.parse(str);
}
function stringify(data) {
  return JSON.stringify(data);
}
var decode = function(token) {
  var header = {}, claims = {}, data = {}, signature = "";
  try {
    var parts = token.split(".");
    header = jsonEval(base64Decode(parts[0]) || "");
    claims = jsonEval(base64Decode(parts[1]) || "");
    signature = parts[2];
    data = claims["d"] || {};
    delete claims["d"];
  } catch (e) {
  }
  return {
    header,
    claims,
    data,
    signature
  };
};
var isValidFormat = function(token) {
  var decoded = decode(token), claims = decoded.claims;
  return !!claims && typeof claims === "object" && claims.hasOwnProperty("iat");
};
var isAdmin = function(token) {
  var claims = decode(token).claims;
  return typeof claims === "object" && claims["admin"] === true;
};
function contains(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function safeGet(obj, key) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  } else {
    return void 0;
  }
}
function isEmpty(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
function map(obj, fn, contextObj) {
  var res = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = fn.call(contextObj, obj[key], key, obj);
    }
  }
  return res;
}
function querystring(querystringParams) {
  var params = [];
  var _loop_1 = function(key2, value2) {
    if (Array.isArray(value2)) {
      value2.forEach(function(arrayVal) {
        params.push(encodeURIComponent(key2) + "=" + encodeURIComponent(arrayVal));
      });
    } else {
      params.push(encodeURIComponent(key2) + "=" + encodeURIComponent(value2));
    }
  };
  for (var _i = 0, _a = Object.entries(querystringParams); _i < _a.length; _i++) {
    var _b = _a[_i], key = _b[0], value = _b[1];
    _loop_1(key, value);
  }
  return params.length ? "&" + params.join("&") : "";
}
var Sha1 = (
  /** @class */
  function() {
    function Sha12() {
      this.chain_ = [];
      this.buf_ = [];
      this.W_ = [];
      this.pad_ = [];
      this.inbuf_ = 0;
      this.total_ = 0;
      this.blockSize = 512 / 8;
      this.pad_[0] = 128;
      for (var i = 1; i < this.blockSize; ++i) {
        this.pad_[i] = 0;
      }
      this.reset();
    }
    Sha12.prototype.reset = function() {
      this.chain_[0] = 1732584193;
      this.chain_[1] = 4023233417;
      this.chain_[2] = 2562383102;
      this.chain_[3] = 271733878;
      this.chain_[4] = 3285377520;
      this.inbuf_ = 0;
      this.total_ = 0;
    };
    Sha12.prototype.compress_ = function(buf, offset) {
      if (!offset) {
        offset = 0;
      }
      var W = this.W_;
      if (typeof buf === "string") {
        for (var i = 0; i < 16; i++) {
          W[i] = buf.charCodeAt(offset) << 24 | buf.charCodeAt(offset + 1) << 16 | buf.charCodeAt(offset + 2) << 8 | buf.charCodeAt(offset + 3);
          offset += 4;
        }
      } else {
        for (var i = 0; i < 16; i++) {
          W[i] = buf[offset] << 24 | buf[offset + 1] << 16 | buf[offset + 2] << 8 | buf[offset + 3];
          offset += 4;
        }
      }
      for (var i = 16; i < 80; i++) {
        var t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
        W[i] = (t << 1 | t >>> 31) & 4294967295;
      }
      var a = this.chain_[0];
      var b = this.chain_[1];
      var c = this.chain_[2];
      var d = this.chain_[3];
      var e = this.chain_[4];
      var f, k;
      for (var i = 0; i < 80; i++) {
        if (i < 40) {
          if (i < 20) {
            f = d ^ b & (c ^ d);
            k = 1518500249;
          } else {
            f = b ^ c ^ d;
            k = 1859775393;
          }
        } else {
          if (i < 60) {
            f = b & c | d & (b | c);
            k = 2400959708;
          } else {
            f = b ^ c ^ d;
            k = 3395469782;
          }
        }
        var t = (a << 5 | a >>> 27) + f + e + k + W[i] & 4294967295;
        e = d;
        d = c;
        c = (b << 30 | b >>> 2) & 4294967295;
        b = a;
        a = t;
      }
      this.chain_[0] = this.chain_[0] + a & 4294967295;
      this.chain_[1] = this.chain_[1] + b & 4294967295;
      this.chain_[2] = this.chain_[2] + c & 4294967295;
      this.chain_[3] = this.chain_[3] + d & 4294967295;
      this.chain_[4] = this.chain_[4] + e & 4294967295;
    };
    Sha12.prototype.update = function(bytes, length) {
      if (bytes == null) {
        return;
      }
      if (length === void 0) {
        length = bytes.length;
      }
      var lengthMinusBlock = length - this.blockSize;
      var n = 0;
      var buf = this.buf_;
      var inbuf = this.inbuf_;
      while (n < length) {
        if (inbuf === 0) {
          while (n <= lengthMinusBlock) {
            this.compress_(bytes, n);
            n += this.blockSize;
          }
        }
        if (typeof bytes === "string") {
          while (n < length) {
            buf[inbuf] = bytes.charCodeAt(n);
            ++inbuf;
            ++n;
            if (inbuf === this.blockSize) {
              this.compress_(buf);
              inbuf = 0;
              break;
            }
          }
        } else {
          while (n < length) {
            buf[inbuf] = bytes[n];
            ++inbuf;
            ++n;
            if (inbuf === this.blockSize) {
              this.compress_(buf);
              inbuf = 0;
              break;
            }
          }
        }
      }
      this.inbuf_ = inbuf;
      this.total_ += length;
    };
    Sha12.prototype.digest = function() {
      var digest = [];
      var totalBits = this.total_ * 8;
      if (this.inbuf_ < 56) {
        this.update(this.pad_, 56 - this.inbuf_);
      } else {
        this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
      }
      for (var i = this.blockSize - 1; i >= 56; i--) {
        this.buf_[i] = totalBits & 255;
        totalBits /= 256;
      }
      this.compress_(this.buf_);
      var n = 0;
      for (var i = 0; i < 5; i++) {
        for (var j = 24; j >= 0; j -= 8) {
          digest[n] = this.chain_[i] >> j & 255;
          ++n;
        }
      }
      return digest;
    };
    return Sha12;
  }()
);
var ObserverProxy = (
  /** @class */
  function() {
    function ObserverProxy2(executor, onNoObservers) {
      var _this = this;
      this.observers = [];
      this.unsubscribes = [];
      this.observerCount = 0;
      this.task = Promise.resolve();
      this.finalized = false;
      this.onNoObservers = onNoObservers;
      this.task.then(function() {
        executor(_this);
      }).catch(function(e) {
        _this.error(e);
      });
    }
    ObserverProxy2.prototype.next = function(value) {
      this.forEachObserver(function(observer) {
        observer.next(value);
      });
    };
    ObserverProxy2.prototype.error = function(error2) {
      this.forEachObserver(function(observer) {
        observer.error(error2);
      });
      this.close(error2);
    };
    ObserverProxy2.prototype.complete = function() {
      this.forEachObserver(function(observer) {
        observer.complete();
      });
      this.close();
    };
    ObserverProxy2.prototype.subscribe = function(nextOrObserver, error2, complete) {
      var _this = this;
      var observer;
      if (nextOrObserver === void 0 && error2 === void 0 && complete === void 0) {
        throw new Error("Missing Observer.");
      }
      if (implementsAnyMethods(nextOrObserver, [
        "next",
        "error",
        "complete"
      ])) {
        observer = nextOrObserver;
      } else {
        observer = {
          next: nextOrObserver,
          error: error2,
          complete
        };
      }
      if (observer.next === void 0) {
        observer.next = noop;
      }
      if (observer.error === void 0) {
        observer.error = noop;
      }
      if (observer.complete === void 0) {
        observer.complete = noop;
      }
      var unsub = this.unsubscribeOne.bind(this, this.observers.length);
      if (this.finalized) {
        this.task.then(function() {
          try {
            if (_this.finalError) {
              observer.error(_this.finalError);
            } else {
              observer.complete();
            }
          } catch (e) {
          }
          return;
        });
      }
      this.observers.push(observer);
      return unsub;
    };
    ObserverProxy2.prototype.unsubscribeOne = function(i) {
      if (this.observers === void 0 || this.observers[i] === void 0) {
        return;
      }
      delete this.observers[i];
      this.observerCount -= 1;
      if (this.observerCount === 0 && this.onNoObservers !== void 0) {
        this.onNoObservers(this);
      }
    };
    ObserverProxy2.prototype.forEachObserver = function(fn) {
      if (this.finalized) {
        return;
      }
      for (var i = 0; i < this.observers.length; i++) {
        this.sendOne(i, fn);
      }
    };
    ObserverProxy2.prototype.sendOne = function(i, fn) {
      var _this = this;
      this.task.then(function() {
        if (_this.observers !== void 0 && _this.observers[i] !== void 0) {
          try {
            fn(_this.observers[i]);
          } catch (e) {
            if (typeof console !== "undefined" && console.error) {
              console.error(e);
            }
          }
        }
      });
    };
    ObserverProxy2.prototype.close = function(err) {
      var _this = this;
      if (this.finalized) {
        return;
      }
      this.finalized = true;
      if (err !== void 0) {
        this.finalError = err;
      }
      this.task.then(function() {
        _this.observers = void 0;
        _this.onNoObservers = void 0;
      });
    };
    return ObserverProxy2;
  }()
);
function implementsAnyMethods(obj, methods) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
    var method = methods_1[_i];
    if (method in obj && typeof obj[method] === "function") {
      return true;
    }
  }
  return false;
}
function noop() {
}
var validateArgCount = function(fnName, minCount, maxCount, argCount) {
  var argError;
  if (argCount < minCount) {
    argError = "at least " + minCount;
  } else if (argCount > maxCount) {
    argError = maxCount === 0 ? "none" : "no more than " + maxCount;
  }
  if (argError) {
    var error2 = fnName + " failed: Was called with " + argCount + (argCount === 1 ? " argument." : " arguments.") + " Expects " + argError + ".";
    throw new Error(error2);
  }
};
function errorPrefix(fnName, argumentNumber, optional) {
  var argName = "";
  switch (argumentNumber) {
    case 1:
      argName = optional ? "first" : "First";
      break;
    case 2:
      argName = optional ? "second" : "Second";
      break;
    case 3:
      argName = optional ? "third" : "Third";
      break;
    case 4:
      argName = optional ? "fourth" : "Fourth";
      break;
    default:
      throw new Error("errorPrefix called with argumentNumber > 4.  Need to update it?");
  }
  var error2 = fnName + " failed: ";
  error2 += argName + " argument ";
  return error2;
}
function validateCallback(fnName, argumentNumber, callback, optional) {
  if (optional && !callback) {
    return;
  }
  if (typeof callback !== "function") {
    throw new Error(errorPrefix(fnName, argumentNumber, optional) + "must be a valid function.");
  }
}
function validateContextObject(fnName, argumentNumber, context, optional) {
  if (optional && !context) {
    return;
  }
  if (typeof context !== "object" || context === null) {
    throw new Error(errorPrefix(fnName, argumentNumber, optional) + "must be a valid context object.");
  }
}
var stringToByteArray$1 = function(str) {
  var out = [];
  var p = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c >= 55296 && c <= 56319) {
      var high = c - 55296;
      i++;
      assert(i < str.length, "Surrogate pair missing trail surrogate.");
      var low = str.charCodeAt(i) - 56320;
      c = 65536 + (high << 10) + low;
    }
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if (c < 65536) {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }
  return out;
};
var stringLength = function(str) {
  var p = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c < 128) {
      p++;
    } else if (c < 2048) {
      p += 2;
    } else if (c >= 55296 && c <= 56319) {
      p += 4;
      i++;
    } else {
      p += 3;
    }
  }
  return p;
};
var MAX_VALUE_MILLIS = 4 * 60 * 60 * 1e3;

// node_modules/.pnpm/@firebase+database@0.6.13_@firebase+app-types@0.6.1/node_modules/@firebase/database/dist/index.esm.js
init_index_esm();

// node_modules/.pnpm/@firebase+component@0.1.19/node_modules/@firebase/component/dist/index.esm.js
init_tslib_es6();
var Component = (
  /** @class */
  function() {
    function Component2(name2, instanceFactory, type) {
      this.name = name2;
      this.instanceFactory = instanceFactory;
      this.type = type;
      this.multipleInstances = false;
      this.serviceProps = {};
      this.instantiationMode = "LAZY";
    }
    Component2.prototype.setInstantiationMode = function(mode) {
      this.instantiationMode = mode;
      return this;
    };
    Component2.prototype.setMultipleInstances = function(multipleInstances) {
      this.multipleInstances = multipleInstances;
      return this;
    };
    Component2.prototype.setServiceProps = function(props) {
      this.serviceProps = props;
      return this;
    };
    return Component2;
  }()
);
var DEFAULT_ENTRY_NAME = "[DEFAULT]";
var Provider = (
  /** @class */
  function() {
    function Provider2(name2, container) {
      this.name = name2;
      this.container = container;
      this.component = null;
      this.instances = /* @__PURE__ */ new Map();
      this.instancesDeferred = /* @__PURE__ */ new Map();
    }
    Provider2.prototype.get = function(identifier) {
      if (identifier === void 0) {
        identifier = DEFAULT_ENTRY_NAME;
      }
      var normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
      if (!this.instancesDeferred.has(normalizedIdentifier)) {
        var deferred = new Deferred();
        this.instancesDeferred.set(normalizedIdentifier, deferred);
        try {
          var instance = this.getOrInitializeService(normalizedIdentifier);
          if (instance) {
            deferred.resolve(instance);
          }
        } catch (e) {
        }
      }
      return this.instancesDeferred.get(normalizedIdentifier).promise;
    };
    Provider2.prototype.getImmediate = function(options) {
      var _a = __assign({ identifier: DEFAULT_ENTRY_NAME, optional: false }, options), identifier = _a.identifier, optional = _a.optional;
      var normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
      try {
        var instance = this.getOrInitializeService(normalizedIdentifier);
        if (!instance) {
          if (optional) {
            return null;
          }
          throw Error("Service " + this.name + " is not available");
        }
        return instance;
      } catch (e) {
        if (optional) {
          return null;
        } else {
          throw e;
        }
      }
    };
    Provider2.prototype.getComponent = function() {
      return this.component;
    };
    Provider2.prototype.setComponent = function(component) {
      var e_1, _a;
      if (component.name !== this.name) {
        throw Error("Mismatching Component " + component.name + " for Provider " + this.name + ".");
      }
      if (this.component) {
        throw Error("Component for " + this.name + " has already been provided");
      }
      this.component = component;
      if (isComponentEager(component)) {
        try {
          this.getOrInitializeService(DEFAULT_ENTRY_NAME);
        } catch (e) {
        }
      }
      try {
        for (var _b = __values(this.instancesDeferred.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
          var _d = __read(_c.value, 2), instanceIdentifier = _d[0], instanceDeferred = _d[1];
          var normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
          try {
            var instance = this.getOrInitializeService(normalizedIdentifier);
            instanceDeferred.resolve(instance);
          } catch (e) {
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
    };
    Provider2.prototype.clearInstance = function(identifier) {
      if (identifier === void 0) {
        identifier = DEFAULT_ENTRY_NAME;
      }
      this.instancesDeferred.delete(identifier);
      this.instances.delete(identifier);
    };
    Provider2.prototype.delete = function() {
      return __awaiter(this, void 0, void 0, function() {
        var services;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              services = Array.from(this.instances.values());
              return [4, Promise.all(__spread(services.filter(function(service) {
                return "INTERNAL" in service;
              }).map(function(service) {
                return service.INTERNAL.delete();
              }), services.filter(function(service) {
                return "_delete" in service;
              }).map(function(service) {
                return service._delete();
              })))];
            case 1:
              _a.sent();
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    Provider2.prototype.isComponentSet = function() {
      return this.component != null;
    };
    Provider2.prototype.getOrInitializeService = function(identifier) {
      var instance = this.instances.get(identifier);
      if (!instance && this.component) {
        instance = this.component.instanceFactory(this.container, normalizeIdentifierForFactory(identifier));
        this.instances.set(identifier, instance);
      }
      return instance || null;
    };
    Provider2.prototype.normalizeInstanceIdentifier = function(identifier) {
      if (this.component) {
        return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
      } else {
        return identifier;
      }
    };
    return Provider2;
  }()
);
function normalizeIdentifierForFactory(identifier) {
  return identifier === DEFAULT_ENTRY_NAME ? void 0 : identifier;
}
function isComponentEager(component) {
  return component.instantiationMode === "EAGER";
}
var ComponentContainer = (
  /** @class */
  function() {
    function ComponentContainer2(name2) {
      this.name = name2;
      this.providers = /* @__PURE__ */ new Map();
    }
    ComponentContainer2.prototype.addComponent = function(component) {
      var provider = this.getProvider(component.name);
      if (provider.isComponentSet()) {
        throw new Error("Component " + component.name + " has already been registered with " + this.name);
      }
      provider.setComponent(component);
    };
    ComponentContainer2.prototype.addOrOverwriteComponent = function(component) {
      var provider = this.getProvider(component.name);
      if (provider.isComponentSet()) {
        this.providers.delete(component.name);
      }
      this.addComponent(component);
    };
    ComponentContainer2.prototype.getProvider = function(name2) {
      if (this.providers.has(name2)) {
        return this.providers.get(name2);
      }
      var provider = new Provider(name2, this);
      this.providers.set(name2, provider);
      return provider;
    };
    ComponentContainer2.prototype.getProviders = function() {
      return Array.from(this.providers.values());
    };
    return ComponentContainer2;
  }()
);

// node_modules/.pnpm/@firebase+database@0.6.13_@firebase+app-types@0.6.1/node_modules/@firebase/database/dist/index.esm.js
var DOMStorageWrapper = (
  /** @class */
  function() {
    function DOMStorageWrapper2(domStorage_) {
      this.domStorage_ = domStorage_;
      this.prefix_ = "firebase:";
    }
    DOMStorageWrapper2.prototype.set = function(key, value) {
      if (value == null) {
        this.domStorage_.removeItem(this.prefixedName_(key));
      } else {
        this.domStorage_.setItem(this.prefixedName_(key), stringify(value));
      }
    };
    DOMStorageWrapper2.prototype.get = function(key) {
      var storedVal = this.domStorage_.getItem(this.prefixedName_(key));
      if (storedVal == null) {
        return null;
      } else {
        return jsonEval(storedVal);
      }
    };
    DOMStorageWrapper2.prototype.remove = function(key) {
      this.domStorage_.removeItem(this.prefixedName_(key));
    };
    DOMStorageWrapper2.prototype.prefixedName_ = function(name2) {
      return this.prefix_ + name2;
    };
    DOMStorageWrapper2.prototype.toString = function() {
      return this.domStorage_.toString();
    };
    return DOMStorageWrapper2;
  }()
);
var MemoryStorage = (
  /** @class */
  function() {
    function MemoryStorage2() {
      this.cache_ = {};
      this.isInMemoryStorage = true;
    }
    MemoryStorage2.prototype.set = function(key, value) {
      if (value == null) {
        delete this.cache_[key];
      } else {
        this.cache_[key] = value;
      }
    };
    MemoryStorage2.prototype.get = function(key) {
      if (contains(this.cache_, key)) {
        return this.cache_[key];
      }
      return null;
    };
    MemoryStorage2.prototype.remove = function(key) {
      delete this.cache_[key];
    };
    return MemoryStorage2;
  }()
);
var createStoragefor = function(domStorageName) {
  try {
    if (typeof window !== "undefined" && typeof window[domStorageName] !== "undefined") {
      var domStorage = window[domStorageName];
      domStorage.setItem("firebase:sentinel", "cache");
      domStorage.removeItem("firebase:sentinel");
      return new DOMStorageWrapper(domStorage);
    }
  } catch (e) {
  }
  return new MemoryStorage();
};
var PersistentStorage = createStoragefor("localStorage");
var SessionStorage = createStoragefor("sessionStorage");
var logClient = new Logger("@firebase/database");
var LUIDGenerator = /* @__PURE__ */ function() {
  var id = 1;
  return function() {
    return id++;
  };
}();
var sha1 = function(str) {
  var utf8Bytes = stringToByteArray$1(str);
  var sha12 = new Sha1();
  sha12.update(utf8Bytes);
  var sha1Bytes = sha12.digest();
  return base64.encodeByteArray(sha1Bytes);
};
var buildLogMessage_ = function() {
  var varArgs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    varArgs[_i] = arguments[_i];
  }
  var message = "";
  for (var i = 0; i < varArgs.length; i++) {
    var arg = varArgs[i];
    if (Array.isArray(arg) || arg && typeof arg === "object" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof arg.length === "number") {
      message += buildLogMessage_.apply(null, arg);
    } else if (typeof arg === "object") {
      message += stringify(arg);
    } else {
      message += arg;
    }
    message += " ";
  }
  return message;
};
var logger = null;
var firstLog_ = true;
var enableLogging = function(logger_, persistent) {
  assert(!persistent || logger_ === true || logger_ === false, "Can't turn on custom loggers persistently.");
  if (logger_ === true) {
    logClient.logLevel = LogLevel.VERBOSE;
    logger = logClient.log.bind(logClient);
    if (persistent) {
      SessionStorage.set("logging_enabled", true);
    }
  } else if (typeof logger_ === "function") {
    logger = logger_;
  } else {
    logger = null;
    SessionStorage.remove("logging_enabled");
  }
};
var log = function() {
  var varArgs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    varArgs[_i] = arguments[_i];
  }
  if (firstLog_ === true) {
    firstLog_ = false;
    if (logger === null && SessionStorage.get("logging_enabled") === true) {
      enableLogging(true);
    }
  }
  if (logger) {
    var message = buildLogMessage_.apply(null, varArgs);
    logger(message);
  }
};
var logWrapper = function(prefix) {
  return function() {
    var varArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      varArgs[_i] = arguments[_i];
    }
    log.apply(void 0, __spread([prefix], varArgs));
  };
};
var error = function() {
  var varArgs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    varArgs[_i] = arguments[_i];
  }
  var message = "FIREBASE INTERNAL ERROR: " + buildLogMessage_.apply(void 0, __spread(varArgs));
  logClient.error(message);
};
var fatal = function() {
  var varArgs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    varArgs[_i] = arguments[_i];
  }
  var message = "FIREBASE FATAL ERROR: " + buildLogMessage_.apply(void 0, __spread(varArgs));
  logClient.error(message);
  throw new Error(message);
};
var warn = function() {
  var varArgs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    varArgs[_i] = arguments[_i];
  }
  var message = "FIREBASE WARNING: " + buildLogMessage_.apply(void 0, __spread(varArgs));
  logClient.warn(message);
};
var warnIfPageIsSecure = function() {
  if (typeof window !== "undefined" && window.location && window.location.protocol && window.location.protocol.indexOf("https:") !== -1) {
    warn("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
  }
};
var isInvalidJSONNumber = function(data) {
  return typeof data === "number" && (data !== data || // NaN
  data === Number.POSITIVE_INFINITY || data === Number.NEGATIVE_INFINITY);
};
var executeWhenDOMReady = function(fn) {
  if (isNodeSdk() || document.readyState === "complete") {
    fn();
  } else {
    var called_1 = false;
    var wrappedFn_1 = function() {
      if (!document.body) {
        setTimeout(wrappedFn_1, Math.floor(10));
        return;
      }
      if (!called_1) {
        called_1 = true;
        fn();
      }
    };
    if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", wrappedFn_1, false);
      window.addEventListener("load", wrappedFn_1, false);
    } else if (document.attachEvent) {
      document.attachEvent("onreadystatechange", function() {
        if (document.readyState === "complete") {
          wrappedFn_1();
        }
      });
      window.attachEvent("onload", wrappedFn_1);
    }
  }
};
var MIN_NAME = "[MIN_NAME]";
var MAX_NAME = "[MAX_NAME]";
var nameCompare = function(a, b) {
  if (a === b) {
    return 0;
  } else if (a === MIN_NAME || b === MAX_NAME) {
    return -1;
  } else if (b === MIN_NAME || a === MAX_NAME) {
    return 1;
  } else {
    var aAsInt = tryParseInt(a), bAsInt = tryParseInt(b);
    if (aAsInt !== null) {
      if (bAsInt !== null) {
        return aAsInt - bAsInt === 0 ? a.length - b.length : aAsInt - bAsInt;
      } else {
        return -1;
      }
    } else if (bAsInt !== null) {
      return 1;
    } else {
      return a < b ? -1 : 1;
    }
  }
};
var stringCompare = function(a, b) {
  if (a === b) {
    return 0;
  } else if (a < b) {
    return -1;
  } else {
    return 1;
  }
};
var requireKey = function(key, obj) {
  if (obj && key in obj) {
    return obj[key];
  } else {
    throw new Error("Missing required key (" + key + ") in object: " + stringify(obj));
  }
};
var ObjectToUniqueKey = function(obj) {
  if (typeof obj !== "object" || obj === null) {
    return stringify(obj);
  }
  var keys = [];
  for (var k in obj) {
    keys.push(k);
  }
  keys.sort();
  var key = "{";
  for (var i = 0; i < keys.length; i++) {
    if (i !== 0) {
      key += ",";
    }
    key += stringify(keys[i]);
    key += ":";
    key += ObjectToUniqueKey(obj[keys[i]]);
  }
  key += "}";
  return key;
};
var splitStringBySize = function(str, segsize) {
  var len = str.length;
  if (len <= segsize) {
    return [str];
  }
  var dataSegs = [];
  for (var c = 0; c < len; c += segsize) {
    if (c + segsize > len) {
      dataSegs.push(str.substring(c, len));
    } else {
      dataSegs.push(str.substring(c, c + segsize));
    }
  }
  return dataSegs;
};
function each(obj, fn) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn(key, obj[key]);
    }
  }
}
var doubleToIEEE754String = function(v) {
  assert(!isInvalidJSONNumber(v), "Invalid JSON number");
  var ebits = 11, fbits = 52;
  var bias = (1 << ebits - 1) - 1;
  var s, e, f, ln, i;
  if (v === 0) {
    e = 0;
    f = 0;
    s = 1 / v === -Infinity ? 1 : 0;
  } else {
    s = v < 0;
    v = Math.abs(v);
    if (v >= Math.pow(2, 1 - bias)) {
      ln = Math.min(Math.floor(Math.log(v) / Math.LN2), bias);
      e = ln + bias;
      f = Math.round(v * Math.pow(2, fbits - ln) - Math.pow(2, fbits));
    } else {
      e = 0;
      f = Math.round(v / Math.pow(2, 1 - bias - fbits));
    }
  }
  var bits = [];
  for (i = fbits; i; i -= 1) {
    bits.push(f % 2 ? 1 : 0);
    f = Math.floor(f / 2);
  }
  for (i = ebits; i; i -= 1) {
    bits.push(e % 2 ? 1 : 0);
    e = Math.floor(e / 2);
  }
  bits.push(s ? 1 : 0);
  bits.reverse();
  var str = bits.join("");
  var hexByteString = "";
  for (i = 0; i < 64; i += 8) {
    var hexByte = parseInt(str.substr(i, 8), 2).toString(16);
    if (hexByte.length === 1) {
      hexByte = "0" + hexByte;
    }
    hexByteString = hexByteString + hexByte;
  }
  return hexByteString.toLowerCase();
};
var isChromeExtensionContentScript = function() {
  return !!(typeof window === "object" && window["chrome"] && window["chrome"]["extension"] && !/^chrome/.test(window.location.href));
};
var isWindowsStoreApp = function() {
  return typeof Windows === "object" && typeof Windows.UI === "object";
};
var errorForServerCode = function(code, query) {
  var reason = "Unknown Error";
  if (code === "too_big") {
    reason = "The data requested exceeds the maximum size that can be accessed with a single request.";
  } else if (code === "permission_denied") {
    reason = "Client doesn't have permission to access the desired data.";
  } else if (code === "unavailable") {
    reason = "The service is unavailable";
  }
  var error2 = new Error(code + " at " + query.path.toString() + ": " + reason);
  error2.code = code.toUpperCase();
  return error2;
};
var INTEGER_REGEXP_ = new RegExp("^-?(0*)\\d{1,10}$");
var tryParseInt = function(str) {
  if (INTEGER_REGEXP_.test(str)) {
    var intVal = Number(str);
    if (intVal >= -2147483648 && intVal <= 2147483647) {
      return intVal;
    }
  }
  return null;
};
var exceptionGuard = function(fn) {
  try {
    fn();
  } catch (e) {
    setTimeout(function() {
      var stack = e.stack || "";
      warn("Exception was thrown by user callback.", stack);
      throw e;
    }, Math.floor(0));
  }
};
var beingCrawled = function() {
  var userAgent = typeof window === "object" && window["navigator"] && window["navigator"]["userAgent"] || "";
  return userAgent.search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) >= 0;
};
var setTimeoutNonBlocking = function(fn, time) {
  var timeout = setTimeout(fn, time);
  if (typeof timeout === "object" && timeout["unref"]) {
    timeout["unref"]();
  }
  return timeout;
};
var Path = (
  /** @class */
  function() {
    function Path2(pathOrString, pieceNum) {
      if (pieceNum === void 0) {
        this.pieces_ = pathOrString.split("/");
        var copyTo = 0;
        for (var i = 0; i < this.pieces_.length; i++) {
          if (this.pieces_[i].length > 0) {
            this.pieces_[copyTo] = this.pieces_[i];
            copyTo++;
          }
        }
        this.pieces_.length = copyTo;
        this.pieceNum_ = 0;
      } else {
        this.pieces_ = pathOrString;
        this.pieceNum_ = pieceNum;
      }
    }
    Object.defineProperty(Path2, "Empty", {
      /**
       * Singleton to represent an empty path
       *
       * @const
       */
      get: function() {
        return new Path2("");
      },
      enumerable: false,
      configurable: true
    });
    Path2.prototype.getFront = function() {
      if (this.pieceNum_ >= this.pieces_.length) {
        return null;
      }
      return this.pieces_[this.pieceNum_];
    };
    Path2.prototype.getLength = function() {
      return this.pieces_.length - this.pieceNum_;
    };
    Path2.prototype.popFront = function() {
      var pieceNum = this.pieceNum_;
      if (pieceNum < this.pieces_.length) {
        pieceNum++;
      }
      return new Path2(this.pieces_, pieceNum);
    };
    Path2.prototype.getBack = function() {
      if (this.pieceNum_ < this.pieces_.length) {
        return this.pieces_[this.pieces_.length - 1];
      }
      return null;
    };
    Path2.prototype.toString = function() {
      var pathString = "";
      for (var i = this.pieceNum_; i < this.pieces_.length; i++) {
        if (this.pieces_[i] !== "") {
          pathString += "/" + this.pieces_[i];
        }
      }
      return pathString || "/";
    };
    Path2.prototype.toUrlEncodedString = function() {
      var pathString = "";
      for (var i = this.pieceNum_; i < this.pieces_.length; i++) {
        if (this.pieces_[i] !== "") {
          pathString += "/" + encodeURIComponent(String(this.pieces_[i]));
        }
      }
      return pathString || "/";
    };
    Path2.prototype.slice = function(begin) {
      if (begin === void 0) {
        begin = 0;
      }
      return this.pieces_.slice(this.pieceNum_ + begin);
    };
    Path2.prototype.parent = function() {
      if (this.pieceNum_ >= this.pieces_.length) {
        return null;
      }
      var pieces = [];
      for (var i = this.pieceNum_; i < this.pieces_.length - 1; i++) {
        pieces.push(this.pieces_[i]);
      }
      return new Path2(pieces, 0);
    };
    Path2.prototype.child = function(childPathObj) {
      var pieces = [];
      for (var i = this.pieceNum_; i < this.pieces_.length; i++) {
        pieces.push(this.pieces_[i]);
      }
      if (childPathObj instanceof Path2) {
        for (var i = childPathObj.pieceNum_; i < childPathObj.pieces_.length; i++) {
          pieces.push(childPathObj.pieces_[i]);
        }
      } else {
        var childPieces = childPathObj.split("/");
        for (var i = 0; i < childPieces.length; i++) {
          if (childPieces[i].length > 0) {
            pieces.push(childPieces[i]);
          }
        }
      }
      return new Path2(pieces, 0);
    };
    Path2.prototype.isEmpty = function() {
      return this.pieceNum_ >= this.pieces_.length;
    };
    Path2.relativePath = function(outerPath, innerPath) {
      var outer = outerPath.getFront(), inner = innerPath.getFront();
      if (outer === null) {
        return innerPath;
      } else if (outer === inner) {
        return Path2.relativePath(outerPath.popFront(), innerPath.popFront());
      } else {
        throw new Error("INTERNAL ERROR: innerPath (" + innerPath + ") is not within outerPath (" + outerPath + ")");
      }
    };
    Path2.comparePaths = function(left, right) {
      var leftKeys = left.slice();
      var rightKeys = right.slice();
      for (var i = 0; i < leftKeys.length && i < rightKeys.length; i++) {
        var cmp = nameCompare(leftKeys[i], rightKeys[i]);
        if (cmp !== 0) {
          return cmp;
        }
      }
      if (leftKeys.length === rightKeys.length) {
        return 0;
      }
      return leftKeys.length < rightKeys.length ? -1 : 1;
    };
    Path2.prototype.equals = function(other) {
      if (this.getLength() !== other.getLength()) {
        return false;
      }
      for (var i = this.pieceNum_, j = other.pieceNum_; i <= this.pieces_.length; i++, j++) {
        if (this.pieces_[i] !== other.pieces_[j]) {
          return false;
        }
      }
      return true;
    };
    Path2.prototype.contains = function(other) {
      var i = this.pieceNum_;
      var j = other.pieceNum_;
      if (this.getLength() > other.getLength()) {
        return false;
      }
      while (i < this.pieces_.length) {
        if (this.pieces_[i] !== other.pieces_[j]) {
          return false;
        }
        ++i;
        ++j;
      }
      return true;
    };
    return Path2;
  }()
);
var ValidationPath = (
  /** @class */
  function() {
    function ValidationPath2(path, errorPrefix_) {
      this.errorPrefix_ = errorPrefix_;
      this.parts_ = path.slice();
      this.byteLength_ = Math.max(1, this.parts_.length);
      for (var i = 0; i < this.parts_.length; i++) {
        this.byteLength_ += stringLength(this.parts_[i]);
      }
      this.checkValid_();
    }
    Object.defineProperty(ValidationPath2, "MAX_PATH_DEPTH", {
      /** @const {number} Maximum key depth. */
      get: function() {
        return 32;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(ValidationPath2, "MAX_PATH_LENGTH_BYTES", {
      /** @const {number} Maximum number of (UTF8) bytes in a Firebase path. */
      get: function() {
        return 768;
      },
      enumerable: false,
      configurable: true
    });
    ValidationPath2.prototype.push = function(child) {
      if (this.parts_.length > 0) {
        this.byteLength_ += 1;
      }
      this.parts_.push(child);
      this.byteLength_ += stringLength(child);
      this.checkValid_();
    };
    ValidationPath2.prototype.pop = function() {
      var last = this.parts_.pop();
      this.byteLength_ -= stringLength(last);
      if (this.parts_.length > 0) {
        this.byteLength_ -= 1;
      }
    };
    ValidationPath2.prototype.checkValid_ = function() {
      if (this.byteLength_ > ValidationPath2.MAX_PATH_LENGTH_BYTES) {
        throw new Error(this.errorPrefix_ + "has a key path longer than " + ValidationPath2.MAX_PATH_LENGTH_BYTES + " bytes (" + this.byteLength_ + ").");
      }
      if (this.parts_.length > ValidationPath2.MAX_PATH_DEPTH) {
        throw new Error(this.errorPrefix_ + "path specified exceeds the maximum depth that can be written (" + ValidationPath2.MAX_PATH_DEPTH + ") or object contains a cycle " + this.toErrorString());
      }
    };
    ValidationPath2.prototype.toErrorString = function() {
      if (this.parts_.length === 0) {
        return "";
      }
      return "in property '" + this.parts_.join(".") + "'";
    };
    return ValidationPath2;
  }()
);
var PROTOCOL_VERSION = "5";
var VERSION_PARAM = "v";
var TRANSPORT_SESSION_PARAM = "s";
var REFERER_PARAM = "r";
var FORGE_REF = "f";
var FORGE_DOMAIN = "firebaseio.com";
var LAST_SESSION_PARAM = "ls";
var APPLICATION_ID_PARAM = "p";
var WEBSOCKET = "websocket";
var LONG_POLLING = "long_polling";
var RepoInfo = (
  /** @class */
  function() {
    function RepoInfo2(host, secure, namespace, webSocketOnly, nodeAdmin, persistenceKey, includeNamespaceInQueryParams) {
      if (nodeAdmin === void 0) {
        nodeAdmin = false;
      }
      if (persistenceKey === void 0) {
        persistenceKey = "";
      }
      if (includeNamespaceInQueryParams === void 0) {
        includeNamespaceInQueryParams = false;
      }
      this.secure = secure;
      this.namespace = namespace;
      this.webSocketOnly = webSocketOnly;
      this.nodeAdmin = nodeAdmin;
      this.persistenceKey = persistenceKey;
      this.includeNamespaceInQueryParams = includeNamespaceInQueryParams;
      this.host = host.toLowerCase();
      this.domain = this.host.substr(this.host.indexOf(".") + 1);
      this.internalHost = PersistentStorage.get("host:" + host) || this.host;
    }
    RepoInfo2.prototype.needsQueryParam = function() {
      return this.host !== this.internalHost || this.isCustomHost() || this.includeNamespaceInQueryParams;
    };
    RepoInfo2.prototype.isCacheableHost = function() {
      return this.internalHost.substr(0, 2) === "s-";
    };
    RepoInfo2.prototype.isDemoHost = function() {
      return this.domain === "firebaseio-demo.com";
    };
    RepoInfo2.prototype.isCustomHost = function() {
      return this.domain !== "firebaseio.com" && this.domain !== "firebaseio-demo.com";
    };
    RepoInfo2.prototype.updateHost = function(newHost) {
      if (newHost !== this.internalHost) {
        this.internalHost = newHost;
        if (this.isCacheableHost()) {
          PersistentStorage.set("host:" + this.host, this.internalHost);
        }
      }
    };
    RepoInfo2.prototype.connectionURL = function(type, params) {
      assert(typeof type === "string", "typeof type must == string");
      assert(typeof params === "object", "typeof params must == object");
      var connURL;
      if (type === WEBSOCKET) {
        connURL = (this.secure ? "wss://" : "ws://") + this.internalHost + "/.ws?";
      } else if (type === LONG_POLLING) {
        connURL = (this.secure ? "https://" : "http://") + this.internalHost + "/.lp?";
      } else {
        throw new Error("Unknown connection type: " + type);
      }
      if (this.needsQueryParam()) {
        params["ns"] = this.namespace;
      }
      var pairs = [];
      each(params, function(key, value) {
        pairs.push(key + "=" + value);
      });
      return connURL + pairs.join("&");
    };
    RepoInfo2.prototype.toString = function() {
      var str = this.toURLString();
      if (this.persistenceKey) {
        str += "<" + this.persistenceKey + ">";
      }
      return str;
    };
    RepoInfo2.prototype.toURLString = function() {
      return (this.secure ? "https://" : "http://") + this.host;
    };
    return RepoInfo2;
  }()
);
function decodePath(pathString) {
  var pathStringDecoded = "";
  var pieces = pathString.split("/");
  for (var i = 0; i < pieces.length; i++) {
    if (pieces[i].length > 0) {
      var piece = pieces[i];
      try {
        piece = decodeURIComponent(piece.replace(/\+/g, " "));
      } catch (e) {
      }
      pathStringDecoded += "/" + piece;
    }
  }
  return pathStringDecoded;
}
function decodeQuery(queryString) {
  var e_1, _a;
  var results = {};
  if (queryString.charAt(0) === "?") {
    queryString = queryString.substring(1);
  }
  try {
    for (var _b = __values(queryString.split("&")), _c = _b.next(); !_c.done; _c = _b.next()) {
      var segment = _c.value;
      if (segment.length === 0) {
        continue;
      }
      var kv = segment.split("=");
      if (kv.length === 2) {
        results[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
      } else {
        warn("Invalid query segment '" + segment + "' in query '" + queryString + "'");
      }
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (_c && !_c.done && (_a = _b.return))
        _a.call(_b);
    } finally {
      if (e_1)
        throw e_1.error;
    }
  }
  return results;
}
var parseRepoInfo = function(dataURL, nodeAdmin) {
  var parsedUrl = parseDatabaseURL(dataURL), namespace = parsedUrl.namespace;
  if (parsedUrl.domain === "firebase.com") {
    fatal(parsedUrl.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
  }
  if ((!namespace || namespace === "undefined") && parsedUrl.domain !== "localhost") {
    fatal("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");
  }
  if (!parsedUrl.secure) {
    warnIfPageIsSecure();
  }
  var webSocketOnly = parsedUrl.scheme === "ws" || parsedUrl.scheme === "wss";
  return {
    repoInfo: new RepoInfo(
      parsedUrl.host,
      parsedUrl.secure,
      namespace,
      nodeAdmin,
      webSocketOnly,
      /*persistenceKey=*/
      "",
      /*includeNamespaceInQueryParams=*/
      namespace !== parsedUrl.subdomain
    ),
    path: new Path(parsedUrl.pathString)
  };
};
var parseDatabaseURL = function(dataURL) {
  var host = "", domain = "", subdomain = "", pathString = "", namespace = "";
  var secure = true, scheme = "https", port = 443;
  if (typeof dataURL === "string") {
    var colonInd = dataURL.indexOf("//");
    if (colonInd >= 0) {
      scheme = dataURL.substring(0, colonInd - 1);
      dataURL = dataURL.substring(colonInd + 2);
    }
    var slashInd = dataURL.indexOf("/");
    if (slashInd === -1) {
      slashInd = dataURL.length;
    }
    var questionMarkInd = dataURL.indexOf("?");
    if (questionMarkInd === -1) {
      questionMarkInd = dataURL.length;
    }
    host = dataURL.substring(0, Math.min(slashInd, questionMarkInd));
    if (slashInd < questionMarkInd) {
      pathString = decodePath(dataURL.substring(slashInd, questionMarkInd));
    }
    var queryParams = decodeQuery(dataURL.substring(Math.min(dataURL.length, questionMarkInd)));
    colonInd = host.indexOf(":");
    if (colonInd >= 0) {
      secure = scheme === "https" || scheme === "wss";
      port = parseInt(host.substring(colonInd + 1), 10);
    } else {
      colonInd = host.length;
    }
    var hostWithoutPort = host.slice(0, colonInd);
    if (hostWithoutPort.toLowerCase() === "localhost") {
      domain = "localhost";
    } else if (hostWithoutPort.split(".").length <= 2) {
      domain = hostWithoutPort;
    } else {
      var dotInd = host.indexOf(".");
      subdomain = host.substring(0, dotInd).toLowerCase();
      domain = host.substring(dotInd + 1);
      namespace = subdomain;
    }
    if ("ns" in queryParams) {
      namespace = queryParams["ns"];
    }
  }
  return {
    host,
    port,
    domain,
    subdomain,
    secure,
    scheme,
    pathString,
    namespace
  };
};
var INVALID_KEY_REGEX_ = /[\[\].#$\/\u0000-\u001F\u007F]/;
var INVALID_PATH_REGEX_ = /[\[\].#$\u0000-\u001F\u007F]/;
var MAX_LEAF_SIZE_ = 10 * 1024 * 1024;
var isValidKey = function(key) {
  return typeof key === "string" && key.length !== 0 && !INVALID_KEY_REGEX_.test(key);
};
var isValidPathString = function(pathString) {
  return typeof pathString === "string" && pathString.length !== 0 && !INVALID_PATH_REGEX_.test(pathString);
};
var isValidRootPathString = function(pathString) {
  if (pathString) {
    pathString = pathString.replace(/^\/*\.info(\/|$)/, "/");
  }
  return isValidPathString(pathString);
};
var isValidPriority = function(priority) {
  return priority === null || typeof priority === "string" || typeof priority === "number" && !isInvalidJSONNumber(priority) || priority && typeof priority === "object" && // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contains(priority, ".sv");
};
var validateFirebaseDataArg = function(fnName, argumentNumber, data, path, optional) {
  if (optional && data === void 0) {
    return;
  }
  validateFirebaseData(errorPrefix(fnName, argumentNumber, optional), data, path);
};
var validateFirebaseData = function(errorPrefix2, data, path_) {
  var path = path_ instanceof Path ? new ValidationPath(path_, errorPrefix2) : path_;
  if (data === void 0) {
    throw new Error(errorPrefix2 + "contains undefined " + path.toErrorString());
  }
  if (typeof data === "function") {
    throw new Error(errorPrefix2 + "contains a function " + path.toErrorString() + " with contents = " + data.toString());
  }
  if (isInvalidJSONNumber(data)) {
    throw new Error(errorPrefix2 + "contains " + data.toString() + " " + path.toErrorString());
  }
  if (typeof data === "string" && data.length > MAX_LEAF_SIZE_ / 3 && stringLength(data) > MAX_LEAF_SIZE_) {
    throw new Error(errorPrefix2 + "contains a string greater than " + MAX_LEAF_SIZE_ + " utf8 bytes " + path.toErrorString() + " ('" + data.substring(0, 50) + "...')");
  }
  if (data && typeof data === "object") {
    var hasDotValue_1 = false;
    var hasActualChild_1 = false;
    each(data, function(key, value) {
      if (key === ".value") {
        hasDotValue_1 = true;
      } else if (key !== ".priority" && key !== ".sv") {
        hasActualChild_1 = true;
        if (!isValidKey(key)) {
          throw new Error(errorPrefix2 + " contains an invalid key (" + key + ") " + path.toErrorString() + `.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);
        }
      }
      path.push(key);
      validateFirebaseData(errorPrefix2, value, path);
      path.pop();
    });
    if (hasDotValue_1 && hasActualChild_1) {
      throw new Error(errorPrefix2 + ' contains ".value" child ' + path.toErrorString() + " in addition to actual children.");
    }
  }
};
var validateFirebaseMergePaths = function(errorPrefix2, mergePaths) {
  var i, curPath;
  for (i = 0; i < mergePaths.length; i++) {
    curPath = mergePaths[i];
    var keys = curPath.slice();
    for (var j = 0; j < keys.length; j++) {
      if (keys[j] === ".priority" && j === keys.length - 1)
        ;
      else if (!isValidKey(keys[j])) {
        throw new Error(errorPrefix2 + "contains an invalid key (" + keys[j] + ") in path " + curPath.toString() + `. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);
      }
    }
  }
  mergePaths.sort(Path.comparePaths);
  var prevPath = null;
  for (i = 0; i < mergePaths.length; i++) {
    curPath = mergePaths[i];
    if (prevPath !== null && prevPath.contains(curPath)) {
      throw new Error(errorPrefix2 + "contains a path " + prevPath.toString() + " that is ancestor of another path " + curPath.toString());
    }
    prevPath = curPath;
  }
};
var validateFirebaseMergeDataArg = function(fnName, argumentNumber, data, path, optional) {
  if (optional && data === void 0) {
    return;
  }
  var errorPrefix$1 = errorPrefix(fnName, argumentNumber, optional);
  if (!(data && typeof data === "object") || Array.isArray(data)) {
    throw new Error(errorPrefix$1 + " must be an object containing the children to replace.");
  }
  var mergePaths = [];
  each(data, function(key, value) {
    var curPath = new Path(key);
    validateFirebaseData(errorPrefix$1, value, path.child(curPath));
    if (curPath.getBack() === ".priority") {
      if (!isValidPriority(value)) {
        throw new Error(errorPrefix$1 + "contains an invalid value for '" + curPath.toString() + "', which must be a valid Firebase priority (a string, finite number, server value, or null).");
      }
    }
    mergePaths.push(curPath);
  });
  validateFirebaseMergePaths(errorPrefix$1, mergePaths);
};
var validatePriority = function(fnName, argumentNumber, priority, optional) {
  if (optional && priority === void 0) {
    return;
  }
  if (isInvalidJSONNumber(priority)) {
    throw new Error(errorPrefix(fnName, argumentNumber, optional) + "is " + priority.toString() + ", but must be a valid Firebase priority (a string, finite number, server value, or null).");
  }
  if (!isValidPriority(priority)) {
    throw new Error(errorPrefix(fnName, argumentNumber, optional) + "must be a valid Firebase priority (a string, finite number, server value, or null).");
  }
};
var validateEventType = function(fnName, argumentNumber, eventType, optional) {
  if (optional && eventType === void 0) {
    return;
  }
  switch (eventType) {
    case "value":
    case "child_added":
    case "child_removed":
    case "child_changed":
    case "child_moved":
      break;
    default:
      throw new Error(errorPrefix(fnName, argumentNumber, optional) + 'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".');
  }
};
var validateKey = function(fnName, argumentNumber, key, optional) {
  if (optional && key === void 0) {
    return;
  }
  if (!isValidKey(key)) {
    throw new Error(errorPrefix(fnName, argumentNumber, optional) + 'was an invalid key = "' + key + `".  Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]").`);
  }
};
var validatePathString = function(fnName, argumentNumber, pathString, optional) {
  if (optional && pathString === void 0) {
    return;
  }
  if (!isValidPathString(pathString)) {
    throw new Error(errorPrefix(fnName, argumentNumber, optional) + 'was an invalid path = "' + pathString + `". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`);
  }
};
var validateRootPathString = function(fnName, argumentNumber, pathString, optional) {
  if (pathString) {
    pathString = pathString.replace(/^\/*\.info(\/|$)/, "/");
  }
  validatePathString(fnName, argumentNumber, pathString, optional);
};
var validateWritablePath = function(fnName, path) {
  if (path.getFront() === ".info") {
    throw new Error(fnName + " failed = Can't modify data under /.info/");
  }
};
var validateUrl = function(fnName, argumentNumber, parsedUrl) {
  var pathString = parsedUrl.path.toString();
  if (!(typeof parsedUrl.repoInfo.host === "string") || parsedUrl.repoInfo.host.length === 0 || !isValidKey(parsedUrl.repoInfo.namespace) && parsedUrl.repoInfo.host.split(":")[0] !== "localhost" || pathString.length !== 0 && !isValidRootPathString(pathString)) {
    throw new Error(errorPrefix(fnName, argumentNumber, false) + `must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`);
  }
};
var validateBoolean = function(fnName, argumentNumber, bool, optional) {
  if (optional && bool === void 0) {
    return;
  }
  if (typeof bool !== "boolean") {
    throw new Error(errorPrefix(fnName, argumentNumber, optional) + "must be a boolean.");
  }
};
var OnDisconnect = (
  /** @class */
  function() {
    function OnDisconnect2(repo_, path_) {
      this.repo_ = repo_;
      this.path_ = path_;
    }
    OnDisconnect2.prototype.cancel = function(onComplete) {
      validateArgCount("OnDisconnect.cancel", 0, 1, arguments.length);
      validateCallback("OnDisconnect.cancel", 1, onComplete, true);
      var deferred = new Deferred();
      this.repo_.onDisconnectCancel(this.path_, deferred.wrapCallback(onComplete));
      return deferred.promise;
    };
    OnDisconnect2.prototype.remove = function(onComplete) {
      validateArgCount("OnDisconnect.remove", 0, 1, arguments.length);
      validateWritablePath("OnDisconnect.remove", this.path_);
      validateCallback("OnDisconnect.remove", 1, onComplete, true);
      var deferred = new Deferred();
      this.repo_.onDisconnectSet(this.path_, null, deferred.wrapCallback(onComplete));
      return deferred.promise;
    };
    OnDisconnect2.prototype.set = function(value, onComplete) {
      validateArgCount("OnDisconnect.set", 1, 2, arguments.length);
      validateWritablePath("OnDisconnect.set", this.path_);
      validateFirebaseDataArg("OnDisconnect.set", 1, value, this.path_, false);
      validateCallback("OnDisconnect.set", 2, onComplete, true);
      var deferred = new Deferred();
      this.repo_.onDisconnectSet(this.path_, value, deferred.wrapCallback(onComplete));
      return deferred.promise;
    };
    OnDisconnect2.prototype.setWithPriority = function(value, priority, onComplete) {
      validateArgCount("OnDisconnect.setWithPriority", 2, 3, arguments.length);
      validateWritablePath("OnDisconnect.setWithPriority", this.path_);
      validateFirebaseDataArg("OnDisconnect.setWithPriority", 1, value, this.path_, false);
      validatePriority("OnDisconnect.setWithPriority", 2, priority, false);
      validateCallback("OnDisconnect.setWithPriority", 3, onComplete, true);
      var deferred = new Deferred();
      this.repo_.onDisconnectSetWithPriority(this.path_, value, priority, deferred.wrapCallback(onComplete));
      return deferred.promise;
    };
    OnDisconnect2.prototype.update = function(objectToMerge, onComplete) {
      validateArgCount("OnDisconnect.update", 1, 2, arguments.length);
      validateWritablePath("OnDisconnect.update", this.path_);
      if (Array.isArray(objectToMerge)) {
        var newObjectToMerge = {};
        for (var i = 0; i < objectToMerge.length; ++i) {
          newObjectToMerge["" + i] = objectToMerge[i];
        }
        objectToMerge = newObjectToMerge;
        warn("Passing an Array to firebase.database.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.");
      }
      validateFirebaseMergeDataArg("OnDisconnect.update", 1, objectToMerge, this.path_, false);
      validateCallback("OnDisconnect.update", 2, onComplete, true);
      var deferred = new Deferred();
      this.repo_.onDisconnectUpdate(this.path_, objectToMerge, deferred.wrapCallback(onComplete));
      return deferred.promise;
    };
    return OnDisconnect2;
  }()
);
var TransactionResult = (
  /** @class */
  function() {
    function TransactionResult2(committed, snapshot) {
      this.committed = committed;
      this.snapshot = snapshot;
    }
    TransactionResult2.prototype.toJSON = function() {
      validateArgCount("TransactionResult.toJSON", 0, 1, arguments.length);
      return { committed: this.committed, snapshot: this.snapshot.toJSON() };
    };
    return TransactionResult2;
  }()
);
var nextPushId = /* @__PURE__ */ function() {
  var PUSH_CHARS = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
  var lastPushTime = 0;
  var lastRandChars = [];
  return function(now) {
    var duplicateTime = now === lastPushTime;
    lastPushTime = now;
    var i;
    var timeStampChars = new Array(8);
    for (i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }
    assert(now === 0, "Cannot push at time == 0");
    var id = timeStampChars.join("");
    if (!duplicateTime) {
      for (i = 0; i < 12; i++) {
        lastRandChars[i] = Math.floor(Math.random() * 64);
      }
    } else {
      for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
        lastRandChars[i] = 0;
      }
      lastRandChars[i]++;
    }
    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }
    assert(id.length === 20, "nextPushId: Length should be 20.");
    return id;
  };
}();
var NamedNode = (
  /** @class */
  function() {
    function NamedNode2(name2, node) {
      this.name = name2;
      this.node = node;
    }
    NamedNode2.Wrap = function(name2, node) {
      return new NamedNode2(name2, node);
    };
    return NamedNode2;
  }()
);
var Index = (
  /** @class */
  function() {
    function Index2() {
    }
    Index2.prototype.getCompare = function() {
      return this.compare.bind(this);
    };
    Index2.prototype.indexedValueChanged = function(oldNode, newNode) {
      var oldWrapped = new NamedNode(MIN_NAME, oldNode);
      var newWrapped = new NamedNode(MIN_NAME, newNode);
      return this.compare(oldWrapped, newWrapped) !== 0;
    };
    Index2.prototype.minPost = function() {
      return NamedNode.MIN;
    };
    return Index2;
  }()
);
var __EMPTY_NODE;
var KeyIndex = (
  /** @class */
  function(_super) {
    __extends(KeyIndex2, _super);
    function KeyIndex2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(KeyIndex2, "__EMPTY_NODE", {
      get: function() {
        return __EMPTY_NODE;
      },
      set: function(val) {
        __EMPTY_NODE = val;
      },
      enumerable: false,
      configurable: true
    });
    KeyIndex2.prototype.compare = function(a, b) {
      return nameCompare(a.name, b.name);
    };
    KeyIndex2.prototype.isDefinedOn = function(node) {
      throw assertionError("KeyIndex.isDefinedOn not expected to be called.");
    };
    KeyIndex2.prototype.indexedValueChanged = function(oldNode, newNode) {
      return false;
    };
    KeyIndex2.prototype.minPost = function() {
      return NamedNode.MIN;
    };
    KeyIndex2.prototype.maxPost = function() {
      return new NamedNode(MAX_NAME, __EMPTY_NODE);
    };
    KeyIndex2.prototype.makePost = function(indexValue, name2) {
      assert(typeof indexValue === "string", "KeyIndex indexValue must always be a string.");
      return new NamedNode(indexValue, __EMPTY_NODE);
    };
    KeyIndex2.prototype.toString = function() {
      return ".key";
    };
    return KeyIndex2;
  }(Index)
);
var KEY_INDEX = new KeyIndex();
var MAX_NODE;
function setMaxNode(val) {
  MAX_NODE = val;
}
var priorityHashText = function(priority) {
  if (typeof priority === "number") {
    return "number:" + doubleToIEEE754String(priority);
  } else {
    return "string:" + priority;
  }
};
var validatePriorityNode = function(priorityNode) {
  if (priorityNode.isLeafNode()) {
    var val = priorityNode.val();
    assert(typeof val === "string" || typeof val === "number" || typeof val === "object" && contains(val, ".sv"), "Priority must be a string or number.");
  } else {
    assert(priorityNode === MAX_NODE || priorityNode.isEmpty(), "priority of unexpected type.");
  }
  assert(priorityNode === MAX_NODE || priorityNode.getPriority().isEmpty(), "Priority nodes can't have a priority of their own.");
};
var __childrenNodeConstructor;
var LeafNode = (
  /** @class */
  function() {
    function LeafNode2(value_, priorityNode_) {
      if (priorityNode_ === void 0) {
        priorityNode_ = LeafNode2.__childrenNodeConstructor.EMPTY_NODE;
      }
      this.value_ = value_;
      this.priorityNode_ = priorityNode_;
      this.lazyHash_ = null;
      assert(this.value_ !== void 0 && this.value_ !== null, "LeafNode shouldn't be created with null/undefined value.");
      validatePriorityNode(this.priorityNode_);
    }
    Object.defineProperty(LeafNode2, "__childrenNodeConstructor", {
      get: function() {
        return __childrenNodeConstructor;
      },
      set: function(val) {
        __childrenNodeConstructor = val;
      },
      enumerable: false,
      configurable: true
    });
    LeafNode2.prototype.isLeafNode = function() {
      return true;
    };
    LeafNode2.prototype.getPriority = function() {
      return this.priorityNode_;
    };
    LeafNode2.prototype.updatePriority = function(newPriorityNode) {
      return new LeafNode2(this.value_, newPriorityNode);
    };
    LeafNode2.prototype.getImmediateChild = function(childName) {
      if (childName === ".priority") {
        return this.priorityNode_;
      } else {
        return LeafNode2.__childrenNodeConstructor.EMPTY_NODE;
      }
    };
    LeafNode2.prototype.getChild = function(path) {
      if (path.isEmpty()) {
        return this;
      } else if (path.getFront() === ".priority") {
        return this.priorityNode_;
      } else {
        return LeafNode2.__childrenNodeConstructor.EMPTY_NODE;
      }
    };
    LeafNode2.prototype.hasChild = function() {
      return false;
    };
    LeafNode2.prototype.getPredecessorChildName = function(childName, childNode) {
      return null;
    };
    LeafNode2.prototype.updateImmediateChild = function(childName, newChildNode) {
      if (childName === ".priority") {
        return this.updatePriority(newChildNode);
      } else if (newChildNode.isEmpty() && childName !== ".priority") {
        return this;
      } else {
        return LeafNode2.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(childName, newChildNode).updatePriority(this.priorityNode_);
      }
    };
    LeafNode2.prototype.updateChild = function(path, newChildNode) {
      var front = path.getFront();
      if (front === null) {
        return newChildNode;
      } else if (newChildNode.isEmpty() && front !== ".priority") {
        return this;
      } else {
        assert(front !== ".priority" || path.getLength() === 1, ".priority must be the last token in a path");
        return this.updateImmediateChild(front, LeafNode2.__childrenNodeConstructor.EMPTY_NODE.updateChild(path.popFront(), newChildNode));
      }
    };
    LeafNode2.prototype.isEmpty = function() {
      return false;
    };
    LeafNode2.prototype.numChildren = function() {
      return 0;
    };
    LeafNode2.prototype.forEachChild = function(index, action) {
      return false;
    };
    LeafNode2.prototype.val = function(exportFormat) {
      if (exportFormat && !this.getPriority().isEmpty()) {
        return {
          ".value": this.getValue(),
          ".priority": this.getPriority().val()
        };
      } else {
        return this.getValue();
      }
    };
    LeafNode2.prototype.hash = function() {
      if (this.lazyHash_ === null) {
        var toHash = "";
        if (!this.priorityNode_.isEmpty()) {
          toHash += "priority:" + priorityHashText(this.priorityNode_.val()) + ":";
        }
        var type = typeof this.value_;
        toHash += type + ":";
        if (type === "number") {
          toHash += doubleToIEEE754String(this.value_);
        } else {
          toHash += this.value_;
        }
        this.lazyHash_ = sha1(toHash);
      }
      return this.lazyHash_;
    };
    LeafNode2.prototype.getValue = function() {
      return this.value_;
    };
    LeafNode2.prototype.compareTo = function(other) {
      if (other === LeafNode2.__childrenNodeConstructor.EMPTY_NODE) {
        return 1;
      } else if (other instanceof LeafNode2.__childrenNodeConstructor) {
        return -1;
      } else {
        assert(other.isLeafNode(), "Unknown node type");
        return this.compareToLeafNode_(other);
      }
    };
    LeafNode2.prototype.compareToLeafNode_ = function(otherLeaf) {
      var otherLeafType = typeof otherLeaf.value_;
      var thisLeafType = typeof this.value_;
      var otherIndex = LeafNode2.VALUE_TYPE_ORDER.indexOf(otherLeafType);
      var thisIndex = LeafNode2.VALUE_TYPE_ORDER.indexOf(thisLeafType);
      assert(otherIndex >= 0, "Unknown leaf type: " + otherLeafType);
      assert(thisIndex >= 0, "Unknown leaf type: " + thisLeafType);
      if (otherIndex === thisIndex) {
        if (thisLeafType === "object") {
          return 0;
        } else {
          if (this.value_ < otherLeaf.value_) {
            return -1;
          } else if (this.value_ === otherLeaf.value_) {
            return 0;
          } else {
            return 1;
          }
        }
      } else {
        return thisIndex - otherIndex;
      }
    };
    LeafNode2.prototype.withIndex = function() {
      return this;
    };
    LeafNode2.prototype.isIndexed = function() {
      return true;
    };
    LeafNode2.prototype.equals = function(other) {
      if (other === this) {
        return true;
      } else if (other.isLeafNode()) {
        var otherLeaf = other;
        return this.value_ === otherLeaf.value_ && this.priorityNode_.equals(otherLeaf.priorityNode_);
      } else {
        return false;
      }
    };
    LeafNode2.VALUE_TYPE_ORDER = ["object", "boolean", "number", "string"];
    return LeafNode2;
  }()
);
var nodeFromJSON;
var MAX_NODE$1;
function setNodeFromJSON(val) {
  nodeFromJSON = val;
}
function setMaxNode$1(val) {
  MAX_NODE$1 = val;
}
var PriorityIndex = (
  /** @class */
  function(_super) {
    __extends(PriorityIndex2, _super);
    function PriorityIndex2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    PriorityIndex2.prototype.compare = function(a, b) {
      var aPriority = a.node.getPriority();
      var bPriority = b.node.getPriority();
      var indexCmp = aPriority.compareTo(bPriority);
      if (indexCmp === 0) {
        return nameCompare(a.name, b.name);
      } else {
        return indexCmp;
      }
    };
    PriorityIndex2.prototype.isDefinedOn = function(node) {
      return !node.getPriority().isEmpty();
    };
    PriorityIndex2.prototype.indexedValueChanged = function(oldNode, newNode) {
      return !oldNode.getPriority().equals(newNode.getPriority());
    };
    PriorityIndex2.prototype.minPost = function() {
      return NamedNode.MIN;
    };
    PriorityIndex2.prototype.maxPost = function() {
      return new NamedNode(MAX_NAME, new LeafNode("[PRIORITY-POST]", MAX_NODE$1));
    };
    PriorityIndex2.prototype.makePost = function(indexValue, name2) {
      var priorityNode = nodeFromJSON(indexValue);
      return new NamedNode(name2, new LeafNode("[PRIORITY-POST]", priorityNode));
    };
    PriorityIndex2.prototype.toString = function() {
      return ".priority";
    };
    return PriorityIndex2;
  }(Index)
);
var PRIORITY_INDEX = new PriorityIndex();
var SortedMapIterator = (
  /** @class */
  function() {
    function SortedMapIterator2(node, startKey, comparator, isReverse_, resultGenerator_) {
      if (resultGenerator_ === void 0) {
        resultGenerator_ = null;
      }
      this.isReverse_ = isReverse_;
      this.resultGenerator_ = resultGenerator_;
      this.nodeStack_ = [];
      var cmp = 1;
      while (!node.isEmpty()) {
        node = node;
        cmp = startKey ? comparator(node.key, startKey) : 1;
        if (isReverse_) {
          cmp *= -1;
        }
        if (cmp < 0) {
          if (this.isReverse_) {
            node = node.left;
          } else {
            node = node.right;
          }
        } else if (cmp === 0) {
          this.nodeStack_.push(node);
          break;
        } else {
          this.nodeStack_.push(node);
          if (this.isReverse_) {
            node = node.right;
          } else {
            node = node.left;
          }
        }
      }
    }
    SortedMapIterator2.prototype.getNext = function() {
      if (this.nodeStack_.length === 0) {
        return null;
      }
      var node = this.nodeStack_.pop();
      var result;
      if (this.resultGenerator_) {
        result = this.resultGenerator_(node.key, node.value);
      } else {
        result = { key: node.key, value: node.value };
      }
      if (this.isReverse_) {
        node = node.left;
        while (!node.isEmpty()) {
          this.nodeStack_.push(node);
          node = node.right;
        }
      } else {
        node = node.right;
        while (!node.isEmpty()) {
          this.nodeStack_.push(node);
          node = node.left;
        }
      }
      return result;
    };
    SortedMapIterator2.prototype.hasNext = function() {
      return this.nodeStack_.length > 0;
    };
    SortedMapIterator2.prototype.peek = function() {
      if (this.nodeStack_.length === 0) {
        return null;
      }
      var node = this.nodeStack_[this.nodeStack_.length - 1];
      if (this.resultGenerator_) {
        return this.resultGenerator_(node.key, node.value);
      } else {
        return { key: node.key, value: node.value };
      }
    };
    return SortedMapIterator2;
  }()
);
var LLRBNode = (
  /** @class */
  function() {
    function LLRBNode2(key, value, color, left, right) {
      this.key = key;
      this.value = value;
      this.color = color != null ? color : LLRBNode2.RED;
      this.left = left != null ? left : SortedMap.EMPTY_NODE;
      this.right = right != null ? right : SortedMap.EMPTY_NODE;
    }
    LLRBNode2.prototype.copy = function(key, value, color, left, right) {
      return new LLRBNode2(key != null ? key : this.key, value != null ? value : this.value, color != null ? color : this.color, left != null ? left : this.left, right != null ? right : this.right);
    };
    LLRBNode2.prototype.count = function() {
      return this.left.count() + 1 + this.right.count();
    };
    LLRBNode2.prototype.isEmpty = function() {
      return false;
    };
    LLRBNode2.prototype.inorderTraversal = function(action) {
      return this.left.inorderTraversal(action) || !!action(this.key, this.value) || this.right.inorderTraversal(action);
    };
    LLRBNode2.prototype.reverseTraversal = function(action) {
      return this.right.reverseTraversal(action) || action(this.key, this.value) || this.left.reverseTraversal(action);
    };
    LLRBNode2.prototype.min_ = function() {
      if (this.left.isEmpty()) {
        return this;
      } else {
        return this.left.min_();
      }
    };
    LLRBNode2.prototype.minKey = function() {
      return this.min_().key;
    };
    LLRBNode2.prototype.maxKey = function() {
      if (this.right.isEmpty()) {
        return this.key;
      } else {
        return this.right.maxKey();
      }
    };
    LLRBNode2.prototype.insert = function(key, value, comparator) {
      var n = this;
      var cmp = comparator(key, n.key);
      if (cmp < 0) {
        n = n.copy(null, null, null, n.left.insert(key, value, comparator), null);
      } else if (cmp === 0) {
        n = n.copy(null, value, null, null, null);
      } else {
        n = n.copy(null, null, null, null, n.right.insert(key, value, comparator));
      }
      return n.fixUp_();
    };
    LLRBNode2.prototype.removeMin_ = function() {
      if (this.left.isEmpty()) {
        return SortedMap.EMPTY_NODE;
      }
      var n = this;
      if (!n.left.isRed_() && !n.left.left.isRed_()) {
        n = n.moveRedLeft_();
      }
      n = n.copy(null, null, null, n.left.removeMin_(), null);
      return n.fixUp_();
    };
    LLRBNode2.prototype.remove = function(key, comparator) {
      var n, smallest;
      n = this;
      if (comparator(key, n.key) < 0) {
        if (!n.left.isEmpty() && !n.left.isRed_() && !n.left.left.isRed_()) {
          n = n.moveRedLeft_();
        }
        n = n.copy(null, null, null, n.left.remove(key, comparator), null);
      } else {
        if (n.left.isRed_()) {
          n = n.rotateRight_();
        }
        if (!n.right.isEmpty() && !n.right.isRed_() && !n.right.left.isRed_()) {
          n = n.moveRedRight_();
        }
        if (comparator(key, n.key) === 0) {
          if (n.right.isEmpty()) {
            return SortedMap.EMPTY_NODE;
          } else {
            smallest = n.right.min_();
            n = n.copy(smallest.key, smallest.value, null, null, n.right.removeMin_());
          }
        }
        n = n.copy(null, null, null, null, n.right.remove(key, comparator));
      }
      return n.fixUp_();
    };
    LLRBNode2.prototype.isRed_ = function() {
      return this.color;
    };
    LLRBNode2.prototype.fixUp_ = function() {
      var n = this;
      if (n.right.isRed_() && !n.left.isRed_()) {
        n = n.rotateLeft_();
      }
      if (n.left.isRed_() && n.left.left.isRed_()) {
        n = n.rotateRight_();
      }
      if (n.left.isRed_() && n.right.isRed_()) {
        n = n.colorFlip_();
      }
      return n;
    };
    LLRBNode2.prototype.moveRedLeft_ = function() {
      var n = this.colorFlip_();
      if (n.right.left.isRed_()) {
        n = n.copy(null, null, null, null, n.right.rotateRight_());
        n = n.rotateLeft_();
        n = n.colorFlip_();
      }
      return n;
    };
    LLRBNode2.prototype.moveRedRight_ = function() {
      var n = this.colorFlip_();
      if (n.left.left.isRed_()) {
        n = n.rotateRight_();
        n = n.colorFlip_();
      }
      return n;
    };
    LLRBNode2.prototype.rotateLeft_ = function() {
      var nl = this.copy(null, null, LLRBNode2.RED, null, this.right.left);
      return this.right.copy(null, null, this.color, nl, null);
    };
    LLRBNode2.prototype.rotateRight_ = function() {
      var nr = this.copy(null, null, LLRBNode2.RED, this.left.right, null);
      return this.left.copy(null, null, this.color, null, nr);
    };
    LLRBNode2.prototype.colorFlip_ = function() {
      var left = this.left.copy(null, null, !this.left.color, null, null);
      var right = this.right.copy(null, null, !this.right.color, null, null);
      return this.copy(null, null, !this.color, left, right);
    };
    LLRBNode2.prototype.checkMaxDepth_ = function() {
      var blackDepth = this.check_();
      return Math.pow(2, blackDepth) <= this.count() + 1;
    };
    LLRBNode2.prototype.check_ = function() {
      if (this.isRed_() && this.left.isRed_()) {
        throw new Error("Red node has red child(" + this.key + "," + this.value + ")");
      }
      if (this.right.isRed_()) {
        throw new Error("Right child of (" + this.key + "," + this.value + ") is red");
      }
      var blackDepth = this.left.check_();
      if (blackDepth !== this.right.check_()) {
        throw new Error("Black depths differ");
      } else {
        return blackDepth + (this.isRed_() ? 0 : 1);
      }
    };
    LLRBNode2.RED = true;
    LLRBNode2.BLACK = false;
    return LLRBNode2;
  }()
);
var LLRBEmptyNode = (
  /** @class */
  function() {
    function LLRBEmptyNode2() {
    }
    LLRBEmptyNode2.prototype.copy = function(key, value, color, left, right) {
      return this;
    };
    LLRBEmptyNode2.prototype.insert = function(key, value, comparator) {
      return new LLRBNode(key, value, null);
    };
    LLRBEmptyNode2.prototype.remove = function(key, comparator) {
      return this;
    };
    LLRBEmptyNode2.prototype.count = function() {
      return 0;
    };
    LLRBEmptyNode2.prototype.isEmpty = function() {
      return true;
    };
    LLRBEmptyNode2.prototype.inorderTraversal = function(action) {
      return false;
    };
    LLRBEmptyNode2.prototype.reverseTraversal = function(action) {
      return false;
    };
    LLRBEmptyNode2.prototype.minKey = function() {
      return null;
    };
    LLRBEmptyNode2.prototype.maxKey = function() {
      return null;
    };
    LLRBEmptyNode2.prototype.check_ = function() {
      return 0;
    };
    LLRBEmptyNode2.prototype.isRed_ = function() {
      return false;
    };
    return LLRBEmptyNode2;
  }()
);
var SortedMap = (
  /** @class */
  function() {
    function SortedMap2(comparator_, root_) {
      if (root_ === void 0) {
        root_ = SortedMap2.EMPTY_NODE;
      }
      this.comparator_ = comparator_;
      this.root_ = root_;
    }
    SortedMap2.prototype.insert = function(key, value) {
      return new SortedMap2(this.comparator_, this.root_.insert(key, value, this.comparator_).copy(null, null, LLRBNode.BLACK, null, null));
    };
    SortedMap2.prototype.remove = function(key) {
      return new SortedMap2(this.comparator_, this.root_.remove(key, this.comparator_).copy(null, null, LLRBNode.BLACK, null, null));
    };
    SortedMap2.prototype.get = function(key) {
      var cmp;
      var node = this.root_;
      while (!node.isEmpty()) {
        cmp = this.comparator_(key, node.key);
        if (cmp === 0) {
          return node.value;
        } else if (cmp < 0) {
          node = node.left;
        } else if (cmp > 0) {
          node = node.right;
        }
      }
      return null;
    };
    SortedMap2.prototype.getPredecessorKey = function(key) {
      var cmp, node = this.root_, rightParent = null;
      while (!node.isEmpty()) {
        cmp = this.comparator_(key, node.key);
        if (cmp === 0) {
          if (!node.left.isEmpty()) {
            node = node.left;
            while (!node.right.isEmpty()) {
              node = node.right;
            }
            return node.key;
          } else if (rightParent) {
            return rightParent.key;
          } else {
            return null;
          }
        } else if (cmp < 0) {
          node = node.left;
        } else if (cmp > 0) {
          rightParent = node;
          node = node.right;
        }
      }
      throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
    };
    SortedMap2.prototype.isEmpty = function() {
      return this.root_.isEmpty();
    };
    SortedMap2.prototype.count = function() {
      return this.root_.count();
    };
    SortedMap2.prototype.minKey = function() {
      return this.root_.minKey();
    };
    SortedMap2.prototype.maxKey = function() {
      return this.root_.maxKey();
    };
    SortedMap2.prototype.inorderTraversal = function(action) {
      return this.root_.inorderTraversal(action);
    };
    SortedMap2.prototype.reverseTraversal = function(action) {
      return this.root_.reverseTraversal(action);
    };
    SortedMap2.prototype.getIterator = function(resultGenerator) {
      return new SortedMapIterator(this.root_, null, this.comparator_, false, resultGenerator);
    };
    SortedMap2.prototype.getIteratorFrom = function(key, resultGenerator) {
      return new SortedMapIterator(this.root_, key, this.comparator_, false, resultGenerator);
    };
    SortedMap2.prototype.getReverseIteratorFrom = function(key, resultGenerator) {
      return new SortedMapIterator(this.root_, key, this.comparator_, true, resultGenerator);
    };
    SortedMap2.prototype.getReverseIterator = function(resultGenerator) {
      return new SortedMapIterator(this.root_, null, this.comparator_, true, resultGenerator);
    };
    SortedMap2.EMPTY_NODE = new LLRBEmptyNode();
    return SortedMap2;
  }()
);
var LOG_2 = Math.log(2);
var Base12Num = (
  /** @class */
  function() {
    function Base12Num2(length) {
      var logBase2 = function(num) {
        return parseInt(Math.log(num) / LOG_2, 10);
      };
      var bitMask = function(bits) {
        return parseInt(Array(bits + 1).join("1"), 2);
      };
      this.count = logBase2(length + 1);
      this.current_ = this.count - 1;
      var mask = bitMask(this.count);
      this.bits_ = length + 1 & mask;
    }
    Base12Num2.prototype.nextBitIsOne = function() {
      var result = !(this.bits_ & 1 << this.current_);
      this.current_--;
      return result;
    };
    return Base12Num2;
  }()
);
var buildChildSet = function(childList, cmp, keyFn, mapSortFn) {
  childList.sort(cmp);
  var buildBalancedTree = function(low, high) {
    var length = high - low;
    var namedNode;
    var key;
    if (length === 0) {
      return null;
    } else if (length === 1) {
      namedNode = childList[low];
      key = keyFn ? keyFn(namedNode) : namedNode;
      return new LLRBNode(key, namedNode.node, LLRBNode.BLACK, null, null);
    } else {
      var middle = parseInt(length / 2, 10) + low;
      var left = buildBalancedTree(low, middle);
      var right = buildBalancedTree(middle + 1, high);
      namedNode = childList[middle];
      key = keyFn ? keyFn(namedNode) : namedNode;
      return new LLRBNode(key, namedNode.node, LLRBNode.BLACK, left, right);
    }
  };
  var buildFrom12Array = function(base122) {
    var node = null;
    var root2 = null;
    var index = childList.length;
    var buildPennant = function(chunkSize2, color) {
      var low = index - chunkSize2;
      var high = index;
      index -= chunkSize2;
      var childTree = buildBalancedTree(low + 1, high);
      var namedNode = childList[low];
      var key = keyFn ? keyFn(namedNode) : namedNode;
      attachPennant(new LLRBNode(key, namedNode.node, color, null, childTree));
    };
    var attachPennant = function(pennant) {
      if (node) {
        node.left = pennant;
        node = pennant;
      } else {
        root2 = pennant;
        node = pennant;
      }
    };
    for (var i = 0; i < base122.count; ++i) {
      var isOne = base122.nextBitIsOne();
      var chunkSize = Math.pow(2, base122.count - (i + 1));
      if (isOne) {
        buildPennant(chunkSize, LLRBNode.BLACK);
      } else {
        buildPennant(chunkSize, LLRBNode.BLACK);
        buildPennant(chunkSize, LLRBNode.RED);
      }
    }
    return root2;
  };
  var base12 = new Base12Num(childList.length);
  var root = buildFrom12Array(base12);
  return new SortedMap(mapSortFn || cmp, root);
};
var _defaultIndexMap;
var fallbackObject = {};
var IndexMap = (
  /** @class */
  function() {
    function IndexMap2(indexes_, indexSet_) {
      this.indexes_ = indexes_;
      this.indexSet_ = indexSet_;
    }
    Object.defineProperty(IndexMap2, "Default", {
      /**
       * The default IndexMap for nodes without a priority
       */
      get: function() {
        assert(fallbackObject && PRIORITY_INDEX, "ChildrenNode.ts has not been loaded");
        _defaultIndexMap = _defaultIndexMap || new IndexMap2({ ".priority": fallbackObject }, { ".priority": PRIORITY_INDEX });
        return _defaultIndexMap;
      },
      enumerable: false,
      configurable: true
    });
    IndexMap2.prototype.get = function(indexKey) {
      var sortedMap = safeGet(this.indexes_, indexKey);
      if (!sortedMap) {
        throw new Error("No index defined for " + indexKey);
      }
      if (sortedMap instanceof SortedMap) {
        return sortedMap;
      } else {
        return null;
      }
    };
    IndexMap2.prototype.hasIndex = function(indexDefinition) {
      return contains(this.indexSet_, indexDefinition.toString());
    };
    IndexMap2.prototype.addIndex = function(indexDefinition, existingChildren) {
      assert(indexDefinition !== KEY_INDEX, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
      var childList = [];
      var sawIndexedValue = false;
      var iter = existingChildren.getIterator(NamedNode.Wrap);
      var next = iter.getNext();
      while (next) {
        sawIndexedValue = sawIndexedValue || indexDefinition.isDefinedOn(next.node);
        childList.push(next);
        next = iter.getNext();
      }
      var newIndex;
      if (sawIndexedValue) {
        newIndex = buildChildSet(childList, indexDefinition.getCompare());
      } else {
        newIndex = fallbackObject;
      }
      var indexName = indexDefinition.toString();
      var newIndexSet = __assign({}, this.indexSet_);
      newIndexSet[indexName] = indexDefinition;
      var newIndexes = __assign({}, this.indexes_);
      newIndexes[indexName] = newIndex;
      return new IndexMap2(newIndexes, newIndexSet);
    };
    IndexMap2.prototype.addToIndexes = function(namedNode, existingChildren) {
      var _this = this;
      var newIndexes = map(this.indexes_, function(indexedChildren, indexName) {
        var index = safeGet(_this.indexSet_, indexName);
        assert(index, "Missing index implementation for " + indexName);
        if (indexedChildren === fallbackObject) {
          if (index.isDefinedOn(namedNode.node)) {
            var childList = [];
            var iter = existingChildren.getIterator(NamedNode.Wrap);
            var next = iter.getNext();
            while (next) {
              if (next.name !== namedNode.name) {
                childList.push(next);
              }
              next = iter.getNext();
            }
            childList.push(namedNode);
            return buildChildSet(childList, index.getCompare());
          } else {
            return fallbackObject;
          }
        } else {
          var existingSnap = existingChildren.get(namedNode.name);
          var newChildren = indexedChildren;
          if (existingSnap) {
            newChildren = newChildren.remove(new NamedNode(namedNode.name, existingSnap));
          }
          return newChildren.insert(namedNode, namedNode.node);
        }
      });
      return new IndexMap2(newIndexes, this.indexSet_);
    };
    IndexMap2.prototype.removeFromIndexes = function(namedNode, existingChildren) {
      var newIndexes = map(this.indexes_, function(indexedChildren) {
        if (indexedChildren === fallbackObject) {
          return indexedChildren;
        } else {
          var existingSnap = existingChildren.get(namedNode.name);
          if (existingSnap) {
            return indexedChildren.remove(new NamedNode(namedNode.name, existingSnap));
          } else {
            return indexedChildren;
          }
        }
      });
      return new IndexMap2(newIndexes, this.indexSet_);
    };
    return IndexMap2;
  }()
);
function NAME_ONLY_COMPARATOR(left, right) {
  return nameCompare(left.name, right.name);
}
function NAME_COMPARATOR(left, right) {
  return nameCompare(left, right);
}
var EMPTY_NODE;
var ChildrenNode = (
  /** @class */
  function() {
    function ChildrenNode2(children_, priorityNode_, indexMap_) {
      this.children_ = children_;
      this.priorityNode_ = priorityNode_;
      this.indexMap_ = indexMap_;
      this.lazyHash_ = null;
      if (this.priorityNode_) {
        validatePriorityNode(this.priorityNode_);
      }
      if (this.children_.isEmpty()) {
        assert(!this.priorityNode_ || this.priorityNode_.isEmpty(), "An empty node cannot have a priority");
      }
    }
    Object.defineProperty(ChildrenNode2, "EMPTY_NODE", {
      get: function() {
        return EMPTY_NODE || (EMPTY_NODE = new ChildrenNode2(new SortedMap(NAME_COMPARATOR), null, IndexMap.Default));
      },
      enumerable: false,
      configurable: true
    });
    ChildrenNode2.prototype.isLeafNode = function() {
      return false;
    };
    ChildrenNode2.prototype.getPriority = function() {
      return this.priorityNode_ || EMPTY_NODE;
    };
    ChildrenNode2.prototype.updatePriority = function(newPriorityNode) {
      if (this.children_.isEmpty()) {
        return this;
      } else {
        return new ChildrenNode2(this.children_, newPriorityNode, this.indexMap_);
      }
    };
    ChildrenNode2.prototype.getImmediateChild = function(childName) {
      if (childName === ".priority") {
        return this.getPriority();
      } else {
        var child = this.children_.get(childName);
        return child === null ? EMPTY_NODE : child;
      }
    };
    ChildrenNode2.prototype.getChild = function(path) {
      var front = path.getFront();
      if (front === null) {
        return this;
      }
      return this.getImmediateChild(front).getChild(path.popFront());
    };
    ChildrenNode2.prototype.hasChild = function(childName) {
      return this.children_.get(childName) !== null;
    };
    ChildrenNode2.prototype.updateImmediateChild = function(childName, newChildNode) {
      assert(newChildNode, "We should always be passing snapshot nodes");
      if (childName === ".priority") {
        return this.updatePriority(newChildNode);
      } else {
        var namedNode = new NamedNode(childName, newChildNode);
        var newChildren = void 0, newIndexMap = void 0;
        if (newChildNode.isEmpty()) {
          newChildren = this.children_.remove(childName);
          newIndexMap = this.indexMap_.removeFromIndexes(namedNode, this.children_);
        } else {
          newChildren = this.children_.insert(childName, newChildNode);
          newIndexMap = this.indexMap_.addToIndexes(namedNode, this.children_);
        }
        var newPriority = newChildren.isEmpty() ? EMPTY_NODE : this.priorityNode_;
        return new ChildrenNode2(newChildren, newPriority, newIndexMap);
      }
    };
    ChildrenNode2.prototype.updateChild = function(path, newChildNode) {
      var front = path.getFront();
      if (front === null) {
        return newChildNode;
      } else {
        assert(path.getFront() !== ".priority" || path.getLength() === 1, ".priority must be the last token in a path");
        var newImmediateChild = this.getImmediateChild(front).updateChild(path.popFront(), newChildNode);
        return this.updateImmediateChild(front, newImmediateChild);
      }
    };
    ChildrenNode2.prototype.isEmpty = function() {
      return this.children_.isEmpty();
    };
    ChildrenNode2.prototype.numChildren = function() {
      return this.children_.count();
    };
    ChildrenNode2.prototype.val = function(exportFormat) {
      if (this.isEmpty()) {
        return null;
      }
      var obj = {};
      var numKeys = 0, maxKey = 0, allIntegerKeys = true;
      this.forEachChild(PRIORITY_INDEX, function(key2, childNode) {
        obj[key2] = childNode.val(exportFormat);
        numKeys++;
        if (allIntegerKeys && ChildrenNode2.INTEGER_REGEXP_.test(key2)) {
          maxKey = Math.max(maxKey, Number(key2));
        } else {
          allIntegerKeys = false;
        }
      });
      if (!exportFormat && allIntegerKeys && maxKey < 2 * numKeys) {
        var array = [];
        for (var key in obj) {
          array[key] = obj[key];
        }
        return array;
      } else {
        if (exportFormat && !this.getPriority().isEmpty()) {
          obj[".priority"] = this.getPriority().val();
        }
        return obj;
      }
    };
    ChildrenNode2.prototype.hash = function() {
      if (this.lazyHash_ === null) {
        var toHash_1 = "";
        if (!this.getPriority().isEmpty()) {
          toHash_1 += "priority:" + priorityHashText(this.getPriority().val()) + ":";
        }
        this.forEachChild(PRIORITY_INDEX, function(key, childNode) {
          var childHash = childNode.hash();
          if (childHash !== "") {
            toHash_1 += ":" + key + ":" + childHash;
          }
        });
        this.lazyHash_ = toHash_1 === "" ? "" : sha1(toHash_1);
      }
      return this.lazyHash_;
    };
    ChildrenNode2.prototype.getPredecessorChildName = function(childName, childNode, index) {
      var idx = this.resolveIndex_(index);
      if (idx) {
        var predecessor = idx.getPredecessorKey(new NamedNode(childName, childNode));
        return predecessor ? predecessor.name : null;
      } else {
        return this.children_.getPredecessorKey(childName);
      }
    };
    ChildrenNode2.prototype.getFirstChildName = function(indexDefinition) {
      var idx = this.resolveIndex_(indexDefinition);
      if (idx) {
        var minKey = idx.minKey();
        return minKey && minKey.name;
      } else {
        return this.children_.minKey();
      }
    };
    ChildrenNode2.prototype.getFirstChild = function(indexDefinition) {
      var minKey = this.getFirstChildName(indexDefinition);
      if (minKey) {
        return new NamedNode(minKey, this.children_.get(minKey));
      } else {
        return null;
      }
    };
    ChildrenNode2.prototype.getLastChildName = function(indexDefinition) {
      var idx = this.resolveIndex_(indexDefinition);
      if (idx) {
        var maxKey = idx.maxKey();
        return maxKey && maxKey.name;
      } else {
        return this.children_.maxKey();
      }
    };
    ChildrenNode2.prototype.getLastChild = function(indexDefinition) {
      var maxKey = this.getLastChildName(indexDefinition);
      if (maxKey) {
        return new NamedNode(maxKey, this.children_.get(maxKey));
      } else {
        return null;
      }
    };
    ChildrenNode2.prototype.forEachChild = function(index, action) {
      var idx = this.resolveIndex_(index);
      if (idx) {
        return idx.inorderTraversal(function(wrappedNode) {
          return action(wrappedNode.name, wrappedNode.node);
        });
      } else {
        return this.children_.inorderTraversal(action);
      }
    };
    ChildrenNode2.prototype.getIterator = function(indexDefinition) {
      return this.getIteratorFrom(indexDefinition.minPost(), indexDefinition);
    };
    ChildrenNode2.prototype.getIteratorFrom = function(startPost, indexDefinition) {
      var idx = this.resolveIndex_(indexDefinition);
      if (idx) {
        return idx.getIteratorFrom(startPost, function(key) {
          return key;
        });
      } else {
        var iterator = this.children_.getIteratorFrom(startPost.name, NamedNode.Wrap);
        var next = iterator.peek();
        while (next != null && indexDefinition.compare(next, startPost) < 0) {
          iterator.getNext();
          next = iterator.peek();
        }
        return iterator;
      }
    };
    ChildrenNode2.prototype.getReverseIterator = function(indexDefinition) {
      return this.getReverseIteratorFrom(indexDefinition.maxPost(), indexDefinition);
    };
    ChildrenNode2.prototype.getReverseIteratorFrom = function(endPost, indexDefinition) {
      var idx = this.resolveIndex_(indexDefinition);
      if (idx) {
        return idx.getReverseIteratorFrom(endPost, function(key) {
          return key;
        });
      } else {
        var iterator = this.children_.getReverseIteratorFrom(endPost.name, NamedNode.Wrap);
        var next = iterator.peek();
        while (next != null && indexDefinition.compare(next, endPost) > 0) {
          iterator.getNext();
          next = iterator.peek();
        }
        return iterator;
      }
    };
    ChildrenNode2.prototype.compareTo = function(other) {
      if (this.isEmpty()) {
        if (other.isEmpty()) {
          return 0;
        } else {
          return -1;
        }
      } else if (other.isLeafNode() || other.isEmpty()) {
        return 1;
      } else if (other === MAX_NODE$2) {
        return -1;
      } else {
        return 0;
      }
    };
    ChildrenNode2.prototype.withIndex = function(indexDefinition) {
      if (indexDefinition === KEY_INDEX || this.indexMap_.hasIndex(indexDefinition)) {
        return this;
      } else {
        var newIndexMap = this.indexMap_.addIndex(indexDefinition, this.children_);
        return new ChildrenNode2(this.children_, this.priorityNode_, newIndexMap);
      }
    };
    ChildrenNode2.prototype.isIndexed = function(index) {
      return index === KEY_INDEX || this.indexMap_.hasIndex(index);
    };
    ChildrenNode2.prototype.equals = function(other) {
      if (other === this) {
        return true;
      } else if (other.isLeafNode()) {
        return false;
      } else {
        var otherChildrenNode = other;
        if (!this.getPriority().equals(otherChildrenNode.getPriority())) {
          return false;
        } else if (this.children_.count() === otherChildrenNode.children_.count()) {
          var thisIter = this.getIterator(PRIORITY_INDEX);
          var otherIter = otherChildrenNode.getIterator(PRIORITY_INDEX);
          var thisCurrent = thisIter.getNext();
          var otherCurrent = otherIter.getNext();
          while (thisCurrent && otherCurrent) {
            if (thisCurrent.name !== otherCurrent.name || !thisCurrent.node.equals(otherCurrent.node)) {
              return false;
            }
            thisCurrent = thisIter.getNext();
            otherCurrent = otherIter.getNext();
          }
          return thisCurrent === null && otherCurrent === null;
        } else {
          return false;
        }
      }
    };
    ChildrenNode2.prototype.resolveIndex_ = function(indexDefinition) {
      if (indexDefinition === KEY_INDEX) {
        return null;
      } else {
        return this.indexMap_.get(indexDefinition.toString());
      }
    };
    ChildrenNode2.INTEGER_REGEXP_ = /^(0|[1-9]\d*)$/;
    return ChildrenNode2;
  }()
);
var MaxNode = (
  /** @class */
  function(_super) {
    __extends(MaxNode2, _super);
    function MaxNode2() {
      return _super.call(this, new SortedMap(NAME_COMPARATOR), ChildrenNode.EMPTY_NODE, IndexMap.Default) || this;
    }
    MaxNode2.prototype.compareTo = function(other) {
      if (other === this) {
        return 0;
      } else {
        return 1;
      }
    };
    MaxNode2.prototype.equals = function(other) {
      return other === this;
    };
    MaxNode2.prototype.getPriority = function() {
      return this;
    };
    MaxNode2.prototype.getImmediateChild = function(childName) {
      return ChildrenNode.EMPTY_NODE;
    };
    MaxNode2.prototype.isEmpty = function() {
      return false;
    };
    return MaxNode2;
  }(ChildrenNode)
);
var MAX_NODE$2 = new MaxNode();
Object.defineProperties(NamedNode, {
  MIN: {
    value: new NamedNode(MIN_NAME, ChildrenNode.EMPTY_NODE)
  },
  MAX: {
    value: new NamedNode(MAX_NAME, MAX_NODE$2)
  }
});
KeyIndex.__EMPTY_NODE = ChildrenNode.EMPTY_NODE;
LeafNode.__childrenNodeConstructor = ChildrenNode;
setMaxNode(MAX_NODE$2);
setMaxNode$1(MAX_NODE$2);
var USE_HINZE = true;
function nodeFromJSON$1(json, priority) {
  if (priority === void 0) {
    priority = null;
  }
  if (json === null) {
    return ChildrenNode.EMPTY_NODE;
  }
  if (typeof json === "object" && ".priority" in json) {
    priority = json[".priority"];
  }
  assert(priority === null || typeof priority === "string" || typeof priority === "number" || typeof priority === "object" && ".sv" in priority, "Invalid priority type found: " + typeof priority);
  if (typeof json === "object" && ".value" in json && json[".value"] !== null) {
    json = json[".value"];
  }
  if (typeof json !== "object" || ".sv" in json) {
    var jsonLeaf = json;
    return new LeafNode(jsonLeaf, nodeFromJSON$1(priority));
  }
  if (!(json instanceof Array) && USE_HINZE) {
    var children_1 = [];
    var childrenHavePriority_1 = false;
    var hinzeJsonObj = json;
    each(hinzeJsonObj, function(key, child) {
      if (key.substring(0, 1) !== ".") {
        var childNode = nodeFromJSON$1(child);
        if (!childNode.isEmpty()) {
          childrenHavePriority_1 = childrenHavePriority_1 || !childNode.getPriority().isEmpty();
          children_1.push(new NamedNode(key, childNode));
        }
      }
    });
    if (children_1.length === 0) {
      return ChildrenNode.EMPTY_NODE;
    }
    var childSet = buildChildSet(children_1, NAME_ONLY_COMPARATOR, function(namedNode) {
      return namedNode.name;
    }, NAME_COMPARATOR);
    if (childrenHavePriority_1) {
      var sortedChildSet = buildChildSet(children_1, PRIORITY_INDEX.getCompare());
      return new ChildrenNode(childSet, nodeFromJSON$1(priority), new IndexMap({ ".priority": sortedChildSet }, { ".priority": PRIORITY_INDEX }));
    } else {
      return new ChildrenNode(childSet, nodeFromJSON$1(priority), IndexMap.Default);
    }
  } else {
    var node_1 = ChildrenNode.EMPTY_NODE;
    each(json, function(key, childData) {
      if (contains(json, key)) {
        if (key.substring(0, 1) !== ".") {
          var childNode = nodeFromJSON$1(childData);
          if (childNode.isLeafNode() || !childNode.isEmpty()) {
            node_1 = node_1.updateImmediateChild(key, childNode);
          }
        }
      }
    });
    return node_1.updatePriority(nodeFromJSON$1(priority));
  }
}
setNodeFromJSON(nodeFromJSON$1);
var ValueIndex = (
  /** @class */
  function(_super) {
    __extends(ValueIndex2, _super);
    function ValueIndex2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    ValueIndex2.prototype.compare = function(a, b) {
      var indexCmp = a.node.compareTo(b.node);
      if (indexCmp === 0) {
        return nameCompare(a.name, b.name);
      } else {
        return indexCmp;
      }
    };
    ValueIndex2.prototype.isDefinedOn = function(node) {
      return true;
    };
    ValueIndex2.prototype.indexedValueChanged = function(oldNode, newNode) {
      return !oldNode.equals(newNode);
    };
    ValueIndex2.prototype.minPost = function() {
      return NamedNode.MIN;
    };
    ValueIndex2.prototype.maxPost = function() {
      return NamedNode.MAX;
    };
    ValueIndex2.prototype.makePost = function(indexValue, name2) {
      var valueNode = nodeFromJSON$1(indexValue);
      return new NamedNode(name2, valueNode);
    };
    ValueIndex2.prototype.toString = function() {
      return ".value";
    };
    return ValueIndex2;
  }(Index)
);
var VALUE_INDEX = new ValueIndex();
var PathIndex = (
  /** @class */
  function(_super) {
    __extends(PathIndex2, _super);
    function PathIndex2(indexPath_) {
      var _this = _super.call(this) || this;
      _this.indexPath_ = indexPath_;
      assert(!indexPath_.isEmpty() && indexPath_.getFront() !== ".priority", "Can't create PathIndex with empty path or .priority key");
      return _this;
    }
    PathIndex2.prototype.extractChild = function(snap) {
      return snap.getChild(this.indexPath_);
    };
    PathIndex2.prototype.isDefinedOn = function(node) {
      return !node.getChild(this.indexPath_).isEmpty();
    };
    PathIndex2.prototype.compare = function(a, b) {
      var aChild = this.extractChild(a.node);
      var bChild = this.extractChild(b.node);
      var indexCmp = aChild.compareTo(bChild);
      if (indexCmp === 0) {
        return nameCompare(a.name, b.name);
      } else {
        return indexCmp;
      }
    };
    PathIndex2.prototype.makePost = function(indexValue, name2) {
      var valueNode = nodeFromJSON$1(indexValue);
      var node = ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_, valueNode);
      return new NamedNode(name2, node);
    };
    PathIndex2.prototype.maxPost = function() {
      var node = ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_, MAX_NODE$2);
      return new NamedNode(MAX_NAME, node);
    };
    PathIndex2.prototype.toString = function() {
      return this.indexPath_.slice().join("/");
    };
    return PathIndex2;
  }(Index)
);
var DataSnapshot = (
  /** @class */
  function() {
    function DataSnapshot2(node_, ref_, index_) {
      this.node_ = node_;
      this.ref_ = ref_;
      this.index_ = index_;
    }
    DataSnapshot2.prototype.val = function() {
      validateArgCount("DataSnapshot.val", 0, 0, arguments.length);
      return this.node_.val();
    };
    DataSnapshot2.prototype.exportVal = function() {
      validateArgCount("DataSnapshot.exportVal", 0, 0, arguments.length);
      return this.node_.val(true);
    };
    DataSnapshot2.prototype.toJSON = function() {
      validateArgCount("DataSnapshot.toJSON", 0, 1, arguments.length);
      return this.exportVal();
    };
    DataSnapshot2.prototype.exists = function() {
      validateArgCount("DataSnapshot.exists", 0, 0, arguments.length);
      return !this.node_.isEmpty();
    };
    DataSnapshot2.prototype.child = function(childPathString) {
      validateArgCount("DataSnapshot.child", 0, 1, arguments.length);
      childPathString = String(childPathString);
      validatePathString("DataSnapshot.child", 1, childPathString, false);
      var childPath = new Path(childPathString);
      var childRef = this.ref_.child(childPath);
      return new DataSnapshot2(this.node_.getChild(childPath), childRef, PRIORITY_INDEX);
    };
    DataSnapshot2.prototype.hasChild = function(childPathString) {
      validateArgCount("DataSnapshot.hasChild", 1, 1, arguments.length);
      validatePathString("DataSnapshot.hasChild", 1, childPathString, false);
      var childPath = new Path(childPathString);
      return !this.node_.getChild(childPath).isEmpty();
    };
    DataSnapshot2.prototype.getPriority = function() {
      validateArgCount("DataSnapshot.getPriority", 0, 0, arguments.length);
      return this.node_.getPriority().val();
    };
    DataSnapshot2.prototype.forEach = function(action) {
      var _this = this;
      validateArgCount("DataSnapshot.forEach", 1, 1, arguments.length);
      validateCallback("DataSnapshot.forEach", 1, action, false);
      if (this.node_.isLeafNode()) {
        return false;
      }
      var childrenNode = this.node_;
      return !!childrenNode.forEachChild(this.index_, function(key, node) {
        return action(new DataSnapshot2(node, _this.ref_.child(key), PRIORITY_INDEX));
      });
    };
    DataSnapshot2.prototype.hasChildren = function() {
      validateArgCount("DataSnapshot.hasChildren", 0, 0, arguments.length);
      if (this.node_.isLeafNode()) {
        return false;
      } else {
        return !this.node_.isEmpty();
      }
    };
    Object.defineProperty(DataSnapshot2.prototype, "key", {
      get: function() {
        return this.ref_.getKey();
      },
      enumerable: false,
      configurable: true
    });
    DataSnapshot2.prototype.numChildren = function() {
      validateArgCount("DataSnapshot.numChildren", 0, 0, arguments.length);
      return this.node_.numChildren();
    };
    DataSnapshot2.prototype.getRef = function() {
      validateArgCount("DataSnapshot.ref", 0, 0, arguments.length);
      return this.ref_;
    };
    Object.defineProperty(DataSnapshot2.prototype, "ref", {
      get: function() {
        return this.getRef();
      },
      enumerable: false,
      configurable: true
    });
    return DataSnapshot2;
  }()
);
var DataEvent = (
  /** @class */
  function() {
    function DataEvent2(eventType, eventRegistration, snapshot, prevName) {
      this.eventType = eventType;
      this.eventRegistration = eventRegistration;
      this.snapshot = snapshot;
      this.prevName = prevName;
    }
    DataEvent2.prototype.getPath = function() {
      var ref = this.snapshot.getRef();
      if (this.eventType === "value") {
        return ref.path;
      } else {
        return ref.getParent().path;
      }
    };
    DataEvent2.prototype.getEventType = function() {
      return this.eventType;
    };
    DataEvent2.prototype.getEventRunner = function() {
      return this.eventRegistration.getEventRunner(this);
    };
    DataEvent2.prototype.toString = function() {
      return this.getPath().toString() + ":" + this.eventType + ":" + stringify(this.snapshot.exportVal());
    };
    return DataEvent2;
  }()
);
var CancelEvent = (
  /** @class */
  function() {
    function CancelEvent2(eventRegistration, error2, path) {
      this.eventRegistration = eventRegistration;
      this.error = error2;
      this.path = path;
    }
    CancelEvent2.prototype.getPath = function() {
      return this.path;
    };
    CancelEvent2.prototype.getEventType = function() {
      return "cancel";
    };
    CancelEvent2.prototype.getEventRunner = function() {
      return this.eventRegistration.getEventRunner(this);
    };
    CancelEvent2.prototype.toString = function() {
      return this.path.toString() + ":cancel";
    };
    return CancelEvent2;
  }()
);
var ValueEventRegistration = (
  /** @class */
  function() {
    function ValueEventRegistration2(callback_, cancelCallback_, context_) {
      this.callback_ = callback_;
      this.cancelCallback_ = cancelCallback_;
      this.context_ = context_;
    }
    ValueEventRegistration2.prototype.respondsTo = function(eventType) {
      return eventType === "value";
    };
    ValueEventRegistration2.prototype.createEvent = function(change, query) {
      var index = query.getQueryParams().getIndex();
      return new DataEvent("value", this, new DataSnapshot(change.snapshotNode, query.getRef(), index));
    };
    ValueEventRegistration2.prototype.getEventRunner = function(eventData) {
      var ctx = this.context_;
      if (eventData.getEventType() === "cancel") {
        assert(this.cancelCallback_, "Raising a cancel event on a listener with no cancel callback");
        var cancelCB_1 = this.cancelCallback_;
        return function() {
          cancelCB_1.call(ctx, eventData.error);
        };
      } else {
        var cb_1 = this.callback_;
        return function() {
          cb_1.call(ctx, eventData.snapshot);
        };
      }
    };
    ValueEventRegistration2.prototype.createCancelEvent = function(error2, path) {
      if (this.cancelCallback_) {
        return new CancelEvent(this, error2, path);
      } else {
        return null;
      }
    };
    ValueEventRegistration2.prototype.matches = function(other) {
      if (!(other instanceof ValueEventRegistration2)) {
        return false;
      } else if (!other.callback_ || !this.callback_) {
        return true;
      } else {
        return other.callback_ === this.callback_ && other.context_ === this.context_;
      }
    };
    ValueEventRegistration2.prototype.hasAnyCallback = function() {
      return this.callback_ !== null;
    };
    return ValueEventRegistration2;
  }()
);
var ChildEventRegistration = (
  /** @class */
  function() {
    function ChildEventRegistration2(callbacks_, cancelCallback_, context_) {
      this.callbacks_ = callbacks_;
      this.cancelCallback_ = cancelCallback_;
      this.context_ = context_;
    }
    ChildEventRegistration2.prototype.respondsTo = function(eventType) {
      var eventToCheck = eventType === "children_added" ? "child_added" : eventType;
      eventToCheck = eventToCheck === "children_removed" ? "child_removed" : eventToCheck;
      return contains(this.callbacks_, eventToCheck);
    };
    ChildEventRegistration2.prototype.createCancelEvent = function(error2, path) {
      if (this.cancelCallback_) {
        return new CancelEvent(this, error2, path);
      } else {
        return null;
      }
    };
    ChildEventRegistration2.prototype.createEvent = function(change, query) {
      assert(change.childName != null, "Child events should have a childName.");
      var ref = query.getRef().child(
        /** @type {!string} */
        change.childName
      );
      var index = query.getQueryParams().getIndex();
      return new DataEvent(change.type, this, new DataSnapshot(change.snapshotNode, ref, index), change.prevName);
    };
    ChildEventRegistration2.prototype.getEventRunner = function(eventData) {
      var ctx = this.context_;
      if (eventData.getEventType() === "cancel") {
        assert(this.cancelCallback_, "Raising a cancel event on a listener with no cancel callback");
        var cancelCB_2 = this.cancelCallback_;
        return function() {
          cancelCB_2.call(ctx, eventData.error);
        };
      } else {
        var cb_2 = this.callbacks_[eventData.eventType];
        return function() {
          cb_2.call(ctx, eventData.snapshot, eventData.prevName);
        };
      }
    };
    ChildEventRegistration2.prototype.matches = function(other) {
      var _this = this;
      if (other instanceof ChildEventRegistration2) {
        if (!this.callbacks_ || !other.callbacks_) {
          return true;
        } else if (this.context_ === other.context_) {
          var otherKeys = Object.keys(other.callbacks_);
          var thisKeys = Object.keys(this.callbacks_);
          var otherCount = otherKeys.length;
          var thisCount = thisKeys.length;
          if (otherCount === thisCount) {
            if (otherCount === 1) {
              var otherKey = otherKeys[0];
              var thisKey = thisKeys[0];
              return thisKey === otherKey && (!other.callbacks_[otherKey] || !this.callbacks_[thisKey] || other.callbacks_[otherKey] === this.callbacks_[thisKey]);
            } else {
              return thisKeys.every(function(eventType) {
                return other.callbacks_[eventType] === _this.callbacks_[eventType];
              });
            }
          }
        }
      }
      return false;
    };
    ChildEventRegistration2.prototype.hasAnyCallback = function() {
      return this.callbacks_ !== null;
    };
    return ChildEventRegistration2;
  }()
);
var __referenceConstructor;
var Query = (
  /** @class */
  function() {
    function Query2(repo, path, queryParams_, orderByCalled_) {
      this.repo = repo;
      this.path = path;
      this.queryParams_ = queryParams_;
      this.orderByCalled_ = orderByCalled_;
    }
    Object.defineProperty(Query2, "__referenceConstructor", {
      get: function() {
        assert(__referenceConstructor, "Reference.ts has not been loaded");
        return __referenceConstructor;
      },
      set: function(val) {
        __referenceConstructor = val;
      },
      enumerable: false,
      configurable: true
    });
    Query2.validateQueryEndpoints_ = function(params) {
      var startNode = null;
      var endNode = null;
      if (params.hasStart()) {
        startNode = params.getIndexStartValue();
      }
      if (params.hasEnd()) {
        endNode = params.getIndexEndValue();
      }
      if (params.getIndex() === KEY_INDEX) {
        var tooManyArgsError = "Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().";
        var wrongArgTypeError = "Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.";
        if (params.hasStart()) {
          var startName = params.getIndexStartName();
          if (startName !== MIN_NAME) {
            throw new Error(tooManyArgsError);
          } else if (typeof startNode !== "string") {
            throw new Error(wrongArgTypeError);
          }
        }
        if (params.hasEnd()) {
          var endName = params.getIndexEndName();
          if (endName !== MAX_NAME) {
            throw new Error(tooManyArgsError);
          } else if (typeof endNode !== "string") {
            throw new Error(wrongArgTypeError);
          }
        }
      } else if (params.getIndex() === PRIORITY_INDEX) {
        if (startNode != null && !isValidPriority(startNode) || endNode != null && !isValidPriority(endNode)) {
          throw new Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");
        }
      } else {
        assert(params.getIndex() instanceof PathIndex || params.getIndex() === VALUE_INDEX, "unknown index type.");
        if (startNode != null && typeof startNode === "object" || endNode != null && typeof endNode === "object") {
          throw new Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
        }
      }
    };
    Query2.validateLimit_ = function(params) {
      if (params.hasStart() && params.hasEnd() && params.hasLimit() && !params.hasAnchoredLimit()) {
        throw new Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");
      }
    };
    Query2.prototype.validateNoPreviousOrderByCall_ = function(fnName) {
      if (this.orderByCalled_ === true) {
        throw new Error(fnName + ": You can't combine multiple orderBy calls.");
      }
    };
    Query2.prototype.getQueryParams = function() {
      return this.queryParams_;
    };
    Query2.prototype.getRef = function() {
      validateArgCount("Query.ref", 0, 0, arguments.length);
      return new Query2.__referenceConstructor(this.repo, this.path);
    };
    Query2.prototype.on = function(eventType, callback, cancelCallbackOrContext, context) {
      validateArgCount("Query.on", 2, 4, arguments.length);
      validateEventType("Query.on", 1, eventType, false);
      validateCallback("Query.on", 2, callback, false);
      var ret = Query2.getCancelAndContextArgs_("Query.on", cancelCallbackOrContext, context);
      if (eventType === "value") {
        this.onValueEvent(callback, ret.cancel, ret.context);
      } else {
        var callbacks = {};
        callbacks[eventType] = callback;
        this.onChildEvent(callbacks, ret.cancel, ret.context);
      }
      return callback;
    };
    Query2.prototype.onValueEvent = function(callback, cancelCallback, context) {
      var container = new ValueEventRegistration(callback, cancelCallback || null, context || null);
      this.repo.addEventCallbackForQuery(this, container);
    };
    Query2.prototype.onChildEvent = function(callbacks, cancelCallback, context) {
      var container = new ChildEventRegistration(callbacks, cancelCallback, context);
      this.repo.addEventCallbackForQuery(this, container);
    };
    Query2.prototype.off = function(eventType, callback, context) {
      validateArgCount("Query.off", 0, 3, arguments.length);
      validateEventType("Query.off", 1, eventType, true);
      validateCallback("Query.off", 2, callback, true);
      validateContextObject("Query.off", 3, context, true);
      var container = null;
      var callbacks = null;
      if (eventType === "value") {
        var valueCallback = callback || null;
        container = new ValueEventRegistration(valueCallback, null, context || null);
      } else if (eventType) {
        if (callback) {
          callbacks = {};
          callbacks[eventType] = callback;
        }
        container = new ChildEventRegistration(callbacks, null, context || null);
      }
      this.repo.removeEventCallbackForQuery(this, container);
    };
    Query2.prototype.once = function(eventType, userCallback, failureCallbackOrContext, context) {
      var _this = this;
      validateArgCount("Query.once", 1, 4, arguments.length);
      validateEventType("Query.once", 1, eventType, false);
      validateCallback("Query.once", 2, userCallback, true);
      var ret = Query2.getCancelAndContextArgs_("Query.once", failureCallbackOrContext, context);
      var firstCall = true;
      var deferred = new Deferred();
      deferred.promise.catch(function() {
      });
      var onceCallback = function(snapshot) {
        if (firstCall) {
          firstCall = false;
          _this.off(eventType, onceCallback);
          if (userCallback) {
            userCallback.bind(ret.context)(snapshot);
          }
          deferred.resolve(snapshot);
        }
      };
      this.on(
        eventType,
        onceCallback,
        /*cancel=*/
        function(err) {
          _this.off(eventType, onceCallback);
          if (ret.cancel) {
            ret.cancel.bind(ret.context)(err);
          }
          deferred.reject(err);
        }
      );
      return deferred.promise;
    };
    Query2.prototype.limitToFirst = function(limit) {
      validateArgCount("Query.limitToFirst", 1, 1, arguments.length);
      if (typeof limit !== "number" || Math.floor(limit) !== limit || limit <= 0) {
        throw new Error("Query.limitToFirst: First argument must be a positive integer.");
      }
      if (this.queryParams_.hasLimit()) {
        throw new Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
      }
      return new Query2(this.repo, this.path, this.queryParams_.limitToFirst(limit), this.orderByCalled_);
    };
    Query2.prototype.limitToLast = function(limit) {
      validateArgCount("Query.limitToLast", 1, 1, arguments.length);
      if (typeof limit !== "number" || Math.floor(limit) !== limit || limit <= 0) {
        throw new Error("Query.limitToLast: First argument must be a positive integer.");
      }
      if (this.queryParams_.hasLimit()) {
        throw new Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
      }
      return new Query2(this.repo, this.path, this.queryParams_.limitToLast(limit), this.orderByCalled_);
    };
    Query2.prototype.orderByChild = function(path) {
      validateArgCount("Query.orderByChild", 1, 1, arguments.length);
      if (path === "$key") {
        throw new Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');
      } else if (path === "$priority") {
        throw new Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');
      } else if (path === "$value") {
        throw new Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');
      }
      validatePathString("Query.orderByChild", 1, path, false);
      this.validateNoPreviousOrderByCall_("Query.orderByChild");
      var parsedPath = new Path(path);
      if (parsedPath.isEmpty()) {
        throw new Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
      }
      var index = new PathIndex(parsedPath);
      var newParams = this.queryParams_.orderBy(index);
      Query2.validateQueryEndpoints_(newParams);
      return new Query2(
        this.repo,
        this.path,
        newParams,
        /*orderByCalled=*/
        true
      );
    };
    Query2.prototype.orderByKey = function() {
      validateArgCount("Query.orderByKey", 0, 0, arguments.length);
      this.validateNoPreviousOrderByCall_("Query.orderByKey");
      var newParams = this.queryParams_.orderBy(KEY_INDEX);
      Query2.validateQueryEndpoints_(newParams);
      return new Query2(
        this.repo,
        this.path,
        newParams,
        /*orderByCalled=*/
        true
      );
    };
    Query2.prototype.orderByPriority = function() {
      validateArgCount("Query.orderByPriority", 0, 0, arguments.length);
      this.validateNoPreviousOrderByCall_("Query.orderByPriority");
      var newParams = this.queryParams_.orderBy(PRIORITY_INDEX);
      Query2.validateQueryEndpoints_(newParams);
      return new Query2(
        this.repo,
        this.path,
        newParams,
        /*orderByCalled=*/
        true
      );
    };
    Query2.prototype.orderByValue = function() {
      validateArgCount("Query.orderByValue", 0, 0, arguments.length);
      this.validateNoPreviousOrderByCall_("Query.orderByValue");
      var newParams = this.queryParams_.orderBy(VALUE_INDEX);
      Query2.validateQueryEndpoints_(newParams);
      return new Query2(
        this.repo,
        this.path,
        newParams,
        /*orderByCalled=*/
        true
      );
    };
    Query2.prototype.startAt = function(value, name2) {
      if (value === void 0) {
        value = null;
      }
      validateArgCount("Query.startAt", 0, 2, arguments.length);
      validateFirebaseDataArg("Query.startAt", 1, value, this.path, true);
      validateKey("Query.startAt", 2, name2, true);
      var newParams = this.queryParams_.startAt(value, name2);
      Query2.validateLimit_(newParams);
      Query2.validateQueryEndpoints_(newParams);
      if (this.queryParams_.hasStart()) {
        throw new Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");
      }
      if (value === void 0) {
        value = null;
        name2 = null;
      }
      return new Query2(this.repo, this.path, newParams, this.orderByCalled_);
    };
    Query2.prototype.endAt = function(value, name2) {
      if (value === void 0) {
        value = null;
      }
      validateArgCount("Query.endAt", 0, 2, arguments.length);
      validateFirebaseDataArg("Query.endAt", 1, value, this.path, true);
      validateKey("Query.endAt", 2, name2, true);
      var newParams = this.queryParams_.endAt(value, name2);
      Query2.validateLimit_(newParams);
      Query2.validateQueryEndpoints_(newParams);
      if (this.queryParams_.hasEnd()) {
        throw new Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");
      }
      return new Query2(this.repo, this.path, newParams, this.orderByCalled_);
    };
    Query2.prototype.equalTo = function(value, name2) {
      validateArgCount("Query.equalTo", 1, 2, arguments.length);
      validateFirebaseDataArg("Query.equalTo", 1, value, this.path, false);
      validateKey("Query.equalTo", 2, name2, true);
      if (this.queryParams_.hasStart()) {
        throw new Error("Query.equalTo: Starting point was already set (by another call to startAt or equalTo).");
      }
      if (this.queryParams_.hasEnd()) {
        throw new Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");
      }
      return this.startAt(value, name2).endAt(value, name2);
    };
    Query2.prototype.toString = function() {
      validateArgCount("Query.toString", 0, 0, arguments.length);
      return this.repo.toString() + this.path.toUrlEncodedString();
    };
    Query2.prototype.toJSON = function() {
      validateArgCount("Query.toJSON", 0, 1, arguments.length);
      return this.toString();
    };
    Query2.prototype.queryObject = function() {
      return this.queryParams_.getQueryObject();
    };
    Query2.prototype.queryIdentifier = function() {
      var obj = this.queryObject();
      var id = ObjectToUniqueKey(obj);
      return id === "{}" ? "default" : id;
    };
    Query2.prototype.isEqual = function(other) {
      validateArgCount("Query.isEqual", 1, 1, arguments.length);
      if (!(other instanceof Query2)) {
        var error2 = "Query.isEqual failed: First argument must be an instance of firebase.database.Query.";
        throw new Error(error2);
      }
      var sameRepo = this.repo === other.repo;
      var samePath = this.path.equals(other.path);
      var sameQueryIdentifier = this.queryIdentifier() === other.queryIdentifier();
      return sameRepo && samePath && sameQueryIdentifier;
    };
    Query2.getCancelAndContextArgs_ = function(fnName, cancelOrContext, context) {
      var ret = { cancel: null, context: null };
      if (cancelOrContext && context) {
        ret.cancel = cancelOrContext;
        validateCallback(fnName, 3, ret.cancel, true);
        ret.context = context;
        validateContextObject(fnName, 4, ret.context, true);
      } else if (cancelOrContext) {
        if (typeof cancelOrContext === "object" && cancelOrContext !== null) {
          ret.context = cancelOrContext;
        } else if (typeof cancelOrContext === "function") {
          ret.cancel = cancelOrContext;
        } else {
          throw new Error(errorPrefix(fnName, 3, true) + " must either be a cancel callback or a context object.");
        }
      }
      return ret;
    };
    Object.defineProperty(Query2.prototype, "ref", {
      get: function() {
        return this.getRef();
      },
      enumerable: false,
      configurable: true
    });
    return Query2;
  }()
);
var ExistingValueProvider = (
  /** @class */
  function() {
    function ExistingValueProvider2(node_) {
      this.node_ = node_;
    }
    ExistingValueProvider2.prototype.getImmediateChild = function(childName) {
      var child = this.node_.getImmediateChild(childName);
      return new ExistingValueProvider2(child);
    };
    ExistingValueProvider2.prototype.node = function() {
      return this.node_;
    };
    return ExistingValueProvider2;
  }()
);
var DeferredValueProvider = (
  /** @class */
  function() {
    function DeferredValueProvider2(syncTree, path) {
      this.syncTree_ = syncTree;
      this.path_ = path;
    }
    DeferredValueProvider2.prototype.getImmediateChild = function(childName) {
      var childPath = this.path_.child(childName);
      return new DeferredValueProvider2(this.syncTree_, childPath);
    };
    DeferredValueProvider2.prototype.node = function() {
      return this.syncTree_.calcCompleteEventCache(this.path_);
    };
    return DeferredValueProvider2;
  }()
);
var generateWithValues = function(values) {
  values = values || {};
  values["timestamp"] = values["timestamp"] || (/* @__PURE__ */ new Date()).getTime();
  return values;
};
var resolveDeferredLeafValue = function(value, existingVal, serverValues) {
  if (!value || typeof value !== "object") {
    return value;
  }
  assert(".sv" in value, "Unexpected leaf node or priority contents");
  if (typeof value[".sv"] === "string") {
    return resolveScalarDeferredValue(value[".sv"], existingVal, serverValues);
  } else if (typeof value[".sv"] === "object") {
    return resolveComplexDeferredValue(value[".sv"], existingVal);
  } else {
    assert(false, "Unexpected server value: " + JSON.stringify(value, null, 2));
  }
};
var resolveScalarDeferredValue = function(op, existing, serverValues) {
  switch (op) {
    case "timestamp":
      return serverValues["timestamp"];
    default:
      assert(false, "Unexpected server value: " + op);
  }
};
var resolveComplexDeferredValue = function(op, existing, unused) {
  if (!op.hasOwnProperty("increment")) {
    assert(false, "Unexpected server value: " + JSON.stringify(op, null, 2));
  }
  var delta = op["increment"];
  if (typeof delta !== "number") {
    assert(false, "Unexpected increment value: " + delta);
  }
  var existingNode = existing.node();
  assert(existingNode !== null && typeof existingNode !== "undefined", "Expected ChildrenNode.EMPTY_NODE for nulls");
  if (!existingNode.isLeafNode()) {
    return delta;
  }
  var leaf = existingNode;
  var existingVal = leaf.getValue();
  if (typeof existingVal !== "number") {
    return delta;
  }
  return existingVal + delta;
};
var resolveDeferredValueTree = function(path, node, syncTree, serverValues) {
  return resolveDeferredValue(node, new DeferredValueProvider(syncTree, path), serverValues);
};
var resolveDeferredValueSnapshot = function(node, existing, serverValues) {
  return resolveDeferredValue(node, new ExistingValueProvider(existing), serverValues);
};
function resolveDeferredValue(node, existingVal, serverValues) {
  var rawPri = node.getPriority().val();
  var priority = resolveDeferredLeafValue(rawPri, existingVal.getImmediateChild(".priority"), serverValues);
  var newNode;
  if (node.isLeafNode()) {
    var leafNode = node;
    var value = resolveDeferredLeafValue(leafNode.getValue(), existingVal, serverValues);
    if (value !== leafNode.getValue() || priority !== leafNode.getPriority().val()) {
      return new LeafNode(value, nodeFromJSON$1(priority));
    } else {
      return node;
    }
  } else {
    var childrenNode = node;
    newNode = childrenNode;
    if (priority !== childrenNode.getPriority().val()) {
      newNode = newNode.updatePriority(new LeafNode(priority));
    }
    childrenNode.forEachChild(PRIORITY_INDEX, function(childName, childNode) {
      var newChildNode = resolveDeferredValue(childNode, existingVal.getImmediateChild(childName), serverValues);
      if (newChildNode !== childNode) {
        newNode = newNode.updateImmediateChild(childName, newChildNode);
      }
    });
    return newNode;
  }
}
var SparseSnapshotTree = (
  /** @class */
  function() {
    function SparseSnapshotTree2() {
      this.value = null;
      this.children = /* @__PURE__ */ new Map();
    }
    SparseSnapshotTree2.prototype.find = function(path) {
      if (this.value != null) {
        return this.value.getChild(path);
      } else if (!path.isEmpty() && this.children.size > 0) {
        var childKey = path.getFront();
        path = path.popFront();
        if (this.children.has(childKey)) {
          var childTree = this.children.get(childKey);
          return childTree.find(path);
        } else {
          return null;
        }
      } else {
        return null;
      }
    };
    SparseSnapshotTree2.prototype.remember = function(path, data) {
      if (path.isEmpty()) {
        this.value = data;
        this.children.clear();
      } else if (this.value !== null) {
        this.value = this.value.updateChild(path, data);
      } else {
        var childKey = path.getFront();
        if (!this.children.has(childKey)) {
          this.children.set(childKey, new SparseSnapshotTree2());
        }
        var child = this.children.get(childKey);
        path = path.popFront();
        child.remember(path, data);
      }
    };
    SparseSnapshotTree2.prototype.forget = function(path) {
      if (path.isEmpty()) {
        this.value = null;
        this.children.clear();
        return true;
      } else {
        if (this.value !== null) {
          if (this.value.isLeafNode()) {
            return false;
          } else {
            var value = this.value;
            this.value = null;
            var self_1 = this;
            value.forEachChild(PRIORITY_INDEX, function(key, tree) {
              self_1.remember(new Path(key), tree);
            });
            return this.forget(path);
          }
        } else if (this.children.size > 0) {
          var childKey = path.getFront();
          path = path.popFront();
          if (this.children.has(childKey)) {
            var safeToRemove = this.children.get(childKey).forget(path);
            if (safeToRemove) {
              this.children.delete(childKey);
            }
          }
          return this.children.size === 0;
        } else {
          return true;
        }
      }
    };
    SparseSnapshotTree2.prototype.forEachTree = function(prefixPath, func) {
      if (this.value !== null) {
        func(prefixPath, this.value);
      } else {
        this.forEachChild(function(key, tree) {
          var path = new Path(prefixPath.toString() + "/" + key);
          tree.forEachTree(path, func);
        });
      }
    };
    SparseSnapshotTree2.prototype.forEachChild = function(func) {
      this.children.forEach(function(tree, key) {
        func(key, tree);
      });
    };
    return SparseSnapshotTree2;
  }()
);
var OperationType;
(function(OperationType2) {
  OperationType2[OperationType2["OVERWRITE"] = 0] = "OVERWRITE";
  OperationType2[OperationType2["MERGE"] = 1] = "MERGE";
  OperationType2[OperationType2["ACK_USER_WRITE"] = 2] = "ACK_USER_WRITE";
  OperationType2[OperationType2["LISTEN_COMPLETE"] = 3] = "LISTEN_COMPLETE";
})(OperationType || (OperationType = {}));
var OperationSource = (
  /** @class */
  function() {
    function OperationSource2(fromUser, fromServer, queryId, tagged) {
      this.fromUser = fromUser;
      this.fromServer = fromServer;
      this.queryId = queryId;
      this.tagged = tagged;
      assert(!tagged || fromServer, "Tagged queries must be from server.");
    }
    OperationSource2.User = new OperationSource2(
      /*fromUser=*/
      true,
      false,
      null,
      /*tagged=*/
      false
    );
    OperationSource2.Server = new OperationSource2(
      false,
      /*fromServer=*/
      true,
      null,
      /*tagged=*/
      false
    );
    OperationSource2.forServerTaggedQuery = function(queryId) {
      return new OperationSource2(
        false,
        /*fromServer=*/
        true,
        queryId,
        /*tagged=*/
        true
      );
    };
    return OperationSource2;
  }()
);
var AckUserWrite = (
  /** @class */
  function() {
    function AckUserWrite2(path, affectedTree, revert) {
      this.path = path;
      this.affectedTree = affectedTree;
      this.revert = revert;
      this.type = OperationType.ACK_USER_WRITE;
      this.source = OperationSource.User;
    }
    AckUserWrite2.prototype.operationForChild = function(childName) {
      if (!this.path.isEmpty()) {
        assert(this.path.getFront() === childName, "operationForChild called for unrelated child.");
        return new AckUserWrite2(this.path.popFront(), this.affectedTree, this.revert);
      } else if (this.affectedTree.value != null) {
        assert(this.affectedTree.children.isEmpty(), "affectedTree should not have overlapping affected paths.");
        return this;
      } else {
        var childTree = this.affectedTree.subtree(new Path(childName));
        return new AckUserWrite2(Path.Empty, childTree, this.revert);
      }
    };
    return AckUserWrite2;
  }()
);
var emptyChildrenSingleton;
var EmptyChildren = function() {
  if (!emptyChildrenSingleton) {
    emptyChildrenSingleton = new SortedMap(stringCompare);
  }
  return emptyChildrenSingleton;
};
var ImmutableTree = (
  /** @class */
  function() {
    function ImmutableTree2(value, children) {
      if (children === void 0) {
        children = EmptyChildren();
      }
      this.value = value;
      this.children = children;
    }
    ImmutableTree2.fromObject = function(obj) {
      var tree = ImmutableTree2.Empty;
      each(obj, function(childPath, childSnap) {
        tree = tree.set(new Path(childPath), childSnap);
      });
      return tree;
    };
    ImmutableTree2.prototype.isEmpty = function() {
      return this.value === null && this.children.isEmpty();
    };
    ImmutableTree2.prototype.findRootMostMatchingPathAndValue = function(relativePath, predicate) {
      if (this.value != null && predicate(this.value)) {
        return { path: Path.Empty, value: this.value };
      } else {
        if (relativePath.isEmpty()) {
          return null;
        } else {
          var front = relativePath.getFront();
          var child = this.children.get(front);
          if (child !== null) {
            var childExistingPathAndValue = child.findRootMostMatchingPathAndValue(relativePath.popFront(), predicate);
            if (childExistingPathAndValue != null) {
              var fullPath = new Path(front).child(childExistingPathAndValue.path);
              return { path: fullPath, value: childExistingPathAndValue.value };
            } else {
              return null;
            }
          } else {
            return null;
          }
        }
      }
    };
    ImmutableTree2.prototype.findRootMostValueAndPath = function(relativePath) {
      return this.findRootMostMatchingPathAndValue(relativePath, function() {
        return true;
      });
    };
    ImmutableTree2.prototype.subtree = function(relativePath) {
      if (relativePath.isEmpty()) {
        return this;
      } else {
        var front = relativePath.getFront();
        var childTree = this.children.get(front);
        if (childTree !== null) {
          return childTree.subtree(relativePath.popFront());
        } else {
          return ImmutableTree2.Empty;
        }
      }
    };
    ImmutableTree2.prototype.set = function(relativePath, toSet) {
      if (relativePath.isEmpty()) {
        return new ImmutableTree2(toSet, this.children);
      } else {
        var front = relativePath.getFront();
        var child = this.children.get(front) || ImmutableTree2.Empty;
        var newChild = child.set(relativePath.popFront(), toSet);
        var newChildren = this.children.insert(front, newChild);
        return new ImmutableTree2(this.value, newChildren);
      }
    };
    ImmutableTree2.prototype.remove = function(relativePath) {
      if (relativePath.isEmpty()) {
        if (this.children.isEmpty()) {
          return ImmutableTree2.Empty;
        } else {
          return new ImmutableTree2(null, this.children);
        }
      } else {
        var front = relativePath.getFront();
        var child = this.children.get(front);
        if (child) {
          var newChild = child.remove(relativePath.popFront());
          var newChildren = void 0;
          if (newChild.isEmpty()) {
            newChildren = this.children.remove(front);
          } else {
            newChildren = this.children.insert(front, newChild);
          }
          if (this.value === null && newChildren.isEmpty()) {
            return ImmutableTree2.Empty;
          } else {
            return new ImmutableTree2(this.value, newChildren);
          }
        } else {
          return this;
        }
      }
    };
    ImmutableTree2.prototype.get = function(relativePath) {
      if (relativePath.isEmpty()) {
        return this.value;
      } else {
        var front = relativePath.getFront();
        var child = this.children.get(front);
        if (child) {
          return child.get(relativePath.popFront());
        } else {
          return null;
        }
      }
    };
    ImmutableTree2.prototype.setTree = function(relativePath, newTree) {
      if (relativePath.isEmpty()) {
        return newTree;
      } else {
        var front = relativePath.getFront();
        var child = this.children.get(front) || ImmutableTree2.Empty;
        var newChild = child.setTree(relativePath.popFront(), newTree);
        var newChildren = void 0;
        if (newChild.isEmpty()) {
          newChildren = this.children.remove(front);
        } else {
          newChildren = this.children.insert(front, newChild);
        }
        return new ImmutableTree2(this.value, newChildren);
      }
    };
    ImmutableTree2.prototype.fold = function(fn) {
      return this.fold_(Path.Empty, fn);
    };
    ImmutableTree2.prototype.fold_ = function(pathSoFar, fn) {
      var accum = {};
      this.children.inorderTraversal(function(childKey, childTree) {
        accum[childKey] = childTree.fold_(pathSoFar.child(childKey), fn);
      });
      return fn(pathSoFar, this.value, accum);
    };
    ImmutableTree2.prototype.findOnPath = function(path, f) {
      return this.findOnPath_(path, Path.Empty, f);
    };
    ImmutableTree2.prototype.findOnPath_ = function(pathToFollow, pathSoFar, f) {
      var result = this.value ? f(pathSoFar, this.value) : false;
      if (result) {
        return result;
      } else {
        if (pathToFollow.isEmpty()) {
          return null;
        } else {
          var front = pathToFollow.getFront();
          var nextChild = this.children.get(front);
          if (nextChild) {
            return nextChild.findOnPath_(pathToFollow.popFront(), pathSoFar.child(front), f);
          } else {
            return null;
          }
        }
      }
    };
    ImmutableTree2.prototype.foreachOnPath = function(path, f) {
      return this.foreachOnPath_(path, Path.Empty, f);
    };
    ImmutableTree2.prototype.foreachOnPath_ = function(pathToFollow, currentRelativePath, f) {
      if (pathToFollow.isEmpty()) {
        return this;
      } else {
        if (this.value) {
          f(currentRelativePath, this.value);
        }
        var front = pathToFollow.getFront();
        var nextChild = this.children.get(front);
        if (nextChild) {
          return nextChild.foreachOnPath_(pathToFollow.popFront(), currentRelativePath.child(front), f);
        } else {
          return ImmutableTree2.Empty;
        }
      }
    };
    ImmutableTree2.prototype.foreach = function(f) {
      this.foreach_(Path.Empty, f);
    };
    ImmutableTree2.prototype.foreach_ = function(currentRelativePath, f) {
      this.children.inorderTraversal(function(childName, childTree) {
        childTree.foreach_(currentRelativePath.child(childName), f);
      });
      if (this.value) {
        f(currentRelativePath, this.value);
      }
    };
    ImmutableTree2.prototype.foreachChild = function(f) {
      this.children.inorderTraversal(function(childName, childTree) {
        if (childTree.value) {
          f(childName, childTree.value);
        }
      });
    };
    ImmutableTree2.Empty = new ImmutableTree2(null);
    return ImmutableTree2;
  }()
);
var ListenComplete = (
  /** @class */
  function() {
    function ListenComplete2(source, path) {
      this.source = source;
      this.path = path;
      this.type = OperationType.LISTEN_COMPLETE;
    }
    ListenComplete2.prototype.operationForChild = function(childName) {
      if (this.path.isEmpty()) {
        return new ListenComplete2(this.source, Path.Empty);
      } else {
        return new ListenComplete2(this.source, this.path.popFront());
      }
    };
    return ListenComplete2;
  }()
);
var Overwrite = (
  /** @class */
  function() {
    function Overwrite2(source, path, snap) {
      this.source = source;
      this.path = path;
      this.snap = snap;
      this.type = OperationType.OVERWRITE;
    }
    Overwrite2.prototype.operationForChild = function(childName) {
      if (this.path.isEmpty()) {
        return new Overwrite2(this.source, Path.Empty, this.snap.getImmediateChild(childName));
      } else {
        return new Overwrite2(this.source, this.path.popFront(), this.snap);
      }
    };
    return Overwrite2;
  }()
);
var Merge = (
  /** @class */
  function() {
    function Merge2(source, path, children) {
      this.source = source;
      this.path = path;
      this.children = children;
      this.type = OperationType.MERGE;
    }
    Merge2.prototype.operationForChild = function(childName) {
      if (this.path.isEmpty()) {
        var childTree = this.children.subtree(new Path(childName));
        if (childTree.isEmpty()) {
          return null;
        } else if (childTree.value) {
          return new Overwrite(this.source, Path.Empty, childTree.value);
        } else {
          return new Merge2(this.source, Path.Empty, childTree);
        }
      } else {
        assert(this.path.getFront() === childName, "Can't get a merge for a child not on the path of the operation");
        return new Merge2(this.source, this.path.popFront(), this.children);
      }
    };
    Merge2.prototype.toString = function() {
      return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")";
    };
    return Merge2;
  }()
);
var CacheNode = (
  /** @class */
  function() {
    function CacheNode2(node_, fullyInitialized_, filtered_) {
      this.node_ = node_;
      this.fullyInitialized_ = fullyInitialized_;
      this.filtered_ = filtered_;
    }
    CacheNode2.prototype.isFullyInitialized = function() {
      return this.fullyInitialized_;
    };
    CacheNode2.prototype.isFiltered = function() {
      return this.filtered_;
    };
    CacheNode2.prototype.isCompleteForPath = function(path) {
      if (path.isEmpty()) {
        return this.isFullyInitialized() && !this.filtered_;
      }
      var childKey = path.getFront();
      return this.isCompleteForChild(childKey);
    };
    CacheNode2.prototype.isCompleteForChild = function(key) {
      return this.isFullyInitialized() && !this.filtered_ || this.node_.hasChild(key);
    };
    CacheNode2.prototype.getNode = function() {
      return this.node_;
    };
    return CacheNode2;
  }()
);
var ViewCache = (
  /** @class */
  function() {
    function ViewCache2(eventCache_, serverCache_) {
      this.eventCache_ = eventCache_;
      this.serverCache_ = serverCache_;
    }
    ViewCache2.prototype.updateEventSnap = function(eventSnap, complete, filtered) {
      return new ViewCache2(new CacheNode(eventSnap, complete, filtered), this.serverCache_);
    };
    ViewCache2.prototype.updateServerSnap = function(serverSnap, complete, filtered) {
      return new ViewCache2(this.eventCache_, new CacheNode(serverSnap, complete, filtered));
    };
    ViewCache2.prototype.getEventCache = function() {
      return this.eventCache_;
    };
    ViewCache2.prototype.getCompleteEventSnap = function() {
      return this.eventCache_.isFullyInitialized() ? this.eventCache_.getNode() : null;
    };
    ViewCache2.prototype.getServerCache = function() {
      return this.serverCache_;
    };
    ViewCache2.prototype.getCompleteServerSnap = function() {
      return this.serverCache_.isFullyInitialized() ? this.serverCache_.getNode() : null;
    };
    ViewCache2.Empty = new ViewCache2(new CacheNode(
      ChildrenNode.EMPTY_NODE,
      /*fullyInitialized=*/
      false,
      /*filtered=*/
      false
    ), new CacheNode(
      ChildrenNode.EMPTY_NODE,
      /*fullyInitialized=*/
      false,
      /*filtered=*/
      false
    ));
    return ViewCache2;
  }()
);
var Change = (
  /** @class */
  function() {
    function Change2(type, snapshotNode, childName, oldSnap, prevName) {
      this.type = type;
      this.snapshotNode = snapshotNode;
      this.childName = childName;
      this.oldSnap = oldSnap;
      this.prevName = prevName;
    }
    Change2.valueChange = function(snapshot) {
      return new Change2(Change2.VALUE, snapshot);
    };
    Change2.childAddedChange = function(childKey, snapshot) {
      return new Change2(Change2.CHILD_ADDED, snapshot, childKey);
    };
    Change2.childRemovedChange = function(childKey, snapshot) {
      return new Change2(Change2.CHILD_REMOVED, snapshot, childKey);
    };
    Change2.childChangedChange = function(childKey, newSnapshot, oldSnapshot) {
      return new Change2(Change2.CHILD_CHANGED, newSnapshot, childKey, oldSnapshot);
    };
    Change2.childMovedChange = function(childKey, snapshot) {
      return new Change2(Change2.CHILD_MOVED, snapshot, childKey);
    };
    Change2.CHILD_ADDED = "child_added";
    Change2.CHILD_REMOVED = "child_removed";
    Change2.CHILD_CHANGED = "child_changed";
    Change2.CHILD_MOVED = "child_moved";
    Change2.VALUE = "value";
    return Change2;
  }()
);
var IndexedFilter = (
  /** @class */
  function() {
    function IndexedFilter2(index_) {
      this.index_ = index_;
    }
    IndexedFilter2.prototype.updateChild = function(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
      assert(snap.isIndexed(this.index_), "A node must be indexed if only a child is updated");
      var oldChild = snap.getImmediateChild(key);
      if (oldChild.getChild(affectedPath).equals(newChild.getChild(affectedPath))) {
        if (oldChild.isEmpty() === newChild.isEmpty()) {
          return snap;
        }
      }
      if (optChangeAccumulator != null) {
        if (newChild.isEmpty()) {
          if (snap.hasChild(key)) {
            optChangeAccumulator.trackChildChange(Change.childRemovedChange(key, oldChild));
          } else {
            assert(snap.isLeafNode(), "A child remove without an old child only makes sense on a leaf node");
          }
        } else if (oldChild.isEmpty()) {
          optChangeAccumulator.trackChildChange(Change.childAddedChange(key, newChild));
        } else {
          optChangeAccumulator.trackChildChange(Change.childChangedChange(key, newChild, oldChild));
        }
      }
      if (snap.isLeafNode() && newChild.isEmpty()) {
        return snap;
      } else {
        return snap.updateImmediateChild(key, newChild).withIndex(this.index_);
      }
    };
    IndexedFilter2.prototype.updateFullNode = function(oldSnap, newSnap, optChangeAccumulator) {
      if (optChangeAccumulator != null) {
        if (!oldSnap.isLeafNode()) {
          oldSnap.forEachChild(PRIORITY_INDEX, function(key, childNode) {
            if (!newSnap.hasChild(key)) {
              optChangeAccumulator.trackChildChange(Change.childRemovedChange(key, childNode));
            }
          });
        }
        if (!newSnap.isLeafNode()) {
          newSnap.forEachChild(PRIORITY_INDEX, function(key, childNode) {
            if (oldSnap.hasChild(key)) {
              var oldChild = oldSnap.getImmediateChild(key);
              if (!oldChild.equals(childNode)) {
                optChangeAccumulator.trackChildChange(Change.childChangedChange(key, childNode, oldChild));
              }
            } else {
              optChangeAccumulator.trackChildChange(Change.childAddedChange(key, childNode));
            }
          });
        }
      }
      return newSnap.withIndex(this.index_);
    };
    IndexedFilter2.prototype.updatePriority = function(oldSnap, newPriority) {
      if (oldSnap.isEmpty()) {
        return ChildrenNode.EMPTY_NODE;
      } else {
        return oldSnap.updatePriority(newPriority);
      }
    };
    IndexedFilter2.prototype.filtersNodes = function() {
      return false;
    };
    IndexedFilter2.prototype.getIndexedFilter = function() {
      return this;
    };
    IndexedFilter2.prototype.getIndex = function() {
      return this.index_;
    };
    return IndexedFilter2;
  }()
);
var ChildChangeAccumulator = (
  /** @class */
  function() {
    function ChildChangeAccumulator2() {
      this.changeMap = /* @__PURE__ */ new Map();
    }
    ChildChangeAccumulator2.prototype.trackChildChange = function(change) {
      var type = change.type;
      var childKey = change.childName;
      assert(type === Change.CHILD_ADDED || type === Change.CHILD_CHANGED || type === Change.CHILD_REMOVED, "Only child changes supported for tracking");
      assert(childKey !== ".priority", "Only non-priority child changes can be tracked.");
      var oldChange = this.changeMap.get(childKey);
      if (oldChange) {
        var oldType = oldChange.type;
        if (type === Change.CHILD_ADDED && oldType === Change.CHILD_REMOVED) {
          this.changeMap.set(childKey, Change.childChangedChange(childKey, change.snapshotNode, oldChange.snapshotNode));
        } else if (type === Change.CHILD_REMOVED && oldType === Change.CHILD_ADDED) {
          this.changeMap.delete(childKey);
        } else if (type === Change.CHILD_REMOVED && oldType === Change.CHILD_CHANGED) {
          this.changeMap.set(childKey, Change.childRemovedChange(childKey, oldChange.oldSnap));
        } else if (type === Change.CHILD_CHANGED && oldType === Change.CHILD_ADDED) {
          this.changeMap.set(childKey, Change.childAddedChange(childKey, change.snapshotNode));
        } else if (type === Change.CHILD_CHANGED && oldType === Change.CHILD_CHANGED) {
          this.changeMap.set(childKey, Change.childChangedChange(childKey, change.snapshotNode, oldChange.oldSnap));
        } else {
          throw assertionError("Illegal combination of changes: " + change + " occurred after " + oldChange);
        }
      } else {
        this.changeMap.set(childKey, change);
      }
    };
    ChildChangeAccumulator2.prototype.getChanges = function() {
      return Array.from(this.changeMap.values());
    };
    return ChildChangeAccumulator2;
  }()
);
var NoCompleteChildSource_ = (
  /** @class */
  function() {
    function NoCompleteChildSource_2() {
    }
    NoCompleteChildSource_2.prototype.getCompleteChild = function(childKey) {
      return null;
    };
    NoCompleteChildSource_2.prototype.getChildAfterChild = function(index, child, reverse) {
      return null;
    };
    return NoCompleteChildSource_2;
  }()
);
var NO_COMPLETE_CHILD_SOURCE = new NoCompleteChildSource_();
var WriteTreeCompleteChildSource = (
  /** @class */
  function() {
    function WriteTreeCompleteChildSource2(writes_, viewCache_, optCompleteServerCache_) {
      if (optCompleteServerCache_ === void 0) {
        optCompleteServerCache_ = null;
      }
      this.writes_ = writes_;
      this.viewCache_ = viewCache_;
      this.optCompleteServerCache_ = optCompleteServerCache_;
    }
    WriteTreeCompleteChildSource2.prototype.getCompleteChild = function(childKey) {
      var node = this.viewCache_.getEventCache();
      if (node.isCompleteForChild(childKey)) {
        return node.getNode().getImmediateChild(childKey);
      } else {
        var serverNode = this.optCompleteServerCache_ != null ? new CacheNode(this.optCompleteServerCache_, true, false) : this.viewCache_.getServerCache();
        return this.writes_.calcCompleteChild(childKey, serverNode);
      }
    };
    WriteTreeCompleteChildSource2.prototype.getChildAfterChild = function(index, child, reverse) {
      var completeServerData = this.optCompleteServerCache_ != null ? this.optCompleteServerCache_ : this.viewCache_.getCompleteServerSnap();
      var nodes = this.writes_.calcIndexedSlice(completeServerData, child, 1, reverse, index);
      if (nodes.length === 0) {
        return null;
      } else {
        return nodes[0];
      }
    };
    return WriteTreeCompleteChildSource2;
  }()
);
var ProcessorResult = (
  /** @class */
  /* @__PURE__ */ function() {
    function ProcessorResult2(viewCache, changes) {
      this.viewCache = viewCache;
      this.changes = changes;
    }
    return ProcessorResult2;
  }()
);
var ViewProcessor = (
  /** @class */
  function() {
    function ViewProcessor2(filter_) {
      this.filter_ = filter_;
    }
    ViewProcessor2.prototype.assertIndexed = function(viewCache) {
      assert(viewCache.getEventCache().getNode().isIndexed(this.filter_.getIndex()), "Event snap not indexed");
      assert(viewCache.getServerCache().getNode().isIndexed(this.filter_.getIndex()), "Server snap not indexed");
    };
    ViewProcessor2.prototype.applyOperation = function(oldViewCache, operation, writesCache, completeCache) {
      var accumulator = new ChildChangeAccumulator();
      var newViewCache, filterServerNode;
      if (operation.type === OperationType.OVERWRITE) {
        var overwrite = operation;
        if (overwrite.source.fromUser) {
          newViewCache = this.applyUserOverwrite_(oldViewCache, overwrite.path, overwrite.snap, writesCache, completeCache, accumulator);
        } else {
          assert(overwrite.source.fromServer, "Unknown source.");
          filterServerNode = overwrite.source.tagged || oldViewCache.getServerCache().isFiltered() && !overwrite.path.isEmpty();
          newViewCache = this.applyServerOverwrite_(oldViewCache, overwrite.path, overwrite.snap, writesCache, completeCache, filterServerNode, accumulator);
        }
      } else if (operation.type === OperationType.MERGE) {
        var merge = operation;
        if (merge.source.fromUser) {
          newViewCache = this.applyUserMerge_(oldViewCache, merge.path, merge.children, writesCache, completeCache, accumulator);
        } else {
          assert(merge.source.fromServer, "Unknown source.");
          filterServerNode = merge.source.tagged || oldViewCache.getServerCache().isFiltered();
          newViewCache = this.applyServerMerge_(oldViewCache, merge.path, merge.children, writesCache, completeCache, filterServerNode, accumulator);
        }
      } else if (operation.type === OperationType.ACK_USER_WRITE) {
        var ackUserWrite = operation;
        if (!ackUserWrite.revert) {
          newViewCache = this.ackUserWrite_(oldViewCache, ackUserWrite.path, ackUserWrite.affectedTree, writesCache, completeCache, accumulator);
        } else {
          newViewCache = this.revertUserWrite_(oldViewCache, ackUserWrite.path, writesCache, completeCache, accumulator);
        }
      } else if (operation.type === OperationType.LISTEN_COMPLETE) {
        newViewCache = this.listenComplete_(oldViewCache, operation.path, writesCache, accumulator);
      } else {
        throw assertionError("Unknown operation type: " + operation.type);
      }
      var changes = accumulator.getChanges();
      ViewProcessor2.maybeAddValueEvent_(oldViewCache, newViewCache, changes);
      return new ProcessorResult(newViewCache, changes);
    };
    ViewProcessor2.maybeAddValueEvent_ = function(oldViewCache, newViewCache, accumulator) {
      var eventSnap = newViewCache.getEventCache();
      if (eventSnap.isFullyInitialized()) {
        var isLeafOrEmpty = eventSnap.getNode().isLeafNode() || eventSnap.getNode().isEmpty();
        var oldCompleteSnap = oldViewCache.getCompleteEventSnap();
        if (accumulator.length > 0 || !oldViewCache.getEventCache().isFullyInitialized() || isLeafOrEmpty && !eventSnap.getNode().equals(
          /** @type {!Node} */
          oldCompleteSnap
        ) || !eventSnap.getNode().getPriority().equals(oldCompleteSnap.getPriority())) {
          accumulator.push(Change.valueChange(
            /** @type {!Node} */
            newViewCache.getCompleteEventSnap()
          ));
        }
      }
    };
    ViewProcessor2.prototype.generateEventCacheAfterServerEvent_ = function(viewCache, changePath, writesCache, source, accumulator) {
      var oldEventSnap = viewCache.getEventCache();
      if (writesCache.shadowingWrite(changePath) != null) {
        return viewCache;
      } else {
        var newEventCache = void 0, serverNode = void 0;
        if (changePath.isEmpty()) {
          assert(viewCache.getServerCache().isFullyInitialized(), "If change path is empty, we must have complete server data");
          if (viewCache.getServerCache().isFiltered()) {
            var serverCache = viewCache.getCompleteServerSnap();
            var completeChildren = serverCache instanceof ChildrenNode ? serverCache : ChildrenNode.EMPTY_NODE;
            var completeEventChildren = writesCache.calcCompleteEventChildren(completeChildren);
            newEventCache = this.filter_.updateFullNode(viewCache.getEventCache().getNode(), completeEventChildren, accumulator);
          } else {
            var completeNode = writesCache.calcCompleteEventCache(viewCache.getCompleteServerSnap());
            newEventCache = this.filter_.updateFullNode(viewCache.getEventCache().getNode(), completeNode, accumulator);
          }
        } else {
          var childKey = changePath.getFront();
          if (childKey === ".priority") {
            assert(changePath.getLength() === 1, "Can't have a priority with additional path components");
            var oldEventNode = oldEventSnap.getNode();
            serverNode = viewCache.getServerCache().getNode();
            var updatedPriority = writesCache.calcEventCacheAfterServerOverwrite(changePath, oldEventNode, serverNode);
            if (updatedPriority != null) {
              newEventCache = this.filter_.updatePriority(oldEventNode, updatedPriority);
            } else {
              newEventCache = oldEventSnap.getNode();
            }
          } else {
            var childChangePath = changePath.popFront();
            var newEventChild = void 0;
            if (oldEventSnap.isCompleteForChild(childKey)) {
              serverNode = viewCache.getServerCache().getNode();
              var eventChildUpdate = writesCache.calcEventCacheAfterServerOverwrite(changePath, oldEventSnap.getNode(), serverNode);
              if (eventChildUpdate != null) {
                newEventChild = oldEventSnap.getNode().getImmediateChild(childKey).updateChild(childChangePath, eventChildUpdate);
              } else {
                newEventChild = oldEventSnap.getNode().getImmediateChild(childKey);
              }
            } else {
              newEventChild = writesCache.calcCompleteChild(childKey, viewCache.getServerCache());
            }
            if (newEventChild != null) {
              newEventCache = this.filter_.updateChild(oldEventSnap.getNode(), childKey, newEventChild, childChangePath, source, accumulator);
            } else {
              newEventCache = oldEventSnap.getNode();
            }
          }
        }
        return viewCache.updateEventSnap(newEventCache, oldEventSnap.isFullyInitialized() || changePath.isEmpty(), this.filter_.filtersNodes());
      }
    };
    ViewProcessor2.prototype.applyServerOverwrite_ = function(oldViewCache, changePath, changedSnap, writesCache, completeCache, filterServerNode, accumulator) {
      var oldServerSnap = oldViewCache.getServerCache();
      var newServerCache;
      var serverFilter = filterServerNode ? this.filter_ : this.filter_.getIndexedFilter();
      if (changePath.isEmpty()) {
        newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), changedSnap, null);
      } else if (serverFilter.filtersNodes() && !oldServerSnap.isFiltered()) {
        var newServerNode = oldServerSnap.getNode().updateChild(changePath, changedSnap);
        newServerCache = serverFilter.updateFullNode(oldServerSnap.getNode(), newServerNode, null);
      } else {
        var childKey = changePath.getFront();
        if (!oldServerSnap.isCompleteForPath(changePath) && changePath.getLength() > 1) {
          return oldViewCache;
        }
        var childChangePath = changePath.popFront();
        var childNode = oldServerSnap.getNode().getImmediateChild(childKey);
        var newChildNode = childNode.updateChild(childChangePath, changedSnap);
        if (childKey === ".priority") {
          newServerCache = serverFilter.updatePriority(oldServerSnap.getNode(), newChildNode);
        } else {
          newServerCache = serverFilter.updateChild(oldServerSnap.getNode(), childKey, newChildNode, childChangePath, NO_COMPLETE_CHILD_SOURCE, null);
        }
      }
      var newViewCache = oldViewCache.updateServerSnap(newServerCache, oldServerSnap.isFullyInitialized() || changePath.isEmpty(), serverFilter.filtersNodes());
      var source = new WriteTreeCompleteChildSource(writesCache, newViewCache, completeCache);
      return this.generateEventCacheAfterServerEvent_(newViewCache, changePath, writesCache, source, accumulator);
    };
    ViewProcessor2.prototype.applyUserOverwrite_ = function(oldViewCache, changePath, changedSnap, writesCache, completeCache, accumulator) {
      var oldEventSnap = oldViewCache.getEventCache();
      var newViewCache, newEventCache;
      var source = new WriteTreeCompleteChildSource(writesCache, oldViewCache, completeCache);
      if (changePath.isEmpty()) {
        newEventCache = this.filter_.updateFullNode(oldViewCache.getEventCache().getNode(), changedSnap, accumulator);
        newViewCache = oldViewCache.updateEventSnap(newEventCache, true, this.filter_.filtersNodes());
      } else {
        var childKey = changePath.getFront();
        if (childKey === ".priority") {
          newEventCache = this.filter_.updatePriority(oldViewCache.getEventCache().getNode(), changedSnap);
          newViewCache = oldViewCache.updateEventSnap(newEventCache, oldEventSnap.isFullyInitialized(), oldEventSnap.isFiltered());
        } else {
          var childChangePath = changePath.popFront();
          var oldChild = oldEventSnap.getNode().getImmediateChild(childKey);
          var newChild = void 0;
          if (childChangePath.isEmpty()) {
            newChild = changedSnap;
          } else {
            var childNode = source.getCompleteChild(childKey);
            if (childNode != null) {
              if (childChangePath.getBack() === ".priority" && childNode.getChild(childChangePath.parent()).isEmpty()) {
                newChild = childNode;
              } else {
                newChild = childNode.updateChild(childChangePath, changedSnap);
              }
            } else {
              newChild = ChildrenNode.EMPTY_NODE;
            }
          }
          if (!oldChild.equals(newChild)) {
            var newEventSnap = this.filter_.updateChild(oldEventSnap.getNode(), childKey, newChild, childChangePath, source, accumulator);
            newViewCache = oldViewCache.updateEventSnap(newEventSnap, oldEventSnap.isFullyInitialized(), this.filter_.filtersNodes());
          } else {
            newViewCache = oldViewCache;
          }
        }
      }
      return newViewCache;
    };
    ViewProcessor2.cacheHasChild_ = function(viewCache, childKey) {
      return viewCache.getEventCache().isCompleteForChild(childKey);
    };
    ViewProcessor2.prototype.applyUserMerge_ = function(viewCache, path, changedChildren, writesCache, serverCache, accumulator) {
      var _this = this;
      var curViewCache = viewCache;
      changedChildren.foreach(function(relativePath, childNode) {
        var writePath = path.child(relativePath);
        if (ViewProcessor2.cacheHasChild_(viewCache, writePath.getFront())) {
          curViewCache = _this.applyUserOverwrite_(curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
        }
      });
      changedChildren.foreach(function(relativePath, childNode) {
        var writePath = path.child(relativePath);
        if (!ViewProcessor2.cacheHasChild_(viewCache, writePath.getFront())) {
          curViewCache = _this.applyUserOverwrite_(curViewCache, writePath, childNode, writesCache, serverCache, accumulator);
        }
      });
      return curViewCache;
    };
    ViewProcessor2.prototype.applyMerge_ = function(node, merge) {
      merge.foreach(function(relativePath, childNode) {
        node = node.updateChild(relativePath, childNode);
      });
      return node;
    };
    ViewProcessor2.prototype.applyServerMerge_ = function(viewCache, path, changedChildren, writesCache, serverCache, filterServerNode, accumulator) {
      var _this = this;
      if (viewCache.getServerCache().getNode().isEmpty() && !viewCache.getServerCache().isFullyInitialized()) {
        return viewCache;
      }
      var curViewCache = viewCache;
      var viewMergeTree;
      if (path.isEmpty()) {
        viewMergeTree = changedChildren;
      } else {
        viewMergeTree = ImmutableTree.Empty.setTree(path, changedChildren);
      }
      var serverNode = viewCache.getServerCache().getNode();
      viewMergeTree.children.inorderTraversal(function(childKey, childTree) {
        if (serverNode.hasChild(childKey)) {
          var serverChild = viewCache.getServerCache().getNode().getImmediateChild(childKey);
          var newChild = _this.applyMerge_(serverChild, childTree);
          curViewCache = _this.applyServerOverwrite_(curViewCache, new Path(childKey), newChild, writesCache, serverCache, filterServerNode, accumulator);
        }
      });
      viewMergeTree.children.inorderTraversal(function(childKey, childMergeTree) {
        var isUnknownDeepMerge = !viewCache.getServerCache().isCompleteForChild(childKey) && childMergeTree.value == null;
        if (!serverNode.hasChild(childKey) && !isUnknownDeepMerge) {
          var serverChild = viewCache.getServerCache().getNode().getImmediateChild(childKey);
          var newChild = _this.applyMerge_(serverChild, childMergeTree);
          curViewCache = _this.applyServerOverwrite_(curViewCache, new Path(childKey), newChild, writesCache, serverCache, filterServerNode, accumulator);
        }
      });
      return curViewCache;
    };
    ViewProcessor2.prototype.ackUserWrite_ = function(viewCache, ackPath, affectedTree, writesCache, completeCache, accumulator) {
      if (writesCache.shadowingWrite(ackPath) != null) {
        return viewCache;
      }
      var filterServerNode = viewCache.getServerCache().isFiltered();
      var serverCache = viewCache.getServerCache();
      if (affectedTree.value != null) {
        if (ackPath.isEmpty() && serverCache.isFullyInitialized() || serverCache.isCompleteForPath(ackPath)) {
          return this.applyServerOverwrite_(viewCache, ackPath, serverCache.getNode().getChild(ackPath), writesCache, completeCache, filterServerNode, accumulator);
        } else if (ackPath.isEmpty()) {
          var changedChildren_1 = ImmutableTree.Empty;
          serverCache.getNode().forEachChild(KEY_INDEX, function(name2, node) {
            changedChildren_1 = changedChildren_1.set(new Path(name2), node);
          });
          return this.applyServerMerge_(viewCache, ackPath, changedChildren_1, writesCache, completeCache, filterServerNode, accumulator);
        } else {
          return viewCache;
        }
      } else {
        var changedChildren_2 = ImmutableTree.Empty;
        affectedTree.foreach(function(mergePath, value) {
          var serverCachePath = ackPath.child(mergePath);
          if (serverCache.isCompleteForPath(serverCachePath)) {
            changedChildren_2 = changedChildren_2.set(mergePath, serverCache.getNode().getChild(serverCachePath));
          }
        });
        return this.applyServerMerge_(viewCache, ackPath, changedChildren_2, writesCache, completeCache, filterServerNode, accumulator);
      }
    };
    ViewProcessor2.prototype.listenComplete_ = function(viewCache, path, writesCache, accumulator) {
      var oldServerNode = viewCache.getServerCache();
      var newViewCache = viewCache.updateServerSnap(oldServerNode.getNode(), oldServerNode.isFullyInitialized() || path.isEmpty(), oldServerNode.isFiltered());
      return this.generateEventCacheAfterServerEvent_(newViewCache, path, writesCache, NO_COMPLETE_CHILD_SOURCE, accumulator);
    };
    ViewProcessor2.prototype.revertUserWrite_ = function(viewCache, path, writesCache, completeServerCache, accumulator) {
      var complete;
      if (writesCache.shadowingWrite(path) != null) {
        return viewCache;
      } else {
        var source = new WriteTreeCompleteChildSource(writesCache, viewCache, completeServerCache);
        var oldEventCache = viewCache.getEventCache().getNode();
        var newEventCache = void 0;
        if (path.isEmpty() || path.getFront() === ".priority") {
          var newNode = void 0;
          if (viewCache.getServerCache().isFullyInitialized()) {
            newNode = writesCache.calcCompleteEventCache(viewCache.getCompleteServerSnap());
          } else {
            var serverChildren = viewCache.getServerCache().getNode();
            assert(serverChildren instanceof ChildrenNode, "serverChildren would be complete if leaf node");
            newNode = writesCache.calcCompleteEventChildren(serverChildren);
          }
          newNode = newNode;
          newEventCache = this.filter_.updateFullNode(oldEventCache, newNode, accumulator);
        } else {
          var childKey = path.getFront();
          var newChild = writesCache.calcCompleteChild(childKey, viewCache.getServerCache());
          if (newChild == null && viewCache.getServerCache().isCompleteForChild(childKey)) {
            newChild = oldEventCache.getImmediateChild(childKey);
          }
          if (newChild != null) {
            newEventCache = this.filter_.updateChild(oldEventCache, childKey, newChild, path.popFront(), source, accumulator);
          } else if (viewCache.getEventCache().getNode().hasChild(childKey)) {
            newEventCache = this.filter_.updateChild(oldEventCache, childKey, ChildrenNode.EMPTY_NODE, path.popFront(), source, accumulator);
          } else {
            newEventCache = oldEventCache;
          }
          if (newEventCache.isEmpty() && viewCache.getServerCache().isFullyInitialized()) {
            complete = writesCache.calcCompleteEventCache(viewCache.getCompleteServerSnap());
            if (complete.isLeafNode()) {
              newEventCache = this.filter_.updateFullNode(newEventCache, complete, accumulator);
            }
          }
        }
        complete = viewCache.getServerCache().isFullyInitialized() || writesCache.shadowingWrite(Path.Empty) != null;
        return viewCache.updateEventSnap(newEventCache, complete, this.filter_.filtersNodes());
      }
    };
    return ViewProcessor2;
  }()
);
var EventGenerator = (
  /** @class */
  function() {
    function EventGenerator2(query_) {
      this.query_ = query_;
      this.index_ = this.query_.getQueryParams().getIndex();
    }
    EventGenerator2.prototype.generateEventsForChanges = function(changes, eventCache, eventRegistrations) {
      var _this = this;
      var events = [];
      var moves = [];
      changes.forEach(function(change) {
        if (change.type === Change.CHILD_CHANGED && _this.index_.indexedValueChanged(change.oldSnap, change.snapshotNode)) {
          moves.push(Change.childMovedChange(change.childName, change.snapshotNode));
        }
      });
      this.generateEventsForType_(events, Change.CHILD_REMOVED, changes, eventRegistrations, eventCache);
      this.generateEventsForType_(events, Change.CHILD_ADDED, changes, eventRegistrations, eventCache);
      this.generateEventsForType_(events, Change.CHILD_MOVED, moves, eventRegistrations, eventCache);
      this.generateEventsForType_(events, Change.CHILD_CHANGED, changes, eventRegistrations, eventCache);
      this.generateEventsForType_(events, Change.VALUE, changes, eventRegistrations, eventCache);
      return events;
    };
    EventGenerator2.prototype.generateEventsForType_ = function(events, eventType, changes, registrations, eventCache) {
      var _this = this;
      var filteredChanges = changes.filter(function(change) {
        return change.type === eventType;
      });
      filteredChanges.sort(this.compareChanges_.bind(this));
      filteredChanges.forEach(function(change) {
        var materializedChange = _this.materializeSingleChange_(change, eventCache);
        registrations.forEach(function(registration) {
          if (registration.respondsTo(change.type)) {
            events.push(registration.createEvent(materializedChange, _this.query_));
          }
        });
      });
    };
    EventGenerator2.prototype.materializeSingleChange_ = function(change, eventCache) {
      if (change.type === "value" || change.type === "child_removed") {
        return change;
      } else {
        change.prevName = eventCache.getPredecessorChildName(
          /** @type {!string} */
          change.childName,
          change.snapshotNode,
          this.index_
        );
        return change;
      }
    };
    EventGenerator2.prototype.compareChanges_ = function(a, b) {
      if (a.childName == null || b.childName == null) {
        throw assertionError("Should only compare child_ events.");
      }
      var aWrapped = new NamedNode(a.childName, a.snapshotNode);
      var bWrapped = new NamedNode(b.childName, b.snapshotNode);
      return this.index_.compare(aWrapped, bWrapped);
    };
    return EventGenerator2;
  }()
);
var View = (
  /** @class */
  function() {
    function View2(query_, initialViewCache) {
      this.query_ = query_;
      this.eventRegistrations_ = [];
      var params = this.query_.getQueryParams();
      var indexFilter = new IndexedFilter(params.getIndex());
      var filter = params.getNodeFilter();
      this.processor_ = new ViewProcessor(filter);
      var initialServerCache = initialViewCache.getServerCache();
      var initialEventCache = initialViewCache.getEventCache();
      var serverSnap = indexFilter.updateFullNode(ChildrenNode.EMPTY_NODE, initialServerCache.getNode(), null);
      var eventSnap = filter.updateFullNode(ChildrenNode.EMPTY_NODE, initialEventCache.getNode(), null);
      var newServerCache = new CacheNode(serverSnap, initialServerCache.isFullyInitialized(), indexFilter.filtersNodes());
      var newEventCache = new CacheNode(eventSnap, initialEventCache.isFullyInitialized(), filter.filtersNodes());
      this.viewCache_ = new ViewCache(newEventCache, newServerCache);
      this.eventGenerator_ = new EventGenerator(this.query_);
    }
    View2.prototype.getQuery = function() {
      return this.query_;
    };
    View2.prototype.getServerCache = function() {
      return this.viewCache_.getServerCache().getNode();
    };
    View2.prototype.getCompleteServerCache = function(path) {
      var cache = this.viewCache_.getCompleteServerSnap();
      if (cache) {
        if (this.query_.getQueryParams().loadsAllData() || !path.isEmpty() && !cache.getImmediateChild(path.getFront()).isEmpty()) {
          return cache.getChild(path);
        }
      }
      return null;
    };
    View2.prototype.isEmpty = function() {
      return this.eventRegistrations_.length === 0;
    };
    View2.prototype.addEventRegistration = function(eventRegistration) {
      this.eventRegistrations_.push(eventRegistration);
    };
    View2.prototype.removeEventRegistration = function(eventRegistration, cancelError) {
      var cancelEvents = [];
      if (cancelError) {
        assert(eventRegistration == null, "A cancel should cancel all event registrations.");
        var path_1 = this.query_.path;
        this.eventRegistrations_.forEach(function(registration) {
          cancelError = cancelError;
          var maybeEvent = registration.createCancelEvent(cancelError, path_1);
          if (maybeEvent) {
            cancelEvents.push(maybeEvent);
          }
        });
      }
      if (eventRegistration) {
        var remaining = [];
        for (var i = 0; i < this.eventRegistrations_.length; ++i) {
          var existing = this.eventRegistrations_[i];
          if (!existing.matches(eventRegistration)) {
            remaining.push(existing);
          } else if (eventRegistration.hasAnyCallback()) {
            remaining = remaining.concat(this.eventRegistrations_.slice(i + 1));
            break;
          }
        }
        this.eventRegistrations_ = remaining;
      } else {
        this.eventRegistrations_ = [];
      }
      return cancelEvents;
    };
    View2.prototype.applyOperation = function(operation, writesCache, completeServerCache) {
      if (operation.type === OperationType.MERGE && operation.source.queryId !== null) {
        assert(this.viewCache_.getCompleteServerSnap(), "We should always have a full cache before handling merges");
        assert(this.viewCache_.getCompleteEventSnap(), "Missing event cache, even though we have a server cache");
      }
      var oldViewCache = this.viewCache_;
      var result = this.processor_.applyOperation(oldViewCache, operation, writesCache, completeServerCache);
      this.processor_.assertIndexed(result.viewCache);
      assert(result.viewCache.getServerCache().isFullyInitialized() || !oldViewCache.getServerCache().isFullyInitialized(), "Once a server snap is complete, it should never go back");
      this.viewCache_ = result.viewCache;
      return this.generateEventsForChanges_(result.changes, result.viewCache.getEventCache().getNode(), null);
    };
    View2.prototype.getInitialEvents = function(registration) {
      var eventSnap = this.viewCache_.getEventCache();
      var initialChanges = [];
      if (!eventSnap.getNode().isLeafNode()) {
        var eventNode = eventSnap.getNode();
        eventNode.forEachChild(PRIORITY_INDEX, function(key, childNode) {
          initialChanges.push(Change.childAddedChange(key, childNode));
        });
      }
      if (eventSnap.isFullyInitialized()) {
        initialChanges.push(Change.valueChange(eventSnap.getNode()));
      }
      return this.generateEventsForChanges_(initialChanges, eventSnap.getNode(), registration);
    };
    View2.prototype.generateEventsForChanges_ = function(changes, eventCache, eventRegistration) {
      var registrations = eventRegistration ? [eventRegistration] : this.eventRegistrations_;
      return this.eventGenerator_.generateEventsForChanges(changes, eventCache, registrations);
    };
    return View2;
  }()
);
var __referenceConstructor$1;
var SyncPoint = (
  /** @class */
  function() {
    function SyncPoint2() {
      this.views = /* @__PURE__ */ new Map();
    }
    Object.defineProperty(SyncPoint2, "__referenceConstructor", {
      get: function() {
        assert(__referenceConstructor$1, "Reference.ts has not been loaded");
        return __referenceConstructor$1;
      },
      set: function(val) {
        assert(!__referenceConstructor$1, "__referenceConstructor has already been defined");
        __referenceConstructor$1 = val;
      },
      enumerable: false,
      configurable: true
    });
    SyncPoint2.prototype.isEmpty = function() {
      return this.views.size === 0;
    };
    SyncPoint2.prototype.applyOperation = function(operation, writesCache, optCompleteServerCache) {
      var e_1, _a;
      var queryId = operation.source.queryId;
      if (queryId !== null) {
        var view = this.views.get(queryId);
        assert(view != null, "SyncTree gave us an op for an invalid query.");
        return view.applyOperation(operation, writesCache, optCompleteServerCache);
      } else {
        var events = [];
        try {
          for (var _b = __values(this.views.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var view = _c.value;
            events = events.concat(view.applyOperation(operation, writesCache, optCompleteServerCache));
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return))
              _a.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        return events;
      }
    };
    SyncPoint2.prototype.addEventRegistration = function(query, eventRegistration, writesCache, serverCache, serverCacheComplete) {
      var queryId = query.queryIdentifier();
      var view = this.views.get(queryId);
      if (!view) {
        var eventCache = writesCache.calcCompleteEventCache(serverCacheComplete ? serverCache : null);
        var eventCacheComplete = false;
        if (eventCache) {
          eventCacheComplete = true;
        } else if (serverCache instanceof ChildrenNode) {
          eventCache = writesCache.calcCompleteEventChildren(serverCache);
          eventCacheComplete = false;
        } else {
          eventCache = ChildrenNode.EMPTY_NODE;
          eventCacheComplete = false;
        }
        var viewCache = new ViewCache(new CacheNode(
          /** @type {!Node} */
          eventCache,
          eventCacheComplete,
          false
        ), new CacheNode(
          /** @type {!Node} */
          serverCache,
          serverCacheComplete,
          false
        ));
        view = new View(query, viewCache);
        this.views.set(queryId, view);
      }
      view.addEventRegistration(eventRegistration);
      return view.getInitialEvents(eventRegistration);
    };
    SyncPoint2.prototype.removeEventRegistration = function(query, eventRegistration, cancelError) {
      var e_2, _a;
      var queryId = query.queryIdentifier();
      var removed = [];
      var cancelEvents = [];
      var hadCompleteView = this.hasCompleteView();
      if (queryId === "default") {
        try {
          for (var _b = __values(this.views.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), viewQueryId = _d[0], view = _d[1];
            cancelEvents = cancelEvents.concat(view.removeEventRegistration(eventRegistration, cancelError));
            if (view.isEmpty()) {
              this.views.delete(viewQueryId);
              if (!view.getQuery().getQueryParams().loadsAllData()) {
                removed.push(view.getQuery());
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return))
              _a.call(_b);
          } finally {
            if (e_2)
              throw e_2.error;
          }
        }
      } else {
        var view = this.views.get(queryId);
        if (view) {
          cancelEvents = cancelEvents.concat(view.removeEventRegistration(eventRegistration, cancelError));
          if (view.isEmpty()) {
            this.views.delete(queryId);
            if (!view.getQuery().getQueryParams().loadsAllData()) {
              removed.push(view.getQuery());
            }
          }
        }
      }
      if (hadCompleteView && !this.hasCompleteView()) {
        removed.push(new SyncPoint2.__referenceConstructor(query.repo, query.path));
      }
      return { removed, events: cancelEvents };
    };
    SyncPoint2.prototype.getQueryViews = function() {
      var e_3, _a;
      var result = [];
      try {
        for (var _b = __values(this.views.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
          var view = _c.value;
          if (!view.getQuery().getQueryParams().loadsAllData()) {
            result.push(view);
          }
        }
      } catch (e_3_1) {
        e_3 = { error: e_3_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_3)
            throw e_3.error;
        }
      }
      return result;
    };
    SyncPoint2.prototype.getCompleteServerCache = function(path) {
      var e_4, _a;
      var serverCache = null;
      try {
        for (var _b = __values(this.views.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
          var view = _c.value;
          serverCache = serverCache || view.getCompleteServerCache(path);
        }
      } catch (e_4_1) {
        e_4 = { error: e_4_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_4)
            throw e_4.error;
        }
      }
      return serverCache;
    };
    SyncPoint2.prototype.viewForQuery = function(query) {
      var params = query.getQueryParams();
      if (params.loadsAllData()) {
        return this.getCompleteView();
      } else {
        var queryId = query.queryIdentifier();
        return this.views.get(queryId);
      }
    };
    SyncPoint2.prototype.viewExistsForQuery = function(query) {
      return this.viewForQuery(query) != null;
    };
    SyncPoint2.prototype.hasCompleteView = function() {
      return this.getCompleteView() != null;
    };
    SyncPoint2.prototype.getCompleteView = function() {
      var e_5, _a;
      try {
        for (var _b = __values(this.views.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
          var view = _c.value;
          if (view.getQuery().getQueryParams().loadsAllData()) {
            return view;
          }
        }
      } catch (e_5_1) {
        e_5 = { error: e_5_1 };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_5)
            throw e_5.error;
        }
      }
      return null;
    };
    return SyncPoint2;
  }()
);
var CompoundWrite = (
  /** @class */
  function() {
    function CompoundWrite2(writeTree_) {
      this.writeTree_ = writeTree_;
    }
    CompoundWrite2.prototype.addWrite = function(path, node) {
      if (path.isEmpty()) {
        return new CompoundWrite2(new ImmutableTree(node));
      } else {
        var rootmost = this.writeTree_.findRootMostValueAndPath(path);
        if (rootmost != null) {
          var rootMostPath = rootmost.path;
          var value = rootmost.value;
          var relativePath = Path.relativePath(rootMostPath, path);
          value = value.updateChild(relativePath, node);
          return new CompoundWrite2(this.writeTree_.set(rootMostPath, value));
        } else {
          var subtree = new ImmutableTree(node);
          var newWriteTree = this.writeTree_.setTree(path, subtree);
          return new CompoundWrite2(newWriteTree);
        }
      }
    };
    CompoundWrite2.prototype.addWrites = function(path, updates) {
      var newWrite = this;
      each(updates, function(childKey, node) {
        newWrite = newWrite.addWrite(path.child(childKey), node);
      });
      return newWrite;
    };
    CompoundWrite2.prototype.removeWrite = function(path) {
      if (path.isEmpty()) {
        return CompoundWrite2.Empty;
      } else {
        var newWriteTree = this.writeTree_.setTree(path, ImmutableTree.Empty);
        return new CompoundWrite2(newWriteTree);
      }
    };
    CompoundWrite2.prototype.hasCompleteWrite = function(path) {
      return this.getCompleteNode(path) != null;
    };
    CompoundWrite2.prototype.getCompleteNode = function(path) {
      var rootmost = this.writeTree_.findRootMostValueAndPath(path);
      if (rootmost != null) {
        return this.writeTree_.get(rootmost.path).getChild(Path.relativePath(rootmost.path, path));
      } else {
        return null;
      }
    };
    CompoundWrite2.prototype.getCompleteChildren = function() {
      var children = [];
      var node = this.writeTree_.value;
      if (node != null) {
        if (!node.isLeafNode()) {
          node.forEachChild(PRIORITY_INDEX, function(childName, childNode) {
            children.push(new NamedNode(childName, childNode));
          });
        }
      } else {
        this.writeTree_.children.inorderTraversal(function(childName, childTree) {
          if (childTree.value != null) {
            children.push(new NamedNode(childName, childTree.value));
          }
        });
      }
      return children;
    };
    CompoundWrite2.prototype.childCompoundWrite = function(path) {
      if (path.isEmpty()) {
        return this;
      } else {
        var shadowingNode = this.getCompleteNode(path);
        if (shadowingNode != null) {
          return new CompoundWrite2(new ImmutableTree(shadowingNode));
        } else {
          return new CompoundWrite2(this.writeTree_.subtree(path));
        }
      }
    };
    CompoundWrite2.prototype.isEmpty = function() {
      return this.writeTree_.isEmpty();
    };
    CompoundWrite2.prototype.apply = function(node) {
      return applySubtreeWrite(Path.Empty, this.writeTree_, node);
    };
    CompoundWrite2.Empty = new CompoundWrite2(new ImmutableTree(null));
    return CompoundWrite2;
  }()
);
function applySubtreeWrite(relativePath, writeTree, node) {
  if (writeTree.value != null) {
    return node.updateChild(relativePath, writeTree.value);
  } else {
    var priorityWrite_1 = null;
    writeTree.children.inorderTraversal(function(childKey, childTree) {
      if (childKey === ".priority") {
        assert(childTree.value !== null, "Priority writes must always be leaf nodes");
        priorityWrite_1 = childTree.value;
      } else {
        node = applySubtreeWrite(relativePath.child(childKey), childTree, node);
      }
    });
    if (!node.getChild(relativePath).isEmpty() && priorityWrite_1 !== null) {
      node = node.updateChild(relativePath.child(".priority"), priorityWrite_1);
    }
    return node;
  }
}
var WriteTree = (
  /** @class */
  function() {
    function WriteTree2() {
      this.visibleWrites_ = CompoundWrite.Empty;
      this.allWrites_ = [];
      this.lastWriteId_ = -1;
    }
    WriteTree2.prototype.childWrites = function(path) {
      return new WriteTreeRef(path, this);
    };
    WriteTree2.prototype.addOverwrite = function(path, snap, writeId, visible) {
      assert(writeId > this.lastWriteId_, "Stacking an older write on top of newer ones");
      if (visible === void 0) {
        visible = true;
      }
      this.allWrites_.push({
        path,
        snap,
        writeId,
        visible
      });
      if (visible) {
        this.visibleWrites_ = this.visibleWrites_.addWrite(path, snap);
      }
      this.lastWriteId_ = writeId;
    };
    WriteTree2.prototype.addMerge = function(path, changedChildren, writeId) {
      assert(writeId > this.lastWriteId_, "Stacking an older merge on top of newer ones");
      this.allWrites_.push({
        path,
        children: changedChildren,
        writeId,
        visible: true
      });
      this.visibleWrites_ = this.visibleWrites_.addWrites(path, changedChildren);
      this.lastWriteId_ = writeId;
    };
    WriteTree2.prototype.getWrite = function(writeId) {
      for (var i = 0; i < this.allWrites_.length; i++) {
        var record = this.allWrites_[i];
        if (record.writeId === writeId) {
          return record;
        }
      }
      return null;
    };
    WriteTree2.prototype.removeWrite = function(writeId) {
      var _this = this;
      var idx = this.allWrites_.findIndex(function(s) {
        return s.writeId === writeId;
      });
      assert(idx >= 0, "removeWrite called with nonexistent writeId.");
      var writeToRemove = this.allWrites_[idx];
      this.allWrites_.splice(idx, 1);
      var removedWriteWasVisible = writeToRemove.visible;
      var removedWriteOverlapsWithOtherWrites = false;
      var i = this.allWrites_.length - 1;
      while (removedWriteWasVisible && i >= 0) {
        var currentWrite = this.allWrites_[i];
        if (currentWrite.visible) {
          if (i >= idx && this.recordContainsPath_(currentWrite, writeToRemove.path)) {
            removedWriteWasVisible = false;
          } else if (writeToRemove.path.contains(currentWrite.path)) {
            removedWriteOverlapsWithOtherWrites = true;
          }
        }
        i--;
      }
      if (!removedWriteWasVisible) {
        return false;
      } else if (removedWriteOverlapsWithOtherWrites) {
        this.resetTree_();
        return true;
      } else {
        if (writeToRemove.snap) {
          this.visibleWrites_ = this.visibleWrites_.removeWrite(writeToRemove.path);
        } else {
          var children = writeToRemove.children;
          each(children, function(childName) {
            _this.visibleWrites_ = _this.visibleWrites_.removeWrite(writeToRemove.path.child(childName));
          });
        }
        return true;
      }
    };
    WriteTree2.prototype.getCompleteWriteData = function(path) {
      return this.visibleWrites_.getCompleteNode(path);
    };
    WriteTree2.prototype.calcCompleteEventCache = function(treePath, completeServerCache, writeIdsToExclude, includeHiddenWrites) {
      if (!writeIdsToExclude && !includeHiddenWrites) {
        var shadowingNode = this.visibleWrites_.getCompleteNode(treePath);
        if (shadowingNode != null) {
          return shadowingNode;
        } else {
          var subMerge = this.visibleWrites_.childCompoundWrite(treePath);
          if (subMerge.isEmpty()) {
            return completeServerCache;
          } else if (completeServerCache == null && !subMerge.hasCompleteWrite(Path.Empty)) {
            return null;
          } else {
            var layeredCache = completeServerCache || ChildrenNode.EMPTY_NODE;
            return subMerge.apply(layeredCache);
          }
        }
      } else {
        var merge = this.visibleWrites_.childCompoundWrite(treePath);
        if (!includeHiddenWrites && merge.isEmpty()) {
          return completeServerCache;
        } else {
          if (!includeHiddenWrites && completeServerCache == null && !merge.hasCompleteWrite(Path.Empty)) {
            return null;
          } else {
            var filter = function(write) {
              return (write.visible || includeHiddenWrites) && (!writeIdsToExclude || !~writeIdsToExclude.indexOf(write.writeId)) && (write.path.contains(treePath) || treePath.contains(write.path));
            };
            var mergeAtPath = WriteTree2.layerTree_(this.allWrites_, filter, treePath);
            var layeredCache = completeServerCache || ChildrenNode.EMPTY_NODE;
            return mergeAtPath.apply(layeredCache);
          }
        }
      }
    };
    WriteTree2.prototype.calcCompleteEventChildren = function(treePath, completeServerChildren) {
      var completeChildren = ChildrenNode.EMPTY_NODE;
      var topLevelSet = this.visibleWrites_.getCompleteNode(treePath);
      if (topLevelSet) {
        if (!topLevelSet.isLeafNode()) {
          topLevelSet.forEachChild(PRIORITY_INDEX, function(childName, childSnap) {
            completeChildren = completeChildren.updateImmediateChild(childName, childSnap);
          });
        }
        return completeChildren;
      } else if (completeServerChildren) {
        var merge_1 = this.visibleWrites_.childCompoundWrite(treePath);
        completeServerChildren.forEachChild(PRIORITY_INDEX, function(childName, childNode) {
          var node = merge_1.childCompoundWrite(new Path(childName)).apply(childNode);
          completeChildren = completeChildren.updateImmediateChild(childName, node);
        });
        merge_1.getCompleteChildren().forEach(function(namedNode) {
          completeChildren = completeChildren.updateImmediateChild(namedNode.name, namedNode.node);
        });
        return completeChildren;
      } else {
        var merge = this.visibleWrites_.childCompoundWrite(treePath);
        merge.getCompleteChildren().forEach(function(namedNode) {
          completeChildren = completeChildren.updateImmediateChild(namedNode.name, namedNode.node);
        });
        return completeChildren;
      }
    };
    WriteTree2.prototype.calcEventCacheAfterServerOverwrite = function(treePath, childPath, existingEventSnap, existingServerSnap) {
      assert(existingEventSnap || existingServerSnap, "Either existingEventSnap or existingServerSnap must exist");
      var path = treePath.child(childPath);
      if (this.visibleWrites_.hasCompleteWrite(path)) {
        return null;
      } else {
        var childMerge = this.visibleWrites_.childCompoundWrite(path);
        if (childMerge.isEmpty()) {
          return existingServerSnap.getChild(childPath);
        } else {
          return childMerge.apply(existingServerSnap.getChild(childPath));
        }
      }
    };
    WriteTree2.prototype.calcCompleteChild = function(treePath, childKey, existingServerSnap) {
      var path = treePath.child(childKey);
      var shadowingNode = this.visibleWrites_.getCompleteNode(path);
      if (shadowingNode != null) {
        return shadowingNode;
      } else {
        if (existingServerSnap.isCompleteForChild(childKey)) {
          var childMerge = this.visibleWrites_.childCompoundWrite(path);
          return childMerge.apply(existingServerSnap.getNode().getImmediateChild(childKey));
        } else {
          return null;
        }
      }
    };
    WriteTree2.prototype.shadowingWrite = function(path) {
      return this.visibleWrites_.getCompleteNode(path);
    };
    WriteTree2.prototype.calcIndexedSlice = function(treePath, completeServerData, startPost, count, reverse, index) {
      var toIterate;
      var merge = this.visibleWrites_.childCompoundWrite(treePath);
      var shadowingNode = merge.getCompleteNode(Path.Empty);
      if (shadowingNode != null) {
        toIterate = shadowingNode;
      } else if (completeServerData != null) {
        toIterate = merge.apply(completeServerData);
      } else {
        return [];
      }
      toIterate = toIterate.withIndex(index);
      if (!toIterate.isEmpty() && !toIterate.isLeafNode()) {
        var nodes = [];
        var cmp = index.getCompare();
        var iter = reverse ? toIterate.getReverseIteratorFrom(startPost, index) : toIterate.getIteratorFrom(startPost, index);
        var next = iter.getNext();
        while (next && nodes.length < count) {
          if (cmp(next, startPost) !== 0) {
            nodes.push(next);
          }
          next = iter.getNext();
        }
        return nodes;
      } else {
        return [];
      }
    };
    WriteTree2.prototype.recordContainsPath_ = function(writeRecord, path) {
      if (writeRecord.snap) {
        return writeRecord.path.contains(path);
      } else {
        for (var childName in writeRecord.children) {
          if (writeRecord.children.hasOwnProperty(childName) && writeRecord.path.child(childName).contains(path)) {
            return true;
          }
        }
        return false;
      }
    };
    WriteTree2.prototype.resetTree_ = function() {
      this.visibleWrites_ = WriteTree2.layerTree_(this.allWrites_, WriteTree2.DefaultFilter_, Path.Empty);
      if (this.allWrites_.length > 0) {
        this.lastWriteId_ = this.allWrites_[this.allWrites_.length - 1].writeId;
      } else {
        this.lastWriteId_ = -1;
      }
    };
    WriteTree2.DefaultFilter_ = function(write) {
      return write.visible;
    };
    WriteTree2.layerTree_ = function(writes, filter, treeRoot) {
      var compoundWrite = CompoundWrite.Empty;
      for (var i = 0; i < writes.length; ++i) {
        var write = writes[i];
        if (filter(write)) {
          var writePath = write.path;
          var relativePath = void 0;
          if (write.snap) {
            if (treeRoot.contains(writePath)) {
              relativePath = Path.relativePath(treeRoot, writePath);
              compoundWrite = compoundWrite.addWrite(relativePath, write.snap);
            } else if (writePath.contains(treeRoot)) {
              relativePath = Path.relativePath(writePath, treeRoot);
              compoundWrite = compoundWrite.addWrite(Path.Empty, write.snap.getChild(relativePath));
            } else
              ;
          } else if (write.children) {
            if (treeRoot.contains(writePath)) {
              relativePath = Path.relativePath(treeRoot, writePath);
              compoundWrite = compoundWrite.addWrites(relativePath, write.children);
            } else if (writePath.contains(treeRoot)) {
              relativePath = Path.relativePath(writePath, treeRoot);
              if (relativePath.isEmpty()) {
                compoundWrite = compoundWrite.addWrites(Path.Empty, write.children);
              } else {
                var child = safeGet(write.children, relativePath.getFront());
                if (child) {
                  var deepNode = child.getChild(relativePath.popFront());
                  compoundWrite = compoundWrite.addWrite(Path.Empty, deepNode);
                }
              }
            } else
              ;
          } else {
            throw assertionError("WriteRecord should have .snap or .children");
          }
        }
      }
      return compoundWrite;
    };
    return WriteTree2;
  }()
);
var WriteTreeRef = (
  /** @class */
  function() {
    function WriteTreeRef2(path, writeTree) {
      this.treePath_ = path;
      this.writeTree_ = writeTree;
    }
    WriteTreeRef2.prototype.calcCompleteEventCache = function(completeServerCache, writeIdsToExclude, includeHiddenWrites) {
      return this.writeTree_.calcCompleteEventCache(this.treePath_, completeServerCache, writeIdsToExclude, includeHiddenWrites);
    };
    WriteTreeRef2.prototype.calcCompleteEventChildren = function(completeServerChildren) {
      return this.writeTree_.calcCompleteEventChildren(this.treePath_, completeServerChildren);
    };
    WriteTreeRef2.prototype.calcEventCacheAfterServerOverwrite = function(path, existingEventSnap, existingServerSnap) {
      return this.writeTree_.calcEventCacheAfterServerOverwrite(this.treePath_, path, existingEventSnap, existingServerSnap);
    };
    WriteTreeRef2.prototype.shadowingWrite = function(path) {
      return this.writeTree_.shadowingWrite(this.treePath_.child(path));
    };
    WriteTreeRef2.prototype.calcIndexedSlice = function(completeServerData, startPost, count, reverse, index) {
      return this.writeTree_.calcIndexedSlice(this.treePath_, completeServerData, startPost, count, reverse, index);
    };
    WriteTreeRef2.prototype.calcCompleteChild = function(childKey, existingServerCache) {
      return this.writeTree_.calcCompleteChild(this.treePath_, childKey, existingServerCache);
    };
    WriteTreeRef2.prototype.child = function(childName) {
      return new WriteTreeRef2(this.treePath_.child(childName), this.writeTree_);
    };
    return WriteTreeRef2;
  }()
);
var SyncTree = (
  /** @class */
  function() {
    function SyncTree2(listenProvider_) {
      this.listenProvider_ = listenProvider_;
      this.syncPointTree_ = ImmutableTree.Empty;
      this.pendingWriteTree_ = new WriteTree();
      this.tagToQueryMap = /* @__PURE__ */ new Map();
      this.queryToTagMap = /* @__PURE__ */ new Map();
    }
    SyncTree2.prototype.applyUserOverwrite = function(path, newData, writeId, visible) {
      this.pendingWriteTree_.addOverwrite(path, newData, writeId, visible);
      if (!visible) {
        return [];
      } else {
        return this.applyOperationToSyncPoints_(new Overwrite(OperationSource.User, path, newData));
      }
    };
    SyncTree2.prototype.applyUserMerge = function(path, changedChildren, writeId) {
      this.pendingWriteTree_.addMerge(path, changedChildren, writeId);
      var changeTree = ImmutableTree.fromObject(changedChildren);
      return this.applyOperationToSyncPoints_(new Merge(OperationSource.User, path, changeTree));
    };
    SyncTree2.prototype.ackUserWrite = function(writeId, revert) {
      if (revert === void 0) {
        revert = false;
      }
      var write = this.pendingWriteTree_.getWrite(writeId);
      var needToReevaluate = this.pendingWriteTree_.removeWrite(writeId);
      if (!needToReevaluate) {
        return [];
      } else {
        var affectedTree_1 = ImmutableTree.Empty;
        if (write.snap != null) {
          affectedTree_1 = affectedTree_1.set(Path.Empty, true);
        } else {
          each(write.children, function(pathString, node) {
            affectedTree_1 = affectedTree_1.set(new Path(pathString), node);
          });
        }
        return this.applyOperationToSyncPoints_(new AckUserWrite(write.path, affectedTree_1, revert));
      }
    };
    SyncTree2.prototype.applyServerOverwrite = function(path, newData) {
      return this.applyOperationToSyncPoints_(new Overwrite(OperationSource.Server, path, newData));
    };
    SyncTree2.prototype.applyServerMerge = function(path, changedChildren) {
      var changeTree = ImmutableTree.fromObject(changedChildren);
      return this.applyOperationToSyncPoints_(new Merge(OperationSource.Server, path, changeTree));
    };
    SyncTree2.prototype.applyListenComplete = function(path) {
      return this.applyOperationToSyncPoints_(new ListenComplete(OperationSource.Server, path));
    };
    SyncTree2.prototype.applyTaggedQueryOverwrite = function(path, snap, tag) {
      var queryKey = this.queryKeyForTag_(tag);
      if (queryKey != null) {
        var r = SyncTree2.parseQueryKey_(queryKey);
        var queryPath = r.path, queryId = r.queryId;
        var relativePath = Path.relativePath(queryPath, path);
        var op = new Overwrite(OperationSource.forServerTaggedQuery(queryId), relativePath, snap);
        return this.applyTaggedOperation_(queryPath, op);
      } else {
        return [];
      }
    };
    SyncTree2.prototype.applyTaggedQueryMerge = function(path, changedChildren, tag) {
      var queryKey = this.queryKeyForTag_(tag);
      if (queryKey) {
        var r = SyncTree2.parseQueryKey_(queryKey);
        var queryPath = r.path, queryId = r.queryId;
        var relativePath = Path.relativePath(queryPath, path);
        var changeTree = ImmutableTree.fromObject(changedChildren);
        var op = new Merge(OperationSource.forServerTaggedQuery(queryId), relativePath, changeTree);
        return this.applyTaggedOperation_(queryPath, op);
      } else {
        return [];
      }
    };
    SyncTree2.prototype.applyTaggedListenComplete = function(path, tag) {
      var queryKey = this.queryKeyForTag_(tag);
      if (queryKey) {
        var r = SyncTree2.parseQueryKey_(queryKey);
        var queryPath = r.path, queryId = r.queryId;
        var relativePath = Path.relativePath(queryPath, path);
        var op = new ListenComplete(OperationSource.forServerTaggedQuery(queryId), relativePath);
        return this.applyTaggedOperation_(queryPath, op);
      } else {
        return [];
      }
    };
    SyncTree2.prototype.addEventRegistration = function(query, eventRegistration) {
      var path = query.path;
      var serverCache = null;
      var foundAncestorDefaultView = false;
      this.syncPointTree_.foreachOnPath(path, function(pathToSyncPoint, sp) {
        var relativePath = Path.relativePath(pathToSyncPoint, path);
        serverCache = serverCache || sp.getCompleteServerCache(relativePath);
        foundAncestorDefaultView = foundAncestorDefaultView || sp.hasCompleteView();
      });
      var syncPoint = this.syncPointTree_.get(path);
      if (!syncPoint) {
        syncPoint = new SyncPoint();
        this.syncPointTree_ = this.syncPointTree_.set(path, syncPoint);
      } else {
        foundAncestorDefaultView = foundAncestorDefaultView || syncPoint.hasCompleteView();
        serverCache = serverCache || syncPoint.getCompleteServerCache(Path.Empty);
      }
      var serverCacheComplete;
      if (serverCache != null) {
        serverCacheComplete = true;
      } else {
        serverCacheComplete = false;
        serverCache = ChildrenNode.EMPTY_NODE;
        var subtree = this.syncPointTree_.subtree(path);
        subtree.foreachChild(function(childName, childSyncPoint) {
          var completeCache = childSyncPoint.getCompleteServerCache(Path.Empty);
          if (completeCache) {
            serverCache = serverCache.updateImmediateChild(childName, completeCache);
          }
        });
      }
      var viewAlreadyExists = syncPoint.viewExistsForQuery(query);
      if (!viewAlreadyExists && !query.getQueryParams().loadsAllData()) {
        var queryKey = SyncTree2.makeQueryKey_(query);
        assert(!this.queryToTagMap.has(queryKey), "View does not exist, but we have a tag");
        var tag = SyncTree2.getNextQueryTag_();
        this.queryToTagMap.set(queryKey, tag);
        this.tagToQueryMap.set(tag, queryKey);
      }
      var writesCache = this.pendingWriteTree_.childWrites(path);
      var events = syncPoint.addEventRegistration(query, eventRegistration, writesCache, serverCache, serverCacheComplete);
      if (!viewAlreadyExists && !foundAncestorDefaultView) {
        var view = syncPoint.viewForQuery(query);
        events = events.concat(this.setupListener_(query, view));
      }
      return events;
    };
    SyncTree2.prototype.removeEventRegistration = function(query, eventRegistration, cancelError) {
      var _this = this;
      var path = query.path;
      var maybeSyncPoint = this.syncPointTree_.get(path);
      var cancelEvents = [];
      if (maybeSyncPoint && (query.queryIdentifier() === "default" || maybeSyncPoint.viewExistsForQuery(query))) {
        var removedAndEvents = maybeSyncPoint.removeEventRegistration(query, eventRegistration, cancelError);
        if (maybeSyncPoint.isEmpty()) {
          this.syncPointTree_ = this.syncPointTree_.remove(path);
        }
        var removed = removedAndEvents.removed;
        cancelEvents = removedAndEvents.events;
        var removingDefault = -1 !== removed.findIndex(function(query2) {
          return query2.getQueryParams().loadsAllData();
        });
        var covered = this.syncPointTree_.findOnPath(path, function(relativePath, parentSyncPoint) {
          return parentSyncPoint.hasCompleteView();
        });
        if (removingDefault && !covered) {
          var subtree = this.syncPointTree_.subtree(path);
          if (!subtree.isEmpty()) {
            var newViews = this.collectDistinctViewsForSubTree_(subtree);
            for (var i = 0; i < newViews.length; ++i) {
              var view = newViews[i], newQuery = view.getQuery();
              var listener = this.createListenerForView_(view);
              this.listenProvider_.startListening(SyncTree2.queryForListening_(newQuery), this.tagForQuery_(newQuery), listener.hashFn, listener.onComplete);
            }
          }
        }
        if (!covered && removed.length > 0 && !cancelError) {
          if (removingDefault) {
            var defaultTag = null;
            this.listenProvider_.stopListening(SyncTree2.queryForListening_(query), defaultTag);
          } else {
            removed.forEach(function(queryToRemove) {
              var tagToRemove = _this.queryToTagMap.get(SyncTree2.makeQueryKey_(queryToRemove));
              _this.listenProvider_.stopListening(SyncTree2.queryForListening_(queryToRemove), tagToRemove);
            });
          }
        }
        this.removeTags_(removed);
      }
      return cancelEvents;
    };
    SyncTree2.prototype.calcCompleteEventCache = function(path, writeIdsToExclude) {
      var includeHiddenSets = true;
      var writeTree = this.pendingWriteTree_;
      var serverCache = this.syncPointTree_.findOnPath(path, function(pathSoFar, syncPoint) {
        var relativePath = Path.relativePath(pathSoFar, path);
        var serverCache2 = syncPoint.getCompleteServerCache(relativePath);
        if (serverCache2) {
          return serverCache2;
        }
      });
      return writeTree.calcCompleteEventCache(path, serverCache, writeIdsToExclude, includeHiddenSets);
    };
    SyncTree2.prototype.collectDistinctViewsForSubTree_ = function(subtree) {
      return subtree.fold(function(relativePath, maybeChildSyncPoint, childMap) {
        if (maybeChildSyncPoint && maybeChildSyncPoint.hasCompleteView()) {
          var completeView = maybeChildSyncPoint.getCompleteView();
          return [completeView];
        } else {
          var views_1 = [];
          if (maybeChildSyncPoint) {
            views_1 = maybeChildSyncPoint.getQueryViews();
          }
          each(childMap, function(_key, childViews) {
            views_1 = views_1.concat(childViews);
          });
          return views_1;
        }
      });
    };
    SyncTree2.prototype.removeTags_ = function(queries) {
      for (var j = 0; j < queries.length; ++j) {
        var removedQuery = queries[j];
        if (!removedQuery.getQueryParams().loadsAllData()) {
          var removedQueryKey = SyncTree2.makeQueryKey_(removedQuery);
          var removedQueryTag = this.queryToTagMap.get(removedQueryKey);
          this.queryToTagMap.delete(removedQueryKey);
          this.tagToQueryMap.delete(removedQueryTag);
        }
      }
    };
    SyncTree2.queryForListening_ = function(query) {
      if (query.getQueryParams().loadsAllData() && !query.getQueryParams().isDefault()) {
        return query.getRef();
      } else {
        return query;
      }
    };
    SyncTree2.prototype.setupListener_ = function(query, view) {
      var path = query.path;
      var tag = this.tagForQuery_(query);
      var listener = this.createListenerForView_(view);
      var events = this.listenProvider_.startListening(SyncTree2.queryForListening_(query), tag, listener.hashFn, listener.onComplete);
      var subtree = this.syncPointTree_.subtree(path);
      if (tag) {
        assert(!subtree.value.hasCompleteView(), "If we're adding a query, it shouldn't be shadowed");
      } else {
        var queriesToStop = subtree.fold(function(relativePath, maybeChildSyncPoint, childMap) {
          if (!relativePath.isEmpty() && maybeChildSyncPoint && maybeChildSyncPoint.hasCompleteView()) {
            return [maybeChildSyncPoint.getCompleteView().getQuery()];
          } else {
            var queries_1 = [];
            if (maybeChildSyncPoint) {
              queries_1 = queries_1.concat(maybeChildSyncPoint.getQueryViews().map(function(view2) {
                return view2.getQuery();
              }));
            }
            each(childMap, function(_key, childQueries) {
              queries_1 = queries_1.concat(childQueries);
            });
            return queries_1;
          }
        });
        for (var i = 0; i < queriesToStop.length; ++i) {
          var queryToStop = queriesToStop[i];
          this.listenProvider_.stopListening(SyncTree2.queryForListening_(queryToStop), this.tagForQuery_(queryToStop));
        }
      }
      return events;
    };
    SyncTree2.prototype.createListenerForView_ = function(view) {
      var _this = this;
      var query = view.getQuery();
      var tag = this.tagForQuery_(query);
      return {
        hashFn: function() {
          var cache = view.getServerCache() || ChildrenNode.EMPTY_NODE;
          return cache.hash();
        },
        onComplete: function(status) {
          if (status === "ok") {
            if (tag) {
              return _this.applyTaggedListenComplete(query.path, tag);
            } else {
              return _this.applyListenComplete(query.path);
            }
          } else {
            var error2 = errorForServerCode(status, query);
            return _this.removeEventRegistration(
              query,
              /*eventRegistration*/
              null,
              error2
            );
          }
        }
      };
    };
    SyncTree2.makeQueryKey_ = function(query) {
      return query.path.toString() + "$" + query.queryIdentifier();
    };
    SyncTree2.parseQueryKey_ = function(queryKey) {
      var splitIndex = queryKey.indexOf("$");
      assert(splitIndex !== -1 && splitIndex < queryKey.length - 1, "Bad queryKey.");
      return {
        queryId: queryKey.substr(splitIndex + 1),
        path: new Path(queryKey.substr(0, splitIndex))
      };
    };
    SyncTree2.prototype.queryKeyForTag_ = function(tag) {
      return this.tagToQueryMap.get(tag);
    };
    SyncTree2.prototype.tagForQuery_ = function(query) {
      var queryKey = SyncTree2.makeQueryKey_(query);
      return this.queryToTagMap.get(queryKey);
    };
    SyncTree2.getNextQueryTag_ = function() {
      return SyncTree2.nextQueryTag_++;
    };
    SyncTree2.prototype.applyTaggedOperation_ = function(queryPath, operation) {
      var syncPoint = this.syncPointTree_.get(queryPath);
      assert(syncPoint, "Missing sync point for query tag that we're tracking");
      var writesCache = this.pendingWriteTree_.childWrites(queryPath);
      return syncPoint.applyOperation(
        operation,
        writesCache,
        /*serverCache=*/
        null
      );
    };
    SyncTree2.prototype.applyOperationToSyncPoints_ = function(operation) {
      return this.applyOperationHelper_(
        operation,
        this.syncPointTree_,
        /*serverCache=*/
        null,
        this.pendingWriteTree_.childWrites(Path.Empty)
      );
    };
    SyncTree2.prototype.applyOperationHelper_ = function(operation, syncPointTree, serverCache, writesCache) {
      if (operation.path.isEmpty()) {
        return this.applyOperationDescendantsHelper_(operation, syncPointTree, serverCache, writesCache);
      } else {
        var syncPoint = syncPointTree.get(Path.Empty);
        if (serverCache == null && syncPoint != null) {
          serverCache = syncPoint.getCompleteServerCache(Path.Empty);
        }
        var events = [];
        var childName = operation.path.getFront();
        var childOperation = operation.operationForChild(childName);
        var childTree = syncPointTree.children.get(childName);
        if (childTree && childOperation) {
          var childServerCache = serverCache ? serverCache.getImmediateChild(childName) : null;
          var childWritesCache = writesCache.child(childName);
          events = events.concat(this.applyOperationHelper_(childOperation, childTree, childServerCache, childWritesCache));
        }
        if (syncPoint) {
          events = events.concat(syncPoint.applyOperation(operation, writesCache, serverCache));
        }
        return events;
      }
    };
    SyncTree2.prototype.applyOperationDescendantsHelper_ = function(operation, syncPointTree, serverCache, writesCache) {
      var _this = this;
      var syncPoint = syncPointTree.get(Path.Empty);
      if (serverCache == null && syncPoint != null) {
        serverCache = syncPoint.getCompleteServerCache(Path.Empty);
      }
      var events = [];
      syncPointTree.children.inorderTraversal(function(childName, childTree) {
        var childServerCache = serverCache ? serverCache.getImmediateChild(childName) : null;
        var childWritesCache = writesCache.child(childName);
        var childOperation = operation.operationForChild(childName);
        if (childOperation) {
          events = events.concat(_this.applyOperationDescendantsHelper_(childOperation, childTree, childServerCache, childWritesCache));
        }
      });
      if (syncPoint) {
        events = events.concat(syncPoint.applyOperation(operation, writesCache, serverCache));
      }
      return events;
    };
    SyncTree2.nextQueryTag_ = 1;
    return SyncTree2;
  }()
);
var SnapshotHolder = (
  /** @class */
  function() {
    function SnapshotHolder2() {
      this.rootNode_ = ChildrenNode.EMPTY_NODE;
    }
    SnapshotHolder2.prototype.getNode = function(path) {
      return this.rootNode_.getChild(path);
    };
    SnapshotHolder2.prototype.updateSnapshot = function(path, newSnapshotNode) {
      this.rootNode_ = this.rootNode_.updateChild(path, newSnapshotNode);
    };
    return SnapshotHolder2;
  }()
);
var StatsCollection = (
  /** @class */
  function() {
    function StatsCollection2() {
      this.counters_ = {};
    }
    StatsCollection2.prototype.incrementCounter = function(name2, amount) {
      if (amount === void 0) {
        amount = 1;
      }
      if (!contains(this.counters_, name2)) {
        this.counters_[name2] = 0;
      }
      this.counters_[name2] += amount;
    };
    StatsCollection2.prototype.get = function() {
      return deepCopy(this.counters_);
    };
    return StatsCollection2;
  }()
);
var StatsManager = (
  /** @class */
  function() {
    function StatsManager2() {
    }
    StatsManager2.getCollection = function(repoInfo) {
      var hashString = repoInfo.toString();
      if (!this.collections_[hashString]) {
        this.collections_[hashString] = new StatsCollection();
      }
      return this.collections_[hashString];
    };
    StatsManager2.getOrCreateReporter = function(repoInfo, creatorFunction) {
      var hashString = repoInfo.toString();
      if (!this.reporters_[hashString]) {
        this.reporters_[hashString] = creatorFunction();
      }
      return this.reporters_[hashString];
    };
    StatsManager2.collections_ = {};
    StatsManager2.reporters_ = {};
    return StatsManager2;
  }()
);
var StatsListener = (
  /** @class */
  function() {
    function StatsListener2(collection_) {
      this.collection_ = collection_;
      this.last_ = null;
    }
    StatsListener2.prototype.get = function() {
      var newStats = this.collection_.get();
      var delta = __assign({}, newStats);
      if (this.last_) {
        each(this.last_, function(stat, value) {
          delta[stat] = delta[stat] - value;
        });
      }
      this.last_ = newStats;
      return delta;
    };
    return StatsListener2;
  }()
);
var FIRST_STATS_MIN_TIME = 10 * 1e3;
var FIRST_STATS_MAX_TIME = 30 * 1e3;
var REPORT_STATS_INTERVAL = 5 * 60 * 1e3;
var StatsReporter = (
  /** @class */
  function() {
    function StatsReporter2(collection, server_) {
      this.server_ = server_;
      this.statsToReport_ = {};
      this.statsListener_ = new StatsListener(collection);
      var timeout = FIRST_STATS_MIN_TIME + (FIRST_STATS_MAX_TIME - FIRST_STATS_MIN_TIME) * Math.random();
      setTimeoutNonBlocking(this.reportStats_.bind(this), Math.floor(timeout));
    }
    StatsReporter2.prototype.includeStat = function(stat) {
      this.statsToReport_[stat] = true;
    };
    StatsReporter2.prototype.reportStats_ = function() {
      var _this = this;
      var stats2 = this.statsListener_.get();
      var reportedStats = {};
      var haveStatsToReport = false;
      each(stats2, function(stat, value) {
        if (value > 0 && contains(_this.statsToReport_, stat)) {
          reportedStats[stat] = value;
          haveStatsToReport = true;
        }
      });
      if (haveStatsToReport) {
        this.server_.reportStats(reportedStats);
      }
      setTimeoutNonBlocking(this.reportStats_.bind(this), Math.floor(Math.random() * 2 * REPORT_STATS_INTERVAL));
    };
    return StatsReporter2;
  }()
);
var EventQueue = (
  /** @class */
  function() {
    function EventQueue2() {
      this.eventLists_ = [];
      this.recursionDepth_ = 0;
    }
    EventQueue2.prototype.queueEvents = function(eventDataList) {
      var currList = null;
      for (var i = 0; i < eventDataList.length; i++) {
        var eventData = eventDataList[i];
        var eventPath = eventData.getPath();
        if (currList !== null && !eventPath.equals(currList.getPath())) {
          this.eventLists_.push(currList);
          currList = null;
        }
        if (currList === null) {
          currList = new EventList(eventPath);
        }
        currList.add(eventData);
      }
      if (currList) {
        this.eventLists_.push(currList);
      }
    };
    EventQueue2.prototype.raiseEventsAtPath = function(path, eventDataList) {
      this.queueEvents(eventDataList);
      this.raiseQueuedEventsMatchingPredicate_(function(eventPath) {
        return eventPath.equals(path);
      });
    };
    EventQueue2.prototype.raiseEventsForChangedPath = function(changedPath, eventDataList) {
      this.queueEvents(eventDataList);
      this.raiseQueuedEventsMatchingPredicate_(function(eventPath) {
        return eventPath.contains(changedPath) || changedPath.contains(eventPath);
      });
    };
    EventQueue2.prototype.raiseQueuedEventsMatchingPredicate_ = function(predicate) {
      this.recursionDepth_++;
      var sentAll = true;
      for (var i = 0; i < this.eventLists_.length; i++) {
        var eventList = this.eventLists_[i];
        if (eventList) {
          var eventPath = eventList.getPath();
          if (predicate(eventPath)) {
            this.eventLists_[i].raise();
            this.eventLists_[i] = null;
          } else {
            sentAll = false;
          }
        }
      }
      if (sentAll) {
        this.eventLists_ = [];
      }
      this.recursionDepth_--;
    };
    return EventQueue2;
  }()
);
var EventList = (
  /** @class */
  function() {
    function EventList2(path_) {
      this.path_ = path_;
      this.events_ = [];
    }
    EventList2.prototype.add = function(eventData) {
      this.events_.push(eventData);
    };
    EventList2.prototype.raise = function() {
      for (var i = 0; i < this.events_.length; i++) {
        var eventData = this.events_[i];
        if (eventData !== null) {
          this.events_[i] = null;
          var eventFn = eventData.getEventRunner();
          if (logger) {
            log("event: " + eventData.toString());
          }
          exceptionGuard(eventFn);
        }
      }
    };
    EventList2.prototype.getPath = function() {
      return this.path_;
    };
    return EventList2;
  }()
);
var EventEmitter = (
  /** @class */
  function() {
    function EventEmitter2(allowedEvents_) {
      this.allowedEvents_ = allowedEvents_;
      this.listeners_ = {};
      assert(Array.isArray(allowedEvents_) && allowedEvents_.length > 0, "Requires a non-empty array");
    }
    EventEmitter2.prototype.trigger = function(eventType) {
      var varArgs = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        varArgs[_i - 1] = arguments[_i];
      }
      if (Array.isArray(this.listeners_[eventType])) {
        var listeners = __spread(this.listeners_[eventType]);
        for (var i = 0; i < listeners.length; i++) {
          listeners[i].callback.apply(listeners[i].context, varArgs);
        }
      }
    };
    EventEmitter2.prototype.on = function(eventType, callback, context) {
      this.validateEventType_(eventType);
      this.listeners_[eventType] = this.listeners_[eventType] || [];
      this.listeners_[eventType].push({ callback, context });
      var eventData = this.getInitialEvent(eventType);
      if (eventData) {
        callback.apply(context, eventData);
      }
    };
    EventEmitter2.prototype.off = function(eventType, callback, context) {
      this.validateEventType_(eventType);
      var listeners = this.listeners_[eventType] || [];
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i].callback === callback && (!context || context === listeners[i].context)) {
          listeners.splice(i, 1);
          return;
        }
      }
    };
    EventEmitter2.prototype.validateEventType_ = function(eventType) {
      assert(this.allowedEvents_.find(function(et) {
        return et === eventType;
      }), "Unknown event: " + eventType);
    };
    return EventEmitter2;
  }()
);
var VisibilityMonitor = (
  /** @class */
  function(_super) {
    __extends(VisibilityMonitor2, _super);
    function VisibilityMonitor2() {
      var _this = _super.call(this, ["visible"]) || this;
      var hidden;
      var visibilityChange;
      if (typeof document !== "undefined" && typeof document.addEventListener !== "undefined") {
        if (typeof document["hidden"] !== "undefined") {
          visibilityChange = "visibilitychange";
          hidden = "hidden";
        } else if (typeof document["mozHidden"] !== "undefined") {
          visibilityChange = "mozvisibilitychange";
          hidden = "mozHidden";
        } else if (typeof document["msHidden"] !== "undefined") {
          visibilityChange = "msvisibilitychange";
          hidden = "msHidden";
        } else if (typeof document["webkitHidden"] !== "undefined") {
          visibilityChange = "webkitvisibilitychange";
          hidden = "webkitHidden";
        }
      }
      _this.visible_ = true;
      if (visibilityChange) {
        document.addEventListener(visibilityChange, function() {
          var visible = !document[hidden];
          if (visible !== _this.visible_) {
            _this.visible_ = visible;
            _this.trigger("visible", visible);
          }
        }, false);
      }
      return _this;
    }
    VisibilityMonitor2.getInstance = function() {
      return new VisibilityMonitor2();
    };
    VisibilityMonitor2.prototype.getInitialEvent = function(eventType) {
      assert(eventType === "visible", "Unknown event type: " + eventType);
      return [this.visible_];
    };
    return VisibilityMonitor2;
  }(EventEmitter)
);
var OnlineMonitor = (
  /** @class */
  function(_super) {
    __extends(OnlineMonitor2, _super);
    function OnlineMonitor2() {
      var _this = _super.call(this, ["online"]) || this;
      _this.online_ = true;
      if (typeof window !== "undefined" && typeof window.addEventListener !== "undefined" && !isMobileCordova()) {
        window.addEventListener("online", function() {
          if (!_this.online_) {
            _this.online_ = true;
            _this.trigger("online", true);
          }
        }, false);
        window.addEventListener("offline", function() {
          if (_this.online_) {
            _this.online_ = false;
            _this.trigger("online", false);
          }
        }, false);
      }
      return _this;
    }
    OnlineMonitor2.getInstance = function() {
      return new OnlineMonitor2();
    };
    OnlineMonitor2.prototype.getInitialEvent = function(eventType) {
      assert(eventType === "online", "Unknown event type: " + eventType);
      return [this.online_];
    };
    OnlineMonitor2.prototype.currentlyOnline = function() {
      return this.online_;
    };
    return OnlineMonitor2;
  }(EventEmitter)
);
var PacketReceiver = (
  /** @class */
  function() {
    function PacketReceiver2(onMessage_) {
      this.onMessage_ = onMessage_;
      this.pendingResponses = [];
      this.currentResponseNum = 0;
      this.closeAfterResponse = -1;
      this.onClose = null;
    }
    PacketReceiver2.prototype.closeAfter = function(responseNum, callback) {
      this.closeAfterResponse = responseNum;
      this.onClose = callback;
      if (this.closeAfterResponse < this.currentResponseNum) {
        this.onClose();
        this.onClose = null;
      }
    };
    PacketReceiver2.prototype.handleResponse = function(requestNum, data) {
      var _this = this;
      this.pendingResponses[requestNum] = data;
      var _loop_1 = function() {
        var toProcess = this_1.pendingResponses[this_1.currentResponseNum];
        delete this_1.pendingResponses[this_1.currentResponseNum];
        var _loop_2 = function(i2) {
          if (toProcess[i2]) {
            exceptionGuard(function() {
              _this.onMessage_(toProcess[i2]);
            });
          }
        };
        for (var i = 0; i < toProcess.length; ++i) {
          _loop_2(i);
        }
        if (this_1.currentResponseNum === this_1.closeAfterResponse) {
          if (this_1.onClose) {
            this_1.onClose();
            this_1.onClose = null;
          }
          return "break";
        }
        this_1.currentResponseNum++;
      };
      var this_1 = this;
      while (this.pendingResponses[this.currentResponseNum]) {
        var state_1 = _loop_1();
        if (state_1 === "break")
          break;
      }
    };
    return PacketReceiver2;
  }()
);
var FIREBASE_LONGPOLL_START_PARAM = "start";
var FIREBASE_LONGPOLL_CLOSE_COMMAND = "close";
var FIREBASE_LONGPOLL_COMMAND_CB_NAME = "pLPCommand";
var FIREBASE_LONGPOLL_DATA_CB_NAME = "pRTLPCB";
var FIREBASE_LONGPOLL_ID_PARAM = "id";
var FIREBASE_LONGPOLL_PW_PARAM = "pw";
var FIREBASE_LONGPOLL_SERIAL_PARAM = "ser";
var FIREBASE_LONGPOLL_CALLBACK_ID_PARAM = "cb";
var FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM = "seg";
var FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET = "ts";
var FIREBASE_LONGPOLL_DATA_PARAM = "d";
var FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM = "dframe";
var MAX_URL_DATA_SIZE = 1870;
var SEG_HEADER_SIZE = 30;
var MAX_PAYLOAD_SIZE = MAX_URL_DATA_SIZE - SEG_HEADER_SIZE;
var KEEPALIVE_REQUEST_INTERVAL = 25e3;
var LP_CONNECT_TIMEOUT = 3e4;
var BrowserPollConnection = (
  /** @class */
  function() {
    function BrowserPollConnection2(connId, repoInfo, applicationId, transportSessionId, lastSessionId) {
      this.connId = connId;
      this.repoInfo = repoInfo;
      this.applicationId = applicationId;
      this.transportSessionId = transportSessionId;
      this.lastSessionId = lastSessionId;
      this.bytesSent = 0;
      this.bytesReceived = 0;
      this.everConnected_ = false;
      this.log_ = logWrapper(connId);
      this.stats_ = StatsManager.getCollection(repoInfo);
      this.urlFn = function(params) {
        return repoInfo.connectionURL(LONG_POLLING, params);
      };
    }
    BrowserPollConnection2.prototype.open = function(onMessage, onDisconnect) {
      var _this = this;
      this.curSegmentNum = 0;
      this.onDisconnect_ = onDisconnect;
      this.myPacketOrderer = new PacketReceiver(onMessage);
      this.isClosed_ = false;
      this.connectTimeoutTimer_ = setTimeout(function() {
        _this.log_("Timed out trying to connect.");
        _this.onClosed_();
        _this.connectTimeoutTimer_ = null;
      }, Math.floor(LP_CONNECT_TIMEOUT));
      executeWhenDOMReady(function() {
        if (_this.isClosed_) {
          return;
        }
        _this.scriptTagHolder = new FirebaseIFrameScriptHolder(function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var _a = __read(args, 5), command = _a[0], arg1 = _a[1], arg2 = _a[2], arg3 = _a[3], arg4 = _a[4];
          _this.incrementIncomingBytes_(args);
          if (!_this.scriptTagHolder) {
            return;
          }
          if (_this.connectTimeoutTimer_) {
            clearTimeout(_this.connectTimeoutTimer_);
            _this.connectTimeoutTimer_ = null;
          }
          _this.everConnected_ = true;
          if (command === FIREBASE_LONGPOLL_START_PARAM) {
            _this.id = arg1;
            _this.password = arg2;
          } else if (command === FIREBASE_LONGPOLL_CLOSE_COMMAND) {
            if (arg1) {
              _this.scriptTagHolder.sendNewPolls = false;
              _this.myPacketOrderer.closeAfter(arg1, function() {
                _this.onClosed_();
              });
            } else {
              _this.onClosed_();
            }
          } else {
            throw new Error("Unrecognized command received: " + command);
          }
        }, function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var _a = __read(args, 2), pN = _a[0], data = _a[1];
          _this.incrementIncomingBytes_(args);
          _this.myPacketOrderer.handleResponse(pN, data);
        }, function() {
          _this.onClosed_();
        }, _this.urlFn);
        var urlParams = {};
        urlParams[FIREBASE_LONGPOLL_START_PARAM] = "t";
        urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM] = Math.floor(Math.random() * 1e8);
        if (_this.scriptTagHolder.uniqueCallbackIdentifier) {
          urlParams[FIREBASE_LONGPOLL_CALLBACK_ID_PARAM] = _this.scriptTagHolder.uniqueCallbackIdentifier;
        }
        urlParams[VERSION_PARAM] = PROTOCOL_VERSION;
        if (_this.transportSessionId) {
          urlParams[TRANSPORT_SESSION_PARAM] = _this.transportSessionId;
        }
        if (_this.lastSessionId) {
          urlParams[LAST_SESSION_PARAM] = _this.lastSessionId;
        }
        if (_this.applicationId) {
          urlParams[APPLICATION_ID_PARAM] = _this.applicationId;
        }
        if (typeof location !== "undefined" && location.href && location.href.indexOf(FORGE_DOMAIN) !== -1) {
          urlParams[REFERER_PARAM] = FORGE_REF;
        }
        var connectURL = _this.urlFn(urlParams);
        _this.log_("Connecting via long-poll to " + connectURL);
        _this.scriptTagHolder.addTag(connectURL, function() {
        });
      });
    };
    BrowserPollConnection2.prototype.start = function() {
      this.scriptTagHolder.startLongPoll(this.id, this.password);
      this.addDisconnectPingFrame(this.id, this.password);
    };
    BrowserPollConnection2.forceAllow = function() {
      BrowserPollConnection2.forceAllow_ = true;
    };
    BrowserPollConnection2.forceDisallow = function() {
      BrowserPollConnection2.forceDisallow_ = true;
    };
    BrowserPollConnection2.isAvailable = function() {
      if (isNodeSdk()) {
        return false;
      } else if (BrowserPollConnection2.forceAllow_) {
        return true;
      } else {
        return !BrowserPollConnection2.forceDisallow_ && typeof document !== "undefined" && document.createElement != null && !isChromeExtensionContentScript() && !isWindowsStoreApp();
      }
    };
    BrowserPollConnection2.prototype.markConnectionHealthy = function() {
    };
    BrowserPollConnection2.prototype.shutdown_ = function() {
      this.isClosed_ = true;
      if (this.scriptTagHolder) {
        this.scriptTagHolder.close();
        this.scriptTagHolder = null;
      }
      if (this.myDisconnFrame) {
        document.body.removeChild(this.myDisconnFrame);
        this.myDisconnFrame = null;
      }
      if (this.connectTimeoutTimer_) {
        clearTimeout(this.connectTimeoutTimer_);
        this.connectTimeoutTimer_ = null;
      }
    };
    BrowserPollConnection2.prototype.onClosed_ = function() {
      if (!this.isClosed_) {
        this.log_("Longpoll is closing itself");
        this.shutdown_();
        if (this.onDisconnect_) {
          this.onDisconnect_(this.everConnected_);
          this.onDisconnect_ = null;
        }
      }
    };
    BrowserPollConnection2.prototype.close = function() {
      if (!this.isClosed_) {
        this.log_("Longpoll is being closed.");
        this.shutdown_();
      }
    };
    BrowserPollConnection2.prototype.send = function(data) {
      var dataStr = stringify(data);
      this.bytesSent += dataStr.length;
      this.stats_.incrementCounter("bytes_sent", dataStr.length);
      var base64data = base64Encode(dataStr);
      var dataSegs = splitStringBySize(base64data, MAX_PAYLOAD_SIZE);
      for (var i = 0; i < dataSegs.length; i++) {
        this.scriptTagHolder.enqueueSegment(this.curSegmentNum, dataSegs.length, dataSegs[i]);
        this.curSegmentNum++;
      }
    };
    BrowserPollConnection2.prototype.addDisconnectPingFrame = function(id, pw) {
      if (isNodeSdk()) {
        return;
      }
      this.myDisconnFrame = document.createElement("iframe");
      var urlParams = {};
      urlParams[FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM] = "t";
      urlParams[FIREBASE_LONGPOLL_ID_PARAM] = id;
      urlParams[FIREBASE_LONGPOLL_PW_PARAM] = pw;
      this.myDisconnFrame.src = this.urlFn(urlParams);
      this.myDisconnFrame.style.display = "none";
      document.body.appendChild(this.myDisconnFrame);
    };
    BrowserPollConnection2.prototype.incrementIncomingBytes_ = function(args) {
      var bytesReceived = stringify(args).length;
      this.bytesReceived += bytesReceived;
      this.stats_.incrementCounter("bytes_received", bytesReceived);
    };
    return BrowserPollConnection2;
  }()
);
var FirebaseIFrameScriptHolder = (
  /** @class */
  function() {
    function FirebaseIFrameScriptHolder2(commandCB, onMessageCB, onDisconnect, urlFn) {
      this.onDisconnect = onDisconnect;
      this.urlFn = urlFn;
      this.outstandingRequests = /* @__PURE__ */ new Set();
      this.pendingSegs = [];
      this.currentSerial = Math.floor(Math.random() * 1e8);
      this.sendNewPolls = true;
      if (!isNodeSdk()) {
        this.uniqueCallbackIdentifier = LUIDGenerator();
        window[FIREBASE_LONGPOLL_COMMAND_CB_NAME + this.uniqueCallbackIdentifier] = commandCB;
        window[FIREBASE_LONGPOLL_DATA_CB_NAME + this.uniqueCallbackIdentifier] = onMessageCB;
        this.myIFrame = FirebaseIFrameScriptHolder2.createIFrame_();
        var script = "";
        if (this.myIFrame.src && this.myIFrame.src.substr(0, "javascript:".length) === "javascript:") {
          var currentDomain = document.domain;
          script = '<script>document.domain="' + currentDomain + '";<\/script>';
        }
        var iframeContents = "<html><body>" + script + "</body></html>";
        try {
          this.myIFrame.doc.open();
          this.myIFrame.doc.write(iframeContents);
          this.myIFrame.doc.close();
        } catch (e) {
          log("frame writing exception");
          if (e.stack) {
            log(e.stack);
          }
          log(e);
        }
      } else {
        this.commandCB = commandCB;
        this.onMessageCB = onMessageCB;
      }
    }
    FirebaseIFrameScriptHolder2.createIFrame_ = function() {
      var iframe = document.createElement("iframe");
      iframe.style.display = "none";
      if (document.body) {
        document.body.appendChild(iframe);
        try {
          var a = iframe.contentWindow.document;
          if (!a) {
            log("No IE domain setting required");
          }
        } catch (e) {
          var domain = document.domain;
          iframe.src = "javascript:void((function(){document.open();document.domain='" + domain + "';document.close();})())";
        }
      } else {
        throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
      }
      if (iframe.contentDocument) {
        iframe.doc = iframe.contentDocument;
      } else if (iframe.contentWindow) {
        iframe.doc = iframe.contentWindow.document;
      } else if (iframe.document) {
        iframe.doc = iframe.document;
      }
      return iframe;
    };
    FirebaseIFrameScriptHolder2.prototype.close = function() {
      var _this = this;
      this.alive = false;
      if (this.myIFrame) {
        this.myIFrame.doc.body.innerHTML = "";
        setTimeout(function() {
          if (_this.myIFrame !== null) {
            document.body.removeChild(_this.myIFrame);
            _this.myIFrame = null;
          }
        }, Math.floor(0));
      }
      var onDisconnect = this.onDisconnect;
      if (onDisconnect) {
        this.onDisconnect = null;
        onDisconnect();
      }
    };
    FirebaseIFrameScriptHolder2.prototype.startLongPoll = function(id, pw) {
      this.myID = id;
      this.myPW = pw;
      this.alive = true;
      while (this.newRequest_()) {
      }
    };
    FirebaseIFrameScriptHolder2.prototype.newRequest_ = function() {
      if (this.alive && this.sendNewPolls && this.outstandingRequests.size < (this.pendingSegs.length > 0 ? 2 : 1)) {
        this.currentSerial++;
        var urlParams = {};
        urlParams[FIREBASE_LONGPOLL_ID_PARAM] = this.myID;
        urlParams[FIREBASE_LONGPOLL_PW_PARAM] = this.myPW;
        urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM] = this.currentSerial;
        var theURL = this.urlFn(urlParams);
        var curDataString = "";
        var i = 0;
        while (this.pendingSegs.length > 0) {
          var nextSeg = this.pendingSegs[0];
          if (nextSeg.d.length + SEG_HEADER_SIZE + curDataString.length <= MAX_URL_DATA_SIZE) {
            var theSeg = this.pendingSegs.shift();
            curDataString = curDataString + "&" + FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM + i + "=" + theSeg.seg + "&" + FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET + i + "=" + theSeg.ts + "&" + FIREBASE_LONGPOLL_DATA_PARAM + i + "=" + theSeg.d;
            i++;
          } else {
            break;
          }
        }
        theURL = theURL + curDataString;
        this.addLongPollTag_(theURL, this.currentSerial);
        return true;
      } else {
        return false;
      }
    };
    FirebaseIFrameScriptHolder2.prototype.enqueueSegment = function(segnum, totalsegs, data) {
      this.pendingSegs.push({ seg: segnum, ts: totalsegs, d: data });
      if (this.alive) {
        this.newRequest_();
      }
    };
    FirebaseIFrameScriptHolder2.prototype.addLongPollTag_ = function(url, serial) {
      var _this = this;
      this.outstandingRequests.add(serial);
      var doNewRequest = function() {
        _this.outstandingRequests.delete(serial);
        _this.newRequest_();
      };
      var keepaliveTimeout = setTimeout(doNewRequest, Math.floor(KEEPALIVE_REQUEST_INTERVAL));
      var readyStateCB = function() {
        clearTimeout(keepaliveTimeout);
        doNewRequest();
      };
      this.addTag(url, readyStateCB);
    };
    FirebaseIFrameScriptHolder2.prototype.addTag = function(url, loadCB) {
      var _this = this;
      if (isNodeSdk()) {
        this.doNodeLongPoll(url, loadCB);
      } else {
        setTimeout(function() {
          try {
            if (!_this.sendNewPolls) {
              return;
            }
            var newScript_1 = _this.myIFrame.doc.createElement("script");
            newScript_1.type = "text/javascript";
            newScript_1.async = true;
            newScript_1.src = url;
            newScript_1.onload = newScript_1.onreadystatechange = function() {
              var rstate = newScript_1.readyState;
              if (!rstate || rstate === "loaded" || rstate === "complete") {
                newScript_1.onload = newScript_1.onreadystatechange = null;
                if (newScript_1.parentNode) {
                  newScript_1.parentNode.removeChild(newScript_1);
                }
                loadCB();
              }
            };
            newScript_1.onerror = function() {
              log("Long-poll script failed to load: " + url);
              _this.sendNewPolls = false;
              _this.close();
            };
            _this.myIFrame.doc.body.appendChild(newScript_1);
          } catch (e) {
          }
        }, Math.floor(1));
      }
    };
    return FirebaseIFrameScriptHolder2;
  }()
);
var SDK_VERSION = "";
function setSDKVersion(version2) {
  SDK_VERSION = version2;
}
var WEBSOCKET_MAX_FRAME_SIZE = 16384;
var WEBSOCKET_KEEPALIVE_INTERVAL = 45e3;
var WebSocketImpl = null;
if (typeof MozWebSocket !== "undefined") {
  WebSocketImpl = MozWebSocket;
} else if (typeof WebSocket !== "undefined") {
  WebSocketImpl = WebSocket;
}
var WebSocketConnection = (
  /** @class */
  function() {
    function WebSocketConnection2(connId, repoInfo, applicationId, transportSessionId, lastSessionId) {
      this.connId = connId;
      this.applicationId = applicationId;
      this.keepaliveTimer = null;
      this.frames = null;
      this.totalFrames = 0;
      this.bytesSent = 0;
      this.bytesReceived = 0;
      this.log_ = logWrapper(this.connId);
      this.stats_ = StatsManager.getCollection(repoInfo);
      this.connURL = WebSocketConnection2.connectionURL_(repoInfo, transportSessionId, lastSessionId);
      this.nodeAdmin = repoInfo.nodeAdmin;
    }
    WebSocketConnection2.connectionURL_ = function(repoInfo, transportSessionId, lastSessionId) {
      var urlParams = {};
      urlParams[VERSION_PARAM] = PROTOCOL_VERSION;
      if (!isNodeSdk() && typeof location !== "undefined" && location.href && location.href.indexOf(FORGE_DOMAIN) !== -1) {
        urlParams[REFERER_PARAM] = FORGE_REF;
      }
      if (transportSessionId) {
        urlParams[TRANSPORT_SESSION_PARAM] = transportSessionId;
      }
      if (lastSessionId) {
        urlParams[LAST_SESSION_PARAM] = lastSessionId;
      }
      return repoInfo.connectionURL(WEBSOCKET, urlParams);
    };
    WebSocketConnection2.prototype.open = function(onMessage, onDisconnect) {
      var _this = this;
      this.onDisconnect = onDisconnect;
      this.onMessage = onMessage;
      this.log_("Websocket connecting to " + this.connURL);
      this.everConnected_ = false;
      PersistentStorage.set("previous_websocket_failure", true);
      try {
        if (isNodeSdk()) {
          var device = this.nodeAdmin ? "AdminNode" : "Node";
          var options = {
            headers: {
              "User-Agent": "Firebase/" + PROTOCOL_VERSION + "/" + SDK_VERSION + "/" + process.platform + "/" + device,
              "X-Firebase-GMPID": this.applicationId || ""
            }
          };
          var env = process["env"];
          var proxy = this.connURL.indexOf("wss://") === 0 ? env["HTTPS_PROXY"] || env["https_proxy"] : env["HTTP_PROXY"] || env["http_proxy"];
          if (proxy) {
            options["proxy"] = { origin: proxy };
          }
          this.mySock = new WebSocketImpl(this.connURL, [], options);
        } else {
          var options = {
            headers: {
              "X-Firebase-GMPID": this.applicationId || ""
            }
          };
          this.mySock = new WebSocketImpl(this.connURL, [], options);
        }
      } catch (e) {
        this.log_("Error instantiating WebSocket.");
        var error2 = e.message || e.data;
        if (error2) {
          this.log_(error2);
        }
        this.onClosed_();
        return;
      }
      this.mySock.onopen = function() {
        _this.log_("Websocket connected.");
        _this.everConnected_ = true;
      };
      this.mySock.onclose = function() {
        _this.log_("Websocket connection was disconnected.");
        _this.mySock = null;
        _this.onClosed_();
      };
      this.mySock.onmessage = function(m) {
        _this.handleIncomingFrame(m);
      };
      this.mySock.onerror = function(e) {
        _this.log_("WebSocket error.  Closing connection.");
        var error3 = e.message || e.data;
        if (error3) {
          _this.log_(error3);
        }
        _this.onClosed_();
      };
    };
    WebSocketConnection2.prototype.start = function() {
    };
    WebSocketConnection2.forceDisallow = function() {
      WebSocketConnection2.forceDisallow_ = true;
    };
    WebSocketConnection2.isAvailable = function() {
      var isOldAndroid = false;
      if (typeof navigator !== "undefined" && navigator.userAgent) {
        var oldAndroidRegex = /Android ([0-9]{0,}\.[0-9]{0,})/;
        var oldAndroidMatch = navigator.userAgent.match(oldAndroidRegex);
        if (oldAndroidMatch && oldAndroidMatch.length > 1) {
          if (parseFloat(oldAndroidMatch[1]) < 4.4) {
            isOldAndroid = true;
          }
        }
      }
      return !isOldAndroid && WebSocketImpl !== null && !WebSocketConnection2.forceDisallow_;
    };
    WebSocketConnection2.previouslyFailed = function() {
      return PersistentStorage.isInMemoryStorage || PersistentStorage.get("previous_websocket_failure") === true;
    };
    WebSocketConnection2.prototype.markConnectionHealthy = function() {
      PersistentStorage.remove("previous_websocket_failure");
    };
    WebSocketConnection2.prototype.appendFrame_ = function(data) {
      this.frames.push(data);
      if (this.frames.length === this.totalFrames) {
        var fullMess = this.frames.join("");
        this.frames = null;
        var jsonMess = jsonEval(fullMess);
        this.onMessage(jsonMess);
      }
    };
    WebSocketConnection2.prototype.handleNewFrameCount_ = function(frameCount) {
      this.totalFrames = frameCount;
      this.frames = [];
    };
    WebSocketConnection2.prototype.extractFrameCount_ = function(data) {
      assert(this.frames === null, "We already have a frame buffer");
      if (data.length <= 6) {
        var frameCount = Number(data);
        if (!isNaN(frameCount)) {
          this.handleNewFrameCount_(frameCount);
          return null;
        }
      }
      this.handleNewFrameCount_(1);
      return data;
    };
    WebSocketConnection2.prototype.handleIncomingFrame = function(mess) {
      if (this.mySock === null) {
        return;
      }
      var data = mess["data"];
      this.bytesReceived += data.length;
      this.stats_.incrementCounter("bytes_received", data.length);
      this.resetKeepAlive();
      if (this.frames !== null) {
        this.appendFrame_(data);
      } else {
        var remainingData = this.extractFrameCount_(data);
        if (remainingData !== null) {
          this.appendFrame_(remainingData);
        }
      }
    };
    WebSocketConnection2.prototype.send = function(data) {
      this.resetKeepAlive();
      var dataStr = stringify(data);
      this.bytesSent += dataStr.length;
      this.stats_.incrementCounter("bytes_sent", dataStr.length);
      var dataSegs = splitStringBySize(dataStr, WEBSOCKET_MAX_FRAME_SIZE);
      if (dataSegs.length > 1) {
        this.sendString_(String(dataSegs.length));
      }
      for (var i = 0; i < dataSegs.length; i++) {
        this.sendString_(dataSegs[i]);
      }
    };
    WebSocketConnection2.prototype.shutdown_ = function() {
      this.isClosed_ = true;
      if (this.keepaliveTimer) {
        clearInterval(this.keepaliveTimer);
        this.keepaliveTimer = null;
      }
      if (this.mySock) {
        this.mySock.close();
        this.mySock = null;
      }
    };
    WebSocketConnection2.prototype.onClosed_ = function() {
      if (!this.isClosed_) {
        this.log_("WebSocket is closing itself");
        this.shutdown_();
        if (this.onDisconnect) {
          this.onDisconnect(this.everConnected_);
          this.onDisconnect = null;
        }
      }
    };
    WebSocketConnection2.prototype.close = function() {
      if (!this.isClosed_) {
        this.log_("WebSocket is being closed");
        this.shutdown_();
      }
    };
    WebSocketConnection2.prototype.resetKeepAlive = function() {
      var _this = this;
      clearInterval(this.keepaliveTimer);
      this.keepaliveTimer = setInterval(function() {
        if (_this.mySock) {
          _this.sendString_("0");
        }
        _this.resetKeepAlive();
      }, Math.floor(WEBSOCKET_KEEPALIVE_INTERVAL));
    };
    WebSocketConnection2.prototype.sendString_ = function(str) {
      try {
        this.mySock.send(str);
      } catch (e) {
        this.log_("Exception thrown from WebSocket.send():", e.message || e.data, "Closing connection.");
        setTimeout(this.onClosed_.bind(this), 0);
      }
    };
    WebSocketConnection2.responsesRequiredToBeHealthy = 2;
    WebSocketConnection2.healthyTimeout = 3e4;
    return WebSocketConnection2;
  }()
);
var TransportManager = (
  /** @class */
  function() {
    function TransportManager2(repoInfo) {
      this.initTransports_(repoInfo);
    }
    Object.defineProperty(TransportManager2, "ALL_TRANSPORTS", {
      /**
       * @const
       * @type {!Array.<function(new:Transport, string, RepoInfo, string=)>}
       */
      get: function() {
        return [BrowserPollConnection, WebSocketConnection];
      },
      enumerable: false,
      configurable: true
    });
    TransportManager2.prototype.initTransports_ = function(repoInfo) {
      var e_1, _a;
      var isWebSocketsAvailable2 = WebSocketConnection && WebSocketConnection["isAvailable"]();
      var isSkipPollConnection = isWebSocketsAvailable2 && !WebSocketConnection.previouslyFailed();
      if (repoInfo.webSocketOnly) {
        if (!isWebSocketsAvailable2) {
          warn("wss:// URL used, but browser isn't known to support websockets.  Trying anyway.");
        }
        isSkipPollConnection = true;
      }
      if (isSkipPollConnection) {
        this.transports_ = [WebSocketConnection];
      } else {
        var transports = this.transports_ = [];
        try {
          for (var _b = __values(TransportManager2.ALL_TRANSPORTS), _c = _b.next(); !_c.done; _c = _b.next()) {
            var transport = _c.value;
            if (transport && transport["isAvailable"]()) {
              transports.push(transport);
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return))
              _a.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
      }
    };
    TransportManager2.prototype.initialTransport = function() {
      if (this.transports_.length > 0) {
        return this.transports_[0];
      } else {
        throw new Error("No transports available");
      }
    };
    TransportManager2.prototype.upgradeTransport = function() {
      if (this.transports_.length > 1) {
        return this.transports_[1];
      } else {
        return null;
      }
    };
    return TransportManager2;
  }()
);
var UPGRADE_TIMEOUT = 6e4;
var DELAY_BEFORE_SENDING_EXTRA_REQUESTS = 5e3;
var BYTES_SENT_HEALTHY_OVERRIDE = 10 * 1024;
var BYTES_RECEIVED_HEALTHY_OVERRIDE = 100 * 1024;
var MESSAGE_TYPE = "t";
var MESSAGE_DATA = "d";
var CONTROL_SHUTDOWN = "s";
var CONTROL_RESET = "r";
var CONTROL_ERROR = "e";
var CONTROL_PONG = "o";
var SWITCH_ACK = "a";
var END_TRANSMISSION = "n";
var PING = "p";
var SERVER_HELLO = "h";
var Connection = (
  /** @class */
  function() {
    function Connection2(id, repoInfo_, applicationId_, onMessage_, onReady_, onDisconnect_, onKill_, lastSessionId) {
      this.id = id;
      this.repoInfo_ = repoInfo_;
      this.applicationId_ = applicationId_;
      this.onMessage_ = onMessage_;
      this.onReady_ = onReady_;
      this.onDisconnect_ = onDisconnect_;
      this.onKill_ = onKill_;
      this.lastSessionId = lastSessionId;
      this.connectionCount = 0;
      this.pendingDataMessages = [];
      this.state_ = 0;
      this.log_ = logWrapper("c:" + this.id + ":");
      this.transportManager_ = new TransportManager(repoInfo_);
      this.log_("Connection created");
      this.start_();
    }
    Connection2.prototype.start_ = function() {
      var _this = this;
      var conn = this.transportManager_.initialTransport();
      this.conn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.applicationId_, void 0, this.lastSessionId);
      this.primaryResponsesRequired_ = conn["responsesRequiredToBeHealthy"] || 0;
      var onMessageReceived = this.connReceiver_(this.conn_);
      var onConnectionLost = this.disconnReceiver_(this.conn_);
      this.tx_ = this.conn_;
      this.rx_ = this.conn_;
      this.secondaryConn_ = null;
      this.isHealthy_ = false;
      setTimeout(function() {
        _this.conn_ && _this.conn_.open(onMessageReceived, onConnectionLost);
      }, Math.floor(0));
      var healthyTimeoutMS = conn["healthyTimeout"] || 0;
      if (healthyTimeoutMS > 0) {
        this.healthyTimeout_ = setTimeoutNonBlocking(function() {
          _this.healthyTimeout_ = null;
          if (!_this.isHealthy_) {
            if (_this.conn_ && _this.conn_.bytesReceived > BYTES_RECEIVED_HEALTHY_OVERRIDE) {
              _this.log_("Connection exceeded healthy timeout but has received " + _this.conn_.bytesReceived + " bytes.  Marking connection healthy.");
              _this.isHealthy_ = true;
              _this.conn_.markConnectionHealthy();
            } else if (_this.conn_ && _this.conn_.bytesSent > BYTES_SENT_HEALTHY_OVERRIDE) {
              _this.log_("Connection exceeded healthy timeout but has sent " + _this.conn_.bytesSent + " bytes.  Leaving connection alive.");
            } else {
              _this.log_("Closing unhealthy connection after timeout.");
              _this.close();
            }
          }
        }, Math.floor(healthyTimeoutMS));
      }
    };
    Connection2.prototype.nextTransportId_ = function() {
      return "c:" + this.id + ":" + this.connectionCount++;
    };
    Connection2.prototype.disconnReceiver_ = function(conn) {
      var _this = this;
      return function(everConnected) {
        if (conn === _this.conn_) {
          _this.onConnectionLost_(everConnected);
        } else if (conn === _this.secondaryConn_) {
          _this.log_("Secondary connection lost.");
          _this.onSecondaryConnectionLost_();
        } else {
          _this.log_("closing an old connection");
        }
      };
    };
    Connection2.prototype.connReceiver_ = function(conn) {
      var _this = this;
      return function(message) {
        if (_this.state_ !== 2) {
          if (conn === _this.rx_) {
            _this.onPrimaryMessageReceived_(message);
          } else if (conn === _this.secondaryConn_) {
            _this.onSecondaryMessageReceived_(message);
          } else {
            _this.log_("message on old connection");
          }
        }
      };
    };
    Connection2.prototype.sendRequest = function(dataMsg) {
      var msg = { t: "d", d: dataMsg };
      this.sendData_(msg);
    };
    Connection2.prototype.tryCleanupConnection = function() {
      if (this.tx_ === this.secondaryConn_ && this.rx_ === this.secondaryConn_) {
        this.log_("cleaning up and promoting a connection: " + this.secondaryConn_.connId);
        this.conn_ = this.secondaryConn_;
        this.secondaryConn_ = null;
      }
    };
    Connection2.prototype.onSecondaryControl_ = function(controlData) {
      if (MESSAGE_TYPE in controlData) {
        var cmd = controlData[MESSAGE_TYPE];
        if (cmd === SWITCH_ACK) {
          this.upgradeIfSecondaryHealthy_();
        } else if (cmd === CONTROL_RESET) {
          this.log_("Got a reset on secondary, closing it");
          this.secondaryConn_.close();
          if (this.tx_ === this.secondaryConn_ || this.rx_ === this.secondaryConn_) {
            this.close();
          }
        } else if (cmd === CONTROL_PONG) {
          this.log_("got pong on secondary.");
          this.secondaryResponsesRequired_--;
          this.upgradeIfSecondaryHealthy_();
        }
      }
    };
    Connection2.prototype.onSecondaryMessageReceived_ = function(parsedData) {
      var layer = requireKey("t", parsedData);
      var data = requireKey("d", parsedData);
      if (layer === "c") {
        this.onSecondaryControl_(data);
      } else if (layer === "d") {
        this.pendingDataMessages.push(data);
      } else {
        throw new Error("Unknown protocol layer: " + layer);
      }
    };
    Connection2.prototype.upgradeIfSecondaryHealthy_ = function() {
      if (this.secondaryResponsesRequired_ <= 0) {
        this.log_("Secondary connection is healthy.");
        this.isHealthy_ = true;
        this.secondaryConn_.markConnectionHealthy();
        this.proceedWithUpgrade_();
      } else {
        this.log_("sending ping on secondary.");
        this.secondaryConn_.send({ t: "c", d: { t: PING, d: {} } });
      }
    };
    Connection2.prototype.proceedWithUpgrade_ = function() {
      this.secondaryConn_.start();
      this.log_("sending client ack on secondary");
      this.secondaryConn_.send({ t: "c", d: { t: SWITCH_ACK, d: {} } });
      this.log_("Ending transmission on primary");
      this.conn_.send({ t: "c", d: { t: END_TRANSMISSION, d: {} } });
      this.tx_ = this.secondaryConn_;
      this.tryCleanupConnection();
    };
    Connection2.prototype.onPrimaryMessageReceived_ = function(parsedData) {
      var layer = requireKey("t", parsedData);
      var data = requireKey("d", parsedData);
      if (layer === "c") {
        this.onControl_(data);
      } else if (layer === "d") {
        this.onDataMessage_(data);
      }
    };
    Connection2.prototype.onDataMessage_ = function(message) {
      this.onPrimaryResponse_();
      this.onMessage_(message);
    };
    Connection2.prototype.onPrimaryResponse_ = function() {
      if (!this.isHealthy_) {
        this.primaryResponsesRequired_--;
        if (this.primaryResponsesRequired_ <= 0) {
          this.log_("Primary connection is healthy.");
          this.isHealthy_ = true;
          this.conn_.markConnectionHealthy();
        }
      }
    };
    Connection2.prototype.onControl_ = function(controlData) {
      var cmd = requireKey(MESSAGE_TYPE, controlData);
      if (MESSAGE_DATA in controlData) {
        var payload = controlData[MESSAGE_DATA];
        if (cmd === SERVER_HELLO) {
          this.onHandshake_(payload);
        } else if (cmd === END_TRANSMISSION) {
          this.log_("recvd end transmission on primary");
          this.rx_ = this.secondaryConn_;
          for (var i = 0; i < this.pendingDataMessages.length; ++i) {
            this.onDataMessage_(this.pendingDataMessages[i]);
          }
          this.pendingDataMessages = [];
          this.tryCleanupConnection();
        } else if (cmd === CONTROL_SHUTDOWN) {
          this.onConnectionShutdown_(payload);
        } else if (cmd === CONTROL_RESET) {
          this.onReset_(payload);
        } else if (cmd === CONTROL_ERROR) {
          error("Server Error: " + payload);
        } else if (cmd === CONTROL_PONG) {
          this.log_("got pong on primary.");
          this.onPrimaryResponse_();
          this.sendPingOnPrimaryIfNecessary_();
        } else {
          error("Unknown control packet command: " + cmd);
        }
      }
    };
    Connection2.prototype.onHandshake_ = function(handshake) {
      var timestamp = handshake.ts;
      var version2 = handshake.v;
      var host = handshake.h;
      this.sessionId = handshake.s;
      this.repoInfo_.updateHost(host);
      if (this.state_ === 0) {
        this.conn_.start();
        this.onConnectionEstablished_(this.conn_, timestamp);
        if (PROTOCOL_VERSION !== version2) {
          warn("Protocol version mismatch detected");
        }
        this.tryStartUpgrade_();
      }
    };
    Connection2.prototype.tryStartUpgrade_ = function() {
      var conn = this.transportManager_.upgradeTransport();
      if (conn) {
        this.startUpgrade_(conn);
      }
    };
    Connection2.prototype.startUpgrade_ = function(conn) {
      var _this = this;
      this.secondaryConn_ = new conn(this.nextTransportId_(), this.repoInfo_, this.applicationId_, this.sessionId);
      this.secondaryResponsesRequired_ = conn["responsesRequiredToBeHealthy"] || 0;
      var onMessage = this.connReceiver_(this.secondaryConn_);
      var onDisconnect = this.disconnReceiver_(this.secondaryConn_);
      this.secondaryConn_.open(onMessage, onDisconnect);
      setTimeoutNonBlocking(function() {
        if (_this.secondaryConn_) {
          _this.log_("Timed out trying to upgrade.");
          _this.secondaryConn_.close();
        }
      }, Math.floor(UPGRADE_TIMEOUT));
    };
    Connection2.prototype.onReset_ = function(host) {
      this.log_("Reset packet received.  New host: " + host);
      this.repoInfo_.updateHost(host);
      if (this.state_ === 1) {
        this.close();
      } else {
        this.closeConnections_();
        this.start_();
      }
    };
    Connection2.prototype.onConnectionEstablished_ = function(conn, timestamp) {
      var _this = this;
      this.log_("Realtime connection established.");
      this.conn_ = conn;
      this.state_ = 1;
      if (this.onReady_) {
        this.onReady_(timestamp, this.sessionId);
        this.onReady_ = null;
      }
      if (this.primaryResponsesRequired_ === 0) {
        this.log_("Primary connection is healthy.");
        this.isHealthy_ = true;
      } else {
        setTimeoutNonBlocking(function() {
          _this.sendPingOnPrimaryIfNecessary_();
        }, Math.floor(DELAY_BEFORE_SENDING_EXTRA_REQUESTS));
      }
    };
    Connection2.prototype.sendPingOnPrimaryIfNecessary_ = function() {
      if (!this.isHealthy_ && this.state_ === 1) {
        this.log_("sending ping on primary.");
        this.sendData_({ t: "c", d: { t: PING, d: {} } });
      }
    };
    Connection2.prototype.onSecondaryConnectionLost_ = function() {
      var conn = this.secondaryConn_;
      this.secondaryConn_ = null;
      if (this.tx_ === conn || this.rx_ === conn) {
        this.close();
      }
    };
    Connection2.prototype.onConnectionLost_ = function(everConnected) {
      this.conn_ = null;
      if (!everConnected && this.state_ === 0) {
        this.log_("Realtime connection failed.");
        if (this.repoInfo_.isCacheableHost()) {
          PersistentStorage.remove("host:" + this.repoInfo_.host);
          this.repoInfo_.internalHost = this.repoInfo_.host;
        }
      } else if (this.state_ === 1) {
        this.log_("Realtime connection lost.");
      }
      this.close();
    };
    Connection2.prototype.onConnectionShutdown_ = function(reason) {
      this.log_("Connection shutdown command received. Shutting down...");
      if (this.onKill_) {
        this.onKill_(reason);
        this.onKill_ = null;
      }
      this.onDisconnect_ = null;
      this.close();
    };
    Connection2.prototype.sendData_ = function(data) {
      if (this.state_ !== 1) {
        throw "Connection is not connected";
      } else {
        this.tx_.send(data);
      }
    };
    Connection2.prototype.close = function() {
      if (this.state_ !== 2) {
        this.log_("Closing realtime connection.");
        this.state_ = 2;
        this.closeConnections_();
        if (this.onDisconnect_) {
          this.onDisconnect_();
          this.onDisconnect_ = null;
        }
      }
    };
    Connection2.prototype.closeConnections_ = function() {
      this.log_("Shutting down all connections");
      if (this.conn_) {
        this.conn_.close();
        this.conn_ = null;
      }
      if (this.secondaryConn_) {
        this.secondaryConn_.close();
        this.secondaryConn_ = null;
      }
      if (this.healthyTimeout_) {
        clearTimeout(this.healthyTimeout_);
        this.healthyTimeout_ = null;
      }
    };
    return Connection2;
  }()
);
var ServerActions = (
  /** @class */
  function() {
    function ServerActions2() {
    }
    ServerActions2.prototype.put = function(pathString, data, onComplete, hash) {
    };
    ServerActions2.prototype.merge = function(pathString, data, onComplete, hash) {
    };
    ServerActions2.prototype.refreshAuthToken = function(token) {
    };
    ServerActions2.prototype.onDisconnectPut = function(pathString, data, onComplete) {
    };
    ServerActions2.prototype.onDisconnectMerge = function(pathString, data, onComplete) {
    };
    ServerActions2.prototype.onDisconnectCancel = function(pathString, onComplete) {
    };
    ServerActions2.prototype.reportStats = function(stats2) {
    };
    return ServerActions2;
  }()
);
var RECONNECT_MIN_DELAY = 1e3;
var RECONNECT_MAX_DELAY_DEFAULT = 60 * 5 * 1e3;
var RECONNECT_MAX_DELAY_FOR_ADMINS = 30 * 1e3;
var RECONNECT_DELAY_MULTIPLIER = 1.3;
var RECONNECT_DELAY_RESET_TIMEOUT = 3e4;
var SERVER_KILL_INTERRUPT_REASON = "server_kill";
var INVALID_AUTH_TOKEN_THRESHOLD = 3;
var PersistentConnection = (
  /** @class */
  function(_super) {
    __extends(PersistentConnection2, _super);
    function PersistentConnection2(repoInfo_, applicationId_, onDataUpdate_, onConnectStatus_, onServerInfoUpdate_, authTokenProvider_, authOverride_) {
      var _this = _super.call(this) || this;
      _this.repoInfo_ = repoInfo_;
      _this.applicationId_ = applicationId_;
      _this.onDataUpdate_ = onDataUpdate_;
      _this.onConnectStatus_ = onConnectStatus_;
      _this.onServerInfoUpdate_ = onServerInfoUpdate_;
      _this.authTokenProvider_ = authTokenProvider_;
      _this.authOverride_ = authOverride_;
      _this.id = PersistentConnection2.nextPersistentConnectionId_++;
      _this.log_ = logWrapper("p:" + _this.id + ":");
      _this.interruptReasons_ = {};
      _this.listens = /* @__PURE__ */ new Map();
      _this.outstandingPuts_ = [];
      _this.outstandingPutCount_ = 0;
      _this.onDisconnectRequestQueue_ = [];
      _this.connected_ = false;
      _this.reconnectDelay_ = RECONNECT_MIN_DELAY;
      _this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_DEFAULT;
      _this.securityDebugCallback_ = null;
      _this.lastSessionId = null;
      _this.establishConnectionTimer_ = null;
      _this.visible_ = false;
      _this.requestCBHash_ = {};
      _this.requestNumber_ = 0;
      _this.realtime_ = null;
      _this.authToken_ = null;
      _this.forceTokenRefresh_ = false;
      _this.invalidAuthTokenCount_ = 0;
      _this.firstConnection_ = true;
      _this.lastConnectionAttemptTime_ = null;
      _this.lastConnectionEstablishedTime_ = null;
      if (authOverride_ && !isNodeSdk()) {
        throw new Error("Auth override specified in options, but not supported on non Node.js platforms");
      }
      _this.scheduleConnect_(0);
      VisibilityMonitor.getInstance().on("visible", _this.onVisible_, _this);
      if (repoInfo_.host.indexOf("fblocal") === -1) {
        OnlineMonitor.getInstance().on("online", _this.onOnline_, _this);
      }
      return _this;
    }
    PersistentConnection2.prototype.sendRequest = function(action, body, onResponse) {
      var curReqNum = ++this.requestNumber_;
      var msg = { r: curReqNum, a: action, b: body };
      this.log_(stringify(msg));
      assert(this.connected_, "sendRequest call when we're not connected not allowed.");
      this.realtime_.sendRequest(msg);
      if (onResponse) {
        this.requestCBHash_[curReqNum] = onResponse;
      }
    };
    PersistentConnection2.prototype.listen = function(query, currentHashFn, tag, onComplete) {
      var queryId = query.queryIdentifier();
      var pathString = query.path.toString();
      this.log_("Listen called for " + pathString + " " + queryId);
      if (!this.listens.has(pathString)) {
        this.listens.set(pathString, /* @__PURE__ */ new Map());
      }
      assert(query.getQueryParams().isDefault() || !query.getQueryParams().loadsAllData(), "listen() called for non-default but complete query");
      assert(!this.listens.get(pathString).has(queryId), "listen() called twice for same path/queryId.");
      var listenSpec = {
        onComplete,
        hashFn: currentHashFn,
        query,
        tag
      };
      this.listens.get(pathString).set(queryId, listenSpec);
      if (this.connected_) {
        this.sendListen_(listenSpec);
      }
    };
    PersistentConnection2.prototype.sendListen_ = function(listenSpec) {
      var _this = this;
      var query = listenSpec.query;
      var pathString = query.path.toString();
      var queryId = query.queryIdentifier();
      this.log_("Listen on " + pathString + " for " + queryId);
      var req = {
        /*path*/
        p: pathString
      };
      var action = "q";
      if (listenSpec.tag) {
        req["q"] = query.queryObject();
        req["t"] = listenSpec.tag;
      }
      req[
        /*hash*/
        "h"
      ] = listenSpec.hashFn();
      this.sendRequest(action, req, function(message) {
        var payload = message[
          /*data*/
          "d"
        ];
        var status = message[
          /*status*/
          "s"
        ];
        PersistentConnection2.warnOnListenWarnings_(payload, query);
        var currentListenSpec = _this.listens.get(pathString) && _this.listens.get(pathString).get(queryId);
        if (currentListenSpec === listenSpec) {
          _this.log_("listen response", message);
          if (status !== "ok") {
            _this.removeListen_(pathString, queryId);
          }
          if (listenSpec.onComplete) {
            listenSpec.onComplete(status, payload);
          }
        }
      });
    };
    PersistentConnection2.warnOnListenWarnings_ = function(payload, query) {
      if (payload && typeof payload === "object" && contains(payload, "w")) {
        var warnings = safeGet(payload, "w");
        if (Array.isArray(warnings) && ~warnings.indexOf("no_index")) {
          var indexSpec = '".indexOn": "' + query.getQueryParams().getIndex().toString() + '"';
          var indexPath = query.path.toString();
          warn("Using an unspecified index. Your data will be downloaded and " + ("filtered on the client. Consider adding " + indexSpec + " at ") + (indexPath + " to your security rules for better performance."));
        }
      }
    };
    PersistentConnection2.prototype.refreshAuthToken = function(token) {
      this.authToken_ = token;
      this.log_("Auth token refreshed");
      if (this.authToken_) {
        this.tryAuth();
      } else {
        if (this.connected_) {
          this.sendRequest("unauth", {}, function() {
          });
        }
      }
      this.reduceReconnectDelayIfAdminCredential_(token);
    };
    PersistentConnection2.prototype.reduceReconnectDelayIfAdminCredential_ = function(credential) {
      var isFirebaseSecret = credential && credential.length === 40;
      if (isFirebaseSecret || isAdmin(credential)) {
        this.log_("Admin auth credential detected.  Reducing max reconnect time.");
        this.maxReconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
      }
    };
    PersistentConnection2.prototype.tryAuth = function() {
      var _this = this;
      if (this.connected_ && this.authToken_) {
        var token_1 = this.authToken_;
        var authMethod = isValidFormat(token_1) ? "auth" : "gauth";
        var requestData = { cred: token_1 };
        if (this.authOverride_ === null) {
          requestData["noauth"] = true;
        } else if (typeof this.authOverride_ === "object") {
          requestData["authvar"] = this.authOverride_;
        }
        this.sendRequest(authMethod, requestData, function(res) {
          var status = res[
            /*status*/
            "s"
          ];
          var data = res[
            /*data*/
            "d"
          ] || "error";
          if (_this.authToken_ === token_1) {
            if (status === "ok") {
              _this.invalidAuthTokenCount_ = 0;
            } else {
              _this.onAuthRevoked_(status, data);
            }
          }
        });
      }
    };
    PersistentConnection2.prototype.unlisten = function(query, tag) {
      var pathString = query.path.toString();
      var queryId = query.queryIdentifier();
      this.log_("Unlisten called for " + pathString + " " + queryId);
      assert(query.getQueryParams().isDefault() || !query.getQueryParams().loadsAllData(), "unlisten() called for non-default but complete query");
      var listen = this.removeListen_(pathString, queryId);
      if (listen && this.connected_) {
        this.sendUnlisten_(pathString, queryId, query.queryObject(), tag);
      }
    };
    PersistentConnection2.prototype.sendUnlisten_ = function(pathString, queryId, queryObj, tag) {
      this.log_("Unlisten on " + pathString + " for " + queryId);
      var req = {
        /*path*/
        p: pathString
      };
      var action = "n";
      if (tag) {
        req["q"] = queryObj;
        req["t"] = tag;
      }
      this.sendRequest(action, req);
    };
    PersistentConnection2.prototype.onDisconnectPut = function(pathString, data, onComplete) {
      if (this.connected_) {
        this.sendOnDisconnect_("o", pathString, data, onComplete);
      } else {
        this.onDisconnectRequestQueue_.push({
          pathString,
          action: "o",
          data,
          onComplete
        });
      }
    };
    PersistentConnection2.prototype.onDisconnectMerge = function(pathString, data, onComplete) {
      if (this.connected_) {
        this.sendOnDisconnect_("om", pathString, data, onComplete);
      } else {
        this.onDisconnectRequestQueue_.push({
          pathString,
          action: "om",
          data,
          onComplete
        });
      }
    };
    PersistentConnection2.prototype.onDisconnectCancel = function(pathString, onComplete) {
      if (this.connected_) {
        this.sendOnDisconnect_("oc", pathString, null, onComplete);
      } else {
        this.onDisconnectRequestQueue_.push({
          pathString,
          action: "oc",
          data: null,
          onComplete
        });
      }
    };
    PersistentConnection2.prototype.sendOnDisconnect_ = function(action, pathString, data, onComplete) {
      var request = {
        /*path*/
        p: pathString,
        /*data*/
        d: data
      };
      this.log_("onDisconnect " + action, request);
      this.sendRequest(action, request, function(response) {
        if (onComplete) {
          setTimeout(function() {
            onComplete(response[
              /*status*/
              "s"
            ], response[
              /* data */
              "d"
            ]);
          }, Math.floor(0));
        }
      });
    };
    PersistentConnection2.prototype.put = function(pathString, data, onComplete, hash) {
      this.putInternal("p", pathString, data, onComplete, hash);
    };
    PersistentConnection2.prototype.merge = function(pathString, data, onComplete, hash) {
      this.putInternal("m", pathString, data, onComplete, hash);
    };
    PersistentConnection2.prototype.putInternal = function(action, pathString, data, onComplete, hash) {
      var request = {
        /*path*/
        p: pathString,
        /*data*/
        d: data
      };
      if (hash !== void 0) {
        request[
          /*hash*/
          "h"
        ] = hash;
      }
      this.outstandingPuts_.push({
        action,
        request,
        onComplete
      });
      this.outstandingPutCount_++;
      var index = this.outstandingPuts_.length - 1;
      if (this.connected_) {
        this.sendPut_(index);
      } else {
        this.log_("Buffering put: " + pathString);
      }
    };
    PersistentConnection2.prototype.sendPut_ = function(index) {
      var _this = this;
      var action = this.outstandingPuts_[index].action;
      var request = this.outstandingPuts_[index].request;
      var onComplete = this.outstandingPuts_[index].onComplete;
      this.outstandingPuts_[index].queued = this.connected_;
      this.sendRequest(action, request, function(message) {
        _this.log_(action + " response", message);
        delete _this.outstandingPuts_[index];
        _this.outstandingPutCount_--;
        if (_this.outstandingPutCount_ === 0) {
          _this.outstandingPuts_ = [];
        }
        if (onComplete) {
          onComplete(message[
            /*status*/
            "s"
          ], message[
            /* data */
            "d"
          ]);
        }
      });
    };
    PersistentConnection2.prototype.reportStats = function(stats2) {
      var _this = this;
      if (this.connected_) {
        var request = {
          /*counters*/
          c: stats2
        };
        this.log_("reportStats", request);
        this.sendRequest(
          /*stats*/
          "s",
          request,
          function(result) {
            var status = result[
              /*status*/
              "s"
            ];
            if (status !== "ok") {
              var errorReason = result[
                /* data */
                "d"
              ];
              _this.log_("reportStats", "Error sending stats: " + errorReason);
            }
          }
        );
      }
    };
    PersistentConnection2.prototype.onDataMessage_ = function(message) {
      if ("r" in message) {
        this.log_("from server: " + stringify(message));
        var reqNum = message["r"];
        var onResponse = this.requestCBHash_[reqNum];
        if (onResponse) {
          delete this.requestCBHash_[reqNum];
          onResponse(message[
            /*body*/
            "b"
          ]);
        }
      } else if ("error" in message) {
        throw "A server-side error has occurred: " + message["error"];
      } else if ("a" in message) {
        this.onDataPush_(message["a"], message["b"]);
      }
    };
    PersistentConnection2.prototype.onDataPush_ = function(action, body) {
      this.log_("handleServerMessage", action, body);
      if (action === "d") {
        this.onDataUpdate_(
          body[
            /*path*/
            "p"
          ],
          body[
            /*data*/
            "d"
          ],
          /*isMerge*/
          false,
          body["t"]
        );
      } else if (action === "m") {
        this.onDataUpdate_(
          body[
            /*path*/
            "p"
          ],
          body[
            /*data*/
            "d"
          ],
          /*isMerge=*/
          true,
          body["t"]
        );
      } else if (action === "c") {
        this.onListenRevoked_(body[
          /*path*/
          "p"
        ], body[
          /*query*/
          "q"
        ]);
      } else if (action === "ac") {
        this.onAuthRevoked_(body[
          /*status code*/
          "s"
        ], body[
          /* explanation */
          "d"
        ]);
      } else if (action === "sd") {
        this.onSecurityDebugPacket_(body);
      } else {
        error("Unrecognized action received from server: " + stringify(action) + "\nAre you using the latest client?");
      }
    };
    PersistentConnection2.prototype.onReady_ = function(timestamp, sessionId) {
      this.log_("connection ready");
      this.connected_ = true;
      this.lastConnectionEstablishedTime_ = (/* @__PURE__ */ new Date()).getTime();
      this.handleTimestamp_(timestamp);
      this.lastSessionId = sessionId;
      if (this.firstConnection_) {
        this.sendConnectStats_();
      }
      this.restoreState_();
      this.firstConnection_ = false;
      this.onConnectStatus_(true);
    };
    PersistentConnection2.prototype.scheduleConnect_ = function(timeout) {
      var _this = this;
      assert(!this.realtime_, "Scheduling a connect when we're already connected/ing?");
      if (this.establishConnectionTimer_) {
        clearTimeout(this.establishConnectionTimer_);
      }
      this.establishConnectionTimer_ = setTimeout(function() {
        _this.establishConnectionTimer_ = null;
        _this.establishConnection_();
      }, Math.floor(timeout));
    };
    PersistentConnection2.prototype.onVisible_ = function(visible) {
      if (visible && !this.visible_ && this.reconnectDelay_ === this.maxReconnectDelay_) {
        this.log_("Window became visible.  Reducing delay.");
        this.reconnectDelay_ = RECONNECT_MIN_DELAY;
        if (!this.realtime_) {
          this.scheduleConnect_(0);
        }
      }
      this.visible_ = visible;
    };
    PersistentConnection2.prototype.onOnline_ = function(online) {
      if (online) {
        this.log_("Browser went online.");
        this.reconnectDelay_ = RECONNECT_MIN_DELAY;
        if (!this.realtime_) {
          this.scheduleConnect_(0);
        }
      } else {
        this.log_("Browser went offline.  Killing connection.");
        if (this.realtime_) {
          this.realtime_.close();
        }
      }
    };
    PersistentConnection2.prototype.onRealtimeDisconnect_ = function() {
      this.log_("data client disconnected");
      this.connected_ = false;
      this.realtime_ = null;
      this.cancelSentTransactions_();
      this.requestCBHash_ = {};
      if (this.shouldReconnect_()) {
        if (!this.visible_) {
          this.log_("Window isn't visible.  Delaying reconnect.");
          this.reconnectDelay_ = this.maxReconnectDelay_;
          this.lastConnectionAttemptTime_ = (/* @__PURE__ */ new Date()).getTime();
        } else if (this.lastConnectionEstablishedTime_) {
          var timeSinceLastConnectSucceeded = (/* @__PURE__ */ new Date()).getTime() - this.lastConnectionEstablishedTime_;
          if (timeSinceLastConnectSucceeded > RECONNECT_DELAY_RESET_TIMEOUT) {
            this.reconnectDelay_ = RECONNECT_MIN_DELAY;
          }
          this.lastConnectionEstablishedTime_ = null;
        }
        var timeSinceLastConnectAttempt = (/* @__PURE__ */ new Date()).getTime() - this.lastConnectionAttemptTime_;
        var reconnectDelay = Math.max(0, this.reconnectDelay_ - timeSinceLastConnectAttempt);
        reconnectDelay = Math.random() * reconnectDelay;
        this.log_("Trying to reconnect in " + reconnectDelay + "ms");
        this.scheduleConnect_(reconnectDelay);
        this.reconnectDelay_ = Math.min(this.maxReconnectDelay_, this.reconnectDelay_ * RECONNECT_DELAY_MULTIPLIER);
      }
      this.onConnectStatus_(false);
    };
    PersistentConnection2.prototype.establishConnection_ = function() {
      var _this = this;
      if (this.shouldReconnect_()) {
        this.log_("Making a connection attempt");
        this.lastConnectionAttemptTime_ = (/* @__PURE__ */ new Date()).getTime();
        this.lastConnectionEstablishedTime_ = null;
        var onDataMessage_1 = this.onDataMessage_.bind(this);
        var onReady_1 = this.onReady_.bind(this);
        var onDisconnect_1 = this.onRealtimeDisconnect_.bind(this);
        var connId_1 = this.id + ":" + PersistentConnection2.nextConnectionId_++;
        var self_1 = this;
        var lastSessionId_1 = this.lastSessionId;
        var canceled_1 = false;
        var connection_1 = null;
        var closeFn_1 = function() {
          if (connection_1) {
            connection_1.close();
          } else {
            canceled_1 = true;
            onDisconnect_1();
          }
        };
        var sendRequestFn = function(msg) {
          assert(connection_1, "sendRequest call when we're not connected not allowed.");
          connection_1.sendRequest(msg);
        };
        this.realtime_ = {
          close: closeFn_1,
          sendRequest: sendRequestFn
        };
        var forceRefresh = this.forceTokenRefresh_;
        this.forceTokenRefresh_ = false;
        this.authTokenProvider_.getToken(forceRefresh).then(function(result) {
          if (!canceled_1) {
            log("getToken() completed. Creating connection.");
            self_1.authToken_ = result && result.accessToken;
            connection_1 = new Connection(
              connId_1,
              self_1.repoInfo_,
              self_1.applicationId_,
              onDataMessage_1,
              onReady_1,
              onDisconnect_1,
              /* onKill= */
              function(reason) {
                warn(reason + " (" + self_1.repoInfo_.toString() + ")");
                self_1.interrupt(SERVER_KILL_INTERRUPT_REASON);
              },
              lastSessionId_1
            );
          } else {
            log("getToken() completed but was canceled");
          }
        }).then(null, function(error2) {
          self_1.log_("Failed to get token: " + error2);
          if (!canceled_1) {
            if (_this.repoInfo_.nodeAdmin) {
              warn(error2);
            }
            closeFn_1();
          }
        });
      }
    };
    PersistentConnection2.prototype.interrupt = function(reason) {
      log("Interrupting connection for reason: " + reason);
      this.interruptReasons_[reason] = true;
      if (this.realtime_) {
        this.realtime_.close();
      } else {
        if (this.establishConnectionTimer_) {
          clearTimeout(this.establishConnectionTimer_);
          this.establishConnectionTimer_ = null;
        }
        if (this.connected_) {
          this.onRealtimeDisconnect_();
        }
      }
    };
    PersistentConnection2.prototype.resume = function(reason) {
      log("Resuming connection for reason: " + reason);
      delete this.interruptReasons_[reason];
      if (isEmpty(this.interruptReasons_)) {
        this.reconnectDelay_ = RECONNECT_MIN_DELAY;
        if (!this.realtime_) {
          this.scheduleConnect_(0);
        }
      }
    };
    PersistentConnection2.prototype.handleTimestamp_ = function(timestamp) {
      var delta = timestamp - (/* @__PURE__ */ new Date()).getTime();
      this.onServerInfoUpdate_({ serverTimeOffset: delta });
    };
    PersistentConnection2.prototype.cancelSentTransactions_ = function() {
      for (var i = 0; i < this.outstandingPuts_.length; i++) {
        var put = this.outstandingPuts_[i];
        if (put && /*hash*/
        "h" in put.request && put.queued) {
          if (put.onComplete) {
            put.onComplete("disconnect");
          }
          delete this.outstandingPuts_[i];
          this.outstandingPutCount_--;
        }
      }
      if (this.outstandingPutCount_ === 0) {
        this.outstandingPuts_ = [];
      }
    };
    PersistentConnection2.prototype.onListenRevoked_ = function(pathString, query) {
      var queryId;
      if (!query) {
        queryId = "default";
      } else {
        queryId = query.map(function(q) {
          return ObjectToUniqueKey(q);
        }).join("$");
      }
      var listen = this.removeListen_(pathString, queryId);
      if (listen && listen.onComplete) {
        listen.onComplete("permission_denied");
      }
    };
    PersistentConnection2.prototype.removeListen_ = function(pathString, queryId) {
      var normalizedPathString = new Path(pathString).toString();
      var listen;
      if (this.listens.has(normalizedPathString)) {
        var map2 = this.listens.get(normalizedPathString);
        listen = map2.get(queryId);
        map2.delete(queryId);
        if (map2.size === 0) {
          this.listens.delete(normalizedPathString);
        }
      } else {
        listen = void 0;
      }
      return listen;
    };
    PersistentConnection2.prototype.onAuthRevoked_ = function(statusCode, explanation) {
      log("Auth token revoked: " + statusCode + "/" + explanation);
      this.authToken_ = null;
      this.forceTokenRefresh_ = true;
      this.realtime_.close();
      if (statusCode === "invalid_token" || statusCode === "permission_denied") {
        this.invalidAuthTokenCount_++;
        if (this.invalidAuthTokenCount_ >= INVALID_AUTH_TOKEN_THRESHOLD) {
          this.reconnectDelay_ = RECONNECT_MAX_DELAY_FOR_ADMINS;
          this.authTokenProvider_.notifyForInvalidToken();
        }
      }
    };
    PersistentConnection2.prototype.onSecurityDebugPacket_ = function(body) {
      if (this.securityDebugCallback_) {
        this.securityDebugCallback_(body);
      } else {
        if ("msg" in body) {
          console.log("FIREBASE: " + body["msg"].replace("\n", "\nFIREBASE: "));
        }
      }
    };
    PersistentConnection2.prototype.restoreState_ = function() {
      var e_1, _a, e_2, _b;
      this.tryAuth();
      try {
        for (var _c = __values(this.listens.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
          var queries = _d.value;
          try {
            for (var _e = (e_2 = void 0, __values(queries.values())), _f = _e.next(); !_f.done; _f = _e.next()) {
              var listenSpec = _f.value;
              this.sendListen_(listenSpec);
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (_f && !_f.done && (_b = _e.return))
                _b.call(_e);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (_d && !_d.done && (_a = _c.return))
            _a.call(_c);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      for (var i = 0; i < this.outstandingPuts_.length; i++) {
        if (this.outstandingPuts_[i]) {
          this.sendPut_(i);
        }
      }
      while (this.onDisconnectRequestQueue_.length) {
        var request = this.onDisconnectRequestQueue_.shift();
        this.sendOnDisconnect_(request.action, request.pathString, request.data, request.onComplete);
      }
    };
    PersistentConnection2.prototype.sendConnectStats_ = function() {
      var stats2 = {};
      var clientName = "js";
      if (isNodeSdk()) {
        if (this.repoInfo_.nodeAdmin) {
          clientName = "admin_node";
        } else {
          clientName = "node";
        }
      }
      stats2["sdk." + clientName + "." + SDK_VERSION.replace(/\./g, "-")] = 1;
      if (isMobileCordova()) {
        stats2["framework.cordova"] = 1;
      } else if (isReactNative()) {
        stats2["framework.reactnative"] = 1;
      }
      this.reportStats(stats2);
    };
    PersistentConnection2.prototype.shouldReconnect_ = function() {
      var online = OnlineMonitor.getInstance().currentlyOnline();
      return isEmpty(this.interruptReasons_) && online;
    };
    PersistentConnection2.nextPersistentConnectionId_ = 0;
    PersistentConnection2.nextConnectionId_ = 0;
    return PersistentConnection2;
  }(ServerActions)
);
var ReadonlyRestClient = (
  /** @class */
  function(_super) {
    __extends(ReadonlyRestClient2, _super);
    function ReadonlyRestClient2(repoInfo_, onDataUpdate_, authTokenProvider_) {
      var _this = _super.call(this) || this;
      _this.repoInfo_ = repoInfo_;
      _this.onDataUpdate_ = onDataUpdate_;
      _this.authTokenProvider_ = authTokenProvider_;
      _this.log_ = logWrapper("p:rest:");
      _this.listens_ = {};
      return _this;
    }
    ReadonlyRestClient2.prototype.reportStats = function(stats2) {
      throw new Error("Method not implemented.");
    };
    ReadonlyRestClient2.getListenId_ = function(query, tag) {
      if (tag !== void 0) {
        return "tag$" + tag;
      } else {
        assert(query.getQueryParams().isDefault(), "should have a tag if it's not a default query.");
        return query.path.toString();
      }
    };
    ReadonlyRestClient2.prototype.listen = function(query, currentHashFn, tag, onComplete) {
      var _this = this;
      var pathString = query.path.toString();
      this.log_("Listen called for " + pathString + " " + query.queryIdentifier());
      var listenId = ReadonlyRestClient2.getListenId_(query, tag);
      var thisListen = {};
      this.listens_[listenId] = thisListen;
      var queryStringParameters = query.getQueryParams().toRestQueryStringParameters();
      this.restRequest_(pathString + ".json", queryStringParameters, function(error2, result) {
        var data = result;
        if (error2 === 404) {
          data = null;
          error2 = null;
        }
        if (error2 === null) {
          _this.onDataUpdate_(
            pathString,
            data,
            /*isMerge=*/
            false,
            tag
          );
        }
        if (safeGet(_this.listens_, listenId) === thisListen) {
          var status_1;
          if (!error2) {
            status_1 = "ok";
          } else if (error2 === 401) {
            status_1 = "permission_denied";
          } else {
            status_1 = "rest_error:" + error2;
          }
          onComplete(status_1, null);
        }
      });
    };
    ReadonlyRestClient2.prototype.unlisten = function(query, tag) {
      var listenId = ReadonlyRestClient2.getListenId_(query, tag);
      delete this.listens_[listenId];
    };
    ReadonlyRestClient2.prototype.refreshAuthToken = function(token) {
    };
    ReadonlyRestClient2.prototype.restRequest_ = function(pathString, queryStringParameters, callback) {
      var _this = this;
      if (queryStringParameters === void 0) {
        queryStringParameters = {};
      }
      queryStringParameters["format"] = "export";
      this.authTokenProvider_.getToken(
        /*forceRefresh=*/
        false
      ).then(function(authTokenData) {
        var authToken = authTokenData && authTokenData.accessToken;
        if (authToken) {
          queryStringParameters["auth"] = authToken;
        }
        var url = (_this.repoInfo_.secure ? "https://" : "http://") + _this.repoInfo_.host + pathString + "?ns=" + _this.repoInfo_.namespace + querystring(queryStringParameters);
        _this.log_("Sending REST request for " + url);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (callback && xhr.readyState === 4) {
            _this.log_("REST Response for " + url + " received. status:", xhr.status, "response:", xhr.responseText);
            var res = null;
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                res = jsonEval(xhr.responseText);
              } catch (e) {
                warn("Failed to parse JSON response for " + url + ": " + xhr.responseText);
              }
              callback(null, res);
            } else {
              if (xhr.status !== 401 && xhr.status !== 404) {
                warn("Got unsuccessful REST response for " + url + " Status: " + xhr.status);
              }
              callback(xhr.status);
            }
            callback = null;
          }
        };
        xhr.open(
          "GET",
          url,
          /*asynchronous=*/
          true
        );
        xhr.send();
      });
    };
    return ReadonlyRestClient2;
  }(ServerActions)
);
var INTERRUPT_REASON = "repo_interrupt";
var Repo = (
  /** @class */
  function() {
    function Repo2(repoInfo_, forceRestClient2, app, authTokenProvider) {
      var _this = this;
      this.repoInfo_ = repoInfo_;
      this.app = app;
      this.dataUpdateCount = 0;
      this.statsListener_ = null;
      this.eventQueue_ = new EventQueue();
      this.nextWriteId_ = 1;
      this.interceptServerDataCallback_ = null;
      this.onDisconnect_ = new SparseSnapshotTree();
      this.persistentConnection_ = null;
      this.stats_ = StatsManager.getCollection(repoInfo_);
      if (forceRestClient2 || beingCrawled()) {
        this.server_ = new ReadonlyRestClient(this.repoInfo_, this.onDataUpdate_.bind(this), authTokenProvider);
        setTimeout(this.onConnectStatus_.bind(this, true), 0);
      } else {
        var authOverride = app.options["databaseAuthVariableOverride"];
        if (typeof authOverride !== "undefined" && authOverride !== null) {
          if (typeof authOverride !== "object") {
            throw new Error("Only objects are supported for option databaseAuthVariableOverride");
          }
          try {
            stringify(authOverride);
          } catch (e) {
            throw new Error("Invalid authOverride provided: " + e);
          }
        }
        this.persistentConnection_ = new PersistentConnection(this.repoInfo_, app.options.appId, this.onDataUpdate_.bind(this), this.onConnectStatus_.bind(this), this.onServerInfoUpdate_.bind(this), authTokenProvider, authOverride);
        this.server_ = this.persistentConnection_;
      }
      authTokenProvider.addTokenChangeListener(function(token) {
        _this.server_.refreshAuthToken(token);
      });
      this.statsReporter_ = StatsManager.getOrCreateReporter(repoInfo_, function() {
        return new StatsReporter(_this.stats_, _this.server_);
      });
      this.transactionsInit_();
      this.infoData_ = new SnapshotHolder();
      this.infoSyncTree_ = new SyncTree({
        startListening: function(query, tag, currentHashFn, onComplete) {
          var infoEvents = [];
          var node = _this.infoData_.getNode(query.path);
          if (!node.isEmpty()) {
            infoEvents = _this.infoSyncTree_.applyServerOverwrite(query.path, node);
            setTimeout(function() {
              onComplete("ok");
            }, 0);
          }
          return infoEvents;
        },
        stopListening: function() {
        }
      });
      this.updateInfo_("connected", false);
      this.serverSyncTree_ = new SyncTree({
        startListening: function(query, tag, currentHashFn, onComplete) {
          _this.server_.listen(query, currentHashFn, tag, function(status, data) {
            var events = onComplete(status, data);
            _this.eventQueue_.raiseEventsForChangedPath(query.path, events);
          });
          return [];
        },
        stopListening: function(query, tag) {
          _this.server_.unlisten(query, tag);
        }
      });
    }
    Repo2.prototype.toString = function() {
      return (this.repoInfo_.secure ? "https://" : "http://") + this.repoInfo_.host;
    };
    Repo2.prototype.name = function() {
      return this.repoInfo_.namespace;
    };
    Repo2.prototype.serverTime = function() {
      var offsetNode = this.infoData_.getNode(new Path(".info/serverTimeOffset"));
      var offset = offsetNode.val() || 0;
      return (/* @__PURE__ */ new Date()).getTime() + offset;
    };
    Repo2.prototype.generateServerValues = function() {
      return generateWithValues({
        timestamp: this.serverTime()
      });
    };
    Repo2.prototype.onDataUpdate_ = function(pathString, data, isMerge, tag) {
      this.dataUpdateCount++;
      var path = new Path(pathString);
      data = this.interceptServerDataCallback_ ? this.interceptServerDataCallback_(pathString, data) : data;
      var events = [];
      if (tag) {
        if (isMerge) {
          var taggedChildren = map(data, function(raw) {
            return nodeFromJSON$1(raw);
          });
          events = this.serverSyncTree_.applyTaggedQueryMerge(path, taggedChildren, tag);
        } else {
          var taggedSnap = nodeFromJSON$1(data);
          events = this.serverSyncTree_.applyTaggedQueryOverwrite(path, taggedSnap, tag);
        }
      } else if (isMerge) {
        var changedChildren = map(data, function(raw) {
          return nodeFromJSON$1(raw);
        });
        events = this.serverSyncTree_.applyServerMerge(path, changedChildren);
      } else {
        var snap = nodeFromJSON$1(data);
        events = this.serverSyncTree_.applyServerOverwrite(path, snap);
      }
      var affectedPath = path;
      if (events.length > 0) {
        affectedPath = this.rerunTransactions_(path);
      }
      this.eventQueue_.raiseEventsForChangedPath(affectedPath, events);
    };
    Repo2.prototype.interceptServerData_ = function(callback) {
      this.interceptServerDataCallback_ = callback;
    };
    Repo2.prototype.onConnectStatus_ = function(connectStatus) {
      this.updateInfo_("connected", connectStatus);
      if (connectStatus === false) {
        this.runOnDisconnectEvents_();
      }
    };
    Repo2.prototype.onServerInfoUpdate_ = function(updates) {
      var _this = this;
      each(updates, function(key, value) {
        _this.updateInfo_(key, value);
      });
    };
    Repo2.prototype.updateInfo_ = function(pathString, value) {
      var path = new Path("/.info/" + pathString);
      var newNode = nodeFromJSON$1(value);
      this.infoData_.updateSnapshot(path, newNode);
      var events = this.infoSyncTree_.applyServerOverwrite(path, newNode);
      this.eventQueue_.raiseEventsForChangedPath(path, events);
    };
    Repo2.prototype.getNextWriteId_ = function() {
      return this.nextWriteId_++;
    };
    Repo2.prototype.setWithPriority = function(path, newVal, newPriority, onComplete) {
      var _this = this;
      this.log_("set", {
        path: path.toString(),
        value: newVal,
        priority: newPriority
      });
      var serverValues = this.generateServerValues();
      var newNodeUnresolved = nodeFromJSON$1(newVal, newPriority);
      var existing = this.serverSyncTree_.calcCompleteEventCache(path);
      var newNode = resolveDeferredValueSnapshot(newNodeUnresolved, existing, serverValues);
      var writeId = this.getNextWriteId_();
      var events = this.serverSyncTree_.applyUserOverwrite(path, newNode, writeId, true);
      this.eventQueue_.queueEvents(events);
      this.server_.put(path.toString(), newNodeUnresolved.val(
        /*export=*/
        true
      ), function(status, errorReason) {
        var success = status === "ok";
        if (!success) {
          warn("set at " + path + " failed: " + status);
        }
        var clearEvents = _this.serverSyncTree_.ackUserWrite(writeId, !success);
        _this.eventQueue_.raiseEventsForChangedPath(path, clearEvents);
        _this.callOnCompleteCallback(onComplete, status, errorReason);
      });
      var affectedPath = this.abortTransactions_(path);
      this.rerunTransactions_(affectedPath);
      this.eventQueue_.raiseEventsForChangedPath(affectedPath, []);
    };
    Repo2.prototype.update = function(path, childrenToMerge, onComplete) {
      var _this = this;
      this.log_("update", { path: path.toString(), value: childrenToMerge });
      var empty = true;
      var serverValues = this.generateServerValues();
      var changedChildren = {};
      each(childrenToMerge, function(changedKey, changedValue) {
        empty = false;
        changedChildren[changedKey] = resolveDeferredValueTree(path.child(changedKey), nodeFromJSON$1(changedValue), _this.serverSyncTree_, serverValues);
      });
      if (!empty) {
        var writeId_1 = this.getNextWriteId_();
        var events = this.serverSyncTree_.applyUserMerge(path, changedChildren, writeId_1);
        this.eventQueue_.queueEvents(events);
        this.server_.merge(path.toString(), childrenToMerge, function(status, errorReason) {
          var success = status === "ok";
          if (!success) {
            warn("update at " + path + " failed: " + status);
          }
          var clearEvents = _this.serverSyncTree_.ackUserWrite(writeId_1, !success);
          var affectedPath = clearEvents.length > 0 ? _this.rerunTransactions_(path) : path;
          _this.eventQueue_.raiseEventsForChangedPath(affectedPath, clearEvents);
          _this.callOnCompleteCallback(onComplete, status, errorReason);
        });
        each(childrenToMerge, function(changedPath) {
          var affectedPath = _this.abortTransactions_(path.child(changedPath));
          _this.rerunTransactions_(affectedPath);
        });
        this.eventQueue_.raiseEventsForChangedPath(path, []);
      } else {
        log("update() called with empty data.  Don't do anything.");
        this.callOnCompleteCallback(onComplete, "ok");
      }
    };
    Repo2.prototype.runOnDisconnectEvents_ = function() {
      var _this = this;
      this.log_("onDisconnectEvents");
      var serverValues = this.generateServerValues();
      var resolvedOnDisconnectTree = new SparseSnapshotTree();
      this.onDisconnect_.forEachTree(Path.Empty, function(path, node) {
        var resolved = resolveDeferredValueTree(path, node, _this.serverSyncTree_, serverValues);
        resolvedOnDisconnectTree.remember(path, resolved);
      });
      var events = [];
      resolvedOnDisconnectTree.forEachTree(Path.Empty, function(path, snap) {
        events = events.concat(_this.serverSyncTree_.applyServerOverwrite(path, snap));
        var affectedPath = _this.abortTransactions_(path);
        _this.rerunTransactions_(affectedPath);
      });
      this.onDisconnect_ = new SparseSnapshotTree();
      this.eventQueue_.raiseEventsForChangedPath(Path.Empty, events);
    };
    Repo2.prototype.onDisconnectCancel = function(path, onComplete) {
      var _this = this;
      this.server_.onDisconnectCancel(path.toString(), function(status, errorReason) {
        if (status === "ok") {
          _this.onDisconnect_.forget(path);
        }
        _this.callOnCompleteCallback(onComplete, status, errorReason);
      });
    };
    Repo2.prototype.onDisconnectSet = function(path, value, onComplete) {
      var _this = this;
      var newNode = nodeFromJSON$1(value);
      this.server_.onDisconnectPut(path.toString(), newNode.val(
        /*export=*/
        true
      ), function(status, errorReason) {
        if (status === "ok") {
          _this.onDisconnect_.remember(path, newNode);
        }
        _this.callOnCompleteCallback(onComplete, status, errorReason);
      });
    };
    Repo2.prototype.onDisconnectSetWithPriority = function(path, value, priority, onComplete) {
      var _this = this;
      var newNode = nodeFromJSON$1(value, priority);
      this.server_.onDisconnectPut(path.toString(), newNode.val(
        /*export=*/
        true
      ), function(status, errorReason) {
        if (status === "ok") {
          _this.onDisconnect_.remember(path, newNode);
        }
        _this.callOnCompleteCallback(onComplete, status, errorReason);
      });
    };
    Repo2.prototype.onDisconnectUpdate = function(path, childrenToMerge, onComplete) {
      var _this = this;
      if (isEmpty(childrenToMerge)) {
        log("onDisconnect().update() called with empty data.  Don't do anything.");
        this.callOnCompleteCallback(onComplete, "ok");
        return;
      }
      this.server_.onDisconnectMerge(path.toString(), childrenToMerge, function(status, errorReason) {
        if (status === "ok") {
          each(childrenToMerge, function(childName, childNode) {
            var newChildNode = nodeFromJSON$1(childNode);
            _this.onDisconnect_.remember(path.child(childName), newChildNode);
          });
        }
        _this.callOnCompleteCallback(onComplete, status, errorReason);
      });
    };
    Repo2.prototype.addEventCallbackForQuery = function(query, eventRegistration) {
      var events;
      if (query.path.getFront() === ".info") {
        events = this.infoSyncTree_.addEventRegistration(query, eventRegistration);
      } else {
        events = this.serverSyncTree_.addEventRegistration(query, eventRegistration);
      }
      this.eventQueue_.raiseEventsAtPath(query.path, events);
    };
    Repo2.prototype.removeEventCallbackForQuery = function(query, eventRegistration) {
      var events;
      if (query.path.getFront() === ".info") {
        events = this.infoSyncTree_.removeEventRegistration(query, eventRegistration);
      } else {
        events = this.serverSyncTree_.removeEventRegistration(query, eventRegistration);
      }
      this.eventQueue_.raiseEventsAtPath(query.path, events);
    };
    Repo2.prototype.interrupt = function() {
      if (this.persistentConnection_) {
        this.persistentConnection_.interrupt(INTERRUPT_REASON);
      }
    };
    Repo2.prototype.resume = function() {
      if (this.persistentConnection_) {
        this.persistentConnection_.resume(INTERRUPT_REASON);
      }
    };
    Repo2.prototype.stats = function(showDelta) {
      if (showDelta === void 0) {
        showDelta = false;
      }
      if (typeof console === "undefined") {
        return;
      }
      var stats2;
      if (showDelta) {
        if (!this.statsListener_) {
          this.statsListener_ = new StatsListener(this.stats_);
        }
        stats2 = this.statsListener_.get();
      } else {
        stats2 = this.stats_.get();
      }
      var longestName = Object.keys(stats2).reduce(function(previousValue, currentValue) {
        return Math.max(currentValue.length, previousValue);
      }, 0);
      each(stats2, function(stat, value) {
        var paddedStat = stat;
        for (var i = stat.length; i < longestName + 2; i++) {
          paddedStat += " ";
        }
        console.log(paddedStat + value);
      });
    };
    Repo2.prototype.statsIncrementCounter = function(metric) {
      this.stats_.incrementCounter(metric);
      this.statsReporter_.includeStat(metric);
    };
    Repo2.prototype.log_ = function() {
      var varArgs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        varArgs[_i] = arguments[_i];
      }
      var prefix = "";
      if (this.persistentConnection_) {
        prefix = this.persistentConnection_.id + ":";
      }
      log.apply(void 0, __spread([prefix], varArgs));
    };
    Repo2.prototype.callOnCompleteCallback = function(callback, status, errorReason) {
      if (callback) {
        exceptionGuard(function() {
          if (status === "ok") {
            callback(null);
          } else {
            var code = (status || "error").toUpperCase();
            var message = code;
            if (errorReason) {
              message += ": " + errorReason;
            }
            var error2 = new Error(message);
            error2.code = code;
            callback(error2);
          }
        });
      }
    };
    Object.defineProperty(Repo2.prototype, "database", {
      get: function() {
        return this.__database || (this.__database = new Database(this));
      },
      enumerable: false,
      configurable: true
    });
    return Repo2;
  }()
);
var RangedFilter = (
  /** @class */
  function() {
    function RangedFilter2(params) {
      this.indexedFilter_ = new IndexedFilter(params.getIndex());
      this.index_ = params.getIndex();
      this.startPost_ = RangedFilter2.getStartPost_(params);
      this.endPost_ = RangedFilter2.getEndPost_(params);
    }
    RangedFilter2.prototype.getStartPost = function() {
      return this.startPost_;
    };
    RangedFilter2.prototype.getEndPost = function() {
      return this.endPost_;
    };
    RangedFilter2.prototype.matches = function(node) {
      return this.index_.compare(this.getStartPost(), node) <= 0 && this.index_.compare(node, this.getEndPost()) <= 0;
    };
    RangedFilter2.prototype.updateChild = function(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
      if (!this.matches(new NamedNode(key, newChild))) {
        newChild = ChildrenNode.EMPTY_NODE;
      }
      return this.indexedFilter_.updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator);
    };
    RangedFilter2.prototype.updateFullNode = function(oldSnap, newSnap, optChangeAccumulator) {
      if (newSnap.isLeafNode()) {
        newSnap = ChildrenNode.EMPTY_NODE;
      }
      var filtered = newSnap.withIndex(this.index_);
      filtered = filtered.updatePriority(ChildrenNode.EMPTY_NODE);
      var self2 = this;
      newSnap.forEachChild(PRIORITY_INDEX, function(key, childNode) {
        if (!self2.matches(new NamedNode(key, childNode))) {
          filtered = filtered.updateImmediateChild(key, ChildrenNode.EMPTY_NODE);
        }
      });
      return this.indexedFilter_.updateFullNode(oldSnap, filtered, optChangeAccumulator);
    };
    RangedFilter2.prototype.updatePriority = function(oldSnap, newPriority) {
      return oldSnap;
    };
    RangedFilter2.prototype.filtersNodes = function() {
      return true;
    };
    RangedFilter2.prototype.getIndexedFilter = function() {
      return this.indexedFilter_;
    };
    RangedFilter2.prototype.getIndex = function() {
      return this.index_;
    };
    RangedFilter2.getStartPost_ = function(params) {
      if (params.hasStart()) {
        var startName = params.getIndexStartName();
        return params.getIndex().makePost(params.getIndexStartValue(), startName);
      } else {
        return params.getIndex().minPost();
      }
    };
    RangedFilter2.getEndPost_ = function(params) {
      if (params.hasEnd()) {
        var endName = params.getIndexEndName();
        return params.getIndex().makePost(params.getIndexEndValue(), endName);
      } else {
        return params.getIndex().maxPost();
      }
    };
    return RangedFilter2;
  }()
);
var LimitedFilter = (
  /** @class */
  function() {
    function LimitedFilter2(params) {
      this.rangedFilter_ = new RangedFilter(params);
      this.index_ = params.getIndex();
      this.limit_ = params.getLimit();
      this.reverse_ = !params.isViewFromLeft();
    }
    LimitedFilter2.prototype.updateChild = function(snap, key, newChild, affectedPath, source, optChangeAccumulator) {
      if (!this.rangedFilter_.matches(new NamedNode(key, newChild))) {
        newChild = ChildrenNode.EMPTY_NODE;
      }
      if (snap.getImmediateChild(key).equals(newChild)) {
        return snap;
      } else if (snap.numChildren() < this.limit_) {
        return this.rangedFilter_.getIndexedFilter().updateChild(snap, key, newChild, affectedPath, source, optChangeAccumulator);
      } else {
        return this.fullLimitUpdateChild_(snap, key, newChild, source, optChangeAccumulator);
      }
    };
    LimitedFilter2.prototype.updateFullNode = function(oldSnap, newSnap, optChangeAccumulator) {
      var filtered;
      if (newSnap.isLeafNode() || newSnap.isEmpty()) {
        filtered = ChildrenNode.EMPTY_NODE.withIndex(this.index_);
      } else {
        if (this.limit_ * 2 < newSnap.numChildren() && newSnap.isIndexed(this.index_)) {
          filtered = ChildrenNode.EMPTY_NODE.withIndex(this.index_);
          var iterator = void 0;
          if (this.reverse_) {
            iterator = newSnap.getReverseIteratorFrom(this.rangedFilter_.getEndPost(), this.index_);
          } else {
            iterator = newSnap.getIteratorFrom(this.rangedFilter_.getStartPost(), this.index_);
          }
          var count = 0;
          while (iterator.hasNext() && count < this.limit_) {
            var next = iterator.getNext();
            var inRange = void 0;
            if (this.reverse_) {
              inRange = this.index_.compare(this.rangedFilter_.getStartPost(), next) <= 0;
            } else {
              inRange = this.index_.compare(next, this.rangedFilter_.getEndPost()) <= 0;
            }
            if (inRange) {
              filtered = filtered.updateImmediateChild(next.name, next.node);
              count++;
            } else {
              break;
            }
          }
        } else {
          filtered = newSnap.withIndex(this.index_);
          filtered = filtered.updatePriority(ChildrenNode.EMPTY_NODE);
          var startPost = void 0;
          var endPost = void 0;
          var cmp = void 0;
          var iterator = void 0;
          if (this.reverse_) {
            iterator = filtered.getReverseIterator(this.index_);
            startPost = this.rangedFilter_.getEndPost();
            endPost = this.rangedFilter_.getStartPost();
            var indexCompare_1 = this.index_.getCompare();
            cmp = function(a, b) {
              return indexCompare_1(b, a);
            };
          } else {
            iterator = filtered.getIterator(this.index_);
            startPost = this.rangedFilter_.getStartPost();
            endPost = this.rangedFilter_.getEndPost();
            cmp = this.index_.getCompare();
          }
          var count = 0;
          var foundStartPost = false;
          while (iterator.hasNext()) {
            var next = iterator.getNext();
            if (!foundStartPost && cmp(startPost, next) <= 0) {
              foundStartPost = true;
            }
            var inRange = foundStartPost && count < this.limit_ && cmp(next, endPost) <= 0;
            if (inRange) {
              count++;
            } else {
              filtered = filtered.updateImmediateChild(next.name, ChildrenNode.EMPTY_NODE);
            }
          }
        }
      }
      return this.rangedFilter_.getIndexedFilter().updateFullNode(oldSnap, filtered, optChangeAccumulator);
    };
    LimitedFilter2.prototype.updatePriority = function(oldSnap, newPriority) {
      return oldSnap;
    };
    LimitedFilter2.prototype.filtersNodes = function() {
      return true;
    };
    LimitedFilter2.prototype.getIndexedFilter = function() {
      return this.rangedFilter_.getIndexedFilter();
    };
    LimitedFilter2.prototype.getIndex = function() {
      return this.index_;
    };
    LimitedFilter2.prototype.fullLimitUpdateChild_ = function(snap, childKey, childSnap, source, changeAccumulator) {
      var cmp;
      if (this.reverse_) {
        var indexCmp_1 = this.index_.getCompare();
        cmp = function(a, b) {
          return indexCmp_1(b, a);
        };
      } else {
        cmp = this.index_.getCompare();
      }
      var oldEventCache = snap;
      assert(oldEventCache.numChildren() === this.limit_, "");
      var newChildNamedNode = new NamedNode(childKey, childSnap);
      var windowBoundary = this.reverse_ ? oldEventCache.getFirstChild(this.index_) : oldEventCache.getLastChild(this.index_);
      var inRange = this.rangedFilter_.matches(newChildNamedNode);
      if (oldEventCache.hasChild(childKey)) {
        var oldChildSnap = oldEventCache.getImmediateChild(childKey);
        var nextChild = source.getChildAfterChild(this.index_, windowBoundary, this.reverse_);
        while (nextChild != null && (nextChild.name === childKey || oldEventCache.hasChild(nextChild.name))) {
          nextChild = source.getChildAfterChild(this.index_, nextChild, this.reverse_);
        }
        var compareNext = nextChild == null ? 1 : cmp(nextChild, newChildNamedNode);
        var remainsInWindow = inRange && !childSnap.isEmpty() && compareNext >= 0;
        if (remainsInWindow) {
          if (changeAccumulator != null) {
            changeAccumulator.trackChildChange(Change.childChangedChange(childKey, childSnap, oldChildSnap));
          }
          return oldEventCache.updateImmediateChild(childKey, childSnap);
        } else {
          if (changeAccumulator != null) {
            changeAccumulator.trackChildChange(Change.childRemovedChange(childKey, oldChildSnap));
          }
          var newEventCache = oldEventCache.updateImmediateChild(childKey, ChildrenNode.EMPTY_NODE);
          var nextChildInRange = nextChild != null && this.rangedFilter_.matches(nextChild);
          if (nextChildInRange) {
            if (changeAccumulator != null) {
              changeAccumulator.trackChildChange(Change.childAddedChange(nextChild.name, nextChild.node));
            }
            return newEventCache.updateImmediateChild(nextChild.name, nextChild.node);
          } else {
            return newEventCache;
          }
        }
      } else if (childSnap.isEmpty()) {
        return snap;
      } else if (inRange) {
        if (cmp(windowBoundary, newChildNamedNode) >= 0) {
          if (changeAccumulator != null) {
            changeAccumulator.trackChildChange(Change.childRemovedChange(windowBoundary.name, windowBoundary.node));
            changeAccumulator.trackChildChange(Change.childAddedChange(childKey, childSnap));
          }
          return oldEventCache.updateImmediateChild(childKey, childSnap).updateImmediateChild(windowBoundary.name, ChildrenNode.EMPTY_NODE);
        } else {
          return snap;
        }
      } else {
        return snap;
      }
    };
    return LimitedFilter2;
  }()
);
var QueryParams = (
  /** @class */
  function() {
    function QueryParams2() {
      this.limitSet_ = false;
      this.startSet_ = false;
      this.startNameSet_ = false;
      this.endSet_ = false;
      this.endNameSet_ = false;
      this.limit_ = 0;
      this.viewFrom_ = "";
      this.indexStartValue_ = null;
      this.indexStartName_ = "";
      this.indexEndValue_ = null;
      this.indexEndName_ = "";
      this.index_ = PRIORITY_INDEX;
    }
    QueryParams2.prototype.hasStart = function() {
      return this.startSet_;
    };
    QueryParams2.prototype.isViewFromLeft = function() {
      if (this.viewFrom_ === "") {
        return this.startSet_;
      } else {
        return this.viewFrom_ === QueryParams2.WIRE_PROTOCOL_CONSTANTS_.VIEW_FROM_LEFT;
      }
    };
    QueryParams2.prototype.getIndexStartValue = function() {
      assert(this.startSet_, "Only valid if start has been set");
      return this.indexStartValue_;
    };
    QueryParams2.prototype.getIndexStartName = function() {
      assert(this.startSet_, "Only valid if start has been set");
      if (this.startNameSet_) {
        return this.indexStartName_;
      } else {
        return MIN_NAME;
      }
    };
    QueryParams2.prototype.hasEnd = function() {
      return this.endSet_;
    };
    QueryParams2.prototype.getIndexEndValue = function() {
      assert(this.endSet_, "Only valid if end has been set");
      return this.indexEndValue_;
    };
    QueryParams2.prototype.getIndexEndName = function() {
      assert(this.endSet_, "Only valid if end has been set");
      if (this.endNameSet_) {
        return this.indexEndName_;
      } else {
        return MAX_NAME;
      }
    };
    QueryParams2.prototype.hasLimit = function() {
      return this.limitSet_;
    };
    QueryParams2.prototype.hasAnchoredLimit = function() {
      return this.limitSet_ && this.viewFrom_ !== "";
    };
    QueryParams2.prototype.getLimit = function() {
      assert(this.limitSet_, "Only valid if limit has been set");
      return this.limit_;
    };
    QueryParams2.prototype.getIndex = function() {
      return this.index_;
    };
    QueryParams2.prototype.copy_ = function() {
      var copy = new QueryParams2();
      copy.limitSet_ = this.limitSet_;
      copy.limit_ = this.limit_;
      copy.startSet_ = this.startSet_;
      copy.indexStartValue_ = this.indexStartValue_;
      copy.startNameSet_ = this.startNameSet_;
      copy.indexStartName_ = this.indexStartName_;
      copy.endSet_ = this.endSet_;
      copy.indexEndValue_ = this.indexEndValue_;
      copy.endNameSet_ = this.endNameSet_;
      copy.indexEndName_ = this.indexEndName_;
      copy.index_ = this.index_;
      copy.viewFrom_ = this.viewFrom_;
      return copy;
    };
    QueryParams2.prototype.limit = function(newLimit) {
      var newParams = this.copy_();
      newParams.limitSet_ = true;
      newParams.limit_ = newLimit;
      newParams.viewFrom_ = "";
      return newParams;
    };
    QueryParams2.prototype.limitToFirst = function(newLimit) {
      var newParams = this.copy_();
      newParams.limitSet_ = true;
      newParams.limit_ = newLimit;
      newParams.viewFrom_ = QueryParams2.WIRE_PROTOCOL_CONSTANTS_.VIEW_FROM_LEFT;
      return newParams;
    };
    QueryParams2.prototype.limitToLast = function(newLimit) {
      var newParams = this.copy_();
      newParams.limitSet_ = true;
      newParams.limit_ = newLimit;
      newParams.viewFrom_ = QueryParams2.WIRE_PROTOCOL_CONSTANTS_.VIEW_FROM_RIGHT;
      return newParams;
    };
    QueryParams2.prototype.startAt = function(indexValue, key) {
      var newParams = this.copy_();
      newParams.startSet_ = true;
      if (indexValue === void 0) {
        indexValue = null;
      }
      newParams.indexStartValue_ = indexValue;
      if (key != null) {
        newParams.startNameSet_ = true;
        newParams.indexStartName_ = key;
      } else {
        newParams.startNameSet_ = false;
        newParams.indexStartName_ = "";
      }
      return newParams;
    };
    QueryParams2.prototype.endAt = function(indexValue, key) {
      var newParams = this.copy_();
      newParams.endSet_ = true;
      if (indexValue === void 0) {
        indexValue = null;
      }
      newParams.indexEndValue_ = indexValue;
      if (key !== void 0) {
        newParams.endNameSet_ = true;
        newParams.indexEndName_ = key;
      } else {
        newParams.endNameSet_ = false;
        newParams.indexEndName_ = "";
      }
      return newParams;
    };
    QueryParams2.prototype.orderBy = function(index) {
      var newParams = this.copy_();
      newParams.index_ = index;
      return newParams;
    };
    QueryParams2.prototype.getQueryObject = function() {
      var WIRE_PROTOCOL_CONSTANTS = QueryParams2.WIRE_PROTOCOL_CONSTANTS_;
      var obj = {};
      if (this.startSet_) {
        obj[WIRE_PROTOCOL_CONSTANTS.INDEX_START_VALUE] = this.indexStartValue_;
        if (this.startNameSet_) {
          obj[WIRE_PROTOCOL_CONSTANTS.INDEX_START_NAME] = this.indexStartName_;
        }
      }
      if (this.endSet_) {
        obj[WIRE_PROTOCOL_CONSTANTS.INDEX_END_VALUE] = this.indexEndValue_;
        if (this.endNameSet_) {
          obj[WIRE_PROTOCOL_CONSTANTS.INDEX_END_NAME] = this.indexEndName_;
        }
      }
      if (this.limitSet_) {
        obj[WIRE_PROTOCOL_CONSTANTS.LIMIT] = this.limit_;
        var viewFrom = this.viewFrom_;
        if (viewFrom === "") {
          if (this.isViewFromLeft()) {
            viewFrom = WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_LEFT;
          } else {
            viewFrom = WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_RIGHT;
          }
        }
        obj[WIRE_PROTOCOL_CONSTANTS.VIEW_FROM] = viewFrom;
      }
      if (this.index_ !== PRIORITY_INDEX) {
        obj[WIRE_PROTOCOL_CONSTANTS.INDEX] = this.index_.toString();
      }
      return obj;
    };
    QueryParams2.prototype.loadsAllData = function() {
      return !(this.startSet_ || this.endSet_ || this.limitSet_);
    };
    QueryParams2.prototype.isDefault = function() {
      return this.loadsAllData() && this.index_ === PRIORITY_INDEX;
    };
    QueryParams2.prototype.getNodeFilter = function() {
      if (this.loadsAllData()) {
        return new IndexedFilter(this.getIndex());
      } else if (this.hasLimit()) {
        return new LimitedFilter(this);
      } else {
        return new RangedFilter(this);
      }
    };
    QueryParams2.prototype.toRestQueryStringParameters = function() {
      var REST_CONSTANTS = QueryParams2.REST_QUERY_CONSTANTS_;
      var qs = {};
      if (this.isDefault()) {
        return qs;
      }
      var orderBy;
      if (this.index_ === PRIORITY_INDEX) {
        orderBy = REST_CONSTANTS.PRIORITY_INDEX;
      } else if (this.index_ === VALUE_INDEX) {
        orderBy = REST_CONSTANTS.VALUE_INDEX;
      } else if (this.index_ === KEY_INDEX) {
        orderBy = REST_CONSTANTS.KEY_INDEX;
      } else {
        assert(this.index_ instanceof PathIndex, "Unrecognized index type!");
        orderBy = this.index_.toString();
      }
      qs[REST_CONSTANTS.ORDER_BY] = stringify(orderBy);
      if (this.startSet_) {
        qs[REST_CONSTANTS.START_AT] = stringify(this.indexStartValue_);
        if (this.startNameSet_) {
          qs[REST_CONSTANTS.START_AT] += "," + stringify(this.indexStartName_);
        }
      }
      if (this.endSet_) {
        qs[REST_CONSTANTS.END_AT] = stringify(this.indexEndValue_);
        if (this.endNameSet_) {
          qs[REST_CONSTANTS.END_AT] += "," + stringify(this.indexEndName_);
        }
      }
      if (this.limitSet_) {
        if (this.isViewFromLeft()) {
          qs[REST_CONSTANTS.LIMIT_TO_FIRST] = this.limit_;
        } else {
          qs[REST_CONSTANTS.LIMIT_TO_LAST] = this.limit_;
        }
      }
      return qs;
    };
    QueryParams2.WIRE_PROTOCOL_CONSTANTS_ = {
      INDEX_START_VALUE: "sp",
      INDEX_START_NAME: "sn",
      INDEX_END_VALUE: "ep",
      INDEX_END_NAME: "en",
      LIMIT: "l",
      VIEW_FROM: "vf",
      VIEW_FROM_LEFT: "l",
      VIEW_FROM_RIGHT: "r",
      INDEX: "i"
    };
    QueryParams2.REST_QUERY_CONSTANTS_ = {
      ORDER_BY: "orderBy",
      PRIORITY_INDEX: "$priority",
      VALUE_INDEX: "$value",
      KEY_INDEX: "$key",
      START_AT: "startAt",
      END_AT: "endAt",
      LIMIT_TO_FIRST: "limitToFirst",
      LIMIT_TO_LAST: "limitToLast"
    };
    QueryParams2.DEFAULT = new QueryParams2();
    return QueryParams2;
  }()
);
var Reference = (
  /** @class */
  function(_super) {
    __extends(Reference2, _super);
    function Reference2(repo, path) {
      var _this = this;
      if (!(repo instanceof Repo)) {
        throw new Error("new Reference() no longer supported - use app.database().");
      }
      _this = _super.call(this, repo, path, QueryParams.DEFAULT, false) || this;
      return _this;
    }
    Reference2.prototype.getKey = function() {
      validateArgCount("Reference.key", 0, 0, arguments.length);
      if (this.path.isEmpty()) {
        return null;
      } else {
        return this.path.getBack();
      }
    };
    Reference2.prototype.child = function(pathString) {
      validateArgCount("Reference.child", 1, 1, arguments.length);
      if (typeof pathString === "number") {
        pathString = String(pathString);
      } else if (!(pathString instanceof Path)) {
        if (this.path.getFront() === null) {
          validateRootPathString("Reference.child", 1, pathString, false);
        } else {
          validatePathString("Reference.child", 1, pathString, false);
        }
      }
      return new Reference2(this.repo, this.path.child(pathString));
    };
    Reference2.prototype.getParent = function() {
      validateArgCount("Reference.parent", 0, 0, arguments.length);
      var parentPath = this.path.parent();
      return parentPath === null ? null : new Reference2(this.repo, parentPath);
    };
    Reference2.prototype.getRoot = function() {
      validateArgCount("Reference.root", 0, 0, arguments.length);
      var ref = this;
      while (ref.getParent() !== null) {
        ref = ref.getParent();
      }
      return ref;
    };
    Reference2.prototype.databaseProp = function() {
      return this.repo.database;
    };
    Reference2.prototype.set = function(newVal, onComplete) {
      validateArgCount("Reference.set", 1, 2, arguments.length);
      validateWritablePath("Reference.set", this.path);
      validateFirebaseDataArg("Reference.set", 1, newVal, this.path, false);
      validateCallback("Reference.set", 2, onComplete, true);
      var deferred = new Deferred();
      this.repo.setWithPriority(
        this.path,
        newVal,
        /*priority=*/
        null,
        deferred.wrapCallback(onComplete)
      );
      return deferred.promise;
    };
    Reference2.prototype.update = function(objectToMerge, onComplete) {
      validateArgCount("Reference.update", 1, 2, arguments.length);
      validateWritablePath("Reference.update", this.path);
      if (Array.isArray(objectToMerge)) {
        var newObjectToMerge = {};
        for (var i = 0; i < objectToMerge.length; ++i) {
          newObjectToMerge["" + i] = objectToMerge[i];
        }
        objectToMerge = newObjectToMerge;
        warn("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.");
      }
      validateFirebaseMergeDataArg("Reference.update", 1, objectToMerge, this.path, false);
      validateCallback("Reference.update", 2, onComplete, true);
      var deferred = new Deferred();
      this.repo.update(this.path, objectToMerge, deferred.wrapCallback(onComplete));
      return deferred.promise;
    };
    Reference2.prototype.setWithPriority = function(newVal, newPriority, onComplete) {
      validateArgCount("Reference.setWithPriority", 2, 3, arguments.length);
      validateWritablePath("Reference.setWithPriority", this.path);
      validateFirebaseDataArg("Reference.setWithPriority", 1, newVal, this.path, false);
      validatePriority("Reference.setWithPriority", 2, newPriority, false);
      validateCallback("Reference.setWithPriority", 3, onComplete, true);
      if (this.getKey() === ".length" || this.getKey() === ".keys") {
        throw "Reference.setWithPriority failed: " + this.getKey() + " is a read-only object.";
      }
      var deferred = new Deferred();
      this.repo.setWithPriority(this.path, newVal, newPriority, deferred.wrapCallback(onComplete));
      return deferred.promise;
    };
    Reference2.prototype.remove = function(onComplete) {
      validateArgCount("Reference.remove", 0, 1, arguments.length);
      validateWritablePath("Reference.remove", this.path);
      validateCallback("Reference.remove", 1, onComplete, true);
      return this.set(null, onComplete);
    };
    Reference2.prototype.transaction = function(transactionUpdate, onComplete, applyLocally) {
      validateArgCount("Reference.transaction", 1, 3, arguments.length);
      validateWritablePath("Reference.transaction", this.path);
      validateCallback("Reference.transaction", 1, transactionUpdate, false);
      validateCallback("Reference.transaction", 2, onComplete, true);
      validateBoolean("Reference.transaction", 3, applyLocally, true);
      if (this.getKey() === ".length" || this.getKey() === ".keys") {
        throw "Reference.transaction failed: " + this.getKey() + " is a read-only object.";
      }
      if (applyLocally === void 0) {
        applyLocally = true;
      }
      var deferred = new Deferred();
      if (typeof onComplete === "function") {
        deferred.promise.catch(function() {
        });
      }
      var promiseComplete = function(error2, committed, snapshot) {
        if (error2) {
          deferred.reject(error2);
        } else {
          deferred.resolve(new TransactionResult(committed, snapshot));
        }
        if (typeof onComplete === "function") {
          onComplete(error2, committed, snapshot);
        }
      };
      this.repo.startTransaction(this.path, transactionUpdate, promiseComplete, applyLocally);
      return deferred.promise;
    };
    Reference2.prototype.setPriority = function(priority, onComplete) {
      validateArgCount("Reference.setPriority", 1, 2, arguments.length);
      validateWritablePath("Reference.setPriority", this.path);
      validatePriority("Reference.setPriority", 1, priority, false);
      validateCallback("Reference.setPriority", 2, onComplete, true);
      var deferred = new Deferred();
      this.repo.setWithPriority(this.path.child(".priority"), priority, null, deferred.wrapCallback(onComplete));
      return deferred.promise;
    };
    Reference2.prototype.push = function(value, onComplete) {
      validateArgCount("Reference.push", 0, 2, arguments.length);
      validateWritablePath("Reference.push", this.path);
      validateFirebaseDataArg("Reference.push", 1, value, this.path, true);
      validateCallback("Reference.push", 2, onComplete, true);
      var now = this.repo.serverTime();
      var name2 = nextPushId(now);
      var thennablePushRef = this.child(name2);
      var pushRef = this.child(name2);
      var promise;
      if (value != null) {
        promise = thennablePushRef.set(value, onComplete).then(function() {
          return pushRef;
        });
      } else {
        promise = Promise.resolve(pushRef);
      }
      thennablePushRef.then = promise.then.bind(promise);
      thennablePushRef.catch = promise.then.bind(promise, void 0);
      if (typeof onComplete === "function") {
        promise.catch(function() {
        });
      }
      return thennablePushRef;
    };
    Reference2.prototype.onDisconnect = function() {
      validateWritablePath("Reference.onDisconnect", this.path);
      return new OnDisconnect(this.repo, this.path);
    };
    Object.defineProperty(Reference2.prototype, "database", {
      get: function() {
        return this.databaseProp();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Reference2.prototype, "key", {
      get: function() {
        return this.getKey();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Reference2.prototype, "parent", {
      get: function() {
        return this.getParent();
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Reference2.prototype, "root", {
      get: function() {
        return this.getRoot();
      },
      enumerable: false,
      configurable: true
    });
    return Reference2;
  }(Query)
);
Query.__referenceConstructor = Reference;
SyncPoint.__referenceConstructor = Reference;
var TreeNode = (
  /** @class */
  /* @__PURE__ */ function() {
    function TreeNode2() {
      this.children = {};
      this.childCount = 0;
      this.value = null;
    }
    return TreeNode2;
  }()
);
var Tree = (
  /** @class */
  function() {
    function Tree2(name_, parent_, node_) {
      if (name_ === void 0) {
        name_ = "";
      }
      if (parent_ === void 0) {
        parent_ = null;
      }
      if (node_ === void 0) {
        node_ = new TreeNode();
      }
      this.name_ = name_;
      this.parent_ = parent_;
      this.node_ = node_;
    }
    Tree2.prototype.subTree = function(pathObj) {
      var path = pathObj instanceof Path ? pathObj : new Path(pathObj);
      var child = this, next = path.getFront();
      while (next !== null) {
        var childNode = safeGet(child.node_.children, next) || new TreeNode();
        child = new Tree2(next, child, childNode);
        path = path.popFront();
        next = path.getFront();
      }
      return child;
    };
    Tree2.prototype.getValue = function() {
      return this.node_.value;
    };
    Tree2.prototype.setValue = function(value) {
      assert(typeof value !== "undefined", "Cannot set value to undefined");
      this.node_.value = value;
      this.updateParents_();
    };
    Tree2.prototype.clear = function() {
      this.node_.value = null;
      this.node_.children = {};
      this.node_.childCount = 0;
      this.updateParents_();
    };
    Tree2.prototype.hasChildren = function() {
      return this.node_.childCount > 0;
    };
    Tree2.prototype.isEmpty = function() {
      return this.getValue() === null && !this.hasChildren();
    };
    Tree2.prototype.forEachChild = function(action) {
      var _this = this;
      each(this.node_.children, function(child, childTree) {
        action(new Tree2(child, _this, childTree));
      });
    };
    Tree2.prototype.forEachDescendant = function(action, includeSelf, childrenFirst) {
      if (includeSelf && !childrenFirst) {
        action(this);
      }
      this.forEachChild(function(child) {
        child.forEachDescendant(
          action,
          /*includeSelf=*/
          true,
          childrenFirst
        );
      });
      if (includeSelf && childrenFirst) {
        action(this);
      }
    };
    Tree2.prototype.forEachAncestor = function(action, includeSelf) {
      var node = includeSelf ? this : this.parent();
      while (node !== null) {
        if (action(node)) {
          return true;
        }
        node = node.parent();
      }
      return false;
    };
    Tree2.prototype.forEachImmediateDescendantWithValue = function(action) {
      this.forEachChild(function(child) {
        if (child.getValue() !== null) {
          action(child);
        } else {
          child.forEachImmediateDescendantWithValue(action);
        }
      });
    };
    Tree2.prototype.path = function() {
      return new Path(this.parent_ === null ? this.name_ : this.parent_.path() + "/" + this.name_);
    };
    Tree2.prototype.name = function() {
      return this.name_;
    };
    Tree2.prototype.parent = function() {
      return this.parent_;
    };
    Tree2.prototype.updateParents_ = function() {
      if (this.parent_ !== null) {
        this.parent_.updateChild_(this.name_, this);
      }
    };
    Tree2.prototype.updateChild_ = function(childName, child) {
      var childEmpty = child.isEmpty();
      var childExists = contains(this.node_.children, childName);
      if (childEmpty && childExists) {
        delete this.node_.children[childName];
        this.node_.childCount--;
        this.updateParents_();
      } else if (!childEmpty && !childExists) {
        this.node_.children[childName] = child.node_;
        this.node_.childCount++;
        this.updateParents_();
      }
    };
    return Tree2;
  }()
);
var TransactionStatus;
(function(TransactionStatus2) {
  TransactionStatus2[TransactionStatus2["RUN"] = 0] = "RUN";
  TransactionStatus2[TransactionStatus2["SENT"] = 1] = "SENT";
  TransactionStatus2[TransactionStatus2["COMPLETED"] = 2] = "COMPLETED";
  TransactionStatus2[TransactionStatus2["SENT_NEEDS_ABORT"] = 3] = "SENT_NEEDS_ABORT";
  TransactionStatus2[TransactionStatus2["NEEDS_ABORT"] = 4] = "NEEDS_ABORT";
})(TransactionStatus || (TransactionStatus = {}));
Repo.MAX_TRANSACTION_RETRIES_ = 25;
Repo.prototype.transactionsInit_ = function() {
  this.transactionQueueTree_ = new Tree();
};
Repo.prototype.startTransaction = function(path, transactionUpdate, onComplete, applyLocally) {
  this.log_("transaction on " + path);
  var valueCallback = function() {
  };
  var watchRef = new Reference(this, path);
  watchRef.on("value", valueCallback);
  var unwatcher = function() {
    watchRef.off("value", valueCallback);
  };
  var transaction = {
    path,
    update: transactionUpdate,
    onComplete,
    // One of TransactionStatus enums.
    status: null,
    // Used when combining transactions at different locations to figure out which one goes first.
    order: LUIDGenerator(),
    // Whether to raise local events for this transaction.
    applyLocally,
    // Count of how many times we've retried the transaction.
    retryCount: 0,
    // Function to call to clean up our .on() listener.
    unwatcher,
    // Stores why a transaction was aborted.
    abortReason: null,
    currentWriteId: null,
    currentInputSnapshot: null,
    currentOutputSnapshotRaw: null,
    currentOutputSnapshotResolved: null
  };
  var currentState = this.getLatestState_(path);
  transaction.currentInputSnapshot = currentState;
  var newVal = transaction.update(currentState.val());
  if (newVal === void 0) {
    transaction.unwatcher();
    transaction.currentOutputSnapshotRaw = null;
    transaction.currentOutputSnapshotResolved = null;
    if (transaction.onComplete) {
      var snapshot = new DataSnapshot(transaction.currentInputSnapshot, new Reference(this, transaction.path), PRIORITY_INDEX);
      transaction.onComplete(null, false, snapshot);
    }
  } else {
    validateFirebaseData("transaction failed: Data returned ", newVal, transaction.path);
    transaction.status = TransactionStatus.RUN;
    var queueNode = this.transactionQueueTree_.subTree(path);
    var nodeQueue = queueNode.getValue() || [];
    nodeQueue.push(transaction);
    queueNode.setValue(nodeQueue);
    var priorityForNode = void 0;
    if (typeof newVal === "object" && newVal !== null && contains(newVal, ".priority")) {
      priorityForNode = safeGet(newVal, ".priority");
      assert(isValidPriority(priorityForNode), "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.");
    } else {
      var currentNode = this.serverSyncTree_.calcCompleteEventCache(path) || ChildrenNode.EMPTY_NODE;
      priorityForNode = currentNode.getPriority().val();
    }
    priorityForNode = priorityForNode;
    var serverValues = this.generateServerValues();
    var newNodeUnresolved = nodeFromJSON$1(newVal, priorityForNode);
    var newNode = resolveDeferredValueSnapshot(newNodeUnresolved, currentState, serverValues);
    transaction.currentOutputSnapshotRaw = newNodeUnresolved;
    transaction.currentOutputSnapshotResolved = newNode;
    transaction.currentWriteId = this.getNextWriteId_();
    var events = this.serverSyncTree_.applyUserOverwrite(path, newNode, transaction.currentWriteId, transaction.applyLocally);
    this.eventQueue_.raiseEventsForChangedPath(path, events);
    this.sendReadyTransactions_();
  }
};
Repo.prototype.getLatestState_ = function(path, excludeSets) {
  return this.serverSyncTree_.calcCompleteEventCache(path, excludeSets) || ChildrenNode.EMPTY_NODE;
};
Repo.prototype.sendReadyTransactions_ = function(node) {
  var _this = this;
  if (node === void 0) {
    node = this.transactionQueueTree_;
  }
  if (!node) {
    this.pruneCompletedTransactionsBelowNode_(node);
  }
  if (node.getValue() !== null) {
    var queue = this.buildTransactionQueue_(node);
    assert(queue.length > 0, "Sending zero length transaction queue");
    var allRun = queue.every(function(transaction) {
      return transaction.status === TransactionStatus.RUN;
    });
    if (allRun) {
      this.sendTransactionQueue_(node.path(), queue);
    }
  } else if (node.hasChildren()) {
    node.forEachChild(function(childNode) {
      _this.sendReadyTransactions_(childNode);
    });
  }
};
Repo.prototype.sendTransactionQueue_ = function(path, queue) {
  var _this = this;
  var setsToIgnore = queue.map(function(txn2) {
    return txn2.currentWriteId;
  });
  var latestState = this.getLatestState_(path, setsToIgnore);
  var snapToSend = latestState;
  var latestHash = latestState.hash();
  for (var i = 0; i < queue.length; i++) {
    var txn = queue[i];
    assert(txn.status === TransactionStatus.RUN, "tryToSendTransactionQueue_: items in queue should all be run.");
    txn.status = TransactionStatus.SENT;
    txn.retryCount++;
    var relativePath = Path.relativePath(path, txn.path);
    snapToSend = snapToSend.updateChild(relativePath, txn.currentOutputSnapshotRaw);
  }
  var dataToSend = snapToSend.val(true);
  var pathToSend = path;
  this.server_.put(pathToSend.toString(), dataToSend, function(status) {
    _this.log_("transaction put response", {
      path: pathToSend.toString(),
      status
    });
    var events = [];
    if (status === "ok") {
      var callbacks = [];
      for (var i2 = 0; i2 < queue.length; i2++) {
        queue[i2].status = TransactionStatus.COMPLETED;
        events = events.concat(_this.serverSyncTree_.ackUserWrite(queue[i2].currentWriteId));
        if (queue[i2].onComplete) {
          var node = queue[i2].currentOutputSnapshotResolved;
          var ref = new Reference(_this, queue[i2].path);
          var snapshot = new DataSnapshot(node, ref, PRIORITY_INDEX);
          callbacks.push(queue[i2].onComplete.bind(null, null, true, snapshot));
        }
        queue[i2].unwatcher();
      }
      _this.pruneCompletedTransactionsBelowNode_(_this.transactionQueueTree_.subTree(path));
      _this.sendReadyTransactions_();
      _this.eventQueue_.raiseEventsForChangedPath(path, events);
      for (var i2 = 0; i2 < callbacks.length; i2++) {
        exceptionGuard(callbacks[i2]);
      }
    } else {
      if (status === "datastale") {
        for (var i2 = 0; i2 < queue.length; i2++) {
          if (queue[i2].status === TransactionStatus.SENT_NEEDS_ABORT) {
            queue[i2].status = TransactionStatus.NEEDS_ABORT;
          } else {
            queue[i2].status = TransactionStatus.RUN;
          }
        }
      } else {
        warn("transaction at " + pathToSend.toString() + " failed: " + status);
        for (var i2 = 0; i2 < queue.length; i2++) {
          queue[i2].status = TransactionStatus.NEEDS_ABORT;
          queue[i2].abortReason = status;
        }
      }
      _this.rerunTransactions_(path);
    }
  }, latestHash);
};
Repo.prototype.rerunTransactions_ = function(changedPath) {
  var rootMostTransactionNode = this.getAncestorTransactionNode_(changedPath);
  var path = rootMostTransactionNode.path();
  var queue = this.buildTransactionQueue_(rootMostTransactionNode);
  this.rerunTransactionQueue_(queue, path);
  return path;
};
Repo.prototype.rerunTransactionQueue_ = function(queue, path) {
  if (queue.length === 0) {
    return;
  }
  var callbacks = [];
  var events = [];
  var txnsToRerun = queue.filter(function(q) {
    return q.status === TransactionStatus.RUN;
  });
  var setsToIgnore = txnsToRerun.map(function(q) {
    return q.currentWriteId;
  });
  for (var i = 0; i < queue.length; i++) {
    var transaction = queue[i];
    var relativePath = Path.relativePath(path, transaction.path);
    var abortTransaction = false, abortReason = void 0;
    assert(relativePath !== null, "rerunTransactionsUnderNode_: relativePath should not be null.");
    if (transaction.status === TransactionStatus.NEEDS_ABORT) {
      abortTransaction = true;
      abortReason = transaction.abortReason;
      events = events.concat(this.serverSyncTree_.ackUserWrite(transaction.currentWriteId, true));
    } else if (transaction.status === TransactionStatus.RUN) {
      if (transaction.retryCount >= Repo.MAX_TRANSACTION_RETRIES_) {
        abortTransaction = true;
        abortReason = "maxretry";
        events = events.concat(this.serverSyncTree_.ackUserWrite(transaction.currentWriteId, true));
      } else {
        var currentNode = this.getLatestState_(transaction.path, setsToIgnore);
        transaction.currentInputSnapshot = currentNode;
        var newData = queue[i].update(currentNode.val());
        if (newData !== void 0) {
          validateFirebaseData("transaction failed: Data returned ", newData, transaction.path);
          var newDataNode = nodeFromJSON$1(newData);
          var hasExplicitPriority = typeof newData === "object" && newData != null && contains(newData, ".priority");
          if (!hasExplicitPriority) {
            newDataNode = newDataNode.updatePriority(currentNode.getPriority());
          }
          var oldWriteId = transaction.currentWriteId;
          var serverValues = this.generateServerValues();
          var newNodeResolved = resolveDeferredValueSnapshot(newDataNode, currentNode, serverValues);
          transaction.currentOutputSnapshotRaw = newDataNode;
          transaction.currentOutputSnapshotResolved = newNodeResolved;
          transaction.currentWriteId = this.getNextWriteId_();
          setsToIgnore.splice(setsToIgnore.indexOf(oldWriteId), 1);
          events = events.concat(this.serverSyncTree_.applyUserOverwrite(transaction.path, newNodeResolved, transaction.currentWriteId, transaction.applyLocally));
          events = events.concat(this.serverSyncTree_.ackUserWrite(oldWriteId, true));
        } else {
          abortTransaction = true;
          abortReason = "nodata";
          events = events.concat(this.serverSyncTree_.ackUserWrite(transaction.currentWriteId, true));
        }
      }
    }
    this.eventQueue_.raiseEventsForChangedPath(path, events);
    events = [];
    if (abortTransaction) {
      queue[i].status = TransactionStatus.COMPLETED;
      (function(unwatcher) {
        setTimeout(unwatcher, Math.floor(0));
      })(queue[i].unwatcher);
      if (queue[i].onComplete) {
        if (abortReason === "nodata") {
          var ref = new Reference(this, queue[i].path);
          var lastInput = queue[i].currentInputSnapshot;
          var snapshot = new DataSnapshot(lastInput, ref, PRIORITY_INDEX);
          callbacks.push(queue[i].onComplete.bind(null, null, false, snapshot));
        } else {
          callbacks.push(queue[i].onComplete.bind(null, new Error(abortReason), false, null));
        }
      }
    }
  }
  this.pruneCompletedTransactionsBelowNode_(this.transactionQueueTree_);
  for (var i = 0; i < callbacks.length; i++) {
    exceptionGuard(callbacks[i]);
  }
  this.sendReadyTransactions_();
};
Repo.prototype.getAncestorTransactionNode_ = function(path) {
  var front;
  var transactionNode = this.transactionQueueTree_;
  front = path.getFront();
  while (front !== null && transactionNode.getValue() === null) {
    transactionNode = transactionNode.subTree(front);
    path = path.popFront();
    front = path.getFront();
  }
  return transactionNode;
};
Repo.prototype.buildTransactionQueue_ = function(transactionNode) {
  var transactionQueue = [];
  this.aggregateTransactionQueuesForNode_(transactionNode, transactionQueue);
  transactionQueue.sort(function(a, b) {
    return a.order - b.order;
  });
  return transactionQueue;
};
Repo.prototype.aggregateTransactionQueuesForNode_ = function(node, queue) {
  var _this = this;
  var nodeQueue = node.getValue();
  if (nodeQueue !== null) {
    for (var i = 0; i < nodeQueue.length; i++) {
      queue.push(nodeQueue[i]);
    }
  }
  node.forEachChild(function(child) {
    _this.aggregateTransactionQueuesForNode_(child, queue);
  });
};
Repo.prototype.pruneCompletedTransactionsBelowNode_ = function(node) {
  var _this = this;
  var queue = node.getValue();
  if (queue) {
    var to = 0;
    for (var from = 0; from < queue.length; from++) {
      if (queue[from].status !== TransactionStatus.COMPLETED) {
        queue[to] = queue[from];
        to++;
      }
    }
    queue.length = to;
    node.setValue(queue.length > 0 ? queue : null);
  }
  node.forEachChild(function(childNode) {
    _this.pruneCompletedTransactionsBelowNode_(childNode);
  });
};
Repo.prototype.abortTransactions_ = function(path) {
  var _this = this;
  var affectedPath = this.getAncestorTransactionNode_(path).path();
  var transactionNode = this.transactionQueueTree_.subTree(path);
  transactionNode.forEachAncestor(function(node) {
    _this.abortTransactionsOnNode_(node);
  });
  this.abortTransactionsOnNode_(transactionNode);
  transactionNode.forEachDescendant(function(node) {
    _this.abortTransactionsOnNode_(node);
  });
  return affectedPath;
};
Repo.prototype.abortTransactionsOnNode_ = function(node) {
  var queue = node.getValue();
  if (queue !== null) {
    var callbacks = [];
    var events = [];
    var lastSent = -1;
    for (var i = 0; i < queue.length; i++) {
      if (queue[i].status === TransactionStatus.SENT_NEEDS_ABORT)
        ;
      else if (queue[i].status === TransactionStatus.SENT) {
        assert(lastSent === i - 1, "All SENT items should be at beginning of queue.");
        lastSent = i;
        queue[i].status = TransactionStatus.SENT_NEEDS_ABORT;
        queue[i].abortReason = "set";
      } else {
        assert(queue[i].status === TransactionStatus.RUN, "Unexpected transaction status in abort");
        queue[i].unwatcher();
        events = events.concat(this.serverSyncTree_.ackUserWrite(queue[i].currentWriteId, true));
        if (queue[i].onComplete) {
          var snapshot = null;
          callbacks.push(queue[i].onComplete.bind(null, new Error("set"), false, snapshot));
        }
      }
    }
    if (lastSent === -1) {
      node.setValue(null);
    } else {
      queue.length = lastSent + 1;
    }
    this.eventQueue_.raiseEventsForChangedPath(node.path(), events);
    for (var i = 0; i < callbacks.length; i++) {
      exceptionGuard(callbacks[i]);
    }
  }
};
var FirebaseAuthTokenProvider = (
  /** @class */
  function() {
    function FirebaseAuthTokenProvider2(app_, authProvider_) {
      var _this = this;
      this.app_ = app_;
      this.authProvider_ = authProvider_;
      this.auth_ = null;
      this.auth_ = authProvider_.getImmediate({ optional: true });
      if (!this.auth_) {
        authProvider_.get().then(function(auth) {
          return _this.auth_ = auth;
        });
      }
    }
    FirebaseAuthTokenProvider2.prototype.getToken = function(forceRefresh) {
      if (!this.auth_) {
        return Promise.resolve(null);
      }
      return this.auth_.getToken(forceRefresh).catch(function(error2) {
        if (error2 && error2.code === "auth/token-not-initialized") {
          log("Got auth/token-not-initialized error.  Treating as null token.");
          return null;
        } else {
          return Promise.reject(error2);
        }
      });
    };
    FirebaseAuthTokenProvider2.prototype.addTokenChangeListener = function(listener) {
      if (this.auth_) {
        this.auth_.addAuthTokenListener(listener);
      } else {
        setTimeout(function() {
          return listener(null);
        }, 0);
        this.authProvider_.get().then(function(auth) {
          return auth.addAuthTokenListener(listener);
        });
      }
    };
    FirebaseAuthTokenProvider2.prototype.removeTokenChangeListener = function(listener) {
      this.authProvider_.get().then(function(auth) {
        return auth.removeAuthTokenListener(listener);
      });
    };
    FirebaseAuthTokenProvider2.prototype.notifyForInvalidToken = function() {
      var errorMessage = 'Provided authentication credentials for the app named "' + this.app_.name + '" are invalid. This usually indicates your app was not initialized correctly. ';
      if ("credential" in this.app_.options) {
        errorMessage += 'Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.';
      } else if ("serviceAccount" in this.app_.options) {
        errorMessage += 'Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.';
      } else {
        errorMessage += 'Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.';
      }
      warn(errorMessage);
    };
    return FirebaseAuthTokenProvider2;
  }()
);
var EmulatorAdminTokenProvider = (
  /** @class */
  function() {
    function EmulatorAdminTokenProvider2() {
    }
    EmulatorAdminTokenProvider2.prototype.getToken = function(forceRefresh) {
      return Promise.resolve({
        accessToken: EmulatorAdminTokenProvider2.EMULATOR_AUTH_TOKEN
      });
    };
    EmulatorAdminTokenProvider2.prototype.addTokenChangeListener = function(listener) {
      listener(EmulatorAdminTokenProvider2.EMULATOR_AUTH_TOKEN);
    };
    EmulatorAdminTokenProvider2.prototype.removeTokenChangeListener = function(listener) {
    };
    EmulatorAdminTokenProvider2.prototype.notifyForInvalidToken = function() {
    };
    EmulatorAdminTokenProvider2.EMULATOR_AUTH_TOKEN = "owner";
    return EmulatorAdminTokenProvider2;
  }()
);
var FIREBASE_DATABASE_EMULATOR_HOST_VAR = "FIREBASE_DATABASE_EMULATOR_HOST";
var _staticInstance;
var RepoManager = (
  /** @class */
  function() {
    function RepoManager2() {
      this.repos_ = {};
      this.useRestClient_ = false;
    }
    RepoManager2.getInstance = function() {
      if (!_staticInstance) {
        _staticInstance = new RepoManager2();
      }
      return _staticInstance;
    };
    RepoManager2.prototype.interrupt = function() {
      var e_1, _a, e_2, _b;
      try {
        for (var _c = __values(Object.keys(this.repos_)), _d = _c.next(); !_d.done; _d = _c.next()) {
          var appName = _d.value;
          try {
            for (var _e = (e_2 = void 0, __values(Object.keys(this.repos_[appName]))), _f = _e.next(); !_f.done; _f = _e.next()) {
              var dbUrl = _f.value;
              this.repos_[appName][dbUrl].interrupt();
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (_f && !_f.done && (_b = _e.return))
                _b.call(_e);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (_d && !_d.done && (_a = _c.return))
            _a.call(_c);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
    };
    RepoManager2.prototype.resume = function() {
      var e_3, _a, e_4, _b;
      try {
        for (var _c = __values(Object.keys(this.repos_)), _d = _c.next(); !_d.done; _d = _c.next()) {
          var appName = _d.value;
          try {
            for (var _e = (e_4 = void 0, __values(Object.keys(this.repos_[appName]))), _f = _e.next(); !_f.done; _f = _e.next()) {
              var dbUrl = _f.value;
              this.repos_[appName][dbUrl].resume();
            }
          } catch (e_4_1) {
            e_4 = { error: e_4_1 };
          } finally {
            try {
              if (_f && !_f.done && (_b = _e.return))
                _b.call(_e);
            } finally {
              if (e_4)
                throw e_4.error;
            }
          }
        }
      } catch (e_3_1) {
        e_3 = { error: e_3_1 };
      } finally {
        try {
          if (_d && !_d.done && (_a = _c.return))
            _a.call(_c);
        } finally {
          if (e_3)
            throw e_3.error;
        }
      }
    };
    RepoManager2.prototype.databaseFromApp = function(app, authProvider, url, nodeAdmin) {
      var dbUrl = url || app.options.databaseURL;
      if (dbUrl === void 0) {
        if (!app.options.projectId) {
          fatal("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp().");
        }
        log("Using default host for project ", app.options.projectId);
        dbUrl = app.options.projectId + "-default-rtdb.firebaseio.com";
      }
      var parsedUrl = parseRepoInfo(dbUrl, nodeAdmin);
      var repoInfo = parsedUrl.repoInfo;
      var isEmulator;
      var dbEmulatorHost = void 0;
      if (typeof process !== "undefined") {
        dbEmulatorHost = process.env[FIREBASE_DATABASE_EMULATOR_HOST_VAR];
      }
      if (dbEmulatorHost) {
        isEmulator = true;
        dbUrl = "http://" + dbEmulatorHost + "?ns=" + repoInfo.namespace;
        parsedUrl = parseRepoInfo(dbUrl, nodeAdmin);
        repoInfo = parsedUrl.repoInfo;
      } else {
        isEmulator = !parsedUrl.repoInfo.secure;
      }
      var authTokenProvider = nodeAdmin && isEmulator ? new EmulatorAdminTokenProvider() : new FirebaseAuthTokenProvider(app, authProvider);
      validateUrl("Invalid Firebase Database URL", 1, parsedUrl);
      if (!parsedUrl.path.isEmpty()) {
        fatal("Database URL must point to the root of a Firebase Database (not including a child path).");
      }
      var repo = this.createRepo(repoInfo, app, authTokenProvider);
      return repo.database;
    };
    RepoManager2.prototype.deleteRepo = function(repo) {
      var appRepos = safeGet(this.repos_, repo.app.name);
      if (!appRepos || safeGet(appRepos, repo.repoInfo_.toURLString()) !== repo) {
        fatal("Database " + repo.app.name + "(" + repo.repoInfo_ + ") has already been deleted.");
      }
      repo.interrupt();
      delete appRepos[repo.repoInfo_.toURLString()];
    };
    RepoManager2.prototype.createRepo = function(repoInfo, app, authTokenProvider) {
      var appRepos = safeGet(this.repos_, app.name);
      if (!appRepos) {
        appRepos = {};
        this.repos_[app.name] = appRepos;
      }
      var repo = safeGet(appRepos, repoInfo.toURLString());
      if (repo) {
        fatal("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.");
      }
      repo = new Repo(repoInfo, this.useRestClient_, app, authTokenProvider);
      appRepos[repoInfo.toURLString()] = repo;
      return repo;
    };
    RepoManager2.prototype.forceRestClient = function(forceRestClient2) {
      this.useRestClient_ = forceRestClient2;
    };
    return RepoManager2;
  }()
);
var Database = (
  /** @class */
  function() {
    function Database2(repo_) {
      this.repo_ = repo_;
      if (!(repo_ instanceof Repo)) {
        fatal("Don't call new Database() directly - please use firebase.database().");
      }
      this.root_ = new Reference(repo_, Path.Empty);
      this.INTERNAL = new DatabaseInternals(this);
    }
    Object.defineProperty(Database2.prototype, "app", {
      get: function() {
        return this.repo_.app;
      },
      enumerable: false,
      configurable: true
    });
    Database2.prototype.ref = function(path) {
      this.checkDeleted_("ref");
      validateArgCount("database.ref", 0, 1, arguments.length);
      if (path instanceof Reference) {
        return this.refFromURL(path.toString());
      }
      return path !== void 0 ? this.root_.child(path) : this.root_;
    };
    Database2.prototype.refFromURL = function(url) {
      var apiName = "database.refFromURL";
      this.checkDeleted_(apiName);
      validateArgCount(apiName, 1, 1, arguments.length);
      var parsedURL = parseRepoInfo(url, this.repo_.repoInfo_.nodeAdmin);
      validateUrl(apiName, 1, parsedURL);
      var repoInfo = parsedURL.repoInfo;
      if (repoInfo.host !== this.repo_.repoInfo_.host) {
        fatal(apiName + ": Host name does not match the current database: (found " + repoInfo.host + " but expected " + this.repo_.repoInfo_.host + ")");
      }
      return this.ref(parsedURL.path.toString());
    };
    Database2.prototype.checkDeleted_ = function(apiName) {
      if (this.repo_ === null) {
        fatal("Cannot call " + apiName + " on a deleted database.");
      }
    };
    Database2.prototype.goOffline = function() {
      validateArgCount("database.goOffline", 0, 0, arguments.length);
      this.checkDeleted_("goOffline");
      this.repo_.interrupt();
    };
    Database2.prototype.goOnline = function() {
      validateArgCount("database.goOnline", 0, 0, arguments.length);
      this.checkDeleted_("goOnline");
      this.repo_.resume();
    };
    Database2.ServerValue = {
      TIMESTAMP: {
        ".sv": "timestamp"
      },
      increment: function(delta) {
        return {
          ".sv": {
            "increment": delta
          }
        };
      }
    };
    return Database2;
  }()
);
var DatabaseInternals = (
  /** @class */
  function() {
    function DatabaseInternals2(database) {
      this.database = database;
    }
    DatabaseInternals2.prototype.delete = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          this.database.checkDeleted_("delete");
          RepoManager.getInstance().deleteRepo(this.database.repo_);
          this.database.repo_ = null;
          this.database.root_ = null;
          this.database.INTERNAL = null;
          this.database = null;
          return [
            2
            /*return*/
          ];
        });
      });
    };
    return DatabaseInternals2;
  }()
);
var forceLongPolling = function() {
  WebSocketConnection.forceDisallow();
  BrowserPollConnection.forceAllow();
};
var forceWebSockets = function() {
  BrowserPollConnection.forceDisallow();
};
var isWebSocketsAvailable = function() {
  return WebSocketConnection["isAvailable"]();
};
var setSecurityDebugCallback = function(ref, callback) {
  ref.repo.persistentConnection_.securityDebugCallback_ = callback;
};
var stats = function(ref, showDelta) {
  ref.repo.stats(showDelta);
};
var statsIncrementCounter = function(ref, metric) {
  ref.repo.statsIncrementCounter(metric);
};
var dataUpdateCount = function(ref) {
  return ref.repo.dataUpdateCount;
};
var interceptServerData = function(ref, callback) {
  return ref.repo.interceptServerData_(callback);
};
var INTERNAL = Object.freeze({
  __proto__: null,
  forceLongPolling,
  forceWebSockets,
  isWebSocketsAvailable,
  setSecurityDebugCallback,
  stats,
  statsIncrementCounter,
  dataUpdateCount,
  interceptServerData
});
var DataConnection = PersistentConnection;
PersistentConnection.prototype.simpleListen = function(pathString, onComplete) {
  this.sendRequest("q", { p: pathString }, onComplete);
};
PersistentConnection.prototype.echo = function(data, onEcho) {
  this.sendRequest("echo", { d: data }, onEcho);
};
var RealTimeConnection = Connection;
var hijackHash = function(newHash) {
  var oldPut = PersistentConnection.prototype.put;
  PersistentConnection.prototype.put = function(pathString, data, onComplete, hash) {
    if (hash !== void 0) {
      hash = newHash();
    }
    oldPut.call(this, pathString, data, onComplete, hash);
  };
  return function() {
    PersistentConnection.prototype.put = oldPut;
  };
};
var ConnectionTarget = RepoInfo;
var queryIdentifier = function(query) {
  return query.queryIdentifier();
};
var forceRestClient = function(forceRestClient2) {
  RepoManager.getInstance().forceRestClient(forceRestClient2);
};
var TEST_ACCESS = Object.freeze({
  __proto__: null,
  DataConnection,
  RealTimeConnection,
  hijackHash,
  ConnectionTarget,
  queryIdentifier,
  forceRestClient
});
var name = "@firebase/database";
var version = "0.6.13";
var ServerValue = Database.ServerValue;
function registerDatabase(instance) {
  setSDKVersion(instance.SDK_VERSION);
  var namespace = instance.INTERNAL.registerComponent(new Component(
    "database",
    function(container, url) {
      var app = container.getProvider("app").getImmediate();
      var authProvider = container.getProvider("auth-internal");
      return RepoManager.getInstance().databaseFromApp(app, authProvider, url);
    },
    "PUBLIC"
    /* PUBLIC */
  ).setServiceProps(
    // firebase.database namespace properties
    {
      Reference,
      Query,
      Database,
      DataSnapshot,
      enableLogging,
      INTERNAL,
      ServerValue,
      TEST_ACCESS
    }
  ).setMultipleInstances(true));
  instance.registerVersion(name, version);
  if (isNodeSdk()) {
    module.exports = namespace;
  }
}
registerDatabase(import_app.default);
/*! Bundled license information:

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/database/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=firebase_database.js.map
