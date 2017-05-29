import React, { PropTypes } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fi from 'react-intl/locale-data/fi';
import { currencyConfig } from '../../util/test-data';
import CurrencyInput from './CurrencyInput';

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
  group: 'inputs',
};

// Default value with fi-FI locale
export const defaultValueWithFiFI = {
  component: CurrencyInputWithIntl,
  props: {
    currencyConfig: { ...defaultConfig, currency: 'EUR' },
    locale: 'fi-FI',
    defaultValue: 9999.99,
  },
  group: 'inputs',
};
