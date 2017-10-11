import React from 'react';
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
  PasswordChangePage,
  PasswordResetPage,
  PasswordRecoveryPage,
  PayoutPreferencesPage,
  ProfilePage,
  ProfileSettingsPage,
  SalePage,
  SearchPage,
  SecurityPage,
  StyleguidePage,
  EmailVerificationPage,
} from './containers';

// routeConfiguration needs to initialize containers first
// Otherwise, components will import form container eventually and
// at that point css bundling / imports will happen in wrong order.
import { NamedRedirect } from './components';

export const ACCOUNT_SETTINGS_PAGES = ['ContactDetailsPage', 'PasswordChangePage'];

// https://en.wikipedia.org/wiki/Universally_unique_identifier#Nil_UUID
const draftId = '00000000-0000-0000-0000-000000000000';
const draftSlug = 'draft';

const RedirectToLandingPage = () => <NamedRedirect name="LandingPage" />;

// Our routes are exact by default.
// See behaviour from Routes.js where Route is created.
const routeConfiguration = () => {
  return [
    { path: '/', name: 'LandingPage', component: props => <LandingPage {...props} /> },
    {
      path: '/s',
      name: 'SearchPage',
      component: props => <SearchPage {...props} />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/s/filters',
      name: 'SearchFiltersPage',
      component: props => <SearchPage {...props} tab="filters" />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/s/listings',
      name: 'SearchListingsPage',
      component: props => <SearchPage {...props} tab="listings" />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/s/map',
      name: 'SearchMapPage',
      component: props => <SearchPage {...props} tab="map" />,
      loadData: SearchPage.loadData,
    },
    {
      path: '/l',
      name: 'ListingBasePage',
      component: RedirectToLandingPage,
    },
    {
      path: '/l/:slug/:id',
      name: 'ListingPage',
      component: props => <ListingPage {...props} tab="listing" />,
      loadData: ListingPage.loadData,
    },
    {
      path: '/l/:slug/:id/book',
      name: 'ListingPage',
      component: props => <ListingPage {...props} tab="book" />,
      loadData: ListingPage.loadData,
    },
    {
      path: '/l/:slug/:id/checkout',
      auth: true,
      name: 'CheckoutPage',
      component: props => <CheckoutPage {...props} />,
      setInitialValues: CheckoutPage.setInitialValues,
    },
    {
      auth: true,
      path: '/l/new',
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
      name: 'EditListingPage',
      component: props => <EditListingPage {...props} />,
      loadData: EditListingPage.loadData,
    },

    // Canonical path should be after the `/l/new` path since they
    // conflict and `new` is not a valid listing UUID.
    {
      path: '/l/:id',
      name: 'ListingPageCanonical',
      component: props => <ListingPage {...props} tab="listing" />,
      loadData: ListingPage.loadData,
    },
    {
      path: '/u',
      name: 'ProfileBasePage',
      component: RedirectToLandingPage,
    },
    {
      path: '/u/:displayName',
      name: 'ProfilePage',
      component: props => <ProfilePage {...props} />,
    },
    {
      path: '/profile-settings',
      auth: true,
      name: 'ProfileSettingsPage',
      component: props => <ProfileSettingsPage {...props} />,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: props => <AuthenticationPage {...props} tab="login" />,
    },
    {
      path: '/signup',
      name: 'SignupPage',
      component: props => <AuthenticationPage {...props} tab="signup" />,
    },
    {
      path: '/recover-password',
      name: 'PasswordRecoveryPage',
      component: props => <PasswordRecoveryPage {...props} />,
    },
    {
      path: '/inbox',
      auth: true,
      name: 'InboxBasePage',
      component: () => <NamedRedirect name="InboxPage" params={{ tab: 'sales' }} />,
    },
    {
      path: '/inbox/:tab',
      auth: true,
      name: 'InboxPage',
      component: props => <InboxPage {...props} />,
      loadData: InboxPage.loadData,
    },
    {
      path: '/order/:id',
      auth: true,
      name: 'OrderPage',
      component: RedirectToLandingPage,
    },
    {
      path: '/order/:id/details',
      auth: true,
      name: 'OrderDetailsPage',
      component: props => <OrderPage {...props} tab="details" />,
      loadData: OrderPage.loadData,
    },
    {
      path: '/order/:id/discussion',
      auth: true,
      name: 'OrderDiscussionPage',
      component: props => <OrderPage {...props} tab="discussion" />,
      loadData: OrderPage.loadData,
    },
    {
      path: '/sale/:id',
      auth: true,
      name: 'SalePage',
      component: props => <SalePage {...props} tab="discussion" />,
    },
    {
      path: '/sale/:id/details',
      auth: true,
      name: 'SaleDetailsPage',
      component: props => <SalePage {...props} tab="details" />,
      loadData: SalePage.loadData,
    },
    {
      path: '/sale/:id/discussion',
      auth: true,
      name: 'SaleDiscussionPage',
      component: props => <SalePage {...props} tab="discussion" />,
      loadData: SalePage.loadData,
    },
    {
      path: '/listings',
      auth: true,
      name: 'ManageListingsPage',
      component: props => <ManageListingsPage {...props} />,
      loadData: ManageListingsPage.loadData,
    },
    {
      path: '/account',
      auth: true,
      name: 'AccountSettingsPage',
      component: () => <NamedRedirect name="ContactDetailsPage" />,
    },
    {
      path: '/account/contact-details',
      auth: true,
      name: 'ContactDetailsPage',
      component: props => <ContactDetailsPage {...props} />,
      loadData: ContactDetailsPage.loadData,
    },
    {
      path: '/account/change-password',
      auth: true,
      name: 'PasswordChangePage',
      component: props => <PasswordChangePage {...props} />,
    },
    {
      path: '/account/payout-preferences',
      auth: true,
      name: 'PayoutPreferencesPage',
      component: props => <PayoutPreferencesPage {...props} />,
    },
    {
      path: '/account/security',
      auth: true,
      name: 'SecurityPage',
      component: props => <SecurityPage {...props} />,
    },
    {
      path: '/styleguide',
      name: 'Styleguide',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/g/:group',
      name: 'StyleguideGroup',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/c/:component',
      name: 'StyleguideComponent',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/c/:component/:example',
      name: 'StyleguideComponentExample',
      component: props => <StyleguidePage {...props} />,
    },
    {
      path: '/styleguide/c/:component/:example/raw',
      name: 'StyleguideComponentExampleRaw',
      component: props => <StyleguidePage raw {...props} />,
    },
    {
      path: '/notfound',
      name: 'NotFoundPage',
      component: props => <NotFoundPage {...props} />,
    },

    // Do not change this path!
    //
    // The API expects that the Starter App implements /reset-password endpoint
    {
      path: '/reset-password',
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
      name: 'EmailVerificationPage',
      component: props => <EmailVerificationPage {...props} />,
    },
  ];
};

export default routeConfiguration;
