import React, { Component, PropTypes } from 'react';
import { compose } from 'redux';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { isEqual } from 'lodash';
import { arrayMove } from 'react-sortable-hoc';
import classNames from 'classnames';
import { noEmptyArray } from '../../util/validators';
import { AddImages, Button, ValidationError } from '../../components';

import css from './EditListingPhotosForm.css';

const ACCEPT_IMAGES = 'image/*';

// Add image wrapper. Label is the only visible element, file input is hidden.
const RenderAddImage = props => {
  const { accept, input, label, type } = props;
  const { name, onChange } = input;
  const inputProps = { accept, id: name, name, onChange, type };
  return (
    <div className={css.addImageWrapper}>
      <div className={css.aspectRatioWrapper}>
        <input {...inputProps} className={css.addImageInput} />
        <label htmlFor={name} className={css.addImage}>{label}</label>
      </div>
    </div>
  );
};

const { func, node, object, shape, string } = PropTypes;

RenderAddImage.propTypes = {
  accept: string.isRequired,
  input: shape({
    value: object,
    onChange: func.isRequired,
    name: string.isRequired,
  }).isRequired,
  label: node.isRequired,
  type: string.isRequired,
};

export class EditListingPhotosFormComponent extends Component {
  constructor(props) {
    super(props);
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
      this.props.onImageUpload({ id: `${file.name}_${Date.now()}`, file });
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
    const uploadOverLimit = uploadImageError &&
      uploadImageError.data.errors.length > 0 &&
      uploadImageError.data.errors[0].code === 'upload-over-limit';
    const uploadImageFailed = uploadOverLimit
      ? <p className={css.error}>
          <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadOverLimit" />
        </p>
      : null;

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

    const classes = classNames(css.root, className);

    return (
      <form className={classes} onSubmit={handleSubmit}>

        <AddImages className={css.imagesField} images={images} onSortEnd={this.onSortEnd}>
          <Field
            id="EditListingPhotosForm.AddImages"
            accept={ACCEPT_IMAGES}
            component={RenderAddImage}
            label={chooseImageText}
            name="addImage"
            onChange={this.onImageUploadHandler}
            type="file"
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
          disabled={invalid || submitting || disabled}
        >
          {saveActionMsg}
        </Button>
      </form>
    );
  }
}

EditListingPhotosFormComponent.defaultProps = { saveActionMsg: 'Publish listing', errors: {} };

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
  saveActionMsg: node,
};

const formName = 'EditListingPhotosForm';

export default compose(reduxForm({ form: formName }), injectIntl)(EditListingPhotosFormComponent);
