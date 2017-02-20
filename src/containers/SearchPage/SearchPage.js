import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { addFlashNotification } from '../../ducks/FlashNotification.duck';
import { addFilter, callFetchListings, loadListings } from './SearchPage.duck';
import css from './SearchPage.css';
import {
  FilterPanel,
  ListingCard,
  ListingCardSmall,
  MapPanel,
  PageLayout,
  SearchResultsPanel,
} from '../../components';

export class SearchPageComponent extends Component {
  componentDidMount() {
    // TODO: This should be moved to Router
    const { initialListingsLoaded } = this.props;
    if (!initialListingsLoaded) {
      this.props.onLoadListings();
    }
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
              {listings.map(l => <ListingCard key={l.id} {...l} />)}
            </SearchResultsPanel>
          </div>
          <div className={mapClassName}>
            <MapPanel>
              {listings.map(l => <ListingCardSmall key={l.id} {...l} />)}
            </MapPanel>
          </div>
        </div>
      </PageLayout>
    );
  }
}

SearchPageComponent.loadData = callFetchListings;

SearchPageComponent.defaultProps = { initialListingsLoaded: false, listings: [], tab: 'listings' };

const { array, bool, func, oneOf } = PropTypes;

SearchPageComponent.propTypes = {
  onLoadListings: func.isRequired,
  initialListingsLoaded: bool,
  listings: array,
  tab: oneOf(['filters', 'listings', 'map']).isRequired,
};

const mapStateToProps = state => ({
  initialListingsLoaded: state.SearchPage.initialListingsLoaded,
  listings: state.SearchPage.listings,
});

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onAddNotice: msg => dispatch(addFlashNotification('notice', msg)),
    onAddFilter: (k, v) => dispatch(addFilter(k, v)),
    onLoadListings: () => dispatch(loadListings.request()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageComponent);
