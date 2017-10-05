import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { isEqual } from 'lodash';
import { arrayMove } from 'react-sortable-hoc';
import classNames from 'classnames';
import { noEmptyArray } from '../../util/validators';
import { isUploadListingImageOverLimitError } from '../../util/errors';
import { Form, AddImages, Button, ValidationError } from '../../components';

import css from './EditListingPhotosForm.css';

const ACCEPT_IMAGES = 'image/*';

// Add image wrapper. Label is the only visible element, file input is hidden.
const RenderAddImage = props => {
  const { accept, input, label, type, disabled } = props;
  const { name, onChange } = input;
  const inputProps = { accept, id: name, name, onChange, type };
  return (
    <div className={css.addImageWrapper}>
      <div className={css.aspectRatioWrapper}>
        {disabled ? null : <input {...inputProps} className={css.addImageInput} />}
        <label htmlFor={name} className={css.addImage}>{label}</label>
      </div>
    </div>
  );
};

const { func, node, object, shape, string, bool, instanceOf } = PropTypes;

RenderAddImage.propTypes = {
  accept: string.isRequired,
  input: shape({
    value: object,
    onChange: func.isRequired,
    name: string.isRequired,
  }).isRequired,
  label: node.isRequired,
  type: string.isRequired,
  disabled: bool.isRequired,
};

export class EditListingPhotosFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { imageUploadRequested: false };
    this.onImageUploadHandler = this.onImageUploadHandler.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.images, nextProps.images)) {
      nextProps.change('images', nextProps.images);
    }
  }

  onImageUploadHandler(event) {
    const file = event.target.files[0];
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

  onSortEnd({ oldIndex, newIndex }) {
    const images = arrayMove(this.props.images, oldIndex, newIndex);
    this.props.onUpdateImageOrder(images.map(i => i.id));
  }

  render() {
    const {
      className,
      disabled,
      errors,
      handleSubmit,
      images,
      intl,
      invalid,
      saveActionMsg,
      submitting,
      updated,
      ready,
      updateError,
      updateInProgress,
      onRemoveImage,
    } = this.props;

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

    // TODO Add tip #2: re-order text

    const imageRequiredMessage = intl.formatMessage({ id: 'EditListingPhotosForm.imageRequired' });

    const { createListingsError, showListingsError, uploadImageError } = errors;
    const uploadOverLimit = isUploadListingImageOverLimitError(uploadImageError);

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

    // Create and show listing errors are shown above submit button
    const createListingFailed = createListingsError
      ? <p className={css.error}>
          <FormattedMessage id="EditListingPhotosForm.createListingFailed" />
        </p>
      : null;
    const showListingFailed = showListingsError
      ? <p className={css.error}>
          <FormattedMessage id="EditListingPhotosForm.showListingFailed" />
        </p>
      : null;

    const errorMessage = updateError
      ? <p className={css.error}>
          <FormattedMessage id="EditListingPhotosForm.updateFailed" />
        </p>
      : null;

    const classes = classNames(css.root, className);

    const submitReady = updated || ready;
    const submitInProgress = submitting || updateInProgress;
    const submitDisabled = invalid ||
      disabled ||
      submitInProgress ||
      this.state.imageUploadRequested ||
      ready;

    return (
      <Form className={classes} onSubmit={handleSubmit}>
        {errorMessage}
        <AddImages
          className={css.imagesField}
          images={images}
          onSortEnd={this.onSortEnd}
          thumbnailClassName={css.thumbnail}
          savedImageAltText={intl.formatMessage({ id: 'EditListingPhotosForm.savedImageAltText' })}
          onRemoveImage={onRemoveImage}
        >
          <Field
            id="EditListingPhotosForm.AddImages"
            accept={ACCEPT_IMAGES}
            component={RenderAddImage}
            label={chooseImageText}
            name="addImage"
            onChange={this.onImageUploadHandler}
            type="file"
            disabled={this.state.imageUploadRequested}
          />

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
            validate={[noEmptyArray(imageRequiredMessage)]}
          />
        </AddImages>
        {uploadImageFailed}

        <p className={css.tip}>
          <FormattedMessage id="EditListingPhotosForm.addImagesTip" />
        </p>
        {createListingFailed}
        {showListingFailed}

        <Button
          className={css.submitButton}
          type="submit"
          inProgress={submitInProgress}
          disabled={submitDisabled}
          ready={submitReady}
        >
          {saveActionMsg}
        </Button>
      </Form>
    );
  }
}

EditListingPhotosFormComponent.defaultProps = { errors: {}, updateError: null };

EditListingPhotosFormComponent.propTypes = {
  ...formPropTypes,
  errors: shape({
    createListingsError: object,
    showListingsError: object,
    uploadImageError: object,
  }),
  intl: intlShape.isRequired,
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  ready: bool.isRequired,
  updateError: instanceOf(Error),
  updateInProgress: bool.isRequired,
  onRemoveImage: func.isRequired,
};

const formName = 'EditListingPhotosForm';

export default compose(reduxForm({ form: formName }), injectIntl)(EditListingPhotosFormComponent);
