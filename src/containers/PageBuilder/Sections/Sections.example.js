// Sections are currently defined inside SectionBuilder
import SectionBuilder from './SectionBuilder.js';

const hexYellow = '#FFAA00';
const hexBlack = '#000000';

/////////////////////////////
// SectionColumns examples //
/////////////////////////////

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
          type: 'external-button-link',
          link: 'https://www.sharetribe.com/docs/',
          label: 'Flex Docs',
        },
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-no-block-bg-img',
        numColumns: 1,
        background: { color: hexYellow },
        backgroundImage: { type: 'image', alt: 'Background image', width: 1200, height: 800 },
        title: { type: 'heading2', content: 'One Column, No Blocks, Bg Image' },
        ingress: {
          type: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
        callToAction: {
          type: 'external-button-link',
          link: 'https://www.sharetribe.com/docs/',
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
              href: '/l/wooden-sauna/5aafa4ec-87c1-4043-b82f-14d67389dd19',
              label: 'See the sauna',
              type: 'internalButtonLink',
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
              href: '/l/wooden-sauna/5aafa4ec-87c1-4043-b82f-14d67389dd19',
              label: 'See the sauna',
              type: 'internalButtonLink',
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
              href: '/l/wooden-sauna/5aafa4ec-87c1-4043-b82f-14d67389dd19',
              label: 'See the sauna',
              type: 'internalButtonLink',
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
              href: '/l/wooden-sauna/5aafa4ec-87c1-4043-b82f-14d67389dd19',
              label: 'See the sauna',
              type: 'internalButtonLink',
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
            media: { type: 'image', alt: 'First image', width: 400, height: 300 },
            title: { type: 'heading3', content: 'Image 1' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column3-block-2',
            media: { type: 'image', alt: 'Second image', width: 400, height: 300 },
            title: { type: 'heading3', content: 'Image 2' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column3-block-3',
            media: { type: 'image', alt: 'Third image', width: 400, height: 300 },
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
            media: { type: 'image', alt: 'First image', width: 400, height: 400 },
            title: { type: 'heading3', content: 'Image 1' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-2-variant-1',
            media: { type: 'image', alt: 'Second image', width: 400, height: 400 },
            title: { type: 'heading3', content: 'Image 2' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-3-variant-1',
            media: { type: 'image', alt: 'Third image', width: 400, height: 400 },
            title: { type: 'heading3', content: 'Image 3' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-4-variant-1',
            media: { type: 'image', alt: 'Fourth image', width: 400, height: 400 },
            title: { type: 'heading3', content: 'Image 4' },
          },
        ],
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-5',
        numColumns: 4,
        title: { type: 'heading2', content: '4 Columns 5 blocks' },
        ingress: { type: 'paragraph', content: 'Portrait images (500x400)' },
        blocks: [
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-1-variant-2',
            media: { type: 'image', alt: 'First image', width: 400, height: 500 },
            title: { type: 'heading3', content: 'Image 1' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-2-variant-2',
            media: { type: 'image', alt: 'Second image', width: 400, height: 500 },
            title: { type: 'heading3', content: 'Image 2' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-3-variant-2',
            media: { type: 'image', alt: 'Third image', width: 400, height: 500 },
            title: { type: 'heading3', content: 'Image 3' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-4-variant-2',
            media: { type: 'image', alt: 'Fourth image', width: 400, height: 500 },
            title: { type: 'heading3', content: 'Image 4' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-5-variant-2',
            media: { type: 'image', alt: 'Fifth image', width: 400, height: 500 },
            title: { type: 'heading3', content: 'Image 5' },
          },
        ],
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-6',
        numColumns: 4,
        title: { type: 'heading2', content: '4 Columns 3 blocks' },
        ingress: { type: 'paragraph', content: 'Portrait images (500x400)' },
        blocks: [
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-1-variant-3',
            media: { type: 'image', alt: 'First image', width: 400, height: 500 },
            title: { type: 'heading3', content: 'Image 1' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-2-variant-3',
            media: { type: 'image', alt: 'Second image', width: 400, height: 500 },
            title: { type: 'heading3', content: 'Image 2' },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-column4-block-3-variant-3',
            media: { type: 'image', alt: 'Third image', width: 400, height: 500 },
            title: { type: 'heading3', content: 'Image 3' },
          },
        ],
      },
    ],
  },
  group: 'cms',
};
