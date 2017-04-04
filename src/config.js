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
  currency: 'USD',
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
const stripeSupportedCountries = [
  'AU', // Australia
  'CA', // Canada
  'DK', // Denmark
  'FI', // Finland
  'FR', // France
  'IE', // Ireland
  'JP', // Japan
  'NO', // Norway
  'SG', // Singapore
  'ES', // Spain
  'SE', // Sweden
  'GB', // United Kingdom
  'US', // United States
  'AT', // Austria
  'BE', // Belgium
  'DE', // Germany
  'HK', // Hong Kong
  'IT', // Italy
  'LU', // Luxembourg
  'NL', // Netherlands
  'NZ', // New Zealand
  'PT', // Portugal
  'CH', // Switzerland
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
