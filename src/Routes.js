import React from 'react';
import { Match, Miss, Redirect } from 'react-router';
import {
  AuthenticationPage,
  CheckoutPage,
  ConversationPage,
  ContactDetailsPage,
  InboxPage,
  LandingPage,
  ListingPage,
  ManageListingsPage,
  OrderPage,
  PasswordChangePage,
  PasswordForgottenPage,
  ProfilePage,
  EditProfilePage,
  SalesConversationPage,
  SearchPage,
  NotFoundPage,
} from './containers';

// This is only used for testing that redirects work correct in the
// client and when rendering in the server.
const RedirectLandingPage = () => <Redirect to="/" />;

// Fake authentication module
// An example from react-router v4 repository
export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    cb();
    setTimeout(cb, 100); // weird bug if async?
  }
};

// User must be authenticated before he can see certain pages
export const MatchWhenAuthorized = ({ component: Component, ...rest }) => (
  <Match {...rest} render={
    (props) => (
      fakeAuth.isAuthenticated ?
      ( <Component { ...props } /> ) :
      ( <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )
  }/>
);

class Routes extends React.Component {
  getChildContext() {
    return { router: this.props.router };
  }

  render() {
    return (
      <div>
        <Match exactly pattern="/" component={ LandingPage } />

        {/* Search view */}
        <Match exactly pattern="/s" component={ SearchPage } />

        {/* Listing view */}
        <Match exactly pattern="/l/:slug" component={ ListingPage } />
        <Match exactly pattern="/l" component={ RedirectLandingPage } />

        {/* profile / storefront view */}
        <Match exactly pattern="/u/:displayName" component={ ProfilePage } />
        <MatchWhenAuthorized
          exactly
          pattern="/u/:displayName/edit"
          component={ EditProfilePage } />
        <Match exactly pattern="/u" component={ RedirectLandingPage } />

        {/* checkout */}
        <Match exactly pattern="/checkout/:listingId" component={ CheckoutPage } />

        {/* Login and signup */}
        <Match
          exactly
          pattern="/login"
          component={
            (props) => <AuthenticationPage { ...props } tab='login' />
          } />
        <Match
          exactly
          pattern="/signup"
          component={
            (props) => <AuthenticationPage { ...props } tab='signup' />
          } />

        {/* Password forgotten */}
        <Match
          exactly
          pattern="/password/forgotten"
          component={ PasswordForgottenPage } />

        {/* Change password */}
        <Match
          exactly
          pattern="/password/change"
          component={ PasswordChangePage } />

        {/* Inbox and filtered views */}
        <MatchWhenAuthorized
          exactly
          pattern="/inbox"
          component={ (props) => <InboxPage { ...props } filter="inbox" /> } />
        <MatchWhenAuthorized
          exactly
          pattern="/orders"
          component={ (props) => <InboxPage { ...props } filter="orders" /> } />
        <MatchWhenAuthorized
          exactly
          pattern="/sales"
          component={ (props) => <InboxPage { ...props } filter="sales" /> } />

        {/* Order/Conversation and mobile views */}
        <MatchWhenAuthorized
          exactly
          pattern="/conversation/:id"
          component={ ConversationPage } />
        <MatchWhenAuthorized
          exactly
          pattern="/order/:id"
          component={ (props) => <OrderPage { ...props } tab="discussion" /> } />
        <MatchWhenAuthorized
          exactly
          pattern="/order/:id/discussion"
          component={ (props) => <OrderPage { ...props } tab="discussion" /> } />
        <MatchWhenAuthorized
          exactly
          pattern="/order/:id/details"
          component={ (props) => <OrderPage { ...props } tab="details" /> } />
        <MatchWhenAuthorized
          exactly
          pattern="/sale/:id"
          component={ (props) => <SalesConversationPage { ...props } tab="discussion" /> } />
        <MatchWhenAuthorized
          exactly
          pattern="/sale/:id/discussion"
          component={ (props) => <SalesConversationPage { ...props } tab="discussion" /> } />
        <MatchWhenAuthorized
          exactly
          pattern="/sale/:id/details"
          component={ (props) => <SalesConversationPage { ...props } tab="details" /> } />

        {/* Manage listings */}
        <MatchWhenAuthorized
          exactly
          pattern="/listings"
          component={ ManageListingsPage } />

        {/* Account settings */}
        <MatchWhenAuthorized
          exactly
          pattern="/account/contact-details"
          component={
            (props) => <ContactDetailsPage { ...props } router={router} />
          } />

        <Miss component={ NotFoundPage } />

      </div>
    );
  }
}

Routes.childContextTypes = {
  router: React.PropTypes.object
};

export default Routes;
