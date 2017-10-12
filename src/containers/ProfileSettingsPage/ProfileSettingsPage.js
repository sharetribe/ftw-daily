import React, { PropTypes, Component } from 'react'; // eslint-disable-line react/no-deprecated
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { ensureCurrentUser } from '../../util/data';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { Page, UserNav } from '../../components';
import { ProfileSettingsForm, TopbarContainer } from '../../containers';

import { clearUpdatedForm, updateProfile, uploadImage } from './ProfileSettingsPage.duck';
import css from './ProfileSettingsPage.css';

const onImageUploadHandler = (values, fn) => {
  const { id, imageId, file } = values;
  if (file) {
    fn({ id, imageId, file });
  }
};

export class ProfileSettingsPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { profileUpdated: false };
  }
  render() {
    const {
      authInfoError,
      currentUser,
      image,
      logoutError,
      onChange,
      onImageUpload,
      onUpdateProfile,
      scrollingDisabled,
      updateInProgress,
      updateProfileError,
      uploadImageError,
      uploadInProgress,
    } = this.props;

    const handleSubmit = values => {
      const { firstName, lastName } = values;
      const name = { firstName, lastName };
      const uploadedImage = this.props.image;

      // Update profileImage only if file system has been accessed
      const updatedValues = uploadedImage && uploadedImage.imageId && uploadedImage.file
        ? { ...name, profileImageId: uploadedImage.imageId }
        : name;

      onUpdateProfile(updatedValues).then(() => {
        this.setState({ profileUpdated: true });
      });
    };

    const handleChange = () => {
      this.setState({ profileUpdated: false });
      onChange();
    };

    const user = ensureCurrentUser(currentUser);
    const { firstName, lastName } = user.attributes.profile;
    const profileImageId = user.profileImage ? user.profileImage.id : null;
    const profileImage = image || { imageId: profileImageId };

    const profileSettingsForm = user.id
      ? <ProfileSettingsForm
          className={css.form}
          currentUser={currentUser}
          initialValues={{ firstName, lastName, profileImage }}
          profileImage={profileImage}
          onImageUpload={e => onImageUploadHandler(e, onImageUpload)}
          uploadInProgress={uploadInProgress}
          updateInProgress={updateInProgress}
          updateProfileReady={this.state.profileUpdated}
          uploadImageError={uploadImageError}
          updateProfileError={updateProfileError}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      : null;

    return (
      <Page
        className={css.root}
        authInfoError={authInfoError}
        logoutError={logoutError}
        title="Profile settings"
        scrollingDisabled={scrollingDisabled}
      >
        <TopbarContainer currentPage="ProfileSettingsPage" />
        <UserNav selectedPageName="ProfileSettingsPage" />

        <div className={css.content}>
          <h1><FormattedMessage id="ProfileSettingsPage.title" /></h1>
          {profileSettingsForm}
        </div>
      </Page>
    );
  }
}

ProfileSettingsPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  logoutError: null,
  uploadImageError: null,
  updateProfileError: null,
  image: null,
};

const { bool, func, instanceOf, object, shape, string } = PropTypes;

ProfileSettingsPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  currentUser: propTypes.currentUser,
  image: shape({
    id: string,
    imageId: propTypes.uuid,
    file: object,
    uploadedImage: propTypes.image,
  }),
  logoutError: instanceOf(Error),
  onChange: func.isRequired,
  onImageUpload: func.isRequired,
  onUpdateProfile: func.isRequired,
  scrollingDisabled: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: instanceOf(Error),
  uploadImageError: instanceOf(Error),
  uploadInProgress: bool.isRequired,
};

const mapStateToProps = state => {
  // Page needs authInfoError and logoutError
  const { authInfoError, logoutError } = state.Auth;
  const { currentUser } = state.user;
  const {
    image,
    uploadImageError,
    uploadInProgress,
    updateInProgress,
    updateProfileError,
  } = state.ProfileSettingsPage;
  return {
    authInfoError,
    currentUser,
    image,
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
    updateInProgress,
    updateProfileError,
    uploadImageError,
    uploadInProgress,
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: () => dispatch(clearUpdatedForm()),
  onImageUpload: data => dispatch(uploadImage(data)),
  onUpdateProfile: data => dispatch(updateProfile(data)),
});

const ProfileSettingsPage = compose(connect(mapStateToProps, mapDispatchToProps))(
  ProfileSettingsPageComponent
);

export default ProfileSettingsPage;
