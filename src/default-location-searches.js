import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
const defaultLocations = [
  {
    id: 'default-helsinki',
    predictionPlace: {
      address: 'Helsinki, Finland',
      bounds: new LatLngBounds(new LatLng(60.29783, 25.25448), new LatLng(59.92248, 24.78287)),
    },
  },
  {
    id: 'default-turku',
    predictionPlace: {
      address: 'New York',
      bounds: new LatLngBounds(new LatLng(41.2391317,-73.446683), new LatLng(40.2391317,-74.446683)),
    },
  },
  {
    id: 'default-tampere',
    predictionPlace: {
      address: 'San Francisco, California',
      bounds: new LatLngBounds(new LatLng(38.257815,-122.0076403), new LatLng(37.257815,-123.0076403)),
    },
  },
];
export default defaultLocations;
