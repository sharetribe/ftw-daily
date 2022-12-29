//
// Use common polyfill dependencies from package.json
//

// Smoothscroll
// TODO: scroll-behaviour smooth was added to Safari on March 2022.
//       We could consider removing this on 2023.
require('smoothscroll-polyfill').polyfill();

// To support browsers that do not have Intl.PluralRules (e.g IE11 & Safari 12-),
// - add npm packaged to package.json: "intl-pluralrules": "^1.3.1",
// - include this polyfill in your build:
//
// if (!Intl.PluralRules) {
//   require('intl-pluralrules');
// }

// To support  browsers that do not have Intl.RelativeTimeFormat (e.g IE11, Edge, Safari 12-),
// - add npm packaged to package.json: "@formatjs/intl-relativetimeformat": "^9.3.2",
// - include this polyfill in your build along with individual CLDR data for each locale you support:
//
// if (!Intl.RelativeTimeFormat) {
//   require('@formatjs/intl-relativetimeformat/polyfill');
//   require('@formatjs/intl-relativetimeformat/locale-data/en');

//   // By default, this library comes with en data. To load additional locale, you need include them on demand.
//   // e.g.
//   // require('@formatjs/intl-relativetimeformat/dist/locale-data/fr');
// }
