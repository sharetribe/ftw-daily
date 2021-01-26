/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { IntlProvider } from '../../util/reactIntl';
import { currencyConfig } from '../../util/test-data';
import * as validators from '../../util/validators';
import FieldCurrencyInput, { CurrencyInput } from './FieldCurrencyInput';

const currencyConfigUSD = {
  ...currencyConfig,
  currency: 'USD',
};

const currencyConfigEUR = {
  ...currencyConfig,
  currency: 'EUR',
};

// eslint-disable-next-line no-console
const onChange = price => console.log('CurrencyInput - value:', price);

// Different locales need to be initialized before their currency formatting is in use
const CurrencyInputWithIntl = ({ locale, ...rest }) => {
  return (
    <IntlProvider locale={locale} textComponent="span">
      <CurrencyInput {...rest} input={{ onChange }} />
    </IntlProvider>
  );
};

const { object, string } = PropTypes;

CurrencyInputWithIntl.propTypes = {
  currencyConfig: object.isRequired,
  locale: string.isRequired,
};

export const EmptyWithEnUSD = {
  component: CurrencyInputWithIntl,
  props: {
    currencyConfig: currencyConfigUSD,
    locale: 'en',
  },
  group: 'custom inputs',
};

export const defaultValueWithEnUSD = {
  component: CurrencyInputWithIntl,
  props: {
    currencyConfig: currencyConfigUSD,
    locale: 'en',
    defaultValue: 9999.99,
  },
  group: 'custom inputs',
};

export const EmptyWithFiEUR = {
  component: CurrencyInputWithIntl,
  props: {
    currencyConfig: currencyConfigEUR,
    locale: 'fi',
  },
  group: 'custom inputs',
};

export const defaultValueWithFiEUR = {
  component: CurrencyInputWithIntl,
  props: {
    currencyConfig: currencyConfigEUR,
    locale: 'fi',
    defaultValue: 9999.99,
  },
  group: 'custom inputs',
};

const FormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const { handleSubmit, onChange } = fieldRenderProps;
      const required = validators.required('This field is required');

      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <FormSpy onChange={onChange} />
          <FieldCurrencyInput
            id="FieldCurrencyInput.price"
            name="price"
            label="Set price:"
            placeholder="Type in amount in EUR..."
            currencyConfig={currencyConfigEUR}
            validate={required}
          />
        </form>
      );
    }}
  />
);

export const FieldInForm = {
  component: FormComponent,
  props: {
    onChange: formState => {
      if (formState.values && formState.values.price) {
        console.log('form values changed to:', formState.values);
      }
    },
    onSubmit: values => {
      console.log('FieldInForm submitted values:', values);
      return false;
    },
  },
  group: 'custom inputs',
};
