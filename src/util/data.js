/**
 * Merge the given relationships objects
 *
 * See: http://jsonapi.org/format/#document-resource-object-relationships
 */
export const mergeRelationships = (rels1, rels2) => {
  if (!rels1 && !rels2) {
    // Special case to avoid adding an empty relationships object when
    // none of the resource objects had any relationships.
    return null;
  }
  return { ...rels1, ...rels2 };
};

/**
 * Merge the given resource objects
 *
 * See: http://jsonapi.org/format/#document-resource-objects
 */
export const mergeResourceObjects = (res1, res2) => {
  const { id, type } = res1;
  if (res2.id.uuid !== id.uuid || res2.type !== type) {
    throw new Error('Cannot merge resource objects with different ids or types');
  }
  const attributes = res2.attributes || res1.attributes;
  const attrs = attributes ? { attributes } : null;
  const relationships = mergeRelationships(res1.relationships, res2.relationships);
  const rels = relationships ? { relationships } : null;
  return { id, type, ...attrs, ...rels };
};

/**
 * Merge the resource objects form the given api response to the
 * existing entities.
 */
export const mergeEntities = (oldEntities, apiResponse) => {
  const { data, included = [] } = apiResponse;
  const objects = (Array.isArray(data) ? data : [data]).concat(included);

  /* eslint-disable no-param-reassign */
  const newEntities = objects.reduce(
    (entities, curr) => {
      const { id, type } = curr;
      entities[type] = entities[type] || {};
      const entity = entities[type][id.uuid];
      entities[type][id.uuid] = entity ? mergeResourceObjects(entity, curr) : curr;
      return entities;
    },
    oldEntities,
  );
  /* eslint-enable no-param-reassign */

  return newEntities;
};
