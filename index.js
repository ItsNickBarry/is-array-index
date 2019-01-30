const MAX_ARRAY_INDEX = Math.pow(2, 32) - 2;

module.exports = function (key, unrestrict) {
  let max = unrestrict ? Number.MAX_SAFE_INTEGER : MAX_ARRAY_INDEX;

  return typeof key === 'string' ?
    key === parseInt(key).toString() && key >= 0 && key <= max
  :
  typeof key === 'number' ?
    key === Math.floor(key) && key >= 0 && key <= max
  :
  false;
};
