import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { intlShape, injectIntl } from 'react-intl';
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
  const { tab, listings, searchParams, searchListingsError, intl } = props;

  const filtersClassName = classNames(css.filters, { [css.open]: tab === 'filters' });
  const listingsClassName = classNames(css.listings, { [css.open]: tab === 'listings' });
  const mapClassName = classNames(css.map, { [css.open]: tab === 'map' });
  const currencyConfig = config.currencyConfig;

  const searchWasDone = searchParams && searchParams.address;

  const searchErrorMessage = intl.formatMessage({ id: 'SearchPage.searchError' });
  const resultsFoundMessage = intl.formatMessage(
    { id: 'SearchPage.foundResults' },
    {
      count: listings.length,
      address: searchParams && searchParams.address ? searchParams.address : '',
    }
  );
  const noResultsMessage = intl.formatMessage(
    { id: 'SearchPage.noResults' },
    {
      address: searchParams && searchParams.address ? searchParams.address : '',
    }
  );

  return (
    <PageLayout title={`Search page: ${tab}`}>
      {searchListingsError ? <p style={{ color: 'red' }}>{searchErrorMessage}</p> : null}
      {searchWasDone && listings.length > 0 ? <p>{resultsFoundMessage}</p> : null}
      {searchWasDone && listings.length === 0 ? <p>{noResultsMessage}</p> : null}
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

const { array, oneOf, object, instanceOf } = PropTypes;

SearchPageComponent.propTypes = {
  tab: oneOf(['filters', 'listings', 'map']).isRequired,
  listings: array,
  searchParams: object,
  searchListingsError: instanceOf(Error),
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { searchParams, searchListingsError, currentPageResultIds } = state.SearchPage;
  return {
    listings: getListingsById(state.data, currentPageResultIds),
    searchParams,
    searchListingsError,
  };
};

const SearchPage = connect(mapStateToProps)(injectIntl(SearchPageComponent));

SearchPage.loadData = (params, search) => {
  const queryParams = parse(search, {
    latlng: ['origin'],
    latlngBounds: ['bounds'],
  });
  return searchListings({ ...queryParams, include: ['author', 'images'] });
};

export default SearchPage;
