import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { ensureCurrentUser } from '../../util/data';
import { sendVerificationEmail } from '../../ducks/user.duck';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { clearUpdatedForm, updateProfile, uploadImage } from './ProfileSettingsPage.duck';
import { PageLayout, Topbar, UserNav } from '../../components';
import { ProfileSettingsForm } from '../../containers';

import css from './ProfileSettingsPage.css';

const onImageUploadHandler = (values, fn) => {
  const { id, imageId, file } = values;
  if (file) {
    fn({ id, imageId, file });
  }
};

const onSubmit = (values, fn) => {
  const { firstName, lastName, profileImage } = values;
  const name = { firstName, lastName };

  // Update profileImage only if file system has been accessed
  const updatedValues = profileImage.imageId && profileImage.file
    ? { ...name, profileImageId: profileImage.imageId }
    : name;

  fn(updatedValues);
};

export const ProfileSettingsPageComponent = props => {
  const {
    authInfoError,
    authInProgress,
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    history,
    image,
    isAuthenticated,
    location,
    logoutError,
    notificationCount,
    onChange,
    onImageUpload,
    onLogout,
    onManageDisableScrolling,
    onUpdateProfile,
    scrollingDisabled,
    updateInProgress,
    updateProfileError,
    uploadImageError,
    uploadInProgress,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    onResendVerificationEmail,
  } = props;

  const user = ensureCurrentUser(currentUser);
  const { firstName, lastName } = user.attributes.profile;
  const profileImage = image || { imageId: user.profileImage.id };

  const profileSettingsForm = user.id
    ? <ProfileSettingsForm
        className={css.form}
        currentUser={currentUser}
        initialValues={{ firstName, lastName, profileImage }}
        profileImage={profileImage}
        onImageUpload={e => onImageUploadHandler(e, onImageUpload)}
        uploadInProgress={uploadInProgress}
        updateInProgress={updateInProgress}
        uploadImageError={uploadImageError}
        updateProfileError={updateProfileError}
        onSubmit={values => {
          onSubmit({ ...values, profileImage }, onUpdateProfile);
        }}
        onChange={onChange}
      />
    : null;

  return (
    <PageLayout
      className={css.root}
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
        currentUserHasOrders={currentUserHasOrders}
        history={history}
        isAuthenticated={isAuthenticated}
        location={location}
        notificationCount={notificationCount}
        onLogout={onLogout}
        onManageDisableScrolling={onManageDisableScrolling}
        onResendVerificationEmail={onResendVerificationEmail}
        sendVerificationEmailInProgress={sendVerificationEmailInProgress}
        sendVerificationEmailError={sendVerificationEmailError}
      />
      <UserNav selectedPageName="ProfileSettingsPage" />

      <div className={css.content}>
        <h1><FormattedMessage id="ProfileSettingsPage.title" /></h1>
        {profileSettingsForm}
      </div>
    </PageLayout>
  );
};

ProfileSettingsPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  currentUserHasOrders: null,
  logoutError: null,
  notificationCount: 0,
  uploadImageError: null,
  updateProfileError: null,
  image: null,
  sendVerificationEmailError: null,
};

const { bool, func, instanceOf, number, object, shape, string } = PropTypes;

ProfileSettingsPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  currentUserHasOrders: bool,
  isAuthenticated: bool.isRequired,
  image: shape({
    id: string,
    imageId: propTypes.uuid,
    file: object,
    uploadedImage: propTypes.image,
  }),
  logoutError: instanceOf(Error),
  notificationCount: number,
  onChange: func.isRequired,
  onImageUpload: func.isRequired,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onUpdateProfile: func.isRequired,
  scrollingDisabled: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: instanceOf(Error),
  uploadImageError: instanceOf(Error),
  uploadInProgress: bool.isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: instanceOf(Error),
  onResendVerificationEmail: func.isRequired,

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
    currentUserHasOrders,
    currentUserNotificationCount: notificationCount,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  } = state.user;
  const {
    image,
    uploadImageError,
    uploadInProgress,
    updateInProgress,
    updateProfileError,
  } = state.ProfileSettingsPage;
  return {
    authInfoError,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    currentUserNotificationCount: notificationCount,
    image,
    isAuthenticated,
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
    updateInProgress,
    updateProfileError,
    uploadImageError,
    uploadInProgress,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(clearUpdatedForm()),
  onImageUpload: data => dispatch(uploadImage(data)),
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onUpdateProfile: data => dispatch(updateProfile(data)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
});

const ProfileSettingsPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(
  ProfileSettingsPageComponent
);

export default ProfileSettingsPage;
