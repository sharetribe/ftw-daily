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
      '/login': 'Authentication page: login tab',
      '/signup': 'Authentication page: signup tab',
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
    const urlRedirects = {
      '/l/new': '/login',
      '/l/listing-title-slug/1234/edit': '/login',
      '/l/listing-title-slug/1234/checkout': '/login',
      '/u/1234/edit': '/login',
      '/orders': '/login',
      '/sales': '/login',
      '/order/1234': '/login',
      '/order/1234/discussion': '/login',
      '/order/1234/details': '/login',
      '/sale/1234': '/login',
      '/sale/1234/discussion': '/login',
      '/sale/1234/details': '/login',
      '/listings': '/login',
      '/account': '/login',
      '/account/contact-details': '/login',
      '/account/payout-preferences': '/login',
      '/account/security': '/login',
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
