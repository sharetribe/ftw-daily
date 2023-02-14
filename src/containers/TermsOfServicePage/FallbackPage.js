import React from 'react';

import PageBuilder from '../PageBuilder/PageBuilder';

// NOTE: You could add the actual Terms of Service here as a fallback
//       instead of showing this error message.
const fallbackTerms = `
# An error occurred
The web app couldn\'t reach the backend to fetch the Term of Service page.

## Possible actions
Please refresh the page and, if that doesn't help, contact the marketplace administrators.
`;

// Create fallback content (array of sections) in page asset format:
export const fallbackSections = {
  sections: [
    {
      sectionType: 'article',
      sectionId: 'terms',
      appearance: { fieldType: 'customAppearance', backgroundColor: '#ffffff' },
      title: { fieldType: 'heading1', content: 'Terms of Service' },
      blocks: [
        {
          blockType: 'defaultBlock',
          blockId: 'hero-content',
          text: {
            fieldType: 'markdown',
            content: fallbackTerms,
          },
        },
      ],
    },
  ],
  meta: {
    pageTitle: {
      fieldType: 'metaTitle',
      content: 'Terms of service page',
    },
    pageDescription: {
      fieldType: 'metaDescription',
      content: 'Terms of service fetch failed',
    },
  },
};

// This is the fallback page, in case there's no Terms of Service asset defined in Console.
const FallbackPage = props => {
  return <PageBuilder pageAssetsData={fallbackSections} {...props} />;
};

export default FallbackPage;
