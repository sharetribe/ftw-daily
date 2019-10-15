import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-detroit',
    predictionPlace: {
      address: 'Detroit, USA',
      bounds: new LatLngBounds(new LatLng(42.436506, -83.307652), new LatLng(42.303893, -83.036794)),
    },
  },
];
