import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconEmailAttention.module.css';

const IconEmailAttention = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg
      className={classes}
      width="52"
      height="45"
      viewBox="0 0 52 45"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <path
          className={css.attentionStroke}
          d="M50 30.5C50 37.406 44.406 43 37.5 43S25 37.406 25 30.5C25 23.596 30.594 18 37.5 18S50 23.596 50 30.5z"
          strokeWidth="2.5"
        />
        <path className={css.attentionStroke} strokeWidth="2.5" d="M44 28l-8 8-4-4" />
        <path
          className={css.marketplaceStroke}
          d="M20.43 32H5.07C3.377 32 2 30.558 2 28.786V5.214C2 3.438 3.376 2 5.07 2h36.86C43.623 2 45 3.438 45 5.214v9.643"
          strokeWidth="2.75"
        />
        <path className={css.marketplaceStroke} strokeWidth="2.75" d="M43 4.026L23.015 17 3 4" />
      </g>
    </svg>
  );
};

IconEmailAttention.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

IconEmailAttention.propTypes = { rootClassName: string, className: string };

export default IconEmailAttention;
