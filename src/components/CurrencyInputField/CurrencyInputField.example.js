/* eslint-disable no-console */
import React, { PropTypes } from 'react'; // eslint-disable-line react/no-deprecated
import { IntlProvider, addLocaleData } from 'react-intl';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import en from 'react-intl/locale-data/en';
import fi from 'react-intl/locale-data/fi';
import { currencyConfig } from '../../util/test-data';
import * as validators from '../../util/validators';
import CurrencyInputField, { CurrencyInput } from './CurrencyInputField';

const defaultConfig = {
  ...currencyConfig,
  currency: 'USD',
};

// eslint-disable-next-line no-console
const onChange = price => console.log('CurrencyInput - value:', price);

// Different locales need to be initialized before their currency formatting is in use
const CurrencyInputWithIntl = ({ locale, ...rest }) => {
  if (locale === 'en-US') {
    addLocaleData([...en]);
  } else {
    addLocaleData([...fi]);
  }
  return (
    <IntlProvider locale={locale}><CurrencyInput {...rest} input={{ onChange }} /></IntlProvider>
  );
};

const { object, string } = PropTypes;

CurrencyInputWithIntl.propTypes = {
  currencyConfig: object.isRequired,
  locale: string.isRequired,
};

// Empty field with en-US locale
export const EmptyWithEnUS = {
  component: CurrencyInputWithIntl,
  props: {
    currencyConfig: defaultConfig,
    locale: 'en-US',
  },
  group: 'custom inputs',
};

// Default value with fi-FI locale
export const defaultValueWithFiFI = {
  component: CurrencyInputWithIntl,
  props: {
    currencyConfig: { ...defaultConfig, currency: 'EUR' },
    locale: 'fi-FI',
    defaultValue: 9999.99,
  },
  group: 'custom inputs',
};

const formName = 'Styleguide.CurrencyInputField.Form';

const FormComponent = props => {
  const { form } = props;
  const required = validators.required('This field is required');
  return (
    <form>
      <CurrencyInputField
        name="price"
        id={`${form}.price`}
        label="Set price:"
        placeholder="Type in amount in EUR..."
        currencyConfig={{ ...defaultConfig, currency: 'EUR' }}
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
