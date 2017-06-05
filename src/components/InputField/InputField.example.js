/* eslint-disable no-console */
import React from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button } from '../../components';
import * as validators from '../../util/validators';
import InputField from './InputField';

const FormComponent = props => {
  const { handleSubmit, pristine, submitting } = props;
  const required = validators.required('Example input error message');
  const buttonStyles = { marginTop: 16 };
  const submitDisabled = pristine || submitting;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="exampleInput"
        type="text"
        label="Example input label"
        placeholder="Example input placeholder..."
        validate={required}
        component={InputField}
      />
      <Button type="submit" disabled={submitDisabled} style={buttonStyles}>Submit form</Button>
    </form>
  );
};

FormComponent.propTypes = formPropTypes;

const defaultFormName = 'Styleguide.InputField';

const Form = reduxForm({
  form: defaultFormName,
})(FormComponent);

export const RequiredValueWithLabel = {
  component: Form,
  props: {
    onSubmit: values => {
      console.log('Submit values:', values);
    },
  },
  group: 'fields',
};
