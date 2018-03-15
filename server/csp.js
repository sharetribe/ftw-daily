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
  const inline = "'unsafe-inline'";
  const data = 'data:';
  const sharetribeApi = process.env.REACT_APP_SHARETRIBE_SDK_BASE_URL;
  const sharetribeAssets = 'https://assets-sharetribecom.sharetribe.com/';
  const imgix = '*.imgix.net/';
  const loremPixel = 'https://lorempixel.com/';
  const placeholder = 'https://via.placeholder.com/';
  const googleAnalytics = 'https://www.google-analytics.com/';
  const googleAnalyticsDoubleClick = 'https://stats.g.doubleclick.net/';
  const googleMaps = 'https://maps.googleapis.com/';
  const googleStaticFonts = 'https://fonts.gstatic.com/';
  const googleStatic = '*.gstatic.com';
  const googleFonts = 'https://fonts.googleapis.com/';
  const stripeJs = 'https://js.stripe.com/';
  const stripeQ = 'https://q.stripe.com/';
  const stripeApi = 'https://api.stripe.com/';
  const sentryApi = 'https://sentry.io/api/';

  const scriptSrc = [self, inline, data, googleMaps, stripeJs];

  const styleSrc = [self, inline, googleFonts];

  const imgSrc = [self, data, imgix, loremPixel, placeholder, stripeQ, googleMaps, googleStatic];

  const connectSrc = [self, sharetribeApi, googleMaps, stripeApi];

  const fontSrc = [self, data, sharetribeAssets, googleStaticFonts];

  const frameSrc = [self, stripeJs];

  if (googleAnalyticsEnabled) {
    // Only whitelist Google Analytics URLs when the analytics is
    // enabled.
    scriptSrc.push(googleAnalytics);
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
