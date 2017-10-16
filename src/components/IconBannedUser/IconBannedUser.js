import React from 'react';
import PropTypes from 'prop-types';

import css from './IconBannedUser.css';

const IconBannedUser = props => {
  const { className } = props;
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <circle className={css.backgroundFill} cx="20" cy="20" r="20" />
        <circle className={css.foregroundStroke} strokeWidth="3" cx="20" cy="20" r="13" />
        <path className={css.foregroundFill} d="M28.34 9.04l2.12 2.12-19.8 19.8-2.12-2.12z" />
      </g>
    </svg>
  );
};

IconBannedUser.defaultProps = { className: null };

const { string } = PropTypes;

IconBannedUser.propTypes = { className: string };

export default IconBannedUser;
