import React from 'react';
import { bool, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import config from '../../config';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { camelize } from '../../util/string';

import { H1 } from '../PageBuilder/Primitives/Heading';
import PageBuilder, { SectionBuilder } from '../../containers/PageBuilder/PageBuilder';

import FallbackPage, { fallbackSections } from './FallbackPage';
import { ASSET_NAME } from './PrivacyPolicyPage.duck';

// This "content-only" component can be used in modals etc.
const PrivacyPolicyContent = props => {
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
  const sectionsData = hasData ? data : fallbackSections;

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

// Presentational component for PrivacyPolicyPage
const PrivacyPolicyPageComponent = props => {
  const { intl, pageAssetsData, inProgress } = props;

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  // schemaTitle is used for <title> tag in addition to page schema for SEO
  const schemaTitle = intl.formatMessage({ id: 'PrivacyPolicyPage.schemaTitle' }, { siteTitle });
  // schemaDescription is used for different <meta> tags in addition to page schema for SEO
  const schemaDescription = intl.formatMessage({ id: 'PrivacyPolicyPage.schemaDescription' });
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
    />
  );
};

PrivacyPolicyPageComponent.propTypes = {
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
const PrivacyPolicyPage = compose(
  withRouter,
  connect(mapStateToProps),
  injectIntl
)(PrivacyPolicyPageComponent);

export {
  ASSET_NAME as PRIVACY_POLICY_ASSET_NAME,
  PrivacyPolicyPageComponent,
  PrivacyPolicyContent,
};

export default PrivacyPolicyPage;
