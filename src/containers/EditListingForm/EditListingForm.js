import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import { maxLength, required } from '../../util/validators';
import { Promised } from '../../components';
import css from './EditListingForm.css';

const ACCEPT_IMAGES = 'image/*';
const TITLE_MAX_LENGTH = 60;

// readImage returns a promise which is resolved
// when FileReader has loaded given file as dataURL
const readImage = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = e => resolve(e.target.result);
  reader.onerror = e => reject(new Error(`Error reading ${file.name}: ${e.target.result}`));
  reader.readAsDataURL(file);
});


// Custom inputs with validator messages
const RenderField = ({ input, label, type, meta: { touched, error } }) => {
  const component = type === 'textarea'
    ? <textarea {...input} placeholder={label} />
    : <input {...input} placeholder={label} type={type} />;
  return (
    <div>
      <label htmlFor={input.name}>{label}</label>
      <div>
        {component}
        {touched && (error && <span className={css.error}>{error}</span>)}
      </div>
    </div>
  );
};

const { any, bool, shape, string } = PropTypes;

RenderField.propTypes = {
  input: any.isRequired,
  label: string.isRequired,
  type: string.isRequired,
  meta: shape({
    touched: bool,
    error: string,
  }).isRequired,
};

// Add image wrapper. Label is the only visible element, file input is hidden.
const RenderAddImage = props => {
  const { accept, input: {name, onChange}, label, type, meta: { touched, warning } } = props;
  const inputProps = { accept, id: name, name, onChange, type };
  return (
    <div className={css.addImageWrapper}>
      <input
        {...inputProps}
        style={{ display: 'none' }}
      />
      <div>
        <label htmlFor={name} className={css.addImage}>{label}</label>
        {touched && (warning && <span className={css.warning}>{warning}</span>)}
      </div>
    </div>
  );
};

RenderAddImage.propTypes = {
  accept: string.isRequired,
  input: any.isRequired,
  label: string.isRequired,
  type: string.isRequired,
  meta: shape({
    touched: bool,
    warning: string,
  }).isRequired,
};

class EditListingForm extends Component {
  constructor(props) {
    super(props);
    this.handleInitialize = this.handleInitialize.bind(this);
    this.onImageUploadHandler = this.onImageUploadHandler.bind(this);
  }

  componentDidMount() {
    this.handleInitialize();
  }

  onImageUploadHandler(event) {
    const file = event.target.files[0];
    if (file) {
      this.props.onImageUpload({ id: `${file.name}_${Date.now()}`, file });
    }
  }

  handleInitialize() {
    const { initData = {}, initialize } = this.props;
    initialize(initData);
  }

  render() {
    const {
      disabled,
      handleSubmit,
      images,
      intl,
      pristine,
      saveActionMsg = 'Save listing',
      submitting,
    } = this.props;
    const requiredStr = intl.formatMessage({ id: 'EditListingForm.required' });
    const maxLengthStr = intl.formatMessage({ id: 'EditListingForm.maxLength' }, {
      maxLength: TITLE_MAX_LENGTH,
    });
    const maxLength60 = maxLength(maxLengthStr, TITLE_MAX_LENGTH);

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="title"
          label="Title"
          component={RenderField}
          type="text"
          validate={[required(requiredStr), maxLength60]}
        />

        <h3>Images</h3>
        <div className={css.imagesContainer}>
          {images.map(i => {
            // While image is uploading we show overlay on top of thumbnail
            const uploadingOverlay = !i.imageId
              ? <div className={css.thumbnailLoading}>Uploading</div>
              : null;
            return (
              <Promised
                key={i.id}
                promise={readImage(i.file)}
                onSuccess={dataURL => {
                  return (
                    <div className={css.thumbnail}>
                      <img src={dataURL} alt={encodeURIComponent(i.file.name)} className={css.thumbnailImage} />
                      {uploadingOverlay}
                    </div>
                  );
                }}
              />
            );
          })}
          <Field
            accept={ACCEPT_IMAGES}
            component={RenderAddImage}
            label="+ Add image"
            name="addImage"
            onChange={this.onImageUploadHandler}
            type="file"
          />
        </div>

        <Field
          name="description"
          label="Description"
          component={RenderField}
          type="textarea"
          validate={[required(requiredStr)]}
        />
        <button type="submit" disabled={pristine || submitting || disabled}>{saveActionMsg}</button>
      </form>
    );
  }
}

EditListingForm.defaultProps = { initData: {} };

EditListingForm.propTypes = {
  ...formPropTypes,
  initData: shape({ title: string, description: string }),
  intl: intlShape.isRequired,
};

export default reduxForm({ form: 'EditListingForm' })(injectIntl(EditListingForm));
