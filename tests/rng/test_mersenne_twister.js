require('babel-polyfill');
let chai = require('chai'),
    path = require('path');


let assert = chai.assert;


let {MersenneTwister} = require(path.join(__dirname, './../../es6', 'rng', 'mersenne_twister'));


describe('MersenneTwister', () => {
    let assertAlmostEqual = (actual, expected, epsilon=Number.EPSILON) => {
        assert.ok(Math.abs(actual) + epsilon >= Math.abs(expected));
    };

    describe('random', () => {
        it('can be seeded', () => {
            let mt = new MersenneTwister(12345);
            assertAlmostEqual(mt.random(), -0.9296160866506398);
        });
    });
});
