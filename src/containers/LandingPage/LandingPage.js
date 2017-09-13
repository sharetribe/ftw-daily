import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sendVerificationEmail } from '../../ducks/user.duck';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { PageLayout, HeroSection, Topbar } from '../../components';
import * as propTypes from '../../util/propTypes';
import { withFlattenedRoutes } from '../../util/contextHelpers';

import css from './LandingPage.css';

export const LandingPageComponent = props => {
  const {
    authInfoError,
    authInProgress,
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    flattenedRoutes,
    history,
    isAuthenticated,
    location,
    logoutError,
    notificationCount,
    onLogout,
    onManageDisableScrolling,
    scrollingDisabled,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    onResendVerificationEmail,
  } = props;
  return (
    <PageLayout
      className={css.root}
      authInfoError={authInfoError}
      logoutError={logoutError}
      scrollingDisabled={scrollingDisabled}
      title="Landing page"
    >
      <Topbar
        isAuthenticated={isAuthenticated}
        authInProgress={authInProgress}
        currentUser={currentUser}
        currentUserHasListings={currentUserHasListings}
        currentUserHasOrders={currentUserHasOrders}
        notificationCount={notificationCount}
        history={history}
        location={location}
        onLogout={onLogout}
        onManageDisableScrolling={onManageDisableScrolling}
        onResendVerificationEmail={onResendVerificationEmail}
        sendVerificationEmailInProgress={sendVerificationEmailInProgress}
        sendVerificationEmailError={sendVerificationEmailError}
      />
      <div className={css.heroContainer}>
        <HeroSection
          className={css.hero}
          flattenedRoutes={flattenedRoutes}
          history={history}
          location={location}
        />
      </div>
    </PageLayout>
  );
};

LandingPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  currentUserHasOrders: null,
  logoutError: null,
  notificationCount: 0,
  sendVerificationEmailError: null,
};

const { array, bool, func, instanceOf, number, object } = PropTypes;

LandingPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  currentUserHasOrders: bool,
  isAuthenticated: bool.isRequired,
  logoutError: instanceOf(Error),
  notificationCount: number,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  scrollingDisabled: bool.isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: instanceOf(Error),
  onResendVerificationEmail: func.isRequired,

  // from withFlattenedRoutes
  flattenedRoutes: array.isRequired,

  // from withRouter
  history: object.isRequired,
  location: object.isRequired,
};

const mapStateToProps = state => {
  const { authInfoError, isAuthenticated, logoutError } = state.Auth;
  const {
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    currentUserNotificationCount: notificationCount,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  } = state.user;
  return {
    authInfoError,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    isAuthenticated,
    logoutError,
    notificationCount,
    scrollingDisabled: isScrollingDisabled(state),
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
});

const LandingPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withFlattenedRoutes
)(LandingPageComponent);

export default LandingPage;
