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
import { createInstance, types } from 'sharetribe-sdk';
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
import routeConfiguration from './routesConfiguration';

import './index.css';

const renderWithAuthInfo = store => {
  ReactDOM.render(<ClientApp store={store} />, document.getElementById('root'));
};

// Wait for the store to have the Auth.authInfoLoaded flag, render the
// application when the auth information is present.
const renderWhenAuthInfoLoaded = store => {
  const unsubscribe = store.subscribe(() => {
    const authInfoLoaded = store.getState().Auth.authInfoLoaded;
    if (authInfoLoaded) {
      unsubscribe();
      renderWithAuthInfo(store);
    }
  });
  store.dispatch(authInfo());
};

// If we're in a browser already, render the client application.
if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-underscore-dangle
  const preloadedState = window.__PRELOADED_STATE__ || {};
  const sdk = createInstance({ clientId: config.sdk.clientId, baseUrl: config.sdk.baseUrl });
  const store = configureStore(sdk, preloadedState);

  store.runSaga(createRootSaga(sdk));

  const authInfoLoaded = store.getState().Auth.authInfoLoaded;

  // If the server already loaded the auth information, render the app
  // immediately. Otherwise wait for the flag to be loaded and render
  // when auth information is present.
  if (authInfoLoaded) {
    renderWithAuthInfo(store);
  } else {
    renderWhenAuthInfoLoaded(store);
  }

  // Expose stuff for the browser REPL
  if (config.dev) {
    const actions = bindActionCreators(
      { showListings, queryListings, searchListings, showMarketplace, showUsers },
      store.dispatch
    );
    window.app = { config, sdk, sdkTypes: types, actions, store, sample, routeConfiguration };
  }
}

// Export the function for server side rendering.
export default renderApp;

// exporting matchPathname and configureStore for server side rendering.
// matchPathname helps to figure out which route is called and if it has preloading needs
// configureStore is used for creating initial store state for Redux after preloading
export { matchPathname, configureStore };
