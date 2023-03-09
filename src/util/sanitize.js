/**
 * By default, React DOM escapes any values embedded in JSX before rendering them,
 * but sometimes it is necessary to sanitize the user-generated content of received entities.
 * If you use this data in component props without any sanitization or encoding,
 * it might create XSS vulnerabilities.
 *
 * You should especially consider how you are using extended data inside the app.
 */

const ESCAPE_TEXT_REGEXP = /[<>]/g;
const ESCAPE_TEXT_REPLACEMENTS = {
  //fullwidth lesser-than character
  '<': '\uff1c',
  //fullwidth greater-than character
  '>': '\uff1e',
};

// An example how you could sanitize text content.
// This swaps some coding related characters to less dangerous ones
const sanitizeText = str =>
  str == null
    ? str
    : typeof str === 'string'
    ? str.replace(ESCAPE_TEXT_REGEXP, ch => ESCAPE_TEXT_REPLACEMENTS[ch])
    : '';

/**
 * Sanitize user entity.
 * If you add public data, you should probably sanitize it here.
 * By default, React DOM escapes any values embedded in JSX before rendering them,
 * but if you use this data on props, it might create XSS vulnerabilities
 * E.g. you should sanitize and encode URI if you are creating links from public data.
 */
export const sanitizeUser = entity => {
  const { attributes, ...restEntity } = entity || {};
  const { profile, ...restAttributes } = attributes || {};
  const { bio, displayName, abbreviatedName, publicData, metadata } = profile || {};

  const sanitizePublicData = publicData => {
    // TODO: If you add public data, you should probably sanitize it here.
    return publicData ? { publicData } : {};
  };
  const sanitizeMetadata = metadata => {
    // TODO: If you add user-generated metadata through Integration API,
    // you should probably sanitize it here.
    return metadata ? { metadata } : {};
  };

  const profileMaybe = profile
    ? {
        profile: {
          abbreviatedName: sanitizeText(abbreviatedName),
          displayName: sanitizeText(displayName),
          bio: sanitizeText(bio),
          ...sanitizePublicData(publicData),
          ...sanitizeMetadata(metadata),
        },
      }
    : {};
  const attributesMaybe = attributes ? { attributes: { ...profileMaybe, ...restAttributes } } : {};

  return { ...attributesMaybe, ...restEntity };
};

/**
 * Sanitize listing entity.
 * If you add public data, you should probably sanitize it here.
 * By default, React DOM escapes any values embedded in JSX before rendering them,
 * but if you use this data on props, it might create XSS vulnerabilities
 * E.g. you should sanitize and encode URI if you are creating links from public data.
 */
export const sanitizeListing = entity => {
  const { attributes, ...restEntity } = entity;
  const { title, description, publicData, ...restAttributes } = attributes || {};

  const sanitizeLocation = location => {
    const { address, building } = location || {};
    return { address: sanitizeText(address), building: sanitizeText(building) };
  };

  const sanitizePublicData = publicData => {
    // Here's an example how you could sanitize location and rules from publicData:
    // TODO: If you add public data, you should probably sanitize it here.
    const { location, rules, ...restPublicData } = publicData || {};
    const locationMaybe = location ? { location: sanitizeLocation(location) } : {};
    const rulesMaybe = rules ? { rules: sanitizeText(rules) } : {};

    return publicData ? { publicData: { ...locationMaybe, ...rulesMaybe, ...restPublicData } } : {};
  };

  const attributesMaybe = attributes
    ? {
        attributes: {
          title: sanitizeText(title),
          description: sanitizeText(description),
          ...sanitizePublicData(publicData),
          ...restAttributes,
        },
      }
    : {};

  return { ...attributesMaybe, ...restEntity };
};

/**
 * Sanitize entities if needed.
 * Remember to add your own sanitization rules for your extended data
 */
export const sanitizeEntity = entity => {
  const { type } = entity;
  switch (type) {
    case 'listing':
      return sanitizeListing(entity);
    case 'user':
      return sanitizeUser(entity);
    default:
      return entity;
  }
};
