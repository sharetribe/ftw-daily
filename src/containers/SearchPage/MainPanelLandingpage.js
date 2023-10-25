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
  Button,
  NamedLink,
  SearchFiltersPrimary,
  SortBy,
} from '../../components';

import FilterComponent from './FilterComponent';
import { validFilterParams } from './SearchPage.helpers';

import css from './SearchPage.module.css';
import { TopbarSearchForm } from '../../forms';

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
 * MainPanelLandingPage contains search results and filters.
 * There are 3 presentational container-components that show filters:
 * SearchfiltersMobile, SearchFiltersPrimary, and SearchFiltersSecondary.
 * The last 2 are for desktop layout.
 */
class MainPanelLandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isSecondaryFiltersOpen: false, currentQueryParams: props.urlQueryParams ,isplain:false};

    this.handleSubmit = this.handleSubmit.bind(this);

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


    return updatedURLParams => {
      const updater = prevState => {
        const { address, bounds } = urlQueryParams;
        const mergedQueryParams = { ...urlQueryParams, ...prevState.currentQueryParams };

        // Address and bounds are handled outside of MainPanelLandingPage.
        // I.e. TopbarSearchForm && search by moving the map.
        // We should always trust urlQueryParams with those.
        return {
          currentQueryParams: { ...mergedQueryParams, ...updatedURLParams, address, bounds },
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

  handleSubmit(values) {
    const { currentSearchParams } = this.props;
    const { search, selectedPlace } = values.location;
    const { history } = this.props;
    const { origin, bounds } = selectedPlace;
    const originMaybe = config.sortSearchByDistance ? { origin } : {};
    const searchParams = {
      ...currentSearchParams,
      ...originMaybe,
      address: search,
      bounds,
    };
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));
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
      searchInProgress,
      searchListingsError,
      searchParamsAreInSync,
      history,
      pagination,
      initialSearchFormValues,
      filterConfig,
      sortConfig,
      onSearchSubmit,
      isSelect,
      isDateSelect,
    } = this.props;

    const landingfilter = filterConfig.filter(e => e.id != "petInHome" && e.id != "housingConditions" && e.id !='policeCheck')

    const primaryFilters = landingfilter.filter((f) => {
      let checked = true;
      if (f.id == "sizeOfdogs") {
        checked = false;
        if (this.state.currentQueryParams && this.state.currentQueryParams.pub_typeOfPets && this.state.currentQueryParams.pub_typeOfPets.search("dog") > -1) {
          checked = true;
        }

      }
      //  else if (f.id == "dates") {
      //   checked = false;
      //   if (this.state.currentQueryParams && this.state.currentQueryParams.pub_serviceSetup && this.state.currentQueryParams.pub_serviceSetup.search("overnightsStay") > -1) {
      //     checked = true;
      //   }
      // }

      else if (this.state.currentQueryParams && this.state.currentQueryParams.pub_serviceSetup && this.state.currentQueryParams.pub_serviceSetup.search("dayCareStay") > -1) {
        if (f.id == "typeOfPets") {
          f.config.options = [{
            key: 'dog',
            label: 'Dog',
          }];
        }
      } else if (f.id == "typeOfPets") {
        f.config.options = [{
          key: 'dog',
          label: 'Dog',
        },
        {
          key: 'cat',
          label: 'Cat',
        }];
      }
      return f.group === 'primary' && checked;
    });
    
    const secondaryFilters = landingfilter.filter(f => f.group !== 'primary');
    const hasSecondaryFilters = !!(secondaryFilters && secondaryFilters.length > 0);

    // Selected aka active filters
    const selectedFilters = validFilterParams(urlQueryParams, landingfilter);
    const selectedFiltersCount = Object.keys(selectedFilters).length;

    // Selected aka active secondary filters
    const selectedSecondaryFilters = hasSecondaryFilters
      ? validFilterParams(urlQueryParams, secondaryFilters)
      : {};
    const selectedSecondaryFiltersCount = Object.keys(selectedSecondaryFilters).length;

    // const isSecondaryFiltersOpen = !!hasSecondaryFilters && this.state.isSecondaryFiltersOpen;
    // const propsForSecondaryFiltersToggle = hasSecondaryFilters
    //   ? {
    //       isSecondaryFiltersOpen: this.state.isSecondaryFiltersOpen,
    //       toggleSecondaryFiltersOpen: isOpen => {
    //         this.setState({ isSecondaryFiltersOpen: isOpen });
    //       },
    //       selectedSecondaryFiltersCount,
    //     }
    //   : {};

    const hasPaginationInfo = !!pagination && pagination.totalItems != null;
    const totalItems = searchParamsAreInSync && hasPaginationInfo ? pagination.totalItems : 0;
    const listingsAreLoaded = !searchInProgress && searchParamsAreInSync && hasPaginationInfo;

    const sortBy = mode => {
      const conflictingFilterActive = isAnyFilterActive(
        sortConfig.conflictingFilters,
        urlQueryParams,
        landingfilter
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

    return (
      <div className={classes}>
        <SearchFiltersPrimary
          className={css.searchFiltersPrimary}
          // sortByComponent={sortBy('desktop')}
          listingsAreLoaded={listingsAreLoaded}
          resultsCount={totalItems}
          pageName="LandingPage"
          searchInProgress={searchInProgress}
          searchListingsError={searchListingsError}
        // {...propsForSecondaryFiltersToggle}
        >
          {primaryFilters.map(config => {
            return (
              <FilterComponent
                key={`SearchFiltersPrimary.${config.id}`}
                idPrefix="SearchFiltersPrimary"
                pageName="LandingPage"
                isSelect={isSelect}
                isplain={true}
                isDateSelect={isDateSelect}
                filterConfig={config}
                urlQueryParams={urlQueryParams}
                initialValues={this.initialValues}
                getHandleChangedValueFn={(e) => this.setState({ currentQueryParams: { ...this.state.currentQueryParams, ...e } })}
                contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
              />
            );
          })}
        </SearchFiltersPrimary>
        <TopbarSearchForm
          className={css.searchLink}
          desktopInputRoot={css.topbarSearchWithLeftPadding}
          onSubmit={(e) => { this.setState({ currentQueryParams: { ...this.state.currentQueryParams, ...e } }) }}
          initialValues={initialSearchFormValues}
        />
        <div className={css.bottomButton}>
          <Button
            onClick={() => {
              if (this.state.currentQueryParams.location) {
                const { currentSearchParams } = this.props;
                const { search, selectedPlace } = this.state.currentQueryParams.location;

                const { history } = this.props;
                const { origin, bounds } = selectedPlace;
                const originMaybe = config.sortSearchByDistance ? { origin } : {};
                const searchParams = {
                  ...this.state.currentQueryParams,
                  ...currentSearchParams,
                  ...originMaybe,
                  address: search,
                  bounds,
                };

                history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));
              } else {

                history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, this.state.currentQueryParams))
              }

            }}
          >
            Search
          </Button>
        </div>
      </div>
    );
  }
}

MainPanelLandingPage.defaultProps = {
  className: null,
  rootClassName: null,
  listings: [],
  resultsCount: 0,
  pagination: null,
  searchParamsForPagination: {},
  filterConfig: config.custom.filters,
  sortConfig: config.custom.sortConfig,
  initialSearchFormValues: {},
};

MainPanelLandingPage.propTypes = {
  className: string,
  rootClassName: string,

  urlQueryParams: object.isRequired,
  listings: array,
  searchInProgress: bool.isRequired,
  searchListingsError: propTypes.error,
  // searchParamsAreInSync: bool.isRequired,
  // onActivateListing: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  // onOpenModal: func.isRequired,
  // onCloseModal: func.isRequired,
  // onMapIconClick: func.isRequired,
  // pagination: propTypes.pagination,
  // onSearchSubmit: func.isRequired,
  initialSearchFormValues: object,
  searchParamsForPagination: object,
  // showAsModalMaxWidth: number.isRequired,
  filterConfig: propTypes.filterConfig,
  sortConfig: propTypes.sortConfig,

  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default MainPanelLandingPage;

