/* eslint-disable no-console */
import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import * as validators from '../../util/validators';
import { Button } from '../../components';
import FieldTextInput from './FieldTextInput';

import css from './FieldTextInputExample.module.css';

const FormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const { handleSubmit, onChange, invalid, pristine, submitting, formName } = fieldRenderProps;
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
          <FieldTextInput
            className={css.field}
            type="text"
            id={`${formName}.input1`}
            name="input1"
            label="Input that requires a value:"
            validate={required}
          />
          <FieldTextInput
            className={css.field}
            type="text"
            id={`${formName}.input2`}
            name="input2"
            label="Input that does not require a value:"
          />
          <FieldTextInput
            className={css.field}
            type="text"
            name="input3"
            placeholder="Input without label..."
          />
          <FieldTextInput
            className={css.field}
            type="textarea"
            id={`${formName}.textarea1`}
            name="textarea1"
            label="Textarea that requires a value:"
            validate={required}
          />
          <FieldTextInput
            className={css.field}
            type="textarea"
            id={`${formName}.textarea2`}
            name="textarea2"
            label="Textarea that does not require a value:"
          />
          <FieldTextInput
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
    }}
  />
);

export const Inputs = {
  component: FormComponent,
  props: {
    formName: 'Inputs',
    onChange: formState => {
      if (Object.keys(formState.values).length > 0) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('submit values:', values);
    },
  },
  group: 'inputs',
};
