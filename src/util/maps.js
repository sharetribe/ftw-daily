import { random, memoize, round } from 'lodash';
import { types as sdkTypes } from './sdkLoader';

const { LatLng } = sdkTypes;

const obfuscatedCoordinatesImpl = latlng => {
  const { lat, lng } = latlng;
  const threshold = 0.01;
  const newLat = round(lat + random(-1 * threshold, threshold), 5);
  const newLng = round(lng + random(-1 * threshold, threshold), 5);
  return new LatLng(newLat, newLng);
};

const obfuscationKeyGetter = (latlng, cacheKey) => cacheKey;

const memoizedObfuscatedCoordinatesImpl = memoize(obfuscatedCoordinatesImpl, obfuscationKeyGetter);

/**
 * Make the given coordinates randomly a little bit different.
 *
 * @param {LatLng} latlng coordinates
 * @param {String?} cacheKey if given, the results are memoized and
 * the same coordinates are returned for the same key as long as the
 * cache isn't cleared (e.g. with page refresh). This results in
 * e.g. same listings always getting the same obfuscated coordinates
 * if the listing id is used as the cache key.
 *
 * @return {LatLng} obfuscated coordinates
 */
export const obfuscatedCoordinates = (latlng, cacheKey = null) => {
  return cacheKey
    ? memoizedObfuscatedCoordinatesImpl(latlng, cacheKey)
    : obfuscatedCoordinatesImpl(latlng);
};
