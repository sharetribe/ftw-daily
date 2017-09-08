import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import classNames from 'classnames';
import { ensureCurrentUser } from '../../util/data';
import * as validators from '../../util/validators';
import { Avatar, Button, ImageFromFile, SpinnerIcon, TextInputField } from '../../components';

import css from './ProfileSettingsForm.css';

const ACCEPT_IMAGES = 'image/*';

const RenderAvatar = props => {
  const { accept, id, input, label, type, disabled, uploadImageError } = props;
  const { name, onChange } = input;
  const error = uploadImageError
    ? <div className={css.error}>
        <FormattedMessage id="ProfileSettingsForm.imageUploadFailed" />
      </div>
    : null;

  return (
    <div className={css.uploadAvatarWrapper}>
      <label className={css.label} htmlFor={id}>{label}</label>
      <input
        accept={accept}
        className={css.uploadAvatarInput}
        disabled={disabled}
        id={id}
        name={name}
        onChange={event => {
          const file = event.target.files[0];
          const tempId = `${file.name}_${Date.now()}`;
          onChange({ id: tempId, file });
        }}
        type={type}
      />
      {error}
    </div>
  );
};

RenderAvatar.defaultProps = { uploadImageError: null };
const { bool, func, instanceOf, node, object, shape, string } = PropTypes;

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
  uploadImageError: instanceOf(Error),
};

const ProfileSettingsFormComponent = props => {
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
    updateProfileError,
    uploadImageError,
    uploadInProgress,
  } = props;

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

  const uploadingOverlay = uploadInProgress
    ? <div className={css.uploadingImageOverlay}><SpinnerIcon /></div>
    : null;

  const hasUploadError = !!uploadImageError && !uploadInProgress;
  const errorClasses = classNames({ [css.avatarUploadError]: hasUploadError });
  const transientUserProfileImage = profileImage.uploadedImage || user.profileImage;
  const transientUser = { ...user, profileImage: transientUserProfileImage };
  const avatarImage = uploadInProgress && profileImage.file
    ? <ImageFromFile
        id={profileImage.id}
        className={errorClasses}
        rootClassName={css.uploadingImage}
        aspectRatioClassName={css.squareAspectRatio}
        file={profileImage.file}
      >
        {uploadingOverlay}
      </ImageFromFile>
    : <Avatar className={errorClasses} user={transientUser} />;

  const chooseAvatarLabel = profileImage.imageId || (uploadInProgress && profileImage.file)
    ? <div className={css.avatarContainer}>
        {avatarImage}
        <div className={css.changeAvatar}>
          <FormattedMessage id="ProfileSettingsForm.changeAvatar" />
        </div>
      </div>
    : <div className={css.avatarPlaceholder}>
        <div className={css.avatarPlaceholderText}>
          <FormattedMessage id="ProfileSettingsForm.addYourProfilePicture" />
        </div>
        <div className={css.avatarPlaceholderTextMobile}>
          <FormattedMessage id="ProfileSettingsForm.addYourProfilePictureMobile" />
        </div>
      </div>;

  const submitError = updateProfileError
    ? <div className={css.error}>
        <FormattedMessage id="ProfileSettingsForm.updateProfileFailed" />
      </div>
    : null;

  const classes = classNames(rootClassName || css.root, className);
  const inProgress = uploadInProgress || updateInProgress;
  const submitDisabled = invalid || submitting || inProgress || pristine;

  return (
    <form className={classes} onSubmit={handleSubmit}>
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
        <div className={css.tip}><FormattedMessage id="ProfileSettingsForm.tip" /></div>
        <div className={css.fileInfo}><FormattedMessage id="ProfileSettingsForm.fileInfo" /></div>
      </div>
      <div className={classNames(css.sectionContainer, css.lastSection)}>
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
      {submitError}
      <Button className={css.submitButton} type="submit" disabled={submitDisabled}>
        <FormattedMessage id="ProfileSettingsForm.saveChanges" />
      </Button>
    </form>
  );
};

ProfileSettingsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  uploadImageError: null,
  updateProfileError: null,
};

ProfileSettingsFormComponent.propTypes = {
  ...formPropTypes,
  rootClassName: string,
  className: string,
  uploadImageError: instanceOf(Error),
  uploadInProgress: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: instanceOf(Error),
  intl: intlShape.isRequired,
};

const defaultFormName = 'ProfileSettingsForm';

const ProfileSettingsForm = compose(reduxForm({ form: defaultFormName }), injectIntl)(
  ProfileSettingsFormComponent
);

export default ProfileSettingsForm;
