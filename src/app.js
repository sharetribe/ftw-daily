import React, { PropTypes } from 'react'; // eslint-disable-line react/no-deprecated
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import localeData from './translations/en.json';
import configureStore from './store';
import routeConfiguration from './routeConfiguration';
import Routes from './Routes';

export const ClientApp = props => {
  const { store } = props;
  addLocaleData([...en]);
  return (
    <IntlProvider locale="en" messages={localeData}>
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
  addLocaleData([...en]);
  return (
    <IntlProvider locale="en" messages={localeData}>
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
  // Pass `null` as the SDK instance since we're only rendering the
  // component tree with the preloaded store state and components
  // shouldn't do any SDK calls in the (server) rendering lifecycle.
  const store = configureStore(null, preloadedState);

  const body = ReactDOMServer.renderToString(
    <ServerApp url={url} context={serverContext} store={store} />
  );
  const head = Helmet.renderStatic();
  return { head, body };
};
