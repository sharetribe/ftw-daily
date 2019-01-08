import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

// react-dates needs to be initialized before using any react-dates component
// https://github.com/airbnb/react-dates#initialize
// NOTE: Initializing it here will initialize it also for app.test.js
import 'react-dates/initialize';
import Helmet from 'react-helmet';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import mapValues from 'lodash/mapValues';
import moment from 'moment';
import { IntlProvider, addLocaleData } from 'react-intl';
import configureStore from './store';
import routeConfiguration from './routeConfiguration';
import Routes from './Routes';
import config from './config';

// If you want to change the language, Change the imports to the match
// the wanted locale.
//
// Remember to also change the language in the config.js file.
import localeData from 'react-intl/locale-data/en';
import messages from './translations/en.json';
// If you are using a non-english locale with moment library,
// you should also import time specific formatting rules for that locale
// e.g. for French: import 'moment/locale/fr';

const isTestEnv = process.env.NODE_ENV === 'test';

// Locale should not affect the tests. We ensure this by providing
// messages with the key as the value of each message.
const testMessages = mapValues(messages, (val, key) => key);
const localeMessages = isTestEnv ? testMessages : messages;

const setupLocale = () => {
  if (isTestEnv) {
    // Don't change the locale in tests
    return;
  }

  // Add the translation messages
  addLocaleData([...localeData]);

  // Set the Moment locale globally
  // See: http://momentjs.com/docs/#/i18n/changing-locale/
  moment.locale(config.locale);
};

export const ClientApp = props => {
  const { store } = props;
  setupLocale();
  return (
    <IntlProvider locale={config.locale} messages={localeMessages}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes routes={routeConfiguration()} />
        </BrowserRouter>
      </Provider>
    </IntlProvider>
  );
};

const { any, string } = PropTypes;

ClientApp.propTypes = { store: any.isRequired };

export const ServerApp = props => {
  const { url, context, store } = props;
  setupLocale();
  return (
    <IntlProvider locale={config.locale} messages={localeMessages}>
      <Provider store={store}>
        <StaticRouter location={url} context={context}>
          <Routes routes={routeConfiguration()} />
        </StaticRouter>
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
export const renderApp = (url, serverContext, preloadedState) => {
  // Don't pass an SDK instance since we're only rendering the
  // component tree with the preloaded store state and components
  // shouldn't do any SDK calls in the (server) rendering lifecycle.
  const store = configureStore(preloadedState);

  const body = ReactDOMServer.renderToString(
    <ServerApp url={url} context={serverContext} store={store} />
  );
  const head = Helmet.renderStatic();
  return { head, body };
};
