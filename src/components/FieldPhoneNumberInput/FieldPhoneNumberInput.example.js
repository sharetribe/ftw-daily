import React from 'react';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import * as validators from '../../util/validators';
import { Button } from '../../components';
import FieldPhoneNumberInput from './FieldPhoneNumberInput';

const formName = 'Styleguide.FieldPhoneNumberInput.Form';

const FormComponent = props => {
  const { form, handleSubmit, invalid, pristine, submitting } = props;
  const required = validators.required('This field is required');
  const submitDisabled = invalid || pristine || submitting;
  return (
    <form onSubmit={handleSubmit}>
      <FieldPhoneNumberInput
        id={`${form}.phoneNumber`}
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
};

FormComponent.propTypes = formPropTypes;

const Form = reduxForm({
  form: formName,
})(FormComponent);

export const PhoneNumber = {
  component: Form,
  props: {
    onSubmit(values) {
      console.log('onSubmit:', values);
    },
  },
  group: 'inputs',
};
