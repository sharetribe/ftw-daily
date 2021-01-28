import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-telaviv',
    predictionPlace: {
      address: 'Tel-Aviv, Israel',
      bounds: new LatLngBounds(new LatLng(32.13647, 34.82832), new LatLng(32.03245, 34.72308)),
    },
  },
  {
    id: 'default-beersheva',
    predictionPlace: {
      address: 'Beer-Sheva, Israel',
      bounds: new LatLngBounds(new LatLng(31.32343, 34.85481), new LatLng(31.19262, 34.73398)),
    },
  },
  {
    id: 'default-jerusalem',
    predictionPlace: {
      address: 'Jerusalem, Israel',
      bounds: new LatLngBounds(new LatLng(31.88756, 35.33691), new LatLng(31.6518, 35.11432)),
    },
  },
  {
    id: 'default-newyork',
    predictionPlace: {
      address: 'New York, US',
      bounds: new LatLngBounds(new LatLng(40.77578, -73.96200), new LatLng(40.739853, -73.96200)),
    },
  },
  {
    id: 'default-ruka',
    predictionPlace: {
      address: 'Ruka, Finland',
      bounds: new LatLngBounds(new LatLng(66.16997, 29.16773), new LatLng(66.16095, 29.13572)),
    },
  },
];
