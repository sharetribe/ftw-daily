import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { omit } from 'lodash';

import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import { SecondaryButton, ModalInMobile, Button, SelectSingleFilterMobile } from '../../components';
import config from '../../config';
import css from './SearchFiltersMobile.css';

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
      onOpenModal,
      onCloseModal,
      history,
      intl,
    } = this.props;

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

    // Open filters modal, set the initial parameters to current ones
    const openFilters = () => {
      onOpenModal();
      this.setState({ isFiltersOpenOnMobile: true, initialQueryParams: urlQueryParams });
    };

    // Close the filters by clicking cancel, revert to the initial params
    const cancelFilters = () => {
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
    };

    // Close the filter modal
    const closeFilters = () => {
      onCloseModal();
      this.setState({ isFiltersOpenOnMobile: false });
    };

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

      history.push(
        createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams)
      );
    };

    const customAttribute = 'category';

    // Reset all filter query parameters
    const resetAll = (e) => {
      const caParam = `ca_${customAttribute}`;
      const queryParams = omit(urlQueryParams, caParam);
      history.push(
        createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams)
      );

      // blur event target if event is passed
      if (e && e.currentTarget) {
        e.currentTarget.blur();
      }
    };

    const classes = classNames(rootClassName || css.root, className);

    const hasCategoryConfig = config.customAttributes && config.customAttributes.category;
    const categoryFilter = hasCategoryConfig ? (
      <SelectSingleFilterMobile
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
          <SecondaryButton className={css.filterButton} onClick={openFilters}>
            <FormattedMessage id="SearchFilters.filtersButtonLabel" className={css.mapIconText} />
          </SecondaryButton>
          <div className={css.mapIcon} onClick={onMapIconClick}>
            <FormattedMessage id="SearchFilters.openMapView" className={css.mapIconText} />
          </div>
        </div>
        <ModalInMobile
          id="SearchFiltersMobile.filters"
          isModalOpenOnMobile={this.state.isFiltersOpenOnMobile}
          onClose={cancelFilters}
          showAsModalMaxWidth={showAsModalMaxWidth}
          onManageDisableScrolling={onManageDisableScrolling}
          containerClassName={css.modalContainer}
          closeButtonMessage={modalCloseButtonMessage}
        >
          <div className={css.modalHeadingWrapper}>
            <span className={css.modalHeading}>{filtersHeading}</span>
            <button className={css.resetAllButton} onClick={(e) => resetAll(e)}>
              <FormattedMessage id={'SearchFiltersMobile.resetAll'} />
            </button>
          </div>
          {categoryFilter}
          <div className={css.showListingsContainer}>
            <Button className={css.showListingsButton} onClick={closeFilters}>
              {showListingsLabel}
            </Button>
          </div>
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
  onOpenModal: null,
  onCloseModal: null,
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

  // from injectIntl
  intl: intlShape.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const SearchFiltersMobile = injectIntl(withRouter(SearchFiltersMobileComponent));

export default SearchFiltersMobile;
