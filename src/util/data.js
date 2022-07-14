import isArray from 'lodash/isArray';
import reduce from 'lodash/reduce';
import { sanitizeEntity } from './sanitize';

/**
 * Combine the given relationships objects
 *
 * See: http://jsonapi.org/format/#document-resource-object-relationships
 */
export const combinedRelationships = (oldRels, newRels) => {
  if (!oldRels && !newRels) {
    // Special case to avoid adding an empty relationships object when
    // none of the resource objects had any relationships.
    return null;
  }
  return { ...oldRels, ...newRels };
};

/**
 * Combine the given resource objects
 *
 * See: http://jsonapi.org/format/#document-resource-objects
 */
export const combinedResourceObjects = (oldRes, newRes) => {
  const { id, type } = oldRes;
  if (newRes.id.uuid !== id.uuid || newRes.type !== type) {
    throw new Error('Cannot merge resource objects with different ids or types');
  }
  const attributes = newRes.attributes || oldRes.attributes;
  const attributesOld = oldRes.attributes || {};
  const attributesNew = newRes.attributes || {};
  // Allow (potentially) sparse attributes to update only relevant fields
  const attrs = attributes ? { attributes: { ...attributesOld, ...attributesNew } } : null;
  const relationships = combinedRelationships(oldRes.relationships, newRes.relationships);
  const rels = relationships ? { relationships } : null;
  return { id, type, ...attrs, ...rels };
};

/**
 * Combine the resource objects form the given api response to the
 * existing entities.
 */
export const updatedEntities = (oldEntities, apiResponse) => {
  const { data, included = [] } = apiResponse;
  const objects = (Array.isArray(data) ? data : [data]).concat(included);

  const newEntities = objects.reduce((entities, curr) => {
    const { id, type } = curr;

    // Some entities (e.g. listing and user) might include extended data,
    // you should check if src/util/sanitize.js needs to be updated.
    const current = sanitizeEntity(curr);

    entities[type] = entities[type] || {};
    const entity = entities[type][id.uuid];
    entities[type][id.uuid] = entity ? combinedResourceObjects({ ...entity }, current) : current;

    return entities;
  }, oldEntities);

  return newEntities;
};

/**
 * Denormalise the entities with the resources from the entities object
 *
 * This function calculates the dernormalised tree structure from the
 * normalised entities object with all the relationships joined in.
 *
 * @param {Object} entities entities object in the SDK Redux store
 * @param {Array<{ id, type }} resources array of objects
 * with id and type
 * @param {Boolean} throwIfNotFound wheather to skip a resource that
 * is not found (false), or to throw an Error (true)
 *
 * @return {Array} the given resource objects denormalised that were
 * found in the entities
 */
export const denormalisedEntities = (entities, resources, throwIfNotFound = true) => {
  const denormalised = resources.map(res => {
    const { id, type } = res;
    const entityFound = entities[type] && id && entities[type][id.uuid];
    if (!entityFound) {
      if (throwIfNotFound) {
        throw new Error(`Entity with type "${type}" and id "${id ? id.uuid : id}" not found`);
      }
      return null;
    }
    const entity = entities[type][id.uuid];
    const { relationships, ...entityData } = entity;

    if (relationships) {
      // Recursively join in all the relationship entities
      return reduce(
        relationships,
        (ent, relRef, relName) => {
          // A relationship reference can be either a single object or
          // an array of objects. We want to keep that form in the final
          // result.
          const hasMultipleRefs = Array.isArray(relRef.data);
          const multipleRefsEmpty = hasMultipleRefs && relRef.data.length === 0;
          if (!relRef.data || multipleRefsEmpty) {
            ent[relName] = hasMultipleRefs ? [] : null;
          } else {
            const refs = hasMultipleRefs ? relRef.data : [relRef.data];

            // If a relationship is not found, an Error should be thrown
            const rels = denormalisedEntities(entities, refs, true);

            ent[relName] = hasMultipleRefs ? rels : rels[0];
          }
          return ent;
        },
        entityData
      );
    }
    return entityData;
  });
  return denormalised.filter(e => !!e);
};

/**
 * Denormalise the data from the given SDK response
 *
 * @param {Object} sdkResponse response object from an SDK call
 *
 * @return {Array} entities in the response with relationships
 * denormalised from the included data
 */
export const denormalisedResponseEntities = sdkResponse => {
  const apiResponse = sdkResponse.data;
  const data = apiResponse.data;
  const resources = Array.isArray(data) ? data : [data];

  if (!data || resources.length === 0) {
    return [];
  }

  const entities = updatedEntities({}, apiResponse);
  return denormalisedEntities(entities, resources);
};

/**
 * Denormalize JSON object.
 * NOTE: Currently, this only handles denormalization of image references
 *
 * @param {JSON} data from Asset API (e.g. page asset)
 * @param {JSON} included array of asset references (currently only images supported)
 * @returns deep copy of data with images denormalized into it.
 */
const denormalizeJsonData = (data, included) => {
  let copy;

  // Handle strings, numbers, booleans, null
  if (data === null || typeof data !== 'object') {
    return data;
  }

  // At this point the data has typeof 'object' (aka Array or Object)
  // Array is the more specific case (of Object)
  if (data instanceof Array) {
    copy = data.map(datum => denormalizeJsonData(datum, included));
    return copy;
  }

  // Generic Objects
  if (data instanceof Object) {
    copy = {};
    Object.entries(data).forEach(([key, value]) => {
      // Handle denormalization of image reference
      const hasImageRefAsValue =
        typeof value == 'object' &&
        value._ref &&
        value._ref?.type === 'imageAsset' &&
        value._ref?.id;
      if (hasImageRefAsValue) {
        const foundRef = included.find(inc => inc.id === value._ref?.id);
        copy[key] = foundRef;
      } else {
        copy[key] = denormalizeJsonData(value, included);
      }
    });
    return copy;
  }

  throw new Error("Unable to traverse data! It's not JSON.");
};

/**
 * Denormalize asset json from Asset API.
 * @param {JSON} assetJson in format: { data, included }
 * @returns deep copy of asset data with images denormalized into it.
 */
export const denormalizeAssetData = assetJson => {
  const { data, included } = assetJson || {};
  return denormalizeJsonData(data, included);
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} transaction entity object, which is to be ensured against null values
 */
export const ensureTransaction = (transaction, booking = null, listing = null, provider = null) => {
  const empty = {
    id: null,
    type: 'transaction',
    attributes: {},
    booking,
    listing,
    provider,
  };
  return { ...empty, ...transaction };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} booking entity object, which is to be ensured against null values
 */
export const ensureBooking = booking => {
  const empty = { id: null, type: 'booking', attributes: {} };
  return { ...empty, ...booking };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} listing entity object, which is to be ensured against null values
 */
export const ensureListing = listing => {
  const empty = {
    id: null,
    type: 'listing',
    attributes: { publicData: {} },
    images: [],
  };
  return { ...empty, ...listing };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} listing entity object, which is to be ensured against null values
 */
export const ensureOwnListing = listing => {
  const empty = {
    id: null,
    type: 'ownListing',
    attributes: { publicData: {} },
    images: [],
  };
  return { ...empty, ...listing };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} user entity object, which is to be ensured against null values
 */
export const ensureUser = user => {
  const empty = { id: null, type: 'user', attributes: { profile: {} } };
  return { ...empty, ...user };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} current user entity object, which is to be ensured against null values
 */
export const ensureCurrentUser = user => {
  const empty = { id: null, type: 'currentUser', attributes: { profile: {} }, profileImage: {} };
  return { ...empty, ...user };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} time slot entity object, which is to be ensured against null values
 */
export const ensureTimeSlot = timeSlot => {
  const empty = { id: null, type: 'timeSlot', attributes: {} };
  return { ...empty, ...timeSlot };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} availability exception entity object, which is to be ensured against null values
 */
export const ensureDayAvailabilityPlan = availabilityPlan => {
  const empty = { type: 'availability-plan/day', entries: [] };
  return { ...empty, ...availabilityPlan };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} availability exception entity object, which is to be ensured against null values
 */
export const ensureAvailabilityException = availabilityException => {
  const empty = { id: null, type: 'availabilityException', attributes: {} };
  return { ...empty, ...availabilityException };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} stripeCustomer entity from API, which is to be ensured against null values
 */
export const ensureStripeCustomer = stripeCustomer => {
  const empty = { id: null, type: 'stripeCustomer', attributes: {} };
  return { ...empty, ...stripeCustomer };
};

/**
 * Create shell objects to ensure that attributes etc. exists.
 *
 * @param {Object} stripeCustomer entity from API, which is to be ensured against null values
 */
export const ensurePaymentMethodCard = stripePaymentMethod => {
  const empty = {
    id: null,
    type: 'stripePaymentMethod',
    attributes: { type: 'stripe-payment-method/card', card: {} },
  };
  const cardPaymentMethod = { ...empty, ...stripePaymentMethod };

  if (cardPaymentMethod.attributes.type !== 'stripe-payment-method/card') {
    throw new Error(`'ensurePaymentMethodCard' got payment method with wrong type.
      'stripe-payment-method/card' was expected, received ${cardPaymentMethod.attributes.type}`);
  }

  return cardPaymentMethod;
};

/**
 * Get the display name of the given user as string. This function handles
 * missing data (e.g. when the user object is still being downloaded),
 * fully loaded users, as well as banned users.
 *
 * For banned or deleted users, a translated name should be provided.
 *
 * @param {propTypes.user} user
 * @param {String} defaultUserDisplayName
 *
 * @return {String} display name that can be rendered in the UI
 */
export const userDisplayNameAsString = (user, defaultUserDisplayName) => {
  const hasAttributes = user && user.attributes;
  const hasProfile = hasAttributes && user.attributes.profile;
  const hasDisplayName = hasProfile && user.attributes.profile.displayName;

  if (hasDisplayName) {
    return user.attributes.profile.displayName;
  } else {
    return defaultUserDisplayName || '';
  }
};

/**
 * DEPRECATED: Use userDisplayNameAsString function or UserDisplayName component instead
 *
 * @param {propTypes.user} user
 * @param {String} bannedUserDisplayName
 *
 * @return {String} display name that can be rendered in the UI
 */
export const userDisplayName = (user, bannedUserDisplayName) => {
  console.warn(
    `Function userDisplayName is deprecated!
User function userDisplayNameAsString or component UserDisplayName instead.`
  );

  return userDisplayNameAsString(user, bannedUserDisplayName);
};

/**
 * Get the abbreviated name of the given user. This function handles
 * missing data (e.g. when the user object is still being downloaded),
 * fully loaded users, as well as banned users.
 *
 * For banned  or deleted users, a default abbreviated name should be provided.
 *
 * @param {propTypes.user} user
 * @param {String} defaultUserAbbreviatedName
 *
 * @return {String} abbreviated name that can be rendered in the UI
 * (e.g. in Avatar initials)
 */
export const userAbbreviatedName = (user, defaultUserAbbreviatedName) => {
  const hasAttributes = user && user.attributes;
  const hasProfile = hasAttributes && user.attributes.profile;
  const hasDisplayName = hasProfile && user.attributes.profile.abbreviatedName;

  if (hasDisplayName) {
    return user.attributes.profile.abbreviatedName;
  } else {
    return defaultUserAbbreviatedName || '';
  }
};

/**
 * A customizer function to be used with the
 * mergeWith function from lodash.
 *
 * Works like merge in every way exept that on case of
 * an array the old value is completely overridden with
 * the new value.
 *
 * @param {Object} objValue Value of current field, denoted by key
 * @param {Object} srcValue New value
 * @param {String} key Key of the field currently being merged
 * @param {Object} object Target object that is receiving values from source
 * @param {Object} source Source object that is merged into object param
 * @param {Object} stack Tracks merged values
 *
 * @return {Object} New value for objValue if the original is an array,
 * otherwise undefined is returned, which results in mergeWith using the
 * standard merging function
 */
export const overrideArrays = (objValue, srcValue, key, object, source, stack) => {
  if (isArray(objValue)) {
    return srcValue;
  }
};

/**
 * Humanizes a line item code. Strips the "line-item/" namespace
 * definition from the beginnign, replaces dashes with spaces and
 * capitalizes the first character.
 *
 * @param {string} code a line item code
 *
 * @return {string} returns the line item code humanized
 */
export const humanizeLineItemCode = code => {
  if (!/^line-item\/.+/.test(code)) {
    throw new Error(`Invalid line item code: ${code}`);
  }
  const lowercase = code.replace(/^line-item\//, '').replace(/-/g, ' ');

  return lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
};
