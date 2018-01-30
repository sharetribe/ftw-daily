/* eslint-disable no-console */
import React from 'react';
import { reduxForm } from 'redux-form';
import * as validators from '../../util/validators';
import FieldBirthdayInput from './FieldBirthdayInput';

const formName = 'Styleguide.BirthdayInput.Form';

const FormComponent = () => {
  const required = validators.required('A valid date is required');
  const minAge = 18;
  const minAgeRequired = validators.ageAtLeast(`Age should be at least ${minAge}`, minAge);
  return (
    <form>
      <FieldBirthdayInput
        id={`${formName}.birthday`}
        name="birthday"
        label="Date of birth"
        format={null}
        validate={[required, minAgeRequired]}
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
