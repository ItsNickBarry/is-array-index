# isArrayIndex

Utility for determining whether an input is a valid Array index.

## Usage

Install the library:

```
npm install --save is-array-index
```

The module contains a single function, which takes a possible Array index as an argument and returns whether it is valid:

```javascript
let isArrayIndex = require('is-array-index');

isArrayIndex(0);
// => true

isArrayIndex('1');
// => true

isArrayIndex('1.0');
// => false

isArrayIndex(0.5);
// => false
```

In some cases, it may make sense to allow for Array indices which exceed the maximum length of an array, but still satisfy the semantic requirements.  This may be achieved by passing a second argument, a `boolean` indicating whether to unrestrict the theoretical length of an array.  See the [Phonewords](https://github.com/itsnickbarry/phonewords) library for an example.

```javascript
const MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;

isArrayIndex(MAX_ARRAY_LENGTH);
// => false

isArrayIndex(MAX_ARRAY_LENGTH, true);
// => true

isArrayIndex(Number.MAX_SAFE_INTEGER, true);
// => true
```

### Proxy Example

A `Proxy` wrapped around an `Array` might need to distinguish between array indexing and the accessing of additional properties.

```javascript
let proxy = new Proxy([], {
  get: function (target, property) {
    if (isArrayIndex(property)) {
      // execute additional processing
      return true;
    } else {
      return target[property];
    }
  },
});
```
