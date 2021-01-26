/* eslint-disable no-console */
import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { Button } from '../../components';
import FieldRangeSlider from './FieldRangeSlider';

const formName = 'Styleguide.FieldRangeSlider.Form';

const FormComponent = props => (
  <FinalForm
    {...props}
    formId={formName}
    render={fieldRenderProps => {
      const {
        formId,
        handleSubmit,
        onChange,
        invalid,
        pristine,
        submitting,
        min,
        max,
        step,
        handles,
      } = fieldRenderProps;
      const submitDisabled = invalid || pristine || submitting;

      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <FormSpy onChange={onChange} />

          <FieldRangeSlider
            id={`${formId}.range`}
            name="range"
            label="Select range"
            min={min}
            max={max}
            step={step}
            handles={handles}
          />

          <Button style={{ marginTop: 24 }} type="submit" disabled={submitDisabled}>
            Submit
          </Button>
        </form>
      );
    }}
  />
);

export const FieldRangeSliderForm = {
  component: FormComponent,
  props: {
    min: 0,
    max: 1000,
    step: 5,
    handles: [333, 666],
    onChange: formState => {
      if (formState.dirty) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('submit values:', values);
    },
  },
  group: 'custom inputs',
};
