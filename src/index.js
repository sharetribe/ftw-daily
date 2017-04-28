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
import { bindActionCreators } from 'redux';
import { createInstance, types } from './util/sdkLoader';
import { ClientApp, renderApp } from './app';
import configureStore from './store';
import { matchPathname } from './util/routes';
import * as sample from './util/sample';
import createRootSaga from './sagas';
import config from './config';
import { authInfo } from './ducks/Auth.duck';
import {
  showListings,
  queryListings,
  searchListings,
  showMarketplace,
  showUsers,
} from './ducks/sdk.duck';
import { fetchCurrentUser } from './ducks/user.duck';
import routeConfiguration from './routesConfiguration';

import './index.css';

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
      console.error(e); // eslint-disable-line
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
  // eslint-disable-next-line no-underscore-dangle
  const preloadedState = window.__PRELOADED_STATE__ || '{}';
  const initialState = JSON.parse(preloadedState, types.reviver);
  const sdk = createInstance({ clientId: config.sdk.clientId, baseUrl: config.sdk.baseUrl });
  const store = configureStore(sdk, initialState);

  store.runSaga(createRootSaga(sdk));
  setupStripe();
  render(store);

  // Expose stuff for the browser REPL
  const actions = bindActionCreators(
    { showListings, queryListings, searchListings, showMarketplace, showUsers },
    store.dispatch
  );
  window.app = { config, sdk, sdkTypes: types, actions, store, sample, routeConfiguration };
}

// Export the function for server side rendering.
export default renderApp;

// exporting matchPathname and configureStore for server side rendering.
// matchPathname helps to figure out which route is called and if it has preloading needs
// configureStore is used for creating initial store state for Redux after preloading
export { matchPathname, configureStore, routeConfiguration };
