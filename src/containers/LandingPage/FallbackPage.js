import React from 'react';
import PageBuilder from '../PageBuilder/PageBuilder';
import css from './FallbackPage.module.css';

// Create fallback content (array of sections) in page asset format:
export const fallbackSections = error => ({
  sections: [
    {
      sectionType: 'customMaintenance',
      sectionId: 'maintenance-mode',
      // pass possible error to SectionMaintenanceMode component
      error,
    },
  ],
  meta: {
    pageTitle: {
      fieldType: 'metaTitle',
      content: 'Home page',
    },
    pageDescription: {
      fieldType: 'metaDescription',
      content: 'Home page fetch failed',
    },
  },
});

// Note: this microcopy/translation does not come from translation file.
//       It needs to be something that is not part of fetched assets but built-in text
const SectionMaintenanceMode = props => {
  const { sectionId, error } = props;
  // 404 means that the landing-page asset was not found from the expected asset path
  // which is defined in config.js
  const is404 = error?.status === 404;

  return (
    <section id={sectionId} className={css.root}>
      {is404 ? (
        <div className={css.content}>
          <h2>Maintenance mode</h2>
          <p>
            The marketplace is not fully operational at the moment.
            <br />
            Try refreshing the page and if that does not solve the issue, contact the marketplace
            admins.
          </p>
        </div>
      ) : (
        <div className={css.content}>
          <h2>Oops, something went wrong!</h2>
          <p>{error?.message}</p>
        </div>
      )}
    </section>
  );
};

// This is the fallback page, in case there's no Landing Page asset defined in Console.
const FallbackPage = props => {
  const { error, ...rest } = props;
  return (
    <PageBuilder
      pageAssetsData={fallbackSections(error)}
      options={{
        sectionComponents: {
          customMaintenance: { component: SectionMaintenanceMode },
        },
      }}
      {...rest}
    />
  );
};

export default FallbackPage;
