import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';

import { SelectSingleCustomAttribute } from '../../components';
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
    intl,
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

  return (
    <div className={classes}>
      <div className={css.filters}>
        <SelectSingleCustomAttribute
          customAttribute="category"
          urlQueryParams={urlQueryParams}
          intl={intl}
        />
      </div>

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

const { object, string, bool, number, func } = PropTypes;

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

  // from injectIntl
  intl: intlShape.isRequired,
};

const SearchFilters = injectIntl(SearchFiltersComponent);

export default SearchFilters;
