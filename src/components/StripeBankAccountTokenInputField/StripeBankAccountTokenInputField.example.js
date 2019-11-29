/* eslint-disable no-console */
import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { Button } from '../../components';
import { stripeCountryConfigs } from './StripeBankAccountTokenInputField.util';
import StripeBankAccountTokenInputField from './StripeBankAccountTokenInputField';
import * as validators from '../../util/validators';

const formComponent = country => props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const { formName, handleSubmit, onChange } = fieldRenderProps;
      const currency = stripeCountryConfigs(country).currency;

      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <FormSpy onChange={onChange} />
          <StripeBankAccountTokenInputField
            id={`${formName}.token`}
            name="token"
            country={country}
            currency={currency}
            formName={formName}
            validate={validators.required(' ')}
          />
          <Button style={{ marginTop: 24 }} type="submit">
            Submit
          </Button>
        </form>
      );
    }}
  />
);

// DE
export const DE_EUR = {
  component: formComponent('DE'),
  props: {
    formName: 'DE_EUR',
    onChange: formState => {
      if (formState.dirty) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('values submitted:', values);
    },
  },
  group: 'custom inputs',
};

// US
export const US_USD = {
  component: formComponent('US'),
  props: {
    formName: 'US_USD',
    onChange: formState => {
      if (formState.dirty) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('values submitted:', values);
    },
  },
  group: 'custom inputs',
};

// GB
export const GB_GBP = {
  component: formComponent('GB'),
  props: {
    formName: 'GB_GBP',
    onChange: formState => {
      if (formState.dirty) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('values submitted:', values);
    },
  },
  group: 'custom inputs',
};

// AU
export const AU_AUD = {
  component: formComponent('AU'),
  props: {
    formName: 'AU_AUD',
    onChange: formState => {
      if (formState.dirty) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('values submitted:', values);
    },
  },
  group: 'custom inputs',
};

// CA
export const CA_CAD = {
  component: formComponent('CA'),
  props: {
    formName: 'CA_CAD',
    onChange: formState => {
      if (formState.dirty) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('values submitted:', values);
    },
  },
  group: 'custom inputs',
};

// JP
export const JP_JPY = {
  component: formComponent('JP'),
  props: {
    formName: 'JP_JPY',
    onChange: formState => {
      if (formState.dirty) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('values submitted:', values);
    },
  },
  group: 'custom inputs',
};
