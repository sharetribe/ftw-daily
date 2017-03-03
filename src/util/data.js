import { reduce } from 'lodash';

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
  const attrs = attributes ? { attributes } : null;
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

  /* eslint-disable no-param-reassign */
  const newEntities = objects.reduce(
    (entities, curr) => {
      const { id, type } = curr;
      entities[type] = entities[type] || {};
      const entity = entities[type][id.uuid];
      entities[type][id.uuid] = entity ? combinedResourceObjects(entity, curr) : curr;
      return entities;
    },
    oldEntities,
  );
  /* eslint-enable no-param-reassign */

  return newEntities;
};

/**
 * Denormalise the entities with the given IDs from the entities object
 *
 * This function calculates the dernormalised tree structure from the
 * normalised entities object with all the relationships joined in.
 *
 * @param {Object} entities entities object in the SDK Redux store
 * @param {String} type entity type of the given IDs
 * @param {Array<UUID>} ids IDs to pick from the entities
 */
export const denormalisedEntities = (entities, type, ids) => {
  if (!entities[type] && ids.length > 0) {
    throw new Error(`No entities of type ${type}`);
  }
  return ids.map(id => {
    const entity = entities[type][id.uuid];
    if (!entity) {
      throw new Error(`Entity ${type} with id ${id.uuid} not found`);
    }
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
          const refs = hasMultipleRefs ? relRef.data : [relRef.data];
          const relIds = refs.map(ref => ref.id);
          const relType = refs[0].type;
          const rels = denormalisedEntities(entities, relType, relIds);

          // eslint-disable-next-line no-param-reassign
          ent[relName] = hasMultipleRefs ? rels : rels[0];
          return ent;
        },
        entityData,
      );
    }
    return entityData;
  });
};
