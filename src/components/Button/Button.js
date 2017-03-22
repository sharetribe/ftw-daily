import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './Button.css';

const Button = props => {
  const { children, className, ...rest } = props;

  const classes = classNames(css.root, className);

  return <button className={classes} {...rest}>{children}</button>;
};

const { any, string } = PropTypes;

Button.defaultProps = {
  children: null,
  className: null,
};

Button.propTypes = {
  children: any,
  className: string,
};

export default Button;
