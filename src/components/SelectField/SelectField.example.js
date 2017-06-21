/* eslint-disable no-console */
import React from 'react';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import * as validators from '../../util/validators';
import { Button } from '../../components';
import SelectField from './SelectField';

const formName = 'Styleguide.SelectField.Form';

const FormComponent = props => {
  const { form, handleSubmit, invalid, pristine, submitting } = props;
  const required = validators.required('This field is required');
  const submitDisabled = invalid || pristine || submitting;
  return (
    <form onSubmit={handleSubmit}>
      <SelectField
        id={`${form}.select1`}
        name="select1"
        label="Choose an option:"
        validate={required}
      >
        <option value="">Pick something...</option>
        <option value="first">First option</option>
        <option value="second">Second option</option>
      </SelectField>
      <Button style={{ marginTop: 24 }} type="submit" disabled={submitDisabled}>Submit</Button>
    </form>
  );
};

FormComponent.propTypes = formPropTypes;

const Form = reduxForm({
  form: formName,
})(FormComponent);

export const Select = {
  component: Form,
  props: {
    onSubmit: values => {
      console.log('submit values:', values);
    },
  },
  group: 'inputs',
};
