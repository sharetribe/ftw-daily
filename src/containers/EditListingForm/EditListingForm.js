import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import { maxLength, required } from '../../util/validators';
import css from './EditListingForm.css';

const MAX_LENGTH = 60;

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
  )
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

class EditListingForm extends Component {
  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const { initData = {}, initialize } = this.props;
    initialize(initData);
  }

  render() {
    const {
      disabled,
      handleSubmit,
      intl,
      pristine,
      saveActionMsg = 'Save listing',
      submitting,
    } = this.props;
    const requiredStr = intl.formatMessage({ id: 'EditListingForm.required' });
    const maxLengthStr = intl.formatMessage({ id: 'EditListingForm.maxLength' }, {
      maxLength: MAX_LENGTH,
    });
    const maxLength60 = maxLength(maxLengthStr, MAX_LENGTH);

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="title"
          label="Title"
          component={RenderField}
          type="text"
          validate={[required(requiredStr), maxLength60]}
        />

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
