import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-portugal',
    predictionPlace: {
      address: 'Helsinki, Finland',
      bounds: new LatLngBounds(new LatLng(60.29783, 25.25448), new LatLng(59.92248, 24.78287)),
    },
  },
  {
    id: 'default-mexico',
    predictionPlace: {
      address: 'Puerto Escondido, Mexico',
      bounds: new LatLngBounds(new LatLng(60.53045, 22.38197), new LatLng(60.33361, 22.06644)),
    },
  },
  {
    id: 'default-bali',
    predictionPlace: {
      address: 'Bali, Indonesia',
      bounds: new LatLngBounds(new LatLng(-8.322555, 115.150983), new LatLng(-8.322555, 115.150983)),
    },
  },
  {
    id: 'default-norway',
    predictionPlace: {
      address: 'Lofoten, Norway',
      bounds: new LatLngBounds(new LatLng(65.56434, 26.77069), new LatLng(64.8443, 24.11494)),
    },
  },
  {
    id: 'default-spain',
    predictionPlace: {
      address: 'Tenerife, Spain',
      bounds: new LatLngBounds(new LatLng(66.16997, 29.16773), new LatLng(66.16095, 29.13572)),
    },
  },
  {
    id: 'default-sri-lanka',
    predictionPlace: {
      address: 'Ahanagama, Sri Lanka',
      bounds: new LatLngBounds(new LatLng(65.56434, 26.77069), new LatLng(64.8443, 24.11494)),
    },
  },
];
