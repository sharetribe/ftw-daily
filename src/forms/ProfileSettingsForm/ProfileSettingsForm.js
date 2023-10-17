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
import { Form, Avatar, Button, ImageFromFile, IconSpinner, FieldTextInput, FieldRadioButton, FieldCheckbox, IconCard } from '../../components';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import css from './ProfileSettingsForm.module.css';
import S3 from 'react-aws-s3';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { Energy_level, Feeding_schedule, Medication, Pet_Insurance, Potty_break, Weight, children_pet, desexed, house_trained, left_alone, microchipped, other_pet, typeOfPet } from '../../marketplace-custom-config';

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
    this.state = { uploadDelay: false, hideshowbutton: 0, isshowBTn: false, isFieldsVisible: [], };
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
  onAttachmentUpload(file, form) {
    // this.props.setClearForm(false);
    if (file && file.name) {
      ReactS3Client.uploadFile(file, file.name)
        .then(data => {
          //  const updateduploadedAttachmentsUrls = [...this.state.uploadedAttachmentsUrls];
          const { location } = data;
          const currentDate = moment().format('MM-DD-YYYY hh:mm:ss');
          const updateduploadedAttachmentsUrls = ({
            link: location,
            date: currentDate,
            name: file.name,
            id: uuidv4(),
            size: file.size
          });
          this.setState({
            uploadedAttachmentsUrls: updateduploadedAttachmentsUrls,
            attachmentDeleteRequested: false,
            uploadAttachmentToAwsRequested: false,
          });
          form.change("idPetImage", updateduploadedAttachmentsUrls);
        })
        .catch(e => {
          console.error(e, '^^^^ ^^^^ => e');
          this.setState({ uploadAttachmentToAwsRequested: false });
        });
    }
  }

  hideshow = (index) => {
    if (this.state.hideshowbutton == index) {
      this.setState({ isshowBTn: true })
    } else {
      this.setState({ isshowBTn: false })
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
  }

  toggleFieldsVisibility = index => {
    this.setState(prevState => {
      const updatedVisibility = [...prevState.isFieldsVisible];
      updatedVisibility[index] = !updatedVisibility[index];
      return { isFieldsVisible: updatedVisibility };
    });
  };







  render() {
    const { isFieldsVisible } = this.state
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
          const lastNameRequired = validators.required(lastNameRequiredMessage);

          // Bio
          const bioLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.bioLabel',
          });
          const bioPlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.bioPlaceholder',
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

              <FieldArray name="pets">
                {({ fields }) => (
                  <div>
                    <h3 className={css.headingDetail}>Add Pet</h3>

                    <React.Fragment>
                      {fields.map((name, index) => (

                        <div key={name} className={css.fieldBox}>
                          <div className={css.headingBoxRow}>
                            <h2 as="h2" className={css.accorHeading}>
                              <FormattedMessage id={`Pet ${index + 1}`} />
                            </h2>
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
                                {isFieldsVisible[index] ? <IconCard brand="uparrow" /> : <IconCard brand="downarrow" />}
                              </button>
                            </div>
                          </div>

                          {isFieldsVisible[index] && (
                            <div className={css.providerBox}>
                              <div>
                                <FieldTextInput
                                  type="text"
                                  id="pet_des"
                                  name={`${name}.pet_des`}

                                  label={"Provide a description of your pet"}
                                  placeholder={bioPlaceholder}
                                />
                                <div className={css.mainHeading}>
                                  <h2 className={css.headingData}>Type of Pet</h2>
                                  <div className={css.radioBox}>
                                    {typeOfPet.map((st) => (
                                      <div className={css.cardSelectPet} key={st.key}>
                                        <Field name={`${name}.typeOfPet`} component="input" type="radio" value={st.key} />
                                        <div className={css.radioLabel}>{st.label}</div>
                                      </div>)
                                    )}
                                  </div>
                                </div>


                                <FieldTextInput
                                  className={css.petName}
                                  type="text"
                                  id={"pet_name"}
                                  name={`${name}.pet_name`}
                                  label={"What is your Pet's name?"}
                                  placeholder={bioPlaceholder}
                                />
                                <div className={css.uploadAvatarWrapper}>
                                  <Field
                                    label={chooseAvatarLabel}
                                    id={`${name}.idPetImage`}
                                    name={`${name}.idPetImage`}
                                    accept={ACCEPT_FILE}
                                    form={null}
                                    type="file"
                                  >
                                    {fieldprops => {
                                      const { accept, input, label, meta, disabled: fieldDisabled } = fieldprops;
                                      const { name, type } = input;
                                      const onChange = e => {
                                        const file = e.target.files[0];
                                        this.setState({ fileState: file });
                                        if (file && file.name && file.size < 10000000) {
                                          this.setState({ uploadAttachmentToAwsRequested: true, stopLoop: false });
                                          this.onAttachmentUpload(file, form);
                                          e.target.value = null;
                                        }
                                      };

                                      const inputProps = { accept, id: name, name, onChange, type };
                                      return (
                                        <div className={css.addImageWrapper}>
                                          <div className={css.aspectRatioWrapper}>
                                            {fieldDisabled ? null : (
                                              <input {...inputProps} className={css.addImageInput} />
                                            )}
                                            <label htmlFor={name} className={css.addImage}>
                                              {label}
                                            </label>
                                          </div>
                                        </div>
                                      );
                                    }}
                                  </Field>
                                </div>
                                <ul>
                                  {values.idPetImage && Object.keys(values.idPetImage).length
                                    ? <div className={css.fileUploadName} >
                                      <div>
                                        {/\mp4|MP4|mov|webm/.test(values.idPetImage.link) ? (
                                          <video src={values.idPetImage && values.idPetImage.link} loop autoPlay={true} muted style={{ height: '200px' }} />
                                        ) : /\png|jpeg|jpg/.test(values.idPetImage.link) ? (
                                          <img alt={values.idPetImage.name} src={values.idPetImage.link} style={{ height: '200px' }} />
                                        ) : (
                                          <object data={values.idPetImage.link}>
                                            <iframe
                                              className="doc"
                                              src={`https://docs.google.com/gview?url=${values.idPetImage.link}&embedded=true`}
                                            />
                                          </object>
                                        )}
                                      </div>
                                    </div>
                                    : null}

                                </ul>
                                <div className={css.mainHeadingBox}>
                                  <h2 className={css.headingData}>Weight</h2>
                                  <div className={css.radioBox}>
                                    {Weight.map((st) => (
                                      <div className={css.cardSelectPet} key={st.key}>
                                        <Field type="radio" component="input" name={`${name}.Weight`} value={st.key} />
                                        <div className={css.radioLabel}>{st.label}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className={css.petBoxWrapper}>
                                  <FieldTextInput
                                    type="number"
                                    id="pet_month"
                                    name={`${name}.pet_month`}
                                    label={"What is your Pet's age(month)?"}
                                    placeholder={bioPlaceholder}
                                  />
                                  <FieldTextInput
                                    type="number"
                                    id="pet_year"
                                    name={`${name}.pet_year`}
                                    label={"What is your Pet's age(year)?"}
                                    placeholder={bioPlaceholder}
                                  />
                                  <FieldTextInput
                                    type="text"
                                    id="pet_breed"
                                    name={`${name}.pet_breed`}
                                    label={"Enter all breeds that apply. If your dog is a mixed breed, add ‘Mixed’ as well."}
                                    placeholder={bioPlaceholder}
                                  />
                                </div>
                                <div className={css.mainHeading}>
                                  <h2 className={css.headingDetail}>Additional Details</h2>
                                  <div className={css.detailsPet}>
                                    <p>Is your Pet microchipped?</p>
                                    <div className={css.radioBox}>
                                      {microchipped.map((st) => (
                                        <div className={css.cardSelectPet} key={st.key}>
                                          <Field name={`${name}.microchipped`} component="input" type="radio" value={st.key} />
                                          <div className={css.radioLabel}>{st.label}</div>
                                        </div>)
                                      )}
                                    </div>
                                  </div>
                                  <div className={css.detailsPet}>
                                    <p>Is your Pet desexed? </p>
                                    <div className={css.radioBox}>
                                      {desexed.map((st) => (
                                        <div className={css.cardSelectPet} key={st.key}>
                                          <Field name={`${name}.desexed`} component="input" type="radio" value={st.key} />
                                          <div className={css.radioLabel}>{st.label}</div>
                                        </div>)
                                      )}
                                    </div>
                                  </div>

                                  <div className={css.detailsPet}>
                                    <p>Is your Pet house trained? </p>
                                    <div className={css.radioBox}>
                                      {house_trained.map((st) => (
                                        <div className={css.cardSelectPet} key={st.key}>
                                          <Field name={`${name}.house_trained`} component="input" type="radio" value={st.key} />
                                          <div className={css.radioLabel}>{st.label}</div>
                                        </div>)
                                      )}
                                    </div>
                                  </div>
                                  <div className={css.detailsPet}>
                                    <p>Friendly with children?  </p>
                                    <div className={css.radioBox}>
                                      {children_pet.map((st) => (
                                        <div className={css.cardSelectPet} key={st.key}>
                                          <Field name={`${name}.children_pet`} component="input" type="radio" value={st.key} />
                                          <div className={css.radioLabel}>{st.label}</div>
                                        </div>)
                                      )}
                                    </div>
                                  </div>
                                  <div className={css.detailsPet}>
                                    <p>Friendly with other Pets? </p>
                                    <div className={css.radioBox}>
                                      {other_pet.map((st) => (
                                        <div className={css.cardSelectPet} key={st.key}>
                                          <Field name={`${name}.other_pet`} component="input" type="radio" value={st.key} />
                                          <div className={css.radioLabel}>{st.label}</div>
                                        </div>)
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <FieldTextInput
                                  type="text"
                                  id="about_pet"
                                  name={`${name}.about_pet`}
                                  label={"About your Pet?"}
                                  placeholder={bioPlaceholder}
                                />

                                <div className={css.careInformation}>
                                  <p>Care info</p>
                                  <p>Provide your Pet Host with instructions for walking, feeding and other care</p>
                                </div>
                                <div className={css.detailsPet}>
                                  <p>Potty break schedule</p>
                                  <div className={css.radioBox}>
                                    {Potty_break.map((st) => (
                                      <div className={css.cardSelectPet} key={st.key}>
                                        <Field name={`${name}.Potty_break`} component="input" type="radio" value={st.key} />
                                        <div className={css.radioLabel}>{st.label}</div>
                                      </div>)
                                    )}
                                  </div>
                                </div>
                                <div className={css.detailsPet}>
                                  <p>Energy level</p>
                                  <div className={css.radioBox}>
                                    {Energy_level.map((st) => (
                                      <div className={css.cardSelectPet} key={st.key}>
                                        <Field name={`${name}.Energy_level`} component="input" type="radio" value={st.key} />
                                        <div className={css.radioLabel}>{st.label}</div>
                                      </div>)
                                    )}
                                  </div>
                                </div>
                                <div className={css.detailsPet}>
                                  <p>Feeding schedule</p>
                                  <div className={css.radioBox}>
                                    {Feeding_schedule.map((st) => (
                                      <div className={css.cardSelectPet} key={st.key}>
                                        <Field name={`${name}.Feeding_schedule`} component="input" type="radio" value={st.key} />
                                        <div className={css.radioLabel}>{st.label}</div>
                                      </div>)
                                    )}
                                  </div>
                                </div>
                                <div className={css.detailsPet}>
                                  <p>Can be left alone</p>
                                  <div className={css.radioBox}>
                                    {left_alone.map((st) => (
                                      <div className={css.cardSelectPet} key={st.key}>
                                        <Field name={`${name}.left_alone`} component="input" type="radio" value={st.key} />
                                        <div className={css.radioLabel}>{st.label}</div>
                                      </div>)
                                    )}
                                  </div>
                                </div>
                                <div className={css.detailsPet}>
                                  <p>Medication (select all that apply)</p>
                                  <div className={css.radioBox}>
                                    {Medication.map((st) => (
                                      <div className={css.cardSelectPet} key={st.key}>
                                        <Field name={`${name}.Medication`} component="input" type="radio" value={st.key} />
                                        <div className={css.radioLabel}>{st.label}</div>
                                      </div>)
                                    )}
                                  </div>
                                </div>

                                <FieldTextInput
                                  type="text"
                                  id="anything_host"
                                  name={`${name}.anything_host`}
                                  label={"Anything else a Pet Host should know?"}
                                  placeholder={bioPlaceholder}
                                />
                                <p>Health info</p>


                                <FieldTextInput
                                  type="text"
                                  id="Health_info"
                                  name={`${name}.Health_info`}
                                  label={"Add details about your pet's health and care providers"}
                                  placeholder={bioPlaceholder}
                                />
                                <h3 className={css.headingDetail}>
                                  Veterinary info
                                </h3>

                                <p>Do you have Pet Insurance for your Pet's?</p>
                                <div className={css.radioBox}>
                                  {Pet_Insurance.map((st) => (
                                    <div className={css.cardSelectPet} key={st.key}>
                                      <Field name={`${name}.Pet_Insurance`} component="input" type="radio" value={st.key} />
                                      <div className={css.radioLabel}>{st.label}</div>
                                    </div>)
                                  )}
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
                  </div >
                )
                }
              </ FieldArray>





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
        }
        }
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
