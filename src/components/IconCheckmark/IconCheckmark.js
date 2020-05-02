import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconCheckMark.css';

const IconCheckmark = props => {
  const { rootClassName, className } = props;
  const classes = classNames(rootClassName || css.root, className);
  return (
    <svg className={classes} strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.6 1.2c-.4-.3-1-.2-1.3.2L7.8 19l-5.2-5c-.4-.4-1-.4-1.3 0-.4.3-.4.8 0 1l6 5.6.6.2s.2 0 .4-.4l14.3-18c.3-.5.2-1-.2-1" />
    </svg>
  );
};

IconCheckmark.defaultProps = {
  rootClassName: null,
  className: null,
};

const { string } = PropTypes;

IconCheckmark.propTypes = {
  rootClassName: string,
  className: string,
};

export default IconCheckmark;
