/**
 * Provides a date picker for Final Forms (using https://github.com/airbnb/react-dates)
 *
 * NOTE: If you are using this component inside BookingDatesForm,
 * you should convert value.date to start date and end date before submitting it to API
 */
import React, { Component } from 'react';
import { bool, object, string, arrayOf } from 'prop-types';
import { Field } from 'react-final-form';
import classNames from 'classnames';
import { ValidationError } from '../../components';
import { propTypes } from '../../util/types';

import DateInput from './DateInput';
import css from './FieldDateInput.module.css';

const MAX_MOBILE_SCREEN_WIDTH = 768;

class FieldDateInputComponent extends Component {
  render() {
    const {
      className,
      rootClassName,
      id,
      label,
      input,
      meta,
      useMobileMargins,
      ...rest
    } = this.props;

    if (label && !id) {
      throw new Error('id required when a label is given');
    }

    const { touched, invalid, error } = meta;
    const value = input.value;

    // If startDate is valid label changes color and bottom border changes color too
    const dateIsValid = value && value.date instanceof Date;
    // Error message and input error styles are only shown if the
    // field has been touched and the validation has failed.
    const hasError = touched && invalid && error;

    const inputClasses = classNames({
      [css.pickerSuccess]: dateIsValid,
      [css.pickerError]: hasError,
    });

    const { onBlur, onFocus, type, checked, ...restOfInput } = input;
    const inputProps = {
      onBlur: input.onBlur,
      onFocus: input.onFocus,
      useMobileMargins,
      id,
      readOnly: typeof window !== 'undefined' && window.innerWidth < MAX_MOBILE_SCREEN_WIDTH,
      ...restOfInput,
      ...rest,
    };
    const classes = classNames(rootClassName || css.fieldRoot, className);
    const errorClasses = classNames({ [css.mobileMargins]: useMobileMargins });

    return (
      <div className={classes}>
        {label ? (
          <label className={classNames({ [css.mobileMargins]: useMobileMargins })} htmlFor={id}>
            {label}
          </label>
        ) : null}
        <DateInput className={inputClasses} {...inputProps} />
        <ValidationError className={errorClasses} fieldMeta={meta} />
      </div>
    );
  }
}

FieldDateInputComponent.defaultProps = {
  className: null,
  rootClassName: null,
  useMobileMargins: false,
  id: null,
  label: null,
  placeholderText: null,
  timeSlots: null,
};

FieldDateInputComponent.propTypes = {
  className: string,
  rootClassName: string,
  useMobileMargins: bool,
  id: string,
  label: string,
  placeholderText: string,
  timeSlots: arrayOf(propTypes.timeSlot),
  input: object.isRequired,
  meta: object.isRequired,
};

const FieldDateInput = props => {
  return <Field component={FieldDateInputComponent} {...props} />;
};

export { DateInput };
export default FieldDateInput;
