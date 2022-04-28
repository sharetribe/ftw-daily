import React from 'react';
import { bool, func, node, number, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { OutsideClickHandler, IconCloseCustom } from '../../components';

import css from './SearchFiltersPrimary.module.css';
import { Classnames } from 'react-alice-carousel';

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
    onOpenCategoryFilter,
    onCloseCategoryFilter,
    isCategoryFilterOpen,
    isCategoryFilterEnabled
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
        id="SearchFiltersPrimary.moreFiltersButtonWithOutCounter"
        // id="SearchFiltersPrimary.moreFiltersButton"
        // values={{ count: selectedSecondaryFiltersCount }}
      />
    </button>
  ) : null;

  const nonCategoryChildren = children.filter(c => !c.props.isCategory);
  const categoryChildren = children.filter(c => c.props.isCategory);
  const categoriesText = (
    <div className={css.catTxtDiv}>
      <span className={css.catTxtSpan}>
        <FormattedMessage id="SearchFiltersPrimary.categories" />
      </span>
    </div>
  );

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

        <div className={css.filters}>
          <OutsideClickHandler onOutsideClick={isCategoryFilterOpen && onOpenCategoryFilter || onCloseCategoryFilter}>
            <button className={classNames(css.searchFiltersPanelClosed, { [css.active]: isCategoryFilterEnabled })} onClick={onOpenCategoryFilter}>
              <FormattedMessage id="SearchFiltersPrimary.categoriesBtn" />
            </button>
            {isCategoryFilterOpen && (
              <div className={css.categoryItemsWrapper}>
                <div className={css.categoryItems}>
                  <h3 className={css.categoryItemsTitle}>
                    <FormattedMessage id="SearchFiltersPrimary.categories" />
                    <div onClick={onCloseCategoryFilter}>
                      <IconCloseCustom />
                    </div>
                  </h3>

                  <div className={css.categoryItemsHolder}>
                    {categoryChildren.map((category, i) => {
                      return (
                        <React.Fragment key={`category-${i}`}>
                          {category}
                        </React.Fragment>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </OutsideClickHandler>
        </div>

        {nonCategoryChildren}
        {toggleSecondaryFiltersOpenButton}
        {sortByComponent}
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
