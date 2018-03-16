const helmet = require('helmet');

const dev = process.env.REACT_APP_ENV === 'development';
const googleAnalyticsEnabled = !!process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
const sentryClientEnabled = !!process.env.REACT_APP_PUBLIC_SENTRY_DSN;

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
  const self = "'self'";
  const unsafeInline = "'unsafe-inline'";
  const unsafeEval = "'unsafe-eval'";
  const data = 'data:';
  const sharetribeApi = process.env.REACT_APP_SHARETRIBE_SDK_BASE_URL;
  const sharetribeAssets = 'assets-sharetribecom.sharetribe.com';
  const imgix = '*.imgix.net';
  // Safari 9.1 didn't recognize asterisk rule.
  const sharetribeImgix = 'sharetribe.imgix.net';
  const loremPixel = 'lorempixel.com';
  const placeholder = 'via.placeholder.com';
  const google = 'www.google.com';
  const googleAnalytics = 'www.google-analytics.com';
  const googleAnalyticsDoubleClick = 'stats.g.doubleclick.net';
  const googleMaps = 'maps.googleapis.com';
  const googleStaticFonts = 'fonts.gstatic.com';
  const googleStatic = '*.gstatic.com';
  const googleFonts = 'fonts.googleapis.com';
  const stripeJs = 'js.stripe.com';
  const stripeQ = 'q.stripe.com';
  const stripeApi = 'api.stripe.com';
  const sentryApi = 'sentry.io';

  const scriptSrc = [self, unsafeInline, unsafeEval, data, googleMaps, stripeJs];

  const styleSrc = [self, unsafeInline, googleFonts];

  const imgSrc = [
    self,
    data,
    imgix,
    sharetribeImgix,
    loremPixel,
    placeholder,
    stripeQ,
    googleMaps,
    googleStatic,
  ];

  const connectSrc = [self, sharetribeApi, googleMaps, stripeApi];

  const fontSrc = [self, data, sharetribeAssets, googleStaticFonts];

  const frameSrc = [self, stripeJs];

  if (googleAnalyticsEnabled) {
    // Only whitelist Google Analytics URLs when the analytics is
    // enabled.
    scriptSrc.push(googleAnalytics);
    imgSrc.push(google);
    imgSrc.push(googleAnalytics);
    imgSrc.push(googleAnalyticsDoubleClick);
    connectSrc.push(googleAnalytics);
    connectSrc.push(googleAnalyticsDoubleClick);
  }
  if (sentryClientEnabled) {
    connectSrc.push(sentryApi);
  }
  if (dev) {
    // The default Core docker-compose setup server images from this
    // URL locally.
    imgSrc.push('*.localhost:8000');
  }

  const directives = {
    scriptSrc,
    styleSrc,
    imgSrc,
    connectSrc,
    fontSrc,
    frameSrc,
    formAction: [self],
    defaultSrc: [self],
    baseUri: [self],
    reportUri,
  };

  if (enforceSsl) {
    directives.blockAllMixedContent = true;
  }

  return helmet.contentSecurityPolicy({
    directives,
    reportOnly,
  });
};
