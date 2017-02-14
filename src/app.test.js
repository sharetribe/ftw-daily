import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { forEach } from 'lodash';
import { ClientApp, ServerApp } from './app';
import configureStore from './store';

const render = (url, context) => {
  const store = configureStore({});
  return ReactDOMServer.renderToString(<ServerApp url={url} context={context} store={store} />);
};

describe('Application', () => {
  it('renders in the client without crashing', () => {
    const store = configureStore({});
    const div = document.createElement('div');
    ReactDOM.render(<ClientApp store={store} />, div);
  });

  it('renders in the server without crashing', () => {
    render('/', {});
  });

  it('server renders pages that do not require authentication', () => {
    const urlTitles = {
      '/': 'Landing page',
      '/s': 'Search page',
      '/l/listing-title-slug/1234': 'Banyan Studios 55€ / day',
      '/u/1234': 'Profile page with display name: 1234',
      '/checkout/1234': 'Book Banyan Studios (1234)',
      '/login': 'Authentication page: login tab',
      '/signup': 'Authentication page: signup tab',
      '/password/forgotten': 'Request new password',
      '/password/change': 'Type new password',
      '/this-url-should-not-be-found': 'Page not found',
    };
    forEach(urlTitles, (title, url) => {
      const context = {};
      const body = render(url, context);
      expect(body).toMatch(`>${title}</h1>`);
    });
  });

  it('server renders redirects for pages that require authentication', () => {
    const urlRedirects = {
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
      const body = render(url, context);
      expect(context.url).toEqual(redirectPath);
    });
  });
});
