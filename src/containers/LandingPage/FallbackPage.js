import React from 'react';
import PageBuilder from '../PageBuilder/PageBuilder';
import css from './FallbackPage.module.css';

// Create fallback content (array of sections) in page asset format:
export const fallbackSections = {
  sections: [
    {
      sectionType: 'customMaintenance',
      sectionId: 'maintenance-mode',
    },
  ],
};

const SectionMaintenanceMode = props => {
  const { sectionId } = props;

  return (
    <section id={sectionId} className={css.root}>
      <div className={css.content}>
        <h1>Maintenance mode</h1>
        <p>
          The marketplace is not fully operational at the moment. Try refreshing the page and if
          that does not solve the issue, contact the marketplace admins.
        </p>
      </div>
    </section>
  );
};

// This is the fallback page, in case there's no Landing Page asset defined in Console.
const FallbackPage = props => {
  const { title, description, schema, contentType } = props;
  return (
    <PageBuilder
      pageAssetsData={fallbackSections}
      options={{
        sectionComponents: {
          customMaintenance: { component: SectionMaintenanceMode },
        },
      }}
      title={title}
      description={description}
      schema={schema}
      contentType={contentType}
    />
  );
};

export default FallbackPage;
