import React from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';

import css from './IconSuccess.module.css';

const IconSuccess = props => {
  const { rootClassName, className, fillColor } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg className={classes} width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <circle className={fillColor || css.fillColor} cx="12" cy="12" r="12" />
        <path
          stroke="#FFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 8l-5.184 8L8 12.439"
        />
      </g>
    </svg>
  );
};

IconSuccess.defaultProps = {
  rootClassName: null,
  className: null,
  fillColor: null,
};

IconSuccess.propTypes = {
  rootClassName: string,
  className: string,
  fillColor: string,
};

export default IconSuccess;
