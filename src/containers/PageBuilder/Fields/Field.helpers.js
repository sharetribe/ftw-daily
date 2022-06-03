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
  const { alt, image, width = 400, height = 400 } = data;
  const isValidImage = typeof data?.alt === 'string';
  // return isValidImage ? { alt, src: 'https://assets.newatlas.com/dims4/default/15c3800/2147483647/strip/true/crop/800x600+0+0/resize/800x600!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2F2016-year-in-ai-art-2.jpg', width: '800', height: '600' } : {};
  return isValidImage
    ? { alt, src: placeHolderImage(width, height, data.bgColor), width, height }
    : {};
};

export const exposeColorProps = data => {
  const color = data?.color;
  const re = new RegExp('^#([0-9a-f]{3}){1,2}$', 'i');
  const isValidColor = typeof color === 'string' && re.test(color);
  return isValidColor ? { color } : {};
};

////////////////////////////
// TODO image field stuff //
////////////////////////////
const placeHolderImage = (width, height, bgColor = '#ff00aa') => {
  //const bgColor = '#ff00aa';
  const textColor = '#4a4a4a';
  const fontFamily = 'sans-serif';
  const fontSize = '12px';
  const dy = '10.5';
  const fontWeight = 'bold';
  const text = `${width}x${height}`;

  const str = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect fill="${bgColor}" width="${width}" height="${height}"/>
    <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>
  </svg>`;

  const cleaned = str
    .replace(/[\t\n\r]/gim, '') // Strip newlines and tabs
    .replace(/\s\s+/g, ' ') // Condense multiple spaces
    .replace(/'/gim, '\\i'); // Normalize quotes

  const encoded = encodeURIComponent(cleaned)
    .replace(/\(/g, '%28') // Encode brackets
    .replace(/\)/g, '%29');

  return `data:image/svg+xml;charset=UTF-8,${encoded}`;
};
