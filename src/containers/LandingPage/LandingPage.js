import React from 'react';
import { bool, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import config from '../../config';
import { injectIntl, intlShape } from '../../util/reactIntl';

import PageBuilder from '../../containers/PageBuilder/PageBuilder';

import facebookImage from '../../assets/saunatimeFacebook-1200x630.jpg';
import twitterImage from '../../assets/saunatimeTwitter-600x314.jpg';

import FallbackPage from './FallbackPage';
import { ASSET_NAME } from './LandingPage.duck';

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
      pageAssetsData={pageAssetsData?.[camelize(ASSET_NAME)]?.data}
      title={schemaTitle}
      description={schemaDescription}
      schema={pageSchemaForSEO}
      contentType={openGraphContentType}
      inProgress={inProgress}
      fallbackPage={
        <FallbackPage
          title={schemaTitle}
          description={schemaDescription}
          schema={pageSchemaForSEO}
          contentType={openGraphContentType}
        />
      }
      facebookImages={[{ url: facebookImage, width: 1200, height: 630 }]}
      twitterImages={[
        { url: `${config.canonicalRootURL}${twitterImage}`, width: 600, height: 314 },
      ]}
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
