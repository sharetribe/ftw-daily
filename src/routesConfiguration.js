import React from 'react';
import { NamedRedirect } from './components';
import {
  AuthenticationPage,
  CheckoutPage,
  ContactDetailsPage,
  EditListingPage,
  InboxPage,
  LandingPage,
  ListingPage,
  ManageListingsPage,
  NotFoundPage,
  OrderPage,
  PasswordForgottenPage,
  PasswordResetPage,
  PayoutPreferencesPage,
  ProfilePage,
  ProfileSettingsPage,
  SalePage,
  SearchPage,
  SecurityPage,
  StyleguidePage,
  EmailVerificationPage,
} from './containers';

// https://en.wikipedia.org/wiki/Universally_unique_identifier#Nil_UUID
const draftId = '00000000-0000-0000-0000-000000000000';
const draftSlug = 'draft';

const RedirectToLandingPage = () => <NamedRedirect name="LandingPage" />;

const routesConfiguration = [
  { path: '/', exact: true, name: 'LandingPage', component: props => <LandingPage {...props} /> },
  {
    path: '/s',
    exact: true,
    name: 'SearchPage',
    component: props => <SearchPage {...props} />,
    loadData: (params, search) => SearchPage.loadData(params, search),
    routes: [
      {
        path: '/s/filters',
        exact: true,
        name: 'SearchFiltersPage',
        component: props => <SearchPage {...props} tab="filters" />,
        loadData: (params, search) => SearchPage.loadData(params, search),
      },
      {
        path: '/s/listings',
        exact: true,
        name: 'SearchListingsPage',
        component: props => <SearchPage {...props} tab="listings" />,
        loadData: (params, search) => SearchPage.loadData(params, search),
      },
      {
        path: '/s/map',
        exact: true,
        name: 'SearchMapPage',
        component: props => <SearchPage {...props} tab="map" />,
        loadData: (params, search) => SearchPage.loadData(params, search),
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
        loadData: (params, search) => ListingPage.loadData(params, search),
        component: props => <ListingPage {...props} tab="listing" />,
      },
      {
        path: '/l/:slug/:id/book',
        exact: true,
        name: 'ListingPage',
        loadData: (params, search) => ListingPage.loadData(params, search),
        component: props => <ListingPage {...props} tab="book" />,
      },
      {
        path: '/l/:slug/:id/checkout',
        auth: true,
        exact: true,
        name: 'CheckoutPage',
        setInitialValues: initialValues => CheckoutPage.setInitialValues(initialValues),
        component: props => <CheckoutPage {...props} />,
      },
      {
        auth: true,
        path: '/l/new',
        exact: true,
        name: 'NewListingPage',
        component: () => (
          <NamedRedirect
            name="EditListingPage"
            params={{ slug: draftSlug, id: draftId, type: 'new', tab: 'description' }}
          />
        ),
      },
      {
        auth: true,
        path: '/l/:slug/:id/:type/:tab',
        exact: true,
        name: 'EditListingPage',
        component: props => <EditListingPage {...props} />,
        loadData: (params, search) => EditListingPage.loadData(params, search),
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
      },
    ],
  },
  {
    path: '/profile-settings',
    auth: true,
    exact: true,
    name: 'ProfileSettingsPage',
    component: props => <ProfileSettingsPage {...props} />,
  },
  {
    path: '/login',
    exact: true,
    name: 'LoginPage',
    component: props => <AuthenticationPage {...props} tab="login" />,
  },
  {
    path: '/signup',
    exact: true,
    name: 'SignupPage',
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
    path: '/inbox',
    auth: true,
    exact: true,
    name: 'InboxBasePage',
    component: () => <NamedRedirect name="InboxPage" params={{ tab: 'sales' }} />,
  },
  {
    path: '/inbox/:tab',
    auth: true,
    exact: true,
    name: 'InboxPage',
    component: props => <InboxPage {...props} />,
    loadData: (params, search) => InboxPage.loadData(params, search),
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
        loadData: params => OrderPage.loadData(params),
      },
      {
        path: '/order/:id/discussion',
        auth: true,
        exact: true,
        name: 'OrderDiscussionPage',
        component: props => <OrderPage {...props} tab="discussion" />,
        loadData: params => OrderPage.loadData(params),
      },
    ],
  },
  {
    path: '/sale/:id',
    auth: true,
    exact: true,
    name: 'SalePage',
    component: props => <SalePage {...props} tab="discussion" />,
    routes: [
      {
        path: '/sale/:id/details',
        auth: true,
        exact: true,
        name: 'SaleDetailsPage',
        component: props => <SalePage {...props} tab="details" />,
        loadData: params => SalePage.loadData(params),
      },
      {
        path: '/sale/:id/discussion',
        auth: true,
        exact: true,
        name: 'SaleDiscussionPage',
        component: props => <SalePage {...props} tab="discussion" />,
        loadData: params => SalePage.loadData(params),
      },
    ],
  },
  {
    path: '/listings',
    auth: true,
    exact: true,
    name: 'ManageListingsPage',
    component: props => <ManageListingsPage {...props} />,
    loadData: (params, search) => ManageListingsPage.loadData(params, search),
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
    path: '/styleguide/g/:group',
    exact: true,
    name: 'StyleguideGroup',
    component: props => <StyleguidePage {...props} />,
  },
  {
    path: '/styleguide/c/:component',
    exact: true,
    name: 'StyleguideComponent',
    component: props => <StyleguidePage {...props} />,
  },
  {
    path: '/styleguide/c/:component/:example',
    exact: true,
    name: 'StyleguideComponentExample',
    component: props => <StyleguidePage {...props} />,
  },
  {
    path: '/styleguide/c/:component/:example/raw',
    exact: true,
    name: 'StyleguideComponentExampleRaw',
    component: props => <StyleguidePage raw {...props} />,
  },
  {
    path: '/notfound',
    exact: true,
    name: 'NotFoundPage',
    component: props => <NotFoundPage {...props} />,
  },

  // Do not change this path!
  //
  // The API expects that the Starter App implements /reset-password endpoint
  {
    path: '/reset-password',
    exact: true,
    name: 'PasswordResetPage',
    component: props => <PasswordResetPage {...props} />,
  },

  // Do not change this path!
  //
  // The API expects that the Starter App implements /verify-email endpoint
  {
    path: '/verify-email',
    auth: true,
    authPage: 'LoginPage',
    exact: true,
    name: 'EmailVerificationPage',
    component: props => <EmailVerificationPage {...props} />,
  },
];

export default routesConfiguration;
