import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-zurich',
    predictionPlace: {
      address: 'Kanton Zürich, Schweiz',
      bounds: new LatLngBounds(new LatLng(47.6949199, 8.984900100000004), new LatLng(47.15945, 8.357889999999998)),
    },
  },
  {
    id: 'default-aargau',
    predictionPlace: {
      address: 'Kanton Aargau, Schweiz',
      bounds: new LatLngBounds(new LatLng(47.6209201, 8.455169999999953), new LatLng(47.13755, 7.713470099999995)),
    },
  },
  {
    id: 'default-luzern',
    predictionPlace: {
      address: 'Kanton Luzern, Schweiz',
      bounds: new LatLngBounds(new LatLng(47.2871001, 8.513900000000035), new LatLng(46.7749901, 7.836499900000035)),
    },
  },
  // {
  //   id: 'default-bern',
  //   predictionPlace: {
  //     address: 'Bern, Schweiz',
  //     bounds: new LatLngBounds(new LatLng(46.99027, 7.49555), new LatLng(46.919033, 7.294318)),
  //   },
  // },
  // {
  //   id: 'default-basel',
  //   predictionPlace: {
  //     address: 'Basel, Schweiz',
  //     bounds: new LatLngBounds(new LatLng(47.589902, 7.634148), new LatLng(47.519342, 7.554664)),
  //   },
  // },
];
