
import {LinearCongruence} from './rng/linear_congruence.js';

import {MersenneTwister} from './rng/mersenne_twister.js';

const VERSION = '0.2.1';

const rng = {
    VERSION: VERSION,
    LinearCongruence: LinearCongruence,
    MersenneTwister: MersenneTwister,
    create: (seed=null, ctor=MersenneTwister) => { return new ctor(seed); }
}

export { rng };
