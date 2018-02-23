import React from 'react';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import * as validators from '../../util/validators';
import { Button } from '../../components';
import FieldBoolean from './FieldBoolean';

const formName = 'Styleguide.FieldBoolean.Form';

const FormComponent = props => {
  const { form, handleSubmit, invalid, pristine, submitting } = props;
  const required = validators.requiredBoolean('This field is required');
  const submitDisabled = invalid || pristine || submitting;
  return (
    <form onSubmit={handleSubmit}>
      <FieldBoolean
        id={`${form}.boolOption`}
        name="boolOption"
        label="Boolean option"
        placeholder="Choose yes/no"
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

export const YesNo = {
  component: Form,
  props: {
    onChange(values) {
      console.log('onChange:', values);
    },
    onSubmit(values) {
      console.log('onSubmit:', values);
    },
  },
  group: 'inputs',
};
