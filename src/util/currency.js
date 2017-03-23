import { trimEnd } from 'lodash';
import Decimal from 'decimal.js';

////////// Currency manipulation in string format //////////

/**
 * Ensures that the given string uses only dots or commas
 * e.g. ensureSeparator('9999999,99', false) // => '9999999.99'
 *
 * @param {String} str - string to be formatted
 *
 * @return {String} converted string
 */
export const ensureSeparator = (str, useComma = false) => {
  if (typeof str !== 'string') {
    throw new TypeError('Parameter must be a string');
  }
  return useComma ? str.replace(/\./g, ',') : str.replace(/,/g, '.');
};

/**
 * Ensures that the given string uses only dots
 * (e.g. JavaScript floats use dots)
 *
 * @param {String} str - string to be formatted
 *
 * @return {String} converted string
 */
export const ensureDotSeparator = str => {
  return ensureSeparator(str, false);
};

/**
 * Convert string to Decimal object (from Decimal.js math library)
 * Handles both dots and commas as decimal separators
 *
 * @param {String} str - string to be converted
 *
 * @return {Decimal} numeral value
 */
export const convertToDecimal = str => {
  const dotFormattedStr = ensureDotSeparator(str);
  return new Decimal(dotFormattedStr);
};

/**
 * Converts Decimal value to a string (from Decimal.js math library)
 *
 * @param {Decimal|Number|String} decimalValue
 *
 * @param {boolean} useComma - optional.
 * Specify if return value should use comma as separator
 *
 * @return {String} converted value
 */
export const convertDecimalToString = (decimalValue, useComma = false) => {
  const d = new Decimal(decimalValue);
  return ensureSeparator(d.toString(), useComma);
};

// Divisor can be positive value given as Decimal, Number, or String
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

/**
 * Limits value to sub-unit precision: "1.4567" -> "1.45"
 * Useful in input fields so this doesn't use rounding.
 *
 * @param {String} inputString - positive number presentation.
 *
 * @param {Decimal|Number|String} subUnitDivisor - a ratio between currency's
 * main unit and sub units
 *
 * @param {boolean} useComma - optional.
 * Specify if return value should use comma as separator
 *
 * @return {String} truncated value
 */
export const truncateToSubUnitPrecision = (inputString, subUnitDivisor, useComma = false) => {
  const subUnitDivisorAsDecimal = convertDivisorToDecimal(subUnitDivisor);

  // '10,' should be passed through, but that format is not supported as valid number
  const trimmed = trimEnd(inputString, useComma ? ',' : '.');
  // create another instance and check if value is convertable
  const value = convertToDecimal(trimmed, useComma);

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
    return ensureSeparator(decimalPrecisionMax2, useComma);
  } else {
    // truncate strings ('9.999' => '9.99')
    const truncated = amount.truncated().dividedBy(subUnitDivisorAsDecimal);
    return convertDecimalToString(truncated, useComma);
  }
};

////////// Currency - Money helpers //////////

/**
 * Converts given value to sub unit value and returns it as a number
 *
 * @param {Number|String} value
 *
 * @param {Decimal|Number|String} subUnitDivisor - a ratio between currency's
 * main unit and sub units
 *
 * @param {boolean} useComma - optional.
 * Specify if return value should use comma as separator
 *
 * @return {number} converted value
 */
export const convertUnitToSubUnit = (value, subUnitDivisor, useComma = false) => {
  const subUnitDivisorAsDecimal = convertDivisorToDecimal(subUnitDivisor);

  if (!(typeof value === 'string' || typeof value === 'number')) {
    throw new TypeError('Value must be either number or string');
  }

  const val = typeof value === 'string' ? convertToDecimal(value, useComma) : new Decimal(value);
  const amount = val.times(subUnitDivisorAsDecimal);

  if (amount.isInteger()) {
    return amount.toNumber();
  } else {
    throw new Error(`value must divisible by ${subUnitDivisor}`);
  }
};
