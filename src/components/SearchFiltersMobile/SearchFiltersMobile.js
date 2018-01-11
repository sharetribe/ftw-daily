import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { omit } from 'lodash';

import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import { SecondaryButton, ModalInMobile } from '../../components';
import config from '../../config';
import css from './SearchFiltersMobile.css';

class SelectSingleCustomAttributeMobile extends Component {
  constructor(props) {
    super(props);
    this.selectOption = this.selectOption.bind(this);
  }

  selectOption(option) {
    const customAttribute = this.props.customAttribute;
    console.log(`select option and ca: ${option} - ${customAttribute}`);
    //this.setState({ isOpen: false });
    this.props.onSelect(customAttribute, option);
  }

  render() {
    const { customAttribute, urlQueryParams, intl } = this.props;
    const filterLabel = intl.formatMessage({
      id: `SelectSingleCustomAttribute.${customAttribute}.label`,
    });
    // custom attribute content
    const ca = customAttribute && config.customAttributes[customAttribute];
    // name of the corresponding query parameter
    const caParam = `ca_${customAttribute}`;
    // current value of this custom attribute filter
    const currentValue = urlQueryParams[caParam];

    const labelClass = currentValue ? css.filterLabelSelected : css.filterLabel;

    return (
      <div>
        <div className={labelClass}>
          {filterLabel}
        </div>
        {ca.values.map(v => {
          // check if this option is selected
          const selected = currentValue === v;
          // menu item border class
          const optionBorderClass = selected ? css.optionBorderSelected : css.optionBorder;
          return (
            <button key={v} className={css.option} onClick={() => this.selectOption(v)}>
              <span className={optionBorderClass} />
              <FormattedMessage id={`SelectSingleCustomAttributeMobile.category.option.${v}`} />
            </button>
          );
        })}
      </div>
    );
  }
}

class SearchFiltersMobileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { isFiltersOpenOnMobile: false };
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
      history,
      intl,
    } = this.props;

    const resultsFound = (
      <FormattedMessage id="SearchFilters.foundResults" values={{ count: resultsCount }} />
    );
    const noResults = <FormattedMessage id="SearchFilters.noResultsMobile" />;
    const loadingResults = <FormattedMessage id="SearchFilters.loadingResultsMobile" />;
    const filtersHeading = intl.formatMessage({ id: 'SearchFiltersMobile.heading' });

    const openMobileFilters = () => {
      this.setState({ isFiltersOpenOnMobile: true });
    };

    const closeMobileFilters = () => {
      this.setState({ isFiltersOpenOnMobile: false });
    };

    const classes = classNames(rootClassName || css.root, className);

    const onSelectSingle = (customAttribute, option) => {
      // Name of the corresponding query parameter.
      // The custom attribute query parameters are named
      // ca_<custom_attribute_name> in the API.
      const caParam = `ca_${customAttribute}`;

      // query parameters after selecting the option
      // if no option is passed, clear the selection for the filter
      const queryParams = option
        ? { ...urlQueryParams, [caParam]: option }
        : omit(urlQueryParams, caParam);

      history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));
    };

    const customAttribute = 'category';

    const hasCategoryConfig = config.customAttributes && config.customAttributes.category;
    const categoryFilter = hasCategoryConfig ? (
      <SelectSingleCustomAttributeMobile
        customAttribute={customAttribute}
        urlQueryParams={urlQueryParams}
        onSelect={onSelectSingle}
        intl={intl}
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
          <SecondaryButton className={css.filterButton} onClick={openMobileFilters}>
            <FormattedMessage id="SearchFilters.filtersButtonLabel" className={css.mapIconText} />
          </SecondaryButton>
          <div className={css.mapIcon} onClick={onMapIconClick}>
            <FormattedMessage id="SearchFilters.openMapView" className={css.mapIconText} />
          </div>
        </div>
        <ModalInMobile
          id="SearchFiltersMobile.filters"
          isModalOpenOnMobile={this.state.isFiltersOpenOnMobile}
          onClose={closeMobileFilters}
          showAsModalMaxWidth={showAsModalMaxWidth}
          onManageDisableScrolling={onManageDisableScrolling}
          containerClassName={css.modalContainer}
        >
          <div className={css.modalHeadingWrapper}>
            <span className={css.modalHeading}>{filtersHeading}</span>
            <button className={css.clearButton}>
              <FormattedMessage id={'SearchFiltersMobile.resetAll'} />
            </button>
          </div>
          <div className={css.filtersContainer}>{categoryFilter}</div>
          <button onClick={closeMobileFilters}>
            "Show saunas"
          </button>
        </ModalInMobile>
      </div>
    );
  }
}

const { object, string, bool, number, func, shape } = PropTypes;

SearchFiltersMobileComponent.defaultProps = {
  rootClassName: null,
  className: null,
  resultsCount: null,
  searchingInProgress: false,
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

  // from injectIntl
  intl: intlShape.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const SearchFiltersMobile = injectIntl(withRouter(SearchFiltersMobileComponent));

export default SearchFiltersMobile;
