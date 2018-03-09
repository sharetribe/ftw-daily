/**
 * Slice a local number that is in the form
 * of 555 01234567
 */
const sliceLocal = numbers => {
  if (numbers.length <= 3) {
    return numbers;
  }
  return `${numbers.slice(0, 3)} ${numbers.slice(3, 10)}`;
};

/**
 * Slice an international phone number i.e.
 * the part that is followed after a '+' or '00'.
 */
const sliceInternational = numbers => {
  if (numbers.length <= 3) {
    return numbers;
  }
  if (numbers.length <= 5) {
    return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
  }
  return `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5, 12)}`;
};

/**
 * Format a phone number in a Finnish
 * mobile phone number format.
 *
 * Uses one of the following formats:
 *
 * +123 55 1234567
 * 00123 55 1234567
 * 555 1234567
 */
export const format = value => {
  if (!value) {
    return '';
  }

  const leadingPlus = value.match(/^\+/g);
  const leadingZeros = value.match(/^00/g);
  const numbers = value.replace(/[^\d]/g, '');

  if (leadingPlus) {
    const plus = leadingPlus[0];
    const sliced = sliceInternational(numbers);
    return `${plus}${sliced}`;
  }

  if (leadingZeros && numbers.length > 2) {
    const zeros = leadingZeros[0];
    const trailingNumbers = numbers.substring(2, numbers.length);
    const sliced = sliceInternational(trailingNumbers);
    return `${zeros}${sliced}`;
  }

  return sliceLocal(numbers);
};

/**
 * Parser that strips whitespaces away from a phone number
 * string so that the plain number can be stored.
 */
export const parse = value => (value ? value.replace(/\s/g, '') : '');
