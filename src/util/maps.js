import memoize from 'lodash/memoize';
import seedrandom from 'seedrandom';
import { types as sdkTypes } from './sdkLoader';
import config from '../config';

const { LatLng } = sdkTypes;

/**
 * This obfuscatedCoordinatesImpl function is a temporary solution for the coordinate obfuscation.
 * In the future, improved version needs to have protectedData working and
 * available in accepted transaction.
 */
const obfuscatedCoordinatesImpl = (latlng, cacheKey) => {
  const { lat, lng } = latlng;

  // https://gis.stackexchange.com/questions/25877/generating-random-locations-nearby
  const r = config.maps.fuzzy.offset / 111300;
  const y0 = lat;
  const x0 = lng;

  // Two seeded random numbers to be used to calculate new location
  // We need seeded so that the static map URL doesn't change between requests
  // (i.e. URL is cacheable)
  const u = cacheKey ? seedrandom(cacheKey)() : Math.random();
  const v = cacheKey
    ? seedrandom(
        cacheKey
          .split('')
          .reverse()
          .join('')
      )()
    : Math.random();
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

/**
 * Query the user's current location from the browser API
 *
 * @return {Promise<LatLng>} user's current location
 */
export const userLocation = () =>
  new Promise((resolve, reject) => {
    const geolocationAvailable = 'geolocation' in navigator;

    if (!geolocationAvailable) {
      reject(new Error('Geolocation not available in browser'));
      return;
    }

    const onSuccess = position =>
      resolve(new LatLng(position.coords.latitude, position.coords.longitude));

    const onError = error => reject(error);

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  });

/**
 * Calculate a circular polyline around the given point
 *
 * See: https://stackoverflow.com/questions/7316963/drawing-a-circle-google-static-maps
 *
 * @param {LatLng} latlng - center of the circle
 * @param {Number} radius - radius of the circle
 *
 * @return {Array<Array<Number>>} array of `[lat, lng]` coordinate
 * pairs forming the circle
 */
export const circlePolyline = (latlng, radius) => {
  const { lat, lng } = latlng;
  const detail = 8;
  const R = 6371;
  const pi = Math.PI;

  const _lat = lat * pi / 180;
  const _lng = lng * pi / 180;
  const d = radius / 1000 / R;

  let points = [];
  for (let i = 0; i <= 360; i += detail) {
    const brng = i * pi / 180;

    let pLat = Math.asin(
      Math.sin(_lat) * Math.cos(d) + Math.cos(_lat) * Math.sin(d) * Math.cos(brng)
    );
    const pLng =
      (_lng +
        Math.atan2(
          Math.sin(brng) * Math.sin(d) * Math.cos(_lat),
          Math.cos(d) - Math.sin(_lat) * Math.sin(pLat)
        )) *
      180 /
      pi;
    pLat = pLat * 180 / pi;

    points.push([pLat, pLng]);
  }

  return points;
};
