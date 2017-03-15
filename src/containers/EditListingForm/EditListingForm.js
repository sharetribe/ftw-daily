import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import { isEqual } from 'lodash';
import { arrayMove } from 'react-sortable-hoc';
import { noEmptyArray, maxLength, required } from '../../util/validators';
import { AddImages } from '../../components';
import css from './EditListingForm.css';

const ACCEPT_IMAGES = 'image/*';
const TITLE_MAX_LENGTH = 60;

// Custom inputs with validator messages
const RenderField = ({ input, label, type, meta }) => {
  const { touched, error } = meta;
  const component = type === 'textarea'
    ? <textarea {...input} placeholder={label} />
    : <input {...input} placeholder={label} type={type} />;
  return (
    <div>
      <label htmlFor={input.name}>{label}</label>
      <div>
        {component}
        {touched && error ? <span className={css.error}>{error}</span> : null}
      </div>
    </div>
  );
};

const { bool, func, object, shape, string } = PropTypes;

RenderField.propTypes = {
  input: shape({
    onChange: func.isRequired,
    name: string.isRequired,
  }).isRequired,
  label: string.isRequired,
  type: string.isRequired,
  meta: shape({
    touched: bool,
    error: string,
  }).isRequired,
};

// Add image wrapper. Label is the only visible element, file input is hidden.
const RenderAddImage = props => {
  const { accept, input, label, type } = props;
  const { name, onChange } = input;
  const inputProps = { accept, id: name, name, onChange, type };
  return (
    <div className={css.addImageWrapper}>
      <input {...inputProps} className={css.addImageInput} />
      <label htmlFor={name} className={css.addImage}>{label}</label>
    </div>
  );
};

RenderAddImage.propTypes = {
  accept: string.isRequired,
  input: shape({
    value: object,
    onChange: func.isRequired,
    name: string.isRequired,
  }).isRequired,
  label: string.isRequired,
  type: string.isRequired,
};

class EditListingForm extends Component {
  constructor(props) {
    super(props);
    this.handleInitialize = this.handleInitialize.bind(this);
    this.onImageUploadHandler = this.onImageUploadHandler.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  componentDidMount() {
    this.handleInitialize();
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
    const maxLengthStr = intl.formatMessage(
      { id: 'EditListingForm.maxLength' },
      {
        maxLength: TITLE_MAX_LENGTH,
      },
    );
    const maxLength60 = maxLength(maxLengthStr, TITLE_MAX_LENGTH);
    const imageRequiredStr = intl.formatMessage({ id: 'EditListingForm.imageRequired' });

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
        <AddImages images={images} onSortEnd={this.onSortEnd}>
          <Field
            accept={ACCEPT_IMAGES}
            component={RenderAddImage}
            label="+ Add image"
            name="addImage"
            onChange={this.onImageUploadHandler}
            type="file"
          />

          <Field
            component={props => {
              const { input, type, meta: { error, touched } } = props;
              return (
                <div className={css.imageRequiredWrapper}>
                  <input {...input} type={type} />
                  {touched && error
                    ? <span className={css.imageRequiredError}>{error}</span>
                    : null}
                </div>
              );
            }}
            name="images"
            type="hidden"
            validate={[noEmptyArray(imageRequiredStr)]}
          />
        </AddImages>

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
  onImageUpload: func.isRequired,
  onUpdateImageOrder: func.isRequired,
  onSubmit: func.isRequired,
};

export default reduxForm({ form: 'EditListingForm' })(injectIntl(EditListingForm));
