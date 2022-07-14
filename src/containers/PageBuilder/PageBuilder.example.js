import React from 'react';

import { H1 } from './Primitives/Heading/index.js';
import PageBuilder from './PageBuilder.js';

const hexYellow = '#FFAA00';

////////////////////////////
// Denormalized image ref //
////////////////////////////

const imagePlaceholder = (width, height) => ({
  id: 'image',
  type: 'imageAsset',
  attributes: {
    variants: {
      square1x: {
        url: `https://picsum.photos/${width}/${height}`,
        width,
        height,
      },
      square2x: {
        url: `https://picsum.photos/${2 * width}/${2 * height}`,
        width: 2 * width,
        height: 2 * width,
      },
    },
  },
});

const Placeholder = props => (
  <div
    style={{
      backgroundColor: hexYellow,
      width: '100%',
      height: props?.height || '100%',
      justifySelf: 'center',
      alignSelf: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyItems: 'center',
      border: 'dashed 5px #fff',
    }}
  >
    <H1 style={{ textAlign: 'center', width: '100%' }}>Blaa</H1>
  </div>
);

export const PageWithOneSection = {
  component: PageBuilder,
  props: {
    pageAssetsData: {
      sections: [
        {
          sectionType: 'custom-a',
          sectionId: 'custom-a',
        },
      ],
    },
    options: {
      sectionComponents: {
        ['custom-a']: { component: Placeholder },
      },
    },
    description: 'Example page by PageBuilder',
    title: 'Styleguide page',
  },
  group: 'PageBuilder',
  rawOnly: true,
};

export const PageWith3Sections = {
  component: PageBuilder,
  props: {
    pageAssetsData: {
      sections: [
        {
          sectionType: 'custom-a',
          sectionId: 'custom-a',
        },
        {
          sectionType: 'custom-b',
          sectionId: 'custom-b',
        },
        {
          sectionType: 'custom-c',
          sectionId: 'custom-c',
        },
      ],
    },
    options: {
      sectionComponents: {
        ['custom-a']: { component: Placeholder },
        ['custom-b']: { component: Placeholder },
        ['custom-c']: { component: Placeholder },
      },
    },
    description: 'Example page by PageBuilder',
    title: 'Styleguide page',
  },
  group: 'PageBuilder',
  rawOnly: true,
};

const PlaceholderTall = () => <Placeholder height="100vh" />;

export const PageWith3xHeight = {
  component: PageBuilder,
  props: {
    pageAssetsData: {
      sections: [
        {
          sectionType: 'custom-a',
          sectionId: 'custom-a',
        },
        {
          sectionType: 'custom-b',
          sectionId: 'custom-b',
        },
        {
          sectionType: 'custom-c',
          sectionId: 'custom-c',
        },
      ],
    },
    options: {
      sectionComponents: {
        ['custom-a']: { component: PlaceholderTall },
        ['custom-b']: { component: PlaceholderTall },
        ['custom-c']: { component: PlaceholderTall },
      },
    },
    description: 'Example page by PageBuilder',
    title: 'Styleguide page',
  },
  group: 'PageBuilder',
  rawOnly: true,
};

export const PageWithBuildInSectionColumns = {
  component: PageBuilder,
  props: {
    pageAssetsData: {
      sections: [
        {
          sectionType: 'columns',
          sectionId: 'page-builder-columns-section-0',
          numColumns: 1,
          title: { type: 'heading2', content: 'One Column' },
          ingress: {
            type: 'heading2',
            content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
          },
          blocks: [
            {
              blockType: 'default-block',
              blockId: 'page-builder-columns-section-0-block-1',
              title: { type: 'heading3', content: 'Column 1' },
              text: {
                type: 'markdown',
                content: `**Lorem ipsum** dolor sit amet, consectetur adipiscing elit. Nulla orci nisi, lobortis sit amet posuere et, vulputate sit amet neque. Nam a est id lectus viverra sagittis. Proin sed imperdiet lorem. Duis aliquam fermentum purus, tincidunt venenatis felis gravida in. Sed imperdiet mi vitae consequat rhoncus. Sed velit leo, porta at lorem ac, iaculis fermentum leo. Morbi tellus orci, bibendum id ante vel, hendrerit efficitur lectus. Proin vitae condimentum justo. Phasellus finibus nisi quis neque feugiat, ac auctor ipsum suscipit.`,
              },
            },
          ],
        },
        {
          sectionType: 'columns',
          sectionId: 'page-builder-columns-section-1',
          numColumns: 2,
          background: { type: 'hexColor', color: hexYellow },
          title: { type: 'heading2', content: '2 Columns' },
          ingress: {
            type: 'heading2',
            content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
          },
          blocks: [
            {
              blockType: 'default-block',
              blockId: 'page-builder-columns-section-1-block-1',
              title: { type: 'heading3', content: 'Column 1' },
              text: {
                type: 'markdown',
                content: `**Lorem ipsum** dolor sit amet consectetur adepisci elit...`,
              },
            },
            {
              blockType: 'default-block',
              blockId: 'page-builder-columns-section-1-block-2',
              title: { type: 'heading3', content: 'Column 2' },
              text: {
                type: 'markdown',
                content: `**Lorem ipsum** dolor sit amet consectetur adepisci elit...`,
              },
            },
          ],
        },
        {
          sectionType: 'columns',
          sectionId: 'page-builder-columns-section-2',
          numColumns: 2,
          title: { type: 'heading2', content: '2 Columns' },
          ingress: {
            type: 'heading2',
            content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
          },
          blocks: [
            {
              blockType: 'default-block',
              blockId: 'page-builder-columns-section-2-block-1',
              title: { type: 'heading3', content: 'Column 1' },
              media: { type: 'image', alt: 'Background image', image: imagePlaceholder(1200, 800) },
            },
            {
              blockType: 'default-block',
              blockId: 'page-builder-columns-section-2-block-2',
              title: { type: 'heading3', content: 'Column 2' },
              media: { type: 'image', alt: 'Background image', image: imagePlaceholder(1200, 800) },
            },
          ],
        },
        {
          sectionType: 'columns',
          sectionId: 'page-builder-columns2-section-3',
          numColumns: 3,
          backgroundImage: {
            type: 'image',
            alt: 'Background image',
            image: imagePlaceholder(1200, 800, '#b6f7f9'),
          },
          title: { type: 'heading2', content: '3 Columns' },
          ingress: {
            type: 'heading2',
            content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
          },
          textColor: 'light',
          blocks: [
            {
              blockType: 'default-block',
              blockId: 'page-builder-columns2-section-3-block-1',
              title: { type: 'heading3', content: 'Column 1' },
              media: { type: 'image', alt: 'Background image', image: imagePlaceholder(1200, 800) },
            },
            {
              blockType: 'default-block',
              blockId: 'page-builder-columns2-section-3-block-2',
              title: { type: 'heading3', content: 'Column 2' },
              media: { type: 'image', alt: 'Background image', image: imagePlaceholder(1200, 800) },
            },
            {
              blockType: 'default-block',
              blockId: 'page-builder-columns2-section-3-block-3',
              title: { type: 'heading3', content: 'Column 3' },
              media: { type: 'image', alt: 'Background image', image: imagePlaceholder(1200, 800) },
            },
          ],
        },
        {
          sectionType: 'columns',
          sectionId: 'page-builder-columns2-section-4',
          numColumns: 4,
          title: { type: 'heading2', content: '4 Columns' },
          ingress: {
            type: 'heading2',
            content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
          },
          blocks: [
            {
              blockType: 'default-block',
              blockId: 'page-builder-columns2-section-4-block-1',
              title: { type: 'heading3', content: 'Column 1' },
              media: { type: 'image', alt: 'Background image', image: imagePlaceholder(1200, 800) },
            },
            {
              blockType: 'default-block',
              blockId: 'page-builder-columns2-section-4-block-2',
              title: { type: 'heading3', content: 'Column 2' },
              media: { type: 'image', alt: 'Background image', image: imagePlaceholder(1200, 800) },
            },
            {
              blockType: 'default-block',
              blockId: 'page-builder-columns2-section-4-block-3',
              title: { type: 'heading3', content: 'Column 3' },
              media: { type: 'image', alt: 'Background image', image: imagePlaceholder(1200, 800) },
            },
            {
              blockType: 'default-block',
              blockId: 'page-builder-columns2-section-4-block-4',
              title: { type: 'heading3', content: 'Column 4' },
              media: { type: 'image', alt: 'Background image', image: imagePlaceholder(1200, 800) },
            },
          ],
        },
      ],
    },
    options: {
      sectionComponents: {
        ['custom-c']: { component: PlaceholderTall },
      },
    },
    description: 'Example page by PageBuilder',
    title: 'Styleguide page',
  },
  group: 'PageBuilder',
  rawOnly: true,
};
