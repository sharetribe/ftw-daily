import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconCloseCustom.module.css';

const IconCloseCustom = props => {
  const { className, rootClassName } = props;
  const classes = classNames(rootClassName || css.root, className);


  return (
    <svg
      className={classes}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path stroke="#000" d="M1 1l12 12.178M13 1L1 13.178"></path>
    </svg>
  );
};

const { string } = PropTypes;

IconCloseCustom.defaultProps = {
  className: null,
  rootClassName: null,
};

IconCloseCustom.propTypes = {
  className: string,
  rootClassName: string,
};

export default IconCloseCustom;
