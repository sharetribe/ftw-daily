/* eslint-disable no-console */
import React from 'react';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import moment from 'moment';
import { Button } from '../../components';
import { required } from '../../util/validators';
import DateInputField from './DateInputField';

import css from './DateInputField.example.css';

const FormComponent = props => {
  const { form, handleSubmit, pristine, submitting, dateInputProps } = props;
  const submitDisabled = pristine || submitting;
  return (
    <form onSubmit={handleSubmit}>
      <DateInputField
        name="bookingStart"
        id={`${form}.bookingStart`}
        label="Select date:"
        format={null}
        validate={[required('Required')]}
        {...dateInputProps}
      />
      <Button type="submit" disabled={submitDisabled} className={css.submitBtn}>
        Select
      </Button>
    </form>
  );
};

FormComponent.propTypes = formPropTypes;

const defaultFormName = 'Styleguide.DateInput.Form';

const Form = reduxForm({
  form: defaultFormName,
})(FormComponent);

export const Empty = {
  component: Form,
  props: {
    dateInputProps: {
      onBlur: () => console.log('onBlur called from DateInput props.'),
      onFocus: () => console.log('onFocus called from DateInput props.'),
      placeholder: 'Select important date',
    },
    onChange: values => {
      const { bookingStart } = values;
      console.log('Changed to', moment(bookingStart).format('L'));
    },
    onSubmit: values => {
      console.log('Submitting a form with values:', values);
    },
  },
  group: 'custom inputs',
};
