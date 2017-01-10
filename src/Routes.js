import React from 'react';
import { Match, Miss, Redirect } from 'react-router';
import {
  LandingPage,
  ListingPage,
  ProfilePage,
  SearchPage,
  NotFoundPage,
} from './containers';

// This is only used for testing that redirects work correct in the
// client and when rendering in the server.
const RedirectLandingPage = () => <Redirect to="/" />;

const Routes = () => (
  <div>
    <Match exactly pattern="/" component={ LandingPage } />

    {/* Search view */}
    <Match exactly pattern="/s" component={ SearchPage } />

    {/* Listing view */}
    <Match exactly pattern="/l/:slug" component={ ListingPage } />
    <Match exactly pattern="/l" component={ RedirectLandingPage } />

    {/* profile / storefront view */}
    <Match exactly pattern="/u/:displayName" component={ ProfilePage } />
    <Match exactly pattern="/u" component={ RedirectLandingPage } />
    <Miss component={ NotFoundPage } />
  </div>
);

export default Routes;
