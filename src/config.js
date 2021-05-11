import * as custom from './marketplace-custom-config.js';
import defaultLocationSearches from './default-location-searches';
import { defaultMCC, stripePublishableKey, stripeCountryDetails } from './stripe-config';
import { currencyConfiguration } from './currency-config';

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
// NOTE: If this is set to true add parameter 'origin' to every location in default-location-searches.js
// Without the 'origin' parameter, search will not work correctly
// NOTE: Keyword search and ordering search results by distance can't be used at the same time. You can turn keyword
// search off by removing keyword filter config from filters array in marketplace-custom-config.js
const sortSearchByDistance = false;

// API supports custom processes to be used in booking process.
// We need to specify it when we are initiating a new order
// (or fetching price information by calling 'initiateSpeculative' endpoint).
//
// In a way, 'processAlias' defines which transaction process (or processes)
// this particular web application is able to handle.
const bookingProcessAlias = 'flex-default-process/release-1';

// The transaction line item code for the main unit type in bookings.
//
// Possible values: ['line-item/night', 'line-item/day', 'line-item/units';]
//
// Note 1: This 'bookingUnitType' variable affects only web app.
//         If you are using privileged transitions (which is used by the default process),
//         you also need to configure unit type in API server: server/api-util/lineItems.js
//
// Note 2: Translations will use different translation keys for night, day or unit
//         depending on the value chosen.
const bookingUnitType = 'line-item/night';

// Should the application fetch available time slots (currently defined as
// start and end dates) to be shown on listing page.
const enableAvailability = process.env.REACT_APP_AVAILABILITY_ENABLED === 'true';

// A maximum number of days forwards during which a booking can be made.
// This is limited due to Stripe holding funds up to 90 days from the
// moment they are charged. Also note that available time slots can only
// be fetched for 180 days in the future.
const dayCountAvailableForBooking = 90;

// To pass environment variables to the client app in the build
// script, react-scripts (and the sharetribe-scripts fork of
// react-scripts) require using the REACT_APP_ prefix to avoid
// exposing server secrets to the client side.
const sdkClientId = process.env.REACT_APP_SHARETRIBE_SDK_CLIENT_ID;
const sdkBaseUrl = process.env.REACT_APP_SHARETRIBE_SDK_BASE_URL;
const sdkTransitVerbose = process.env.REACT_APP_SHARETRIBE_SDK_TRANSIT_VERBOSE === 'true';

// Marketplace currency.
// It should match one of the currencies listed in currency-config.js
const currencyConf = process.env.REACT_APP_SHARETRIBE_MARKETPLACE_CURRENCY;
const currency = currencyConf ? currencyConf.toUpperCase() : currencyConf;

// Currency formatting options.
// See: https://github.com/yahoo/react-intl/wiki/API#formatnumber
const currencyConfig = currencyConfiguration(currency);

// Listing minimum price in currency sub units, e.g. cents.
// 0 means no restriction to the price
const listingMinimumPriceSubUnits = 0;

// Sentry DSN (Data Source Name), a client key for authenticating calls to Sentry
const sentryDsn = process.env.REACT_APP_SENTRY_DSN;

// If webapp is using SSL (i.e. it's behind 'https' protocol)
const usingSSL = process.env.REACT_APP_SHARETRIBE_USING_SSL === 'true';

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

// Social logins & SSO

// Note: Facebook app id is also used for tracking:
// Facebook counts shares with app or page associated by this id
// Currently it is unset, but you can read more about fb:app_id from
// https://developers.facebook.com/docs/sharing/webmasters#basic
// You should create one to track social sharing in Facebook
const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

const maps = {
  mapboxAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  googleMapsAPIKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,

  // The location search input can be configured to show default
  // searches when the user focuses on the input and hasn't yet typed
  // anything. This reduces typing and avoids too many Geolocation API
  // calls for common searches.
  search: {
    // When enabled, the first suggestion is "Current location" that
    // uses the browser Geolocation API to query the user's current
    // location.
    suggestCurrentLocation: process.env.REACT_APP_DEFAULT_SEARCHES_ENABLED === 'true',

    // Distance in meters for calculating the bounding box around the
    // current location.
    currentLocationBoundsDistance: 1000,

    // Example location can be edited in the
    // `default-location-searches.js` file.
    defaults:
      process.env.REACT_APP_DEFAULT_SEARCHES_ENABLED === 'true' ? defaultLocationSearches : [],

    // Limit location autocomplete to a one or more countries
    // using ISO 3166 alpha 2 country codes separated by commas.
    // If you want to limit the autocomplete, uncomment this value:
    // countryLimit: ['AU'],
  },

  // When fuzzy locations are enabled, coordinates on maps are
  // obfuscated randomly around the actual location.
  //
  // NOTE: This only hides the locations in the UI level, the actual
  // coordinates are still accessible in the HTTP requests and the
  // Redux store.
  fuzzy: {
    enabled: false,

    // Amount of maximum offset in meters that is applied to obfuscate
    // the original coordinates. The actual value is random, but the
    // obfuscated coordinates are withing a circle that has the same
    // radius as the offset.
    offset: 500,

    // Default zoom level when showing a single circle on a Map. Should
    // be small enough so the whole circle fits in.
    defaultZoomLevel: 13,

    // Color of the circle on the Map component.
    circleColor: '#c0392b',
  },

  // Custom marker image to use in the Map component.
  //
  // NOTE: Not used if fuzzy locations are enabled.
  customMarker: {
    enabled: false,

    // Publicly accessible URL for the custom marker image.
    //
    // The easiest place is /public/static/icons/ folder, but then the
    // marker image is not available while developing through
    // localhost.
    url: encodeURI(`${canonicalRootURL}/static/icons/map-marker-32x32.png`),

    // Dimensions of the marker image.
    width: 32,
    height: 32,

    // Position to anchor the image in relation to the coordinates,
    // ignored when using Mapbox.
    anchorX: 16,
    anchorY: 32,
  },
};

// NOTE: only expose configuration that should be visible in the
// client side, don't add any server secrets in this file.
const config = {
  env,
  dev,
  locale,
  bookingProcessAlias,
  bookingUnitType,
  enableAvailability,
  dayCountAvailableForBooking,
  i18n,
  sdk: {
    clientId: sdkClientId,
    baseUrl: sdkBaseUrl,
    transitVerbose: sdkTransitVerbose,
  },
  sortSearchByDistance,
  currency,
  currencyConfig,
  listingMinimumPriceSubUnits,
  stripe: {
    defaultMCC: defaultMCC,
    publishableKey: stripePublishableKey,
    supportedCountries: stripeCountryDetails,
  },
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
  maps,
  custom,
};

export default config;
