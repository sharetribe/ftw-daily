import React, { PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { BrowserRouter, ServerRouter } from 'react-router';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import configureStore from './store';
import Routes from './Routes';
import routesConfiguration from './routesConfiguration';
import localeData from './translations/en.json';

export const ClientApp = props => {
  const { store } = props;
  addLocaleData([...en]);
  return (
    <IntlProvider locale="en" messages={localeData}>
      <BrowserRouter>
        {({ router }) => (
          <Provider store={store}>
            <Routes router={router} routes={routesConfiguration} />
          </Provider>
        )}
      </BrowserRouter>
    </IntlProvider>
  );
};

const { any, string } = PropTypes;

ClientApp.propTypes = { store: any.isRequired };

export const ServerApp = props => {
  const { url, context, store } = props;
  addLocaleData([...en]);
  return (
    <IntlProvider locale="en" messages={localeData}>
      <ServerRouter location={url} context={context}>
        {({ router }) => (
          <Provider store={store}>
            <Routes router={router} routes={routesConfiguration} />
          </Provider>
        )}
      </ServerRouter>
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
  const store = configureStore(preloadedState);
  const body = ReactDOMServer.renderToString(
    <ServerApp url={url} context={serverContext} store={store} />,
  );
  const head = Helmet.rewind();
  return { head, body };
};
