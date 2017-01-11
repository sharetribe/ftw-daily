import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { BrowserRouter, ServerRouter } from 'react-router';
import Routes from './Routes';

export const ClientApp = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export const ServerApp = (props) => {
  const { url, context } = props;
  return (
    <ServerRouter location={ url } context={ context } >
      <Routes />
    </ServerRouter>
  );
};

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
  const body = ReactDOMServer.renderToString(
    <ServerApp url={ url } context={ serverContext }/>
  );
  const head = Helmet.rewind();
  return { head, body };
};
