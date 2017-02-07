import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { includes } from 'lodash';
import { addFlashNotification } from '../../ducks/FlashNotification.ducks';
import { addFilter, callFetchListings, loadListings } from './SearchPage.ducks';
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
    const { SearchPage } = this.props;
    if (!SearchPage.initialListingsLoaded) {
      this.props.onLoadListings();
    }
  }

  render() {
    const { tab, SearchPage } = this.props;
    const { listings } = SearchPage;
    const fakeListings = listings || [];
    const selectedTab = includes(['filters', 'listings', 'map'], tab) ? tab : 'listings';

    const filtersClassName = classNames(css.filters, { [css.open]: selectedTab === 'filters' });
    const listingsClassName = classNames(css.listings, { [css.open]: selectedTab === 'listings' });
    const mapClassName = classNames(css.map, { [css.open]: selectedTab === 'map' });

    return (
      <PageLayout title="Search page">
        <div className={css.container}>
          <div className={filtersClassName}>
            <FilterPanel />
          </div>
          <div className={listingsClassName}>
            <SearchResultsPanel>
              {fakeListings.map(l => <ListingCard key={l.id} {...l} />)}
            </SearchResultsPanel>
          </div>
          <div className={mapClassName}>
            <MapPanel>
              {fakeListings.map(l => <ListingCardSmall key={l.id} {...l} />)}
            </MapPanel>
          </div>
        </div>
      </PageLayout>
    );
  }
}

SearchPageComponent.loadData = callFetchListings;

SearchPageComponent.defaultProps = { SearchPage: {}, tab: 'listings' };

const { array, bool, func, shape, string } = PropTypes;

SearchPageComponent.propTypes = {
  onLoadListings: func.isRequired,
  SearchPage: shape({
    filters: array,
    initialListingsLoaded: bool,
    listings: array,
    loadingListings: bool,
  }),
  tab: string,
};

/**
 * Container functions.
 * Since we add this to global store state with combineReducers, this will only get partial state
 * which is page specific.
 */
const mapStateToProps = function mapStateToProps(state) {
  return state;
};

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onAddNotice: msg => dispatch(addFlashNotification('notice', msg)),
    onAddFilter: (k, v) => dispatch(addFilter(k, v)),
    onLoadListings: () => dispatch(loadListings.request()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageComponent);
