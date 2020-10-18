import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-berkeley',
    predictionPlace: {
      address: 'Berkeley, United States',
      bounds: new LatLngBounds(new LatLng(37.992, -122.015), new LatLng(37.582, -122.484)),
    },
  },
  {
    id: 'default-losangeles',
    predictionPlace: {
      address: 'Los Angeles, United States',
      bounds: new LatLngBounds(new LatLng(34.669, -117.266), new LatLng(33.213, -118.855)),
    },
  }
];
