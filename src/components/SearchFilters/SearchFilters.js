import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { omit } from 'lodash';

import { SelectSingleCustomAttribute } from '../../components';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import config from '../../config';
import css from './SearchFilters.css';

const SearchFiltersComponent = props => {
  const {
    rootClassName,
    className,
    urlQueryParams,
    listingsAreLoaded,
    resultsCount,
    searchInProgress,
    onMapIconClick,
    history,
  } = props;

  const loadingResults = <FormattedMessage id="SearchFilters.loadingResults" />;

  const resultsFound = (
    <FormattedMessage id="SearchFilters.foundResults" values={{ count: resultsCount }} />
  );

  const noResults = <FormattedMessage id="SearchFilters.noResults" />;

  const resultsFoundMobile = (
    <h2>
      <FormattedMessage id="SearchFilters.foundResults" values={{ count: resultsCount }} />
    </h2>
  );

  const classes = classNames(rootClassName || css.root, className);

  const onSelectSingle = (customAttribute, option) => {
    // name of the corresponding query parameter
    const caParam = `ca_${customAttribute}`;

    // query parameters after selecting the option
    // if no option is passed, clear the selection for the filter
    const queryParams = option
      ? { ...urlQueryParams, [caParam]: option }
      : omit(urlQueryParams, caParam);

    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
  };

  const hasCategoryConfig = config.customAttributes && config.customAttributes.category;
  const categoryFilter = hasCategoryConfig ? (
    <SelectSingleCustomAttribute
      customAttribute="category"
      urlQueryParams={urlQueryParams}
      onSelect={onSelectSingle}
    />
  ) : null;

  return (
    <div className={classes}>
      <div className={css.filters}>{categoryFilter}</div>

      <div className={css.searchResultSummary}>
        {listingsAreLoaded && resultsCount > 0 ? resultsFound : null}
        {listingsAreLoaded && resultsCount === 0 ? noResults : null}
        {searchInProgress ? loadingResults : null}
      </div>

      <div className={css.searchResultSummaryMobile}>
        <div>
          {listingsAreLoaded && resultsCount > 0 ? resultsFoundMobile : null}
          {listingsAreLoaded && resultsCount === 0 ? noResults : null}
          {searchInProgress ? loadingResults : null}
        </div>
        <div className={css.mapIcon} onClick={onMapIconClick}>
          <FormattedMessage id="SearchFilters.openMapView" className={css.mapIconText} />
        </div>
      </div>
    </div>
  );
};

const { object, string, bool, number, func, shape } = PropTypes;

SearchFiltersComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchingInProgress: false,
};

SearchFiltersComponent.propTypes = {
  rootClassName: string,
  className: string,
  urlQueryParams: object.isRequired,
  listingsAreLoaded: bool.isRequired,
  resultsCount: number,
  searchingInProgress: bool,
  onMapIconClick: func.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const SearchFilters = withRouter(SearchFiltersComponent);

export default SearchFilters;
