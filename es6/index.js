require('babel-polyfill');

import {LinearCongruence} from './rng/linear_congruence.js';

import {MersenneTwister} from './rng/mersenne_twister.js';

let VERSION = '0.1.0';

let rng = {
    VERSION: VERSION,
    LinearCongruence: LinearCongruence,
    MersenneTwister: MersenneTwister,
    create: (seed=null, ctor=MersenneTwister) => { return new ctor(seed); }
}

export { rng };
