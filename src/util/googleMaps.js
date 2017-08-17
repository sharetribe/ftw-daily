import { types } from '../util/sdkLoader';

const { LatLng: SDKLatLng, LatLngBounds: SDKLatLngBounds } = types;

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

const placeCountry = place => {
  if (place && place.address_components) {
    const country = place.address_components.find(component => {
      return component.types.includes('country');
    });
    return country ? country.short_name : null;
  }
  return null;
};

/**
 * Get a detailed place object
 *
 * @param {String} placeId - ID for a place received from the
 * autocomplete service
 *
 * @return {Promise<util.propTypes.place>} Promise that
 * resolves to the detailed place, rejects if the request failed
 */
export const getPlaceDetails = placeId =>
  new Promise((resolve, reject) => {
    const serviceStatus = window.google.maps.places.PlacesServiceStatus;
    const el = document.createElement('div');
    const service = new window.google.maps.places.PlacesService(el);

    service.getDetails({ placeId }, (place, status) => {
      if (status !== serviceStatus.OK) {
        reject(
          new Error(`Could not get details for place id "${placeId}", error status was "${status}"`)
        );
      } else {
        resolve({
          address: place.formatted_address,
          origin: placeOrigin(place),
          bounds: placeBounds(place),
          country: placeCountry(place),
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
 *
 * @return {Promise<{ search, predictions[] }>} - Promise of an object
 * with the original search query and an array of
 * `google.maps.places.AutocompletePrediction` objects
 */
export const getPlacePredictions = search =>
  new Promise((resolve, reject) => {
    const service = new window.google.maps.places.AutocompleteService();

    service.getPlacePredictions({ input: search }, (predictions, status) => {
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
  const ne = googleBounds.getNorthEast();
  const sw = googleBounds.getSouthWest();
  return new SDKLatLngBounds(new SDKLatLng(ne.lat(), ne.lng()), new SDKLatLng(sw.lat(), sw.lng()));
};
