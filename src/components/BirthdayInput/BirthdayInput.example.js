/* eslint-disable no-console */
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import * as validators from '../../util/validators';
import { InputField } from '../../components';
import BirthdayInput from './BirthdayInput';

const FormComponent = () => {
  const required = validators.required('A valid date is required');
  return (
    <form>
      <Field
        name="birthday"
        label="Date of birth"
        format={null}
        type="custom"
        inputComponent={BirthdayInput}
        component={InputField}
        validate={required}
      />
    </form>
  );
};

const Form = reduxForm({
  form: 'Styleguide.BirthdayInput.Form',
})(FormComponent);

export const Empty = {
  component: Form,
  props: {
    onChange: ({ birthday }) => {
      console.log('birthday changed to:', birthday ? birthday.toUTCString() : birthday);
    },
  },
  group: 'inputs',
};
