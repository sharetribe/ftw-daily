import React, { Component } from 'react';
import { bool, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Field, Form as FinalForm } from 'react-final-form';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { ensureCurrentUser } from '../../util/data';
import { propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { isUploadImageOverLimitError } from '../../util/errors';
import {
  Form,
  Avatar,
  Button,
  ImageFromFile,
  IconSpinner,
  FieldTextInput,
  FieldRadioButton,
  FieldCheckbox,
  IconCard,
} from '../../components';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import css from './ProfileSettingsForm.module.css';
import S3 from 'react-aws-s3';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import {
  Energy_level,
  Feeding_schedule,
  Medication,
  Pet_Insurance,
  Potty_break,
  Weight,
  children_pet,
  desexed,
  house_trained,
  left_alone,
  microchipped,
  other_pet,
  typeOfPet,
} from '../../marketplace-custom-config';
const TITLE_MAX50_LENGTH = 50;
const TITLE_MAX150_LENGTH = 750;
const TITLE_MAX2_LENGTH = 2;
const ACCEPT_IMAGES = 'image/*';
const UPLOAD_CHANGE_DELAY = 2000; // Show spinner so that browser has time to load img srcset
const ACCEPT_FILE = 'image/*';
const configS3 = {
  bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
  region: process.env.REACT_APP_S3_REGION,
  accessKeyId: process.env.REACT_APP_S3_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_S3_ACCESS_KEY,
};

//const ACCEPT_FILE = 'application/pdf,video/*';

const ReactS3Client = new S3(configS3);
class ProfileSettingsFormComponent extends Component {
  constructor(props) {
    super(props);

    this.uploadDelayTimeoutId = null;
    this.state = {
      uploadDelay: false, hideshowbutton: 0, isshowBTn: false, isFieldsVisible: [], petImages: [],
      selectedPetIndex: -1,
    };
    this.submittedValues = {};
  }

  componentDidUpdate(prevProps) {
    // Upload delay is additional time window where Avatar is added to the DOM,
    // but not yet visible (time to load image URL from srcset)
    if (prevProps.uploadInProgress && !this.props.uploadInProgress) {
      this.setState({ uploadDelay: true });
      this.uploadDelayTimeoutId = window.setTimeout(() => {
        this.setState({ uploadDelay: false });
      }, UPLOAD_CHANGE_DELAY);
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.uploadDelayTimeoutId);
  }
  componentDidUpdate() {
    if (typeof window !== 'undefined') {
      window.Buffer = window.Buffer || require('buffer').Buffer;
    }
  }
  onAttachmentUpload(file, form, index, values) {

    // this.props.setClearForm(false);
    if (file && file.name) {
      ReactS3Client.uploadFile(file, file.name)
        .then(data => {
          //  const updateduploadedAttachmentsUrls = [...this.state.uploadedAttachmentsUrls];
          const { location } = data;
          const currentDate = moment().format('MM-DD-YYYY hh:mm:ss');
          const updateduploadedAttachmentsUrls = {
            link: location,
            date: currentDate,
            name: file.name,
            id: uuidv4(),
            size: file.size,
          };
          this.setState({
            uploadedAttachmentsUrls: updateduploadedAttachmentsUrls,
            attachmentDeleteRequested: false,
            uploadAttachmentToAwsRequested: false,
          });
          // form.change("idPetImage", uspdateduploadedAttachmentsUrls);
          // const petImages = [...this.state.petImages];
          // petImages[index] = file;
          // this.setState({ petImages });
          // form.setFieldValue(`pets[${index}].idPetImage`, updateduploadedAttachmentsUrls);
          values.pets[index].idPetImage = updateduploadedAttachmentsUrls;
        })
        .catch(e => {
          console.error(e, '^^^^ ^^^^ => e');
          this.setState({ uploadAttachmentToAwsRequested: false });
        });
    }
  }

  hideshow = index => {
    if (this.state.hideshowbutton == index) {
      this.setState({ isshowBTn: true });
    } else {
      this.setState({ isshowBTn: false });
      // document.getElementById(`petBtn${index+1}`).style.display="block";
    }
    // console.log('index', index)
    // if(this.state.hideshowbutton === index){
    //   this.setState({hideshowbutton:null,isshowBTn:true})
    //   // document.getElementById(`petBtn${index+1}`).style.display="none";
    // }else{
    //   this.setState({hideshowbutton:index,isshowBTn:false})
    //   // document.getElementById(`petBtn${index+1}`).style.display="block";
    // }
  };

  toggleFieldsVisibility = index => {
    this.setState(prevState => {
      const updatedVisibility = [...prevState.isFieldsVisible];
      updatedVisibility[index] = !updatedVisibility[index];
      return { isFieldsVisible: updatedVisibility };
    });
  };

  render() {
    const { isFieldsVisible } = this.state;
    return (
      <FinalForm
        {...this.props}
        mutators={{ ...arrayMutators }}
        render={fieldRenderProps => {
          const {
            className,
            currentUser,
            handleSubmit,
            intl,
            invalid,
            onImageUpload,
            currentUserHasOneListings,
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
        console.log('values', values)
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
          const customVMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.customRequired',
          });
          const lastNameRequired = validators.required(lastNameRequiredMessage);
 const customRequired = validators.required(customVMessage);
          const maxLengthheadlineMessage = intl.formatMessage(
            { id: 'EditListingDescriptionForm.max50Length' },
            {
              maxLength: TITLE_MAX50_LENGTH,
            }
          );
          const maxLength15Message = validators.maxLength(maxLengthheadlineMessage, TITLE_MAX50_LENGTH);
          const headlinelimitMessage = intl.formatMessage({
            id: 'EditListingYourselfForm.headlineRequired',
          });
          const headlineRequiredMessage = intl.formatMessage({
            id: 'EditListingprofileForm.petRequired',
          });
          const breedRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.Petbreedvalidation',
          });

          const maxLengthheadfivelineMessage = intl.formatMessage(
            { id: 'ProfileSettingsForm.max150Length' },
            {
              maxLength: TITLE_MAX150_LENGTH,
            }
          );
          const petdetailRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.petdetail',
          });
          const petVeterinaryRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.petVeterinary',
          });
          const maxLength500Message = validators.maxLength(maxLengthheadfivelineMessage, TITLE_MAX150_LENGTH);
          const maxLength2Message = validators.maxLength(maxLengthheadfivelineMessage, TITLE_MAX2_LENGTH);
          const headlinelimitsMessage = intl.formatMessage({
            id: 'EditListingYourselfForm.headlineRequired',
          });
          // Bio
          const petInsuranceTitle = intl.formatMessage({
            id: 'ProfileSettingsForm.petInsuranceTitle',
          });
          const petVeterinaryHeading = intl.formatMessage({
            id: 'ProfileSettingsForm.petVeterinaryHeading',
          });
          const petveterinaryplaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.petveterinaryplaceholder',
          });

          const healthInfoHeading = intl.formatMessage({
            id: 'ProfileSettingsForm.healthInfoHeading',
          });
          const medicationHeading = intl.formatMessage({
            id: 'ProfileSettingsForm.medicationHeading',
          });
          const leftAloneHeading = intl.formatMessage({
            id: 'ProfileSettingsForm.medicationHeading',
          });
          const feedingScheduleHeading = intl.formatMessage({
            id: 'ProfileSettingsForm.feedingScheduleHeading',
          });
          const energyLevelHeading = intl.formatMessage({
            id: 'ProfileSettingsForm.energyLevelHeading',
          });
          const pottyBreakScheduleHeading = intl.formatMessage({
            id: 'ProfileSettingsForm.pottyBreakScheduleHeading',
          });
          const patCareInfoDescription = intl.formatMessage({
            id: 'ProfileSettingsForm.patCareInfoDescription',
          });
          const patCareInfoHeading = intl.formatMessage({
            id: 'ProfileSettingsForm.patCareInfoHeading',
          });
          const patFriendlyWithOtherHeading = intl.formatMessage({
            id: 'ProfileSettingsForm.patFriendlyWithOtherHeading',
          });
          const patFriendlyWithChildrenHeading = intl.formatMessage({
            id: 'ProfileSettingsForm.patFriendlyWithChildrenHeading',
          });
          const isPatHouseTrainedHeading = intl.formatMessage({
            id: 'ProfileSettingsForm.isPatHouseTrainedHeading',
          });
          const isPatHouseDesexedHeading = intl.formatMessage({
            id: 'ProfileSettingsForm.isPatHouseDesexedHeading',
          });
          const microchippedHeading = intl.formatMessage({
            id: 'ProfileSettingsForm.microchippedHeading',
          });
          const additionalHeading = intl.formatMessage({
            id: 'ProfileSettingsForm.additionalHeading',
          });
          const weightHeading = intl.formatMessage({
            id: 'ProfileSettingsForm.weightHeading',
          });

          const addPetHeading = intl.formatMessage({
            id: 'ProfileSettingsForm.addPetHeading',
          });

          const bioLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.bioLabel',
          });
          const bioPlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.bioPlaceholder',
          });
          const breedPlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.Petbreed',
          });
          const breedlabel = intl.formatMessage({
            id: 'ProfileSettingsForm.petBreedLabel',
          });

          const monthPlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.monthPlaceholder',
          });
          const yearPlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.yearPlaceholder',
          });
          const petdetailsPlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.petdetailPlaceholder',
          });
          const petdetailsheading = intl.formatMessage({
            id: 'ProfileSettingsForm.petdetazilhead',
          });
          
          const ACCEPT_FILE = 'image/*';
          const configS3 = {
            bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
            region: process.env.REACT_APP_S3_REGION,
            accessKeyId: process.env.REACT_APP_S3_ACCESS_ID,
            secretAccessKey: process.env.REACT_APP_S3_ACCESS_KEY,
          };

          //const ACCEPT_FILE = 'application/pdf,video/*';

          const ReactS3Client = new S3(configS3);

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

          return (
            <Form
              className={classes}
              onSubmit={e => {
                this.submittedValues = values;
                handleSubmit(e);
              }}
            >
              <div className={css.sectionContainer}>
                <h3 className={css.headingDetail}>
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
                    const { accept, id, input, label, disabled, uploadImageError } = fieldProps;
                    const { name, type } = input;
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
                <h3 className={css.headingDetail}>
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
              <div className={classNames(css.sectionContainer, css.lastSection)}>
                <h3 className={css.headingDetail}>
                  <FormattedMessage id="ProfileSettingsForm.bioHeading" />
                </h3>
                <FieldTextInput
                  type="textarea"
                  id="bio"
                  name="bio"
                  label={bioLabel}
                  placeholder={bioPlaceholder}
                />
                <p className={css.bioInfo}>
                  <FormattedMessage id="ProfileSettingsForm.bioInfo" />
                </p>
              </div>
              {/* <button>add pet</button> */}
              {/* {currentUserHasOneListings
                ? */}
              <FieldArray name="pets">
                {({ fields }) => (
                  <div>
                    <h3 className={css.headingDetail}>{addPetHeading}</h3>

                    <React.Fragment>
                      {fields.map((name, index) => (
                        <div key={name} className={css.fieldBox}>
                          <div className={css.headingBoxRow}>
                            {/* <h2 as="h2" className={css.accorHeading}>
                              <FormattedMessage id={`Pet ${index + 1}`} />
                            </h2> */}
                            {values && values.pets && values.pets[index] && values.pets[index].pet_name ? (
                              values.pets[index].pet_name
                            ) : (
                              <FormattedMessage id={`Pet ${index + 1}`} />
                            )}
                            <div className={css.rightSideBox}>
                              <button
                                className={css.removeButton}
                                type="button"
                                onClick={() => fields.remove(index)}
                              >
                                <IconCard brand="trash" />
                              </button>
                              <button
                                type="button"
                                className={css.updownArrow}
                                onClick={() => this.toggleFieldsVisibility(index)}
                              >
                                {isFieldsVisible[index] ? (
                                  <IconCard brand="uparrow" />
                                ) : (
                                  <IconCard brand="downarrow" />
                                )}
                              </button>
                            </div>
                          </div>

                          {isFieldsVisible[index] && (
                            <div className={css.providerBox}>
                              <div>
                                <h2> <FormattedMessage id="ProfileSettingsForm.PetHeading" /></h2>
                                <div className={css.mainHeading}>
                                  <h2 className={css.headingData}>
                                    <FormattedMessage id="ProfileSettingsForm.typeOfPetHeading" />
                                  </h2>
                                  <div className={css.radioBox}>
                                    {typeOfPet.map(st => (
                                      <div className={css.cardSelectPet} key={st.key}>
                                        <Field name={`${name}.typeOfPet`} component="input" type="radio" value={st.key}
                                          validate={lastNameRequired}

                                        />
                                        <div className={css.radioLabel}>{st.label}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <FieldTextInput
                                  className={css.petName}
                                  type="text"
                                  id={'pet_name'}
                                  name={`${name}.pet_name`}
                                  label={"What is your Pet's name?"}
                                  placeholder={"Insert Pet name"}
                                  validate={validators.composeValidators(validators.required(headlineRequiredMessage), maxLength15Message)}
                                />
                                <div >

                                  <h4><FormattedMessage id="ProfileSettingsForm.photopetLabel" /></h4>
                                  {/* <Field
                                    // label={chooseAvatarLabel}
                                    id={`idPetImage_${index}`}
                                    name={`${name}.idPetImage`}
                                    accept={ACCEPT_FILE}
                                    form={null}
                                    type="file"
                                    validate={lastNameRequired}
                                  >
                                    {fieldprops => {
                                      const {
                                        accept,
                                        input,
                                        label,
                                        meta,
                                        disabled: fieldDisabled,
                                      } = fieldprops;
                                      const { name, type } = input;
                                      const onChange = e => {
                                        const file = e.target.files[0];
                                        this.setState({ fileState: file });
                                        if (file && file.name && file.size < 10000000) {
                                          this.setState({ uploadAttachmentToAwsRequested: true, stopLoop: false });
                                          this.onAttachmentUpload(file, form, index, values);
                                          e.target.value = null;
                                        }
                                      };

                                      const inputProps = { accept, id: name, name, onChange, type };
                                      return (
                                        <div className={css.addImageWrapper}>
                                          <div className={css.aspectRatioWrapper}>
                                            {fieldDisabled ? null : (
                                              <input
                                                {...inputProps}
                                                className={css.addImageInput}
                                              />
                                            )}
                                            <label htmlFor={name} className={css.addImage}>
                                              {label}
                                            </label>
                                    
                                          </div>
                                        </div>
                                      );
                                    }}
                                  </Field> */}
                                  <Field
                                    id={`idPetImage_${index}`}
                                    name={`${name}.idPetImage`}
                                    accept={ACCEPT_FILE}
                                    form={null}
                                    type="file"
                                    validate={lastNameRequired}
                                  >
                                    {fieldprops => {
                                      const {
                                        accept,
                                        input,
                                        meta,
                                        disabled: fieldDisabled,
                                      } = fieldprops;
                                      const { name } = input;
                                      const onChange = e => {
                                        const file = e.target.files[0];
                                        this.setState({ fileState: file });
                                        if (file && file.name && file.size < 10000000) {
                                          this.setState({ uploadAttachmentToAwsRequested: true, stopLoop: false });
                                          this.onAttachmentUpload(file, form, index, values);
                                          e.target.value = null;
                                        }
                                      };

                                      const inputProps = { accept, id: name, name, onChange, type: 'file' };
                                      const fileName = values.pets[index]?.idPetImage?.name || ''; // Get the file name if it exists

                                      return (
                                        <div className={css.addImageWrapper}>
                                          <div className={css.aspectRatioWrapper}>
                                            {fieldDisabled ? null : (
                                              <input
                                                {...inputProps}
                                                className={css.addImageInput}
                                                style={{ display: 'none' }} // Hide the default file input
                                              />
                                            )}
                                            {/* <label htmlFor={name} className={css.addImage}>
                                              {fileName || 'Choose a file'} 
                                            </label> */}
                                            <label htmlFor={name} className={css.addImage} style={{ border: '1px solid #ccc', padding: '8px', cursor: 'pointer' }}>
                                              {fileName || 'Choose a file'} {/* Display custom label or file name */}
                                            </label>
                                          </div>
                                        </div>
                                      );
                                    }}
                                  </Field>

                                </div>

                                <ul className={css.galleryUpload}>
                                  <button
                                    type="button"
                                    onClick={() => this.setState({ selectedPetIndex: index })}
                                    className={css.viewImageButton}
                                  >
                                    <FormattedMessage id="ProfileSettingsForm.viewphotopetLabel" />
                                  </button>
                                  {this.state.selectedPetIndex === index && (
                                    <div className={css.fileUploadName}>
                                      <div>
                                        {/\.(mp4|MP4|mov|webm)$/.test(values.pets[index]?.idPetImage?.link) ? (
                                          <video src={values.pets[index]?.idPetImage?.link} loop autoPlay={true} muted style={{ height: '200px' }} />
                                        ) : /\.(png|jpeg|jpg)$/.test(values.pets[index]?.idPetImage?.link) ? (
                                          <img alt={values.pets[index]?.idPetImage?.name} src={values.pets[index]?.idPetImage?.link} style={{ height: '200px' }} />
                                        ) : (
                                          <object data={values.pets[index]?.idPetImage?.link}>
                                            <iframe
                                              className="doc"
                                              src={`https://docs.google.com/gview?url=${values.pets[index]?.idPetImage?.link}&embedded=true`}
                                            />
                                          </object>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </ul>

                                <div className={css.mainHeadingBox}>
                                  <h2 className={css.headingData}>
                                    <FormattedMessage id="ProfileSettingsForm.weightHeading" />
                                  </h2>
                                  <div className={css.radioBox}>
                                    {Weight.map(st => (
                                      <div className={css.cardSelectPet} key={st.key}>
                                        <Field
                                          type="radio"
                                          component="input"
                                          name={`${name}.Weight`}
                                          value={st.label}
                                        />
                                        <div className={css.radioLabel}>{st.label}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className={css.petBoxWrapper}>
                                  <div className={css.inputRow}>

                                    <FieldTextInput
                                      className={css.inputBox}
                                      type="number"
                                      id="pet_year"
                                      name={`${name}.pet_year`}
                                      label={"What is your Pet's age(year)?"}
                                      placeholder={yearPlaceholder}
                                      maxLength={TITLE_MAX2_LENGTH}
                                      validate={validators.composeValidators(maxLength2Message)}
                                    />
                                    <FieldTextInput
                                      className={css.inputBox}
                                      type="number"
                                      id="pet_month"
                                      name={`${name}.pet_month`}
                                      label={"What is your Pet's age(month)?"}
                                      placeholder={monthPlaceholder}
                                      maxLength={TITLE_MAX2_LENGTH}
                                      validate={validators.composeValidators(maxLength2Message)}
                                    />
                                  </div>
                                  <FieldTextInput
                                    type="text"
                                    id="pet_breed"
                                    name={`${name}.pet_breed`}
                                    label={breedlabel}
                                    placeholder={breedPlaceholder}
                                    validate={validators.composeValidators(validators.required(breedRequiredMessage), maxLength15Message)}
                                  />
                                </div>
                                <div className={css.mainHeading}>
                                  <h2>
                                    <FormattedMessage id="ProfileSettingsForm.additionalHeading" />
                                  </h2>
                                  <div className={css.detailsPet}>
                                    <p className={css.bioInfo}>
                                      <FormattedMessage id="ProfileSettingsForm.microchippedHeading" />
                                    </p>
                                    <div className={css.radioBox}>
                                      {microchipped.map(st => (
                                        <div className={css.cardSelectPet} key={st.key}>
                                          <Field
                                            name={`${name}.microchipped`}
                                            component="input"
                                            type="radio"
                                            value={st.label}
                                          />
                                          <div className={css.radioLabel}>{st.label}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className={css.detailsPet}>
                                    <p className={css.bioInfo}>
                                      <FormattedMessage id="ProfileSettingsForm.isPatHouseDesexedHeading" />
                                    </p>
                                    <div className={css.radioBox}>
                                      {desexed.map(st => (
                                        <div className={css.cardSelectPet} key={st.key}>
                                          <Field name={`${name}.desexed`} component="input" type="radio" value={st.label}
                                            validate={lastNameRequired}
                                          />
                                          <div className={css.radioLabel}>{st.label}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div className={css.detailsPet}>
                                    <p className={css.bioInfo}>
                                      <FormattedMessage id="ProfileSettingsForm.isPatHouseTrainedHeading" />
                                    </p>
                                    <div className={css.radioBox}>
                                      {house_trained.map(st => (
                                        <div className={css.cardSelectPet} key={st.key}>
                                          <Field name={`${name}.house_trained`} component="input" type="radio" value={st.label}
                                            validate={lastNameRequired}
                                          />
                                          <div className={css.radioLabel}>{st.label}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className={css.detailsPet}>
                                    <p className={css.bioInfo}>
                                      <FormattedMessage id="ProfileSettingsForm.patFriendlyWithChildrenHeading" />
                                    </p>
                                    <div className={css.radioBox}>
                                      {children_pet.map(st => (
                                        <div className={css.cardSelectPet} key={st.key}>
                                          <Field name={`${name}.children_pet`} component="input" type="radio" value={st.label}
                                            validate={lastNameRequired}
                                          />
                                          <div className={css.radioLabel}>{st.label}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className={css.detailsPet}>
                                    <p className={css.bioInfo}>
                                      <FormattedMessage id="ProfileSettingsForm.patFriendlyWithOtherHeading" />
                                    </p>
                                    <div className={css.radioBox}>
                                      {other_pet.map(st => (
                                        <div className={css.cardSelectPet} key={st.key}>
                                          <Field name={`${name}.other_pet`} component="input" type="radio" value={st.label}
                                            validate={lastNameRequired}
                                          />
                                          <div className={css.radioLabel}>{st.label}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <FieldTextInput
                                  type="textarea"
                                  id="about_pet"
                                  name={`${name}.about_pet`}
                                  label={petdetailsheading}
                                  placeholder={petdetailsPlaceholder}
                                  validate={validators.composeValidators(validators.required(petdetailRequiredMessage), maxLength500Message)}
                                />

                                <div className={css.careInformation}>
                                  <h2>
                                    <FormattedMessage id="ProfileSettingsForm.patCareInfoHeading" />
                                  </h2>

                                  <p className={css.bioInfo}>
                                    <FormattedMessage id="ProfileSettingsForm.patCareInfoDescription" />
                                  </p>
                                </div>
                                <div className={css.detailsPet}>
                                  <p className={css.bioInfo}>
                                    <FormattedMessage id="ProfileSettingsForm.pottyBreakScheduleHeading" />
                                  </p>
                                  <div className={css.radioBox}>
                                    {Potty_break.map(st => (
                                      <div className={css.cardSelectPet} key={st.key}>
                                        <Field name={`${name}.Potty_break`} component="input" type="radio" value={st.label}
                                          validate={lastNameRequired}
                                        />
                                        <div className={css.radioLabel}>{st.label}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className={css.detailsPet}>
                                  <p className={css.bioInfo}>
                                    <FormattedMessage id="ProfileSettingsForm.energyLevelHeading" />
                                  </p>
                                  <div className={css.radioBox}>
                                    {Energy_level.map(st => (
                                      <div className={css.cardSelectPet} key={st.key}>
                                        <Field name={`${name}.Energy_level`} component="input" type="radio" value={st.label}
                                          validate={lastNameRequired}
                                        />
                                        <div className={css.radioLabel}>{st.label}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className={css.detailsPet}>
                                  <p className={css.bioInfo}>
                                    <FormattedMessage id="ProfileSettingsForm.feedingScheduleHeading" />
                                  </p>
                                  <div className={css.radioBox}>
                                    {Feeding_schedule.map(st => (
                                      <div className={css.cardSelectPet} key={st.key}>
                                        <Field
                                          name={`${name}.Feeding_schedule`}
                                          component="input"
                                          type="radio"
                                          value={st.label}
                                        />
                                        <div className={css.radioLabel}>{st.label}</div>
                                      </div>
                                    ))}
                                    {
                                   
                                      values?.pets[index]?.Feeding_schedule === "Custom" ?
                                      <FieldTextInput
                                      type="text"
                                      id="Feeding_schedule_custom"
                                      name={`${name}.Feeding_schedule_custom`}
                                      label={intl.formatMessage({
                                        id: 'ProfileSettingsForm.feedcustomHeading',
                                      })}
                                      placeholder={intl.formatMessage({
                                        id: 'ProfileSettingsForm.feedcustomHplaceholder',
                                      })}
                                      validate={customRequired}
                                    />:null
                                    }
                                  </div>
                                </div>
                                <div className={css.detailsPet}>
                                  <p className={css.bioInfo}>
                                    <FormattedMessage id="ProfileSettingsForm.leftAloneHeading" />
                                  </p>
                                  <div className={css.radioBox}>
                                    {left_alone.map(st => (
                                      <div className={css.cardSelectPet} key={st.key}>
                                        <Field
                                          name={`${name}.left_alone`}
                                          component="input"
                                          type="radio"
                                          value={st.label}
                                        />
                                        <div className={css.radioLabel}>{st.label}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className={css.detailsPet}>
                                  <p className={css.bioInfo}>
                                    <FormattedMessage id="ProfileSettingsForm.medicationHeading" />
                                  </p>
                                  <div className={css.radioBox}>
                                    {Medication.map(st => (
                                      <div className={css.cardSelectPet} key={st.key}>
                                        <Field
                                          name={`${name}.Medication`}
                                          component="input"
                                          type="radio"
                                          value={st.label}
                                        />
                                        <div className={css.radioLabel}>{st.label}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <FieldTextInput
                                  type="text"
                                  id="anything_host"
                                  name={`${name}.anything_host`}
                                  label={intl.formatMessage({
                                    id: 'ProfileSettingsForm.petHostLabel',
                                  })}
                                  placeholder={intl.formatMessage({
                                    id: 'ProfileSettingsForm.petHostPlaceHolder',
                                  })}
                                  maxLength={TITLE_MAX150_LENGTH}
                                  validate={validators.composeValidators(maxLength500Message)}
                                />
                                <FieldTextInput
                                  type="text"
                                  id="Health_info"
                                  name={`${name}.Health_info`}
                                  label={intl.formatMessage({
                                    id: 'ProfileSettingsForm.healthInfoHeading',
                                  })}
                                  placeholder={intl.formatMessage({
                                    id: 'ProfileSettingsForm.petHealthInfoPlaceHolder',
                                  })}
                                />
                                <FieldTextInput
                                  type="textarea"
                                  id="detailvet_pet"
                                  name={`${name}.detailvet_pet`}
                                  label={petVeterinaryHeading}
                                  placeholder={petveterinaryplaceholder}
                                  validate={validators.composeValidators(validators.required(petVeterinaryRequiredMessage), maxLength500Message)}
                                />
                                <p className={css.bioInfo}>
                                  <FormattedMessage id="ProfileSettingsForm.petInsuranceTitle" />
                                </p>
                                <div className={css.radioBox}>
                                  {Pet_Insurance.map(st => (
                                    <div className={css.cardSelectPet} key={st.key}>
                                      <Field
                                        name={`${name}.Pet_Insurance`}
                                        component="input"
                                        type="radio"
                                        value={st.key}
                                      />
                                      <div className={css.radioLabel}>{st.label}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </React.Fragment>
                    <button
                      type="button"
                      // onClick={() => fields.push({})}
                      onClick={() => {
                        fields.push({});
                        // Set default visibility for the newly added form
                        const newIndex = fields.length;
                        this.setState(prevState => {
                          const updatedVisibility = [...prevState.isFieldsVisible];
                          updatedVisibility[newIndex] = true;
                          return { isFieldsVisible: updatedVisibility };
                        });
                      }}
                      className={css.addPetButton}
                    >
                      Add Pet
                    </button>
                  </div>
                )}
              </FieldArray>
              {/* : null} */}


              {submitError}
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
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
