import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
const defaultLocations = [
  {
    id: 'default-capitol-hill',
    predictionPlace: {
      address: 'Capitol Hill, Seattle',
      bounds: new LatLngBounds(new LatLng(47.66329703, -122.27345772), new LatLng(47.59227174, -122.34943804)),
    },
  },
  {
    id: 'default-central-district',
    predictionPlace: {
      address: 'Central District, Seattle',
      bounds: new LatLngBounds(new LatLng(47.63358332, -122.27573765), new LatLng(47.57597304, -122.33733996)),
    },
  },
  {
    id: 'default-tampere',
    predictionPlace: {
      address: 'Tampere, Finland',
      bounds: new LatLngBounds(new LatLng(61.83657, 24.11838), new LatLng(61.42728, 23.5422)),
    },
  },
  {
    id: 'default-oulu',
    predictionPlace: {
      address: 'Oulu, Finland',
      bounds: new LatLngBounds(new LatLng(65.56434, 26.77069), new LatLng(64.8443, 24.11494)),
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
export default defaultLocations;
