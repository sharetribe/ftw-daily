/**
 * CurrencyInput renders an input field that format it's value according to currency formatting rules
 * onFocus: renders given value in unformatted manner: "9999,99"
 * onBlur: formats the given input: "9 999,99 €"
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from '../../util/reactIntl';
import { Field } from 'react-final-form';
import classNames from 'classnames';
import Decimal from 'decimal.js';
import { ValidationError } from '../../components';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  isSafeNumber,
  unitDivisor,
  convertUnitToSubUnit,
  convertMoneyToNumber,
  ensureDotSeparator,
  ensureSeparator,
  truncateToSubUnitPrecision,
} from '../../util/currency';
import { propTypes } from '../../util/types';
import * as log from '../../util/log';

import css from './FieldCurrencyInput.module.css';

const { Money } = sdkTypes;

const allowedInputProps = allProps => {
  // Strip away props that are not passed to input element (or are overwritten)
  // eslint-disable-next-line no-unused-vars
  const { currencyConfig, defaultValue, intl, input, meta, ...inputProps } = allProps;
  return inputProps;
};

// Convert unformatted value (e.g. 10,00) to Money (or null)
const getPrice = (unformattedValue, currencyConfig) => {
  const isEmptyString = unformattedValue === '';
  try {
    return isEmptyString
      ? null
      : new Money(
          convertUnitToSubUnit(unformattedValue, unitDivisor(currencyConfig.currency)),
          currencyConfig.currency
        );
  } catch (e) {
    return null;
  }
};

class CurrencyInputComponent extends Component {
  constructor(props) {
    super(props);
    const { currencyConfig, defaultValue, input, intl } = props;
    const initialValueIsMoney = input.value instanceof Money;

    if (initialValueIsMoney && input.value.currency !== currencyConfig.currency) {
      const e = new Error('Value currency different from marketplace currency');
      log.error(e, 'currency-input-invalid-currency', { currencyConfig, inputValue: input.value });
      throw e;
    }

    const initialValue = initialValueIsMoney ? convertMoneyToNumber(input.value) : defaultValue;
    const hasInitialValue = typeof initialValue === 'number' && !isNaN(initialValue);

    // We need to handle number format - some locales use dots and some commas as decimal separator
    // TODO Figure out if this could be digged from React-Intl directly somehow
    const testSubUnitFormat = intl.formatNumber('1.1', currencyConfig);
    const usesComma = testSubUnitFormat.indexOf(',') >= 0;

    try {
      // whatever is passed as a default value, will be converted to currency string
      // Unformatted value is digits + localized sub unit separator ("9,99")
      const unformattedValue = hasInitialValue
        ? truncateToSubUnitPrecision(
            ensureSeparator(initialValue.toString(), usesComma),
            unitDivisor(currencyConfig.currency),
            usesComma
          )
        : '';
      // Formatted value fully localized currency string ("$1,000.99")
      const formattedValue = hasInitialValue
        ? intl.formatNumber(ensureDotSeparator(unformattedValue), currencyConfig)
        : '';

      this.state = {
        formattedValue,
        unformattedValue,
        value: formattedValue,
        usesComma,
      };
    } catch (e) {
      log.error(e, 'currency-input-init-failed', { currencyConfig, defaultValue, initialValue });
      throw e;
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.updateValues = this.updateValues.bind(this);
  }

  onInputChange(event) {
    event.preventDefault();
    event.stopPropagation();
    // Update value strings on state
    const { unformattedValue } = this.updateValues(event);
    // Notify parent component about current price change
    const price = getPrice(ensureDotSeparator(unformattedValue), this.props.currencyConfig);
    this.props.input.onChange(price);
  }

  onInputBlur(event) {
    event.preventDefault();
    event.stopPropagation();
    const {
      currencyConfig,
      input: { onBlur },
    } = this.props;
    this.setState(prevState => {
      if (onBlur) {
        // If parent component has provided onBlur function, call it with current price.
        const price = getPrice(ensureDotSeparator(prevState.unformattedValue), currencyConfig);
        onBlur(price);
      }
      return {
        value: prevState.formattedValue,
      };
    });
  }

  onInputFocus(event) {
    event.preventDefault();
    event.stopPropagation();
    const {
      currencyConfig,
      input: { onFocus },
    } = this.props;
    this.setState(prevState => {
      if (onFocus) {
        // If parent component has provided onFocus function, call it with current price.
        const price = getPrice(ensureDotSeparator(prevState.unformattedValue), currencyConfig);
        onFocus(price);
      }
      return {
        value: prevState.unformattedValue,
      };
    });
  }

  updateValues(event) {
    try {
      const { currencyConfig, intl } = this.props;
      const targetValue = event.target.value.trim();
      const isEmptyString = targetValue === '';
      const valueOrZero = isEmptyString ? '0' : targetValue;

      const targetDecimalValue = isEmptyString
        ? null
        : new Decimal(ensureDotSeparator(targetValue));

      const isSafeValue =
        isEmptyString || (targetDecimalValue.isPositive() && isSafeNumber(targetDecimalValue));
      if (!isSafeValue) {
        throw new Error(`Unsafe money value: ${targetValue}`);
      }

      // truncate decimals to subunit precision: 10000.999 => 10000.99
      const truncatedValueString = truncateToSubUnitPrecision(
        valueOrZero,
        unitDivisor(currencyConfig.currency),
        this.state.usesComma
      );
      const unformattedValue = !isEmptyString ? truncatedValueString : '';
      const formattedValue = !isEmptyString
        ? intl.formatNumber(ensureDotSeparator(truncatedValueString), currencyConfig)
        : '';

      this.setState({
        formattedValue,
        value: unformattedValue,
        unformattedValue,
      });

      return { formattedValue, value: unformattedValue, unformattedValue };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);

      // If an error occurs while filling input field, use previous values
      // This ensures that string like '12.3r' doesn't end up to a state.
      const { formattedValue, unformattedValue, value } = this.state;
      return { formattedValue, unformattedValue, value };
    }
  }

  render() {
    const { className, currencyConfig, defaultValue, placeholder, intl } = this.props;
    const placeholderText = placeholder || intl.formatNumber(defaultValue, currencyConfig);
    return (
      <input
        className={className}
        {...allowedInputProps(this.props)}
        value={this.state.value}
        onChange={this.onInputChange}
        onBlur={this.onInputBlur}
        onFocus={this.onInputFocus}
        type="text"
        placeholder={placeholderText}
      />
    );
  }
}

CurrencyInputComponent.defaultProps = {
  className: null,
  currencyConfig: null,
  defaultValue: null,
  input: null,
  placeholder: null,
};

const { func, oneOfType, number, shape, string, object } = PropTypes;

CurrencyInputComponent.propTypes = {
  className: string,
  currencyConfig: propTypes.currencyConfig.isRequired,
  defaultValue: number,
  intl: intlShape.isRequired,
  input: shape({
    value: oneOfType([string, propTypes.money]),
    onBlur: func,
    onChange: func.isRequired,
    onFocus: func,
  }).isRequired,

  placeholder: string,
};

export const CurrencyInput = injectIntl(CurrencyInputComponent);

const FieldCurrencyInputComponent = props => {
  const { rootClassName, className, id, label, input, meta, ...rest } = props;

  if (label && !id) {
    throw new Error('id required when a label is given');
  }

  const { valid, invalid, touched, error } = meta;

  // Error message and input error styles are only shown if the
  // field has been touched and the validation has failed.
  const hasError = touched && invalid && error;

  const inputClasses = classNames(css.input, {
    [css.inputSuccess]: valid,
    [css.inputError]: hasError,
  });

  const inputProps = { className: inputClasses, id, input, ...rest };
  const classes = classNames(rootClassName, className);
  return (
    <div className={classes}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <CurrencyInput {...inputProps} />
      <ValidationError fieldMeta={meta} />
    </div>
  );
};

FieldCurrencyInputComponent.defaultProps = {
  rootClassName: null,
  className: null,
  id: null,
  label: null,
};

FieldCurrencyInputComponent.propTypes = {
  rootClassName: string,
  className: string,

  // Label is optional, but if it is given, an id is also required so
  // the label can reference the input in the `for` attribute
  id: string,
  label: string,

  // Generated by final-form's Field component
  input: object.isRequired,
  meta: object.isRequired,
};

const FieldCurrencyInput = props => {
  return <Field component={FieldCurrencyInputComponent} {...props} />;
};

export default FieldCurrencyInput;
