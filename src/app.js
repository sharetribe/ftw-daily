import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

// react-dates needs to be initialized before using any react-dates component
// https://github.com/airbnb/react-dates#initialize
// NOTE: Initializing it here will initialize it also for app.test.js
import 'react-dates/initialize';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import difference from 'lodash/difference';
import mapValues from 'lodash/mapValues';
import moment from 'moment';
import { IntlProvider } from './util/reactIntl';
import configureStore from './store';
import routeConfiguration from './routeConfiguration';
import Routes from './Routes';
import config from './config';

// Flex template application uses English translations as default translations.
import defaultMessages from './translations/en.json';

// If you want to change the language of default (fallback) translations,
// change the imports to match the wanted locale:
//
//   1) Change the language in the config.js file!
//   2) Import correct locale rules for Moment library
//   3) Use the `messagesInLocale` import to add the correct translation file.
//   4) To support older browsers we need add the correct locale for intl-relativetimeformat to `util/polyfills.js`

// Note that there is also translations in './translations/countryCodes.js' file
// This file contains ISO 3166-1 alpha-2 country codes, country names and their translations in our default languages
// This used to collect billing address in StripePaymentAddress on CheckoutPage

// Step 2:
// If you are using a non-english locale with moment library,
// you should also import time specific formatting rules for that locale
// e.g. for French: import 'moment/locale/fr';

// Step 3:
// If you are using a non-english locale, point `messagesInLocale` to correct .json file.
// Remove "const messagesInLocale" and add import for the correct locale:
// import messagesInLocale from './translations/fr.json';
const messagesInLocale = {};

// If translation key is missing from `messagesInLocale` (e.g. fr.json),
// corresponding key will be added to messages from `defaultMessages` (en.json)
// to prevent missing translation key errors.
const addMissingTranslations = (sourceLangTranslations, targetLangTranslations) => {
  const sourceKeys = Object.keys(sourceLangTranslations);
  const targetKeys = Object.keys(targetLangTranslations);

  // if there's no translations defined for target language, return source translations
  if (targetKeys.length === 0) {
    return sourceLangTranslations;
  }
  const missingKeys = difference(sourceKeys, targetKeys);

  const addMissingTranslation = (translations, missingKey) => ({
    ...translations,
    [missingKey]: sourceLangTranslations[missingKey],
  });

  return missingKeys.reduce(addMissingTranslation, targetLangTranslations);
};

// Get default messages for a given locale.
//
// Note: Locale should not affect the tests. We ensure this by providing
//       messages with the key as the value of each message and discard the value.
//       { 'My.translationKey1': 'My.translationKey1', 'My.translationKey2': 'My.translationKey2' }
const isTestEnv = process.env.NODE_ENV === 'test';
const localeMessages = isTestEnv
  ? mapValues(defaultMessages, (val, key) => key)
  : addMissingTranslations(defaultMessages, messagesInLocale);

const setupLocale = () => {
  if (isTestEnv) {
    // Use english as a default locale in tests
    // This affects app.test.js and app.node.test.js tests
    config.locale = 'en';
    return;
  }

  // Set the Moment locale globally
  // See: http://momentjs.com/docs/#/i18n/changing-locale/
  moment.locale(config.locale);
};

export const ClientApp = props => {
  const { store, hostedTranslations = {} } = props;
  setupLocale();
  return (
    <IntlProvider
      locale={config.locale}
      messages={{ ...localeMessages, ...hostedTranslations }}
      textComponent="span"
    >
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Routes routes={routeConfiguration()} />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    </IntlProvider>
  );
};

const { any, string } = PropTypes;

ClientApp.propTypes = { store: any.isRequired };

export const ServerApp = props => {
  const { url, context, helmetContext, store } = props;
  setupLocale();
  HelmetProvider.canUseDOM = false;
  return (
    <IntlProvider locale={config.locale} messages={localeMessages} textComponent="span">
      <Provider store={store}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url} context={context}>
            <Routes routes={routeConfiguration()} />
          </StaticRouter>
        </HelmetProvider>
      </Provider>
    </IntlProvider>
  );
};

ServerApp.propTypes = { url: string.isRequired, context: any.isRequired, store: any.isRequired };

/**
 * Render the given route.
 *
 * @param {String} url Path to render
 * @param {Object} serverContext Server rendering context from react-router
 *
 * @returns {Object} Object with keys:
 *  - {String} body: Rendered application body of the given route
 *  - {Object} head: Application head metadata from react-helmet
 */
export const renderApp = (url, serverContext, preloadedState, collectChunks) => {
  // Don't pass an SDK instance since we're only rendering the
  // component tree with the preloaded store state and components
  // shouldn't do any SDK calls in the (server) rendering lifecycle.
  const store = configureStore(preloadedState);

  const helmetContext = {};

  // When rendering the app on server, we wrap the app with webExtractor.collectChunks
  // This is needed to figure out correct chunks/scripts to be included to server-rendered page.
  // https://loadable-components.com/docs/server-side-rendering/#3-setup-chunkextractor-server-side
  const WithChunks = collectChunks(
    <ServerApp url={url} context={serverContext} helmetContext={helmetContext} store={store} />
  );
  const body = ReactDOMServer.renderToString(WithChunks);
  const { helmet: head } = helmetContext;
  return { head, body };
};
