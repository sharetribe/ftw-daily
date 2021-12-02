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

// To support browsers that do not have Intl.PluralRules (e.g IE11 & Safari 12-), include this polyfill in your build.

if (!Intl.PluralRules) {
  require('intl-pluralrules');
}

// To support  browsers that do not have Intl.RelativeTimeFormat (e.g IE11, Edge, Safari 12-), include this polyfill in your build along with individual CLDR data for each locale you support.
if (!Intl.RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/locale-data/en');

  // By default, this library comes with en data. To load additional locale, you need include them on demand.
  // e.g.
  // require('@formatjs/intl-relativetimeformat/dist/locale-data/fr');
}
