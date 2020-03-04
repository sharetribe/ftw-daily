import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-london',
    predictionPlace: {
      address: 'London, United Kingdom',
      bounds: new LatLngBounds(new LatLng(51.67789511, 0.29732496), new LatLng(51.3925498, -0.57645)),
    },
  },
];
