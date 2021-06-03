import React, { Component } from 'react';
import { func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import { InlineTextButton } from '../../components';
import css from './SearchFiltersSecondary.module.css';

class SearchFiltersSecondaryComponent extends Component {
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

  renderApplyResetButtons(key) {
    return (
      <div key={key} className={css.footer}>
        <InlineTextButton rootClassName={css.resetAllButton} onClick={this.resetAll}>
          <FormattedMessage id={'SearchFiltersSecondary.resetAll'} />
        </InlineTextButton>
        <InlineTextButton rootClassName={css.cancelButton} onClick={this.cancelFilters}>
          <FormattedMessage id={'SearchFiltersSecondary.cancel'} />
        </InlineTextButton>
        <InlineTextButton rootClassName={css.applyButton} onClick={this.applyFilters}>
          <FormattedMessage id={'SearchFiltersSecondary.apply'} />
        </InlineTextButton>
      </div>
    );
  }

  render() {
    const { rootClassName, className, children } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    // add reset/clear/apply buttons between each filter, and at the top
    const childrenWithButtonsBetween = [];
    children.forEach(filt => {
      childrenWithButtonsBetween.push(this.renderApplyResetButtons(`before-${filt.key}-buttons`));
      childrenWithButtonsBetween.push(filt);
    });

    return (
      <div className={classes}>
        <div className={css.filtersWrapper}>{childrenWithButtonsBetween}</div>
        {this.renderApplyResetButtons('end-of-list-buttons')}
      </div>
    );
  }
}

SearchFiltersSecondaryComponent.defaultProps = {
  rootClassName: null,
  className: null,
};

SearchFiltersSecondaryComponent.propTypes = {
  rootClassName: string,
  className: string,
  urlQueryParams: object.isRequired,
  applyFilters: func.isRequired,
  resetAll: func.isRequired,
  onClosePanel: func.isRequired,
};

const SearchFiltersSecondary = SearchFiltersSecondaryComponent;

export default SearchFiltersSecondary;
