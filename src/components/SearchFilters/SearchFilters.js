import React, { useState } from 'react';
import { compose } from 'redux';
import { object, string, bool, number, func, shape } from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import omit from 'lodash/omit';

import {
  BookingDateRangeFilter,
  SelectSingleFilter,
  SelectMultipleFilter,
  PriceFilter,
} from '../../components';
import routeConfiguration from '../../routeConfiguration';
import { parseDateFromISO8601, stringifyDateToISO8601 } from '../../util/dates';
import { createResourceLocatorString } from '../../util/routes';
import { propTypes } from '../../util/types';
import css from './SearchFilters.css';

// Dropdown container can have a positional offset (in pixels)
const FILTER_DROPDOWN_OFFSET = -14;
const RADIX = 10;

// resolve initial value for a single value filter
const initialValue = (queryParams, paramName) => {
  return queryParams[paramName];
};

// resolve initial values for a multi value filter
const initialValues = (queryParams, paramName) => {
  return !!queryParams[paramName] ? queryParams[paramName].split(',') : [];
};

const initialPriceRangeValue = (queryParams, paramName) => {
  const price = queryParams[paramName];
  const valuesFromParams = !!price ? price.split(',').map(v => Number.parseInt(v, RADIX)) : [];

  return !!price && valuesFromParams.length === 2
    ? {
      minPrice: valuesFromParams[0],
      maxPrice: valuesFromParams[1],
    }
    : null;
};

const initialDateRangeValue = (queryParams, paramName) => {
  const dates = queryParams[paramName];
  const rawValuesFromParams = !!dates ? dates.split(',') : [];
  const valuesFromParams = rawValuesFromParams.map(v => parseDateFromISO8601(v));
  const initialValues =
    !!dates && valuesFromParams.length === 2
      ? {
        dates: { startDate: valuesFromParams[0], endDate: valuesFromParams[1] },
      }
      : { dates: null };

  return initialValues;
};

const SearchFiltersComponent = props => {
  const [isSitter, setSitter] = useState(false);

  const {
    rootClassName,
    className,
    urlQueryParams,
    listingsAreLoaded,
    resultsCount,
    searchInProgress,
    categoryFilter,
    amenitiesFilter,
    priceFilter,
    dateRangeFilter,
    isSearchFiltersPanelOpen,
    toggleSearchFiltersPanel,
    searchFiltersPanelSelectedCount,
    history,
    intl,
    isService,
    setAsService,
    removeAsService,
  } = props;

  const hasNoResult = listingsAreLoaded && resultsCount === 0;
  const classes = classNames(rootClassName || css.root, { [css.longInfo]: hasNoResult }, className);

  const categoryLabel = intl.formatMessage({
    id: 'SearchFilters.categoryLabel',
  });

  const amenitiesLabel = intl.formatMessage({
    id: 'SearchFilters.amenitiesLabel',
  });

  const initialAmenities = amenitiesFilter
    ? initialValues(urlQueryParams, amenitiesFilter.paramName)
    : null;

  const initialCategory = categoryFilter
    ? initialValue(urlQueryParams, categoryFilter.paramName)
    : null;

  const initialServices = initialValues(urlQueryParams, 'pub_service');

  const initialSitterType = initialValue(urlQueryParams, 'pub_sittertype');


  const initialFoodType = initialValue(urlQueryParams, 'pub_foodtype');

  const initialPriceRange = priceFilter
    ? initialPriceRangeValue(urlQueryParams, priceFilter.paramName)
    : null;

  const initialDateRange = dateRangeFilter
    ? initialDateRangeValue(urlQueryParams, dateRangeFilter.paramName)
    : null;

  const handleSelectOptions = (urlParam, options) => {
    const queryParams =
      options && options.length > 0
        ? { ...urlQueryParams, [urlParam]: options.join(',') }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const handleSelectOption = (urlParam, option) => {
    console.log(urlParam, option);
    // query parameters after selecting the option
    // if no option is passed, clear the selection for the filter
    const queryParams = option
      ? { ...urlQueryParams, [urlParam]: option }
      : omit(urlQueryParams, urlParam);

    if (urlParam == 'pub_user_type') {
      if (option != 2) {
        if (option == 0) {
          delete queryParams.pub_sittertype;
        }
        delete queryParams.pub_service;
        delete queryParams.pub_foodtype;
        removeAsService();
      } else {
        delete queryParams.dates;
        delete queryParams.pub_sittertype;
        setAsService();
      }
    }



    if (urlParam == 'pub_service') {
      if (option != 'food') {
        delete queryParams.pub_foodtype;
      }
    }


    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const handlePrice = (urlParam, range) => {
    const { minPrice, maxPrice } = range || {};
    const queryParams =
      minPrice != null && maxPrice != null
        ? { ...urlQueryParams, [urlParam]: `${minPrice},${maxPrice}` }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const handleDateRange = (urlParam, dateRange) => {
    const hasDates = dateRange && dateRange.dates;
    const { startDate, endDate } = hasDates ? dateRange.dates : {};

    const start = startDate ? stringifyDateToISO8601(startDate) : null;
    const end = endDate ? stringifyDateToISO8601(endDate) : null;

    const queryParams =
      start != null && end != null
        ? { ...urlQueryParams, [urlParam]: `${start},${end}` }
        : omit(urlQueryParams, urlParam);
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const categoryFilterElement = categoryFilter ? (
    <SelectSingleFilter
      urlParam={categoryFilter.paramName}
      label={categoryLabel}
      onSelect={handleSelectOption}
      showAsPopup
      options={categoryFilter.options}
      initialValue={initialCategory}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const amenitiesFilterElement = amenitiesFilter ? (
    <SelectMultipleFilter
      id={'SearchFilters.amenitiesFilter'}
      name="amenities"
      urlParam={amenitiesFilter.paramName}
      label={amenitiesLabel}
      onSubmit={handleSelectOptions}
      showAsPopup
      options={amenitiesFilter.options}
      initialValues={initialAmenities}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const priceFilterElement = priceFilter ? (
    <PriceFilter
      id="SearchFilters.priceFilter"
      urlParam={priceFilter.paramName}
      onSubmit={handlePrice}
      showAsPopup
      {...priceFilter.config}
      initialValues={initialPriceRange}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const dateRangeFilterElement =
    dateRangeFilter && dateRangeFilter.config.active ? (
      <BookingDateRangeFilter
        id="SearchFilters.dateRangeFilter"
        urlParam={dateRangeFilter.paramName}
        onSubmit={handleDateRange}
        showAsPopup
        contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
        initialValues={initialDateRange}
      />
    ) : null;

  const toggleSearchFiltersPanelButtonClasses =
    isSearchFiltersPanelOpen || searchFiltersPanelSelectedCount > 0
      ? css.searchFiltersPanelOpen
      : css.searchFiltersPanelClosed;
  const toggleSearchFiltersPanelButton = toggleSearchFiltersPanel ? (
    <button
      className={toggleSearchFiltersPanelButtonClasses}
      onClick={() => {
        toggleSearchFiltersPanel(!isSearchFiltersPanelOpen);
      }}
    >
      <FormattedMessage
        id="SearchFilters.moreFiltersButton"
        values={{ count: searchFiltersPanelSelectedCount }}
      />
    </button>
  ) : null;
  return (
    <div className={classes}>
      <div className={css.filters}>
        {categoryFilterElement}


        {
          urlQueryParams.pub_user_type == 1 ? (
            <SelectSingleFilter
              urlParam="pub_sittertype"
              label="Sitter Type"
              onSelect={handleSelectOption}
              showAsPopup
              options={[
                { key: 'overnight', label: 'Overnight' },
                { key: 'daycare', label: 'Daycare' },
              ]}
              initialValue={initialSitterType}
              contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
            />
          ) : null
        }


        {isService || urlQueryParams.pub_user_type == 2 ? (
          <SelectMultipleFilter
            id="service"
            name="service"
            urlParam="pub_service"
            label="Service Type"
            onSubmit={handleSelectOptions}
            showAsPopup
            options={[
              { key: 'walking', label: 'Dog Walking' },
              { key: 'surgeon', label: 'Veterinary Surgeons' },
              { key: 'groomer', label: 'Pet Groomer' },
              { key: 'store', label: 'Pet Store' },
              { key: 'food', label: 'Pet Food' },
              { key: 'tech', label: 'Pet Tech' },
              { key: 'accessories', label: 'Accessories' },
              { key: 'photo', label: 'Photography' },
            ]}
            initialValues={initialServices}
            contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
          />
        ) : null}

        {
          urlQueryParams.pub_service == "food" ? (
            <SelectSingleFilter
              urlParam="pub_foodtype"
              label="Food Type"
              onSelect={handleSelectOption}
              showAsPopup
              options={[
                { key: "treats", label: "Treats" },
                { key: "raw", label: "Raw" },
                { key: "fresh", label: "Fresh" },
                { key: "vegan", label: "Vegan" }
              ]}
              initialValue={initialFoodType}
              contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
            />
          ) : null
        }





        {amenitiesFilterElement}
        {priceFilterElement}
        {
          !isService && urlQueryParams.pub_user_type != 2 ? dateRangeFilterElement : null
        }
        {toggleSearchFiltersPanelButton}
      </div>

      {listingsAreLoaded && resultsCount > 0 ? (
        <div className={css.searchResultSummary}>
          <span className={css.resultsFound}>
            <FormattedMessage id="SearchFilters.foundResults" values={{ count: resultsCount }} />
          </span>
        </div>
      ) : null}

      {hasNoResult ? (
        <div className={css.noSearchResults}>
          <FormattedMessage id="SearchFilters.noResults" />
        </div>
      ) : null}

      {searchInProgress ? (
        <div className={css.loadingResults}>
          <FormattedMessage id="SearchFilters.loadingResults" />
        </div>
      ) : null}
    </div>
  );
};

SearchFiltersComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchingInProgress: false,
  categoryFilter: null,
  amenitiesFilter: null,
  priceFilter: null,
  dateRangeFilter: null,
  isSearchFiltersPanelOpen: false,
  toggleSearchFiltersPanel: null,
  searchFiltersPanelSelectedCount: 0,
};

SearchFiltersComponent.propTypes = {
  rootClassName: string,
  className: string,
  urlQueryParams: object.isRequired,
  listingsAreLoaded: bool.isRequired,
  resultsCount: number,
  searchingInProgress: bool,
  onManageDisableScrolling: func.isRequired,
  categoriesFilter: propTypes.filterConfig,
  amenitiesFilter: propTypes.filterConfig,
  priceFilter: propTypes.filterConfig,
  dateRangeFilter: propTypes.filterConfig,
  isSearchFiltersPanelOpen: bool,
  toggleSearchFiltersPanel: func,
  searchFiltersPanelSelectedCount: number,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SearchFilters = compose(
  withRouter,
  injectIntl
)(SearchFiltersComponent);

export default SearchFilters;
