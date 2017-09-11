import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { forEach } from 'lodash';
import { ClientApp, ServerApp } from './app';
import configureStore from './store';

const render = (url, context) => {
  const store = configureStore({});
  const body = ReactDOMServer.renderToString(
    <ServerApp url={url} context={context} store={store} />
  );
  const head = Helmet.peek();
  return { head, body };
};

describe('Application', () => {
  it('renders in the client without crashing', () => {
    window.google = { maps: {} };
    const store = configureStore({});
    const div = document.createElement('div');
    ReactDOM.render(<ClientApp store={store} />, div);
    delete window.google;
  });

  it('renders in the server without crashing', () => {
    render('/', {});
  });

  it('renders the styleguide without crashing', () => {
    render('/styleguide', {});
  });

  it('server renders pages that do not require authentication', () => {
    const urlTitles = {
      '/': 'Landing page',
      '/s': 'Search page: listings',
      '/s/listings': 'Search page: listings',
      '/s/filters': 'Search page: filters',
      '/s/map': 'Search page: map',
      '/l/listing-title-slug/1234': 'Loading listing data',
      '/u/1234': 'Profile page with display name: 1234',
      '/login': 'Login',
      '/signup': 'Sign up',
      '/password': 'Request new password',
      '/password/forgotten': 'Request new password',
      '/password/change': 'Type new password',
      '/this-url-should-not-be-found': 'Page not found',
    };
    forEach(urlTitles, (title, url) => {
      const context = {};
      const { head, body } = render(url, context);

      expect(head.title).toEqual(title);

      // context.url will contain the URL to redirect to if a <Redirect> was used
      expect(context.url).not.toBeDefined();
    });
  });

  it('server renders redirects for pages that require authentication', () => {
    const loginPath = '/login';
    const signupPath = '/signup';
    const defaultAuthPath = signupPath;
    const urlRedirects = {
      '/l/new': defaultAuthPath,
      '/l/listing-title-slug/1234/new/description': defaultAuthPath,
      '/l/listing-title-slug/1234/checkout': defaultAuthPath,
      '/profile-settings': defaultAuthPath,
      '/inbox': defaultAuthPath,
      '/inbox/orders': defaultAuthPath,
      '/inbox/sales': defaultAuthPath,
      '/order/1234': defaultAuthPath,
      '/order/1234/discussion': defaultAuthPath,
      '/order/1234/details': defaultAuthPath,
      '/sale/1234': defaultAuthPath,
      '/sale/1234/discussion': defaultAuthPath,
      '/sale/1234/details': defaultAuthPath,
      '/listings': defaultAuthPath,
      '/account': defaultAuthPath,
      '/account/contact-details': defaultAuthPath,
      '/account/payout-preferences': defaultAuthPath,
      '/account/security': defaultAuthPath,
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
