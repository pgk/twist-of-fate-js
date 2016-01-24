require('babel-polyfill');
let chai = require('chai'),
    path = require('path');

chai.should();


let {LinearCongruence, ValueError} = require(path.join(__dirname, './../../es6', 'rng', 'linear_congruence'));


describe('LinearCongruence', () => {
  describe('#constructor', () => {
    let rng;

    it('throws when modulus == 0', () => {
        let constructorWithModulusEqualToZero = () => {
            rng = new LinearCongruence(null, 0);
        };

        constructorWithModulusEqualToZero.should.throw(ValueError);
    });

    it('throws when modulus < 0', () => {
        let constructorWithModulusLessThanZero = () => {
            rng = new LinearCongruence(null, -1);
        };

        constructorWithModulusLessThanZero.should.throw(ValueError);
    });

    it('throws when multiplier == 0', () => {
        let constructorWithMultiplierEqualToZero = () => {
            rng = new LinearCongruence(null, 1, 0);
        };

        constructorWithMultiplierEqualToZero.should.throw(ValueError);
    });

    it('throws when multiplier < 0', () => {
        let constructorWithMultiplierLessThanZero = () => {
            rng = new LinearCongruence(null, 1, -1);
        };

        constructorWithMultiplierLessThanZero.should.throw(ValueError);
    });

    it('sets seed if provided', () => {
        rng = new LinearCongruence(12345);
        rng.n.should.equal(12345);
    });

    it('initializes seed if no seed provided', () => {
        rng = new LinearCongruence();
        rng.n.should.not.equal(null);
    });
  });

  describe('generator', () => {
      it('produces proper linear congruence values', () => {
          let rng = new LinearCongruence(5, 10, 2, 3);
          var gen = rng.generator();
          '5 3 9 1 5 3 9 1 5 3'.split(' ').map((n) => { return parseInt(n ,10); }).forEach((n) => {
              let val = gen.next().value;
              val.should.equal(n);
          });
      });
  });
});
