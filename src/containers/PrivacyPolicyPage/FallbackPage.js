import React from 'react';

import PageBuilder from '../PageBuilder/PageBuilder';

// NOTE: You could add the actual Privacy Policy here as a fallback
//       instead of showing this error message.
const fallbackPrivacyPolicy = `
# An error occurred
The web app couldn\'t reach the backend to fetch the Privacy Policy page.

## Possible actions
Please refresh the page and, if that doesn't help, contact the marketplace administrators.
`;

// Create fallback content (array of sections) in page asset format:
export const fallbackSections = {
  sections: [
    {
      sectionType: 'article',
      sectionId: 'privacy',
      background: { type: 'hexColor', color: '#ffffff' },
      title: { type: 'heading1', content: 'Privacy Policy' },
      blocks: [
        {
          blockType: 'default-block',
          blockId: 'hero-content',
          text: {
            type: 'markdown',
            content: fallbackPrivacyPolicy,
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
