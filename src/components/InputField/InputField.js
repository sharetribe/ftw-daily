import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import css from './InputField.css';

class InputField extends Component {
  componentWillUnmount() {
    if (this.props.clearOnUnmount) {
      this.props.input.onChange('');
    }
  }
  render() {
    const {
      rootClassName,
      className,
      labelRootClassName,
      inputRootClassName,
      errorRootClassName,
      type,
      label,
      placeholder,
      autoFocus,
      input,
      meta,
    } = this.props;
    const inputProps = { ...input, type, placeholder, autoFocus };
    const { pristine, valid, invalid, touched, error } = meta;

    // Error message and input error styles are only shown if the
    // field has been touched and the validation has failed.
    const hasError = touched && invalid && error;

    // Input is market as succesful if it has been changed and
    // validation has not failed.
    const isFilledInAndValid = !pristine && touched && valid;

    const classes = classNames(rootClassName || css.root, className);
    const labelClasses = labelRootClassName || css.label;
    const inputClasses = classNames(inputRootClassName || css.input, {
      [css.inputSuccess]: isFilledInAndValid,
      [css.inputError]: hasError,
    });
    const errorClasses = errorRootClassName || css.validationError;

    return (
      <div className={classes}>
        {label ? <label className={labelClasses} htmlFor={inputProps.name}>{label}</label> : null}
        <input className={inputClasses} {...inputProps} />
        {hasError ? <p className={errorClasses}>{error}</p> : null}
      </div>
    );
  }
}

InputField.defaultProps = {
  rootClassName: null,
  className: null,
  labelRootClassName: null,
  inputRootClassName: null,
  errorRootClassName: null,
  clearOnUnmount: false,
  label: null,
  placeholder: null,
  autoFocus: false,
};

const { string, shape, bool, func } = PropTypes;

InputField.propTypes = {
  // Allow passing in classes to subcomponents
  rootClassName: string,
  className: string,
  labelRootClassName: string,
  inputRootClassName: string,
  errorRootClassName: string,

  clearOnUnmount: bool,

  // Extra props passed to the underlying input component
  type: string.isRequired,
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

export default InputField;
