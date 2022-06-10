import React from 'react';
import ReactDOM from 'react-dom';
import { ClientApp } from './app';
import configureStore from './store';

const jsdomScroll = window.scroll;
beforeAll(() => {
  // Mock window.scroll - otherwise, Jest/JSDOM will print a not-implemented error.
  window.scroll = () => {};
});

afterAll(() => {
  window.scroll = jsdomScroll;
});

describe('Application - JSDOM environment', () => {
  it('renders the LandingPage without crashing', () => {
    window.google = { maps: {} };

    // LandingPage gets rendered and it calls hostedAsset > fetchPageAssets > sdk.assetByVersion
    const rejectPageAssetCall = () =>
      Promise.reject(new Error('LandingPage test calling sdk.assetByVersion'));
    const fakeSdk = { assetByVersion: rejectPageAssetCall };
    const store = configureStore({}, fakeSdk);
    const div = document.createElement('div');
    ReactDOM.render(<ClientApp store={store} />, div);
    delete window.google;
  });
});
