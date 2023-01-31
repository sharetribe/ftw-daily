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
          fieldType: 'heading1',
          content: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
        },
        description: {
          fieldType: 'paragraph',
          content:
            'Maecenas sed diam eget risus varius blandit sit amet non magna. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
        },
        callToAction: {
          fieldType: 'externalButtonLink',
          href: '#',
          content: 'Justo Tortor Amet',
        },
        blocks: [
          {
            blockType: 'defaultBlock',
            blockId: 'cms-article-section-block-1',
            media: {
              fieldType: 'image',
              alt: 'Cute dog smiling',
              image: imagePlaceholder(600, 800),
            },
            title: {
              fieldType: 'heading2',
              content:
                'Vestibulum id ligula porta felis euismod semper. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
            },
            text: {
              fieldType: 'markdown',
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
              fieldType: 'externalButtonLink',
              href: 'https://www.sharetribe.com/academy/marketplace-funding/',
              content: 'Read the article',
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
          fieldType: 'heading1',
          content: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
        },
        description: {
          fieldType: 'paragraph',
          content:
            'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit.',
        },
        callToAction: {
          fieldType: 'externalButtonLink',
          href: '#',
          content: 'Justo Tortor Amet',
        },
        blocks: [
          {
            blockType: 'defaultBlock',
            blockId: 'cms-features-block-1',
            media: { fieldType: 'image', alt: 'First image', image: imagePlaceholder(400, 400) },
            title: {
              fieldType: 'heading2',
              content: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-features-block-2',
            media: { fieldType: 'image', alt: 'First image', image: imagePlaceholder(400, 400) },
            title: {
              fieldType: 'heading2',
              content: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-features-block-3',
            media: { fieldType: 'image', alt: 'First image', image: imagePlaceholder(400, 400) },
            title: {
              fieldType: 'heading2',
              content: 'Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
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
        sectionId: 'cms-features-section-carousel1',
        numColumns: 1,
        title: {
          fieldType: 'heading2',
          content: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
        },
        description: {
          fieldType: 'paragraph',
          content:
            'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit.',
        },
        callToAction: {
          fieldType: 'externalButtonLink',
          href: '#',
          content: 'Justo Tortor Amet',
        },
        blocks: [
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel-block-1',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '1 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel-block-2',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '2 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel-block-3',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '3 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel-block-4',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '4 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel-block-5',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '5 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel-block-6',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '6 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel-block-7',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '7 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel-block-8',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '8 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel-block-9',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '9 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
        ],
      },

      {
        sectionType: 'carousel',
        sectionId: 'cms-features-section-carousel2',
        numColumns: 3,
        title: {
          fieldType: 'heading2',
          content: 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
        },
        description: {
          fieldType: 'paragraph',
          content:
            'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit.',
        },
        callToAction: {
          fieldType: 'externalButtonLink',
          href: '#',
          content: 'Justo Tortor Amet',
        },
        blocks: [
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel2-block-1',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '1 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel2-block-2',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '2 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel2-block-3',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '3 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel2-block-4',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '4 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel2-block-5',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '5 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel2-block-6',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '6 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel2-block-7',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '7 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel2-block-8',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '8 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-carousel2-block-9',
            media: {
              fieldType: 'image',
              alt: 'First image: 16:9',
              image: imagePlaceholder(576, 324),
            },
            title: {
              fieldType: 'heading3',
              content: '9 Nullam id dolor id nibh ultricies vehicula ut id elit.',
            },
            text: {
              fieldType: 'markdown',
              content: `Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '#',
              content: 'Ultricies Elit Sem',
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
        appearance: { fieldType: 'customAppearance', backgroundColor: hexYellow },
        title: { fieldType: 'heading2', content: 'One Column, No Blocks' },
        description: {
          fieldType: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-no-block-dark',
        numColumns: 1,
        appearance: {
          fieldType: 'customAppearance',
          backgroundColor: hexBlack,
          textColor: 'light',
        },
        title: { fieldType: 'heading2', content: 'One Column, No Blocks' },
        description: {
          fieldType: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
        callToAction: {
          fieldType: 'externalButtonLink',
          href: 'https://www.sharetribe.com/docs/',
          content: 'Flex Docs',
        },
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-no-block-bg-img',
        numColumns: 1,
        appearance: {
          fieldType: 'customAppearance',
          backgroundImage: imagePlaceholder(400, 400),
          alt: 'Background image',
          backgroundColor: '#000000',
          textColor: 'white',
        },
        title: { fieldType: 'heading2', content: 'One Column, No Blocks, Bg Image' },
        description: {
          fieldType: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
        callToAction: {
          fieldType: 'externalButtonLink',
          href: 'https://www.sharetribe.com/docs/',
          content: 'Flex Docs',
        },
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-1',
        numColumns: 1,
        title: { fieldType: 'heading2', content: 'One Column' },
        description: {
          fieldType: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
        blocks: [
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column1-block-1',
            title: { fieldType: 'heading3', content: 'Block 1' },
            text: {
              fieldType: 'markdown',
              content: `**Lorem ipsum** dolor sit amet consectetur adepisci elit...`,
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column1-block-2',
            title: { fieldType: 'heading3', content: 'Block 2' },
            text: {
              fieldType: 'markdown',
              content: `**Lorem ipsum** dolor sit amet consectetur adepisci elit...`,
            },
          },
        ],
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-2',
        numColumns: 2,
        title: { fieldType: 'heading2', content: '2 Columns' },
        description: {
          fieldType: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
        blocks: [
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column2-block-1',
            title: { fieldType: 'heading3', content: 'Column 1' },
            text: {
              fieldType: 'markdown',
              content: `**Lorem ipsum** dolor sit amet consectetur adepisci elit...`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '/l/wooden-sauna/5aafa4ec-87c1-4043-b82f-14d67389dd19',
              content: 'See the sauna',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column2-block-2',
            title: { fieldType: 'heading3', content: 'Column 2' },
            text: {
              fieldType: 'markdown',
              content: `**Lorem ipsum** dolor sit amet consectetur adepisci elit...`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '/l/wooden-sauna/5aafa4ec-87c1-4043-b82f-14d67389dd19',
              content: 'See the sauna',
            },
          },
        ],
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-2-dark',
        numColumns: 2,
        appearance: {
          fieldType: 'customAppearance',
          backgroundColor: hexBlack,
          textColor: 'light',
        },
        title: { fieldType: 'heading2', content: '2 Columns, Dark' },
        description: {
          fieldType: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
        blocks: [
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column2-block-1-dark',
            title: { fieldType: 'heading3', content: 'Column 1' },
            text: {
              fieldType: 'markdown',
              content: `**Lorem ipsum** dolor sit amet consectetur adepisci elit...`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '/l/wooden-sauna/5aafa4ec-87c1-4043-b82f-14d67389dd19',
              content: 'See the sauna',
            },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column2-block-2-dark',
            title: { fieldType: 'heading3', content: 'Column 2' },
            text: {
              fieldType: 'markdown',
              content: `**Lorem ipsum** dolor sit amet consectetur adepisci elit...`,
            },
            callToAction: {
              fieldType: 'internalButtonLink',
              href: '/l/wooden-sauna/5aafa4ec-87c1-4043-b82f-14d67389dd19',
              content: 'See the sauna',
            },
          },
        ],
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-3',
        numColumns: 3,
        title: { fieldType: 'heading2', content: '3 Columns' },
        description: {
          fieldType: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
        blocks: [
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column3-block-1',
            media: { fieldType: 'image', alt: 'First image', image: imagePlaceholder(400, 400) },
            title: { fieldType: 'heading3', content: 'Image 1' },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column3-block-2',
            media: { fieldType: 'image', alt: 'Second image', image: imagePlaceholder(400, 400) },
            title: { fieldType: 'heading3', content: 'Image 2' },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column3-block-3',
            media: { fieldType: 'image', alt: 'Third image', image: imagePlaceholder(400, 400) },
            title: { fieldType: 'heading3', content: 'Image 3' },
          },
        ],
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-4',
        numColumns: 4,
        title: { fieldType: 'heading2', content: '4 Columns' },
        description: {
          fieldType: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur adepisci elit...',
        },
        blocks: [
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column4-block-1-variant-1',
            media: { fieldType: 'image', alt: 'First image', image: imagePlaceholder(400, 400) },
            title: { fieldType: 'heading3', content: 'Image 1' },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column4-block-2-variant-1',
            media: { fieldType: 'image', alt: 'Second image', image: imagePlaceholder(400, 400) },
            title: { fieldType: 'heading3', content: 'Image 2' },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column4-block-3-variant-1',
            media: { fieldType: 'image', alt: 'Third image', image: imagePlaceholder(400, 400) },
            title: { fieldType: 'heading3', content: 'Image 3' },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column4-block-4-variant-1',
            media: { fieldType: 'image', alt: 'Fourth image', image: imagePlaceholder(400, 400) },
            title: { fieldType: 'heading3', content: 'Image 4' },
          },
        ],
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-5',
        numColumns: 4,
        title: { fieldType: 'heading2', content: '4 Columns 5 blocks' },
        description: { fieldType: 'paragraph', content: 'Portrait images (400x500)' },
        blocks: [
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column4-block-1-variant-2',
            media: { fieldType: 'image', alt: 'First image', image: imagePlaceholder(400, 500) },
            title: { fieldType: 'heading3', content: 'Image 1' },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column4-block-2-variant-2',
            media: { fieldType: 'image', alt: 'Second image', image: imagePlaceholder(400, 500) },
            title: { fieldType: 'heading3', content: 'Image 2' },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column4-block-3-variant-2',
            media: { fieldType: 'image', alt: 'Third image', image: imagePlaceholder(400, 500) },
            title: { fieldType: 'heading3', content: 'Image 3' },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column4-block-4-variant-2',
            media: { fieldType: 'image', alt: 'Fourth image', image: imagePlaceholder(400, 500) },
            title: { fieldType: 'heading3', content: 'Image 4' },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column4-block-5-variant-2',
            media: { fieldType: 'image', alt: 'Fifth image', image: imagePlaceholder(400, 500) },
            title: { fieldType: 'heading3', content: 'Image 5' },
          },
        ],
      },
      {
        sectionType: 'columns',
        sectionId: 'cms-column-section-6',
        numColumns: 4,
        title: { fieldType: 'heading2', content: '4 Columns 3 blocks' },
        description: { fieldType: 'paragraph', content: 'Landscape images (400x300)' },
        blocks: [
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column4-block-1-variant-3',
            media: { fieldType: 'image', alt: 'First image', image: imagePlaceholder(400, 300) },
            title: { fieldType: 'heading3', content: 'Image 1' },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column4-block-2-variant-3',
            media: { fieldType: 'image', alt: 'Second image', image: imagePlaceholder(400, 300) },
            title: { fieldType: 'heading3', content: 'Image 2' },
          },
          {
            blockType: 'defaultBlock',
            blockId: 'cms-column4-block-3-variant-3',
            media: { fieldType: 'image', alt: 'Third image', image: imagePlaceholder(400, 300) },
            title: { fieldType: 'heading3', content: 'Image 3' },
          },
        ],
      },
    ],
  },
  group: 'PageBuilder',
};
