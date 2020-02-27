import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Topbar.css';

const MenuIcon = props => {
  const { className, rootClassName, isBackButtonIcon } = props;
  const classes = classNames(rootClassName || css.rootMenuIcon, className);

  if(isBackButtonIcon) {
    return (
      <svg  className={className} width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 13L2 7L8 1" stroke="#1B2C48" strokeWidth="2"/>
      </svg>
    )
  }

  return (
    <svg
      className={classes}
      width="18"
      height="12"
      viewBox="0 0 18 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fillRule="evenodd">
        <rect width="18" height="2" rx="1" />
        <rect y="5" width="18" height="2" rx="1" />
        <rect y="10" width="18" height="2" rx="1" />
      </g>
    </svg>
  );
};

const { string } = PropTypes;

MenuIcon.defaultProps = {
  className: null,
  rootClassName: null,
  isBackButtonIcon: false
};

MenuIcon.propTypes = {
  className: string,
  rootClassName: string,
  isBackButtonIcon: PropTypes.bool
};

export default MenuIcon;
