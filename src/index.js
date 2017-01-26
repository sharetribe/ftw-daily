/**
 * This is the main entrypoint file for the application.
 *
 * When loaded in the client side, the application is rendered in the
 * #root element.
 *
 * When the bundle created from this file is imported in the server
 * side, the exported `renderApp` function can be used for server side
 * rendering.
 *
 * Note that this file is required for the build process.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { ClientApp, renderApp } from './app';
import configureStore from './store';
import { matchLocation } from './routesConfiguration';

import './index.css';

// If we're in a browser already, render the client application.
if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-underscore-dangle
  const preloadedState = window.__PRELOADED_STATE__ || {};
  const store = configureStore(preloadedState);

  ReactDOM.render(<ClientApp store={store} />, document.getElementById('root'));
}

// Export the function for server side rendering.
export default renderApp;

export { matchLocation };
