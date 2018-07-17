import * as custom from './marketplace-custom-config.js';

const env = process.env.REACT_APP_ENV;
const dev = process.env.REACT_APP_ENV === 'development';

// If you want to change the language, remember to also change the
// locale data and the messages in the app.js file.
const locale = 'en';
const i18n = {
  /*
    0: Sunday
    1: Monday
    ...
    6: Saturday
  */
  firstDayOfWeek: 0,
};

// Should search results be ordered by distance to origin.
const sortSearchByDistance = false;

// API supports custom processes to be used in booking process.
// We need to specify it when we are initiating a new order
// (or fetching price information by calling 'initiateSpeculative' endpoint).
//
// In a way, 'processAlias' defines which transaction process (or processes)
// this particular web application is able to handle.
const bookingProcessAlias = 'preauth-with-nightly-booking/release-1';

// The transaction line item code for the main unit type in bookings.
//
// Possible values: ['line-item/night', 'line-item/day', 'line-item/units';]
//
// Note: if you change this, many of the generic translations will
// still show information about nights. Make sure to go through the
// translations when the unit is changed.
const bookingUnitType = 'line-item/night';

// A maximum number of days forwards during which a booking can be made.
// This is limited due to Stripe holding funds up to 90 days from the
// moment they are charged.
const dayCountAvailableForBooking = 90;

// To pass environment variables to the client app in the build
// script, react-scripts (and the sharetribe-scripts fork of
// react-scripts) require using the REACT_APP_ prefix to avoid
// exposing server secrets to the client side.
const sdkClientId = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID;
const sdkBaseUrl = process.env.REACT_APP_SHARETRIBE_SDK_BASE_URL;
const sdkTransitVerbose = process.env.REACT_APP_SHARETRIBE_SDK_TRANSIT_VERBOSE === 'true';

const currency = process.env.REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY;

// Listing minimum price in currency sub units, e.g. cents.
// 0 means no restriction to the price
const listingMinimumPriceSubUnits = 0;

// Sentry DSN (Data Source Name), a client key for authenticating calls to Sentry
const sentryDsn = process.env.REACT_APP_PUBLIC_SENTRY_DSN;

// If webapp is using SSL (i.e. it's behind 'https' protocol)
const usingSSL = process.env.REACT_APP_SHARETRIBE_USING_SSL === 'true';

// Currency formatting options.
// See: https://github.com/yahoo/react-intl/wiki/API#formatnumber
//
// TODO: Remove this and hide formating within the util/currency module
const currencyConfig = {
  style: 'currency',
  currency,
  currencyDisplay: 'symbol',
  useGrouping: true,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

// Stripe only supports payments in certain countries, see full list
// at https://stripe.com/global
//
// We currently only support EU countries, US, and AU.
const stripeSupportedCountries = [
  {
    // Australia
    code: 'AU',
    currency: 'AUD',
    payoutAddressRequired: false,
    accountConfig: {
      bsb: true,
      accountNumber: true,
    },
  },
  {
    // Austria
    code: 'AT',
    currency: 'EUR',
    payoutAddressRequired: true,
    accountConfig: {
      iban: true,
    },
  },
  {
    // Belgium
    code: 'BE',
    currency: 'EUR',
    payoutAddressRequired: true,
    accountConfig: {
      iban: true,
    },
  },
  {
    // Denmark
    code: 'DK',
    currency: 'DKK',
    payoutAddressRequired: true,
    accountConfig: {
      iban: true,
    },
  },
  {
    // Finland
    code: 'FI',
    currency: 'EUR',
    payoutAddressRequired: true,
    accountConfig: {
      iban: true,
    },
  },
  {
    // France
    code: 'FR',
    currency: 'EUR',
    payoutAddressRequired: true,
    accountConfig: {
      iban: true,
    },
  },
  {
    // Germany
    code: 'DE',
    currency: 'EUR',
    payoutAddressRequired: true,
    accountConfig: {
      iban: true,
    },
  },
  {
    // Ireland
    code: 'IE',
    currency: 'EUR',
    payoutAddressRequired: true,
    accountConfig: {
      iban: true,
    },
  },
  {
    // Italy
    code: 'IT',
    currency: 'EUR',
    payoutAddressRequired: true,
    accountConfig: {
      iban: true,
    },
  },
  {
    // Luxembourg
    code: 'LU',
    currency: 'EUR',
    payoutAddressRequired: true,
    accountConfig: {
      iban: true,
    },
  },
  {
    // Netherlands
    code: 'NL',
    currency: 'EUR',
    payoutAddressRequired: true,
    accountConfig: {
      iban: true,
    },
  },
  {
    // Portugal
    code: 'PT',
    currency: 'EUR',
    payoutAddressRequired: true,
    accountConfig: {
      iban: true,
    },
  },
  {
    // Spain
    code: 'ES',
    currency: 'EUR',
    payoutAddressRequired: true,
    accountConfig: {
      iban: true,
    },
  },
  {
    // Sweden
    code: 'SE',
    currency: 'SEK',
    payoutAddressRequired: true,
    accountConfig: {
      iban: true,
    },
  },
  {
    // United Kingdom
    code: 'GB',
    currency: 'GBP',
    payoutAddressRequired: true,
    accountConfig: {
      sortCode: true,
      accountNumber: true,
    },
  },
  {
    // United States
    code: 'US',
    currency: 'USD',
    payoutAddressRequired: false,
    accountConfig: {
      routingNumber: true,
      accountNumber: true,
    },
  },
];

// Address information is used in SEO schema for Organization (http://schema.org/PostalAddress)
const addressCountry = 'FI';
const addressRegion = 'Helsinki';
const postalCode = '00100';
const streetAddress = 'Bulevardi 14';

// Canonical root url is needed in social media sharing and SEO optimization purposes.
const canonicalRootURL = process.env.REACT_APP_CANONICAL_ROOT_URL;

// Site title is needed in meta tags (bots and social media sharing reads those)
const siteTitle = 'Saunatime';

// Twitter handle is needed in meta tags (twitter:site). Start it with '@' character
const siteTwitterHandle = '@sharetribe';

// Instagram page is used in SEO schema (http://schema.org/Organization)
const siteInstagramPage = null;

// Facebook page is used in SEO schema (http://schema.org/Organization)
const siteFacebookPage = 'https://www.facebook.com/Sharetribe/';

// Facebook counts shares with app or page associated by this id
// Currently it is unset, but you can read more about fb:app_id from
// https://developers.facebook.com/docs/sharing/webmasters#basic
// You should create one to track social sharing in Facebook
const facebookAppId = null;

// Google Maps API key is needed for static map images.
const googleMapsAPIKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const coordinates = {
  // If true, obfuscate the coordinates of the listings that are shown
  // on a map.
  fuzzy: false,

  // Default zoom level when showing a single circle on a Map. Should
  // be small enough so the whole circle fits in.
  fuzzyDefaultZoomLevel: 14,

  // When fuzzy === true, the coordinates on the Map component are
  // obfuscated and a circle is shown instead of a marker. To decide a
  // proper value for the offset and the radius, see:
  //
  // https://gis.stackexchange.com/a/8674

  // Amount of maximum offset in meters that is applied to obfuscate
  // the original coordinates. The actual value is random, but the
  // obfuscated coordinates are withing a circle that has the same
  // radius as the offset.
  coordinateOffset: 500,

  // Options to style the circle appearance.
  //
  // See: https://developers.google.com/maps/documentation/javascript/reference#CircleOptions
  circleOptions: {
    fillColor: '#c0392b',
    fillOpacity: 0.2,
    strokeColor: '#c0392b',
    strokeOpacity: 0.5,
    strokeWeight: 1,
    clickable: false,
  },

  // An option to use custom marker on static maps. Uncomment to enable it.
  // https://developers.google.com/maps/documentation/maps-static/dev-guide#Markers
  //
  // Note 1: fuzzy coordinate circle overwrites these custom marker settings)
  // Note 2: markerURI needs to be a public URI accessible by Google Maps API servers.
  // The easiest place is /public/static/icons/ folder, but then the marker image is not available
  // while developing through localhost.

  // customMarker: {
  //   markerURI: encodeURI(`${canonicalRootURL}/static/icons/map-marker-32x32.png`),
  //   anchorX: 16,
  //   anchorY: 32,
  //   width: 32,
  //   height: 32,
  // },
};

// NOTE: only expose configuration that should be visible in the
// client side, don't add any server secrets in this file.
const config = {
  env,
  dev,
  locale,
  bookingProcessAlias,
  bookingUnitType,
  dayCountAvailableForBooking,
  i18n,
  sdk: {
    clientId: sdkClientId,
    baseUrl: sdkBaseUrl,
    transitVerbose: sdkTransitVerbose,
  },
  sortSearchByDistance,
  currency,
  listingMinimumPriceSubUnits,
  currencyConfig,
  stripe: { publishableKey: stripePublishableKey, supportedCountries: stripeSupportedCountries },
  canonicalRootURL,
  address: {
    addressCountry,
    addressRegion,
    postalCode,
    streetAddress,
  },
  siteTitle,
  siteFacebookPage,
  siteInstagramPage,
  siteTwitterHandle,
  facebookAppId,
  sentryDsn,
  usingSSL,
  googleMapsAPIKey,
  coordinates,
  custom,
};

export default config;
