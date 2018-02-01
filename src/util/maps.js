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
  const threshold = 0.01;
  const newLat = lat + random(-1 * threshold, threshold);
  const newLng = lng + random(-1 * threshold, threshold);
  return new LatLng(newLat, newLng);
};
