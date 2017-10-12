import React, { PropTypes } from 'react'; // eslint-disable-line react/no-deprecated
import { FormattedMessage } from 'react-intl';
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
  } = props;

  const showInputError = isTouched && !!inputError;

  const classes = classNames(rootClassName || css.input, className, {
    [css.inputSuccess]: !!value,
    [css.inputError]: showInputError || showStripeError,
  });

  const inputProps = {
    className: classes,
    id: `${formName}.bankAccountToken.${inputType}`,
    value,
    placeholder,
    onChange,
    onFocus,
    onBlur,
  };

  const errorMessage = <p className={css.error}>{inputError}</p>;

  return (
    <div className={classes}>
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
};

export default StripeBankAccountRequiredInput;
