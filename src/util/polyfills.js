//
// Use common polyfill dependencies from package.json
//

// Smoothscroll
require('smoothscroll-polyfill').polyfill();

// [].includes
require('array-includes').shim();

// [].find
require('array.prototype.find').shim();

// Object.entries
require('object.entries').shim();

// Object.values
require('object.values').shim();

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat
if (typeof Number.parseFloat === 'undefined' && typeof window !== 'undefined') {
  Number.parseFloat = window.parseFloat;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt
if (typeof Number.parseInt === 'undefined' && typeof window !== 'undefined') {
  Number.parseInt = window.parseInt;
}

// NaN is the only value in javascript which is not equal to itself.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
if (typeof Number.isNaN === 'undefined') {
  // eslint-disable-next-line no-self-compare
  Number.isNaN = value => value !== value;
}
