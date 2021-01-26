import queryString from 'query-string';
import { types as sdkTypes } from './sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

export const LISTING_PAGE_PENDING_APPROVAL_VARIANT = 'pending-approval';
export const LISTING_PAGE_DRAFT_VARIANT = 'draft';

export const LISTING_PAGE_PARAM_TYPE_NEW = 'new';
export const LISTING_PAGE_PARAM_TYPE_DRAFT = 'draft';
export const LISTING_PAGE_PARAM_TYPE_EDIT = 'edit';
export const LISTING_PAGE_PARAM_TYPES = [
  LISTING_PAGE_PARAM_TYPE_NEW,
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_EDIT,
];

// Create slug from random texts
// From Gist thread: https://gist.github.com/mathewbyrne/1280286
export const createSlug = str => {
  let text = str
    .toString()
    .toLowerCase()
    .trim();

  const sets = [
    { to: 'a', from: 'ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ' },
    { to: 'c', from: 'ÇĆĈČ' },
    { to: 'd', from: 'ÐĎĐÞ' },
    { to: 'e', from: 'ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ' },
    { to: 'g', from: 'ĜĞĢǴ' },
    { to: 'h', from: 'ĤḦ' },
    { to: 'i', from: 'ÌÍÎÏĨĪĮİỈỊ' },
    { to: 'j', from: 'Ĵ' },
    { to: 'ij', from: 'Ĳ' },
    { to: 'k', from: 'Ķ' },
    { to: 'l', from: 'ĹĻĽŁ' },
    { to: 'm', from: 'Ḿ' },
    { to: 'n', from: 'ÑŃŅŇ' },
    { to: 'o', from: 'ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ' },
    { to: 'oe', from: 'Œ' },
    { to: 'p', from: 'ṕ' },
    { to: 'r', from: 'ŔŖŘ' },
    { to: 's', from: 'ßŚŜŞŠ' },
    { to: 't', from: 'ŢŤ' },
    { to: 'u', from: 'ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ' },
    { to: 'w', from: 'ẂŴẀẄ' },
    { to: 'x', from: 'ẍ' },
    { to: 'y', from: 'ÝŶŸỲỴỶỸ' },
    { to: 'z', from: 'ŹŻŽ' },
    { to: '-', from: "·/_,:;'" },
  ];

  sets.forEach(set => {
    text = text.replace(new RegExp(`[${set.from}]`, 'gi'), set.to);
  });

  const slug = encodeURIComponent(
    text
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  );

  return slug.length > 0 ? slug : 'no-slug';
};

/**
 * Parse float from a string
 *
 * @param {String} str - string to parse
 *
 * @return {Number|null} number parsed from the string, null if not a number
 */
export const parseFloatNum = str => {
  const trimmed = str && typeof str.trim === 'function' ? str.trim() : null;
  if (!trimmed) {
    return null;
  }
  const num = parseFloat(trimmed);
  const isNumber = !isNaN(num);
  const isFullyParsedNum = isNumber && num.toString() === trimmed;
  return isFullyParsedNum ? num : null;
};

/**
 * Encode a location to use in a URL
 *
 * @param {LatLng} location - location instance to encode
 *
 * @return {String} location coordinates separated by a comma
 */
export const encodeLatLng = location => `${location.lat},${location.lng}`;

/**
 * Decode a location from a string
 *
 * @param {String} str - string encoded with `encodeLatLng`
 *
 * @return {LatLng|null} location instance, null if could not parse
 */
export const decodeLatLng = str => {
  const parts = str.split(',');
  if (parts.length !== 2) {
    return null;
  }
  const lat = parseFloatNum(parts[0]);
  const lng = parseFloatNum(parts[1]);
  if (lat === null || lng === null) {
    return null;
  }
  return new LatLng(lat, lng);
};

/**
 * Encode a location bounds to use in a URL
 *
 * @param {LatLngBounds} bounds - bounds instance to encode
 *
 * @return {String} bounds coordinates separated by a comma
 */
export const encodeLatLngBounds = bounds => `${encodeLatLng(bounds.ne)},${encodeLatLng(bounds.sw)}`;

/**
 * Decode a location bounds from a string
 *
 * @param {String} str - string encoded with `encodeLatLngBounds`
 *
 * @return {LatLngBounds|null} location bounds instance, null if could not parse
 */
export const decodeLatLngBounds = str => {
  const parts = str.split(',');
  if (parts.length !== 4) {
    return null;
  }
  const ne = decodeLatLng(`${parts[0]},${parts[1]}`);
  const sw = decodeLatLng(`${parts[2]},${parts[3]}`);
  if (ne === null || sw === null) {
    return null;
  }
  return new LatLngBounds(ne, sw);
};

// Serialise SDK types in given object values into strings
const serialiseSdkTypes = obj =>
  Object.keys(obj).reduce((result, key) => {
    const val = obj[key];
    /* eslint-disable no-param-reassign */
    if (val instanceof LatLngBounds) {
      result[key] = encodeLatLngBounds(val);
    } else if (val instanceof LatLng) {
      result[key] = encodeLatLng(val);
    } else {
      result[key] = val;
    }
    /* eslint-enable no-param-reassign */
    return result;
  }, {});

/**
 * Serialise given object into a string that can be used in a
 * URL. Encode SDK types into a format that can be parsed with `parse`
 * defined below.
 *
 * @param {Object} params - object with strings/numbers/booleans or
 * SDK types as values
 *
 * @return {String} query string with sorted keys and serialised
 * values, `undefined` and `null` values are removed
 */
export const stringify = params => {
  const serialised = serialiseSdkTypes(params);
  const cleaned = Object.keys(serialised).reduce((result, key) => {
    const val = serialised[key];
    /* eslint-disable no-param-reassign */
    if (val !== null) {
      result[key] = val;
    }
    /* eslint-enable no-param-reassign */
    return result;
  }, {});
  return queryString.stringify(cleaned);
};

/**
 * Parse a URL search query. Converts numeric values into numbers,
 * 'true' and 'false' as booleans, and serialised LatLng and
 * LatLngBounds into respective instances based on given options.
 *
 * @param {String} search - query string to parse, optionally with a
 * leading '?' or '#' character
 *
 * @param {Object} options - Options for parsing:
 *
 * - latlng {Array<String} keys to parse as LatLng instances, null if
 *   not able to parse
 * - latlngBounds {Array<String} keys to parse as LatLngBounds
 *   instances, null if not able to parse
 *
 * @return {Object} key/value pairs parsed from the given String
 */
export const parse = (search, options = {}) => {
  const { latlng = [], latlngBounds = [] } = options;
  const params = queryString.parse(search);
  return Object.keys(params).reduce((result, key) => {
    const val = params[key];
    /* eslint-disable no-param-reassign */
    if (latlng.includes(key)) {
      result[key] = decodeLatLng(val);
    } else if (latlngBounds.includes(key)) {
      result[key] = decodeLatLngBounds(val);
    } else if (val === 'true') {
      result[key] = true;
    } else if (val === 'false') {
      result[key] = false;
    } else {
      const num = parseFloatNum(val);
      result[key] = num === null ? val : num;
    }
    /* eslint-enable no-param-reassign */
    return result;
  }, {});
};

/**
 * Create Twitter page url from twitterHandle
 *
 * @param {String} twitterHandle - handle is used for generating Twitter page URL
 *
 * @return {String} twitterPageURL
 */
export const twitterPageURL = twitterHandle => {
  if (twitterHandle && twitterHandle.charAt(0) === '@') {
    return `https://twitter.com/${twitterHandle.substring(1)}`;
  } else if (twitterHandle) {
    return `https://twitter.com/${twitterHandle}`;
  }
  return null;
};
