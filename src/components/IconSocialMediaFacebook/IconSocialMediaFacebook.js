import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconSocialMediaFacebook.module.css';

const IconSocialMediaFacebook = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg
      className={classes}
      width="10"
      height="17"
      viewBox="0 0 10 17"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.65 1.108C8.413 1.072 7.59 1 6.633 1c-2 0-3.374 1.244-3.374 3.525V6.49H1v2.668h2.258v6.84h2.71V9.16h2.25l.345-2.668H5.968V4.786c0-.766.204-1.298 1.293-1.298h1.39v-2.38z"
        fillRule="evenodd"
      />
    </svg>
  );
};

IconSocialMediaFacebook.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

IconSocialMediaFacebook.propTypes = { rootClassName: string, className: string };

export default IconSocialMediaFacebook;
