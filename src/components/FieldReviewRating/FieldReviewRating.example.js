/* eslint-disable no-console */
import React from 'react';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import * as validators from '../../util/validators';
import { Button } from '../../components';
import FieldReviewRating from './FieldReviewRating';

const formName = 'Styleguide.FieldReviewRating.Form';

const FormComponent = props => {
  const { form, handleSubmit, invalid, pristine, submitting } = props;
  const required = validators.required('This field is required');
  const submitDisabled = invalid || pristine || submitting;

  return (
    <form onSubmit={handleSubmit}>
      <FieldReviewRating
        id={`${form}.rate1`}
        name="rating"
        label="Rate your experience"
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

export const StarRating = {
  component: Form,
  props: {
    onSubmit: values => {
      console.log('submit values:', values);
    },
  },
  group: 'inputs',
};
