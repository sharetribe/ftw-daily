import Map from './Map';
import { types } from '../../util/sdkLoader';

const { LatLng } = types;

export const Empty = {
  component: Map,
  props: {
    center: new LatLng(60.16502999999999, 24.940064399999983),
    zoom: 22,
  },
};
