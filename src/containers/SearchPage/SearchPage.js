import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
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
  const { tab, listings, searchParams, searchListingsError } = props;

  const filtersClassName = classNames(css.filters, { [css.open]: tab === 'filters' });
  const listingsClassName = classNames(css.listings, { [css.open]: tab === 'listings' });
  const mapClassName = classNames(css.map, { [css.open]: tab === 'map' });

  return (
    <PageLayout title="Search page">
      {searchParams && searchParams.address
        ? <p>{`Listings near ${searchParams.address}`}</p>
        : null}
      {searchListingsError
        ? <p style={{ color: 'red' }}>Error in search: {searchListingsError.message}</p>
        : null}
      <div className={css.container}>
        <div className={filtersClassName}>
          <FilterPanel />
        </div>
        <div className={listingsClassName}>
          <SearchResultsPanel>
            {listings.map(l => <ListingCard key={l.id.uuid} listing={l} />)}
          </SearchResultsPanel>
        </div>
        <div className={mapClassName}>
          <MapPanel>
            {listings.map(l => <ListingCardSmall key={l.id.uuid} listing={l} />)}
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
};

const mapStateToProps = state => {
  const { searchParams, searchListingsError, currentPageResultIds } = state.SearchPage;
  return {
    listings: getListingsById(state.data, currentPageResultIds),
    searchParams,
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
