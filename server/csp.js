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
    '*.amazonaws.com',
    'twemoji.maxcdn.com',
    'perf.hsforms.com',
    'www.gstatic.com',
    '*.facebook.net',
    'forms.hsforms.com',
    'www.google.com',
    'wss://socket.tidio.co',
    'js.hsforms.net',
    'apis.google.com',
    'maps.googleapis.com',
    '*.tiles.mapbox.com',
    'api.mapbox.com',
    'events.mapbox.com',
    'staging.hotpatch.com',
    'https://*.hotjar.com', 
    'https://*.hotjar.io', 
    'wss://*.hotjar.com',

    // Google Analytics
    'www.google-analytics.com',
    'stats.g.doubleclick.net',

    'sentry.io',
    '*.stripe.com',
    '*.googletagmanager.com',
    'googletagmanager.com',
    '*.facebook.com',
    'facebook.com',
    '*.tidio.co',
    'tidio.co',
    '*.tidiochat.com',
    'tidiochat.com',
    'widget-v4.tidiochat.com',
    'www.voucherify.io',
    'wwww.voucherify.io',
    'api.voucherify.io',
    'www.google.com.ua',
  ],
  fontSrc: [
    self,
    data,
    '*.amazonaws.com',
    'twemoji.maxcdn.com',
    'perf.hsforms.com',
    'www.gstatic.com',
    '*.facebook.net',
    'forms.hsforms.com',
    'www.google.com',
    'wss://socket.tidio.co',
    'js.hsforms.net',
    'apis.google.com',
    '*.google-analytics.com',
    'assets-sharetribecom.sharetribe.com',
    'fonts.gstatic.com',
    '*.googletagmanager.com',
    'googletagmanager.com',
    '*.facebook.com',
    'facebook.com',
    '*.tidio.co',
    'tidio.co',
    '*.tidiochat.com',
    'widget-v4.tidiochat.com',
    'tidiochat.com',
    'www.voucherify.io',
    'www.google.com.ua',
    'staging.hotpatch.com',
    'https://*.hotjar.com',
  ],
  frameSrc: [
    self,
    '*.amazonaws.com',
    'twemoji.maxcdn.com',
    'perf.hsforms.com',
    'www.gstatic.com',
    '*.facebook.net',
    'forms.hsforms.com',
    'www.google.com',
    'socket.tidio.co',
    'js.hsforms.net',
    'apis.google.com',
    '*.stripe.com',
    '*.youtube-nocookie.com',
    '*.googletagmanager.com',
    'googletagmanager.com',
    '*.facebook.com',
    'facebook.com',
    '*.tidio.co',
    'tidio.co',
    '*.tidiochat.com',
    'widget-v4.tidiochat.com',
    'tidiochat.com',
    'www.voucherify.io',
    'www.google.com.ua',
    'https://*.hotjar.com',
  ],
  imgSrc: [
    self,
    data,
    blob,
    ...devImagesMaybe,
    '*.amazonaws.com',
    'twemoji.maxcdn.com',
    'perf.hsforms.com',
    'www.gstatic.com',
    '*.facebook.net',
    'forms.hsforms.com',
    'wss://socket.tidio.co',
    'js.hsforms.net',
    'apis.google.com',
    '*.google-analytics.com',
    '*.imgix.net',
    'https://*.hotjar.com',
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

    // Youtube (static image)
    '*.ytimg.com',

    '*.googletagmanager.com',
    'googletagmanager.com',
    '*.facebook.com',
    'facebook.com',
    '*.tidio.co',
    'tidio.co',
    '*.tidiochat.com',
    'widget-v4.tidiochat.com',
    'tidiochat.com',
    'www.google.co.uk',
    'www.google.com.ua',
    'www.voucherify.io',
    'https://platform-cdn.sharethis.com'
  ],
  scriptSrc: [
    self,
    unsafeInline,
    unsafeEval,
    data,
    '*.amazonaws.com',
    'perf.hsforms.com',
    '*.stripe.com',
    'www.gstatic.com',
    '*.facebook.net',
    'forms.hsforms.com',
    'www.google.com',
    'socket.tidio.co',
    'js.hsforms.net',
    'apis.google.com',
    'maps.googleapis.com',
    'api.mapbox.com',
    '*.google-analytics.com',
    'js.stripe.com',
    '*.googletagmanager.com',
    'googletagmanager.com',
    '*.facebook.com',
    'facebook.com',
    '*.tidio.co',
    'tidio.co',
    '*.tidiochat.com',
    'widget-v4.tidiochat.com',
    'tidiochat.com',
    'www.voucherify.io',
    'www.google.com.ua',
    'https://platform-api.sharethis.com',
    '*.platform-api.sharethis.com',
    'https://l.sharethis.com/',
    '*.l.sharethis.com/',
    'https://*.hotjar.com',
    'https://platform-cdn.sharethis.com'
  ],
  styleSrc: [
    self,
    unsafeInline,
    '*.amazonaws.com',
    'twemoji.maxcdn.com',
    'perf.hsforms.com',
    '*.stripe.com',
    'www.gstatic.com',
    '*.facebook.net',
    'forms.hsforms.com',
    'wss://socket.tidio.co',
    'js.hsforms.net',
    'apis.google.com',
    '*.google-analytics.com',
    'fonts.googleapis.com',
    'api.mapbox.com',
    '*.googletagmanager.com',
    'googletagmanager.com',
    '*.facebook.com',
    'facebook.com',
    '*.tidio.co',
    'tidio.co',
    '*.tidiochat.com',
    'widget-v4.tidiochat.com',
    'tidiochat.com',
    'www.voucherify.io',
    'www.google.com.ua',
    'staging.hotpatch.com',
    'https://*.hotjar.com',
    'https://platform-cdn.sharethis.com'
    
  ],
  mediaSrc: [
    'widget-v4.tidiochat.com',
    'https://platform-cdn.sharethis.com'
  ],
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
