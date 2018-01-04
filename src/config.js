const env = process.env.REACT_APP_ENV || 'production';
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

// The transaction line item code for the main unit type in bookings.
//
// Possible values: ['line-item/night', 'line-item/day']
//
// TODO: Check that this applies when API adds support for daily bookings
const bookingUnitType = 'line-item/night';

// To pass environment variables to the client app in the build
// script, react-scripts (and the sharetribe-scripts fork of
// react-scripts) require using the REACT_APP_ prefix to avoid
// exposing server secrets to the client side.
const sdkClientId =
  process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID || '08ec69f6-d37e-414d-83eb-324e94afddf0';
const sdkBaseUrl = process.env.REACT_APP_SHARETRIBE_SDK_BASE_URL || 'http://localhost:8088';

const currency = process.env.REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY || 'USD';

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

const stripePublishableKey =
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_FWtdKPZvtrj37t45dIomssBI';

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

// Custom attributes are marketplace specific listing data (e.g. listing could have a category).
// Custom attributes can be defined through management console and code related to custom
// attributes should be changed accordingly.
//
// Here's an example what custom attributes might look like for bicycle listings. This code
// assumes that a custom attribute, called 'category', is created through management console
// with 4 possible values: 'road', 'mountain', 'track', and 'other'.
//
// When listing information is queried customAttributes is returned among other attributes:
//  {
//    id: 1,
//    type: 'listing',
//    attributes: {
//      title: 'sauna',
//      // and description, closed, deleted, price, etc.
//      customAttributes: {
//        category: "mountain",
//        // and other added custom attributes as "key: value" pairs
//      },
//    },
//  }
const customAttributes = {
  category: {
    select: 'single', // possible values: 'single' (only type supported atm.)
    type: 'string',
    values: ['road', 'mountain', 'track', 'other'],
  },
};

// Address information is used in SEO schema for Organization (http://schema.org/PostalAddress)
const addressCountry = 'FI';
const addressRegion = 'Helsinki';
const postalCode = '00100';
const streetAddress = 'Bulevardi 14';

// Canonical root url is needed in social media sharing and SEO optimization purposes.
const canonicalRootURL = process.env.REACT_APP_CANONICAL_ROOT_URL || 'http://localhost:3000';

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

// NOTE: only expose configuration that should be visible in the
// client side, don't add any server secrets in this file.
const config = {
  env,
  dev,
  locale,
  bookingUnitType,
  i18n,
  sdk: { clientId: sdkClientId, baseUrl: sdkBaseUrl },
  currency,
  currencyConfig,
  customAttributes,
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
};

export default config;
