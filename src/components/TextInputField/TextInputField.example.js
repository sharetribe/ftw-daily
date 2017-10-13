/* eslint-disable no-console */
import React from 'react';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import * as validators from '../../util/validators';
import { Button } from '../../components';
import TextInputField from './TextInputField';

import css from './TextInputField.example.css';

const formName = 'Styleguide.TextInputField.Form';

const FormComponent = props => {
  const { handleSubmit, invalid, pristine, submitting } = props;
  const required = validators.required('This field is required');
  const submitDisabled = invalid || pristine || submitting;
  return (
    <form onSubmit={handleSubmit}>
      <TextInputField
        className={css.field}
        type="text"
        id={`${formName}.input1`}
        name="input1"
        label="Input that requires a value:"
        validate={required}
      />
      <TextInputField
        className={css.field}
        type="text"
        id={`${formName}.input2`}
        name="input2"
        label="Input that does not require a value:"
      />
      <TextInputField
        className={css.field}
        type="text"
        name="input3"
        placeholder="Input without label..."
      />
      <TextInputField
        className={css.field}
        type="textarea"
        id={`${formName}.textarea1`}
        name="textarea1"
        label="Textarea that requires a value:"
        validate={required}
      />
      <TextInputField
        className={css.field}
        type="textarea"
        id={`${formName}.textarea2`}
        name="textarea2"
        label="Textarea that does not require a value:"
      />
      <TextInputField
        className={css.field}
        type="textarea"
        name="textarea3"
        placeholder="Textarea without label..."
      />
      <Button className={css.submit} type="submit" disabled={submitDisabled}>
        Submit
      </Button>
    </form>
  );
};

FormComponent.propTypes = formPropTypes;

const Form = reduxForm({
  form: formName,
})(FormComponent);

export const Inputs = {
  component: Form,
  props: {
    onSubmit: values => {
      console.log('submit values:', values);
    },
  },
  group: 'inputs',
};
