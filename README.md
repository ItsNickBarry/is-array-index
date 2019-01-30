# isArrayIndex

Utility for determining whether an input is a valid Array index.

## Usage

Install the library:

```
npm install --save is-array-index
```

The module contains a single function, which takes a single argument:

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
