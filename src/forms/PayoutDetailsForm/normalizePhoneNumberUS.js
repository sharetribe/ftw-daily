// Normalize US phone number
// Stripe requires phone numbers for US companies and their owners

/**
 * Format a phone number: this is just an override for default formatting.
 */
export const format = value => (!value ? '' : value);

/**
 * Parser that strips non-digit characters away from a phone number
 * string unless they are dashes in correct places.
 *
 * Returns the given US phone number in format: 202-555-0102
 */
export const parse = value => {
  if (!value) {
    return value;
  }

  const phoneNumber =
    typeof value === 'string' && value.indexOf('+1') >= 0 ? value.substring(2) : value;

  const onlyNums = phoneNumber.replace(/[^\d]/g, '');

  if (onlyNums.length <= 3) {
    return onlyNums;
  } else if (onlyNums.length <= 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}`;
  } else {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
  }
};
