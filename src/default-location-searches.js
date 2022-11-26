import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
const defaultLocations = [
  {
    id: 'default-wien',
    predictionPlace: {
      address: 'Wien, Wien, Österreich',
      bounds: new LatLngBounds(new LatLng(48.3225389022517, 16.5775089932135), new LatLng(48.1176450051469, 16.1821500008094)),
    },
  },
  {
    id: 'default-graz',
    predictionPlace: {
      address: 'Graz, Steiermark, Österreich',
      bounds: new LatLngBounds(new LatLng(47.134501, 15.5342), new LatLng(47.011887, 15.349714)),
    },
  },
  {
    id: 'default-linz',
    predictionPlace: {
      address: 'Linz, Oberösterreich, Österreich',
      bounds: new LatLngBounds(new LatLng(48.378693, 14.409217), new LatLng(48.211371, 14.24572)),
    },
  },
  {
    id: 'default-salzburg',
    predictionPlace: {
      address: 'Salzburg, Salzburg, Österreich',
      bounds: new LatLngBounds(new LatLng(47.854459, 13.127278), new LatLng(47.751214, 12.985622)),
    },
  },
  {
    id: 'default-innsbruck',
    predictionPlace: {
      address: 'Innsbruck, Tirol, Österreich',
      bounds: new LatLngBounds(new LatLng(47.36012, 11.45595), new LatLng(47.210776, 11.301648)),
    },
  },
  {
    id: 'default-klagenfurt',
    predictionPlace: {
      address: 'Klagenfurt, Kärnten, Österreich',
      bounds: new LatLngBounds(new LatLng(46.708708, 14.41626), new LatLng(46.574389, 14.210253)),
    },
  },
];
export default defaultLocations;
