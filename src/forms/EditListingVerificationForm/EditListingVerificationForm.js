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
 
} from '../../components';

import css from './EditListingVerificationForm.module.css';

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
    this.state = { idProofImageUploadRequested: false ,uploadedAttachmentsUrls:null};
    this.onImageUploadHandler = this.onImageUploadHandler.bind(this);
    this.submittedImages = [];
  
  }

  componentDidUpdate(){
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
  onAttachmentUpload(file,form) {
    console.log(file, '^^^^ ^^^^ => file');
    
    // this.props.setClearForm(false);
    if (file && file.name ) {
      ReactS3Client.uploadFile(file, file.name)
     // console.log('file', file)
        .then(data => {
          console.log(data, '^^^^ ^^^^ => data');
          
        //  const updateduploadedAttachmentsUrls = [...this.state.uploadedAttachmentsUrls];
          const { location } = data;
          const currentDate = moment().format('MM-DD-YYYY hh:mm:ss');
           const updateduploadedAttachmentsUrls =({
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
          form.change("idProofImage",updateduploadedAttachmentsUrls)
        })
        .catch(e => {
          console.log(e, '^^^^ ^^^^ => e');
          
          this.setState({ uploadAttachmentToAwsRequested: false });
          // console.error(e);
        });
    }
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        onImageUploadHandler={this.onImageUploadHandler}
        idProofImageUploadRequested={this.state.idProofImageUploadRequested}
        initialValues={{ images: this.props.images }}
        render={formRenderProps => {
          const {
            form,
            className,
            fetchErrors,
            handleSubmit,
            idProofImageUploadRequested,
            intl,
            invalid,
            onImageUploadHandler,
            disabled,
            mainImageId,
            ready,
            saveActionMsg,
            images,
            viewimage,
            idProofImage,
            updateInProgress,
            values,
          } = formRenderProps;
          console.log(values, '^^^^ ^^^^ => values');
         // console.log('idProofImage', idProofImage)
          //console.log('images', images)

          const { publishListingError, showListingsError, updateListingError, uploadImageError } =
            fetchErrors || {};
          const uploadOverLimit = isUploadImageOverLimitError(uploadImageError);
          
const valueimage = values?.idProofImage?.link 
console.log('valueimage', valueimage)
          const addMainPhoto = (
            <span className={css.chooseImageText}>
              {/* <IconCamera /> */}
              <span className={css.chooseImage}>
                <FormattedMessage id="EditListingPhotosForm.chooseMainImage" />
              </span>
              {/* <span className={css.imageTypes}>
                <FormattedMessage id="EditListingPhotosForm.imageTypes" />
              </span> */}
            </span>
          );
          // const imageRequiredMessage = intl.formatMessage({
          //   id: 'EditListingPhotosForm.imageRequired',
          // });
          // const { publishListingError, showListingsError, updateListingError, uploadImageError } =
          //   fetchErrors || {};
          // const uploadOverLimit = isUploadImageOverLimitError(uploadImageError);
          // Main image for what
          const uploadingOverlay = idProofImageUploadRequested ? (
            <div className={css.uploadingImageOverlay}>
              {/* <IconSpinner /> */}
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
          // Avatar is rendered in hidden during the upload delay
          // Upload delay smoothes image change process:
          // responsive img has time to load srcset stuff before it is shown to user.
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
                {/* <IconCamera /> */}
                {/* <div className={css.avatarPlaceholderText}>
                  <FormattedMessage id="EditListingPhotosForm.addYourMainPicture" />
                </div> */}
                {/* <div className={css.avatarPlaceholderTextMobile}>
                  <FormattedMessage id="EditListingPhotosForm.addYourMainPictureMobile" />
                </div> */}
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

          // let uploadImageFailed = null;

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
          const submitDisabled =
            invalid || disabled || submitInProgress || idProofImageUploadRequested || ready  || !values.idProofImage ;

          const classes = classNames(css.root, className);
          console.log('this.state.uploadedAttachmentsUrls', this.state.uploadedAttachmentsUrls)

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
              <p>Upload Photo ID -- drivers licence and Passport</p>
              {/* <Field
                  id="idProofImage"
                  name="idProofImage"
                  accept={ACCEPT_IMAGES}
                  form={null}
                  label={chooseAvatarLabel}
                  type="file"
                  disabled={idProofImageUploadRequested}
                >
                  {fieldprops => {
                    const { accept, input, label, disabled: fieldDisabled } = fieldprops;
                    const { name, type } = input;
                    const onChange = e => {
                      const file = e.target.files[0];
                      form.change(`idProofImage`, file);
                      form.blur(`idProofImage`);
                      onImageUploadHandler(file,'idProofImage');
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
                </Field> */}
                <div className={css.imagesField}>
                {/* <label className={css.imageLabel}>{documentsLabel}</label> */}
                {/* {uploadedAttachmentsUrls.length >= 3 && (
                  <h3 className={css.fileUploadLimitMessage}>{fileUploadLimitMessage}</h3>
                )} */}
               
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
                          this.onAttachmentUpload(file,form);
                          e.target.value = null;
                          console.log('file', file)
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
                
                {/* {!!fileState && fileState.size > 10000000 && (
                  <div>
                    <FormattedMessage id="AttachmentForm.fileSizeExceededMessage" />
                  </div>
                )} */}
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
                  // validate={composeValidators(nonEmptyArray(imageRequiredMessage))}
                />
              </div>
              {/* {uploadImageFailed} */}
              <ul >
                
                
                    {/* <div >
                      <li>
                       

                        <span
                          className={css.closer}
                          onClick={() => this.onRemoveFileLinks(id)}
                        >
                          {' '}
                        </span>
                      </li>

                      <li className={css.videoBox}>
                        {/\mp4|MP4|mov|webm/.test (this.state.uploadedAttachmentsUrls?.link) ? (
                          <vedio src={this.state.uploadedAttachmentsUrls?.link} loop autoPlay={true} muted className={css.video} />
                        ) : (
                          <object data={this.state.uploadedAttachmentsUrls?.link}>
                            <iframe
                              className="doc"
                              src={`https://docs.google.com/gview?url=${viewimage.link}&embedded=true`}
                              
                            />
                          </object>
                        )}
                      </li>
                    </div> */}
                    {
                 
                    <div  className={css.fileUploadName} >
                      <div>
                        {/\mp4|MP4|mov|webm/.test(values?.idProofImage?.link ? values?.idProofImage?.link : viewimage) ? (
                          <video src={values?.idProofImage?.link ? values?.idProofImage?.link : viewimage} loop autoPlay={true} muted  style={{height:'200px'}}/>
                        ) : (
                          <object data={values?.idProofImage?.link ? values?.idProofImage?.link : viewimage}>
                            <iframe
                        
                              className="doc"
                              src={`https://docs.google.com/gview?url=${values?.idProofImage?.link ? values?.idProofImage?.link : viewimage}&embedded=true`}
                            />
                          </object>
                        )}
                      </div>
                    </div>
                    
                }
                    {/* {viewimage} */}
                  
              </ul>
              {uploadImageFailed}

               <p className={css.tip}>
                <FormattedMessage id="EditListingVerificationForm.addImagesTip" />
              </p> 
              
              {publishListingFailed}
              {showListingFailed}

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

EditListingVerificationFormComponent.defaultProps = { fetchErrors: null, images: [] };

EditListingVerificationFormComponent.propTypes = {
  fetchErrors: shape({
    publishListingError: propTypes.error,
    showListingsError: propTypes.error,
    uploadImageError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  image:array,
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
