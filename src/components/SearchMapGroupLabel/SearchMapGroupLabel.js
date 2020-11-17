import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { propTypes } from '../../util/types';

import css from './SearchMapGroupLabel.module.css';

class SearchMapGroupLabel extends Component {
  shouldComponentUpdate(nextProps) {
    const hasSameAmountOfListings = nextProps.listings.length === this.props.listings.length;
    const hasSameActiveStatus = this.props.isActive === nextProps.isActive;
    const hasSameRefreshToken =
      this.props.mapComponentRefreshToken === nextProps.mapComponentRefreshToken;

    return !(hasSameAmountOfListings && hasSameActiveStatus && hasSameRefreshToken);
  }

  render() {
    const { className, rootClassName, listings, onListingClicked, isActive } = this.props;
    const classes = classNames(rootClassName || css.root, className);
    const countLabelClasses = classNames(css.details, { [css.detailsActive]: isActive });
    const caretClasses = classNames(css.caret, { [css.caretActive]: isActive });

    return (
      <button className={classes} onClick={() => onListingClicked(listings)}>
        <div className={css.caretShadow} />
        <div className={countLabelClasses}>{listings.length}</div>
        <div className={caretClasses} />
      </button>
    );
  }
}

SearchMapGroupLabel.defaultProps = {
  className: null,
  rootClassName: null,
};

const { arrayOf, func, string } = PropTypes;

SearchMapGroupLabel.propTypes = {
  className: string,
  rootClassName: string,
  listings: arrayOf(propTypes.listing).isRequired,
  onListingClicked: func.isRequired,
};

export default SearchMapGroupLabel;
