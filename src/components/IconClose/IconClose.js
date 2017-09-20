import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './CloseIcon.css';

const CloseIcon = props => {
  const { className, rootClassName } = props;
  const classes = classNames(rootClassName || css.root, className);

  return (
    <svg
      className={classes}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(-1 -1)" fillRule="evenodd">
        <rect transform="rotate(45 7 7)" x="-1" y="6" width="16" height="2" rx="1" />
        <rect transform="rotate(-45 7 7)" x="-1" y="6" width="16" height="2" rx="1" />
      </g>
    </svg>
  );
};

const { string } = PropTypes;

CloseIcon.defaultProps = {
  className: null,
  rootClassName: null,
};

CloseIcon.propTypes = {
  className: string,
  rootClassName: string,
};

export default CloseIcon;
