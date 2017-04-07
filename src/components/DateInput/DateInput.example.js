/* eslint-disable no-console */
import React, { PropTypes } from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import moment from 'moment';
import { Button } from '../../components';
import { required } from '../../util/validators';
import DateInput from './DateInput';
import css from './DateInput.example.css';

const EnhancedDateInput = props => {
  const { input, placeholder, meta } = props;
  const { onBlur, onChange, onFocus, value } = input;
  const { touched, error } = meta;
  const inputProps = { onBlur, onChange, onFocus, placeholder, value };
  return (
    <div>
      <label htmlFor="bookingStart">Select date</label>
      <DateInput {...inputProps} />
      {touched && error ? <span className={css.error}>{error}</span> : null}
    </div>
  );
};

EnhancedDateInput.defaultProps = { input: null, placeholder: 'Date' };

const { bool, object, shape, string } = PropTypes;

EnhancedDateInput.propTypes = {
  input: object,
  meta: shape({
    touched: bool,
    error: string,
  }).isRequired,
  placeholder: string,
};

const FormComponent = props => {
  const { handleSubmit, pristine, submitting, dateInputProps } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="bookingStart"
        component={EnhancedDateInput}
        format={null}
        {...dateInputProps}
        validate={[required('Required')]}
      />
      <Button type="submit" disabled={pristine || submitting} className={css.submitBtn}>
        Select
      </Button>
    </form>
  );
};

FormComponent.propTypes = formPropTypes;

const Form = reduxForm({
  form: 'Styleguide.DateInput.Form',
})(FormComponent);

export const Empty = {
  component: Form,
  props: {
    dateInputProps: {
      onBlur: () => console.log('onBlur called from DateInput props.'),
      onChange: v => console.log('Changed to', moment(v).format('L')),
      onFocus: () => console.log('onFocus called from DateInput props.'),
      placeholder: 'Select important date',
    },
    onSubmit: v => {
      console.log('Submitting a form with values:', v);
    },
  },
};
