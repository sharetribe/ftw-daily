import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import * as validators from '../../util/validators';
import { Button } from '../../components';
import FieldPhoneNumberInput from './FieldPhoneNumberInput';

const FormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const { formId, handleSubmit, onChange, invalid, pristine, submitting } = fieldRenderProps;
      const required = validators.required('This field is required');
      const submitDisabled = invalid || pristine || submitting;
      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <FormSpy onChange={onChange} />
          <FieldPhoneNumberInput
            id={`${formId}.phoneNumber`}
            name="phoneNumber"
            label="Phone number"
            placeholder="Phone number"
            validate={required}
          />
          <Button style={{ marginTop: 24 }} type="submit" disabled={submitDisabled}>
            Submit
          </Button>
        </form>
      );
    }}
  />
);

export const PhoneNumber = {
  component: FormComponent,
  props: {
    formId: 'Styleguide.FieldPhoneNumberInput.Form',
    onChange: formState => {
      if (formState.dirty) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit(values) {
      console.log('onSubmit:', values);
    },
  },
  group: 'inputs',
};
