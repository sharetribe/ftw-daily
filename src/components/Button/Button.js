import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconSpinner, IconCheckmark } from '../../components';

import css from './Button.module.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted: false };
  }
  componentDidMount() {
    this.setState({ mounted: true }); // eslint-disable-line react/no-did-mount-set-state
  }
  render() {
    const {
      children,
      className,
      rootClassName,
      spinnerClassName,
      checkmarkClassName,
      inProgress,
      ready,
      disabled,
      ...rest
    } = this.props;

    const rootClass = rootClassName || css.root;
    const classes = classNames(rootClass, className, {
      [css.ready]: ready,
      [css.inProgress]: inProgress,
    });

    let content;

    if (inProgress) {
      content = <IconSpinner rootClassName={spinnerClassName || css.spinner} />;
    } else if (ready) {
      content = <IconCheckmark rootClassName={checkmarkClassName || css.checkmark} />;
    } else {
      content = children;
    }

    // All buttons are disabled until the component is mounted. This
    // prevents e.g. being able to submit forms to the backend before
    // the client side is handling the submit.
    const buttonDisabled = this.state.mounted ? disabled : true;

    return (
      <button className={classes} {...rest} disabled={buttonDisabled}>
        {content}
      </button>
    );
  }
}

const { node, string, bool } = PropTypes;

Button.defaultProps = {
  rootClassName: null,
  className: null,
  spinnerClassName: null,
  checkmarkClassName: null,
  inProgress: false,
  ready: false,
  disabled: false,
  children: null,
};

Button.propTypes = {
  rootClassName: string,
  className: string,
  spinnerClassName: string,
  checkmarkClassName: string,

  inProgress: bool,
  ready: bool,
  disabled: bool,

  children: node,
};

export default Button;

export const PrimaryButton = props => {
  const classes = classNames(props.rootClassName || css.primaryButtonRoot, css.primaryButton);
  return <Button {...props} rootClassName={classes} />;
};
PrimaryButton.displayName = 'PrimaryButton';

export const SecondaryButton = props => {
  const classes = classNames(props.rootClassName || css.secondaryButtonRoot, css.secondaryButton);
  return <Button {...props} rootClassName={classes} />;
};
SecondaryButton.displayName = 'SecondaryButton';

export const InlineTextButton = props => {
  const classes = classNames(props.rootClassName || css.inlineTextButtonRoot, css.inlineTextButton);
  return <Button {...props} rootClassName={classes} />;
};
InlineTextButton.displayName = 'InlineTextButton';

export const SocialLoginButton = props => {
  const classes = classNames(props.rootClassName || css.socialButtonRoot, css.socialButton);
  return <Button {...props} rootClassName={classes} />;
};

SocialLoginButton.displayName = 'SocialLoginButton';
