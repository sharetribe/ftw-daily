import React from 'react';
import { bool, func, node, number, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import css from './SearchFiltersPrimary.module.css';

const SearchFiltersPrimaryComponent = props => {
  const {
    rootClassName,
    className,
    children,
    sortByComponent,
    listingsAreLoaded,
    resultsCount,
    searchInProgress,
    isSecondaryFiltersOpen,
    toggleSecondaryFiltersOpen,
    selectedSecondaryFiltersCount,
  } = props;

  const hasNoResult = listingsAreLoaded && resultsCount === 0;
  const classes = classNames(rootClassName || css.root, className);

  const toggleSecondaryFiltersOpenButtonClasses =
    isSecondaryFiltersOpen || selectedSecondaryFiltersCount > 0
      ? css.searchFiltersPanelOpen
      : css.searchFiltersPanelClosed;
  const toggleSecondaryFiltersOpenButton = toggleSecondaryFiltersOpen ? (
    <button
      className={toggleSecondaryFiltersOpenButtonClasses}
      onClick={() => {
        toggleSecondaryFiltersOpen(!isSecondaryFiltersOpen);
      }}
    >
      <FormattedMessage
        id="SearchFiltersPrimary.moreFiltersButton"
        values={{ count: selectedSecondaryFiltersCount }}
      />
    </button>
  ) : null;

  return (
    <div className={classes}>
      <div className={css.searchOptions}>
        {listingsAreLoaded ? (
          <div className={css.searchResultSummary}>
            <span className={css.resultsFound}>
              <FormattedMessage
                id="SearchFiltersPrimary.foundResults"
                values={{ count: resultsCount }}
              />
            </span>
          </div>
        ) : null}
        {sortByComponent}
      </div>

      <div className={css.filters}>
        {children}
        {toggleSecondaryFiltersOpenButton}
      </div>

      {hasNoResult ? (
        <div className={css.noSearchResults}>
          <FormattedMessage id="SearchFiltersPrimary.noResults" />
        </div>
      ) : null}

      {searchInProgress ? (
        <div className={css.loadingResults}>
          <FormattedMessage id="SearchFiltersPrimary.loadingResults" />
        </div>
      ) : null}
    </div>
  );
};

SearchFiltersPrimaryComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchInProgress: false,
  isSecondaryFiltersOpen: false,
  toggleSecondaryFiltersOpen: null,
  selectedSecondaryFiltersCount: 0,
  sortByComponent: null,
};

SearchFiltersPrimaryComponent.propTypes = {
  rootClassName: string,
  className: string,
  listingsAreLoaded: bool.isRequired,
  resultsCount: number,
  searchInProgress: bool,
  isSecondaryFiltersOpen: bool,
  toggleSecondaryFiltersOpen: func,
  selectedSecondaryFiltersCount: number,
  sortByComponent: node,
};

const SearchFiltersPrimary = SearchFiltersPrimaryComponent;

export default SearchFiltersPrimary;
