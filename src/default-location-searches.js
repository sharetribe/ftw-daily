import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
const defaultLocations = [
  {
    id: 'default-london',
    predictionPlace: {
      address: 'London, United Kingdom',
      bounds: new LatLngBounds(new LatLng(51.67789511, 0.29732496), new LatLng(51.3925498, -0.57645)),
    },
  },
  {
    id: 'default-birmingham',
    predictionPlace: {
      address: 'Birmingham, United Kingdom',
      bounds: new LatLngBounds(new LatLng(52.57779203, -1.72540735), new LatLng(52.32126288, -2.03104471)),
    },
  },
  {
    id: 'default-manchester',
    predictionPlace: {
      address: 'Manchester, United Kingdom',
      bounds: new LatLngBounds(new LatLng(53.59821106, -2.08320402), new LatLng(53.3476832, -2.38884138)),
    },
  },
  {
    id: 'default-liverpool',
    predictionPlace: {
      address: 'Liverpool, United Kingdom',
      bounds: new LatLngBounds(new LatLng(53.5729014, -2.77243704), new LatLng(53.31894244, -3.08142752)),
    },
  },
  {
    id: 'default-edinburgh',
    predictionPlace: {
      address: 'Edinburgh, United Kingdom',
      bounds: new LatLngBounds(new LatLng(56.21396061, -2.98871222), new LatLng(55.74296152, -3.58918372)),
    },
  },
  {
    id: 'default-sheffield',
    predictionPlace: {
      address: 'Sheffield, United Kingdom',
      bounds: new LatLngBounds(new LatLng(53.40297225, -1.43730778), new LatLng(53.34019056, -1.51371712)),
    },
  },
];
export default defaultLocations;
