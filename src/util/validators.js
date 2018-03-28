import moment from 'moment';
import { types as sdkTypes } from './sdkLoader';
import { toPairs } from 'lodash';

const { LatLng, Money } = sdkTypes;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 256;

const isNonEmptyString = val => {
  return typeof val === 'string' && val.trim().length > 0;
};

/**
 * Validator functions and helpers for Redux Forms
 */

// Redux Form expects and undefined value for a successful validation
const VALID = undefined;

export const required = message => value => {
  if (typeof value === 'undefined' || value === null) {
    // undefined or null values are invalid
    return message;
  }
  if (typeof value === 'string') {
    // string must be nonempty when trimmed
    return isNonEmptyString(value) ? VALID : message;
  }
  return VALID;
};

export const requiredStringNoTrim = message => value => {
  return typeof value === 'string' && value.length > 0 ? VALID : message;
};

// DEPRECATED in favor of required
export const requiredBoolean = message => value => {
  return typeof value === 'boolean' ? VALID : message;
};

// DEPRECATED in favor of required
export const requiredAndNonEmptyString = message => value => {
  return isNonEmptyString(value) ? VALID : message;
};

export const requiredFieldArrayCheckbox = message => value => {
  if (!value) {
    return message;
  }

  const entries = toPairs(value);
  const hasSelectedValues = entries.filter(e => !!e[1]).length > 0;
  return hasSelectedValues ? VALID : message;
};

export const minLength = (message, minimumLength) => value => {
  const hasLength = value && typeof value.length === 'number';
  return hasLength && value.length >= minimumLength ? VALID : message;
};

export const maxLength = (message, maximumLength) => value => {
  if (!value) {
    return VALID;
  }
  const hasLength = value && typeof value.length === 'number';
  return hasLength && value.length <= maximumLength ? VALID : message;
};

export const nonEmptyArray = message => value => {
  return value && Array.isArray(value) && value.length > 0 ? VALID : message;
};

export const autocompleteSearchRequired = message => value => {
  return value && value.search ? VALID : message;
};

export const autocompletePlaceSelected = message => value => {
  const selectedPlaceIsValid =
    value &&
    value.selectedPlace &&
    value.selectedPlace.address &&
    value.selectedPlace.origin instanceof LatLng;
  return selectedPlaceIsValid ? VALID : message;
};

export const bookingDateRequired = inValidDateMessage => value => {
  const dateIsValid = value && value.date instanceof Date;
  return !dateIsValid ? inValidDateMessage : VALID;
};

export const bookingDatesRequired = (inValidStartDateMessage, inValidEndDateMessage) => value => {
  const startDateIsValid = value && value.startDate instanceof Date;
  const endDateIsValid = value && value.endDate instanceof Date;

  if (!startDateIsValid) {
    return inValidStartDateMessage;
  } else if (!endDateIsValid) {
    return inValidEndDateMessage;
  } else {
    return VALID;
  }
};

// Source: http://www.regular-expressions.info/email.html
// See the link above for an explanation of the tradeoffs.
const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const emailFormatValid = message => value => {
  return value && EMAIL_RE.test(value) ? VALID : message;
};

export const moneySubUnitAmountAtLeast = (message, minValue) => value => {
  return value instanceof Money && value.amount >= minValue ? VALID : message;
};

export const ageAtLeast = (message, minYears) => value => {
  const now = moment();
  const ageInYears = now.diff(moment(value), 'years', true);
  return value && value instanceof Date && ageInYears >= minYears ? VALID : message;
};
