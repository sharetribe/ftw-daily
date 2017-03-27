import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import config from '../../config';
import { parse } from '../../util/urlHelpers';
import { getListingsById } from '../../ducks/sdk.duck';
import {
  FilterPanel,
  ListingCard,
  ListingCardSmall,
  MapPanel,
  PageLayout,
  SearchResultsPanel,
} from '../../components';
import { searchListings } from './SearchPage.duck';

import css from './SearchPage.css';

export const SearchPageComponent = props => {
  const { tab, listings, searchParams, searchInProgress, searchListingsError } = props;

  const filtersClassName = classNames(css.filters, { [css.open]: tab === 'filters' });
  const listingsClassName = classNames(css.listings, { [css.open]: tab === 'listings' });
  const mapClassName = classNames(css.map, { [css.open]: tab === 'map' });
  const currencyConfig = config.currencyConfig;

  const searchWasDone = !searchInProgress && searchParams && searchParams.address;

  const searchError = (
    <p style={{ color: 'red' }}>
      <FormattedMessage id="SearchPage.searchError" />
    </p>
  );

  const resultsFound = (
    <p>
      <FormattedMessage id="SearchPage.foundResults" values={{ count: listings.length }} />
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

  return (
    <PageLayout title={`Search page: ${tab}`}>
      {searchListingsError ? searchError : null}
      {searchWasDone && listings.length > 0 ? resultsFound : null}
      {searchWasDone && listings.length === 0 ? noResults : null}
      {searchInProgress ? loadingResults : null}
      <div className={css.container}>
        <div className={filtersClassName}>
          <FilterPanel />
        </div>
        <div className={listingsClassName}>
          <SearchResultsPanel>
            {listings.map(l => (
              <ListingCard key={l.id.uuid} listing={l} currencyConfig={currencyConfig} />
            ))}
          </SearchResultsPanel>
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
  searchParams: {},
  searchListingsError: null,
};

const { array, oneOf, object, instanceOf, bool } = PropTypes;

SearchPageComponent.propTypes = {
  tab: oneOf(['filters', 'listings', 'map']).isRequired,
  listings: array,
  searchParams: object,
  searchInProgress: bool.isRequired,
  searchListingsError: instanceOf(Error),
};

const mapStateToProps = state => {
  const {
    searchParams,
    searchInProgress,
    searchListingsError,
    currentPageResultIds,
  } = state.SearchPage;
  return {
    listings: getListingsById(state.data, currentPageResultIds),
    searchParams,
    searchInProgress,
    searchListingsError,
  };
};

const SearchPage = connect(mapStateToProps)(SearchPageComponent);

SearchPage.loadData = (params, search) => {
  const queryParams = parse(search, {
    latlng: ['origin'],
    latlngBounds: ['bounds'],
  });
  return searchListings({ ...queryParams, include: ['author', 'images'] });
};

export default SearchPage;
