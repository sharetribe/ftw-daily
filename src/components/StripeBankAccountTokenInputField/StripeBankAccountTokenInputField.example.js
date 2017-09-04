/* eslint-disable no-console */
import React from 'react';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button } from '../../components';
import { stripeCountryConfigs } from './StripeBankAccountTokenInputField.util';
import StripeBankAccountTokenInputField from './StripeBankAccountTokenInputField';
import * as validators from '../../util/validators';

const formComponent = country => {
  const FormComponent = props => {
    const { form, handleSubmit } = props;
    const currency = stripeCountryConfigs(country).currency;
    return (
      <form onSubmit={handleSubmit}>
        <StripeBankAccountTokenInputField
          id={`${form}.token`}
          name="token"
          country={country}
          currency={currency}
          formName={form}
          validate={validators.required(' ')}
        />
        <Button style={{ marginTop: 24 }} type="submit">Submit</Button>
      </form>
    );
  };
  FormComponent.propTypes = formPropTypes;
  return FormComponent;
};

// DE
const FormComponentEur = formComponent('DE');
const formNameEur = 'Styleguide.StripeBankAccountTokenInputField.formEur';
const FormEur = reduxForm({ form: formNameEur })(FormComponentEur);

export const DE_EUR = {
  component: FormEur,
  props: {
    onChange: values => {
      console.log('values changed to:', values);
    },
    onSubmit: values => {
      console.log('values submitted:', values);
    },
  },
  group: 'custom inputs',
};

// US
const FormComponentUsd = formComponent('US');
const formNameUsd = 'Styleguide.StripeBankAccountTokenInputField.formUsd';
const FormUsd = reduxForm({ form: formNameUsd })(FormComponentUsd);

export const US_USD = {
  component: FormUsd,
  props: {
    onChange: values => {
      console.log('values changed to:', values);
    },
    onSubmit: values => {
      console.log('values submitted:', values);
    },
  },
  group: 'custom inputs',
};

// GB
const FormComponentGbGbp = formComponent('GB');
const formNameGbp = 'Styleguide.StripeBankAccountTokenInputField.formGbGbp';
const formGbGbp = reduxForm({ form: formNameGbp })(FormComponentGbGbp);

export const GB_GBP = {
  component: formGbGbp,
  props: {
    onChange: values => {
      console.log('values changed to:', values);
    },
    onSubmit: values => {
      console.log('values submitted:', values);
    },
  },
  group: 'custom inputs',
};

// AU
const FormComponentAuAud = formComponent('AU');
const formNameAuAud = 'Styleguide.StripeBankAccountTokenInputField.formAuAud';
const formAuAud = reduxForm({ form: formNameAuAud })(FormComponentAuAud);

export const AU_AUD = {
  component: formAuAud,
  props: {
    onChange: values => {
      console.log('values changed to:', values);
    },
    onSubmit: values => {
      console.log('values submitted:', values);
    },
  },
  group: 'custom inputs',
};
