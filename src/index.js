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
import Decimal from 'decimal.js';
import { createInstance, types } from './util/sdkLoader';
import { ClientApp, renderApp } from './app';
import configureStore from './store';
import { matchPathname } from './util/routes';
import * as sample from './util/sample';
import config from './config';
import { authInfo } from './ducks/Auth.duck';
import { fetchCurrentUser } from './ducks/user.duck';
import routeConfiguration from './routeConfiguration';
import * as log from './util/log';

import './marketplaceIndex.css';

const { BigDecimal } = types;

const render = store => {
  // If the server already loaded the auth information, render the app
  // immediately. Otherwise wait for the flag to be loaded and render
  // when auth information is present.
  const authInfoLoaded = store.getState().Auth.authInfoLoaded;
  const info = authInfoLoaded ? Promise.resolve({}) : store.dispatch(authInfo());
  info
    .then(() => {
      store.dispatch(fetchCurrentUser());
      ReactDOM.render(<ClientApp store={store} />, document.getElementById('root'));
    })
    .catch(e => {
      log.error(e, 'browser-side-render-failed');
    });
};

const setupStripe = () => {
  if (typeof window.Stripe === 'undefined') {
    throw new Error('Stripe library not loaded');
  }
  // https://stripe.com/docs/stripe.js#setting-publishable-key
  window.Stripe.setPublishableKey(config.stripe.publishableKey);
};

// If we're in a browser already, render the client application.
if (typeof window !== 'undefined') {
  // set up logger with Sentry DSN client key and environment
  log.setup();

  // eslint-disable-next-line no-underscore-dangle
  const preloadedState = window.__PRELOADED_STATE__ || '{}';
  const initialState = JSON.parse(preloadedState, types.reviver);
  const sdk = createInstance({
    clientId: config.sdk.clientId,
    baseUrl: config.sdk.baseUrl,
    secure: config.usingSSL,
    typeHandlers: [
      {
        type: BigDecimal,
        customType: Decimal,
        writer: v => new BigDecimal(v.toString()),
        reader: v => new Decimal(v.value),
      },
    ],
  });
  const store = configureStore(sdk, initialState);

  setupStripe();
  render(store);

  if (config.dev) {
    // Expose stuff for the browser REPL
    window.app = {
      config,
      sdk,
      sdkTypes: types,
      store,
      sample,
      routeConfiguration: routeConfiguration(),
    };
  }
}

// Export the function for server side rendering.
export default renderApp;

// exporting matchPathname and configureStore for server side rendering.
// matchPathname helps to figure out which route is called and if it has preloading needs
// configureStore is used for creating initial store state for Redux after preloading
export { matchPathname, configureStore, routeConfiguration, config };
