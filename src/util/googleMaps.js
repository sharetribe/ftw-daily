import { types as sdkTypes } from '../util/sdkLoader';

const { LatLng: SDKLatLng, LatLngBounds: SDKLatLngBounds } = sdkTypes;

const placeOrigin = place => {
  if (place && place.geometry && place.geometry.location) {
    return new SDKLatLng(place.geometry.location.lat(), place.geometry.location.lng());
  }
  return null;
};

const placeBounds = place => {
  if (place && place.geometry && place.geometry.viewport) {
    const ne = place.geometry.viewport.getNorthEast();
    const sw = place.geometry.viewport.getSouthWest();
    return new SDKLatLngBounds(
      new SDKLatLng(ne.lat(), ne.lng()),
      new SDKLatLng(sw.lat(), sw.lng())
    );
  }
  return null;
};

/**
 * Get a detailed place object
 *
 * @param {String} placeId - ID for a place received from the
 * autocomplete service
 * @param {String} sessionToken - token to tie different autocomplete character searches together
 * with getPlaceDetails call
 *
 * @return {Promise<util.propTypes.place>} Promise that
 * resolves to the detailed place, rejects if the request failed
 */
export const getPlaceDetails = (placeId, sessionToken) =>
  new Promise((resolve, reject) => {
    const serviceStatus = window.google.maps.places.PlacesServiceStatus;
    const el = document.createElement('div');
    const service = new window.google.maps.places.PlacesService(el);
    const fields = ['address_component', 'formatted_address', 'geometry', 'place_id'];
    const sessionTokenMaybe = sessionToken ? { sessionToken } : {};

    service.getDetails({ placeId, fields, ...sessionTokenMaybe }, (place, status) => {
      if (status !== serviceStatus.OK) {
        reject(
          new Error(`Could not get details for place id "${placeId}", error status was "${status}"`)
        );
      } else {
        resolve({
          address: place.formatted_address,
          origin: placeOrigin(place),
          bounds: placeBounds(place),
        });
      }
    });
  });

const predictionSuccessful = status => {
  const { OK, ZERO_RESULTS } = window.google.maps.places.PlacesServiceStatus;
  return status === OK || status === ZERO_RESULTS;
};

/**
 * Get place predictions for the given search
 *
 * @param {String} search - place name or address to search
 * @param {String} sessionToken - token to tie different autocomplete character searches together
 * with getPlaceDetails call
 *
 * @return {Promise<{ search, predictions[] }>} - Promise of an object
 * with the original search query and an array of
 * `google.maps.places.AutocompletePrediction` objects
 */
export const getPlacePredictions = (search, sessionToken) =>
  new Promise((resolve, reject) => {
    const service = new window.google.maps.places.AutocompleteService();
    const sessionTokenMaybe = sessionToken ? { sessionToken } : {};

    service.getPlacePredictions({ input: search, ...sessionTokenMaybe }, (predictions, status) => {
      if (!predictionSuccessful(status)) {
        reject(new Error(`Prediction service status not OK: ${status}`));
      } else {
        const results = {
          search,
          predictions: predictions || [],
        };
        resolve(results);
      }
    });
  });

/**
 * Convert Google formatted LatLng object to Sharetribe SDK's LatLng coordinate format
 *
 * @param {LatLng} googleLatLng - Google Maps LatLng
 *
 * @return {SDKLatLng} - Converted latLng coordinate
 */
export const googleLatLngToSDKLatLng = googleLatLng => {
  return new SDKLatLng(googleLatLng.lat(), googleLatLng.lng());
};

/**
 * Convert Google formatted bounds object to Sharetribe SDK's bounds format
 *
 * @param {LatLngBounds} googleBounds - Google Maps LatLngBounds
 *
 * @return {SDKLatLngBounds} - Converted bounds
 */
export const googleBoundsToSDKBounds = googleBounds => {
  if (!googleBounds) {
    return null;
  }
  const ne = googleBounds.getNorthEast();
  const sw = googleBounds.getSouthWest();
  return new SDKLatLngBounds(new SDKLatLng(ne.lat(), ne.lng()), new SDKLatLng(sw.lat(), sw.lng()));
};

/**
 * Cut some precision from bounds coordinates to tackle subtle map movements
 * when map is moved manually
 *
 * @param {LatLngBounds} sdkBounds - bounds to be changed to fixed precision
 * @param {Number} fixedPrecision - integer to be used on tofixed() change.
 *
 * @return {SDKLatLngBounds} - bounds cut to given fixed precision
 */
export const sdkBoundsToFixedCoordinates = (sdkBounds, fixedPrecision) => {
  const fixed = n => Number.parseFloat(n.toFixed(fixedPrecision));
  const ne = new SDKLatLng(fixed(sdkBounds.ne.lat), fixed(sdkBounds.ne.lng));
  const sw = new SDKLatLng(fixed(sdkBounds.sw.lat), fixed(sdkBounds.sw.lng));

  return new SDKLatLngBounds(ne, sw);
};

/**
 * Check if given bounds object have the same coordinates
 *
 * @param {LatLngBounds} sdkBounds1 - bounds #1 to be compared
 * @param {LatLngBounds} sdkBounds2 - bounds #2 to be compared
 *
 * @return {boolean} - true if bounds are the same
 */
export const hasSameSDKBounds = (sdkBounds1, sdkBounds2) => {
  if (!(sdkBounds1 instanceof SDKLatLngBounds) || !(sdkBounds2 instanceof SDKLatLngBounds)) {
    return false;
  }
  return (
    sdkBounds1.ne.lat === sdkBounds2.ne.lat &&
    sdkBounds1.ne.lng === sdkBounds2.ne.lng &&
    sdkBounds1.sw.lat === sdkBounds2.sw.lat &&
    sdkBounds1.sw.lng === sdkBounds2.sw.lng
  );
};
