const MAX_ARRAY_INDEX = Math.pow(2, 32) - 2;

module.exports = function (key) {
  return typeof key === 'string' ?
    key === parseInt(key).toString() && key >= 0 && key <= MAX_ARRAY_INDEX
  :
  typeof key === 'number' ?
    key === Math.floor(key) && key >= 0 && key <= MAX_ARRAY_INDEX
  :
  false;
};
