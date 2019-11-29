import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import css from './StripeBankAccountTokenInputField.css';

const StripeBankAccountRequiredInput = props => {
  const {
    className,
    rootClassName,
    inputType,
    formName,
    value,
    placeholder,
    onChange,
    onFocus,
    onBlur,
    isTouched,
    showStripeError,
    inputError,
    disabled,
    showInColumns,
  } = props;

  const showInputError = isTouched && !!inputError;

  const classes = classNames(rootClassName || css.input, className, {
    [css.inputSuccess]: !!value,
    [css.inputError]: showInputError || showStripeError,
  });

  const columnsClass = showInColumns ? css.longForm : null;

  const inputProps = {
    className: classes,
    id: `${formName}.bankAccountToken.${inputType}`,
    value,
    placeholder,
    onChange,
    onFocus,
    onBlur,
    disabled,
  };

  const errorMessage = <p className={css.error}>{inputError}</p>;

  return (
    <div className={classNames(classes, columnsClass)}>
      <label htmlFor={inputProps.id}>
        <FormattedMessage id={`StripeBankAccountTokenInputField.${inputType}.label`} />
      </label>
      <input {...inputProps} />
      {showInputError ? errorMessage : null}
    </div>
  );
};

const { bool, func, string } = PropTypes;

StripeBankAccountRequiredInput.defaultProps = {
  rootClassName: null,
  className: null,
  inputError: null,
  disabled: false,
};

StripeBankAccountRequiredInput.propTypes = {
  rootClassName: string,
  className: string,
  inputType: string.isRequired,
  formName: string.isRequired,
  value: string.isRequired,
  placeholder: string.isRequired,
  onChange: func.isRequired,
  onFocus: func.isRequired,
  onBlur: func.isRequired,
  isTouched: bool.isRequired,
  showStripeError: bool.isRequired,
  inputError: string,
  disabled: bool,
};

export default StripeBankAccountRequiredInput;
