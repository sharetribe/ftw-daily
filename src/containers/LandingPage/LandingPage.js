import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
    flattenedRoutes,
    history,
    isAuthenticated,
    location,
    logoutError,
    notificationCount,
    onLogout,
    onManageDisableScrolling,
    scrollingDisabled,
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
        notificationCount={notificationCount}
        history={history}
        location={location}
        onLogout={onLogout}
        onManageDisableScrolling={onManageDisableScrolling}
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
  logoutError: null,
  notificationCount: 0,
};

const { array, bool, func, instanceOf, number, object } = PropTypes;

LandingPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  isAuthenticated: bool.isRequired,
  logoutError: instanceOf(Error),
  notificationCount: number,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  scrollingDisabled: bool.isRequired,

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
    currentUserNotificationCount: notificationCount,
  } = state.user;
  return {
    authInfoError,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    isAuthenticated,
    logoutError,
    notificationCount,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});

const LandingPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withFlattenedRoutes
)(LandingPageComponent);

export default LandingPage;
