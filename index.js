const MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;

module.exports = function (key) {
  return typeof key === 'string' ?
    key === parseInt(key).toString() && key >= 0 && key <= MAX_ARRAY_LENGTH
  :
  typeof key === 'number' ?
    key === Math.floor(key) && key >= 0 && key <= MAX_ARRAY_LENGTH
  :
  false;
};
