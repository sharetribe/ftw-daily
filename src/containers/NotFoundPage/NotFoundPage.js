import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as propTypes from '../../util/propTypes';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { NamedLink, PageLayout, Topbar } from '../../components';

export class NotFoundPageComponent extends Component {
  componentWillMount() {
    // The StaticRouter component used in server side rendering
    // provides the context object. We attach a `notfound` flag to
    // the context to tell the server to change the response status
    // code into a 404.
    this.props.staticContext.notfound = true;
  }

  render() {
    const {
      authInfoError,
      authInProgress,
      currentUser,
      currentUserHasListings,
      history,
      isAuthenticated,
      location,
      logoutError,
      notificationCount,
      onLogout,
      onManageDisableScrolling,
    } = this.props;

    return (
      <PageLayout authInfoError={authInfoError} logoutError={logoutError} title="Page not found">
        <Topbar
          authInProgress={authInProgress}
          currentUser={currentUser}
          currentUserHasListings={currentUserHasListings}
          history={history}
          isAuthenticated={isAuthenticated}
          location={location}
          notificationCount={notificationCount}
          onLogout={onLogout}
          onManageDisableScrolling={onManageDisableScrolling}
        />
        <NamedLink name="LandingPage">Home</NamedLink>
      </PageLayout>
    );
  }
};

NotFoundPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  logoutError: null,
  notificationCount: 0,
  staticContext: {},
};

const { bool, func, instanceOf, number, object, shape } = PropTypes;

NotFoundPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  isAuthenticated: bool.isRequired,
  logoutError: instanceOf(Error),
  notificationCount: number,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,

  // context object from StaticRouter, injected by the withRouter wrapper
  staticContext: object,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({ state: object }).isRequired,
};

const mapStateToProps = state => {
  // PageLayout needs authInfoError and logoutError, Topbar needs isAuthenticated
  const { authInfoError, isAuthenticated, logoutError } = state.Auth;
  // Topbar needs user info.
  const {
    currentUser,
    currentUserHasListings,
    currentUserNotificationCount: notificationCount,
  } = state.user;
  return {
    authInfoError,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    currentUserNotificationCount: notificationCount,
    isAuthenticated,
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});

const NotFoundPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(
  NotFoundPageComponent
);

export default NotFoundPage;
