import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-frankfurt',
    predictionPlace: {
      address: 'Frankfurt',
      bounds: new LatLngBounds(new LatLng(50.22687, 8.8), new LatLng(50.0154, 8.5)),
    },
  },
  {
    id: 'default-stuttgart',
    predictionPlace: {
      address: 'Stuttgart',
      bounds: new LatLngBounds(new LatLng(48.8, 9.2), new LatLng(48.7, 9.14)),
    },
  },
  {
    id: 'default-münchen',
    predictionPlace: {
      address: 'München',
      bounds: new LatLngBounds(new LatLng(48.24, 11.65), new LatLng(48.05, 11.50)),
    },
  },
];
