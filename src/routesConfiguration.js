import React from 'react';
import { Redirect } from 'react-router-dom';
import { flattenRoutes } from './util/routeHelpers';

import {
  AuthenticationPage,
  CheckoutPage,
  ContactDetailsPage,
  EditProfilePage,
  InboxPage,
  LandingPage,
  ListingPage,
  ManageListingsPage,
  NotFoundPage,
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

const RedirectToLandingPage = () => <Redirect to="/" />;

const routesConfiguration = [
  { path: '/', exact: true, name: 'LandingPage', component: LandingPage },
  {
    path: '/s',
    exact: true,
    name: 'SearchPage',
    component: SearchPage,
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
    component: RedirectToLandingPage,
    routes: [
      { path: '/l/:slug/:id', exact: true, name: 'ListingPage', component: ListingPage },
    ],
  },
  {
    path: '/u',
    exact: true,
    name: 'ProfileBasePage',
    component: RedirectToLandingPage,
    routes: [
      {
        path: '/u/:displayName',
        exact: true,
        name: 'ProfilePage',
        component: ProfilePage,
        routes: [
          {
            path: '/u/:displayName/edit',
            auth: true,
            exact: true,
            name: 'EditProfilePage',
            component: EditProfilePage,
          },
        ],
      },
    ],
  },
  {
    path: '/checkout',
    exact: true,
    name: 'CheckoutBasePage',
    component: RedirectToLandingPage,
    routes: [
      {
        path: '/checkout/:listingId',
        exact: true,
        name: 'CheckoutPage',
        component: CheckoutPage,
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
  { path: '/password', exact: true, name: 'PasswordPage', component: PasswordForgottenPage },
  {
    path: '/password/forgotten',
    exact: true,
    name: 'PasswordForgottenPage',
    component: PasswordForgottenPage,
  },
  {
    path: '/password/change',
    exact: true,
    name: 'PasswordChangePage',
    component: PasswordChangePage,
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
    component: RedirectToLandingPage,
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
    component: ManageListingsPage,
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
        component: ContactDetailsPage,
      },
      {
        path: '/account/payout-preferences',
        auth: true,
        exact: true,
        name: 'PayoutPreferencesPage',
        component: PayoutPreferencesPage,
      },
      {
        path: '/account/security',
        auth: true,
        exact: true,
        name: 'SecurityPage',
        component: SecurityPage,
      },
    ],
  },
  { path: '/styleguide', exact: true, name: 'Styleguide', component: StyleguidePage },
  {
    path: '/styleguide/:component',
    exact: true,
    name: 'StyleguideComponent',
    component: StyleguidePage,
  },
  {
    path: '/styleguide/:component/:example',
    exact: true,
    name: 'StyleguideComponentExample',
    component: StyleguidePage,
  },
  {
    path: '/styleguide/:component/:example/:type',
    exact: true,
    name: 'StyleguideComponentExampleRaw',
    component: StyleguidePage,
  },
];

export default flattenRoutes(routesConfiguration);
