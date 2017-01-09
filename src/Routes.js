import React from 'react';
import { Match, Miss, Redirect } from 'react-router';
import { HomePage, SearchPage, NotFoundPage } from './containers';

// This is only used for testing that redirects work correct in the
// client and when rendering in the server.
const RedirectTestPage = () => (
  <Redirect to="/" />
);

const Routes = () => (
  <div>
    <Match exactly pattern="/" component={ HomePage } />
    <Match exactly pattern="/search" component={ SearchPage } />
    <Match exactly pattern="/home" component={ RedirectTestPage } />
    <Miss component={ NotFoundPage } />
  </div>
);

export default Routes;
