import React from 'react';
import { compose } from 'redux';
import { object, string, bool, number, func, shape } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import omit from 'lodash/omit';
import SortingIcon from './SortingIcon';

import { SelectMultipleFilter, PriceFilter, RangeFilter, SelectSingleFilter } from '..';
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

const initialRangeValues = (queryParams, paramName) => {
  const value = queryParams[paramName];
  const valuesFromParams = !!value ? value.split(',').map(v => Number.parseInt(v, RADIX)) : [];
  return !!value && valuesFromParams.length === 2
    ? {
        minValue: valuesFromParams[0],
        maxValue: valuesFromParams[1],
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
  const {
    rootClassName,
    className,
    urlQueryParams,
    listingsAreLoaded,
    resultsCount,
    searchInProgress,
    genderFilter,
    ageFilter,
    breedFilter,
    hightFilter,
    colorFilter,
    mainDisciplineFilter,
    priceFilter,
    isSearchFiltersPanelOpen,
    toggleSearchFiltersPanel,
    searchFiltersPanelSelectedCount,
    history,
    intl,
  } = props;

  const hasNoResult = listingsAreLoaded && resultsCount === 0;
  const classes = classNames(rootClassName || css.root, { [css.longInfo]: hasNoResult }, className);

  const genderLabel = intl.formatMessage({
    id: 'SearchFilters.genderLabel',
  });
  const breedLabel = intl.formatMessage({
    id: 'SearchFilters.breedLabel',
  });
  const colorLabel = intl.formatMessage({
    id: 'SearchFilters.colorLabel',
  });
  const mainDisciplineLabel = intl.formatMessage({
    id: 'SearchFilters.mainDisciplineLabel',
  });
  const initialGender = genderFilter ? initialValues(urlQueryParams, genderFilter.paramName) : null;

  const initialAge = ageFilter ? initialRangeValues(urlQueryParams, ageFilter.paramName) : null;

  const initialBreed = breedFilter ? initialValues(urlQueryParams, breedFilter.paramName) : null;

  const initialHight = hightFilter
    ? initialRangeValues(urlQueryParams, hightFilter.paramName)
    : null;

  const initialColor = colorFilter ? initialValues(urlQueryParams, colorFilter.paramName) : null;

  const initialMainDiscipline = mainDisciplineFilter
    ? initialValues(urlQueryParams, mainDisciplineFilter.paramName)
    : null;

  const initialPriceRange = priceFilter
    ? initialPriceRangeValue(urlQueryParams, priceFilter.paramName)
    : null;

  const handleSelectOptions = (urlParam, options) => {
    const queryParams =
      options && options.length > 0
        ? { ...urlQueryParams, [urlParam]: options.join(',') }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const handleSelectOption = (urlParam, option) => {
    // query parameters after selecting the option
    // if no option is passed, clear the selection for the filter
    const queryParams = option
      ? { ...urlQueryParams, [urlParam]: option }
      : omit(urlQueryParams, urlParam);

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

  const handleRange = (urlParam, range) => {
    const { minValue, maxValue } = range || {};

    const queryParams =
      minValue != null && maxValue != null
        ? { ...urlQueryParams, [urlParam]: `${minValue},${maxValue}` }
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

  // const handleKeyword = (urlParam, values) => {
  //   const queryParams = values
  //     ? { ...urlQueryParams, [urlParam]: values }
  //     : omit(urlQueryParams, urlParam);

  //   history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  // };

  const handleSorting = (urlParam, option) => history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, { ...urlQueryParams, [urlParam]: option } ));
  

  const filterElementProps = {
    onSubmit: handleSelectOptions,
    showAsPopup: true,
    contentPlacementOffset: FILTER_DROPDOWN_OFFSET,
  };

  const genderFilterElement = genderFilter ? (
    <SelectMultipleFilter
      id={'SearchFilters.genderFilter'}
      name="gender"
      urlParam={genderFilter.paramName}
      label={genderLabel}
      options={genderFilter.options}
      initialValues={initialGender}
      {...filterElementProps}
    />
  ) : null;

  const ageFilterElement = ageFilter ? (
    <RangeFilter
      id="SearchFilters.ageFilter"
      urlParam={ageFilter.paramName}
      onSubmit={handleRange}
      showAsPopup
      buttonLabelId="SearchFilters.ageLabel"
      rangeFilterFormLabelId="SearchFilters.ageLabel"
      {...ageFilter.config}
      initialValues={initialAge}
      valueTypeLabelId="SearchFilter.typeAgeValue"
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
      rangeFilterFormValueId="SearchFilter.typeAgeValue"
    />
  ) : null;

  const breedFilterElement = breedFilter ? (
    <SelectMultipleFilter
      id={'SearchFilters.breedFilter'}
      name="breed"
      urlParam={breedFilter.paramName}
      label={breedLabel}
      options={breedFilter.options}
      initialValues={initialBreed}
      threeColumns
      {...filterElementProps}
    />
  ) : null;

  const hightFilterElement = hightFilter ? (
    <RangeFilter
      id="SearchFilters.hightFilter"
      urlParam={hightFilter.paramName}
      onSubmit={handleRange}
      showAsPopup
      buttonLabelId="SearchFilters.hightLabel"
      rangeFilterFormLabelId="SearchFilters.hightLabel"
      {...hightFilter.config}
      initialValues={initialHight}
      valueTypeLabelId="SearchFilter.typeHeightValue"
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
      rangeFilterFormValueId="SearchFilter.typeHeightValue"
    />
  ) : null;

  const colorFilterElement = colorFilter ? (
    <SelectMultipleFilter
      id={'SearchFilters.colorFilter'}
      name="color"
      urlParam={colorFilter.paramName}
      label={colorLabel}
      options={colorFilter.options}
      initialValues={initialColor}
      threeColumns
      {...filterElementProps}
    />
  ) : null;

  const mainDisciplineFilterElement = mainDisciplineFilter ? (
    <SelectMultipleFilter
      id={'SearchFilters.mainDisciplineFilter'}
      name="mainDiscipline"
      urlParam={mainDisciplineFilter.paramName}
      label={mainDisciplineLabel}
      options={mainDisciplineFilter.options}
      initialValues={initialMainDiscipline}
      threeColumns
      {...filterElementProps}
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

    const sortingParams = [
        {
          label: 'Neueste',
          key: 'createdAt',
        },
        {
          label: 'Älteste',
          key: '-createdAt',
        },
        {
          label: 'Geringster Preis',
          key: '-price',
        },
        {
          label: 'Höchster Preis',
          key: 'price',
        },
    ];

    const sortingPanelLabel = (urlQueryParams && urlQueryParams.sort)
     ? sortingParams.filter(s => s.key === urlQueryParams.sort)[0].label
      : intl.formatMessage({ id: 'SearchFilters.sortingPanelLabel', })

    const sortingElement = (
      <SelectSingleFilter
        id='SearchFilters.sortingElement'
        name='sortingPanel'
        urlParam='sort'
        label={sortingPanelLabel}
        elementBeforeLabel={<SortingIcon />}
        options={sortingParams}
        initialValue={null}
        showAsPopup={true}
        onSelect={handleSorting}
      />
    );

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
      <div className={css.sortingPanel}>
        {sortingElement}
       </div>
      <div className={css.filters}>
        {mainDisciplineFilterElement}
        {breedFilterElement}
        {priceFilterElement}
        {ageFilterElement}
        {colorFilterElement}
        {hightFilterElement}
        {genderFilterElement}
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
  genderFilter: null,
  ageFilter: null,
  breedFilter: null,
  hightFilter: null,
  colorFilter: null,
  mainDisciplineFilter: null,
  priceFilter: null,
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
  genderFilter: propTypes.filterConfig,
  ageFilter: propTypes.filterConfig,
  breedFilter: propTypes.filterConfig,
  hightFilter: propTypes.filterConfig,
  colorFilter: propTypes.filterConfig,
  mainDisciplineFilter: propTypes.filterConfig,
  priceFilter: propTypes.filterConfig,
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
