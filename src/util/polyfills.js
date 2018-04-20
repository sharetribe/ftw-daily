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
