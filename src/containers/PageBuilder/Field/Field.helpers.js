import { sanitizeUrl } from '../../../util/sanitize';

/////////////////////////////
// Pickers for valid props //
/////////////////////////////

const hasContent = data => typeof data?.content === 'string';

/**
 * Exposes "content" prop as children property, if "content" has type of string.
 *
 * @param {Object} data E.g. "{ type: 'heading3', content: 'my title' }"
 * @returns object containing content string as value for key: children.
 */
export const exposeContentAsChildren = data => {
  return hasContent(data) ? { children: data.content } : {};
};

/**
 * Exposes "content" property, if "content" has type of string.
 *
 * @param {Object} data E.g. "{ type: 'markdown', content: 'my title' }"
 * @returns object containing "content" key if the value is string.
 */
export const exposeContentString = data => (hasContent(data) ? { content: data.content } : {});

/**
 * Exposes "label" and "href" as "children" and "href" props respectively,
 * if both are of type string. Exposed "href" is sanitized.
 *
 * @param {Object} data E.g. "{ type: 'link', label: 'my title', href: 'https://my.domain.com' }"
 * @returns object containing children and href.
 */
export const exposeLinkProps = data => {
  const { label, href } = data;
  const hasCorrectProps = typeof label === 'string' && typeof href === 'string';
  // Sanitize the URL. See: src/utl/sanitize.js for more information.
  const cleanUrl = hasCorrectProps ? sanitizeUrl(href) : null;
  return cleanUrl ? { children: label, href: cleanUrl } : {};
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
 * @param {Object} data E.g. "{ type: 'image', alt: 'my portrait', image: { id, type, attributes } }"
 * @returns object containing alt string and variants.
 */
export const exposeImageProps = data => {
  const { alt, image } = data;
  const { id, type, attributes } = image || {};

  if (type !== 'imageAsset') {
    return {};
  }

  const variantEntries = Object.entries(image?.attributes?.variants || {});
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

  const isValidImage = typeof data?.alt === 'string' && Object.keys(variants).length > 0;
  const sanitizedImage = { id, type, attributes: { ...attributes, variants } };
  return isValidImage ? { alt, image: sanitizedImage } : {};
};

/**
 * Exposes "color" property, if it contains hexadecimal string like "#FF0000" or "#F00".
 *
 * @param {Object} data E.g. "{ type: 'hexColor', color: '#FFFFFF' }"
 * @returns object containing color prop.
 */
export const exposeColorProps = data => {
  const color = data?.color;
  const re = new RegExp('^#([0-9a-f]{3}){1,2}$', 'i');
  const isValidColor = typeof color === 'string' && re.test(color);
  return isValidColor ? { color } : {};
};
