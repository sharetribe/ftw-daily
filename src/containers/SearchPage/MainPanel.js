import React, { Component } from 'react';
import { array, bool, func, number, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { FormattedMessage } from '../../util/reactIntl';
import { createResourceLocatorString } from '../../util/routes';
import { isAnyFilterActive } from '../../util/search';
import { propTypes } from '../../util/types';
import {
  SearchResultsPanel,
  SearchFiltersMobile,
  SearchFiltersPrimary,
  SearchFiltersSecondary,
  SortBy,
} from '../../components';

import FilterComponent from './FilterComponent';
import { validFilterParams } from './SearchPage.helpers';

import css from './SearchPage.module.css';

// Primary filters have their content in dropdown-popup.
// With this offset we move the dropdown to the left a few pixels on desktop layout.
const FILTER_DROPDOWN_OFFSET = -14;

const cleanSearchFromConflictingParams = (searchParams, sortConfig, filterConfig) => {
  // Single out filters that should disable SortBy when an active
  // keyword search sorts the listings according to relevance.
  // In those cases, sort parameter should be removed.
  const sortingFiltersActive = isAnyFilterActive(
    sortConfig.conflictingFilters,
    searchParams,
    filterConfig
  );
  return sortingFiltersActive
    ? { ...searchParams, [sortConfig.queryParamName]: null }
    : searchParams;
};

/**
 * MainPanel contains search results and filters.
 * There are 3 presentational container-components that show filters:
 * SearchfiltersMobile, SearchFiltersPrimary, and SearchFiltersSecondary.
 * The last 2 are for desktop layout.
 */
class MainPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { isSecondaryFiltersOpen: false, currentQueryParams: props.urlQueryParams };

    this.applyFilters = this.applyFilters.bind(this);
    this.cancelFilters = this.cancelFilters.bind(this);
    this.resetAll = this.resetAll.bind(this);

    this.initialValues = this.initialValues.bind(this);
    this.getHandleChangedValueFn = this.getHandleChangedValueFn.bind(this);

    // SortBy
    this.handleSortBy = this.handleSortBy.bind(this);
  }

  // Apply the filters by redirecting to SearchPage with new filters.
  applyFilters() {
    const { history, urlQueryParams, sortConfig, filterConfig } = this.props;
    const searchParams = { ...urlQueryParams, ...this.state.currentQueryParams };
    const search = cleanSearchFromConflictingParams(searchParams, sortConfig, filterConfig);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, search));
  }

  // Close the filters by clicking cancel, revert to the initial params
  cancelFilters() {
    this.setState({ currentQueryParams: {} });
  }

  // NOTE TODO right now, clicking resets everything. which is not intuitive...
  // Reset all filter query parameters
  resetAll(e) {
    const { urlQueryParams, history, filterConfig } = this.props;
    const filterQueryParamNames = filterConfig.map(f => f.queryParamNames);

    // Reset state
    this.setState({ currentQueryParams: {} });

    // Reset routing params
    const queryParams = omit(urlQueryParams, filterQueryParamNames);
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  initialValues(queryParamNames) {
    // Query parameters that are visible in the URL
    const urlQueryParams = this.props.urlQueryParams;
    // Query parameters that are in state (user might have not yet clicked "Apply")
    const currentQueryParams = this.state.currentQueryParams;

    // Get initial value for a given parameter from state if its there.
    const getInitialValue = paramName => {
      const currentQueryParam = currentQueryParams[paramName];
      const hasQueryParamInState = typeof currentQueryParam !== 'undefined';
      return hasQueryParamInState ? currentQueryParam : urlQueryParams[paramName];
    };

    // Return all the initial values related to given queryParamNames
    // InitialValues for "amenities" filter could be
    // { amenities: "has_any:towel,jacuzzi" }
    const isArray = Array.isArray(queryParamNames);
    return isArray
      ? queryParamNames.reduce((acc, paramName) => {
        return { ...acc, [paramName]: getInitialValue(paramName) };
      }, {})
      : {};
  }

  getHandleChangedValueFn(useHistoryPush) {
    const { urlQueryParams, history, sortConfig, filterConfig } = this.props;

    return (updatedURLParams, filterConfigId) => {

      const updater = prevState => {
        // Address and bounds are handled outside of MainPanel.
        // I.e. TopbarSearchForm && search by moving the map.
        // We should always trust urlQueryParams with those.
        const { address, bounds } = urlQueryParams;
        const mergedQueryParams = { ...urlQueryParams, ...prevState.currentQueryParams };
        const { price } = updatedURLParams || {};

        let selectedPrice;
        let selectedDates;

        if (price) {
          selectedPrice = typeof price === 'string' ?
            { price } :
            Object.keys(price).reduce((o, key) => ({ ...o, [`pub_${key}`]: price[key] }), {});
        } else if (price === null) {
          selectedPrice = null;
        }

        // if (dates) {
        //   selectedDates = typeof dates === 'string' ?
        //     { dates } :
        //     Object.keys(dates).reduce((o, key) => ({ ...o, [`pub_${key}`]: price[key] }), {});
        // } else if (dates === null) {
        //   selectedDates = null;
        // }

        const emptyPrices = {
          price: null,
          pub_pricePerDayFilter: null,
          pub_pricePerWeekFilter: null,
          pub_pricePerMonthFilter: null
        };
        const priceMaybe = selectedPrice || selectedPrice === null ?
          { ...emptyPrices, ...(selectedPrice || {}) } :
          {};

          // const dateMaybe = selectedDates || selectedDates === null ?
          // { ...(selectedDates || {}) } :
          // {};
          // console.log(priceMaybe, dateMaybe)

          
          const arrayN = {
            hair_and_beauty: filterConfig.find(i => i.id === 'hair_and_beauty').config.catKeys.split(','),
            wellness: filterConfig.find(i => i.id === 'wellness').config.catKeys.split(','),
            fitness: filterConfig.find(i => i.id === 'fitness').config.catKeys.split(','),
            photography_and_film: filterConfig.find(i => i.id === 'photography_and_film').config.catKeys.split(','),
            coworking: filterConfig.find(i => i.id === 'coworking').config.catKeys.split(','),
            music_and_arts: filterConfig.find(i => i.id === 'music_and_arts').config.catKeys.split(','),
            events_and_venues: filterConfig.find(i => i.id === 'events_and_venues').config.catKeys.split(','),
            kitchensand_pop_ups: filterConfig.find(i => i.id === 'kitchensand_pop_ups').config.catKeys.split(','),
          };

          const findValue = ( value ) => {
           
            let res =[];
            for( let name in arrayN ) {
                if( arrayN.hasOwnProperty( name ) ) {
                  value.forEach(e => { 
                    if(arrayN[name].includes(e) ) {

                        return res.includes(name) ? '' : res.push(name);
                    }
                  })
                }
            }
            return res;
        }
        // Since we have multiple filters with the same query param, 'pub_category'
        // we dont want to lose the prev ones, we want all of them

        const isWindowDefined = typeof window !== 'undefined';
        const isMobileLayout = isWindowDefined && window.innerWidth < 768;

        const pc = 'pub_category';

        const isCategoryCleared = updatedURLParams && pc in updatedURLParams && !updatedURLParams[pc];
        const selectedFilter = filterConfig.find(f => f.id === filterConfigId)
        const selectedFilterOptions = selectedFilter && selectedFilter.config.catKeys.split(',');

        if (pc in updatedURLParams) {
          if (!isCategoryCleared && pc in mergedQueryParams) {
            const updatedURLParamsCutted = updatedURLParams[pc].includes('has_any:') ? updatedURLParams[pc].replace('has_any:', '') : updatedURLParams[pc];
            const mergedQueryParamsCutted = mergedQueryParams[pc].includes('has_any:') ? mergedQueryParams[pc].replace('has_any:', '') : mergedQueryParams[pc];

            const up_pc = updatedURLParams[pc] ? updatedURLParamsCutted.split(',') : [];
            const mp_pc = mergedQueryParams[pc] ? mergedQueryParamsCutted.split(',') : [];
            // const up_pc = updatedURLParams[pc] ? updatedURLParams[pc].split(',') : [];
            // const mp_pc = mergedQueryParams[pc] ? mergedQueryParams[pc].split(',') : [];
            const asas = mp_pc.filter(x => !up_pc.includes(x));
            const newMp = [...new Set([...up_pc, ...mp_pc])].filter(x => !asas.includes(x));           
   
            if(findValue(mp_pc).filter(x => findValue(up_pc).includes(x)).length === 0) {
              updatedURLParams[pc] = 'has_any:' + [...new Set([...up_pc, ...mp_pc])].join(',');
            }
            else if(findValue(mp_pc).filter(x => findValue(up_pc).includes(x)).length > 0) {
              
              let difference = findValue(mp_pc).filter(x => findValue(up_pc).includes(x));
              let rer = asas.filter(x => !arrayN[difference].includes(x));

              updatedURLParams[pc] = 'has_any:' + [...new Set([...rer, ...newMp])].join(',');
            }

          } else if (isCategoryCleared) {

            const mp_pc = mergedQueryParams[pc] ? mergedQueryParams[pc].replace('has_any:', '').split(',').filter(item => !selectedFilterOptions.includes(item)) : []
            // const mp_pc = mergedQueryParams[pc] ? mergedQueryParams[pc].split(',').filter(item => !selectedFilterOptions.includes(item)) : []
            
            updatedURLParams[pc] = !!mp_pc.length ? 'has_any:' + [...new Set([...mp_pc])].join(',') : [...new Set([...mp_pc])].join(',');
                                         
          }
        }
        if (updatedURLParams[pc]?.length === 0) {
          
          delete updatedURLParams.pub_category;
        }
      
        return {
          currentQueryParams: {...updatedURLParams, ...priceMaybe, address, bounds },
        };
      };

      const callback = () => {
        if (useHistoryPush) {
          const searchParams = this.state.currentQueryParams;
          const search = cleanSearchFromConflictingParams(searchParams, sortConfig, filterConfig);
          history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, search));
        }
      };

      this.setState(updater, callback);
    };
  }

  handleSortBy(urlParam, values) {
    const { history, urlQueryParams } = this.props;
    const queryParams = values
      ? { ...urlQueryParams, [urlParam]: values }
      : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  render() {
    const {
      className,
      rootClassName,
      urlQueryParams,
      listings,
      searchInProgress,
      searchListingsError,
      searchParamsAreInSync,
      onActivateListing,
      onManageDisableScrolling,
      onOpenModal,
      onCloseModal,
      onMapIconClick,
      pagination,
      searchParamsForPagination,
      showAsModalMaxWidth,
      filterConfig,
      sortConfig,
      h1,
      mainCategoriesImages,
      subCategoriesImages,
      onOpenCategoryFilter,
      onCloseCategoryFilter,
      isCategoryFilterOpen
    } = this.props;

    const primaryFilters = filterConfig.filter(f => f.group === 'primary');
    const secondaryFilters = filterConfig.filter(f => f.group !== 'primary');
    const hasSecondaryFilters = !!(secondaryFilters && secondaryFilters.length > 0);

    // Selected aka active filters
    const selectedFilters = validFilterParams(urlQueryParams, filterConfig);
    const selectedFiltersCount = Object.keys(selectedFilters).length;

    // Selected aka active secondary filters
    const selectedSecondaryFilters = hasSecondaryFilters
      ? validFilterParams(urlQueryParams, secondaryFilters)
      : {};
    const selectedSecondaryFiltersCount = Object.keys(selectedSecondaryFilters).length;

    const isSecondaryFiltersOpen = !!hasSecondaryFilters && this.state.isSecondaryFiltersOpen;
    const propsForSecondaryFiltersToggle = hasSecondaryFilters
      ? {
        isSecondaryFiltersOpen: this.state.isSecondaryFiltersOpen,
        toggleSecondaryFiltersOpen: isOpen => {
          this.setState({ isSecondaryFiltersOpen: isOpen });
        },
        selectedSecondaryFiltersCount,
      }
      : {};

    const hasPaginationInfo = !!pagination && pagination.totalItems != null;
    const totalItems = searchParamsAreInSync && hasPaginationInfo ? pagination.totalItems : 0;
    const listingsAreLoaded = !searchInProgress && searchParamsAreInSync && hasPaginationInfo;

    const sortBy = mode => {
      const conflictingFilterActive = isAnyFilterActive(
        sortConfig.conflictingFilters,
        urlQueryParams,
        filterConfig
      );

      const mobileClassesMaybe =
        mode === 'mobile'
          ? {
            rootClassName: css.sortBy,
            menuLabelRootClassName: css.sortByMenuLabel,
          }
          : {};
      return sortConfig.active ? (
        <SortBy
          {...mobileClassesMaybe}
          sort={urlQueryParams[sortConfig.queryParamName]}
          isConflictingFilterActive={!!conflictingFilterActive}
          onSelect={this.handleSortBy}
          showAsPopup
          contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
        />
      ) : null;
    };

    const classes = classNames(rootClassName || css.searchResultContainer, className);
    const isCategoryFilterEnabled = searchParamsForPagination && !!searchParamsForPagination.pub_category;
    
    return (
      <div className={classes}>
        <h1 className={css.h1}>{h1}</h1>
        <SearchFiltersMobile
          className={css.searchFiltersMobile}
          urlQueryParams={urlQueryParams}
          sortByComponent={sortBy('mobile')}
          listingsAreLoaded={listingsAreLoaded}
          resultsCount={totalItems}
          searchInProgress={searchInProgress}
          searchListingsError={searchListingsError}
          showAsModalMaxWidth={showAsModalMaxWidth}
          onMapIconClick={onMapIconClick}
          onManageDisableScrolling={onManageDisableScrolling}
          onOpenModal={onOpenModal}
          onCloseModal={onCloseModal}
          resetAll={this.resetAll}
          selectedFiltersCount={selectedFiltersCount}
          subCategoriesImages={subCategoriesImages}
        >
          {filterConfig.map(config => {
            return (
              <FilterComponent
                key={`SearchFiltersMobile.${config.id}`}
                idPrefix="SearchFiltersMobile"
                filterConfig={config}
                urlQueryParams={urlQueryParams}
                initialValues={this.initialValues}
                getHandleChangedValueFn={this.getHandleChangedValueFn}
                liveEdit
                showAsPopup={false}
                subCategoriesImages={subCategoriesImages}
                onOpenCategoryFilter={onOpenCategoryFilter}
              />
            );
          })}
        </SearchFiltersMobile>
        <SearchFiltersPrimary
          className={css.searchFiltersPrimary}
          sortByComponent={sortBy('desktop')}
          listingsAreLoaded={listingsAreLoaded}
          resultsCount={totalItems}
          searchInProgress={searchInProgress}
          searchListingsError={searchListingsError}
          mainCategoriesImages={mainCategoriesImages}
          subCategoriesImages={subCategoriesImages}
          isCategoryFilterOpen={isCategoryFilterOpen}
          onOpenCategoryFilter={onOpenCategoryFilter}
          onCloseCategoryFilter={onCloseCategoryFilter}
          isCategoryFilterEnabled={isCategoryFilterEnabled}
          {...propsForSecondaryFiltersToggle}
        >
          {primaryFilters.map(config => {
            return (
              <FilterComponent
                key={`SearchFiltersPrimary.${config.id}`}
                idPrefix="SearchFiltersPrimary"
                filterConfig={config}
                urlQueryParams={urlQueryParams}
                initialValues={this.initialValues}
                getHandleChangedValueFn={this.getHandleChangedValueFn}
                showAsPopup
                contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
                isCategory={!!config.config.isCategory}
                mainCategoriesImages={mainCategoriesImages}
                subCategoriesImages={subCategoriesImages}
                onOpenCategoryFilter={onOpenCategoryFilter}
                isCategoryFilterEnabled={isCategoryFilterEnabled}
              />
            );
          })}
        </SearchFiltersPrimary>
        {isSecondaryFiltersOpen ? (
          <div className={classNames(css.searchFiltersPanel)}>
            <SearchFiltersSecondary
              urlQueryParams={urlQueryParams}
              listingsAreLoaded={listingsAreLoaded}
              applyFilters={this.applyFilters}
              cancelFilters={this.cancelFilters}
              resetAll={this.resetAll}
              onClosePanel={() => this.setState({ isSecondaryFiltersOpen: false })}
            >
              {secondaryFilters.map(config => {
                return (
                  <FilterComponent
                    key={`SearchFiltersSecondary.${config.id}`}
                    idPrefix="SearchFiltersSecondary"
                    filterConfig={config}
                    urlQueryParams={urlQueryParams}
                    initialValues={this.initialValues}
                    getHandleChangedValueFn={this.getHandleChangedValueFn}
                    showAsPopup={false}
                  />
                );
              })}
            </SearchFiltersSecondary>
          </div>
        ) : (
          <div
            className={classNames(css.listings, {
              [css.newSearchInProgress]: !listingsAreLoaded,
            })}
          >
            {searchListingsError ? (
              <h2 className={css.error}>
                <FormattedMessage id="SearchPage.searchError" />
              </h2>
            ) : null}
            <SearchResultsPanel
              className={css.searchListingsPanel}
              listings={listings}
              pagination={listingsAreLoaded ? pagination : null}
              search={searchParamsForPagination}
              setActiveListing={onActivateListing}
            />
          </div>
        )}
      </div>
    );
  }
}

MainPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listings: [],
  resultsCount: 0,
  pagination: null,
  searchParamsForPagination: {},
  filterConfig: config.custom.filters,
  sortConfig: config.custom.sortConfig,
};

MainPanel.propTypes = {
  className: string,
  rootClassName: string,
  h1: string,
  urlQueryParams: object.isRequired,
  listings: array,
  searchInProgress: bool.isRequired,
  searchListingsError: propTypes.error,
  searchParamsAreInSync: bool.isRequired,
  onActivateListing: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onOpenModal: func.isRequired,
  onCloseModal: func.isRequired,
  onMapIconClick: func.isRequired,
  pagination: propTypes.pagination,
  searchParamsForPagination: object,
  showAsModalMaxWidth: number.isRequired,
  filterConfig: propTypes.filterConfig,
  sortConfig: propTypes.sortConfig,

  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default MainPanel;
