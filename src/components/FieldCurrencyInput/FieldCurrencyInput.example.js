/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import en from 'react-intl/locale-data/en';
import fi from 'react-intl/locale-data/fi';
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
  if (locale === 'en') {
    addLocaleData([...en]);
  } else {
    addLocaleData([...fi]);
  }
  return (
    <IntlProvider locale={locale}>
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

const formName = 'Styleguide.FieldCurrencyInput.Form';

const FormComponent = props => {
  const { form } = props;
  const required = validators.required('This field is required');
  return (
    <form>
      <FieldCurrencyInput
        name="price"
        id={`${form}.price`}
        label="Set price:"
        placeholder="Type in amount in EUR..."
        currencyConfig={currencyConfigEUR}
        validate={required}
      />
    </form>
  );
};

FormComponent.propTypes = formPropTypes;

const Form = reduxForm({
  form: formName,
})(FormComponent);

export const FieldInForm = {
  component: Form,
  props: {
    onChange: values => {
      console.log('form values changed to:', values);
    },
  },
  group: 'custom inputs',
};
