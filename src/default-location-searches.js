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
    id: 'default-ballard',
    predictionPlace: {
      address: 'Ballard, Seattle',
      bounds: new LatLngBounds(new LatLng(47.69895644, -122.36122854), new LatLng(47.65138589, -122.412164)),
    },
  },
  {
    id: 'default-green-lake',
    predictionPlace: {
      address: 'Green Lake, Seattle',
      bounds: new LatLngBounds(new LatLng(47.70447299, -122.3076123), new LatLng(47.65582284, -122.3597087)),
    },
  },
  {
    id: 'default-greenwood',
    predictionPlace: {
      address: 'Greenwood, Seattle',
      bounds: new LatLngBounds(new LatLng(47.71611129, -122.33177064), new LatLng(47.67226749, -122.37873286)),
    },
  },
];
export default defaultLocations;
