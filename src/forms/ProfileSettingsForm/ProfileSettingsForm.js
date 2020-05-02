import React, { Component } from 'react';
import { bool, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Field, Form as FinalForm } from 'react-final-form';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { ensureCurrentUser } from '../../util/data';
import { propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { isUploadImageOverLimitError } from '../../util/errors';
import YotiVerified from '../../components/YotiVerified/YotiVerified.js';
import ReactTooltip from 'react-tooltip';
import {
  Form,
  Avatar,
  Button,
  ImageFromFile,
  FieldCheckboxGroup,
  IconSpinner,
  FieldTextInput,
  ExternalLink,
} from '../../components';

import css from './ProfileSettingsForm.css';
import number from './number.png';
import appstore from './app-store-badge.png';
import googlestore from './google-play-badge.png';
import two from './two.png';
import three from './three.png';
import four from './four.png';

const ACCEPT_IMAGES = 'image/*';
const UPLOAD_CHANGE_DELAY = 2000; // Show spinner so that browser has time to load img srcset

class ProfileSettingsFormComponent extends Component {
  constructor(props) {
    super(props);

    this.uploadDelayTimeoutId = null;
    this.state = { uploadDelay: false, submitDisabledCheck: true };
    this.submittedValues = {};
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

  componentDidMount() {
    if (this.props.currentUser.attributes.profile.publicData.yotiVerified != 'YES') {
      this.yotiInstance = window.Yoti.Share.init({
        elements: [
          {
            domId: 'yoti-button',
            scenarioId: '8284ca81-3469-4272-91b6-2635014181db',
            clientSdkId: 'd3dd97cd-10eb-4ea5-9ab4-97bd6acfd172',
            button: {
              label: 'Yoti Verification',
            },
          },
        ],
      });
    }
  }

  componentWillUnmount() {
    if (this.yotiInstance) {
      this.yotiInstance.destroy();
    }
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        render={fieldRenderProps => {
          const {
            className,
            currentUser,
            handleSubmit,
            intl,
            invalid,
            onImageUpload,
            pristine,
            profileImage,
            rootClassName,
            updateInProgress,
            updateProfileError,
            uploadImageError,
            uploadInProgress,
            form,
            values,
          } = fieldRenderProps;

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
              <Avatar
                className={avatarClasses}
                renderSizes="(max-width: 767px) 96px, 240px"
                user={transientUser}
                disableProfileLink
              />
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
          const submitInProgress = updateInProgress;
          const submittedOnce = Object.keys(this.submittedValues).length > 0;
          const pristineSinceLastSubmit = submittedOnce && isEqual(values, this.submittedValues);
          const submitDisabled =
            invalid || pristine || pristineSinceLastSubmit || uploadInProgress || submitInProgress;

          const handleCheckboxChange = () => {
            this.setState({ submitDisabledCheck: false });
          };

          return (
            <Form
              className={classes}
              onSubmit={e => {
                this.submittedValues = values;
                handleSubmit(e);
              }}
            >
              {currentUser.attributes.profile.publicData.yotiVerified != 'YES' ? (
                <div>
                  <div>
                    <h3 className={css.yotiTitle}>Verify your identity</h3>
                  </div>

<div className={css.contentinner}>
    <p className={css.noWrap}><img src={number} className={css.numb} />
        Download the free Yoti app and follow the set-up instructions.
        <img className={css.strr} src={googlestore} />
        <img className={css.str} src={appstore} />

    </p>
    <div className={css.yoticont}>
        <div className={css.storeMobile}>
          <ExternalLink href="https://play.google.com/store/apps/details?id=com.yoti.mobile.android.live&hl=sr">
            <img className={css.strr} src={googlestore} />
          </ExternalLink>
          <ExternalLink href="https://apps.apple.com/gb/app/yoti-your-digital-identity/id983980808">
            <img className={css.str} src={appstore} />
          </ExternalLink>
        </div>
    </div>
    <p className={css.CsS}><img src={two} className={css.numb} />
    Add your ID document. Wait a few minutes for your account to be verified and approved.
    </p>

    <p className={css.forMob}><img src={two} className={css.numb} />
    Add your ID document. You will be verified in minutes.
    </p>

    <p className={css.forPc}><img src={three} className={css.numb} />
    Once approved, click on the 'Yoti verification' button below and scan the QR code with the Yoti app.
    </p>

    <p className={css.forMob}><img src={three} className={css.numb} />
    Tap the Yoti Verification button below and Share details.
    </p>
</div>
<div className={css.yotiBtn1}>
    <div className={css.yotiContainer} id="yoti-button" />
        <span className={css.needHelp} data-tip>Need help?</span>
        <ReactTooltip className={css.customTip} effect='solid'>
            <span className={css.tipColor}>  
            Need any help to create your Yoti?<br />Email <strong className={css.toolEmail}>help@yoti.com</strong>
            </span>
        </ReactTooltip>
    </div>
    <p className={css.mobileHelp}>Need any help? email <strong><i>help@yoti.com</i></strong></p>
</div>
              ) : (
                <YotiVerified />
              )}



              <div className={css.sectionContainer}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.yourProfilePicture" />
                </h3>

                <Field
                  accept={ACCEPT_IMAGES}
                  id="profileImage"
                  name="profileImage"
                  label={chooseAvatarLabel}
                  type="file"
                  form={null}
                  uploadImageError={uploadImageError}
                  disabled={uploadInProgress}
                >
                  {fieldProps => {
                    const {
                      accept,
                      id,
                      input,
                      label,
                      type,
                      disabled,
                      uploadImageError,
                    } = fieldProps;
                    const { name } = input;
                    const onChange = e => {
                      const file = e.target.files[0];
                      form.change(`profileImage`, file);
                      form.blur(`profileImage`);
                      if (file != null) {
                        const tempId = `${file.name}_${Date.now()}`;
                        onImageUpload({ id: tempId, file });
                      }
                    };

                    let error = null;

                    if (isUploadImageOverLimitError(uploadImageError)) {
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
                          id={id}
                          name={name}
                          className={css.uploadAvatarInput}
                          disabled={disabled}
                          onChange={onChange}
                          type={type}
                        />
                        {error}
                      </div>
                    );
                  }}
                </Field>

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
                  <FieldTextInput
                    className={css.firstName}
                    type="text"
                    id="firstName"
                    name="firstName"
                    label={firstNameLabel}
                    placeholder={firstNamePlaceholder}
                    validate={firstNameRequired}
                  />
                  <FieldTextInput
                    className={css.lastName}
                    type="text"
                    id="lastName"
                    name="lastName"
                    label={lastNameLabel}
                    placeholder={lastNamePlaceholder}
                    validate={lastNameRequired}
                  />
                </div>
              </div>
              <div className={classNames(css.sectionContainer)}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.bioHeading" />
                </h3>
                <FieldTextInput
                  type="textarea"
                  id="bio"
                  name="bio"
                  label={bioLabel}
                  placeholder={bioPlaceholder}
                />
              </div>

              <div className={classNames(css.sectionContainer, css.lastSection)}>
                <h3 className={css.sectionTitle}>
                  <span>Preferred Locations (For Pet Sitters Only)</span>
                </h3>
                <FieldCheckboxGroup
                  id="preferredlocations"
                  name="preferredlocations"
                  label="Preferred Locations"
                  options={[
                    { key: 'UK', label: 'UK' },
                    { key: 'USA', label: 'USA' },
                    { key: 'Australia', label: 'Australia' },
                    { key: 'Canada', label: 'Canada' },
                    { key: 'France', label: 'France' },
                    { key: 'Spain', label: 'Spain' },
                    { key: 'Italy', label: 'Italy' },
                    { key: 'Germany', label: 'Germany' },
                    { key: 'India', label: 'India' },
                    { key: 'China', label: 'China' },
                  ]}
                  handleChange={handleCheckboxChange}
                />
              </div>

              {submitError}
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled && this.state.submitDisabledCheck}
                ready={pristineSinceLastSubmit}
              >
                <FormattedMessage id="ProfileSettingsForm.saveChanges" />
              </Button>
            </Form>
          );
        }}
      />
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

const ProfileSettingsForm = compose(injectIntl)(ProfileSettingsFormComponent);

ProfileSettingsForm.displayName = 'ProfileSettingsForm';

export default ProfileSettingsForm;
