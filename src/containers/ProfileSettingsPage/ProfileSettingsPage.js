import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as propTypes from '../../util/propTypes';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { requestImageUpload } from './ProfileSettingsPage.duck';
import { PageLayout, Topbar, UserNav } from '../../components';

const ACCEPT_IMAGES = 'image/*';

const onImageUploadHandler = (event, fn) => {
  const file = event.target.files[0];
  if (file) {
    fn({ id: `${file.name}_${Date.now()}`, file })
      .then(response => {
        console.log('Response:', response);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
}

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
    onImageUpload,
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
      <label htmlFor="EditListingPhotosForm.AddImages">Add profile image</label>
      <input
        id="EditListingPhotosForm.AddImages"
        accept={ACCEPT_IMAGES}
        name="addImage"
        onChange={(e) => onImageUploadHandler(e, onImageUpload)}
        type="file"
        disabled={false}

      />
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
  onImageUpload: func.isRequired,
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
  onImageUpload: data => dispatch(requestImageUpload(data)),
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});

const ProfileSettingsPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(
  ProfileSettingsPageComponent
);

export default ProfileSettingsPage;
