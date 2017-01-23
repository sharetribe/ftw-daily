import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { forEach } from 'lodash';
import { createServerRenderContext } from 'react-router';
import { ClientApp, ServerApp } from './app';
import configureStore from './store';

const store = configureStore({});

const render = (url, context) =>
  ReactDOMServer.renderToString(<ServerApp url={url} context={context} store={store} />);

describe('Application', () => {
  it('renders in the client without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ClientApp store={store} />, div);
  });

  it('renders in the server without crashing', () => {
    render('/', createServerRenderContext());
  });

  it('renders correct routes in the server', () => {
    const urlTitles = {
      '/': 'Landing page',
      '/s': 'Search page',
      '/l/listing-title-slug/1234': 'Listing page with listing id: #1234',
      '/u/1234': 'Profile page with display name: 1234',
      '/checkout/1234': 'Checkout page: 1234',
      '/login': 'Authentication page: login tab',
      '/signup': 'Authentication page: signup tab',
      '/password/forgotten': 'Request new password',
      '/password/change': 'Type new password',
      '/this-url-should-not-be-found': 'Page not found',
    };
    forEach(urlTitles, (title, url) => {
      const context = createServerRenderContext();
      const body = render(url, context);
      expect(body.includes(`>${title}</h1>`)).toEqual(true);
    });

    const urlRedirects = {
      '/inbox': '/login',
      '/orders': '/login',
      '/sales': '/login',
      '/conversation/1234': '/login',
      '/order/1234': '/login',
      '/order/1234/discussion': '/login',
      '/order/1234/details': '/login',
      '/sale/1234': '/login',
      '/sale/1234/discussion': '/login',
      '/sale/1234/details': '/login',
      '/listings': '/login',
      '/account': '/login',
      '/account/contact-details': '/login',
      '/account/notifications': '/login',
      '/account/payment-methods': '/login',
      '/account/payout-preferences': '/login',
      '/account/security': '/login',
    };
    forEach(urlRedirects, (redirectPath, url) => {
      const context = createServerRenderContext();
      const body = render(url, context);
      const result = context.getResult();
      expect(result.redirect.pathname).toEqual(redirectPath);
    });
  });
});
