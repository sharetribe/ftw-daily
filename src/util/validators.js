import { types } from 'sharetribe-sdk';

const { LatLng } = types;

/**
 * Validator functions and helpers for Redux Forms
 */

// Redux Form expects and undefined value for a successful validation
const VALID = undefined;

export const required = message =>
  value => {
    return value ? VALID : message;
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
