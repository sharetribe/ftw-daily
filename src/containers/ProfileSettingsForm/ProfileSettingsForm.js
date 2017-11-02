import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import { ensureCurrentUser } from '../../util/data';
import * as propTypes from '../../util/propTypes';
import * as validators from '../../util/validators';
import { isUploadProfileImageOverLimitError } from '../../util/errors';
import { Form, Avatar, Button, ImageFromFile, IconSpinner, TextInputField } from '../../components';

import css from './ProfileSettingsForm.css';

const ACCEPT_IMAGES = 'image/*';
const UPLOAD_CHANGE_DELAY = 2000; // Show spinner so that browser has time to load img srcset

const RenderAvatar = props => {
  const { accept, id, input, label, type, disabled, uploadImageError } = props;
  const { name, onChange } = input;

  let error = null;

  if (isUploadProfileImageOverLimitError(uploadImageError)) {
    error = (
      <div className={css.error}>
        <FormattedMessage id="ProfileSettingsForm.imageUploadFailedFileTooLarge" />
      </div>
    );
  } else if (uploadImageError) {
    error = (
      <div className={css.error}>
        <FormattedMessage id="ProfileSettingsForm.imageUploadFailed" />
      </div>
    );
  }

  return (
    <div className={css.uploadAvatarWrapper}>
      <label className={css.label} htmlFor={id}>
        {label}
      </label>
      <input
        accept={accept}
        className={css.uploadAvatarInput}
        disabled={disabled}
        id={id}
        name={name}
        onChange={event => {
          const file = event.target.files[0];
          if (file != null) {
            const tempId = `${file.name}_${Date.now()}`;
            onChange({ id: tempId, file });
          }
        }}
        type={type}
      />
      {error}
    </div>
  );
};

RenderAvatar.defaultProps = { uploadImageError: null };
const { bool, func, node, object, shape, string } = PropTypes;

RenderAvatar.propTypes = {
  accept: string.isRequired,
  disabled: bool.isRequired,
  id: string.isRequired,
  input: shape({
    value: object,
    onChange: func.isRequired,
    name: string.isRequired,
  }).isRequired,
  label: node.isRequired,
  type: string.isRequired,
  uploadImageError: propTypes.error,
};

class ProfileSettingsFormComponent extends Component {
  constructor(props) {
    super(props);

    this.uploadDelayTimeoutId = null;
    this.state = { uploadDelay: false };
  }

  componentWillReceiveProps(nextProps) {
    // Upload delay is additional time window where Avatar is added to the DOM,
    // but not yet visible (time to load image URL from srcset)
    if (this.props.uploadInProgress && !nextProps.uploadInProgress) {
      this.setState({ uploadDelay: true });
      this.uploadDelayTimeoutId = window.setTimeout(() => {
        this.setState({ uploadDelay: false });
      }, UPLOAD_CHANGE_DELAY);
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.blurTimeoutId);
  }

  render() {
    const {
      className,
      currentUser,
      form,
      handleSubmit,
      intl,
      invalid,
      onImageUpload,
      pristine,
      profileImage,
      rootClassName,
      submitting,
      updateInProgress,
      updateProfileReady,
      updateProfileError,
      uploadImageError,
      uploadInProgress,
    } = this.props;

    const user = ensureCurrentUser(currentUser);

    // First name
    const firstNameLabel = intl.formatMessage({
      id: 'ProfileSettingsForm.firstNameLabel',
    });
    const firstNamePlaceholder = intl.formatMessage({
      id: 'ProfileSettingsForm.firstNamePlaceholder',
    });
    const firstNameRequiredMessage = intl.formatMessage({
      id: 'ProfileSettingsForm.firstNameRequired',
    });
    const firstNameRequired = validators.required(firstNameRequiredMessage);

    // Last name
    const lastNameLabel = intl.formatMessage({
      id: 'ProfileSettingsForm.lastNameLabel',
    });
    const lastNamePlaceholder = intl.formatMessage({
      id: 'ProfileSettingsForm.lastNamePlaceholder',
    });
    const lastNameRequiredMessage = intl.formatMessage({
      id: 'ProfileSettingsForm.lastNameRequired',
    });
    const lastNameRequired = validators.required(lastNameRequiredMessage);

    // Bio
    const bioLabel = intl.formatMessage({
      id: 'ProfileSettingsForm.bioLabel',
    });
    const bioPlaceholder = intl.formatMessage({
      id: 'ProfileSettingsForm.bioPlaceholder',
    });

    const uploadingOverlay =
      uploadInProgress || this.state.uploadDelay ? (
        <div className={css.uploadingImageOverlay}>
          <IconSpinner />
        </div>
      ) : null;

    const hasUploadError = !!uploadImageError && !uploadInProgress;
    const errorClasses = classNames({ [css.avatarUploadError]: hasUploadError });
    const transientUserProfileImage = profileImage.uploadedImage || user.profileImage;
    const transientUser = { ...user, profileImage: transientUserProfileImage };

    // Ensure that file exists if imageFromFile is used
    const fileExists = !!profileImage.file;
    const fileUploadInProgress = uploadInProgress && fileExists;
    const delayAfterUpload = profileImage.imageId && this.state.uploadDelay;
    const imageFromFile =
      fileExists && (fileUploadInProgress || delayAfterUpload) ? (
        <ImageFromFile
          id={profileImage.id}
          className={errorClasses}
          rootClassName={css.uploadingImage}
          aspectRatioClassName={css.squareAspectRatio}
          file={profileImage.file}
        >
          {uploadingOverlay}
        </ImageFromFile>
      ) : null;

    // Avatar is rendered in hidden during the upload delay
    // Upload delay smoothes image change process:
    // responsive img has time to load srcset stuff before it is shown to user.
    const avatarClasses = classNames(errorClasses, css.avatar, {
      [css.avatarInvisible]: this.state.uploadDelay,
    });
    const avatarComponent =
      !fileUploadInProgress && profileImage.imageId ? (
        <Avatar className={avatarClasses} user={transientUser} />
      ) : null;

    const chooseAvatarLabel =
      profileImage.imageId || fileUploadInProgress ? (
        <div className={css.avatarContainer}>
          {imageFromFile}
          {avatarComponent}
          <div className={css.changeAvatar}>
            <FormattedMessage id="ProfileSettingsForm.changeAvatar" />
          </div>
        </div>
      ) : (
        <div className={css.avatarPlaceholder}>
          <div className={css.avatarPlaceholderText}>
            <FormattedMessage id="ProfileSettingsForm.addYourProfilePicture" />
          </div>
          <div className={css.avatarPlaceholderTextMobile}>
            <FormattedMessage id="ProfileSettingsForm.addYourProfilePictureMobile" />
          </div>
        </div>
      );

    const submitError = updateProfileError ? (
      <div className={css.error}>
        <FormattedMessage id="ProfileSettingsForm.updateProfileFailed" />
      </div>
    ) : null;

    const classes = classNames(rootClassName || css.root, className);
    const submitInProgress = submitting || updateInProgress;
    const submitReady = updateProfileReady;
    const submitDisabled = invalid || pristine || uploadInProgress || submitInProgress;

    return (
      <Form className={classes} onSubmit={handleSubmit}>
        <div className={css.sectionContainer}>
          <h3 className={css.sectionTitle}>
            <FormattedMessage id="ProfileSettingsForm.yourProfilePicture" />
          </h3>
          <Field
            accept={ACCEPT_IMAGES}
            component={RenderAvatar}
            disabled={uploadInProgress}
            id="ProfileSettingsForm.changeAvatar"
            label={chooseAvatarLabel}
            name="profileImage"
            onChange={onImageUpload}
            type="file"
            uploadImageError={uploadImageError}
          />
          <div className={css.tip}>
            <FormattedMessage id="ProfileSettingsForm.tip" />
          </div>
          <div className={css.fileInfo}>
            <FormattedMessage id="ProfileSettingsForm.fileInfo" />
          </div>
        </div>
        <div className={css.sectionContainer}>
          <h3 className={css.sectionTitle}>
            <FormattedMessage id="ProfileSettingsForm.yourName" />
          </h3>
          <div className={css.nameContainer}>
            <TextInputField
              className={css.firstName}
              type="text"
              name="firstName"
              id={`${form}.firstName`}
              label={firstNameLabel}
              placeholder={firstNamePlaceholder}
              validate={firstNameRequired}
            />
            <TextInputField
              className={css.lastName}
              type="text"
              name="lastName"
              id={`${form}.lastName`}
              label={lastNameLabel}
              placeholder={lastNamePlaceholder}
              validate={lastNameRequired}
            />
          </div>
        </div>
        <div className={classNames(css.sectionContainer, css.lastSection)}>
          <h3 className={css.sectionTitle}>
            <FormattedMessage id="ProfileSettingsForm.bioHeading" />
          </h3>
          <TextInputField
            type="textarea"
            name="bio"
            id={`${form}.bio`}
            label={bioLabel}
            placeholder={bioPlaceholder}
          />
          <p className={css.bioInfo}>
            <FormattedMessage id="ProfileSettingsForm.bioInfo" />
          </p>
        </div>
        {submitError}
        <Button
          className={css.submitButton}
          type="submit"
          inProgress={submitInProgress}
          disabled={submitDisabled}
          ready={submitReady}
        >
          <FormattedMessage id="ProfileSettingsForm.saveChanges" />
        </Button>
      </Form>
    );
  }
}

ProfileSettingsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  uploadImageError: null,
  updateProfileError: null,
  updateProfileReady: false,
};

ProfileSettingsFormComponent.propTypes = {
  ...formPropTypes,
  rootClassName: string,
  className: string,

  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  updateProfileReady: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const defaultFormName = 'ProfileSettingsForm';

const ProfileSettingsForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(
  ProfileSettingsFormComponent
);

export default ProfileSettingsForm;
