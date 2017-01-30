import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { find } from 'lodash';
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

const tabClasses = [
  { name: 'filters', css: css.filters },
  { name: 'listings', css: css.listings },
  { name: 'map', css: css.map },
];

const findTab = forTabType => {
  const foundTab = find(tabClasses, c => c.name === forTabType);
  if (!foundTab) {
    return find(tabClasses, c => c.name === 'listings');
  }
  return foundTab;
};

const combinedClasses = (forTabType, currentTab) => {
  const foundTab = findTab(forTabType);
  const shouldOpenDefault = !currentTab && foundTab.name === 'listings';

  if (foundTab.name === currentTab || shouldOpenDefault) {
    return classNames(foundTab.css, css.open);
  }

  return foundTab.css;
};

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
  return (
    <PageLayout title="Search page">
      <div className={css.container}>
        <div className={combinedClasses('filters', tab)}>
          <FilterPanel />
        </div>
        <div className={combinedClasses('listings', tab)}>
          <SearchResultsPanel>
            {fakeListings.map(l => <ListingCard key={l.id} {...l} />)}
          </SearchResultsPanel>
        </div>
        <div className={combinedClasses('map', tab)}>
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
