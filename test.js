let assert = require('assert');

let isArrayIndex = require('./index.js');

let keys = [
  0, '0',
  00, '00',
  1, '1',
  01, '01',
  1e3, '1e3',
  0x12, '0x12',
  1.0, '1.0',
  0.5, '0.5',
  -1, '-1',
  +1, '+1',
  // Math.pow(2, 32) - 2, // will not pass due to memory constraints in testing
  Math.pow(2, 32) - 1,
  Math.PI * 2, String(Math.PI * 2), // Tau obviously
  Number.MAX_SAFE_INTEGER, String(Number.MAX_SAFE_INTEGER),
  Infinity,
  -Infinity,
  '"0"', "'0'",
  '"1"', "'1'",
  '',
  'string',
  'string01',
  '""', "''",
  undefined,
  null,
  NaN,
  {},
  [],
  /\d/,
  () => {},
  Symbol(),
  ...Object.getOwnPropertyNames(Array),
  ...Object.getOwnPropertyNames(Array.prototype),
];

let array = Array(1e5).fill(true);

let isWithinTestArrayBounds = function (key) {
  return isNaN(String(key)) || key < array.length || key > Math.pow(2, 32) - 2;
};

describe('isArrayIndex', function () {
  describe('matches Array behavior for', function () {
    keys.forEach(function (key) {
      it(`${ (typeof key).toUpperCase() } ${ String(key) }`, function () {
        // ensure that test array is large enough for given key
        assert(isWithinTestArrayBounds(key), `key too large for test Array (length ${ array.length })`);

        assert.equal(isArrayIndex(key), array[key] === true);
      });
    });
  });
});
