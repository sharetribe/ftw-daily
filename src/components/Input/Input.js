import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './Input.css';

const Input = props => {
  const { className, inline, ...rest } = props;

  const classes = classNames(css.root, { [css.inline]: inline }, className);

  return <input className={classes} {...rest} />;
};

const { string, bool } = PropTypes;

Input.defaultProps = {
  className: null,
  inline: false,
};

Input.propTypes = {
  className: string,
  inline: bool,
};

export default Input;
