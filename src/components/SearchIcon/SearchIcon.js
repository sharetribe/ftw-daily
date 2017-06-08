import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './SearchIcon.css';

const SearchIcon = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg
      className={classes}
      width="21"
      height="22"
      viewBox="0 0 21 22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        transform="matrix(-1 0 0 1 20 1)"
        strokeWidth="2"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 14l5.241 5.241" /><circle cx="7.5" cy="7.5" r="7.5" />
      </g>
    </svg>
  );
};

SearchIcon.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

SearchIcon.propTypes = {
  rootClassName: string,
  className: string,
};

export default SearchIcon;
