
// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.

  
import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-lima',
    predictionPlace: {
      address: 'Lima, Perú',
      bounds: new LatLngBounds(new LatLng(-11.94376642, -76.87075813), new LatLng(-12.21475882, -77.23209704)),
    },
  },


  {
    id: 'default-cusco',
    predictionPlace: {
      address: 'Cusco, Perú',
      bounds: new LatLngBounds(new LatLng(-13.45955536 , -71.92894742), new LatLng(-13.57124394, -71.99672053)),
    },
  },




  {
    id: 'default-arequipa',
    predictionPlace: {
      address: 'Arequipa, Perú',
      bounds: new LatLngBounds(new LatLng(-16.3736953 , -71.5133359), new LatLng(-16.4349863 , -71.5657969)),
    },
  },

  {
    id: 'default-trujillo',
    predictionPlace: {
      address: 'Trujillo, Perú',
      bounds: new LatLngBounds(new LatLng(-8.0440082 , -78.98829761), new LatLng(-8.17877242 , -79.06861201)),
    },
  },

    {
    id: 'default-iquitos',
    predictionPlace: {
      address: 'Iquitos, Perú',
      bounds: new LatLngBounds(new LatLng(-3.66839665 , -73.17539101), new LatLng(-3.93973916 , -73.52996721)),
    },
  },

    {
    id: 'default-chiclayo',
    predictionPlace: {
      address: 'Chiclayo, Perú',
      bounds: new LatLngBounds(new LatLng(-6.72361987 , -79.78440704), new LatLng(-6.81698428 , -79.90699671)),
    },
  },


    {
    id: 'default-huancayo',
    predictionPlace: {
      address: 'Huancayo, Perú',
      bounds: new LatLngBounds(new LatLng(-12.02131216, -75.15240279), new LatLng(-12.12638183, -75.29249882)),
    },
  },































];