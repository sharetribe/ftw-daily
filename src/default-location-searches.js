import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-dallas',
    predictionPlace: {
      address: 'Dallas, Texas',
      bounds: new LatLngBounds(new LatLng(32.6767, 96.6970), new LatLng(32.8767, 96.8970)),
    },
  },
  {
    id: 'default-plano',
    predictionPlace: {
      address: 'Plano, Texas',
      bounds: new LatLngBounds(new LatLng(32.9198, 96.5989), new LatLng(33.1198, 96.7989)),
    },
  },
  {
    id: 'default-grapevine',
    predictionPlace: {
      address: 'Grapevine, Texas',
      bounds: new LatLngBounds(new LatLng(32.8343, 96.9781), new LatLng(33.0343, 97.1781)),
    },
  },
  {
    id: 'default-frisco',
    predictionPlace: {
      address: 'Frisco, Texas',
      bounds: new LatLngBounds(new LatLng(33.0507, 96.7236), new LatLng(33.2507, 96.9236)),
    },
  },
  {
    id: 'default-garland',
    predictionPlace: {
      address: 'Garland, Texas',
      bounds: new LatLngBounds(new LatLng(32.8126, 96.5389), new LatLng(33.0126, 96.7389)),
    },
  },
];
