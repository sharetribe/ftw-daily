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
