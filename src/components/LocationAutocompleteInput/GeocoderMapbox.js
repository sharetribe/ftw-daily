import { types as sdkTypes } from '../../util/sdkLoader';
import { userLocation } from '../../util/maps';
import config from '../../config';

const { LatLng: SDKLatLng, LatLngBounds: SDKLatLngBounds } = sdkTypes;

export const CURRENT_LOCATION_ID = 'current-location';
const CURRENT_LOCATION_BOUNDS_DISTANCE = 1000; // meters

const locationBounds = (latlng, distance) => {
  const bounds = new window.mapboxgl.LngLat(latlng.lng, latlng.lat).toBounds(distance);
  return new SDKLatLngBounds(
    new SDKLatLng(bounds.getNorth(), bounds.getEast()),
    new SDKLatLng(bounds.getSouth(), bounds.getWest())
  );
};

const placeOrigin = prediction => {
  if (prediction && Array.isArray(prediction.center) && prediction.center.length === 2) {
    // Coordinates in Mapbox features are represented as [longitude, latitude].
    return new SDKLatLng(prediction.center[1], prediction.center[0]);
  }
  return null;
};

const placeBounds = prediction => {
  if (prediction && Array.isArray(prediction.bbox) && prediction.bbox.length === 4) {
    // Bounds in Mapbox features are represented as [minX, minY, maxX, maxY]
    return new SDKLatLngBounds(
      new SDKLatLng(prediction.bbox[3], prediction.bbox[2]),
      new SDKLatLng(prediction.bbox[1], prediction.bbox[0])
    );
  }
  return null;
};

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

export const GeocoderAttribution = () => null;

/**
 * A forward geocoding (place name -> coordinates) implementation
 * using the Mapbox Geocoding API.
 */
class GeocoderMapbox {
  constructor() {
    this.client = window.mapboxSdk({
      accessToken: window.mapboxgl.accessToken,
    });
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
    return this.client.geocoding
      .forwardGeocode({
        query: search,
        limit: 5,
        language: [config.locale],
      })
      .send()
      .then(response => {
        return {
          search,
          predictions: response.body.features,
        };
      });
  }

  /**
   * Get the ID of the given prediction.
   */
  getPredictionId(prediction) {
    return prediction.id;
  }

  /**
   * Get the address text of the given prediction.
   */
  getPredictionAddress(prediction) {
    if (prediction.predictionPlace) {
      // default prediction defined above
      return prediction.predictionPlace.address;
    }
    // prediction from Mapbox geocoding API
    return prediction.place_name;
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

    return Promise.resolve({
      address: this.getPredictionAddress(prediction),
      origin: placeOrigin(prediction),
      bounds: placeBounds(prediction),
    });
  }
}

export default GeocoderMapbox;
