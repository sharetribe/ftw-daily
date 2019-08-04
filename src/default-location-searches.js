import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-stockholm',
    predictionPlace: {
      address: 'Stockholm, Sweden',
      bounds: new LatLngBounds(new LatLng(59.41354065, 18.21628065), new LatLng(59.22879168 ,  17.91832901)),
    },
  }
];
