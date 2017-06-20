/* eslint-disable no-console */
import React from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button } from '../../components';
import * as validators from '../../util/validators';
import InputField from './InputField';

const FormComponent = props => {
  const { handleSubmit, pristine, submitting } = props;
  const required = validators.required('Required value missing');
  const buttonStyles = { marginTop: 16 };
  const submitDisabled = pristine || submitting;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="input1"
        type="text"
        label="Label for required input"
        placeholder="Placeholder..."
        validate={required}
        component={InputField}
      />
      <Field
        name="input2"
        type="text"
        label="Example input label"
        placeholder="Example input placeholder..."
        component={InputField}
      />
      <Field
        name="input3"
        type="text"
        placeholder="No label in this input..."
        component={InputField}
      />
      <Field
        name="input4"
        type="text"
        label="Label for input with initial value"
        component={InputField}
      />
      <Field
        name="textarea1"
        type="textarea"
        label="Label for textarea"
        placeholder="Textarea placeholder..."
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
    initialValues: {
      input4: 'Lorem ipsum',
    },
  },
  group: 'fields',
};
