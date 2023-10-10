import React, { Component } from 'react';
import { compose } from 'redux';
import classNames from 'classnames';
import { array, bool, func, shape, string } from 'prop-types';
import { Form as FinalForm, Field } from 'react-final-form';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';

import { propTypes } from '../../util/types';
import { isUploadImageOverLimitError } from '../../util/errors';
import S3 from 'react-aws-s3';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import {
  Form,
  Button,
  IconEdit,
  ImageFromFile,
  ResponsiveImage,
  ValidationError,
  FieldTextInput,

} from '../../components';

import css from './EditListingVerificationForm.module.css';
import { CONFIRM_ERROR } from '../../ducks/Auth.duck';
import { findOptionsForSelectFilter } from '../../util/search';
import config from '../../config';
import FieldRadioButtonComponent from '../../components/FieldRadioButton/FieldRadioButton';

const ACCEPT_FILE = 'image/*';

const configS3 = {
  bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
  region: process.env.REACT_APP_S3_REGION,
  accessKeyId: process.env.REACT_APP_S3_ACCESS_ID,
  secretAccessKey: process.env.REACT_APP_S3_ACCESS_KEY,
};

//const ACCEPT_FILE = 'application/pdf,video/*';

const ReactS3Client = new S3(configS3);

export class EditListingVerificationFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { idProofImageUploadRequested: false, uploadedAttachmentsUrls: null };
    this.onImageUploadHandler = this.onImageUploadHandler.bind(this);
    this.submittedImages = [];

  }

  componentDidUpdate() {
    if (typeof window !== 'undefined') {
      window.Buffer = window.Buffer || require('buffer').Buffer;
    }
  }

  onImageUploadHandler(file, imageType) {
    if (file) {
      this.setState({ idProofImageUploadRequested: true });
      this.props
        .onImageUpload({ id: `${file.name}_${Date.now()}`, file }, imageType)
        .then(() => {
          this.setState({ idProofImageUploadRequested: false });
        })
        .catch(() => {
          this.setState({ idProofImageUploadRequested: false });
        });
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
          form.change("idProofImage", updateduploadedAttachmentsUrls);
        })
        .catch(e => {
          console.error(e, '^^^^ ^^^^ => e');
          this.setState({ uploadAttachmentToAwsRequested: false });
        });
    }
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        onImageUploadHandler={this.onImageUploadHandler}
        idProofImageUploadRequested={this.state.idProofImageUploadRequested}
        render={formRenderProps => {
          const {
            form,
            className,
            fetchErrors,
            handleSubmit,
            ready,
            images,
            values,
            invalid,
            disabled,
            mainImageId,
            filterConfig,
            saveActionMsg,
            updateInProgress,
            idProofImageUploadRequested,
          } = formRenderProps;
          CONFIRM_ERROR


          const { publishListingError, showListingsError, updateListingError, uploadImageError } =
            fetchErrors || {};
          const uploadOverLimit = isUploadImageOverLimitError(uploadImageError);



          // Main image for what
          const uploadingOverlay = idProofImageUploadRequested ? (
            <div className={css.uploadingImageOverlay}>

            </div>
          ) : null;
          const hasUploadError = !!uploadImageError && !idProofImageUploadRequested;
          const errorClasses = classNames({ [css.avatarUploadError]: hasUploadError });
          // Ensure that file exists if imageFromFile is used
          const fileExists = !!(mainImageId && mainImageId.file);
          const fileUploadInProgress = idProofImageUploadRequested && fileExists;
          const delayAfterUpload = mainImageId && mainImageId.imageId;
          const imageFromFile = !fileUploadInProgress ? (
            <ImageFromFile
              //id={mainImageId.id}
              className={errorClasses}
              rootClassName={css.uploadingImage}
              aspectRatioClassName={css.squareAspectRatio}
            // file={mainImageId.file}
            >
              {uploadingOverlay}
            </ImageFromFile>
          ) : null;

          const avatarComponent =
            !idProofImageUploadRequested && mainImageId && mainImageId.id && mainImageId.id.uuid ? (
              <ResponsiveImage
                rootClassName={css.avatarImage}
                alt={mainImageId.id.uuid}
                image={mainImageId}
                variants={['landscape-crop', 'landscape-crop2x']}
                sizes={'(max-width: 767px) 96px, 240px'}
              />
            ) : null;
          const chooseAvatarLabel =
            mainImageId &&
              ((mainImageId.id && mainImageId.id.uuid) || mainImageId.imageId || fileUploadInProgress) ? (
              <div className={css.avatarContainer}>
                {mainImageId.imageId ? imageFromFile : avatarComponent}
                <div className={css.changeAvatar}>
                  {/* <FormattedMessage id="ProfileSettingsForm.changeAvatar" /> */}
                  <IconEdit />
                </div>
              </div>
            ) : (
              <div className={css.avatarPlaceholder}>

              </div>
            );
          let uploadImageFailed = null;
          if (uploadOverLimit) {
            uploadImageFailed = (
              <p className={css.error}>
                <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadOverLimit" />
              </p>
            );
          } else if (uploadImageError) {
            uploadImageFailed = (
              <p className={css.error}>
                <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadFailed" />
              </p>
            );
          }

          // NOTE: These error messages are here since Photos panel is the last visible panel
          // before creating a new listing. If that order is changed, these should be changed too.
          // Create and show listing errors are shown above submit button
          const publishListingFailed = publishListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPhotosForm.publishListingFailed" />
            </p>
          ) : null;
          const showListingFailed = showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPhotosForm.showListingFailed" />
            </p>
          ) : null;

          if (uploadOverLimit) {
            uploadImageFailed = (
              <p className={css.error}>
                <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadOverLimit" />
              </p>
            );
          } else if (uploadImageError) {
            uploadImageFailed = (
              <p className={css.error}>
                <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadFailed" />
              </p>
            );
          }

          const submitInProgress = updateInProgress;
          const submitDisabled = invalid || disabled || submitInProgress || idProofImageUploadRequested || ready || !values.policeCheck;

          const classes = classNames(css.root, className);
          const policeCheck = findOptionsForSelectFilter('policeCheck', filterConfig);
          return (
            <Form
              className={classes}
              onSubmit={e => {
                this.submittedImages = images;
                handleSubmit(e);
              }}
            >



              {updateListingError ? (
                <p className={css.error}>
                  <FormattedMessage id="EditListingPhotosForm.updateFailed" />
                </p>
              ) : null}


              <p>Do you have Police Check</p>
              <div className={css.rowBox}>
                {policeCheck.map(num => {
                  return (
                    <div className={css.cardSelectPet}>
                      <FieldRadioButtonComponent
                        className={css.features}
                        id={num.key}
                        name={'policeCheck'}
                        value={num.key}
                        label={num.label}
                      />
                    </div>
                  );
                })}
              </div>

              {values && values.policeCheck == 'police_yes' ? (
                <div>

                  <p>Upload Photo ID -- drivers licence and Passport</p>

                  <div className={css.imagesField}>

                    <Field
                      label={chooseAvatarLabel}
                      id="idProofImage"
                      name="idProofImage"
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


                    <Field
                      component={props => {
                        const { input, meta } = props;
                        return (
                          <div className={css.imageRequiredWrapper}>
                            <input {...input} />
                            <ValidationError fieldMeta={meta} />

                          </div>
                        );
                      }}
                      name="images"
                      type="hidden"

                    />
                  </div>

                  <ul>
                    {values.idProofImage && Object.keys(values.idProofImage).length
                      ? <div className={css.fileUploadName} >
                        <div>
                          {/\mp4|MP4|mov|webm/.test(values.idProofImage.link) ? (
                            <video src={values.idProofImage && values.idProofImage.link} loop autoPlay={true} muted style={{ height: '200px' }} />
                          ) : /\png|jpeg|jpg/.test(values.idProofImage.link) ? (
                            <img alt={values.idProofImage.name} src={values.idProofImage.link} style={{ height: '200px' }} />
                          ) : (
                            <object data={values.idProofImage.link}>
                              <iframe
                                className="doc"
                                src={`https://docs.google.com/gview?url=${values.idProofImage.link}&embedded=true`}
                              />
                            </object>
                          )}
                        </div>
                      </div>
                      : null}

                  </ul>
                  {uploadImageFailed}

                  <p className={css.tip}>
                    <FormattedMessage id="EditListingVerificationForm.addImagesTip" />
                  </p>

                  {publishListingFailed}
                  {showListingFailed}

                </div>) : null}



              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={ready}
              >
                {saveActionMsg}
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

EditListingVerificationFormComponent.defaultProps = {
  fetchErrors: null,
  images: [],
  filterConfig: config.custom.filters,
};

EditListingVerificationFormComponent.propTypes = {
  fetchErrors: shape({
    publishListingError: propTypes.error,
    showListingsError: propTypes.error,
    uploadImageError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  filterConfig: propTypes.filterConfig,
  image: array,
  intl: intlShape.isRequired,
  onImageverificationUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  onRemoveImageverification: func.isRequired,
};

export default compose(injectIntl)(EditListingVerificationFormComponent);
