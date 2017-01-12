import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { forEach } from 'lodash';
import { createServerRenderContext } from 'react-router';
import { ClientApp, ServerApp } from './app';

const render = (url, context) => (
  ReactDOMServer.renderToString(
    <ServerApp url={ url } context={ context }/>
  )
);

describe('Application', () => {
  it('renders in the client without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ClientApp />, div);
  });

  it('renders in the server without crashing', () => {
    render('/', createServerRenderContext());
  });

  it('renders correct routes in the server', () => {
    const urlTitles = {
      '/': 'Index page',
      '/search': 'Search page',
      '/this-url-should-not-be-found': 'Page not found',
    };
    forEach(urlTitles, (title, url) => {
      const body = render(url, createServerRenderContext());
      expect(body.includes(`>${title}</h1>`)).toEqual(true);
    });
  });
});
