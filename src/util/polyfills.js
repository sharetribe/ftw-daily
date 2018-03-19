//
// Use common polyfill dependencies from package.json
//

// Smoothscroll
require('smoothscroll-polyfill').polyfill();

// [].includes
require('array-includes').shim();

// [].find
require('array.prototype.find').shim();
