import React from 'react';
import { bool, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import NotFoundPage from '../../containers/NotFoundPage/NotFoundPage';
import PageBuilder from '../../containers/PageBuilder/PageBuilder';

export const CMSPageComponent = props => {
  const { params, pageAssetsData, inProgress, error } = props;
  const pageId = params.pageId;

  if (!inProgress && error?.status === 404) {
    return <NotFoundPage />;
  }

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format

  ////////////////////////////////////////////////////////////////
  // TODO title and description should come from hosted assets. //
  ////////////////////////////////////////////////////////////////

  // schemaTitle is used for <title> tag in addition to page schema for SEO
  const schemaTitle = 'CMS page';
  // schemaDescription is used for different <meta> tags in addition to page schema for SEO
  const schemaDescription = 'CMS page';
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
  };

  return (
    <PageBuilder
      pageAssetsData={pageAssetsData?.[pageId]?.data}
      inProgress={inProgress}
      contentType={openGraphContentType}
      description={schemaDescription}
      title={schemaTitle}
      schema={pageSchemaForSEO}
    />
  );
};

CMSPageComponent.propTypes = {
  pageAssetsData: object,
  inProgress: bool,
};

const mapStateToProps = state => {
  const { pageAssetsData, inProgress, error } = state.hostedAssets || {};
  return { pageAssetsData, inProgress, error };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const CMSPage = compose(
  withRouter,
  connect(mapStateToProps)
)(CMSPageComponent);

export default CMSPage;
