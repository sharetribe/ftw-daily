import React, { Component, PropTypes } from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames';
import { ValidationError } from '../../components';

import DateRangeInput, { START_DATE, END_DATE } from './DateRangeInput';
import css from './DateRangeInputField.css';

class DateRangeInputFieldComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { focusedInput: null };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleBlur(focusedInput) {
    this.setState({ focusedInput: null });
    this.props.input.onBlur(focusedInput);
  }

  handleFocus(focusedInput) {
    this.setState({ focusedInput });
    this.props.input.onFocus(focusedInput);
  }

  render() {
    const {
      rootClassName,
      className,
      startDateId,
      startDateLabel,
      endDateId,
      endDateLabel,
      input,
      meta,
      ...rest
    } = this.props;

    if (startDateLabel && !startDateId) {
      throw new Error('startDateId required when a startDateLabel is given');
    }

    if (endDateLabel && !endDateId) {
      throw new Error('endDateId required when a endDateLabel is given');
    }

    const { touched, error } = meta;
    const value = input.value;

    // If startDate is valid label changes color and bottom border changes color too
    const startDateIsValid = value && value.startDate instanceof Date;
    const startDateLabelClasses = classNames(css.startDateLabel, {
      [css.labelSuccess]: false, //startDateIsValid,
    });
    const startDateBorderClasses = classNames(css.input, {
      [css.inputSuccess]: startDateIsValid,
      [css.inputError]: touched && !startDateIsValid && typeof error === 'string',
      [css.hover]: this.state.focusedInput === START_DATE,
    });

    // If endDate is valid label changes color and bottom border changes color too
    const endDateIsValid = value && value.endDate instanceof Date;
    const endDateLabelClasses = classNames(css.endDateLabel, {
      [css.labelSuccess]: false, //endDateIsValid,
    });
    const endDateBorderClasses = classNames(css.input, {
      [css.inputSuccess]: endDateIsValid,
      [css.inputError]: touched && !endDateIsValid && typeof error === 'string',
      [css.hover]: this.state.focusedInput === END_DATE,
    });

    const label = startDateLabel && endDateLabel
      ? <div className={css.labels}>
          <label className={startDateLabelClasses} htmlFor={startDateId}>{startDateLabel}</label>
          <label className={endDateLabelClasses} htmlFor={endDateId}>{endDateLabel}</label>
        </div>
      : null;

    // eslint-disable-next-line no-unused-vars
    const { onBlur, onFocus, ...restOfInput } = input;
    const inputProps = {
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      ...restOfInput,
      ...rest,
    };
    const classes = classNames(rootClassName || css.fieldRoot, className);

    return (
      <div className={classes}>
        {label}
        <DateRangeInput {...inputProps} />
        <div className={css.inputBorders}>
          <div className={startDateBorderClasses} />
          <div className={endDateBorderClasses} />
        </div>
        <ValidationError fieldMeta={meta} />
      </div>
    );
  }
}

DateRangeInputFieldComponent.defaultProps = {
  rootClassName: null,
  className: null,
  endDateId: null,
  endDateLabel: null,
  endDatePlaceholderText: null,
  startDateId: null,
  startDateLabel: null,
  startDatePlaceholderText: null,
};

const { object, string } = PropTypes;

DateRangeInputFieldComponent.propTypes = {
  rootClassName: string,
  className: string,
  endDateId: string,
  endDateLabel: string,
  endDatePlaceholderText: string,
  startDateId: string,
  startDateLabel: string,
  startDatePlaceholderText: string,
  input: object.isRequired,
  meta: object.isRequired,
};

const DateRangeInputField = props => {
  return <Field component={DateRangeInputFieldComponent} {...props} />;
};

export { DateRangeInput };
export default DateRangeInputField;
