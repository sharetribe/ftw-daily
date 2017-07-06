const env = process.env.NODE_ENV;
const dev = env !== 'production';

// To pass environment variables to the client app in the build
// script, react-scripts (and the sharetribe-scripts fork of
// react-scripts) require using the REACT_APP_ prefix to avoid
// exposing server secrets to the client side.
const sdkClientId = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID ||
  '08ec69f6-d37e-414d-83eb-324e94afddf0';
const sdkBaseUrl = process.env.REACT_APP_SHARETRIBE_SDK_BASE_URL || 'http://localhost:8088';

// Currency configuration contains subUnitsDivisor and formatting for React-Intl
// SubUnitDivisor is used to convert Money.amount to presentational value
// E.g. 1099¢ / subUnitDivisor = $10.99
const currencyConfig = {
  style: 'currency',
  currency: process.env.REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY || 'USD',
  currencyDisplay: 'symbol',
  useGrouping: true,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  subUnitDivisor: 100,
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
    payoutAddressRequired: false,
  },
  {
    // Austria
    code: 'AT',
    payoutAddressRequired: true,
  },
  {
    // Belgium
    code: 'BE',
    payoutAddressRequired: true,
  },
  {
    // Denmark
    code: 'DK',
    payoutAddressRequired: true,
  },
  {
    // Finland
    code: 'FI',
    payoutAddressRequired: true,
  },
  {
    // France
    code: 'FR',
    payoutAddressRequired: true,
  },
  {
    // Germany
    code: 'DE',
    payoutAddressRequired: true,
  },
  {
    // Ireland
    code: 'IE',
    payoutAddressRequired: true,
  },
  {
    // Italy
    code: 'IT',
    payoutAddressRequired: true,
  },
  {
    // Luxembourg
    code: 'LU',
    payoutAddressRequired: true,
  },
  {
    // Netherlands
    code: 'NL',
    payoutAddressRequired: true,
  },
  {
    // Portugal
    code: 'PT',
    payoutAddressRequired: true,
  },
  {
    // Spain
    code: 'ES',
    payoutAddressRequired: true,
  },
  {
    // Sweden
    code: 'SE',
    payoutAddressRequired: true,
  },
  {
    // United Kingdom
    code: 'GB',
    payoutAddressRequired: true,
  },
  {
    // United States
    code: 'US',
    payoutAddressRequired: false,
  },
];

// NOTE: only expose configuration that should be visible in the
// client side, don't add any server secrets in this file.
const config = {
  env,
  dev,
  sdk: { clientId: sdkClientId, baseUrl: sdkBaseUrl },
  currencyConfig,
  stripe: { publishableKey: stripePublishableKey, supportedCountries: stripeSupportedCountries },
};

export default config;
