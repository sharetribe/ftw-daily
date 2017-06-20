/* eslint-disable no-console */
import React from 'react';
import { reduxForm } from 'redux-form';
import * as validators from '../../util/validators';
import { BirthdayInputField } from './BirthdayInputField';

const formName = 'Styleguide.BirthdayInput.Form';

const FormComponent = () => {
  const required = validators.required('A valid date is required');
  return (
    <form>
      <BirthdayInputField
        id={`${formName}.birthday`}
        name="birthday"
        label="Date of birth"
        format={null}
        validate={required}
      />
    </form>
  );
};

const Form = reduxForm({
  form: formName,
})(FormComponent);

export const Empty = {
  component: Form,
  props: {
    onChange: ({ birthday }) => {
      console.log('birthday changed to:', birthday ? birthday.toUTCString() : birthday);
    },
  },
  group: 'custom inputs',
};
