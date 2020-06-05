const Decimal = require('decimal.js');
const has = require('lodash/has');
const { types } = require('sharetribe-flex-sdk');
const { Money } = types;

/** Helper functions for handling currency */

// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER
// https://stackoverflow.com/questions/26380364/why-is-number-max-safe-integer-9-007-199-254-740-991-and-not-9-007-199-254-740-9
const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || -1 * (2 ** 53 - 1);
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 2 ** 53 - 1;

const isSafeNumber = decimalValue => {
  if (!(decimalValue instanceof Decimal)) {
    throw new Error('Value must be a Decimal');
  }
  return decimalValue.gte(MIN_SAFE_INTEGER) && decimalValue.lte(MAX_SAFE_INTEGER);
};

// See: https://en.wikipedia.org/wiki/ISO_4217
// See: https://stripe.com/docs/currencies
const subUnitDivisors = {
  AUD: 100,
  CAD: 100,
  CHF: 100,
  CNY: 100,
  DKK: 100,
  EUR: 100,
  GBP: 100,
  HKD: 100,
  INR: 100,
  JPY: 1,
  MXN: 100,
  NOK: 100,
  NZD: 100,
  SEK: 100,
  SGD: 100,
  USD: 100,
};

// Get the minor unit divisor for the given currency
exports.unitDivisor = currency => {
  if (!has(subUnitDivisors, currency)) {
    throw new Error(
      `No minor unit divisor defined for currency: ${currency} in /server/api-util/currency.js`
    );
  }
  return subUnitDivisors[currency];
};

////////// Currency manipulation in string format //////////

/**
 * Ensures that the given string uses only dots or commas
 * e.g. ensureSeparator('9999999,99', false) // => '9999999.99'
 *
 * @param {String} str - string to be formatted
 *
 * @return {String} converted string
 */
const ensureSeparator = (str, useComma = false) => {
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
const ensureDotSeparator = str => {
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
const convertToDecimal = str => {
  const dotFormattedStr = ensureDotSeparator(str);
  return new Decimal(dotFormattedStr);
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

// Detect if the given value is a goog.math.Long object
// See: https://google.github.io/closure-library/api/goog.math.Long.html
const isGoogleMathLong = value => {
  return typeof value === 'object' && isNumber(value.low_) && isNumber(value.high_);
};

/**
 * Converts given value to sub unit value and returns it as a number
 *
 * @param {Number|String} value
 *
 * @param {Decimal|Number|String} subUnitDivisor - should be something that can be converted to
 * Decimal. (This is a ratio between currency's main unit and sub units.)
 *
 * @param {boolean} useComma - optional.
 * Specify if return value should use comma as separator
 *
 * @return {number} converted value
 */
exports.convertUnitToSubUnit = (value, subUnitDivisor, useComma = false) => {
  const subUnitDivisorAsDecimal = convertDivisorToDecimal(subUnitDivisor);

  if (!(typeof value === 'number')) {
    throw new TypeError('Value must be number');
  }

  const val = new Decimal(value);
  const amount = val.times(subUnitDivisorAsDecimal);

  if (!isSafeNumber(amount)) {
    throw new Error(
      `Cannot represent money minor unit value ${amount.toString()} safely as a number`
    );
  } else if (amount.isInteger()) {
    return amount.toNumber();
  } else {
    throw new Error(`value must divisible by ${subUnitDivisor}`);
  }
};

/**
 * Convert Money to a number
 *
 * @param {Money} value
 *
 * @return {Number} converted value
 */
exports.convertMoneyToNumber = value => {
  if (!(value instanceof Money)) {
    throw new Error('Value must be a Money type');
  }
  const subUnitDivisorAsDecimal = convertDivisorToDecimal(this.unitDivisor(value.currency));
  let amount;

  if (isGoogleMathLong(value.amount)) {
    // TODO: temporarily also handle goog.math.Long values created by
    // the Transit tooling in the Sharetribe JS SDK. This should be
    // removed when the value.amount will be a proper Decimal type.

    // eslint-disable-next-line no-console
    console.warn('goog.math.Long value in money amount:', value.amount, value.amount.toString());

    amount = new Decimal(value.amount.toString());
  } else {
    amount = new Decimal(value.amount);
  }

  if (!isSafeNumber(amount)) {
    throw new Error(
      `Cannot represent money minor unit value ${amount.toString()} safely as a number`
    );
  }

  return amount.dividedBy(subUnitDivisorAsDecimal).toNumber();
};
