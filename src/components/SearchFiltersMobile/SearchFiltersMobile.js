import React, { Component } from 'react';
import { object, string, bool, number, func, shape, array } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { withRouter } from 'react-router-dom';
import omit from 'lodash/omit';

import routeConfiguration from '../../routeConfiguration';
import { parseDateFromISO8601, stringifyDateToISO8601 } from '../../util/dates';
import { createResourceLocatorString } from '../../util/routes';
import { ModalInMobile, Button, PriceFilter, SelectMultipleFilter } from '../../components';
import { propTypes } from '../../util/types';
import css from './SearchFiltersMobile.css';

const RADIX = 10;

class SearchFiltersMobileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isFiltersOpenOnMobile: false, initialQueryParams: null };

    this.openFilters = this.openFilters.bind(this);
    this.cancelFilters = this.cancelFilters.bind(this);
    this.closeFilters = this.closeFilters.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.handleSelectSingle = this.handleSelectSingle.bind(this);
    this.handleSelectMultiple = this.handleSelectMultiple.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleDateRange = this.handleDateRange.bind(this);
    this.handleKeyword = this.handleKeyword.bind(this);
    this.initialValue = this.initialValue.bind(this);
    this.initialValues = this.initialValues.bind(this);
    this.initialPriceRangeValue = this.initialPriceRangeValue.bind(this);
    this.initialDateRangeValue = this.initialDateRangeValue.bind(this);
  }

  // Open filters modal, set the initial parameters to current ones
  openFilters() {
    const { onOpenModal, urlQueryParams } = this.props;
    onOpenModal();
    this.setState({ isFiltersOpenOnMobile: true, initialQueryParams: urlQueryParams });
  }

  // Close the filters by clicking cancel, revert to the initial params
  cancelFilters() {
    const { history, onCloseModal } = this.props;

    history.push(
      createResourceLocatorString(
        'SearchPage',
        routeConfiguration(),
        {},
        this.state.initialQueryParams
      )
    );
    onCloseModal();
    this.setState({ isFiltersOpenOnMobile: false, initialQueryParams: null });
  }

  // Close the filter modal
  closeFilters() {
    this.props.onCloseModal();
    this.setState({ isFiltersOpenOnMobile: false });
  }

  handleSelectSingle(urlParam, option) {
    const { urlQueryParams, history } = this.props;

    // query parameters after selecting the option
    // if no option is passed, clear the selection for the filter
    const queryParams = option
      ? { ...urlQueryParams, [urlParam]: option }
      : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  handleSelectMultiple(urlParam, options) {
    const { urlQueryParams, history } = this.props;

    const queryParams =
      options && options.length > 0
        ? { ...urlQueryParams, [urlParam]: options.join(',') }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  handlePrice(urlParam, range) {
    const { urlQueryParams, history } = this.props;
    const { minPrice, maxPrice } = range || {};
    const queryParams =
      minPrice != null && maxPrice != null
        ? { ...urlQueryParams, [urlParam]: `${minPrice},${maxPrice}` }
        : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  handleDateRange(urlParam, dateRange) {
    const { urlQueryParams, history } = this.props;
    const hasDates = dateRange && dateRange.dates;
    const { startDate, endDate } = hasDates ? dateRange.dates : {};

    const start = startDate ? stringifyDateToISO8601(startDate) : null;
    const end = endDate ? stringifyDateToISO8601(endDate) : null;

    const queryParams =
      start != null && end != null
        ? { ...urlQueryParams, [urlParam]: `${start},${end}` }
        : omit(urlQueryParams, urlParam);
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  handleKeyword(urlParam, keywords) {
    const { urlQueryParams, history } = this.props;
    const queryParams = urlParam
      ? { ...urlQueryParams, [urlParam]: keywords }
      : omit(urlQueryParams, urlParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  }

  // Reset all filter query parameters
  resetAll(e) {
    const { urlQueryParams, history, filterParamNames } = this.props;

    const queryParams = omit(urlQueryParams, filterParamNames);
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));

    // blur event target if event is passed
    if (e && e.currentTarget) {
      e.currentTarget.blur();
    }
  }

  // resolve initial value for a single value filter
  initialValue(paramName) {
    return this.props.urlQueryParams[paramName];
  }

  // resolve initial values for a multi value filter
  initialValues(paramName) {
    const urlQueryParams = this.props.urlQueryParams;
    return !!urlQueryParams[paramName] ? urlQueryParams[paramName].split(',') : [];
  }

  initialPriceRangeValue(paramName) {
    const urlQueryParams = this.props.urlQueryParams;
    const price = urlQueryParams[paramName];
    const valuesFromParams = !!price ? price.split(',').map(v => Number.parseInt(v, RADIX)) : [];

    return !!price && valuesFromParams.length === 2
      ? {
          minPrice: valuesFromParams[0],
          maxPrice: valuesFromParams[1],
        }
      : null;
  }

  initialDateRangeValue(paramName) {
    const urlQueryParams = this.props.urlQueryParams;
    const dates = urlQueryParams[paramName];
    const rawValuesFromParams = !!dates ? dates.split(',') : [];
    const valuesFromParams = rawValuesFromParams.map(v => parseDateFromISO8601(v));
    const initialValues =
      !!dates && valuesFromParams.length === 2
        ? {
            dates: { startDate: valuesFromParams[0], endDate: valuesFromParams[1] },
          }
        : { dates: null };

    return initialValues;
  }

  render() {
    const {
      rootClassName,
      className,
      listingsAreLoaded,
      resultsCount,
      searchInProgress,
      showAsModalMaxWidth,
      onMapIconClick,
      onManageDisableScrolling,
      selectedFiltersCount,
      genderFilter,
      ageFilter,
      breedFilter,
      hightFilter,
      colorFilter,
      mainDisciplineFilter,
      priceFilter,
      intl,
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);

    const resultsFound = (
      <FormattedMessage id="SearchFilters.foundResults" values={{ count: resultsCount }} />
    );
    const noResults = <FormattedMessage id="SearchFilters.noResultsMobile" />;
    const loadingResults = <FormattedMessage id="SearchFilters.loadingResultsMobile" />;
    const filtersHeading = intl.formatMessage({ id: 'SearchFiltersMobile.heading' });
    const modalCloseButtonMessage = intl.formatMessage({ id: 'SearchFiltersMobile.cancel' });

    const showListingsLabel = intl.formatMessage(
      { id: 'SearchFiltersMobile.showListings' },
      { count: resultsCount }
    );

    const filtersButtonClasses =
      selectedFiltersCount > 0 ? css.filtersButtonSelected : css.filtersButton;

    const genderLabel = intl.formatMessage({
      id: 'SearchFilters.genderLabel',
    });
    const ageLabel = intl.formatMessage({
      id: 'SearchFilters.ageLabel',
    });
    const breedLabel = intl.formatMessage({
      id: 'SearchFilters.breedLabel',
    });
    const hightLabel = intl.formatMessage({
      id: 'SearchFilters.hightLabel',
    });
    const colorLabel = intl.formatMessage({
      id: 'SearchFilters.colorLabel',
    });
    const mainDisciplineLabel = intl.formatMessage({
      id: 'SearchFilters.mainDisciplineLabel',
    });

    const initialGender = this.initialValues(genderFilter.paramName);

    const initialAge = this.initialValues(ageFilter.paramName);

    const initialBreed = this.initialValues(breedFilter.paramName);

    const initialHight = this.initialValues(hightFilter.paramName);

    const initialColor = this.initialValues(colorFilter.paramName);

    const initialMainDiscipline = this.initialValues(mainDisciplineFilter.paramName);

    const genderFilterElement = genderFilter ? (
      <SelectMultipleFilter
        id="SearchFiltersMobile.genderFilter"
        name="gender"
        urlParam={genderFilter.paramName}
        label={genderLabel}
        onSubmit={this.handleSelectSingle}
        liveEdit
        options={genderFilter.options}
        initialValues={initialGender}
      />
    ) : null;

    const ageFilterElement = ageFilter ? (
      <SelectMultipleFilter
        id="SearchFiltersMobile.ageFilter"
        name="age"
        urlParam={ageFilter.paramName}
        label={ageLabel}
        onSubmit={this.handleSelectSingle}
        liveEdit
        options={ageFilter.options}
        initialValues={initialAge}
      />
    ) : null;

    const breedFilterElement = breedFilter ? (
      <SelectMultipleFilter
        id="SearchFiltersMobile.breedFilter"
        name="breed"
        urlParam={breedFilter.paramName}
        label={breedLabel}
        onSubmit={this.handleSelectSingle}
        liveEdit
        options={breedFilter.options}
        initialValues={initialBreed}
      />
    ) : null;

    const hightFilterElement = hightFilter ? (
      <SelectMultipleFilter
        id="SearchFiltersMobile.hightFilter"
        name="hight"
        urlParam={hightFilter.paramName}
        label={hightLabel}
        onSubmit={this.handleSelectSingle}
        liveEdit
        options={hightFilter.options}
        initialValues={initialHight}
      />
    ) : null;

    const colorFilterElement = colorFilter ? (
      <SelectMultipleFilter
        id="SearchFiltersMobile.colorFilter"
        name="color"
        urlParam={colorFilter.paramName}
        label={colorLabel}
        onSubmit={this.handleSelectSingle}
        liveEdit
        options={colorFilter.options}
        initialValues={initialColor}
      />
    ) : null;

    const mainDisciplineFilterElement = mainDisciplineFilter ? (
      <SelectMultipleFilter
        id="SearchFiltersMobile.mainDisciplineFilter"
        name="mainDiscipline"
        urlParam={mainDisciplineFilter.paramName}
        label={mainDisciplineLabel}
        onSubmit={this.handleSelectSingle}
        liveEdit
        options={mainDisciplineFilter.options}
        initialValues={initialMainDiscipline}
      />
    ) : null;

    const initialPriceRange = this.initialPriceRangeValue(priceFilter.paramName);

    const priceFilterElement = priceFilter ? (
      <PriceFilter
        id="SearchFiltersMobile.priceFilter"
        urlParam={priceFilter.paramName}
        onSubmit={this.handlePrice}
        liveEdit
        {...priceFilter.config}
        initialValues={initialPriceRange}
      />
    ) : null;

    return (
      <div className={classes}>
        <div className={css.searchResultSummary}>
          {listingsAreLoaded && resultsCount > 0 ? resultsFound : null}
          {listingsAreLoaded && resultsCount === 0 ? noResults : null}
          {searchInProgress ? loadingResults : null}
        </div>
        <div className={css.buttons}>
          <Button rootClassName={filtersButtonClasses} onClick={this.openFilters}>
            <FormattedMessage id="SearchFilters.filtersButtonLabel" className={css.mapIconText} />
          </Button>
          <div className={css.mapIcon} onClick={onMapIconClick}>
            <FormattedMessage id="SearchFilters.openMapView" className={css.mapIconText} />
          </div>
        </div>
        <ModalInMobile
          id="SearchFiltersMobile.filters"
          isModalOpenOnMobile={this.state.isFiltersOpenOnMobile}
          onClose={this.cancelFilters}
          showAsModalMaxWidth={showAsModalMaxWidth}
          onManageDisableScrolling={onManageDisableScrolling}
          containerClassName={css.modalContainer}
          closeButtonMessage={modalCloseButtonMessage}
        >
          <div className={css.modalHeadingWrapper}>
            <span className={css.modalHeading}>{filtersHeading}</span>
            <button className={css.resetAllButton} onClick={e => this.resetAll(e)}>
              <FormattedMessage id={'SearchFiltersMobile.resetAll'} />
            </button>
          </div>
          {this.state.isFiltersOpenOnMobile ? (
            <div className={css.filtersWrapper}>
              {genderFilterElement}
              {ageFilterElement}
              {breedFilterElement}
              {hightFilterElement}
              {colorFilterElement}
              {mainDisciplineFilterElement}
              {priceFilterElement}
            </div>
          ) : null}

          <div className={css.showListingsContainer}>
            <Button className={css.showListingsButton} onClick={this.closeFilters}>
              {showListingsLabel}
            </Button>
          </div>
        </ModalInMobile>
      </div>
    );
  }
}

SearchFiltersMobileComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchingInProgress: false,
  selectedFiltersCount: 0,
  filterParamNames: [],
  genderFilter: null,
  ageFilter: null,
  breedFilter: null,
  hightFilter: null,
  colorFilter: null,
  mainDisciplineFilter: null,
  priceFilter: null,
};

SearchFiltersMobileComponent.propTypes = {
  rootClassName: string,
  className: string,
  urlQueryParams: object.isRequired,
  listingsAreLoaded: bool.isRequired,
  resultsCount: number,
  searchingInProgress: bool,
  showAsModalMaxWidth: number.isRequired,
  onMapIconClick: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onOpenModal: func.isRequired,
  onCloseModal: func.isRequired,
  selectedFiltersCount: number,
  filterParamNames: array,
  genderFilter: propTypes.filterConfig,
  ageFilter: propTypes.filterConfig,
  breedFilter: propTypes.filterConfig,
  hightFilter: propTypes.filterConfig,
  colorFilter: propTypes.filterConfig,
  mainDisciplineFilter: propTypes.filterConfig,
  priceFilter: propTypes.filterConfig,

  // from injectIntl
  intl: intlShape.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const SearchFiltersMobile = injectIntl(withRouter(SearchFiltersMobileComponent));

export default SearchFiltersMobile;
