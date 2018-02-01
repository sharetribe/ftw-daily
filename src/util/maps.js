import { random } from 'lodash';
import { types as sdkTypes } from './sdkLoader';

const { LatLng } = sdkTypes;

/**
 * Make the given coordinates randomly a little bit different.
 *
 * @param {LatLng} latlng coordinates
 *
 * @return {LatLng} obfuscated coordinates
 */
export const obfuscatedCoordinates = latlng => {
  const { lat, lng } = latlng;

  // TODO: improve this
  const newLat = lat + random(-0.001, 0.001);
  const newLng = lng + random(-0.001, 0.001);

  return new LatLng(newLat, newLng);
};
