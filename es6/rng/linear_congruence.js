

class ValueError {
    constructor(message) {
        this.message = message;
    }
}


var __invalid__ = function (message) {
    throw new ValueError('Invalid value: ' + message);
}


class LinearCongruence {

    constructor(seed = null, modulus = Math.pow(2, 32), multiplier = 1664525, increment = 1013904223) {
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

    random() {
        let current = this.n;
        this.n = (this.multiplier * this.n + this.increment) %
                 this.modulus;
        return current;
    }

    *generator() {
        for (;;) {
            yield this.random();
        }
    }
}


export { LinearCongruence, ValueError };
