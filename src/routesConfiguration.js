import React from 'react';
import { find } from 'lodash';
import { Redirect } from 'react-router';
import pathToRegexp from 'path-to-regexp';
import {
  AuthenticationPage,
  CheckoutPage,
  ContactDetailsPage,
  EditProfilePage,
  InboxPage,
  LandingPage,
  ListingPage,
  ManageListingsPage,
  OrderPage,
  PasswordChangePage,
  PasswordForgottenPage,
  PayoutPreferencesPage,
  ProfilePage,
  SalesConversationPage,
  SearchPage,
  SecurityPage,
  StyleguidePage,
} from './containers';

// This is only used for testing that redirects work correct in the
// client and when rendering in the server.
const RedirectLandingPage = () => <Redirect to="/" />;

const routesConfiguration = [
  { pattern: '/', exactly: true, name: 'LandingPage', component: LandingPage },
  {
    pattern: '/s',
    exactly: true,
    name: 'SearchPage',
    component: SearchPage,
    routes: [
      {
        pattern: '/s/filters',
        exactly: true,
        name: 'SearchFiltersPage',
        component: props => <SearchPage {...props} tab="filters" />,
      },
      {
        pattern: '/s/listings',
        exactly: true,
        name: 'SearchListingsPage',
        component: props => <SearchPage {...props} tab="listings" />,
      },
      {
        pattern: '/s/map',
        exactly: true,
        name: 'SearchMapPage',
        component: props => <SearchPage {...props} tab="map" />,
      },
    ],
  },
  {
    pattern: '/l',
    exactly: true,
    name: 'ListingBasePage',
    component: RedirectLandingPage,
    routes: [
      { pattern: '/l/:slug/:id', exactly: true, name: 'ListingPage', component: ListingPage },
    ],
  },
  {
    pattern: '/u',
    exactly: true,
    name: 'ProfileBasePage',
    component: RedirectLandingPage,
    routes: [
      {
        pattern: '/u/:displayName',
        exactly: true,
        name: 'ProfilePage',
        component: ProfilePage,
        routes: [
          {
            pattern: '/u/:displayName/edit',
            auth: true,
            exactly: true,
            name: 'EditProfilePage',
            component: EditProfilePage,
          },
        ],
      },
    ],
  },
  {
    pattern: '/checkout',
    exactly: true,
    name: 'CheckoutBasePage',
    component: RedirectLandingPage,
    routes: [
      {
        pattern: '/checkout/:listingId',
        exactly: true,
        name: 'CheckoutPage',
        component: CheckoutPage,
      },
    ],
  },
  {
    pattern: '/login',
    exactly: true,
    name: 'LogInPage',
    component: props => <AuthenticationPage {...props} tab="login" />,
  },
  {
    pattern: '/signup',
    exactly: true,
    name: 'SignUpPage',
    component: props => <AuthenticationPage {...props} tab="signup" />,
  },
  { pattern: '/password', exactly: true, name: 'PasswordPage', component: PasswordForgottenPage },
  {
    pattern: '/password/forgotten',
    exactly: true,
    name: 'PasswordForgottenPage',
    component: PasswordForgottenPage,
  },
  {
    pattern: '/password/change',
    exactly: true,
    name: 'PasswordChangePage',
    component: PasswordChangePage,
  },
  {
    pattern: '/orders',
    auth: true,
    exactly: true,
    name: 'OrdersPage',
    component: props => <InboxPage {...props} filter="orders" />,
  },
  {
    pattern: '/sales',
    auth: true,
    exactly: true,
    name: 'SalesPage',
    component: props => <InboxPage {...props} filter="sales" />,
  },
  {
    pattern: '/order/:id',
    auth: true,
    exactly: true,
    name: 'OrderPage',
    component: props => <OrderPage {...props} tab="discussion" />,
    routes: [
      {
        pattern: '/order/:id/details',
        auth: true,
        exactly: true,
        name: 'OrderDetailsPage',
        component: props => <OrderPage {...props} tab="details" />,
      },
      {
        pattern: '/order/:id/discussion',
        auth: true,
        exactly: true,
        name: 'OrderDiscussionPage',
        component: props => <OrderPage {...props} tab="discussion" />,
      },
    ],
  },
  {
    pattern: '/sale/:id',
    auth: true,
    exactly: true,
    name: 'SalePage',
    component: props => <SalesConversationPage {...props} tab="discussion" />,
    routes: [
      {
        pattern: '/sale/:id/details',
        auth: true,
        exactly: true,
        name: 'SaleDetailsPage',
        component: props => <SalesConversationPage {...props} tab="discussion" />,
      },
      {
        pattern: '/sale/:id/discussion',
        auth: true,
        exactly: true,
        name: 'SaleDiscussionPage',
        component: props => <SalesConversationPage {...props} tab="discussion" />,
      },
    ],
  },
  {
    pattern: '/listings',
    auth: true,
    exactly: true,
    name: 'ManageListingsPage',
    component: ManageListingsPage,
  },
  {
    pattern: '/account',
    auth: true,
    exactly: true,
    name: 'AccountPage',
    component: () => <Redirect to="/account/contact-details" />,
    routes: [
      {
        pattern: '/account/contact-details',
        auth: true,
        exactly: true,
        name: 'ContactDetailsPage',
        component: ContactDetailsPage,
      },
      {
        pattern: '/account/payout-preferences',
        auth: true,
        exactly: true,
        name: 'PayoutPreferencesPage',
        component: PayoutPreferencesPage,
      },
      {
        pattern: '/account/security',
        auth: true,
        exactly: true,
        name: 'SecurityPage',
        component: SecurityPage,
      },
    ],
  },
  { pattern: '/styleguide', exactly: true, name: 'Styleguide', component: StyleguidePage },
  {
    pattern: '/styleguide/:component',
    exactly: true,
    name: 'StyleguideComponent',
    component: StyleguidePage,
  },
  {
    pattern: '/styleguide/:component/:example',
    exactly: true,
    name: 'StyleguideComponentExample',
    component: StyleguidePage,
  },
  {
    pattern: '/styleguide/:component/:example/:type',
    exactly: true,
    name: 'StyleguideComponentExampleRaw',
    component: StyleguidePage,
  },
];

const flattenRoutes = routesArray =>
  routesArray.reduce((a, b) => a.concat(b.routes ? [ b ].concat(flattenRoutes(b.routes)) : b), []);

const findRouteByName = (nameToFind, routes) => {
  const flattenedRoutes = flattenRoutes(routes);
  return find(flattenedRoutes, route => route.name === nameToFind);
};

/**
 * E.g. ```const toListingPath = toPathByRouteName('ListingPage', routes);```
 * Then we can generate listing paths with given params (```toListingPath({ id: uuidX })```)
 */
const toPathByRouteName = (nameToFind, routes) => {
  const route = findRouteByName(nameToFind, routes);
  if (!route) {
    throw new Error(`Path "${nameToFind}" was not found.`);
  }
  return pathToRegexp.compile(route.pattern);
};

/**
 * Shorthand for single path call. (```pathByRouteName('ListingPage', routes, { id: uuidX });```)
 */
const pathByRouteName = (nameToFind, routes, params = {}) =>
  toPathByRouteName(nameToFind, routes)(params);

// Exported helpers
export { findRouteByName, flattenRoutes, toPathByRouteName, pathByRouteName };

export default routesConfiguration;
