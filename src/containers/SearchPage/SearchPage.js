import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { includes } from 'lodash';
import { addFlashNotification } from '../../ducks/FlashNotification.ducks';
import { addFilter } from './SearchPage.ducks';
import css from './SearchPage.css';
import {
  FilterPanel,
  ListingCard,
  ListingCardSmall,
  MapPanel,
  PageLayout,
  SearchResultsPanel,
} from '../../components';

const fakeListings = [
  {
    id: 123,
    title: 'Banyan Studios',
    price: '55\u20AC / day',
    description: 'Organic Music Production in a Sustainable, Ethical and Professional Studio.',
    location: 'New York, NY \u2022 40mi away',
    review: { count: '8 reviews', rating: '4' },
    author: {
      name: 'The Stardust Collective',
      avatar: 'http://placehold.it/44x44',
      review: { rating: '4' },
    },
  },
  {
    id: 1234,
    title: 'Pienix Studio',
    price: '80\u20AC day',
    description: 'Pienix Studio specializes in music mixing and mastering production.',
    location: 'New York, NY \u2022 6mi away',
    review: { count: '7 reviews', rating: '4' },
    author: { name: 'Juhan', avatar: 'http://placehold.it/44x44', review: { rating: '4' } },
  },
];

export const SearchPageComponent = props => {
  const { tab } = props;
  const selectedTab = includes(['filters','listings', 'map'], tab)
    ? tab
    : 'listings';

  const filtersClassName = classNames(css.filters, {
    [css.open]: selectedTab === 'filters',
  });
  const listingsClassName = classNames(css.filters, {
    [css.open]: selectedTab === 'listings',
  });
  const mapClassName = classNames(css.filters, {
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
};

SearchPageComponent.defaultProps = { tab: 'listings' };

const { string } = PropTypes;

SearchPageComponent.propTypes = { tab: string };

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPageComponent);
