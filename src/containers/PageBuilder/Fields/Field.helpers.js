import { sanitizeUrl } from '../../../util/sanitize.js';

/////////////////////////////
// Pickers for valid props //
/////////////////////////////

const hasContent = data => typeof data?.content === 'string';
export const exposeContentAsChildren = data => {
  return hasContent(data) ? { children: data.content } : {};
};
export const exposeContentString = data => (hasContent(data) ? { content: data.content } : {});

export const exposeLinkProps = data => {
  const { label, href } = data;
  const hasCorrectProps = typeof label === 'string' && typeof href === 'string';
  const cleanUrl = hasCorrectProps ? sanitizeUrl(href) : null;
  return cleanUrl ? { children: label, href: cleanUrl } : {};
};

export const exposeImageProps = data => {
  // TODO image dimensions and variants are not specified yet
  const { alt, image } = data;
  const isValidImage = typeof data?.alt === 'string';
  // return isValidImage ? { alt, src: 'https://assets.newatlas.com/dims4/default/15c3800/2147483647/strip/true/crop/800x600+0+0/resize/800x600!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2F2016-year-in-ai-art-2.jpg', width: '800', height: '600' } : {};
  const variants = image?.variants || {};

  return isValidImage ? { alt, variants } : {};
};

export const exposeColorProps = data => {
  const color = data?.color;
  const re = new RegExp('^#([0-9a-f]{3}){1,2}$', 'i');
  const isValidColor = typeof color === 'string' && re.test(color);
  return isValidColor ? { color } : {};
};
