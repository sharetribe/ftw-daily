/* eslint-disable no-console */
import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import * as validators from '../../util/validators';
import { Button } from '../../components';
import FieldMultiSelect from './FieldMultiSelect';

const FormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const { form, handleSubmit, onChange, invalid, pristine, submitting } = fieldRenderProps;
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
          <FieldMultiSelect id="select2" placeholder="placeholder" name="select2" label="Choose an option:" validate={required} 
          options={[
            {key: 'hair-stylist', label: 'Salon Chair'},
            {key: 'barber', label: 'Barber Chair'},
            {key: 'makeup-artist', label: 'Beauty Space'}]}
             />
            {/* <option value="">Pick something...</option>
            <option value="first">First option</option>
            <option value="second">Second option</option> */}
          {/* </FieldMultiSelect> */}
          <Button style={{ marginTop: 24 }} type="submit" disabled={submitDisabled}>
            Submit
          </Button>
        </form >
      );
    }}
/>
);

export const MultiSelect = {
  component: FormComponent,
  props: {
    onChange: formState => {
      if (formState.values.select2) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('submit values:', values);
      return false;
    },
  },
  group: 'inputs',
};
