import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './Topbar.css';

const MenuIcon = props => {
  const { className, rootClassName } = props;
  const classes = classNames(rootClassName || css.rootMenuIcon, className);

  return (
    <svg
      className={classes}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fillRule="evenodd">
        <rect y="2" width="18" height="2" rx="1" />
        <rect y="7" width="18" height="2" rx="1" />
        <rect y="12" width="18" height="2" rx="1" />
      </g>
    </svg>
  );
};

const { string } = PropTypes;

MenuIcon.defaultProps = {
  className: null,
  rootClassName: null,
};

MenuIcon.propTypes = {
  className: string,
  rootClassName: string,
};

export default MenuIcon;
