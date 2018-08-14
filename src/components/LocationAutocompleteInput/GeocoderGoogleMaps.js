import React from 'react';
import { getPlacePredictions, getPlaceDetails, locationBounds } from '../../util/googleMaps';
import { userLocation } from '../../util/maps';
import css from './LocationAutocompleteInput.css';

export const CURRENT_LOCATION_ID = 'current-location';
const CURRENT_LOCATION_BOUNDS_DISTANCE = 1000; // meters

// A list of default predictions that can be shown when the user
// focuses on the autocomplete input without typing a search. This can
// be used to reduce typing and Geocoding API calls for common
// searches.
//
// Example:
//
// [
//   {
//     place_id: 'Place ID from Google Maps Places API',
//     description: 'Place name to show in the autocomplete dropdown',
//   },
// ]
//
// To know which values to set as defaults, log a real prediction
// object from the Places API call and copy the Place ID from the
// response.
export const defaultPredictions = [
  // // Current user location
  // {
  //   place_id: CURRENT_LOCATION_ID,
  //   // LocationAutocompleteInputImpl adds the text from the translations
  //   description: '',
  // },
  // {
  //   place_id: 'ChIJkQYhlscLkkYRY_fiO4S9Ts0',
  //   description: 'Helsinki, Finland',
  // },
];

// When displaying data from the Google Maps Places API, and
// attribution is required next to the results.
// See: https://developers.google.com/places/web-service/policies#powered
export const GeocoderAttribution = () => <div className={css.poweredByGoogle} />;

/**
 * A forward geocoding (place name -> coordinates) implementation
 * using the Google Maps Places API.
 */
class GeocoderGoogleMaps {
  constructor() {
    this.sessionToken = null;
  }
  getSessionToken() {
    this.sessionToken =
      this.sessionToken || new window.google.maps.places.AutocompleteSessionToken();
    return this.sessionToken;
  }

  // Public API
  //

  /**
   * Search places with the given name.
   *
   * @param {String} search query for place names
   *
   * @return {Promise<{ search: String, predictions: Array<Object>}>}
   * results of the geocoding, should have the original search query
   * and an array of predictions. The format of the predictions is
   * only relevant for the `getPlaceDetails` function below.
   */
  getPlacePredictions(search) {
    return getPlacePredictions(search, this.getSessionToken()).then(results => {
      return {
        search,
        predictions: results.predictions,
      };
    });
  }

  /**
   * Get the ID of the given prediction.
   */
  getPredictionId(prediction) {
    return prediction.place_id;
  }

  /**
   * Get the address text of the given prediction.
   */
  getPredictionAddress(prediction) {
    return prediction.description;
  }

  /**
   * Fetch or read place details from the selected prediction.
   *
   * @param {Object} prediction selected prediction object
   *
   * @return {Promise<util.propTypes.place>} a place object
   */
  getPlaceDetails(prediction) {
    if (this.getPredictionId(prediction) === CURRENT_LOCATION_ID) {
      return userLocation().then(latlng => {
        return {
          address: '',
          origin: latlng,
          bounds: locationBounds(latlng, CURRENT_LOCATION_BOUNDS_DISTANCE),
        };
      });
    }

    return getPlaceDetails(prediction.place_id, this.getSessionToken()).then(place => {
      this.sessionToken = null;
      return place;
    });
  }
}

export default GeocoderGoogleMaps;
