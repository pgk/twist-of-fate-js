/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.rng = undefined;

	var _linear_congruence = __webpack_require__(1);

	var _mersenne_twister = __webpack_require__(2);

	var VERSION = '0.2.1';

	var rng = {
	    VERSION: VERSION,
	    LinearCongruence: _linear_congruence.LinearCongruence,
	    MersenneTwister: _mersenne_twister.MersenneTwister,
	    create: function create() {
	        var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	        var ctor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _mersenne_twister.MersenneTwister;
	        return new ctor(seed);
	    }
	};

	exports.rng = rng;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ValueError = function ValueError(message) {
	    _classCallCheck(this, ValueError);

	    this.message = message;
	};

	var __invalid__ = function __invalid__(message) {
	    throw new ValueError('Invalid value: ' + message);
	};

	var LinearCongruence = function () {
	    function LinearCongruence() {
	        var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	        var modulus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.pow(2, 32);
	        var multiplier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1664525;
	        var increment = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1013904223;

	        _classCallCheck(this, LinearCongruence);

	        if (seed == null) {
	            seed = Date.now(); // there should be a better way
	        }

	        if (0 >= modulus) {
	            __invalid__('modulus');
	        }

	        if (multiplier <= 0 || multiplier > modulus) {
	            __invalid__('multiplier');
	        }

	        if (increment <= 0 || increment > modulus) {
	            __invalid__('increment');
	        }

	        this.n = Math.floor(seed);
	        this.modulus = Math.floor(modulus);
	        this.multiplier = Math.floor(multiplier);
	        this.increment = Math.floor(increment);
	    }

	    _createClass(LinearCongruence, [{
	        key: 'random',
	        value: function random() {
	            var current = this.n;
	            this.n = (this.multiplier * this.n + this.increment) % this.modulus;
	            return current;
	        }
	    }, {
	        key: 'generator',
	        value: /*#__PURE__*/regeneratorRuntime.mark(function generator() {
	            return regeneratorRuntime.wrap(function generator$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            _context.next = 2;
	                            return this.random();

	                        case 2:
	                            _context.next = 0;
	                            break;

	                        case 4:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, generator, this);
	        })
	    }]);

	    return LinearCongruence;
	}();

	exports.LinearCongruence = LinearCongruence;
	exports.ValueError = ValueError;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	   A C-program for MT19937, with initialization improved 2002/1/26.
	   Coded by Takuji Nishimura and Makoto Matsumoto.

	   Before using, initialize the state by using init_genrand(seed)
	   or init_by_array(init_key, key_length).

	   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
	   All rights reserved.

	   Redistribution and use in source and binary forms, with or without
	   modification, are permitted provided that the following conditions
	   are met:

	     1. Redistributions of source code must retain the above copyright
	        notice, this list of conditions and the following disclaimer.

	     2. Redistributions in binary form must reproduce the above copyright
	        notice, this list of conditions and the following disclaimer in the
	        documentation and/or other materials provided with the distribution.

	     3. The names of its contributors may not be used to endorse or promote
	        products derived from this software without specific prior written
	        permission.

	   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
	   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
	   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
	   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
	   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


	   Any feedback is very welcome.
	   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
	   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
	*/

	var MersenneTwister = function () {
	  function MersenneTwister() {
	    var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

	    _classCallCheck(this, MersenneTwister);

	    if (seed == undefined) {
	      seed = new Date().getTime();
	    }
	    /* Period parameters */
	    this.N = 624;
	    this.M = 397;
	    this.MATRIX_A = 0x9908b0df; /* constant vector a */
	    this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
	    this.LOWER_MASK = 0x7fffffff; /* least significant r bits */

	    this.mt = new Array(this.N); /* the array for the state vector */
	    this.mti = this.N + 1; /* mti==N+1 means mt[N] is not initialized */

	    this.seed = seed;

	    this.init_genrand(seed);
	  }

	  /* initializes mt[N] with a seed */


	  _createClass(MersenneTwister, [{
	    key: "init_genrand",
	    value: function init_genrand(seed) {
	      this.mt[0] = seed >>> 0;
	      for (this.mti = 1; this.mti < this.N; this.mti++) {
	        var _seed = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
	        this.mt[this.mti] = (((_seed & 0xffff0000) >>> 16) * 1812433253 << 16) + (_seed & 0x0000ffff) * 1812433253 + this.mti;
	        /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
	        /* In the previous versions, MSBs of the seed affect   */
	        /* only MSBs of the array mt[].                        */
	        /* 2002/01/09 modified by Makoto Matsumoto             */
	        this.mt[this.mti] >>>= 0;
	        /* for >32 bit machines */
	      }
	    }

	    /* initialize by an array with array-length */
	    /* init_key is the array for initializing keys */
	    /* key_length is its length */
	    /* slight change for C++, 2004/2/26 */

	  }, {
	    key: "init_by_array",
	    value: function init_by_array(init_key, key_length) {
	      var i, j, k;
	      this.init_genrand(19650218);
	      i = 1;j = 0;
	      k = this.N > key_length ? this.N : key_length;
	      for (; k; k--) {
	        var s = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
	        this.mt[i] = (this.mt[i] ^ (((s & 0xffff0000) >>> 16) * 1664525 << 16) + (s & 0x0000ffff) * 1664525) + init_key[j] + j; /* non linear */
	        this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
	        i++;j++;
	        if (i >= this.N) {
	          this.mt[0] = this.mt[this.N - 1];i = 1;
	        }
	        if (j >= key_length) j = 0;
	      }
	      for (k = this.N - 1; k; k--) {
	        var s = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
	        this.mt[i] = (this.mt[i] ^ (((s & 0xffff0000) >>> 16) * 1566083941 << 16) + (s & 0x0000ffff) * 1566083941) - i; /* non linear */
	        this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
	        i++;
	        if (i >= this.N) {
	          this.mt[0] = this.mt[this.N - 1];i = 1;
	        }
	      }

	      this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
	    }

	    /* generates a random number on [0,0xffffffff]-interval */

	  }, {
	    key: "genrand_int32",
	    value: function genrand_int32() {
	      var y;
	      var mag01 = new Array(0x0, this.MATRIX_A);
	      /* mag01[x] = x * MATRIX_A  for x=0,1 */

	      if (this.mti >= this.N) {
	        /* generate N words at one time */
	        var kk;

	        if (this.mti == this.N + 1) /* if init_genrand() has not been called, */
	          this.init_genrand(5489); /* a default initial seed is used */

	        for (kk = 0; kk < this.N - this.M; kk++) {
	          y = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
	          this.mt[kk] = this.mt[kk + this.M] ^ y >>> 1 ^ mag01[y & 0x1];
	        }
	        for (; kk < this.N - 1; kk++) {
	          y = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
	          this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ y >>> 1 ^ mag01[y & 0x1];
	        }
	        y = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK;
	        this.mt[this.N - 1] = this.mt[this.M - 1] ^ y >>> 1 ^ mag01[y & 0x1];

	        this.mti = 0;
	      }

	      y = this.mt[this.mti++];

	      /* Tempering */
	      y ^= y >>> 11;
	      y ^= y << 7 & 0x9d2c5680;
	      y ^= y << 15 & 0xefc60000;
	      y ^= y >>> 18;

	      return y >>> 0;
	    }

	    /* generates a random number on [0,0x7fffffff]-interval */

	  }, {
	    key: "genrand_int31",
	    value: function genrand_int31() {
	      return this.genrand_int32() >>> 1;
	    }

	    /* generates a random number on [0,1]-real-interval */

	  }, {
	    key: "genrand_real1",
	    value: function genrand_real1() {
	      return this.genrand_int32() * (1.0 / 4294967295.0);
	      /* divided by 2^32-1 */
	    }

	    /* generates a random number on [0,1)-real-interval */

	  }, {
	    key: "random",
	    value: function random() {
	      return this.genrand_int32() * (1.0 / 4294967296.0);
	      /* divided by 2^32 */
	    }

	    /* generates a random number on (0,1)-real-interval */

	  }, {
	    key: "genrand_real3",
	    value: function genrand_real3() {
	      return (this.genrand_int32() + 0.5) * (1.0 / 4294967296.0);
	      /* divided by 2^32 */
	    }

	    /* generates a random number on [0,1) with 53-bit resolution*/

	  }, {
	    key: "genrand_res53",
	    value: function genrand_res53() {
	      var a = this.genrand_int32() >>> 5,
	          b = this.genrand_int32() >>> 6;
	      return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
	    }

	    /* These real versions are due to Isaku Wada, 2002/01/09 added */

	  }]);

	  return MersenneTwister;
	}();

	exports.MersenneTwister = MersenneTwister;

/***/ })
/******/ ]);