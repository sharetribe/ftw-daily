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
import { ASSET_NAME } from './TermsOfServicePage.duck';

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

// Presentational component for TermsOfServicePage
const TermsOfServicePageComponent = props => {
  const { pageAssetsData, inProgress } = props;

  return (
    <PageBuilder
      pageAssetsData={pageAssetsData?.[camelize(ASSET_NAME)]?.data}
      inProgress={inProgress}
      fallbackPage={<FallbackPage />}
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

const TOS_ASSET_NAME = ASSET_NAME;
export { TOS_ASSET_NAME, TermsOfServicePageComponent, TermsOfServiceContent };

export default TermsOfServicePage;
