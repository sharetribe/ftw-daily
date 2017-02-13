import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { includes } from 'lodash';
import * as realSdk from 'sharetribe-sdk';
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

/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

console.log(realSdk);
const { LatLng } = realSdk.types;

/**
   Take `included` values from the JSON API response
   and transforms it to a map which provide easy and fast lookup.

   Example:

   ```
   const included = [
     { id: new UUID(123), type: 'user', attributes: { name: "John" }},
     { id: new UUID(234), type: 'user', attributes: { name: "Jane" }},
   ];

   const map = lookupMap(included)
   #=> returns
   # {
   #   user: {
   #     123: { id: 123, type: 'user', attributes: { name: "John" }},
   #     234: { id: 234, type: 'user', attributes: { name: "Jane" }},
   #   }
   # }

   map.user.123
   #=> returns
   # { id: 123, type: 'user', attributes: { name: "John" }},

   ```
 */
const lookupMap = included => included.reduce((memo, resource) => {
  const { type, id } = resource;

  memo[type] = memo[type] || {};
  memo[type][id.uuid] = resource;

  return memo;
}, {});

export class SearchPageComponent extends Component {
  componentDidMount() {
    // TODO: This should be moved to Router
    const { SearchPage } = this.props;
    if (!SearchPage.initialListingsLoaded) {
      this.props.onLoadListings();
    }

    const realSdkInstance = realSdk.createInstance({
      baseUrl: 'http://localhost:8088',
      clientId: '08ec69f6-d37e-414d-83eb-324e94afddf0',
    });

    realSdkInstance.listings
      .search({ origin: new LatLng(40.00, -70.00), include: ['author'] })
      .then(res => {
        const includedMap = lookupMap(res.data.included);
        console.log('***');
        console.log(`*** Fetched ${res.data.data.length} listings`);
        console.log('***');
        res.data.data.forEach(listing => {
          const l = listing.attributes;
          const authorLink = listing.relationships.author.data;
          const author = includedMap[authorLink.type][authorLink.id.uuid];
          const a = author.attributes;

          console.log('');
          console.log(`# ${l.title}`);
          console.log('');
          console.log(l.description);
          console.log('');
          console.log(`Address: ${l.address} (${l.geolocation.lat}, ${l.geolocation.lng})`);
          console.log('');
          console.log(`Author: ${a.profile.firstName} ${a.profile.lastName} (${a.email})`);
        });
      });
  }

  render() {
    const { tab, SearchPage } = this.props;
    const { listings } = SearchPage;
    const fakeListings = listings || [];
    const selectedTab = includes(['filters','listings', 'map'], tab)
      ? tab
      : 'listings';

    const filtersClassName = classNames(css.filters, {
      [css.open]: selectedTab === 'filters',
    });
    const listingsClassName = classNames(css.listings, {
      [css.open]: selectedTab === 'listings',
    });
    const mapClassName = classNames(css.map, {
      [css.open]: selectedTab === 'map',
    });

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
