import { trimEnd } from 'lodash';
import Decimal from 'decimal.js';

// Default config for currency formatting (for React-Intl).
export const currencyDefaultConfig = {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'symbol',
  useGrouping: true,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  subUnitDivisor: 100,
};

////////// Currency manipulation in string format //////////

// Ensures that the given string uses only dots or points
// ensureSeparator('9999999,99', false) // => '9999999.99'
export const ensureSeparator = (str, usePoint = false) => {
  if (typeof str !== 'string') {
    throw new Error('Parameter must be a string');
  }
  return usePoint ? str.split('.').join(',') : str.split(',').join('.');
};

// Ensures that the given string uses only dots (e.g. JavaScript floats use dots)
export const ensureDotSeparator = str => {
  return ensureSeparator(str, false);
};

// Convert string to Decimal object (from Decimal.js math library)
export const convertToDecimal = str => {
  const dotFormattedStr = ensureDotSeparator(str);
  try {
    return new Decimal(dotFormattedStr);
  } catch (e) {
    throw e;
  }
};

// Converts Decimal object to string
export const convertDecimalToString = (decimalValue, usePoint = false) => {
  try {
    const d = new Decimal(decimalValue);
    return ensureSeparator(d.toString(), usePoint);
  } catch (e) {
    throw e;
  }
};

const convertDivisorToDecimal = divisor => {
  try {
    const divisorAsDecimal = new Decimal(divisor);
    if (divisorAsDecimal.isNegative()) {
      throw new Error(`Parameter (${divisor}) must be a positive number.`);
    }
    return divisorAsDecimal;
  } catch (e) {
    throw new Error(`Parameter (${divisor}) must present a number.`, e);
  }
};

// Limits value to sub-unit precision: "1.4567" -> "1.45"
// Useful in input fields so this doesn't use rounding.
export const truncateToSubUnitPrecision = (inputString, subUnitDivisor, usePoint = false) => {
  const subUnitDivisorAsDecimal = convertDivisorToDecimal(subUnitDivisor);

  // '10,' should be passed through, but that format is not supported as valid number
  const trimmed = trimEnd(inputString, usePoint ? ',' : '.');
  // create another instance and check if value is convertable
  const value = convertToDecimal(trimmed, usePoint);

  if (value.isNegative()) {
    throw new Error(`Parameter (${inputString}) must be a positive number.`);
  }

  // Amount is always counted in subunits
  // E.g. $10 => 1000¢
  const amount = value.times(subUnitDivisorAsDecimal);

  // Amount must be integer
  // We don't deal with subunit fragments like 1000.345¢
  if (amount.isInteger()) {
    // accepted strings: '9', '9,' '9.' '9,99'
    const decimalCount2 = value.toFixed(2);
    const decimalPrecisionMax2 = decimalCount2.length >= inputString.length
      ? inputString
      : value.toFixed(2);
    return ensureSeparator(decimalPrecisionMax2, usePoint);
  } else {
    // truncate strings ('9.999' => '9.99')
    const truncated = amount.truncated().dividedBy(subUnitDivisorAsDecimal);
    return convertDecimalToString(truncated, usePoint);
  }
};

////////// Currency - Money helpers //////////

// Converts given value to sub unit value and returns it as a number
export const convertUnitToSubUnit = (value, subUnitDivisor, usePoint = false) => {
  const subUnitDivisorAsDecimal = convertDivisorToDecimal(subUnitDivisor);

  if (!(typeof value === 'string' || typeof value === 'number')) {
    throw new Error('Value must be either number or string');
  }

  const val = typeof value === 'string' ? convertToDecimal(value, usePoint) : new Decimal(value);
  const amount = val.times(subUnitDivisorAsDecimal);

  if (amount.isInteger()) {
    return amount.toNumber();
  } else {
    throw new Error(`value must divisible by ${subUnitDivisor}`);
  }
};
