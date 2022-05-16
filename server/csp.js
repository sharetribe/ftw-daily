const helmet = require('helmet');

const dev = process.env.REACT_APP_ENV === 'development';
const self = "'self'";
const unsafeInline = "'unsafe-inline'";
const unsafeEval = "'unsafe-eval'";
const data = 'data:';
const blob = 'blob:';
const devImagesMaybe = dev ? ['*.localhost:8000'] : [];
const baseUrl = process.env.REACT_APP_SHARETRIBE_SDK_BASE_URL || 'https://flex-api.sharetribe.com';
// Asset Delivery API is using a different domain than other Flex APIs
// cdn.st-api.com
// If assetCdnBaseUrl is used to initialize SDK (for proxy purposes), then that URL needs to be in CSP
const assetCdnBaseUrl = process.env.REACT_APP_SHARETRIBE_SDK_ASSET_CDN_BASE_URL;

// Default CSP whitelist.
//
// NOTE: Do not change these in the customizations, make custom
// additions within the exported function in the bottom of this file.
const defaultDirectives = {
  baseUri: [self],
  defaultSrc: [self],
  childSrc: [blob],
  connectSrc: [
    self,
    baseUrl,
    assetCdnBaseUrl,
    '*.st-api.com',
    'maps.googleapis.com',
    '*.tiles.mapbox.com',
    'api.mapbox.com',
    'events.mapbox.com',

    // Google Analytics
    'www.google-analytics.com',
    'stats.g.doubleclick.net',

    'sentry.io',
    '*.stripe.com',
  ],
  fontSrc: [self, data, 'assets-sharetribecom.sharetribe.com', 'fonts.gstatic.com'],
  frameSrc: [self, '*.stripe.com'],
  imgSrc: [
    self,
    data,
    blob,
    ...devImagesMaybe,
    '*.imgix.net',
    'sharetribe.imgix.net', // Safari 9.1 didn't recognize asterisk rule.

    // Styleguide placeholder images
    'lorempixel.com',
    'via.placeholder.com',

    'api.mapbox.com',
    'maps.googleapis.com',
    '*.gstatic.com',
    '*.googleapis.com',
    '*.ggpht.com',

    // Google Analytics
    'www.google.com',
    'www.google-analytics.com',
    'stats.g.doubleclick.net',

    '*.stripe.com',
  ],
  scriptSrc: [
    self,
    unsafeInline,
    unsafeEval,
    data,
    'maps.googleapis.com',
    'api.mapbox.com',
    '*.google-analytics.com',
    'js.stripe.com',
  ],
  styleSrc: [self, unsafeInline, 'fonts.googleapis.com', 'api.mapbox.com'],
};

/**
 * Middleware for creating a Content Security Policy
 *
 * @param {String} reportUri URL where the browser will POST the
 * policy violation reports
 *
 * @param {Boolean} enforceSsl When SSL is enforced, all mixed content
 * is blocked/reported by the policy
 *
 * @param {Boolean} reportOnly In the report mode, requests are only
 * reported to the report URL instead of blocked
 */
module.exports = (reportUri, enforceSsl, reportOnly) => {
  // ================ START CUSTOM CSP URLs ================ //

  // Add custom CSP whitelisted URLs here. See commented example
  // below. For format specs and examples, see:
  // https://content-security-policy.com/

  // Example: extend default img directive with custom domain
  // const { imgSrc = [self] } = defaultDirectives;
  // const exampleImgSrc = imgSrc.concat('my-custom-domain.example.com');

  const customDirectives = {
    // Example: Add custom directive override
    // imgSrc: exampleImgSrc,
  };

  // ================ END CUSTOM CSP URLs ================ //

  // Helmet v4 expects every value to be iterable so strings or booleans are not supported directly
  // If we want to add block-all-mixed-content directive we need to add empty array to directives
  // See Helmet's default directives:
  // https://github.com/helmetjs/helmet/blob/bdb09348c17c78698b0c94f0f6cc6b3968cd43f9/middlewares/content-security-policy/index.ts#L51

  const directives = Object.assign({ reportUri: [reportUri] }, defaultDirectives, customDirectives);
  if (enforceSsl) {
    directives.blockAllMixedContent = [];
  }

  // See: https://helmetjs.github.io/docs/csp/
  return helmet.contentSecurityPolicy({
    directives,
    reportOnly,
  });
};
