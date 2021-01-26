import groupBy from 'lodash/groupBy';
import reduce from 'lodash/reduce';

/**
 * hasParentWithClassName searches class name from parent elements of given target
 * @param {Node} target - element whose parent might contain given class.
 * @param {String} className - class name string to be found
 */
export const hasParentWithClassName = (target, className) => {
  return [...document.querySelectorAll(`.${className}`)].some(
    el => el !== target && el.contains(target)
  );
};

/**
 * Listings array grouped by geolocation
 * @param {Array} mapListings - listings to be grouped on map
 * @return {Object} - Object where coordinate pair is the key to different listings
 */
export const groupedByCoordinates = mapListings => {
  return groupBy(mapListings, l => {
    const g = l.attributes.geolocation;
    return `${g.lat}-${g.lng}`;
  });
};

/**
 * Listings (in location based object literal) is mapped to array
 * @param {Object} mapListings - listings to be grouped on map
 * @return {Array} - An array where items are arrays of listings
 *   (They are arrays containing all the listings in that location)
 */
export const reducedToArray = mapListings => {
  return reduce(mapListings, (acc, listing) => acc.concat([listing]), []);
};
