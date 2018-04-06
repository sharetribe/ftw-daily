import React from 'react';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button } from '../../components';
import FieldCheckbox from './FieldCheckbox';
import { required } from '../../util/validators';

const formName = 'Styleguide.FieldCheckbox.Form';

const FormComponent = props => {
  const { form, handleSubmit, invalid, pristine, submitting } = props;

  const submitDisabled = invalid || pristine || submitting;

  return (
    <form onSubmit={handleSubmit}>
      <FieldCheckbox id="checkbox-id" name="checkbox-name" label="Check here, optional" />

      <FieldCheckbox
        id="checkbox-required-id"
        name="checkbox-required-name"
        label="Check here, required"
        validate={required('This field is required')}
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

export const Checkbox = {
  component: Form,
  props: {
    onSubmit: values => {
      console.log('Submit values of FieldCheckbox: ', values);
    },
  },
  group: 'inputs',
};
