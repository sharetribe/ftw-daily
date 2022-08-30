import React from 'react';
import { bool, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import config from '../../config';
import { injectIntl, intlShape } from '../../util/reactIntl';

import { H1 } from '../PageBuilder/Primitives/Heading';
import PageBuilder, { SectionBuilder } from '../../containers/PageBuilder/PageBuilder';

import FallbackPage, { fallBackSections } from './FallbackPage';
import { ASSET_NAME } from './TermsOfServicePage.duck';
import css from './TermsOfServicePage.module.css';

// This "content-only" component can be used in modals etc.
const TermsOfServiceContent = props => {
  const { inProgress, error, data } = props;

  if (inProgress) {
    return null;
  }

  // We don't want to add h1 heading twice to the HTML (SEO issue).
  // Modal's header is mapped as h2
  const hasContent = data => typeof data?.content === 'string';
  const exposeContentAsChildren = data => {
    return hasContent(data) ? { children: data.content } : {};
  };
  const CustomHeading1 = props => <H1 as="h2" {...props} />;

  const hasData = error === null && data;
  const sectionsData = hasData ? data : fallBackSections;

  return (
    <SectionBuilder
      {...sectionsData}
      options={{
        fieldComponents: {
          heading1: { component: CustomHeading1, pickValidProps: exposeContentAsChildren },
        },
        isInsideContainer: true,
      }}
    />
  );
};

// Presentational component for TermsOfServicePage
const TermsOfServicePageComponent = props => {
  const { intl, pageAssetsData, inProgress } = props;

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  // schemaTitle is used for <title> tag in addition to page schema for SEO
  const schemaTitle = intl.formatMessage({ id: 'TermsOfServicePage.schemaTitle' }, { siteTitle });
  // schemaDescription is used for different <meta> tags in addition to page schema for SEO
  const schemaDescription = intl.formatMessage({ id: 'TermsOfServicePage.schemaDescription' });
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

  // Convert kebab-case to camelCase: my-page-asset > myPageAsset
  const camelize = s => s.replace(/-(.)/g, l => l[1].toUpperCase());

  return (
    <PageBuilder
      className={css.root}
      pageAssetsData={pageAssetsData?.[camelize(ASSET_NAME)]?.data}
      fallbackPage={
        <FallbackPage
          title={schemaTitle}
          schemaTitle={schemaTitle}
          schemaDescription={schemaDescription}
          pageSchemaForSEO={pageSchemaForSEO}
          openGraphContentType={openGraphContentType}
        />
      }
      inProgress={inProgress}
      contentType={openGraphContentType}
      description={schemaDescription}
      title={schemaTitle}
      schema={pageSchemaForSEO}
    />
  );
};

TermsOfServicePageComponent.propTypes = {
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
const TermsOfServicePage = compose(
  withRouter,
  connect(mapStateToProps),
  injectIntl
)(TermsOfServicePageComponent);

export { ASSET_NAME as TOS_ASSET_NAME, TermsOfServicePageComponent, TermsOfServiceContent };

export default TermsOfServicePage;
