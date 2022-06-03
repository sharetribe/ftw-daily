import React from 'react';
import { bool, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import config from '../../config';
import { injectIntl, intlShape } from '../../util/reactIntl';

import { SectionHero, SectionHowItWorks, SectionLocations } from '../../components';
import PageBuilder from '../../containers/PageBuilder/PageBuilder';

import facebookImage from '../../assets/saunatimeFacebook-1200x630.jpg';
import twitterImage from '../../assets/saunatimeTwitter-600x314.jpg';

import { ASSET_NAME } from './LandingPage.duck';
import css from './LandingPage.module.css';

export const fallbackPage = (title, description, pageSchemaForSEO, openGraphContentType) => {
  // TODO we should use default sections!
  const FallbackHero = () => (
    <div className={classNames(css.heroContainer)}>
      <SectionHero className={css.hero} />
    </div>
  );
  const FallbackExplore = () => (
    <section className={css.section}>
      <div className={css.sectionContentFirstChild}>
        <SectionLocations />
      </div>
    </section>
  );
  const FallbackHowItWorks = () => (
    <section className={css.section}>
      <div className={css.sectionContent}>
        <SectionHowItWorks />
      </div>
    </section>
  );

  return (
    <PageBuilder
      className={css.root}
      pageAssetsData={{
        sections: [
          {
            sectionType: 'custom-hero',
            sectionId: 'hero',
          },
          {
            sectionType: 'custom-explore',
            sectionId: 'explore',
          },
          {
            sectionType: 'custom-how-it-works',
            sectionId: 'how-it-works',
          },
        ],
      }}
      options={{
        sectionComponents: {
          ['custom-hero']: { component: FallbackHero },
          ['custom-explore']: { component: FallbackExplore },
          ['custom-how-it-works']: { component: FallbackHowItWorks },
        },
      }}
      contentType={openGraphContentType}
      description={description}
      title={title}
      schema={pageSchemaForSEO}
    />
  );
};

export const LandingPageComponent = props => {
  const { intl, pageAssetsData, inProgress } = props;

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  // schemaTitle is used for <title> tag in addition to page schema for SEO
  const schemaTitle = intl.formatMessage({ id: 'LandingPage.schemaTitle' }, { siteTitle });
  // schemaDescription is used for different <meta> tags in addition to page schema for SEO
  const schemaDescription = intl.formatMessage({ id: 'LandingPage.schemaDescription' });
  const schemaImage = `${config.canonicalRootURL}${facebookImage}`;
  const openGraphContentType = 'website';

  // In addition to this schema for search engines, src/components/Page/Page.js adds some extra schemas
  // Read more about schema
  // - https://schema.org/
  // - https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data
  const pageSchemaForSEO = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    description: schemaDescription,
    name: schemaTitle,
    image: [schemaImage],
  };

  // Convert kebab-case to camelCase: my-page-asset > myPageAsset
  const camelize = s => s.replace(/-(.)/g, l => l[1].toUpperCase());

  return (
    <PageBuilder
      className={css.root}
      pageAssetsData={pageAssetsData?.[camelize(ASSET_NAME)]?.data}
      fallbackPage={fallbackPage(
        schemaTitle,
        schemaDescription,
        pageSchemaForSEO,
        openGraphContentType
      )}
      inProgress={inProgress}
      contentType={openGraphContentType}
      description={schemaDescription}
      title={schemaTitle}
      facebookImages={[{ url: facebookImage, width: 1200, height: 630 }]}
      twitterImages={[
        { url: `${config.canonicalRootURL}${twitterImage}`, width: 600, height: 314 },
      ]}
      schema={pageSchemaForSEO}
    />
  );
};

LandingPageComponent.propTypes = {
  // from injectIntl
  intl: intlShape.isRequired,
  pageAssetsData: object,
  inProgress: bool,
};

const mapStateToProps = state => {
  const { pageAssetsData, inProgress } = state.hostedAssets || {};
  return { pageAssetsData, inProgress };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(
  withRouter,
  connect(mapStateToProps),
  injectIntl
)(LandingPageComponent);

export default LandingPage;
