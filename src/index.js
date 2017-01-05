import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { BrowserRouter, ServerRouter } from 'react-router';
import Routes from './Routes';
import './index.css';

const ClientApp = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

const ServerApp = (props) => (
  <ServerRouter { ...props } >
    <Routes />
  </ServerRouter>
);

if (typeof window !== 'undefined') {
  ReactDOM.render(<ClientApp />, document.getElementById('root'));
}

const renderApp = (url, serverContext) => {
  const body = ReactDOMServer.renderToString(
    <ServerApp url={ url } context={ serverContext }/>
  );
  const head = Helmet.rewind();
  return { head, body };
};

export default renderApp;
