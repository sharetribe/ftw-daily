import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { Button } from '..';
import FieldRadioButton from './FieldRadioButton';
const formName = 'Styleguide.FieldRadioButton.Form';

const FormComponent = props => (
  <FinalForm
    {...props}
    form={formName}
    render={fieldRenderProps => {
      const { handleSubmit, onChange, invalid, pristine, submitting } = fieldRenderProps;

      const submitDisabled = invalid || pristine || submitting;

      const required = true;

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
            id="option-id1"
            name="option-group"
            label="option 1"
            value="option1"
            showAsRequired={showAsRequired}
          />
          <FieldRadioButton
            id="option-id2"
            name="option-group"
            label="option 2"
            value="option2"
            showAsRequired={showAsRequired}
          />
          <FieldRadioButton
            id="option-id3"
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
  },
  group: 'inputs',
};
