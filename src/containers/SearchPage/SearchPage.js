import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from '../../config';
import { createResourceLocatorString } from '../../util/routes';
import { parse, stringify } from '../../util/urlHelpers';
import * as propTypes from '../../util/propTypes';
import { getListingsById } from '../../ducks/sdk.duck';
import {
  FilterPanel,
  ListingCardSmall,
  MapPanel,
  PageLayout,
  SearchResultsPanel,
} from '../../components';
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
    flattenedRoutes,
    listings,
    location,
    pagination,
    history,
    searchInProgress,
    searchListingsError,
    searchParams,
    tab,
  } = props;

  const filtersClassName = classNames(css.filters, { [css.open]: tab === 'filters' });
  const listingsClassName = classNames(css.listings, { [css.open]: tab === 'listings' });
  const mapClassName = classNames(css.map, { [css.open]: tab === 'map' });
  const currencyConfig = config.currencyConfig;

  // Page is parsed from url
  const { page = 1, ...searchInURL } = parse(location.search, {
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

  const resultsFound = (
    <p>
      <FormattedMessage id="SearchPage.foundResults" values={{ count: totalItems }} />
    </p>
  );

  const noResults = (
    <p>
      <FormattedMessage id="SearchPage.noResults" />
    </p>
  );

  const loadingResults = (
    <p>
      <FormattedMessage id="SearchPage.loadingResults" />
    </p>
  );

  const { address, origin, bounds } = searchParamsInURL;
  const hasNext = listingsAreLoaded && page < pagination.totalPages;
  const onNextPage = hasNext
    ? () => {
        const urlParams = { address, origin, bounds, page: page + 1 };
        history.push(createResourceLocatorString('SearchPage', flattenedRoutes, {}, urlParams));
      }
    : null;

  const hasPrev = listingsAreLoaded && page > 1;
  const onPreviousPage = hasPrev
    ? () => {
        const urlParams = { address, origin, bounds, page: page - 1 };
        history.push(createResourceLocatorString('SearchPage', flattenedRoutes, {}, urlParams));
      }
    : null;

  return (
    <PageLayout title={`Search page: ${tab}`}>
      {searchListingsError ? searchError : null}
      {listingsAreLoaded && totalItems > 0 ? resultsFound : null}
      {listingsAreLoaded && totalItems === 0 ? noResults : null}
      {searchInProgress ? loadingResults : null}
      <div className={css.container}>
        <div className={filtersClassName}>
          <FilterPanel />
        </div>
        <div className={listingsClassName}>
          <SearchResultsPanel
            currencyConfig={currencyConfig}
            listings={listingsAreLoaded ? listings : []}
            onNextPage={onNextPage}
            onPreviousPage={onPreviousPage}
          />
        </div>
        <div className={mapClassName}>
          <MapPanel>
            {listings.map(l => (
              <ListingCardSmall key={l.id.uuid} listing={l} currencyConfig={currencyConfig} />
            ))}
          </MapPanel>
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

const { array, arrayOf, bool, func, instanceOf, number, oneOf, object, shape, string } = PropTypes;

SearchPageComponent.propTypes = {
  flattenedRoutes: arrayOf(propTypes.route).isRequired,
  listings: array,
  location: shape({
    search: string.isRequired,
  }).isRequired,
  pagination: shape({
    page: number.isRequired,
    perPage: number,
    totalItems: number,
    totalPages: number.isRequired,
  }),

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,

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
    listings: getListingsById(state.data, currentPageResultIds),
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
