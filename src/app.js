import React, { PropTypes } from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { BrowserRouter, ServerRouter } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store';
import Routes from './Routes';

export const ClientApp = props => {
  const { store } = props;
  return (
    <BrowserRouter>
      {
        ({router}) => (
          <Provider store={store}>
            <Routes router={router} />
          </Provider>
        )
      }
    </BrowserRouter>
  );
};

const { any, string } = PropTypes;

ClientApp.propTypes = { store: any.isRequired };

export const ServerApp = props => {
  const { url, context } = props;
  return (
    <ServerRouter location={url} context={context}>
      {
        ({router}) => (
          <Provider store={store}>
            <Routes router={router} />
          </Provider>
        )
      }
    </ServerRouter>
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
export const renderApp = (url, serverContext) => {
  const body = ReactDOMServer.renderToString(<ServerApp url={url} context={serverContext} />);
  const head = Helmet.rewind();
  return { head, body };
};
