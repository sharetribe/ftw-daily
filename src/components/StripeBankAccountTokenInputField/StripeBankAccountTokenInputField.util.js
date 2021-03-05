import config from '../../config';

// Possible inputs Stripe might require for a country

// Bank account number (used in countries where IBAN is not in use)
export const ACCOUNT_NUMBER = 'accountNumber';
// Required for Japan
export const ACCOUNT_OWNER_NAME = 'accountOwnerName';
// Australian equivalent for routing number
export const BSB = 'bsb';
// Needed for creating full routing number in Canada
export const INSTITUTION_NUMBER = 'institutionNumber';
// Needed for creating full routing number in Canada
export const TRANSIT_NUMBER = 'transitNumber';
// Needed for creating full routing number in Hong Kong
export const CLEARING_CODE = 'clearingCode';
// Needed for creating full routing number in Hong Kong and Singapore
export const BRANCH_CODE = 'branchCode';
// Required for Japan
export const BRANCH_NAME = 'branchName';
// Required for Japan
export const BANK_NAME = 'bankName';
// Needed for creating full routing number in e.g. Singapore
export const BANK_CODE = 'bankCode';
// Clave Bancaria Estandarizada (standardized banking cipher) used in Mexico
export const CLABE = 'clabe';
// International bank account number (e.g. EU countries use this)
export const IBAN = 'iban';
// Routing number to separate bank account in different areas
export const ROUTING_NUMBER = 'routingNumber';
// British equivalent for routing number
export const SORT_CODE = 'sortCode';

// Currently supported bank account inputs
// the order here matters: account number input is asked after routing number and its equivalents
export const BANK_ACCOUNT_INPUTS = [
  BSB,
  TRANSIT_NUMBER,
  INSTITUTION_NUMBER,
  CLEARING_CODE,
  BANK_NAME,
  BANK_CODE,
  BRANCH_NAME,
  BRANCH_CODE,
  SORT_CODE,
  ROUTING_NUMBER,
  ACCOUNT_OWNER_NAME,
  ACCOUNT_NUMBER,
  IBAN,
  CLABE,
];

export const supportedCountries = config.stripe.supportedCountries.map(c => c.code);

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
    const inputsInString =
      inputsAsStrings.length > 1
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
 * Map inputs to correct Stripe keys
 *
 * @param {String} inputType - input type (e.g. 'routingNumber', 'IBAN')
 * @param {String} value - input value
 *
 * @return {Object} key - value in Object literal.
 */
export const mapInputsToStripeAccountKeys = (country, values) => {
  // Stripe documentation speaks about actual bank account terms of different countries
  // (like BSB, sort code, routing number), but all of those get mapped to one of
  // the two different request keys: routing_number or account_number
  // See: https://stripe.com/docs/payouts vs https://stripe.com/docs/connect/testing

  // We use those country specific terms since we want to show correct labels and errors for users,
  // so this mapping is needed before sending data to Stripe.

  // Stripe fails if there are spaces within the number, this is
  // why we have to clean value up first.

  switch (country) {
    case 'AT':
    case 'BE':
    case 'BG':
    case 'CY':
    case 'CZ':
    case 'DK':
    case 'EE':
    case 'FI':
    case 'FR':
    case 'DE':
    case 'GR':
    case 'HU':
    case 'IE':
    case 'IT':
    case 'LV':
    case 'LT':
    case 'LU':
    case 'MT':
    case 'NL':
    case 'PL':
    case 'PT':
    case 'RO':
    case 'SK':
    case 'SI':
    case 'ES':
    case 'SE':
    case 'CH':
    case 'NO':
      return { account_number: cleanedString(values[IBAN]) };
    case 'NZ':
      // NZ account number is typically presented in the format xx-xxxx-xxxxxxx-xxx
      // '-' separators must be removed before sending value to Stripe API
      return { account_number: cleanedString(values[ACCOUNT_NUMBER]).replace(/-/g, '') };
    case 'AU':
      return {
        routing_number: cleanedString(values[BSB]),
        account_number: cleanedString(values[ACCOUNT_NUMBER]),
      };
    case 'CA':
      return {
        routing_number: cleanedString(values[TRANSIT_NUMBER]).concat(
          cleanedString(values[INSTITUTION_NUMBER])
        ),
        account_number: cleanedString(values[ACCOUNT_NUMBER]),
      };
    case 'GB':
      return {
        routing_number: cleanedString(values[SORT_CODE]),
        account_number: cleanedString(values[ACCOUNT_NUMBER]),
      };
    case 'US':
      return {
        routing_number: cleanedString(values[ROUTING_NUMBER]),
        account_number: cleanedString(values[ACCOUNT_NUMBER]),
      };
    case 'SG':
      return {
        routing_number: cleanedString(values[BANK_CODE]).concat(
          '-',
          cleanedString(values[BRANCH_CODE])
        ),
        account_number: cleanedString(values[ACCOUNT_NUMBER]),
      };
    case 'HK':
      return {
        routing_number: cleanedString(values[CLEARING_CODE]).concat(
          '-',
          cleanedString(values[BRANCH_CODE])
        ),
        account_number: cleanedString(values[ACCOUNT_NUMBER]),
      };

    case 'JP':
      return {
        bank_name: values[BANK_NAME],
        branch_name: values[BRANCH_NAME],
        routing_number: cleanedString(values[BANK_CODE]).concat(values[BRANCH_CODE]),
        account_number: cleanedString(values[ACCOUNT_NUMBER]),
        account_holder_name: values[ACCOUNT_OWNER_NAME],
      };

    case 'MX':
      return {
        account_number: cleanedString(values[CLABE]),
      };
    default:
      throw new Error(`Not supported country (${country}) given to validator`);
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
