import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import { BrowserRouter, ServerRouter } from 'react-router';
import Routes from './Routes';
import './index.css';

if (typeof window !== 'undefined') {
  ReactDOM.render(
    <BrowserRouter>
      <Routes />
    </BrowserRouter>,
    document.getElementById('root')
  );
}

export default function render(url, serverContext) {
  return renderToString(
    <ServerRouter location={ url } context={ serverContext }>
      <Routes />
    </ServerRouter>
  );
}
