/* eslint-disable no-console */
import React from 'react';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button } from '../../components';
import StripeBankAccountTokenInputField from './StripeBankAccountTokenInputField';
import * as validators from '../../util/validators';

const FormComponentEur = props => {
  const { form, handleSubmit } = props;
  const country = 'DE';
  const currency = 'EUR';
  return (
    <form onSubmit={handleSubmit}>
      <StripeBankAccountTokenInputField
        id={`${form}.token`}
        name="token"
        country={country}
        currency={currency}
        routingNumberId={`${form}.routingNumber`}
        accountNumberId={`${form}.accountNumber`}
        validate={validators.required(' ')}
      />
      <Button style={{ marginTop: 24 }} type="submit">Submit</Button>
    </form>
  );
};

FormComponentEur.propTypes = formPropTypes;

const formNameEur = 'Styleguide.StripeBankAccountTokenInputField.formEur';
const FormEur = reduxForm({ form: formNameEur })(FormComponentEur);

export const DE_EUR = {
  component: FormEur,
  props: {
    onChange: values => {
      console.log('values changed to:', values);
    },
    onSubmit: values => {
      console.log('values changed to:', values);
    },
  },
  group: 'custom inputs',
};

const FormComponentUsd = props => {
  const { form, handleSubmit } = props;
  const country = 'US';
  const currency = 'USD';
  return (
    <form onSubmit={handleSubmit}>
      <StripeBankAccountTokenInputField
        id={`${form}.token`}
        name="token"
        country={country}
        currency={currency}
        routingNumberId={`${form}.routingNumber`}
        accountNumberId={`${form}.accountNumber`}
        validate={validators.required(' ')}
      />
      <Button style={{ marginTop: 24 }} type="submit">Submit</Button>
    </form>
  );
};

FormComponentUsd.propTypes = formPropTypes;

const formNameUsd = 'Styleguide.StripeBankAccountTokenInputField.formUsd';
const FormUsd = reduxForm({ form: formNameUsd })(FormComponentUsd);

export const US_USD = {
  component: FormUsd,
  props: {
    onChange: values => {
      console.log('values changed to:', values);
    },
    onSubmit: values => {
      console.log('values changed to:', values);
    },
  },
  group: 'custom inputs',
};
