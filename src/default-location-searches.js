import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-GoldCoast',
    predictionPlace: {
      address: 'Gold Coast, Australia',
      bounds: new LatLngBounds(new LatLng(-27.28257185, 152.23278439), new LatLng(-29.48854627, 155.03641781)),
    },
  },
    {
    id: 'default-SunshineCoast',
    predictionPlace: {
      address: 'Sunshine Coast, Australia',
      bounds: new LatLngBounds(new LatLng(-26.03154436, 152.50210187), new LatLng(-27.58334397, 154.44603288)),
    },
  },
  {
    id: 'default-Torquay',
    predictionPlace: {
      address: 'Torquay, Australia',
      bounds: new LatLngBounds(new LatLng(-38.304366854, 144.280124032), new LatLng(-38.3594261655, 144.359813536)),
    },
  },
  {
    id: 'default-Bali',
    predictionPlace: {
      address: 'Canngu, Bali',
      bounds: new LatLngBounds(new LatLng(-7.95536, 114.447927), new LatLng(-8.951668, 115.813646)),
    },
  },
  {
    id: 'default-NewZealand',
    predictionPlace: {
      address: 'Queenstown, New Zealand',
      bounds: new LatLngBounds(new LatLng(-33.858724, 166.326153), new LatLng(-47.389803, 178.676862)),
    },
  },
];
