// Sections are currently defined inside SectionBuilder
import SectionBuilder from './SectionBuilder.js';

const hexYellow = '#FFAA00';
const hexBlack = '#000000';

/////////////////////////
// TODO fake image ref //
/////////////////////////
const placeholderImage = (width, height, bgColor = '#ff00aa') => {
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

const width = 400;
const height = 400;

const imagePlaceholder = (width, height) => ({
  resolver: 'image',
  variants: {
    square1x: {
      url: placeholderImage(width, height, '#00AAFF'),
      width,
      height,
    },
    square2x: {
      url: placeholderImage(2 * width, 2 * height, '#FF00AA'),
      width: 2 * width,
      height: 2 * width,
    },
  },
});

/////////////////////////////
// SectionColumns examples //
/////////////////////////////

export const SectionArticle = {
  component: SectionBuilder,
  props: {
    sections: [
      {
        sectionType: 'article',
        sectionId: 'cms-article-section-no-block',
        title: { type: 'heading2', content: 'Article' },
        ingress: {
          type: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
      },
    ],
  },
};

export const SectionColumns = {
  component: SectionBuilder,
  props: {
    sections: [
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-no-block',
        numColumns: 1,
        background: { color: hexYellow },
        title: { type: 'heading2', content: 'One Column, No Blocks' },
        ingress: {
          type: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-no-block-dark',
        numColumns: 1,
        background: { color: hexBlack },
        theme: 'dark',
        title: { type: 'heading2', content: 'One Column, No Blocks' },
        ingress: {
          type: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
        callToAction: {
          type: 'externalButtonLink',
          href: 'https://www.sharetribe.com/docs/',
          label: 'Flex Docs',
        },
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-no-block-bg-img',
        numColumns: 1,
        background: { type: 'hexColor', color: hexYellow },
        backgroundImage: {
          type: 'image',
          alt: 'Background image',
          image: imagePlaceholder(400, 400),
        },
        title: { type: 'heading2', content: 'One Column, No Blocks, Bg Image' },
        ingress: {
          type: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
        callToAction: {
          type: 'externalButtonLink',
          href: 'https://www.sharetribe.com/docs/',
          label: 'Flex Docs',
        },
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-1',
        numColumns: 1,
        title: { type: 'heading2', content: 'One Column' },
        ingress: {
          type: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
        blocks: [
          {
            blockType: 'default-block',
            blockId: 'cms-column1-block-1',
            title: { type: 'heading3', content: 'Block 1' },
            text: {
              type: 'markdown',
              content: `**Lorem ipsum** dolor sit amet consectetur adepisci elit...`,
            },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column1-block-2',
            title: { type: 'heading3', content: 'Block 2' },
            text: {
              type: 'markdown',
              content: `**Lorem ipsum** dolor sit amet consectetur adepisci elit...`,
            },
          },
        ],
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-2',
        numColumns: 2,
        title: { type: 'heading2', content: '2 Columns' },
        ingress: {
          type: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
        blocks: [
          {
            blockType: 'default-block',
            blockId: 'cms-column2-block-1',
            title: { type: 'heading3', content: 'Column 1' },
            text: {
              type: 'markdown',
              content: `**Lorem ipsum** dolor sit amet consectetur adepisci elit...`,
            },
            callToAction: {
              type: 'internalButtonLink',
              href: '/l/wooden-sauna/5aafa4ec-87c1-4043-b82f-14d67389dd19',
              label: 'See the sauna',
            },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column2-block-2',
            title: { type: 'heading3', content: 'Column 2' },
            text: {
              type: 'markdown',
              content: `**Lorem ipsum** dolor sit amet consectetur adepisci elit...`,
            },
            callToAction: {
              type: 'internalButtonLink',
              href: '/l/wooden-sauna/5aafa4ec-87c1-4043-b82f-14d67389dd19',
              label: 'See the sauna',
            },
          },
        ],
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-2-dark',
        numColumns: 2,
        background: { color: hexBlack },
        theme: 'dark',
        title: { type: 'heading2', content: '2 Columns, Dark' },
        ingress: {
          type: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
        blocks: [
          {
            blockType: 'default-block',
            blockId: 'cms-column2-block-1-dark',
            title: { type: 'heading3', content: 'Column 1' },
            text: {
              type: 'markdown',
              content: `**Lorem ipsum** dolor sit amet consectetur adepisci elit...`,
            },
            callToAction: {
              type: 'internalButtonLink',
              href: '/l/wooden-sauna/5aafa4ec-87c1-4043-b82f-14d67389dd19',
              label: 'See the sauna',
            },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column2-block-2-dark',
            title: { type: 'heading3', content: 'Column 2' },
            text: {
              type: 'markdown',
              content: `**Lorem ipsum** dolor sit amet consectetur adepisci elit...`,
            },
            callToAction: {
              type: 'internalButtonLink',
              href: '/l/wooden-sauna/5aafa4ec-87c1-4043-b82f-14d67389dd19',
              label: 'See the sauna',
            },
          },
        ],
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-3',
        numColumns: 3,
        title: { type: 'heading2', content: '3 Columns' },
        ingress: {
          type: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
        blocks: [
          {
            blockType: 'default-block',
            blockId: 'cms-column3-block-1',
            media: { type: 'image', alt: 'First image', image: imagePlaceholder(400, 400) },
            title: { type: 'heading3', content: 'Image 1' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column3-block-2',
            media: { type: 'image', alt: 'Second image', image: imagePlaceholder(400, 400) },
            title: { type: 'heading3', content: 'Image 2' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column3-block-3',
            media: { type: 'image', alt: 'Third image', image: imagePlaceholder(400, 400) },
            title: { type: 'heading3', content: 'Image 3' },
          },
        ],
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-4',
        numColumns: 4,
        title: { type: 'heading2', content: '4 Columns' },
        ingress: {
          type: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
        blocks: [
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-1-variant-1',
            media: { type: 'image', alt: 'First image', image: imagePlaceholder(400, 400) },
            title: { type: 'heading3', content: 'Image 1' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-2-variant-1',
            media: { type: 'image', alt: 'Second image', image: imagePlaceholder(400, 400) },
            title: { type: 'heading3', content: 'Image 2' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-3-variant-1',
            media: { type: 'image', alt: 'Third image', image: imagePlaceholder(400, 400) },
            title: { type: 'heading3', content: 'Image 3' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-4-variant-1',
            media: { type: 'image', alt: 'Fourth image', image: imagePlaceholder(400, 400) },
            title: { type: 'heading3', content: 'Image 4' },
          },
        ],
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-5',
        numColumns: 4,
        title: { type: 'heading2', content: '4 Columns 5 blocks' },
        ingress: { type: 'paragraph', content: 'Portrait images (400x500)' },
        blocks: [
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-1-variant-2',
            media: { type: 'image', alt: 'First image', image: imagePlaceholder(400, 500) },
            title: { type: 'heading3', content: 'Image 1' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-2-variant-2',
            media: { type: 'image', alt: 'Second image', image: imagePlaceholder(400, 500) },
            title: { type: 'heading3', content: 'Image 2' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-3-variant-2',
            media: { type: 'image', alt: 'Third image', image: imagePlaceholder(400, 500) },
            title: { type: 'heading3', content: 'Image 3' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-4-variant-2',
            media: { type: 'image', alt: 'Fourth image', image: imagePlaceholder(400, 500) },
            title: { type: 'heading3', content: 'Image 4' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-5-variant-2',
            media: { type: 'image', alt: 'Fifth image', image: imagePlaceholder(400, 500) },
            title: { type: 'heading3', content: 'Image 5' },
          },
        ],
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-6',
        numColumns: 4,
        title: { type: 'heading2', content: '4 Columns 3 blocks' },
        ingress: { type: 'paragraph', content: 'Landscape images (400x300)' },
        blocks: [
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-1-variant-3',
            media: { type: 'image', alt: 'First image', image: imagePlaceholder(400, 300) },
            title: { type: 'heading3', content: 'Image 1' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-2-variant-3',
            media: { type: 'image', alt: 'Second image', image: imagePlaceholder(400, 300) },
            title: { type: 'heading3', content: 'Image 2' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-3-variant-3',
            media: { type: 'image', alt: 'Third image', image: imagePlaceholder(400, 300) },
            title: { type: 'heading3', content: 'Image 3' },
          },
        ],
      },
    ],
  },
  group: 'cms',
};
