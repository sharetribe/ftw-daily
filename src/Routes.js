import React from 'react';
import { Match, Miss, Redirect } from 'react-router';
import {
  AuthenticationPage,
  CheckoutPage,
  InboxPage,
  LandingPage,
  ListingPage,
  ProfilePage,
  EditProfilePage,
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

        <Miss component={ NotFoundPage } />

      </div>
    );
  }
}

Routes.childContextTypes = {
  router: React.PropTypes.object
};

export default Routes;
