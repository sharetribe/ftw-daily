import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { IconSpinner, IconCheckmark } from '../../components';

import css from './Button.css';

const Button = props => {
  const { children, className, rootClassName, inProgress, ready, ...rest } = props;

  const rootClass = rootClassName || css.root;
  const classes = classNames(rootClass, className, {
    [css.ready]: ready,
    [css.inProgress]: inProgress,
  });

  let content;

  if (inProgress) {
    content = <IconSpinner rootClassName={css.spinner} />;
  } else if (ready) {
    content = <IconCheckmark rootClassName={css.checkmark} />;
  } else {
    content = children;
  }

  return <button className={classes} {...rest}>{content}</button>;
};

const { node, string, bool } = PropTypes;

Button.defaultProps = {
  rootClassName: null,
  className: null,
  inProgress: false,
  ready: false,
  children: null,
};

Button.propTypes = {
  rootClassName: string,
  className: string,

  inProgress: bool,
  ready: bool,

  children: node,
};

export default Button;

export const PrimaryButton = props => <Button {...props} rootClassName={css.primaryButton} />;
PrimaryButton.displayName = 'PrimaryButton';

export const SecondaryButton = props => <Button {...props} rootClassName={css.secondaryButton} />;
SecondaryButton.displayName = 'SecondaryButton';

export const InlineTextButton = props => <Button {...props} rootClassName={css.inlineTextButton} />;
InlineTextButton.displayName = 'InlineTextButton';
