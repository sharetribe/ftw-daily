/**
 * SearchFiltersPanel can be used to add extra filters to togglable panel in SearchPage.
 * Using this component will need you to enable it in SearchPage and passing needed props to
 * SearchFilters component (which is the default place for SearchFilters).
 *
 *
 * An example how to render MultiSelectFilter inside render function:
 *
 * const currentQueryParams = this.state.currentQueryParams;
 * const splitQueryParam = queryParam => queryParam ? queryParam.split(',') : [];
 *
 * // initialValue for a select should come either from state.currentQueryParam or urlQueryParam
 * const hascurrentQueryParam = typeof currentQueryParams[MULTI_SELECT_URL_PARAM] !== 'undefined'
 * const initialMultiSelectValue = hascurrentQueryParam
 *   ? splitQueryParam(currentQueryParams[MULTI_SELECT_URL_PARAM])
 *   : splitQueryParam(this.props.urlQueryParams[MULTI_SELECT_URL_PARAM]);
 *
 * const multiSelectFilterX = multiSelectFilterXFromProps ? (
 *   <SelectMultipleFilterMobile
 *     id="SearchFiltersPanel.multiSelectFilterX"
 *     name="multiSelectFilterX"
 *     urlParam={MULTI_SELECT_URL_PARAM}
 *     label={this.props.intl.formatMessage({ id: 'SearchFiltersPanel.multiSelectFilterXLabel' })}
 *     onSelect={this.handleSelectMultiple}
 *     options={multiSelectFilterXFromProps}
 *     initialValues={initialMultiSelectValue}
 *     twoColumns
 *   />
 * ) : null;
 */

import React, { Component } from 'react';
import { func, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { omit } from 'lodash';

import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import { InlineTextButton } from '../../components';
import css from './SearchFiltersPanel.css';

// Create constants from url params and uset them in FILTERS array and while adding actual filters
// e.g. const MULTI_SELECT_URL_PARAM = 'pub_filterX';
const FILTERS = [];

class SearchFiltersPanelComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { currentQueryParams: props.urlQueryParams };

    this.applyFilters = this.applyFilters.bind(this);
    this.cancelFilters = this.cancelFilters.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.handleSelectSingle = this.handleSelectSingle.bind(this);
    this.handleSelectMultiple = this.handleSelectMultiple.bind(this);
  }

  // Apply the filters by redirecting to SearchPage with new filters.
  applyFilters() {
    const { history, urlQueryParams, onClosePanel } = this.props;

    history.push(
      createResourceLocatorString(
        'SearchPage',
        routeConfiguration(),
        {},
        { ...urlQueryParams, ...this.state.currentQueryParams }
      )
    );

    // Ensure that panel closes (if now changes have been made)
    onClosePanel();
  }

  // Close the filters by clicking cancel, revert to the initial params
  cancelFilters() {
    this.setState({ currentQueryParams: {} });
    this.props.onClosePanel();
  }

  // Reset all filter query parameters
  resetAll(e) {
    const { urlQueryParams, history, onClosePanel } = this.props;

    const queryParams = omit(urlQueryParams, FILTERS);
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, queryParams));

    // Ensure that panel closes (if now changes have been made)
    onClosePanel();

    // blur event target if event is passed
    if (e && e.currentTarget) {
      e.currentTarget.blur();
    }
  }

  handleSelectSingle(urlParam, option) {
    const urlQueryParams = this.props.urlQueryParams;
    this.setState(prevState => {
      const prevQueryParams = prevState.currentQueryParams;
      const mergedQueryParams = { ...urlQueryParams, ...prevQueryParams };

      // query parameters after selecting the option
      // if no option is passed, clear the selection for the filter
      const currentQueryParams = option
        ? { ...mergedQueryParams, [urlParam]: option }
        : omit(mergedQueryParams, urlParam);

      return { currentQueryParams };
    });
  }

  handleSelectMultiple(urlParam, options) {
    const urlQueryParams = this.props.urlQueryParams;
    this.setState(prevState => {
      const prevQueryParams = prevState.currentQueryParams;
      const mergedQueryParams = { ...urlQueryParams, ...prevQueryParams };

      // query parameters after selecting options
      // if no option is passed, clear the selection from state.currentQueryParams
      const currentQueryParams =
        options && options.length > 0
          ? { ...mergedQueryParams, [urlParam]: options.join(',') }
          : { ...mergedQueryParams, [urlParam]: null };

      return { currentQueryParams };
    });
  }

  render() {
    const { rootClassName, className } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    return (
      <div className={classes}>
        <div className={css.filtersWrapper}>{/* Add filters here */}</div>
        <div className={css.footer}>
          <InlineTextButton className={css.resetAllButton} onClick={this.resetAll}>
            <FormattedMessage id={'SearchFiltersPanel.resetAll'} />
          </InlineTextButton>
          <InlineTextButton className={css.cancelButton} onClick={this.cancelFilters}>
            <FormattedMessage id={'SearchFiltersPanel.cancel'} />
          </InlineTextButton>
          <InlineTextButton className={css.applyButton} onClick={this.applyFilters}>
            <FormattedMessage id={'SearchFiltersPanel.apply'} />
          </InlineTextButton>
        </div>
      </div>
    );
  }
}

SearchFiltersPanelComponent.defaultProps = {
  rootClassName: null,
  className: null,
};

SearchFiltersPanelComponent.propTypes = {
  rootClassName: string,
  className: string,
  urlQueryParams: object.isRequired,
  onClosePanel: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const SearchFiltersPanel = injectIntl(withRouter(SearchFiltersPanelComponent));

export default SearchFiltersPanel;
