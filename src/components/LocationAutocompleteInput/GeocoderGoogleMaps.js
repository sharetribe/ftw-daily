import React from 'react';
// import { types as sdkTypes } from '../../util/sdkLoader';
import classNames from 'classnames';
import { getPlacePredictions, getPlaceDetails, locationBounds } from '../../util/googleMaps';
import { userLocation } from '../../util/maps';
import css from './LocationAutocompleteInput.css';

// const { LatLng: SDKLatLng, LatLngBounds: SDKLatLngBounds } = sdkTypes;

export const CURRENT_LOCATION_ID = 'current-location';
const CURRENT_LOCATION_BOUNDS_DISTANCE = 1000; // meters

// A list of default predictions that can be shown when the user
// focuses on the autocomplete input without typing a search. This can
// be used to reduce typing and Geocoding API calls for common
// searches.
export const defaultPredictions = [
  // Examples:
  // Current user location from the browser geolocation API
  // {
  //   id: CURRENT_LOCATION_ID,
  //   predictionPlace: {},
  // },
  // Helsinki
  // {
  //   id: 'default-helsinki',
  //   predictionPlace: {
  //     address: 'Helsinki, Finland',
  //     origin: new SDKLatLng(60.16985, 24.93837),
  //     bounds: new SDKLatLngBounds(
  //       new SDKLatLng(60.29783, 25.25448),
  //       new SDKLatLng(59.92248, 24.78287)
  //     ),
  //   },
  // },
];

// When displaying data from the Google Maps Places API, and
// attribution is required next to the results.
// See: https://developers.google.com/places/web-service/policies#powered
export const GeocoderAttribution = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.poweredByGoogle, className);
  return <div className={classes} />;
};

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
    if (prediction.predictionPlace) {
      // default prediction defined above
      return prediction.id;
    }
    // prediction from Google Maps Places API
    return prediction.place_id;
  }

  /**
   * Get the address text of the given prediction.
   */
  getPredictionAddress(prediction) {
    if (prediction.predictionPlace) {
      // default prediction defined above
      return prediction.predictionPlace.address;
    }
    // prediction from Google Maps Places API
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

    if (prediction.predictionPlace) {
      return Promise.resolve(prediction.predictionPlace);
    }

    return getPlaceDetails(prediction.place_id, this.getSessionToken()).then(place => {
      this.sessionToken = null;
      return place;
    });
  }
}

export default GeocoderGoogleMaps;
