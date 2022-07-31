import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
const defaultLocations = [
  {
    id: 'default-western nc',
    predictionPlace: {
      address: 'Western North Carolina, United States',
      bounds: new LatLngBounds(new LatLng(36.0222834, -82.23134815), new LatLng(34.8875135, -83.22619215)),
    },
  },
  {
    id: 'default-bentonville',
    predictionPlace: {
      address: 'Bentonville, Arkansas, United States',
      bounds: new LatLngBounds(new LatLng(36.472531, -94.13675), new LatLng(36.216762, -94.367823)),
    },
  },
  {
    id: 'default-moab',
    predictionPlace: {
      address: 'Moab, Utah, United States',
      bounds: new LatLngBounds(new LatLng(39.23179841, -109.052416), new LatLng(38.03685747, -110.144848)),
    },
  },
  {
    id: 'default-sedona',
    predictionPlace: {
      address: 'Sedona, Arizona, United States',
      bounds: new LatLngBounds(new LatLng(35.044516, -111.640967), new LatLng(34.712911, -111.999124)),
    },
  },
  {
    id: 'default-durango',
    predictionPlace: {
      address: 'Durango, Colorado, United States',
      bounds: new LatLngBounds(new LatLng(37.67372512, -107.52213474), new LatLng(36.88141499, -108.23320098)),
    },
  },
];
export default defaultLocations;
