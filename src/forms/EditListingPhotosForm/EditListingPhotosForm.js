import React, { Component } from 'react';
import { array, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/user.duck';
import { Form as FinalForm, Field } from 'react-final-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { nonEmptyArray, composeValidators } from '../../util/validators';
import { isUploadImageOverLimitError } from '../../util/errors';
import { AddImages, Button, Form, ValidationError, NamedRedirect } from '../../components';
import axios from 'axios';
import ListingPage from '../../containers/ListingPage/ListingPage';
import css from './EditListingPhotosForm.css';
import { FaLessThanEqual } from 'react-icons/fa';
import { FieldTextInput } from '../../components';
const ACCEPT_IMAGES = 'image/*';

export class EditListingPhotosFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUploadRequested: false,
      redirectPage: null,
      redirect: null,
      userFetched: false,
    };
    this.onImageUploadHandler = this.onImageUploadHandler.bind(this);
    this.submittedImages = [];
  }

  onImageUploadHandler(file) {
    if (file) {
      this.setState({ imageUploadRequested: true });
      this.props
        .onImageUpload({ id: `${file.name}_${Date.now()}`, file })
        .then(() => {
          this.setState({ imageUploadRequested: false });
        })
        .catch(() => {
          this.setState({ imageUploadRequested: false });
        });
    }
  }

  componentDidMount() {
    let memberShip, redirectPage;
    switch (this.props.user_type) {
      case 0:
        memberShip = 'petOwnerMembership';
        redirectPage = '';
        break;
      case 1:
        memberShip = 'petSitterMembership';
        redirectPage = '';
        break;
      case 2:
        memberShip = 'petServiceMembership';
        redirectPage = '';
        break;
    } 

    // MembershipPage < Esto va arriba

    this.props
      .dispatch(getUser())
      .then(response => {
        let currentUser = response.data.data;
        if (!currentUser.attributes.profile.publicData[memberShip]) {
          localStorage.setItem('redirectPath', new URL(window.location.href).pathname);
          this.setState({ redirectPage });
        }
      })
      .finally(() => {
        this.setState({ userFetched: true });
      });
  }

  render() {
    return this.state.redirect ? (
      <NamedRedirect name={this.state.redirectPage}></NamedRedirect>
    ) : (
      <FinalForm
        {...this.props}
        onImageUploadHandler={this.onImageUploadHandler}
        imageUploadRequested={this.state.imageUploadRequested}
        initialValues={{ images: this.props.images }}
        render={fieldRenderProps => {
          const {
            form,
            className,
            disabled,
            fetchErrors,
            handleSubmit,
            images,
            imageUploadRequested,
            intl,
            invalid,
            onImageUploadHandler,
            onRemoveImage,
            ready,
            saveActionMsg,
            updated,
            updateInProgress,
            user_type,
          } = fieldRenderProps;

         const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title' });
          const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.titlePlaceholder',
      });
          const chooseImageText = (
            <span className={css.chooseImageText}>
              <span className={css.chooseImage}>
                <FormattedMessage id="EditListingPhotosForm.chooseImage" />
              </span>
              <span className={css.imageTypes}>
                <FormattedMessage id="EditListingPhotosForm.imageTypes" />
              </span>
            </span>
          );

          const imageRequiredMessage = intl.formatMessage({
            id: 'EditListingPhotosForm.imageRequired',
          });

          const { publishListingError, showListingsError, updateListingError, uploadImageError } =
            fetchErrors || {};
          const uploadOverLimit = isUploadImageOverLimitError(uploadImageError);

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

          const submittedOnce = this.submittedImages.length > 0;
          // imgs can contain added images (with temp ids) and submitted images with uniq ids.
          const arrayOfImgIds = imgs =>
            imgs.map(i => (typeof i.id === 'string' ? i.imageId : i.id));
          const imageIdsFromProps = arrayOfImgIds(images);
          const imageIdsFromPreviousSubmit = arrayOfImgIds(this.submittedImages);
          const imageArrayHasSameImages = isEqual(imageIdsFromProps, imageIdsFromPreviousSubmit);
          const pristineSinceLastSubmit = submittedOnce && imageArrayHasSameImages;

          const submitReady = (updated && pristineSinceLastSubmit) || ready;
          const submitInProgress = updateInProgress;
          const submitDisabled =
            invalid || disabled || submitInProgress || imageUploadRequested || ready;

          const classes = classNames(css.root, className);
          const user_name = user_type === 0 ? 'owner' : user_type === 1 ? 'sitter' : 'service';
          let addImagesTip = null;
          if (this.state.redirectPage) {
            addImagesTip = intl.formatMessage({
              id: 'EditListingPhotosForm.payMembership',
            });
          } else {
            addImagesTip = intl.formatMessage({
              id: 'EditListingPhotosForm.addImagesTip.' + user_name,
            });
          }

          return (
            <Form
              className={classes}
              onSubmit={e => {
                e.preventDefault();
                if (this.state.userFetched) {
                  if (this.state.redirectPage) {
                    this.setState({ redirect: true });
                  } else {
                    this.submittedImages = images;
                    handleSubmit(e);
                  }
                }
              }}
            >
              {updateListingError ? (
                <p className={css.error}>
                  <FormattedMessage id="EditListingPhotosForm.updateFailed" />
                </p>
              ) : null}

              {!this.state.redirectPage ? (
                <AddImages
                  className={css.imagesField}
                  images={images}
                  thumbnailClassName={css.thumbnail}
                  savedImageAltText={intl.formatMessage({
                    id: 'EditListingPhotosForm.savedImageAltText',
                  })}
                  onRemoveImage={onRemoveImage}
                >
                  <Field
                    id="addImage"
                    name="addImage"
                    accept={ACCEPT_IMAGES}
                    form={null}
                    label={chooseImageText}
                    type="file"
                    disabled={imageUploadRequested}
                  >
                    {fieldprops => {
                      const { accept, input, label, type, disabled } = fieldprops;
                      const { name } = input;
                      const onChange = e => {
                        const file = e.target.files[0];
                        form.change(`addImage`, file);
                        form.blur(`addImage`);
                        onImageUploadHandler(file);
                      };
                      const inputProps = { accept, id: name, name, onChange, type };
                      return (
                        <div className={css.addImageWrapper}>
                          <div className={css.aspectRatioWrapper}>
                            {disabled ? null : (
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
                      const { input, type, meta } = props;
                      return (
                        <div className={css.imageRequiredWrapper}>
                          <input {...input} type={type} />
                          <ValidationError fieldMeta={meta} />
                        </div>
                      );
                    }}
                    name="images"
                    type="hidden"
                    validate={composeValidators(nonEmptyArray(imageRequiredMessage))}
                  />
                </AddImages>
              ) : null}
              {uploadImageFailed}

              <p className={css.tip}>
                <FormattedMessage id={addImagesTip} />
              </p>

              {publishListingFailed}
              {showListingFailed}
<br />
<h1>Tu Video</h1>
<br />


        
          <FieldTextInput
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            message="esto esa siendo llamado del archivo de fotos"
          />

         
    
<br />
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={submitReady}
              >
                {this.state.redirectPage ? 'Buy Membership' : saveActionMsg}
              </Button>



            </Form>
          );
        }}
      />
    );
  }
}

EditListingPhotosFormComponent.defaultProps = { fetchErrors: null, images: [] };

EditListingPhotosFormComponent.propTypes = {
  fetchErrors: shape({
    publishListingError: propTypes.error,
    showListingsError: propTypes.error,
    uploadImageError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  images: array,
  intl: intlShape.isRequired,
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  ready: bool.isRequired,
  updateInProgress: bool.isRequired,
  onRemoveImage: func.isRequired,
};

const mapDispatchToProps = dispatch => ({});

export default compose(connect(mapDispatchToProps), injectIntl)(EditListingPhotosFormComponent);
