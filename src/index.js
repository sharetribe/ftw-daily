/**
 * This is the main entrypoint file for the application.
 *
 * When loaded in the client side, the application is rendered in the
 * #root element.
 *
 * When the bundle created from this file is imported in the server
 * side, the exported `renderApp` function can be used for server side
 * rendering.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { BrowserRouter, ServerRouter } from 'react-router';
import Routes from './Routes';
import './index.css';

const ClientApp = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

const ServerApp = (props) => {
  const { url, context } = props;
  return (
    <ServerRouter location={ url } context={ context } >
      <Routes />
    </ServerRouter>
  );
};

// If we're in a browser already, render the client application.
if (typeof window !== 'undefined') {
  ReactDOM.render(<ClientApp />, document.getElementById('root'));
}

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
const renderApp = (url, serverContext) => {
  const body = ReactDOMServer.renderToString(
    <ServerApp url={ url } context={ serverContext }/>
  );
  const head = Helmet.rewind();
  return { head, body };
};

// Export the function for server side rendering.
export default renderApp;
