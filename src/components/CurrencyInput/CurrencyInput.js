/**
 * CurrencyInput renders an input field that format it's value according to currency formatting rules
 * onFocus: renders given value in unformatted manner: "9999,99"
 * onBlur: formats the given input: "9 999,99 €"
 */
import React, { Component, PropTypes } from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { types } from '../../util/sdkLoader';
import {
  convertUnitToSubUnit,
  convertMoneyToNumber,
  ensureDotSeparator,
  ensureSeparator,
  truncateToSubUnitPrecision,
} from '../../util/currency';
import * as propTypes from '../../util/propTypes';

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
      : new types.Money(
          convertUnitToSubUnit(unformattedValue, currencyConfig.subUnitDivisor),
          currencyConfig.currency
        );
  } catch (e) {
    return null;
  }
};

class CurrencyInput extends Component {
  constructor(props) {
    super(props);
    const { currencyConfig, defaultValue, input, intl } = props;
    const initialValue = input.value instanceof types.Money
      ? convertMoneyToNumber(input.value, currencyConfig.subUnitDivisor)
      : defaultValue;

    // We need to handle number format - some locales use dots and some commas as decimal separator
    // TODO Figure out if this could be digged from React-Intl directly somehow
    const testSubUnitFormat = intl.formatNumber('1.1', currencyConfig);
    const usesComma = testSubUnitFormat.indexOf(',') >= 0;

    try {
      // whatever is passed as a default value, will be converted to currency string
      // Unformatted value is digits + localized sub unit separator ("9,99")
      const unformattedValue = initialValue
        ? truncateToSubUnitPrecision(
            ensureSeparator(initialValue.toString(), usesComma),
            currencyConfig.subUnitDivisor,
            usesComma
          )
        : '';
      // Formatted value fully localized currency string ("$1,000.99")
      const formattedValue = initialValue
        ? intl.formatNumber(ensureDotSeparator(unformattedValue), currencyConfig)
        : '';

      this.state = {
        formattedValue,
        unformattedValue,
        value: formattedValue,
        usesComma,
      };
    } catch (e) {
      // Print error, if default value isn't supported (see specs: truncateToSubUnitPrecision).
      // eslint-disable-next-line no-console
      console.error('CurrencyInput:', e);
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
    const { currencyConfig, input: { onBlur } } = this.props;
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
    const { currencyConfig, input: { onFocus } } = this.props;
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
      const targetValue = event.target.value;
      const isEmptyString = targetValue === '';
      const valueOrZero = isEmptyString ? '0' : targetValue;

      // truncate decimals to subunit precision: 10000.999 => 10000.99
      const truncatedValueString = truncateToSubUnitPrecision(
        valueOrZero,
        currencyConfig.subUnitDivisor,
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
    const { currencyConfig, defaultValue, placeholder, intl } = this.props;
    const placeholderText = placeholder || intl.formatNumber(defaultValue, currencyConfig);
    return (
      <input
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

CurrencyInput.defaultProps = {
  currencyConfig: null,
  defaultValue: 0,
  input: null,
  placeholder: null,
};

const { func, oneOfType, number, shape, string } = PropTypes;

CurrencyInput.propTypes = {
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

export default injectIntl(CurrencyInput);
