import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { Button } from '..';
import FieldRadioButton from './FieldRadioButton';

const FormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        handleSubmit,
        onChange,
        invalid,
        pristine,
        submitting,
        required,
        id,
      } = fieldRenderProps;

      const submitDisabled = invalid || pristine || submitting;

      const showAsRequired = pristine && required;

      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <FormSpy onChange={onChange} />
          <FieldRadioButton
            id={`${id}-option-id1`}
            name="option-group"
            label="option 1"
            value="option1"
            showAsRequired={showAsRequired}
          />
          <FieldRadioButton
            id={`${id}-option-id2`}
            name="option-group"
            label="option 2"
            value="option2"
            showAsRequired={showAsRequired}
          />
          <FieldRadioButton
            id={`${id}-option-id3`}
            name="option-group"
            label="option 3"
            value="option3"
            showAsRequired={showAsRequired}
          />

          <Button style={{ marginTop: 24 }} type="submit" disabled={submitDisabled}>
            Submit
          </Button>
        </form>
      );
    }}
  />
);

export const RadioButtonRequired = {
  component: FormComponent,
  props: {
    onChange: formState => {
      if (Object.keys(formState.values).length > 0) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('Submit values of FieldRadioButton: ', values);
    },
    required: true,
    id: 'radiobutton',
  },
  group: 'inputs',
};

export const RadioButtonNotRequired = {
  component: FormComponent,
  props: {
    onChange: formState => {
      if (Object.keys(formState.values).length > 0) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('Submit values of FieldRadioButton: ', values);
    },
    required: false,
    id: 'radiobutton2',
  },
  group: 'inputs',
};
