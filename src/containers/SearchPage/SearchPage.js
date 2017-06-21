import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from '../../config';
import { parse, stringify } from '../../util/urlHelpers';
import * as propTypes from '../../util/propTypes';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { PageLayout, SearchResultsPanel } from '../../components';
import { searchListings } from './SearchPage.duck';
import css from './SearchPage.css';

// TODO Pagination page size might need to be dynamic on responsive page layouts
const RESULT_PAGE_SIZE = 12;

const pickSearchParamsOnly = params => {
  const { address, origin, bounds } = params || {};
  return { address, origin, bounds };
};

export const SearchPageComponent = props => {
  const {
    listings,
    location,
    pagination,
    searchInProgress,
    searchListingsError,
    searchParams,
    tab,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const { page, ...searchInURL } = parse(location.search, {
    latlng: ['origin'],
    latlngBounds: ['bounds'],
  });

  // Page transition might initially use values from previous search
  const searchParamsInURL = stringify(pickSearchParamsOnly(searchInURL));
  const searchParamsInProps = stringify(pickSearchParamsOnly(searchParams));
  const searchParamsMatch = searchParamsInURL === searchParamsInProps;

  const hasPaginationInfo = !!pagination && pagination.totalItems != null;
  const totalItems = searchParamsMatch && hasPaginationInfo ? pagination.totalItems : 0;
  const listingsAreLoaded = !searchInProgress && searchParamsMatch && hasPaginationInfo;

  const searchError = (
    <p style={{ color: 'red' }}>
      <FormattedMessage id="SearchPage.searchError" />
    </p>
  );

  const resultsFoundNoAddress = (
    <h3>
      <FormattedMessage id="SearchPage.foundResults" values={{ count: totalItems }} />
    </h3>
  );
  const address = searchInURL && searchInURL.address
    ? <span className={css.searchString}>{searchInURL.address.split(', ')[0]}</span>
    : null;
  const resultsFoundWithAddress = (
    <h3>
      <FormattedMessage id="SearchPage.foundResultsWithAddress" values={{ count: totalItems, address }} />
    </h3>
  );
  const resultsFound = address ? resultsFoundWithAddress : resultsFoundNoAddress;

  const noResults = (
    <h3>
      <FormattedMessage id="SearchPage.noResults" />
    </h3>
  );

  const loadingResults = (
    <h3>
      <FormattedMessage id="SearchPage.loadingResults" />
    </h3>
  );

  const searchParamsForPagination = parse(location.search);

  return (
    <PageLayout title={`Search page: ${tab}`}>
      <div className={css.searchResultSummary}>
        {searchListingsError ? searchError : null}
        {listingsAreLoaded && totalItems > 0 ? resultsFound : null}
        {listingsAreLoaded && totalItems === 0 ? noResults : null}
        {searchInProgress ? loadingResults : null}
      </div>
      <div className={css.container}>
        <div className={css.listings}>
          <SearchResultsPanel
            currencyConfig={config.currencyConfig}
            listings={listingsAreLoaded ? listings : []}
            pagination={listingsAreLoaded ? pagination : null}
            search={searchParamsForPagination}
          />
        </div>
      </div>
    </PageLayout>
  );
};

SearchPageComponent.defaultProps = {
  tab: 'listings',
  listings: [],
  pagination: null,
  searchParams: {},
  searchListingsError: null,
};

const { array, bool, instanceOf, oneOf, object, shape, string } = PropTypes;

SearchPageComponent.propTypes = {
  listings: array,
  location: shape({
    search: string.isRequired,
  }).isRequired,
  pagination: propTypes.pagination,

  searchParams: object,
  searchInProgress: bool.isRequired,
  searchListingsError: instanceOf(Error),
  tab: oneOf(['filters', 'listings', 'map']).isRequired,
};

const mapStateToProps = state => {
  const {
    currentPageResultIds,
    pagination,
    searchInProgress,
    searchListingsError,
    searchParams,
  } = state.SearchPage;
  return {
    listings: getListingsById(state, currentPageResultIds),
    pagination,
    searchInProgress,
    searchListingsError,
    searchParams,
  };
};

const SearchPage = connect(mapStateToProps)(withRouter(SearchPageComponent));

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
