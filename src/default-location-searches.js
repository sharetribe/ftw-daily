import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-helsinki',
    predictionPlace: {
      address: 'London, United Kingdom',
      bounds: new LatLngBounds(new LatLng(51.6225, 0.07227), new LatLng(51.4103, -0.2995)),
    },
  },
  {
    id: 'default-turku',
    predictionPlace: {
      address: 'Manchester, United Kingdom',
      bounds: new LatLngBounds(new LatLng(53.5462, -2.1426), new LatLng(53.424, -2.322)),
    },
  },
  {
    id: 'default-tampere',
    predictionPlace: {
      address: 'Bristol, United Kingdom',
      bounds: new LatLngBounds(new LatLng(51.5064, -2.51943719), new LatLng(51.4097, -2.67847513)),
    },
  },
  // {
  //   id: 'default-oulu',
  //   predictionPlace: {
  //     address: 'Oulu, Finland',
  //     bounds: new LatLngBounds(new LatLng(65.56434, 26.77069), new LatLng(64.8443, 24.11494)),
  //   },
  // },
  // {
  //   id: 'default-ruka',
  //   predictionPlace: {
  //     address: 'Ruka, Finland',
  //     bounds: new LatLngBounds(new LatLng(66.16997, 29.16773), new LatLng(66.16095, 29.13572)),
  //   },
  // },
];
