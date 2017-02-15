import React from 'react';
import { find } from 'lodash';
import { Redirect, matchPath } from 'react-router-dom';
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
  { path: '/', exact: true, name: 'LandingPage', component: props => <LandingPage {...props} /> },
  {
    path: '/s',
    exact: true,
    name: 'SearchPage',
    component: props => <SearchPage {...props} />,
    loadData: SearchPage ? SearchPage.loadData : null,
    routes: [
      {
        path: '/s/filters',
        exact: true,
        name: 'SearchFiltersPage',
        component: props => <SearchPage {...props} tab="filters" />,
        loadData: SearchPage ? SearchPage.loadData : null,
      },
      {
        path: '/s/listings',
        exact: true,
        name: 'SearchListingsPage',
        component: props => <SearchPage {...props} tab="listings" />,
        loadData: SearchPage ? SearchPage.loadData : null,
      },
      {
        path: '/s/map',
        exact: true,
        name: 'SearchMapPage',
        component: props => <SearchPage {...props} tab="map" />,
        loadData: SearchPage ? SearchPage.loadData : null,
      },
    ],
  },
  {
    path: '/l',
    exact: true,
    name: 'ListingBasePage',
    component: RedirectLandingPage,
    routes: [
      {
        path: '/l/:slug/:id',
        exact: true,
        name: 'ListingPage',
        component: props => <ListingPage {...props} />,
      },
    ],
  },
  {
    path: '/u',
    exact: true,
    name: 'ProfileBasePage',
    component: RedirectLandingPage,
    routes: [
      {
        path: '/u/:displayName',
        exact: true,
        name: 'ProfilePage',
        component: props => <ProfilePage {...props} />,
        routes: [
          {
            path: '/u/:displayName/edit',
            auth: true,
            exact: true,
            name: 'EditProfilePage',
            component: props => <EditProfilePage {...props} />,
          },
        ],
      },
    ],
  },
  {
    path: '/checkout',
    exact: true,
    name: 'CheckoutBasePage',
    component: RedirectLandingPage,
    routes: [
      {
        path: '/checkout/:listingId',
        exact: true,
        name: 'CheckoutPage',
        component: props => <CheckoutPage {...props} />,
      },
    ],
  },
  {
    path: '/login',
    exact: true,
    name: 'LogInPage',
    component: props => <AuthenticationPage {...props} tab="login" />,
  },
  {
    path: '/signup',
    exact: true,
    name: 'SignUpPage',
    component: props => <AuthenticationPage {...props} tab="signup" />,
  },
  {
    path: '/password',
    exact: true,
    name: 'PasswordPage',
    component: props => <PasswordForgottenPage {...props} />,
  },
  {
    path: '/password/forgotten',
    exact: true,
    name: 'PasswordForgottenPage',
    component: props => <PasswordForgottenPage {...props} />,
  },
  {
    path: '/password/change',
    exact: true,
    name: 'PasswordChangePage',
    component: props => <PasswordChangePage {...props} />,
  },
  {
    path: '/orders',
    auth: true,
    exact: true,
    name: 'OrdersPage',
    component: props => <InboxPage {...props} filter="orders" />,
  },
  {
    path: '/sales',
    auth: true,
    exact: true,
    name: 'SalesPage',
    component: props => <InboxPage {...props} filter="sales" />,
  },
  {
    path: '/order/:id',
    auth: true,
    exact: true,
    name: 'OrderPage',
    component: RedirectLandingPage,
    routes: [
      {
        path: '/order/:id/details',
        auth: true,
        exact: true,
        name: 'OrderDetailsPage',
        component: props => <OrderPage {...props} tab="details" />,
      },
      {
        path: '/order/:id/discussion',
        auth: true,
        exact: true,
        name: 'OrderDiscussionPage',
        component: props => <OrderPage {...props} tab="discussion" />,
      },
    ],
  },
  {
    path: '/sale/:id',
    auth: true,
    exact: true,
    name: 'SalePage',
    component: props => <SalesConversationPage {...props} tab="discussion" />,
    routes: [
      {
        path: '/sale/:id/details',
        auth: true,
        exact: true,
        name: 'SaleDetailsPage',
        component: props => <SalesConversationPage {...props} tab="discussion" />,
      },
      {
        path: '/sale/:id/discussion',
        auth: true,
        exact: true,
        name: 'SaleDiscussionPage',
        component: props => <SalesConversationPage {...props} tab="discussion" />,
      },
    ],
  },
  {
    path: '/listings',
    auth: true,
    exact: true,
    name: 'ManageListingsPage',
    component: props => <ManageListingsPage {...props} />,
  },
  {
    path: '/account',
    auth: true,
    exact: true,
    name: 'AccountPage',
    component: () => <Redirect to="/account/contact-details" />,
    routes: [
      {
        path: '/account/contact-details',
        auth: true,
        exact: true,
        name: 'ContactDetailsPage',
        component: props => <ContactDetailsPage {...props} />,
      },
      {
        path: '/account/payout-preferences',
        auth: true,
        exact: true,
        name: 'PayoutPreferencesPage',
        component: props => <PayoutPreferencesPage {...props} />,
      },
      {
        path: '/account/security',
        auth: true,
        exact: true,
        name: 'SecurityPage',
        component: props => <SecurityPage {...props} />,
      },
    ],
  },
  {
    path: '/styleguide',
    exact: true,
    name: 'Styleguide',
    component: props => <StyleguidePage {...props} />,
  },
  {
    path: '/styleguide/:component',
    exact: true,
    name: 'StyleguideComponent',
    component: props => <StyleguidePage {...props} />,
  },
  {
    path: '/styleguide/:component/:example',
    exact: true,
    name: 'StyleguideComponentExample',
    component: props => <StyleguidePage {...props} />,
  },
  {
    path: '/styleguide/:component/:example/:type',
    exact: true,
    name: 'StyleguideComponentExampleRaw',
    component: props => <StyleguidePage {...props} />,
  },
];

const flattenRoutes = routesArray =>
  routesArray.reduce((a, b) => a.concat(b.routes ? [b].concat(flattenRoutes(b.routes)) : b), []);

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
  return pathToRegexp.compile(route.path);
};

/**
 * Shorthand for single path call. (```pathByRouteName('ListingPage', routes, { id: uuidX });```)
 */
const pathByRouteName = (nameToFind, routes, params = {}) =>
  toPathByRouteName(nameToFind, routes)(params);

/**
 * matchRoutesToLocation helps to figure out which routes are related to given location.
 */
const matchRoutesToLocation = (routes, location, matchedRoutes = [], params = {}) => {
  let parameters = { ...params };
  let matched = [...matchedRoutes];

  routes.forEach(route => {
    const { exact = false } = route;
    const match = !route.path || matchPath(location.pathname, route.path, { exact });

    if (match) {
      matched.push(route);

      if (match.params) {
        parameters = { ...parameters, ...match.params };
      }
    }

    if (route.routes) {
      const { matchedRoutes: subRouteMatches, params: subRouteParams } = matchRoutesToLocation(
        route.routes,
        location,
        matched,
        parameters,
      );
      matched = matched.concat(subRouteMatches);
      parameters = { ...parameters, ...subRouteParams };
    }
  });

  return { matchedRoutes: matched, params: parameters };
};

const matchPathnameCreator = routes =>
  (location, matchedRoutes = [], params = {}) =>
    matchRoutesToLocation(routes, { pathname: location }, matchedRoutes, params);

/**
 * matchRoutesToLocation helps to figure out which routes are related to given location.
 */
const matchPathname = matchPathnameCreator(routesConfiguration);

// Exported helpers
export { findRouteByName, flattenRoutes, matchPathname, toPathByRouteName, pathByRouteName };

export default routesConfiguration;
