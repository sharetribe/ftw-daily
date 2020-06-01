import React, { Component } from 'react';
import { func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import { InlineTextButton } from '../../components';
import css from './SearchFiltersPanel.css';

class SearchFiltersPanelComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { currentQueryParams: props.urlQueryParams };

    this.applyFilters = this.applyFilters.bind(this);
    this.cancelFilters = this.cancelFilters.bind(this);
    this.resetAll = this.resetAll.bind(this);
  }

  // Apply the filters by redirecting to SearchPage with new filters.
  applyFilters() {
    const { applyFilters, onClosePanel } = this.props;

    if (applyFilters) {
      applyFilters();
    }

    // Ensure that panel closes (if now changes have been made)
    onClosePanel();
  }

  // Close the filters by clicking cancel, revert to the initial params
  cancelFilters() {
    const { cancelFilters } = this.props;

    if (cancelFilters) {
      cancelFilters();
    }

    this.props.onClosePanel();
  }

  // Reset all filter query parameters
  resetAll(e) {
    const { resetAll, onClosePanel } = this.props;

    if (resetAll) {
      resetAll(e);
    }

    // Ensure that panel closes (if now changes have been made)
    onClosePanel();

    // blur event target if event is passed
    if (e && e.currentTarget) {
      e.currentTarget.blur();
    }
  }

  render() {
    const { rootClassName, className, children } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    return (
      <div className={classes}>
        <div className={css.filtersWrapper}>{children}</div>
        <div className={css.footer}>
          <InlineTextButton rootClassName={css.resetAllButton} onClick={this.resetAll}>
            <FormattedMessage id={'SearchFiltersPanel.resetAll'} />
          </InlineTextButton>
          <InlineTextButton rootClassName={css.cancelButton} onClick={this.cancelFilters}>
            <FormattedMessage id={'SearchFiltersPanel.cancel'} />
          </InlineTextButton>
          <InlineTextButton rootClassName={css.applyButton} onClick={this.applyFilters}>
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
  applyFilters: func.isRequired,
  resetAll: func.isRequired,
  onClosePanel: func.isRequired,
};

const SearchFiltersPanel = SearchFiltersPanelComponent;

export default SearchFiltersPanel;
