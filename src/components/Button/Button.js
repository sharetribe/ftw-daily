import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './Button.css';

const Button = props => {
  const { children, className, rootClassName, ...rest } = props;

  const rootClass = rootClassName || css.root;
  const classes = classNames(rootClass, className);

  return <button className={classes} {...rest}>{children}</button>;
};

const { node, string } = PropTypes;

Button.defaultProps = {
  children: null,
  className: null,
  rootClassName: '',
};

Button.propTypes = {
  children: node,
  className: string,
  rootClassName: string,
};

export default Button;

export const FlatButton = props => <Button {...props} rootClassName={css.flatButton} />;

FlatButton.defaultProps = { className: '' };

FlatButton.propTypes = { className: string };
