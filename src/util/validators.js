/**
 * Validator functions and helpers for Redux Forms
 */

// Redux Form expects and undefined value for a successful validation
const VALID = undefined;

export const required = message => value => {
  return value ? VALID : message;
};

export const maxLength = (message, maximumLength) => value => {
  return !value || value.length <= maximumLength ? VALID : message;
};

export const noEmptyArray = message => value => {
  return value && Array.isArray(value) && value.length > 0 ? VALID : message;
};
