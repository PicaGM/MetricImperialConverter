const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  suite ('Function convertHandler.getNum(input)', function() {
    test('Whole number input', function(done) {
      let input = '2L';
      assert.equal(convertHandler.getNum(input), 2);
      done();
    });

    test ('Decimal Input', function(done) {
      let input = '1.1L';
      assert.equal(convertHandler.getNum(input), 1.1);
      done();
    })

    test ('Fractional Input', function(done) {
      let input = '5/2L';
      assert.equal(convertHandler.getNum(input), 2.5);
      done();
    })

    test ('Fractional Input whit a decimal', function(done) {
      let input = '5.2/2L';
      assert.equal(convertHandler.getNum(input), 2.6);
      done();
    })

    test ('Double fraction error', function(done) {
      let input = '3/2/3L';
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    })

    test ('No numerical input', function(done) {
      let input = 'mi';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    })
  });

  suite ('Function convertHandler.getUnit(input)', function() {
    test ('correctly read each valid input unit', function(done) {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      let expect = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      input.forEach(function(element, idx) {
        assert.equal(convertHandler.getUnit(element), expect[idx]);
      })
      done();
    });

    test ('correctly return an error for an invalid input unit', function(done){
      let input = '1a';
      assert.equal(convertHandler.getUnit(input), undefined);
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit(input)', function() {
    test ('correctly read each valid input unit', function(done) {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach(function(element, idx) {
        assert.equal(convertHandler.getReturnUnit(element), expect[idx]);
      })
      done();
    });
  });

  suite('Function convertHandler.spellOutUnit(input)', function() {
    test ('correctly read each valid input unit', function(done) {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach(function(element, idx) {
        assert.equal(convertHandler.spellOutUnit(element), expect[idx]);
      })
      done();
    });
  });

  suite('Function convertHandler.convert(num, unit)', function() {
    test('gal to L', function(done){
      let input = [1, 'gal'];
      let expect = 3.7854;
      assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1);
      done();
    })

    test('l to gal', function(done){
      let input = [1, 'l'];
      let expect = 0.2641;
      assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1);
      done();
    })

    test('mi to km', function(done){
      let input = [1, 'mi'];
      let expect = 1.6093;
      assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1);
      done();
    })

    test('km to mi', function(done){
      let input = [1, 'km'];
      let expect = 0.6213;
      assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1);
      done();
    })

    test('lbs to kg', function(done){
      let input = [1, 'lbs'];
      let expect = 0.4535;
      assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1);
      done();
    })

    test('kg to lbs', function(done){
      let input = [1, 'kg'];
      let expect = 2.2046;
      assert.approximately(convertHandler.convert(input[0], input[1]), expect, 0.1);
      done();
    })
  });
});