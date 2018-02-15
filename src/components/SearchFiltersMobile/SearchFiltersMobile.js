import React, { Component } from 'react';
import { object, string, bool, number, func, shape, array } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { omit, toPairs } from 'lodash';

import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import {
  SecondaryButton,
  ModalInMobile,
  Button,
  SelectSingleFilterMobile,
  SelectMultipleFilterMobile,
} from '../../components';
import css from './SearchFiltersMobile.css';

const CATEGORY_URL_PARAM = 'pub_category';
const AMENITIES_URL_PARAM = 'pub_amenities';
const allowedParams = [CATEGORY_URL_PARAM, AMENITIES_URL_PARAM];

const validateParamValue = value => value !== null && value !== undefined && value.length > 0;
const validateParamKey = key => allowedParams.includes(key);

// Check if a filter parameter is included query parameters
const hasFilterQueryParams = queryParams => {
  const firstFilterParam = toPairs(queryParams).find(entry => {
    return validateParamKey(entry[0]) && validateParamValue(entry[1]);
  });
  return !!firstFilterParam;
};

class SearchFiltersMobileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isFiltersOpenOnMobile: false };

    this.openFilters = this.openFilters.bind(this);
    this.cancelFilters = this.cancelFilters.bind(this);
    this.closeFilters = this.closeFilters.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.handleSelectSingle = this.handleSelectSingle.bind(this);
    this.handleSelectMultiple = this.handleSelectMultiple.bind(this);
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

  // Reset all filter query parameters
  resetAll(e) {
    const { urlQueryParams, history } = this.props;

    const queryParams = omit(urlQueryParams, [CATEGORY_URL_PARAM, AMENITIES_URL_PARAM]);
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));

    // blur event target if event is passed
    if (e && e.currentTarget) {
      e.currentTarget.blur();
    }
  }

  render() {
    const {
      rootClassName,
      className,
      urlQueryParams,
      listingsAreLoaded,
      resultsCount,
      searchInProgress,
      showAsModalMaxWidth,
      onMapIconClick,
      onManageDisableScrolling,
      categories,
      amenities,
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

    const filtersButton = hasFilterQueryParams(urlQueryParams) ? (
      <Button className={css.filtersButton} onClick={this.openFilters}>
        <FormattedMessage id="SearchFilters.filtersButtonLabel" className={css.mapIconText} />
      </Button>
    ) : (
      <SecondaryButton className={css.filtersButton} onClick={this.openFilters}>
        <FormattedMessage id="SearchFilters.filtersButtonLabel" className={css.mapIconText} />
      </SecondaryButton>
    );

    const categoryLabel = intl.formatMessage({
      id: 'SearchFiltersMobile.categoryLabel',
    });
    const initialCategory = urlQueryParams[CATEGORY_URL_PARAM];

    const categoryFilter = categories ? (
      <SelectSingleFilterMobile
        urlParam={CATEGORY_URL_PARAM}
        label={categoryLabel}
        onSelect={this.handleSelectSingle}
        options={categories}
        initialValue={initialCategory}
        intl={intl}
      />
    ) : null;

    const amenitiesLabel = intl.formatMessage({ id: 'SearchFiltersMobile.amenitiesLabel' });

    const initialAmenities = !!urlQueryParams[AMENITIES_URL_PARAM]
      ? urlQueryParams[AMENITIES_URL_PARAM].split(',')
      : [];

    const amenitiesFilter = amenities ? (
      <SelectMultipleFilterMobile
        name="amenities"
        urlParam={AMENITIES_URL_PARAM}
        label={amenitiesLabel}
        onSelect={this.handleSelectMultiple}
        options={amenities}
        initialValues={initialAmenities}
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
          {filtersButton}
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
          <div className={css.filtersWrapper}>
            {categoryFilter}
            {amenitiesFilter}
          </div>
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
  onOpenModal: null,
  onCloseModal: null,
  categories: null,
  amenities: null,
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
  onOpenModal: func,
  onCloseModal: func,
  categories: array,
  amenities: array,

  // from injectIntl
  intl: intlShape.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const SearchFiltersMobile = injectIntl(withRouter(SearchFiltersMobileComponent));

export default SearchFiltersMobile;
