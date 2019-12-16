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
      address: 'Portugal',
      bounds: new LatLngBounds(new LatLng(42.45802935,-1.71652766), new LatLng(35.58022367,-14.30559766)),
    },
  },
  {
    id: 'default-mexico',
    predictionPlace: {
      address: 'Puerto Escondido, Mexico',
      bounds: new LatLngBounds(new LatLng(15.92616567,-96.99633449), new LatLng(15.82495534,-97.14576471)),
    }, 
  },
  {
    id: 'default-bali',
    predictionPlace: {
      address: 'Bali, Indonesia',
      bounds: new LatLngBounds(new LatLng(-7.96383669,115.7425148 ), new LatLng(-8.91510534,114.3767958)),
    }, 
  },
  {
    id: 'default-norway',
    predictionPlace: {
      address: 'Lofoten, Norway',
      bounds: new LatLngBounds(new LatLng(69.46234685,18.48689067), new LatLng(67.75571749,11.83848165)),
    },  
  },
  {
    id: 'default-spain',
    predictionPlace: {
      address: 'Tenerife, Spain',
      bounds: new LatLngBounds(new LatLng(28.75487995,-15.87553649), new LatLng(27.73415888,-17.52103053)),
    },  
  },
  {
    id: 'default-sri-lanka',
    predictionPlace: {
      address: 'Ahanagama, Sri Lanka',
      bounds: new LatLngBounds(new LatLng(9.932083,81.980383), new LatLng(5.814558,79.422098)),
    }, 
  },
];
