/* eslint-disable no-console */
import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import * as validators from '../../util/validators';
import { Button } from '../../components';
import FieldReviewRating from './FieldReviewRating';

const formName = 'Styleguide.FieldReviewRating.Form';

const FormComponent = props => (
  <FinalForm
    {...props}
    formId={formName}
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
          <FieldReviewRating
            id={`${formId}.rate1`}
            name="rating"
            label="Rate your experience"
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

export const StarRating = {
  component: FormComponent,
  props: {
    onChange: formState => {
      if (formState.dirty) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('submit values:', values);
    },
  },
  group: 'inputs',
};
