// Sections are currently defined inside SectionBuilder
import SectionBuilder from './SectionBuilder.js';

const hexYellow = '#FFAA00';
const hexBlack = '#000000';

const imagePlaceholder = (width, height) => ({
  id: 'image',
  type: 'imageAsset',
  attributes: {
    variants: {
      square1x: {
        url: `https://picsum.photos/${width}/${height}`, // placeholderImage(width, height, '#00AAFF'),
        width,
        height,
      },
      square2x: {
        url: `https://picsum.photos/${2 * width}/${2 * height}`, // placeholderImage(2 * width, 2 * height, '#FF00AA'),
        width: 2 * width,
        height: 2 * width,
      },
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
        sectionId: 'cms-article-section',
        title: {
          type: 'heading1',
          content: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
        },
        ingress: {
          type: 'paragraph',
          content:
            'Maecenas sed diam eget risus varius blandit sit amet non magna. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
        },
        callToAction: {
          type: 'externalButtonLink',
          href: '#',
          label: 'Justo Tortor Amet',
        },
        blocks: [
          {
            blockType: 'default-block',
            blockId: 'cms-article-section-block-1',
            media: { type: 'image', alt: 'Cute dog smiling', image: imagePlaceholder(600, 800) },
            title: {
              type: 'heading2',
              content:
                'Vestibulum id ligula porta felis euismod semper. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
            },
            text: {
              type: 'markdown',
              content: `Donec ullamcorper nulla non metus auctor fringilla. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam porta sem malesuada magna mollis euismod. Maecenas sed diam eget risus varius blandit sit amet non magna.
Maecenas faucibus mollis interdum. Sed posuere consectetur est at lobortis. Etiam porta sem malesuada magna mollis euismod. Etiam porta sem malesuada magna mollis euismod. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Maecenas faucibus mollis interdum.
              
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              
Vestibulum id ligula porta felis euismod semper. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
              
### Donec ullamcorper nulla non metus auctor fringilla. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Etiam porta sem malesuada magna mollis euismod. Maecenas sed diam eget risus varius blandit sit amet non magna.

- Maecenas faucibus mollis interdum.
- Sed posuere consectetur est at lobortis.
- Etiam porta sem malesuada magna mollis euismod. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Vestibulum id ligula porta felis euismod semper. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.`,
            },
            callToAction: {
              type: 'externalButtonLink',
              href: 'https://www.sharetribe.com/academy/marketplace-funding/',
              label: 'Read the article',
            },
          },
        ],
      },
    ],
  },
  group: 'PageBuilder',
};

export const SectionFeatures = {
  component: SectionBuilder,
  props: {
    sections: [
      {
        sectionType: 'features',
        sectionId: 'cms-features-section-no-block',
        title: {
          type: 'heading1',
          content: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
        },
        ingress: {
          type: 'paragraph',
          content:
            'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit.',
        },
        callToAction: {
          type: 'externalButtonLink',
          href: '#',
          label: 'Justo Tortor Amet',
        },
        blocks: [
          {
            blockType: 'default-block',
            blockId: 'cms-features-block-1',
            media: { type: 'image', alt: 'First image', image: imagePlaceholder(400, 400) },
            title: {
              type: 'heading2',
              content: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              type: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              type: 'internalButtonLink',
              href: '#',
              label: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-features-block-2',
            media: { type: 'image', alt: 'First image', image: imagePlaceholder(400, 400) },
            title: {
              type: 'heading2',
              content: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              type: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              type: 'internalButtonLink',
              href: '#',
              label: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-features-block-3',
            media: { type: 'image', alt: 'First image', image: imagePlaceholder(400, 400) },
            title: {
              type: 'heading2',
              content: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              type: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              type: 'internalButtonLink',
              href: '#',
              label: 'Ultricies Elit Sem',
            },
          },
        ],
      },
    ],
  },
  group: 'PageBuilder',
};

export const SectionCarousel = {
  component: SectionBuilder,
  props: {
    sections: [
      {
        sectionType: 'carousel',
        sectionId: 'cms-features-section-no-block',
        numColumns: 1,
        title: {
          type: 'heading2',
          content: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
        },
        ingress: {
          type: 'paragraph',
          content:
            'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit.',
        },
        callToAction: {
          type: 'externalButtonLink',
          href: '#',
          label: 'Justo Tortor Amet',
        },
        blocks: [
          {
            blockType: 'default-block',
            blockId: 'cms-carousel-block-1',
            media: { type: 'image', alt: 'First image: 16:9', image: imagePlaceholder(576, 324) },
            title: {
              type: 'heading3',
              content: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              type: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              type: 'internalButtonLink',
              href: '#',
              label: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-carousel-block-2',
            media: { type: 'image', alt: 'First image: 16:9', image: imagePlaceholder(576, 324) },
            title: {
              type: 'heading3',
              content: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              type: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              type: 'internalButtonLink',
              href: '#',
              label: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-carousel-block-3',
            media: { type: 'image', alt: 'First image: 16:9', image: imagePlaceholder(576, 324) },
            title: {
              type: 'heading3',
              content: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              type: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              type: 'internalButtonLink',
              href: '#',
              label: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-carousel-block-4',
            media: { type: 'image', alt: 'First image: 16:9', image: imagePlaceholder(576, 324) },
            title: {
              type: 'heading3',
              content: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              type: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              type: 'internalButtonLink',
              href: '#',
              label: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-carousel-block-5',
            media: { type: 'image', alt: 'First image: 16:9', image: imagePlaceholder(576, 324) },
            title: {
              type: 'heading3',
              content: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              type: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              type: 'internalButtonLink',
              href: '#',
              label: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-carousel-block-6',
            media: { type: 'image', alt: 'First image: 16:9', image: imagePlaceholder(576, 324) },
            title: {
              type: 'heading3',
              content: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              type: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              type: 'internalButtonLink',
              href: '#',
              label: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-carousel-block-7',
            media: { type: 'image', alt: 'First image: 16:9', image: imagePlaceholder(576, 324) },
            title: {
              type: 'heading3',
              content: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              type: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              type: 'internalButtonLink',
              href: '#',
              label: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-carousel-block-8',
            media: { type: 'image', alt: 'First image: 16:9', image: imagePlaceholder(576, 324) },
            title: {
              type: 'heading3',
              content: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              type: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              type: 'internalButtonLink',
              href: '#',
              label: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'default-block',
            blockId: 'cms-carousel-block-9',
            media: { type: 'image', alt: 'First image: 16:9', image: imagePlaceholder(576, 324) },
            title: {
              type: 'heading3',
              content: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              type: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              type: 'internalButtonLink',
              href: '#',
              label: 'Ultricies Elit Sem',
            },
          },
        ],
      },
    ],
  },
  group: 'PageBuilder',
};

export const SectionColumns = {
  component: SectionBuilder,
  props: {
    sections: [
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-no-block',
        numColumns: 1,
        background: { type: 'hexColor', color: hexYellow },
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
        background: { type: 'hexColor', color: hexBlack },
        textColor: 'light',
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
        background: { type: 'hexColor', color: hexBlack },
        textColor: 'light',
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
  group: 'PageBuilder',
};
