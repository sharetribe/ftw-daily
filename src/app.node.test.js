/**
 * @jest-environment node
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet-async';
import forEach from 'lodash/forEach';
import { ClientApp, ServerApp } from './app';
import configureStore from './store';

const render = (url, context) => {
  const store = configureStore();

  const helmetContext = {};

  const body = ReactDOMServer.renderToString(
    <ServerApp url={url} context={context} helmetContext={helmetContext} store={store} />
  );

  const { helmet: head } = helmetContext;
  return { head, body };
};

describe('Application - node environment', () => {
  it('renders in the server without crashing', () => {
    render('/', {});
  });

  it('renders the styleguide without crashing', () => {
    render('/styleguide', {});
  });

  it('server renders redirects for pages that require authentication', () => {
    const loginPath = '/login';
    const signupPath = '/signup';
    const urlRedirects = {
      '/l/new': signupPath,
      '/l/listing-title-slug/1234/new/description': signupPath,
      '/l/listing-title-slug/1234/checkout': signupPath,
      '/profile-settings': loginPath,
      '/inbox': loginPath,
      '/inbox/orders': loginPath,
      '/inbox/sales': loginPath,
      '/order/1234': loginPath,
      '/order/1234/details': loginPath,
      '/sale/1234': loginPath,
      '/sale/1234/details': loginPath,
      '/listings': loginPath,
      '/account': loginPath,
      '/account/contact-details': loginPath,
      '/account/change-password': loginPath,
      '/account/payments': loginPath,
      '/verify-email': loginPath,
    };
    forEach(urlRedirects, (redirectPath, url) => {
      const context = {};
      const { body } = render(url, context);
      expect(context.url).toEqual(redirectPath);
    });
  });

  it('redirects to correct URLs', () => {
    const urlRedirects = { '/l': '/', '/u': '/' };
    forEach(urlRedirects, (redirectPath, url) => {
      const context = {};
      const { body } = render(url, context);
      expect(context.url).toEqual(redirectPath);
    });
  });
});
