import { getPlacePredictions, getPlaceDetails } from '../../util/googleMaps';

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

  getPlacePredictions(search) {
    return getPlacePredictions(search, this.getSessionToken()).then(results => {
      return {
        search,
        predictions: results.predictions,
      };
    });
  }
  getPlaceDetails(prediction) {
    return getPlaceDetails(prediction.place_id, this.getSessionToken()).then(place => {
      this.sessionToken = null;
      return place;
    });
  }
}

export default GeocoderGoogleMaps;
