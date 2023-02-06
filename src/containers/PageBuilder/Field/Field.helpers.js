import { sanitizeUrl } from '../../../util/sanitize';

/////////////////////////////
// Pickers for valid props //
/////////////////////////////

export const hasContent = data => typeof data?.content === 'string' && data?.content.length > 0;

/**
 * Exposes "content" prop as children property, if "content" has type of string.
 *
 * @param {Object} data E.g. "{ fieldType: 'heading3', content: 'my title' }"
 * @returns object containing content string as value for key: children.
 */
export const exposeContentAsChildren = data => {
  return hasContent(data) ? { children: data.content } : {};
};

/**
 * Exposes "content" property, if the type of the "content" is string.
 *
 * @param {Object} data E.g. "{ fieldType: 'markdown', content: 'my title' }"
 * @returns object containing "content" key if the value is string.
 */
export const exposeContentString = data => (hasContent(data) ? { content: data.content } : {});

/**
 * Exposes "label" and "href" as "children" and "href" props respectively,
 * if both are of type string. Exposed "href" is sanitized.
 *
 * @param {Object} data E.g. "{ fieldType: 'internalButtonLink', content: 'my title', href: 'https://my.domain.com' }"
 * @returns object containing children and href.
 */
export const exposeLinkProps = data => {
  const { content, href } = data;
  const hasCorrectProps = typeof href === 'string' && href.length > 0;
  // Sanitize the URL. See: src/utl/sanitize.js for more information.
  const cleanUrl = hasCorrectProps ? sanitizeUrl(href) : null;
  // If no content is given, use href.
  const linkText = hasContent(data) ? content : cleanUrl;
  return cleanUrl ? { children: linkText, href: cleanUrl } : {};
};

const getValidSanitizedImage = image => {
  const { id, type, attributes } = image || {};
  const variantEntries = Object.entries(attributes?.variants || {});
  const variants = variantEntries.reduce((validVariants, entry) => {
    const [key, value] = entry;
    const { url, width, height } = value || {};

    const isValid = typeof width === 'number' && typeof height === 'number';
    return isValid
      ? {
          ...validVariants,
          [key]: { url: sanitizeUrl(url), width, height },
        }
      : validVariants;
  }, {});

  const isValidImage = Object.keys(variants).length > 0;
  const sanitizedImage = { id, type, attributes: { ...attributes, variants } };

  return isValidImage ? sanitizedImage : null;
};

/**
 * Exposes "alt" and image props.
 * The "image" contains imageAsset entity, which has been denormalized at this point:
 *  {
 *    id: "",
 *    type: "imageAsset",
 *    attributes: {
 *      variants: {
 *        square: {
 *          url: "https://something.imgix.com/foo/bar/baz",
 *          width: 1200,
 *          height: 580,
 *        },
 *        square2x: {
 *          url: "https://something.imgix.com/foo/bar/baz",
 *          width: 2400,
 *          height: 1160,
 *        },
 *      },
 *    },
 * }
 *
 * @param {Object} data E.g. "{ fieldType: 'image', alt: 'my portrait', image: { id, type, attributes } }"
 * @returns object containing alt string and variants.
 */
export const exposeImageProps = data => {
  // Note: data includes also "aspectRatio" key (and "fieldType"),
  //       but image refs can rely on actual image variants
  const { alt, image } = data;
  const { type } = image || {};

  if (type !== 'imageAsset') {
    return {};
  }

  const alternativeText = typeof alt === 'string' ? alt : '🖼️';
  const sanitizedImage = getValidSanitizedImage(image);
  return sanitizedImage ? { alt: alternativeText, image: sanitizedImage } : {};
};

/**
 * Helper that exposes "color" value, if it contains hexadecimal string like "#FF0000" or "#F00".
 *
 * @param {String} data E.g. "#FFFFFF"
 * @returns Object containing valid color prop.
 */
const exposeColorValue = color => {
  const re = new RegExp('^#([0-9a-f]{3}){1,2}$', 'i');
  const isValidColor = typeof color === 'string' && re.test(color);
  return isValidColor ? color : null;
};

/**
 * Exposes appearance props like "backgroundImage", "backgroundColor" property,
 * if backgroundImage contains imageAsset entity and
 * backgroundColor contains hexadecimal string like "#FF0000" or "#F00".
 *
 * @param {Object} data E.g. "{ fieldType: 'customAppearance', backgroundImage: imageAssetRef, backgroundColor: '#000000', textColor: '#FFFFFF' }"
 * @returns object containing valid data.
 */
export const exposeCustomAppearanceProps = data => {
  const { backgroundImage, backgroundColor, textColor, alt } = data;
  const { type } = backgroundImage || {};

  if (!!type && type !== 'imageAsset') {
    return {};
  }

  const validBackgroundColor = exposeColorValue(backgroundColor);
  const isValidBackgroundColor = !!validBackgroundColor;
  const backgroundColorMaybe = isValidBackgroundColor
    ? { backgroundColor: validBackgroundColor }
    : {};
  const isValidTextColor = ['light', 'dark'].includes(textColor);
  const textColorMaybe = isValidTextColor ? { textColor } : {};

  const sanitizedImage = getValidSanitizedImage(backgroundImage);
  const backgroundImageMaybe = sanitizedImage ? { backgroundImage: sanitizedImage, alt } : {};

  return {
    ...backgroundImageMaybe,
    ...backgroundColorMaybe,
    ...textColorMaybe,
  };
};

/**
 * Exposes "youtubeVideoId" and "aspectRatio",
 * if they meet the regexp rules.
 *
 * @param {Object} data E.g. "{ fieldType: 'youtube', youtubeVideoId: '<video-id>', aspectRatio: '16/9' }"
 * @returns object containing children and href.
 */
export const exposeYoutubeProps = data => {
  const { youtubeVideoId, aspectRatio } = data;
  const isString = str => typeof str === 'string' && str?.length > 0;

  const hasYoutubeVideoId =
    isString(youtubeVideoId) &&
    youtubeVideoId.length < 12 &&
    youtubeVideoId.match(/^[a-zA-Z0-9_-]+$/i);
  const cleanYoutubeVideoId = hasYoutubeVideoId ? encodeURIComponent(youtubeVideoId) : null;

  const hasAspectRatio = isString(aspectRatio) && aspectRatio.match(/^(\d+)\/(\d+)+$/);
  const aspectRatioMaybe = hasAspectRatio ? { aspectRatio } : {};

  return cleanYoutubeVideoId
    ? {
        youtubeVideoId: cleanYoutubeVideoId,
        ...aspectRatioMaybe,
      }
    : {};
};

export const exposeOpenGraphData = data => {
  const { title, description, image } = data || {};
  const { type } = image || {};

  if (!!type && type !== 'imageAsset') {
    return {};
  }

  const isString = content => typeof content === 'string' && content.length > 0;
  const sanitizedImage = getValidSanitizedImage(image);
  const image1200 = sanitizedImage?.attributes?.variants?.social1200;
  const image600 = sanitizedImage?.attributes?.variants?.social600;

  return {
    title: isString(title) ? title : null,
    description: isString(description) ? description : null,
    // Open Graph can handle multiple images, so we return arrays for the sake of consistency
    images1200: image1200 ? [image1200] : null,
    images600: image600 ? [image600] : null,
  };
};
