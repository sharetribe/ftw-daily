import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { types } from '../../util/sdkLoader';
import { searchListings, getListingsById } from '../../ducks/sdk.duck';
import {
  FilterPanel,
  ListingCard,
  ListingCardSmall,
  MapPanel,
  PageLayout,
  SearchResultsPanel,
} from '../../components';

import css from './SearchPage.css';

const { LatLng } = types;

export class SearchPageComponent extends Component {
  componentDidMount() {
    SearchPageComponent.loadData(this.props.dispatch);
  }

  render() {
    const { tab, listings } = this.props;

    const filtersClassName = classNames(css.filters, { [css.open]: tab === 'filters' });
    const listingsClassName = classNames(css.listings, { [css.open]: tab === 'listings' });
    const mapClassName = classNames(css.map, { [css.open]: tab === 'map' });

    return (
      <PageLayout title="Search page">
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
  }
}

SearchPageComponent.loadData = dispatch => {
  dispatch(searchListings({ origin: new LatLng(40, 70), include: ['author', 'images'] }));
};

SearchPageComponent.defaultProps = { initialListingsLoaded: false, listings: [], tab: 'listings' };

const { array, func, oneOf } = PropTypes;

SearchPageComponent.propTypes = {
  listings: array,
  tab: oneOf(['filters', 'listings', 'map']).isRequired,
  dispatch: func.isRequired,
};

const mapStateToProps = state => {
  const listingIds = state.data.searchPageResults;
  return { listings: getListingsById(state.data, listingIds) };
};

export default connect(mapStateToProps)(SearchPageComponent);
