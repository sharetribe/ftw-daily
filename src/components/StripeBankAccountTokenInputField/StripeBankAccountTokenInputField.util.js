import config from '../../config';

// Possible inputs Stripe might require for a country

// Bank account number (used in countries where IBAN is not in use)
export const ACCOUNT_NUMBER = 'accountNumber';
// Australian equivalent for routing number
export const BSB = 'bsb';
// International bank account number (e.g. EU countries use this)
export const IBAN = 'iban';
// Routing number to separate bank account in different areas
export const ROUTING_NUMBER = 'routingNumber';
// British equivalent for routing number
export const SORT_CODE = 'sortCode';

// Currently supported bank account inputs
// the order here matters: account number input is asked after routing number and its equivalents
export const BANK_ACCOUNT_INPUTS = [BSB, SORT_CODE, ROUTING_NUMBER, ACCOUNT_NUMBER, IBAN];

export const supportedCountries = config.stripe.supportedCountries.map(c => c.code);

/**
 * Create a single-use token from the given bank account data
 *
 * See: https://stripe.com/docs/stripe.js#collecting-bank-account-details
 *
 * @param {Object} data - bank account data sent to Stripe
 *
 * @return {Promise<String>} Promise that resolves with the bank
 * account token or rejects when the token creation fails
 */
export const createToken = data =>
  new Promise((resolve, reject) => {
    window.Stripe.bankAccount.createToken(data, (status, response) => {
      if (response.error) {
        const e = new Error(response.error.message);
        e.stripeError = response.error;
        reject(e);
      } else {
        resolve(response.id);
      }
    });
  });

/**
 * Country specific Stripe configurations
 *
 * @param {String} countryCode - string representing country code (e.g. 'US', 'FI')
 *
 * @return {Object} configurations
 */
export const stripeCountryConfigs = countryCode => {
  const country = config.stripe.supportedCountries.find(c => c.code === countryCode);

  if (!country) {
    throw new Error(`Country code not found in Stripe config ${countryCode}`);
  }
  return country;
};

/**
 * Return all the inputs that are required in given country
 *
 * @param {String} countryCode - string representing country code (e.g. 'US', 'FI')
 *
 * @return {Array<String>} array containing different input 'types'
 * (e.g. ['routingNumber', 'accountNumber'])
 */
export const requiredInputs = countryCode => {
  const bankAccountInputs = stripeCountryConfigs(countryCode).accountConfig;
  return BANK_ACCOUNT_INPUTS.filter(inputType => bankAccountInputs[inputType]);
};

/**
 * Translate input type to human readable string
 *
 * @param {String} inputType - string representing one of the required bank account input
 * @param {Object} intl - translation library to format messages
 *
 * @return {String} formatted message
 */
export const inputTypeToString = (inputType, intl) => {
  if (BANK_ACCOUNT_INPUTS.includes(inputType)) {
    return intl.formatMessage({ id: `StripeBankAccountTokenInputField.${inputType}.inline` });
  } else {
    throw new Error(`Unknown inputType (${inputType}) given to validator`);
  }
};

/**
 * Translate Stripe error
 *
 * @param {String} country - string representing country code (e.g. 'US', 'FI')
 * @param {Object} intl - translation library to format errors
 * @param {Object} stripeError - actual Stripe error, which functions as default message,
 * if no translation can be found
 *
 * @return {String} formatted Stripe error
 */
export const translateStripeError = (country, intl, stripeError) => {
  console.error('Stripe error:', stripeError); // eslint-disable-line no-console
  const inputs = requiredInputs(country);
  const ibanRequired = inputs[IBAN];
  if (ibanRequired) {
    return intl.formatMessage(
      {
        id: 'StripeBankAccountTokenInputField.genericStripeErrorIban',
        defaultMessage: stripeError.message,
      },
      { country }
    );
  } else {
    const inputsAsStrings = inputs.map(inputType => inputTypeToString(inputType, intl));

    const andTranslated = intl.formatMessage({
      id: 'StripeBankAccountTokenInputField.andBeforeLastItemInAList',
    });
    // Print required inputs (to be included to error message)
    // e.g. "bank code, branch code and account number"
    const inputsInString = inputsAsStrings.length > 1
      ? inputsAsStrings.join(', ').replace(/,([^,]*)$/, `${andTranslated} $1`)
      : inputsAsStrings[0];

    return intl.formatMessage(
      {
        id: 'StripeBankAccountTokenInputField.genericStripeError',
        defaultMessage: stripeError.message,
      },
      { country, inputs: inputsInString }
    );
  }
};

/**
 * Validate input before creating Token
 *
 * @param {String} inputType - input type (e.g. 'routingNumber', 'IBAN')
 * @param {String} value - input value
 * @param {String} country - string representing country code (e.g. 'US', 'FI')
 *
 * @return {Boolean} is valid value.
 */
export const validateInput = (inputType, value, country, stripe) => {
  switch (inputType) {
    case ACCOUNT_NUMBER:
      return stripe.bankAccount.validateAccountNumber(value, country);
    case ROUTING_NUMBER:
      return stripe.bankAccount.validateRoutingNumber(value, country);
    case BSB:
    case IBAN:
    case SORT_CODE:
      // Unfortunately we don't have validation for these yet
      // (Stripe errors work as validation)
      return true;

    default:
      throw new Error(`Unknown inputType (${inputType}) given to validator`);
  }
};

/**
 * Map inputs to correct Stripe keys
 *
 * @param {String} inputType - input type (e.g. 'routingNumber', 'IBAN')
 * @param {String} value - input value
 *
 * @return {Object} key - value in Object literal.
 */
export const mapInputsToStripeAccountKeys = (inputType, value) => {
  // Stripe documentation speaks about actual bank account terms of different countries
  // (like BSB, sort code, routing number), but all of those get mapped to one of
  // the two different request keys: routing_number or account_number
  // See: https://stripe.com/docs/payouts vs https://stripe.com/docs/connect/testing

  // We use those country specific terms since we want to show correct labels and errors for users,
  // so this mapping is needed before sending data to Stripe.

  switch (inputType) {
    case IBAN:
    case ACCOUNT_NUMBER:
      return { account_number: value };
    case BSB:
    case SORT_CODE:
    case ROUTING_NUMBER:
      return { routing_number: value };

    default:
      throw new Error(`Unknown inputType (${inputType}) given to validator`);
  }
};

/**
 * Translate messages related to different input types.
 *
 * Check translations for StripeBankAccountTokenInputField
 * from [rootFolder]/src/translations/en.json
 *
 * @param {Object} intl - translation library to format errors
 * @param {String} inputType - input type (e.g. 'routingNumber', 'IBAN')
 * @param {String} messageType - one of the different messages related to inputType
 * (e.g. 'inline', 'invalid', 'label', 'placeholder', 'required')
 *
 * @return {Object} key - value in Object literal.
 */
export const formatFieldMessage = (intl, inputType, messageType) => {
  if (!BANK_ACCOUNT_INPUTS.includes(inputType)) {
    throw new Error(`inputType (${inputType}) must be one of ${BANK_ACCOUNT_INPUTS}`);
  }

  return intl.formatMessage({
    id: `StripeBankAccountTokenInputField.${inputType}.${messageType}`,
  });
};

/**
 * Remove all whitespace from the given string.
 *
 * @param {String} str - target string
 *
 * @return {String} cleaned string
 */
export const cleanedString = str => {
  return str ? str.replace(/\s/g, '') : '';
};
