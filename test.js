let assert = require('assert');

let isArrayIndex = require('./index.js');

const MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;
const MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1;

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
  MAX_ARRAY_LENGTH,
  // MAX_ARRAY_INDEX, // will not pass due to memory constraints in testing
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
  return isNaN(String(key)) || key < array.length || key > MAX_ARRAY_INDEX;
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

  describe('when unrestrict is true', function () {
    it('returns true for otherwise valid values which exceed the maximum array index', function () {
      assert(isArrayIndex(MAX_ARRAY_LENGTH, true));
      assert(isArrayIndex(Number.MAX_SAFE_INTEGER, true));
    });
  });
});
