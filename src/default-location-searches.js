import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-montreal-north',
    predictionPlace: {
      address: 'Greater Montreal',
      bounds: new LatLngBounds(new LatLng(45.70557, -73.47303), new LatLng(45.41008, -73.97290)),
    },
  },              
];
