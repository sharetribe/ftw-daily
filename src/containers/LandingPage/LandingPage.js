import React from 'react';
import { bool, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { injectIntl, intlShape } from '../../util/reactIntl';
import { camelize } from '../../util/string';

import PageBuilder from '../../containers/PageBuilder/PageBuilder';

import FallbackPage from './FallbackPage';
import { ASSET_NAME } from './LandingPage.duck';

export const LandingPageComponent = props => {
  const { pageAssetsData, inProgress } = props;

  return (
    <PageBuilder
      pageAssetsData={pageAssetsData?.[camelize(ASSET_NAME)]?.data}
      inProgress={inProgress}
      fallbackPage={<FallbackPage />}
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
