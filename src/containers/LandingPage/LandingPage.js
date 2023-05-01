import React from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { camelize } from '../../util/string';
import { propTypes } from '../../util/types';

import PageBuilder from '../../containers/PageBuilder/PageBuilder';

import FallbackPage from './FallbackPage';
import { ASSET_NAME } from './LandingPage.duck';
import config from '../../config';
import { withRouter } from 'react-router-dom';

export const LandingPageComponent = props => {
  const { pageAssetsData, inProgress, error, sortConfig,
    filterConfig, currentPageResultIds,
    pagination,
    searchInProgress,
    searchListingsError,
    searchParams,
    searchMapListingIds,
    activeListingId,
    location, history } = props;

  return (
    <PageBuilder
      pageAssetsData={pageAssetsData?.[camelize(ASSET_NAME)]?.data}
      inProgress={inProgress}
      history={history}
      filterConfig={filterConfig}
      sortConfig={sortConfig}
      currentPageResultIds={currentPageResultIds}
      pagination={pagination}
      searchInProgress={searchInProgress}
      searchListingsError={searchListingsError}
      searchParams={searchParams}
      location={location}
      searchMapListingIds={searchMapListingIds}
      activeListingId={activeListingId}
      error={error}
      fallbackPage={<FallbackPage error={error} />}
      options={{
        filterConfig: filterConfig,
        currentPageResultIds: currentPageResultIds,
        pagination: pagination,
        searchInProgress: searchInProgress,
        searchListingsError: searchListingsError,
        searchParams: searchParams,
        searchMapListingIds: searchMapListingIds,
        activeListingId: activeListingId,
        location: location,
        history: history
      }}
    />
  );
};

LandingPageComponent.defaultProps = {

  filterConfig: config.custom.filters,
  sortConfig: config.custom.sortConfig,

};


LandingPageComponent.propTypes = {
  pageAssetsData: object,
  inProgress: bool,
  filterConfig: propTypes.filterConfig,
  error: propTypes.error,
  location: shape({
    search: string.isRequired,
  }).isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => {
  const { pageAssetsData, inProgress, error } = state.hostedAssets || {};
  const {
    currentPageResultIds,
    pagination,
    searchInProgress,
    searchListingsError,
    searchParams,
    searchMapListingIds,
    activeListingId,
  } = state.SearchPage;
  return {
    pageAssetsData, inProgress, error, currentPageResultIds,
    pagination,
    searchInProgress,
    searchListingsError,
    searchParams,
    searchMapListingIds,
    activeListingId,
  };
};

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(withRouter, connect(mapStateToProps))(LandingPageComponent);

export default LandingPage;
