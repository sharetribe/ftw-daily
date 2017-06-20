import React, { Component, PropTypes } from 'react';
import { omit } from 'lodash';
import classNames from 'classnames';

import css from './InputFieldOld.css';

class InputFieldOld extends Component {
  componentWillUnmount() {
    if (this.props.clearOnUnmount) {
      this.props.input.onChange('');
    }
  }
  render() {
    const {
      rootClassName,
      className,
      inputRootClassName,
      errorRootClassName,
      inputComponent: InputComponent,
      type,
      label,
      placeholder,
      autoFocus,
      input,
      meta,
    } = this.props;

    const isCustom = type === 'custom';
    const isTextarea = type === 'textarea';

    if (!isCustom && InputComponent) {
      throw new Error('inputComponent should only be given with type="custom" prop');
    }
    if (isCustom && !InputComponent) {
      throw new Error('inputComponent prop required for custom inputs');
    }

    // Normal <input> component takes all the props, but the type prop
    // is omitted from <textarea> and custom components.
    const inputProps = { ...input, type, placeholder, autoFocus };
    const inputPropsWithoutType = omit(inputProps, 'type');

    const { valid, invalid, touched, error } = meta;

    // Error message and input error styles are only shown if the
    // field has been touched and the validation has failed.
    const hasError = touched && invalid && error;

    const classes = classNames(rootClassName || css.root, className);
    const inputClasses = classNames(inputRootClassName || css.input, {
      [css.inputSuccess]: valid,
      [css.inputError]: hasError,
    });
    const errorClasses = errorRootClassName || css.validationError;

    let component;

    if (isCustom) {
      component = <InputComponent className={inputRootClassName} {...inputPropsWithoutType} />;
    } else if (isTextarea) {
      component = <textarea className={inputClasses} {...inputPropsWithoutType} />;
    } else {
      component = <input className={inputClasses} {...inputProps} />;
    }

    return (
      <div className={classes}>
        {label ? <label htmlFor={input.name}>{label}</label> : null}
        {component}
        {hasError ? <p className={errorClasses}>{error}</p> : null}
      </div>
    );
  }
}

InputFieldOld.defaultProps = {
  rootClassName: null,
  className: null,
  inputRootClassName: null,
  errorRootClassName: null,
  clearOnUnmount: false,
  inputComponent: null,
  type: null,
  label: null,
  placeholder: null,
  autoFocus: false,
};

const { string, shape, bool, func, oneOfType } = PropTypes;

InputFieldOld.propTypes = {
  // Allow passing in classes to subcomponents
  rootClassName: string,
  className: string,
  inputRootClassName: string,
  errorRootClassName: string,

  clearOnUnmount: bool,

  // If the type props is 'custom', this prop is used as the component
  inputComponent: oneOfType([func, string]),

  // 'custom', 'textarea', or something passed to an <input> element
  type: string,

  // Extra props passed to the underlying input component
  label: string,
  placeholder: string,
  autoFocus: bool,

  // Objects created by redux-form
  input: shape({
    name: string.isRequired,
    onChange: func.isRequired,
  }).isRequired,
  meta: shape({
    pristine: bool.isRequired,
    valid: bool.isRequired,
    invalid: bool.isRequired,
    touched: bool.isRequired,
    error: string,
  }).isRequired,
};

export default InputFieldOld;
