const env = process.env.NODE_ENV;
const dev = env !== 'production';

// To pass environment variables to the client app in the build
// script, react-scripts (and the sharetribe-scripts fork of
// react-scripts) require using the REACT_APP_ prefix to avoid
// exposing server secrets to the client side.
const sdkClientId = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID ||
  '08ec69f6-d37e-414d-83eb-324e94afddf0';
const sdkBaseUrl = process.env.REACT_APP_SHARETRIBE_SDK_BASE_URL || 'http://localhost:8088';

const currency = process.env.REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY || 'USD';

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

const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ||
  'pk_test_FWtdKPZvtrj37t45dIomssBI';

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

// NOTE: only expose configuration that should be visible in the
// client side, don't add any server secrets in this file.
const config = {
  env,
  dev,
  sdk: { clientId: sdkClientId, baseUrl: sdkBaseUrl },
  currency,
  currencyConfig,
  stripe: { publishableKey: stripePublishableKey, supportedCountries: stripeSupportedCountries },
};

export default config;
