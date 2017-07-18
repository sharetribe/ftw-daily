import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { unionWith } from 'lodash';
import config from '../../config';
import { parse, stringify } from '../../util/urlHelpers';
import * as propTypes from '../../util/propTypes';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { SearchMap, ModalInMobile, PageLayout, SearchResultsPanel, Topbar } from '../../components';
import { searchListings, searchMapListings } from './SearchPage.duck';
import css from './SearchPage.css';

// TODO Pagination page size might need to be dynamic on responsive page layouts
const RESULT_PAGE_SIZE = 12;
const SHARETRIBE_API_MAX_PAGE_SIZE = 100;
const MAX_SEARCH_RESULT_PAGES_ON_MAP = 5;
// 100 * 5 = 500 listings are shown on a map.

const pickSearchParamsOnly = params => {
  const { address, origin, bounds } = params || {};
  return { address, origin, bounds };
};

export class SearchPageComponent extends Component {
  componentDidMount() {
    const { location, onSearchMapListings } = this.props;
    const searchInURL = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });
    const perPage = SHARETRIBE_API_MAX_PAGE_SIZE;
    const page = 1;
    const searchParamsForMapResults = { ...searchInURL, page, perPage };

    // Search more listings
    onSearchMapListings(searchParamsForMapResults)
      .then(response => {
        const hasNextPage = page < response.data.meta.totalPages &&
          page < MAX_SEARCH_RESULT_PAGES_ON_MAP;
        if (hasNextPage) {
          onSearchMapListings({ ...searchParamsForMapResults, page: page + 1 });
        }
      })
      .catch(error => {
        // In case of error, stop recursive loop and report error.
        // eslint-disable-next-line no-console
        console.error(`An error (${error} occured while trying to retrieve map listings`);
      });
  }

  render() {
    const {
      authInfoError,
      authInProgress,
      currentUser,
      currentUserHasListings,
      history,
      isAuthenticated,
      listings,
      location,
      logoutError,
      mapListings,
      notificationCount,
      onLogout,
      onManageDisableScrolling,
      pagination,
      scrollingDisabled,
      searchInProgress,
      searchListingsError,
      searchParams,
      tab,
    } = this.props;

    // eslint-disable-next-line no-unused-vars
    const { page, ...searchInURL } = parse(location.search, {
      latlng: ['origin'],
      latlngBounds: ['bounds'],
    });

    // Page transition might initially use values from previous search
    const searchParamsInURL = stringify(pickSearchParamsOnly(searchInURL));
    const searchParamsInProps = stringify(pickSearchParamsOnly(searchParams));
    const searchParamsMatch = searchParamsInURL === searchParamsInProps;

    const { address, bounds, origin } = searchInURL || {};

    const hasPaginationInfo = !!pagination && pagination.totalItems != null;
    const totalItems = searchParamsMatch && hasPaginationInfo ? pagination.totalItems : 0;
    const listingsAreLoaded = !searchInProgress && searchParamsMatch && hasPaginationInfo;

    const searchError = (
      <h2 className={css.error}>
        <FormattedMessage id="SearchPage.searchError" />
      </h2>
    );

    const resultsFoundNoAddress = (
      <h2>
        <FormattedMessage id="SearchPage.foundResults" values={{ count: totalItems }} />
      </h2>
    );
    const addressNode = address
      ? <span className={css.searchString}>{searchInURL.address.split(', ')[0]}</span>
      : null;
    const resultsFoundWithAddress = (
      <h2>
        <FormattedMessage
          id="SearchPage.foundResultsWithAddress"
          values={{ count: totalItems, address: addressNode }}
        />
      </h2>
    );
    const resultsFound = address ? resultsFoundWithAddress : resultsFoundNoAddress;

    const noResults = (
      <h2>
        <FormattedMessage id="SearchPage.noResults" />
      </h2>
    );

    const loadingResults = (
      <h2>
        <FormattedMessage id="SearchPage.loadingResults" />
      </h2>
    );

    const searchParamsForPagination = parse(location.search);

    return (
      <PageLayout
        authInfoError={authInfoError}
        logoutError={logoutError}
        title={`Search page: ${tab}`}
        scrollingDisabled={scrollingDisabled}
      >
        <Topbar
          className={css.topbar}
          isAuthenticated={isAuthenticated}
          authInProgress={authInProgress}
          currentUser={currentUser}
          currentUserHasListings={currentUserHasListings}
          notificationCount={notificationCount}
          history={history}
          location={location}
          onLogout={onLogout}
          onManageDisableScrolling={onManageDisableScrolling}
        />
        <div className={css.container}>
          <div className={css.searchResultContainer}>
            <div className={css.searchResultSummary}>
              {searchListingsError ? searchError : null}
              {listingsAreLoaded && totalItems > 0 ? resultsFound : null}
              {listingsAreLoaded && totalItems === 0 ? noResults : null}
              {searchInProgress ? loadingResults : null}
            </div>
            <div className={css.listings}>
              <SearchResultsPanel
                className={css.searchListingsPanel}
                currencyConfig={config.currencyConfig}
                listings={listingsAreLoaded ? listings : []}
                pagination={listingsAreLoaded ? pagination : null}
                search={searchParamsForPagination}
              />
            </div>
          </div>
          <ModalInMobile
            className={css.mapPanel}
            id="SearchPage.map"
            isModalOpenOnMobile={false}
            onManageDisableScrolling={onManageDisableScrolling}
          >
            <div className={css.map}>
              <SearchMap bounds={bounds} center={origin} listings={mapListings || []} />
            </div>
          </ModalInMobile>
        </div>
      </PageLayout>
    );
  }
}

SearchPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  listings: [],
  logoutError: null,
  mapListings: [],
  notificationCount: 0,
  pagination: null,
  searchListingsError: null,
  searchParams: {},
  tab: 'listings',
};

const { array, bool, func, instanceOf, number, oneOf, object, shape, string } = PropTypes;

SearchPageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  isAuthenticated: bool.isRequired,
  listings: array,
  mapListings: array,
  logoutError: instanceOf(Error),
  notificationCount: number,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onSearchMapListings: func.isRequired,
  pagination: propTypes.pagination,
  scrollingDisabled: bool.isRequired,
  searchInProgress: bool.isRequired,
  searchListingsError: instanceOf(Error),
  searchParams: object,
  tab: oneOf(['filters', 'listings', 'map']).isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => {
  const {
    currentPageResultIds,
    pagination,
    searchInProgress,
    searchListingsError,
    searchParams,
    searchMapListingIds,
  } = state.SearchPage;
  const { authInfoError, isAuthenticated, logoutError } = state.Auth;
  const {
    currentUser,
    currentUserHasListings,
    currentUserNotificationCount: notificationCount,
  } = state.user;
  const pageListings = getListingsById(state, currentPageResultIds);
  const mapListings = getListingsById(
    state,
    unionWith(currentPageResultIds, searchMapListingIds, (id1, id2) => id1.uuid === id2.uuid)
  );

  return {
    authInfoError,
    logoutError,
    listings: pageListings,
    mapListings,
    pagination,
    searchInProgress,
    searchListingsError,
    searchParams,
    scrollingDisabled: isScrollingDisabled(state),
    isAuthenticated,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    notificationCount,
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onSearchMapListings: searchParams => dispatch(searchMapListings(searchParams)),
});

const SearchPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(
  SearchPageComponent
);

SearchPage.loadData = (params, search) => {
  const queryParams = parse(search, {
    latlng: ['origin'],
    latlngBounds: ['bounds'],
  });
  const page = queryParams.page || 1;
  return searchListings({
    ...queryParams,
    page,
    perPage: RESULT_PAGE_SIZE,
    include: ['author', 'images'],
  });
};

export default SearchPage;
