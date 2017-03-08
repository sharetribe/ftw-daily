import React from 'react';
import { NamedRedirect } from './components';
import {
  AuthenticationPage,
  CheckoutPage,
  ContactDetailsPage,
  EditListingPage,
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

const RedirectToLandingPage = () => <NamedRedirect name="LandingPage" />;

const routesConfiguration = [
  { path: '/', exact: true, name: 'LandingPage', component: props => <LandingPage {...props} /> },
  {
    path: '/s',
    exact: true,
    name: 'SearchPage',
    component: props => <SearchPage {...props} />,
    routes: [
      {
        path: '/s/filters',
        exact: true,
        name: 'SearchFiltersPage',
        component: props => <SearchPage {...props} tab="filters" />,
      },
      {
        path: '/s/listings',
        exact: true,
        name: 'SearchListingsPage',
        component: props => <SearchPage {...props} tab="listings" />,
      },
      {
        path: '/s/map',
        exact: true,
        name: 'SearchMapPage',
        component: props => <SearchPage {...props} tab="map" />,
      },
    ],
  },
  {
    path: '/l',
    exact: true,
    name: 'ListingBasePage',
    component: RedirectToLandingPage,
    routes: [
      {
        path: '/l/:slug/:id',
        exact: true,
        name: 'ListingPage',
        component: props => <ListingPage {...props} />,
      },
      {
        path: '/l/new',
        exact: true,
        name: 'NewListingPage',
        component: props => <EditListingPage {...props} type={'new'} />,
      },
      {
        path: '/l/:slug/:id/edit',
        exact: true,
        name: 'EditListingPage',
        component: props => <EditListingPage {...props} type={'edit'} />,
      },
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
    component: RedirectToLandingPage,
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
    component: props => <ManageListingsPage {...props} />,
  },
  {
    path: '/account',
    auth: true,
    exact: true,
    name: 'AccountPage',
    component: () => <NamedRedirect name="ContactDetailsPage" />,
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

export default routesConfiguration;
