/* eslint-disable no-console */
import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import * as validators from '../../util/validators';
import FieldBirthdayInput from './FieldBirthdayInput';

const identity = v => v;

const FormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const { handleSubmit, onChange, values } = fieldRenderProps;
      const required = validators.required('A valid date is required');
      const minAge = 18;
      const minAgeRequired = validators.ageAtLeast(`Age should be at least ${minAge}`, minAge);

      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <FormSpy onChange={onChange} />
          <FieldBirthdayInput
            id={`birthday`}
            name="birthday"
            label="Date of birth"
            format={identity}
            valueFromForm={values.birthday}
            validate={validators.composeValidators(required, minAgeRequired)}
          />
        </form>
      );
    }}
  />
);

export const Empty = {
  component: FormComponent,
  props: {
    onChange: formState => {
      const birthday = formState.values.birthday;
      if (birthday) {
        console.log('birthday changed to:', birthday);
      }
    },
    onSubmit: values => {
      console.log('BirthdayInput.Form submitted values:', values);
    },
  },
  group: 'custom inputs',
};

export const WithInitialValue = {
  component: FormComponent,
  props: {
    initialValues: { birthday: new Date('1982-03-01') },
    onChange: formState => {
      const birthday = formState.values.birthday;
      if (birthday && formState.dirty) {
        console.log('birthday changed to:', birthday);
      }
    },
    onSubmit: values => {
      console.log('BirthdayInput.Form submitted values:', values);
    },
  },
  group: 'custom inputs',
};
