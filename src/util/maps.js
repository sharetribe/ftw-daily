import { memoize } from 'lodash';
import { types as sdkTypes } from './sdkLoader';
import config from '../config';

const { LatLng } = sdkTypes;

const obfuscatedCoordinatesImpl = latlng => {
  const { lat, lng } = latlng;
  const offset = config.coordinates.coordinateOffset;

  // https://gis.stackexchange.com/questions/25877/generating-random-locations-nearby
  const r = offset / 111300;
  const y0 = lat;
  const x0 = lng;
  const u = Math.random();
  const v = Math.random();
  const w = r * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y1 = w * Math.sin(t);
  const x1 = x / Math.cos(y0);

  const newLat = y0 + y1;
  const newLng = x0 + x1;

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
