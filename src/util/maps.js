import memoize from 'lodash/memoize';
import seedrandom from 'seedrandom';
import { types as sdkTypes } from './sdkLoader';
import config from '../config';

const { LatLng } = sdkTypes;

const EARTH_RADIUS = 6371000; /* meters  */
const DEG_TO_RAD = Math.PI / 180.0;
const THREE_PI = Math.PI * 3;
const TWO_PI = Math.PI * 2;

const degToRadians = latlng => {
  const { lat, lng } = latlng;
  const latR = lat * DEG_TO_RAD;
  const lngR = lng * DEG_TO_RAD;
  return { lat: latR, lng: lngR };
};

const radToDegrees = latlngInRadians => {
  const { lat: latR, lng: lngR } = latlngInRadians;
  const lat = latR / DEG_TO_RAD;
  const lng = lngR / DEG_TO_RAD;
  return { lat, lng };
};

/**
 * This obfuscatedCoordinatesImpl function is a temporary solution for the coordinate obfuscation.
 * In the future, improved version needs to have protectedData working and
 * available in accepted transaction.
 *
 * Based on:
 * https://gis.stackexchange.com/questions/25877/generating-random-locations-nearby#answer-213898
 */

const obfuscatedCoordinatesImpl = (latlng, cacheKey) => {
  const { lat, lng } = degToRadians(latlng);
  const sinLat = Math.sin(lat);
  const cosLat = Math.cos(lat);

  const randomizeBearing = cacheKey ? seedrandom(cacheKey)() : Math.random();
  const randomizeDistance = cacheKey
    ? seedrandom(
        cacheKey
          .split('')
          .reverse()
          .join('')
      )()
    : Math.random();

  // Randomize distance and bearing
  const distance = randomizeDistance * config.maps.fuzzy.offset;
  const bearing = randomizeBearing * TWO_PI;
  const theta = distance / EARTH_RADIUS;
  const sinBearing = Math.sin(bearing);
  const cosBearing = Math.cos(bearing);
  const sinTheta = Math.sin(theta);
  const cosTheta = Math.cos(theta);

  const newLat = Math.asin(sinLat * cosTheta + cosLat * sinTheta * cosBearing);
  const newLng =
    lng + Math.atan2(sinBearing * sinTheta * cosLat, cosTheta - sinLat * Math.sin(newLat));

  // Normalize -PI -> +PI radians
  const newLngNormalized = (newLng + THREE_PI) % TWO_PI - Math.PI;

  const result = radToDegrees({ lat: newLat, lng: newLngNormalized });
  return new LatLng(result.lat, result.lng);
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
