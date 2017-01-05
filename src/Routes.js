import React from 'react';
import { Match, Miss, Redirect } from 'react-router';
import * as pages from './pages';

const RedirectTestPage = () => (
  <Redirect to="/" />
);

const Routes = () => (
  <div>
    <Match exactly pattern="/" component={ pages.Home } />
    <Match exactly pattern="/search" component={ pages.Search } />
    <Match exactly pattern="/home" component={ RedirectTestPage } />
    <Miss component={ pages.NotFound } />
  </div>
);

export default Routes;
