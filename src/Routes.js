import React from 'react';
import { Match, Miss, Redirect } from 'react-router';
import { LandingPage, SearchPage, NotFoundPage } from './containers';

// This is only used for testing that redirects work correct in the
// client and when rendering in the server.
const RedirectLandingPage = () => <Redirect to="/" />;

const Routes = () => (
  <div>
    <Match exactly pattern="/" component={ LandingPage } />

    {/* Search view */}
    <Match exactly pattern="/s" component={ SearchPage } />
    <Miss component={ NotFoundPage } />
  </div>
);

export default Routes;
