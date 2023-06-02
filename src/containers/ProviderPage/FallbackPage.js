import React from 'react';

import PageBuilder from '../PageBuilder/PageBuilder';

// NOTE: You could add the actual Privacy Policy here as a fallback
//       instead of showing this error message.
const fallbackProviderPage = `
# Es ist ein Fehler aufgetreten
Die Webanwendung konnte das Backend nicht erreichen, um die Seite mit den Anbieterinformationen abzurufen.

## Mögliche Maßnahmen
Bitte aktualisieren Sie die Seite und wenden Sie sich an die Marktplatz-Administratoren, falls dies nicht hilft.
`;

// Create fallback content (array of sections) in page asset format:
export const fallbackSections = {
  sections: [
    {
      sectionType: 'article',
      sectionId: 'provider-page',
      appearance: { fieldType: 'customAppearance', backgroundColor: '#ffffff' },
      title: { fieldType: 'heading1', content: 'Provider Page' },
      blocks: [
        {
          blockType: 'defaultBlock',
          blockId: 'hero-content',
          text: {
            fieldType: 'markdown',
            content: fallbackProviderPage,
          },
        },
      ],
    },
  ],
  meta: {
    pageTitle: {
      fieldType: 'metaTitle',
      content: 'Privacy policy page',
    },
    pageDescription: {
      fieldType: 'metaDescription',
      content: 'Privacy policy fetch failed',
    },
  },
};

// This is the fallback page, in case there's no Privacy Policy asset defined in Console.
const FallbackPage = props => {
  return <PageBuilder pageAssetsData={fallbackSections} {...props} />;
};

export default FallbackPage;