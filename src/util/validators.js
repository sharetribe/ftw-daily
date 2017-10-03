import { types } from 'sharetribe-sdk';

const { LatLng } = types;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 256;

/**
 * Validator functions and helpers for Redux Forms
 */

// Redux Form expects and undefined value for a successful validation
const VALID = undefined;

export const required = message =>
  value => {
    return value ? VALID : message;
  };

export const minLength = (message, minimumLength) =>
  value => {
    return value && value.length >= minimumLength ? VALID : message;
  };

export const maxLength = (message, maximumLength) =>
  value => {
    return !value || value.length <= maximumLength ? VALID : message;
  };

export const noEmptyArray = message =>
  value => {
    return value && Array.isArray(value) && value.length > 0 ? VALID : message;
  };

export const autocompleteSearchRequired = message =>
  value => {
    return value && value.search ? VALID : message;
  };

export const autocompletePlaceSelected = message =>
  value => {
    const selectedPlaceIsValid = value &&
      value.selectedPlace &&
      value.selectedPlace.address &&
      value.selectedPlace.origin instanceof LatLng;
    return selectedPlaceIsValid ? VALID : message;
  };

export const bookingDatesRequired = (inValidStartDateMessage, inValidEndDateMessage) =>
  value => {
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

export const emailFormatValid = message =>
  value => {
    return value && EMAIL_RE.test(value) ? VALID : message;
  };
