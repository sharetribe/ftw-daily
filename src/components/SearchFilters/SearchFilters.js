import React from 'react';
import { compose } from 'redux';
import { object, string, bool, number, func, shape, array } from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { omit } from 'lodash';

import { SelectSingleFilter, SelectMultipleFilter } from '../../components';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import css from './SearchFilters.css';

const CATEGORY_URL_PARAM = 'pub_category';
const FEATURES_URL_PARAM = 'pub_amenities';

// Dropdown container can have a positional offset (in pixels)
const FILTER_DROPDOWN_OFFSET = -14;

const SearchFiltersComponent = props => {
  const {
    rootClassName,
    className,
    urlQueryParams,
    listingsAreLoaded,
    resultsCount,
    searchInProgress,
    categories,
    features,
    history,
    intl,
  } = props;

  const loadingResults = <FormattedMessage id="SearchFilters.loadingResults" />;

  const resultsFound = (
    <FormattedMessage id="SearchFilters.foundResults" values={{ count: resultsCount }} />
  );

  const noResults = <FormattedMessage id="SearchFilters.noResults" />;

  const classes = classNames(rootClassName || css.root, className);

  const categoryLabel = intl.formatMessage({
    id: 'SearchFilters.categoryLabel',
  });

  const featuresLabel = intl.formatMessage({
    id: 'SearchFilters.featuresLabel',
  });

  const initialFeatures = !!urlQueryParams[FEATURES_URL_PARAM]
    ? urlQueryParams[FEATURES_URL_PARAM].split(',')
    : [];

  const initialCategory = urlQueryParams[CATEGORY_URL_PARAM];

  const handleSelectOptions = (urlParam, options) => {
    const queryParams =
      options && options.length > 0
        ? { ...urlQueryParams, [FEATURES_URL_PARAM]: options.join(',') }
        : omit(urlQueryParams, FEATURES_URL_PARAM);

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

  const categoryFilter = categories ? (
    <SelectSingleFilter
      urlParam={CATEGORY_URL_PARAM}
      label={categoryLabel}
      onSelect={handleSelectOption}
      options={categories}
      initialValue={initialCategory}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  const featuresFilter = features ? (
    <SelectMultipleFilter
      name="amenities"
      urlParam={FEATURES_URL_PARAM}
      label={featuresLabel}
      onSelect={handleSelectOptions}
      options={features}
      initialValues={initialFeatures}
      contentPlacementOffset={FILTER_DROPDOWN_OFFSET}
    />
  ) : null;

  return (
    <div className={classes}>
      <div className={css.filters}>
        {categoryFilter}
        {featuresFilter}
      </div>

      <div className={css.searchResultSummary}>
        {listingsAreLoaded && resultsCount > 0 ? resultsFound : null}
        {listingsAreLoaded && resultsCount === 0 ? noResults : null}
        {searchInProgress ? loadingResults : null}
      </div>
    </div>
  );
};

SearchFiltersComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchingInProgress: false,
  categories: null,
  features: null,
};

SearchFiltersComponent.propTypes = {
  rootClassName: string,
  className: string,
  urlQueryParams: object.isRequired,
  listingsAreLoaded: bool.isRequired,
  resultsCount: number,
  searchingInProgress: bool,
  onMapIconClick: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  categories: array,
  features: array,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SearchFilters = compose(withRouter, injectIntl)(SearchFiltersComponent);

export default SearchFilters;
