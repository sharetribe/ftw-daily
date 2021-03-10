import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
const defaultLocations = [
  {
    id: 'default-warsaw',
    predictionPlace: {
      address: 'Warsaw, Polska',
      bounds: new LatLngBounds(new LatLng(52.368154,21.2711509792236), new LatLng(52.0978501372646,20.851689)),
    },
  },
  {
    id: 'default-krakow',
    predictionPlace: {
      address: 'Kraków, Polska',
      bounds: new LatLngBounds(new LatLng(50.1261318559248,20.217345650311), new LatLng(49.9677090000579,19.7922382548761)),
    },
  },
  {
    id: 'default-tampere',
    predictionPlace: {
      address: 'Wrocław, Polska',
      bounds: new LatLngBounds(new LatLng(51.210053,17.1762191755815), new LatLng(51.0426754481203,16.8073838462134)),
    },
  },
  {
    id: 'default-oulu',
    predictionPlace: {
      address: 'Gdańsk, Polska',
      bounds: new LatLngBounds(new LatLng(54.44722,18.950379), new LatLng(54.274974,18.4372692800502)),
    },
  },
  {
    id: 'default-ruka',
    predictionPlace: {
      address: 'Poznań, Polska',
      bounds: new LatLngBounds(new LatLng(52.5093278711914,17.0717063971184), new LatLng(52.2919254489772,16.731594)),
    },
  },
];
export default defaultLocations;
