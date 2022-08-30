import React from 'react';

import PageBuilder from '../PageBuilder/PageBuilder';

import css from './TermsOfServicePage.module.css';

const fallbackTerms = `
This is the fallback content for the Terms of service page. The web app couldn't reach the actual
Term of Service content. Please refresh the page and, if that doesn't help, contact the marketplace
administrators.

## 1 Lorem ipsum dolor sit amet

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## 2 Sed ut perspiciatis unde
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?

## 3 At vero eos et accusamus
At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam
libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut
et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a
sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis
doloribus asperiores repellat.

_Last updated: August 30, 2022_
`;

// Create fallback content (array of sections) in page asset format:
export const fallBackSections = {
  sections: [
    {
      sectionType: 'article',
      sectionId: 'terms',
      background: { type: 'hexColor', color: '#ffffff' },
      title: { type: 'heading1', content: 'Terms of Service' },
      blocks: [
        {
          blockType: 'default-block',
          blockId: 'hero-content',
          text: {
            type: 'markdown',
            content: fallbackTerms,
          },
        },
      ],
    },
  ],
};

// This is the fallback page, in case there's no Terms of Service asset defined in Console.
const FallbackPage = props => {
  const { title, description, pageSchemaForSEO, openGraphContentType } = props;
  return (
    <PageBuilder
      className={css.root}
      pageAssetsData={fallBackSections}
      contentType={openGraphContentType}
      description={description}
      title={title}
      schema={pageSchemaForSEO}
    />
  );
};

export default FallbackPage;
