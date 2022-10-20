import React from 'react';

import PageBuilder from '../PageBuilder/PageBuilder';

// Create fallback content (array of sections) in page asset format:
export const fallbackSections = {
  sections: [
    {
      sectionType: 'features',
      sectionId: 'hero',
      background: { type: 'customBackground', color: '#ffff00' },
      // backgroundImage: {
      //   type: 'image',
      //   alt: 'Background image',
      //   image: {
      //     id: 'image',
      //     type: 'imageAsset',
      //     attributes: {
      //       variants: {
      //         square1x: {
      //           url: `https://picsum.photos/400/400`,
      //           width: 400,
      //           height: 400,
      //         },
      //         square2x: {
      //           url: `https://picsum.photos/800/800`,
      //           width: 800,
      //           height: 800,
      //         },
      //       },
      //     },
      //   },
      // },
      blocks: [
        {
          blockType: 'defaultBlock',
          blockId: 'hero-content',
          media: {
            type: 'image',
            alt: 'First image',
            image: {
              id: 'image',
              type: 'imageAsset',
              attributes: {
                variants: {
                  square1x: {
                    url: `https://picsum.photos/400/400`,
                    width: 400,
                    height: 400,
                  },
                  square2x: {
                    url: `https://picsum.photos/800/800`,
                    width: 800,
                    height: 800,
                  },
                },
              },
            },
          },
          title: { type: 'heading1', content: 'My marketplace' },
          text: {
            type: 'markdown',
            content:
              '### My unique marketplace for booking listings\n### You can also list your services here!',
          },
          callToAction: {
            type: 'internalButtonLink',
            href: '/s',
            label: 'Browse marketplace',
          },
        },
      ],
    },
  ],
};

// This is the fallback page, in case there's no Privacy Policy asset defined in Console.
const FallbackPage = props => {
  const { title, description, schema, contentType } = props;
  return (
    <PageBuilder
      pageAssetsData={fallbackSections}
      title={title}
      description={description}
      schema={schema}
      contentType={contentType}
    />
  );
};

export default FallbackPage;
