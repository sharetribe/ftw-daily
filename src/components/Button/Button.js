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
  rootClassName: null,
  className: null,
  children: null,
};

Button.propTypes = {
  rootClassName: string,
  className: string,
  children: node,
};

export default Button;

export const PrimaryButton = props => <Button {...props} rootClassName={css.primaryButton} />;

export const SecondaryButton = props => <Button {...props} rootClassName={css.secondaryButton} />;

export const InlineTextButton = props => <Button {...props} rootClassName={css.inlineTextButton} />;

export const InlineButton = props => <Button {...props} rootClassName={css.inlineButton} />;
InlineButton.defaultProps = { className: '' };
InlineButton.propTypes = { className: string };
