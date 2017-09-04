import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as propTypes from '../../util/propTypes';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { PageLayout, Topbar, UserNav } from '../../components';

export const ProfileSettingsPageComponent = props => {
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
    scrollingDisabled,
  } = props;

  return (
    <PageLayout
      authInfoError={authInfoError}
      logoutError={logoutError}
      title="Profile settings"
      scrollingDisabled={scrollingDisabled}
    >
      <Topbar
        authInProgress={authInProgress}
        currentPage="ProfileSettingsPage"
        currentUser={currentUser}
        currentUserHasListings={currentUserHasListings}
        history={history}
        isAuthenticated={isAuthenticated}
        location={location}
        notificationCount={notificationCount}
        onLogout={onLogout}
        onManageDisableScrolling={onManageDisableScrolling}
      />
      <UserNav selectedPageName="ProfileSettingsPage" />
    </PageLayout>
  );
};

ProfileSettingsPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  logoutError: null,
  notificationCount: 0,
};

const { bool, func, instanceOf, number, object, shape } = PropTypes;

ProfileSettingsPageComponent.propTypes = {
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

const ProfileSettingsPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(
  ProfileSettingsPageComponent
);

export default ProfileSettingsPage;
