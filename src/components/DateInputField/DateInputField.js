/**
 * DateInput wraps SingleDatePicker from React-dates and gives a list of all default props we use.
 * Styles for SingleDatePicker can be found from 'public/reactDates.css'.
 * CSS modules can't handle global styles so they are currently added separately
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { intlShape, injectIntl } from 'react-intl';
import { SingleDatePicker, isInclusivelyAfterDay } from 'react-dates';
import classNames from 'classnames';
import moment from 'moment';
import { ValidationError } from '../../components';

import css from './DateInputField.css';

const HORIZONTAL_ORIENTATION = 'horizontal';
const ANCHOR_LEFT = 'left';

// Possible configuration options of React-dates
const defaultProps = {
  initialDate: null, // Possible initial date passed for the component
  value: null, // Value should keep track of selected date.

  // input related props
  id: 'date',
  placeholder: null, // Handled inside component
  disabled: false,
  required: false,
  screenReaderInputMessage: null, // Handled inside component
  showClearDate: false,

  // calendar presentation and interaction related props
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 1,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},

  // day presentation and interaction related props
  renderDay: null,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => {},

  // internationalization props
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  phrases: {
    closeDatePicker: null, // Handled inside component
    clearDate: null, // Handled inside component
  },
};

class DateInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDateChange(date) {
    this.props.onChange(date instanceof moment ? date.toDate() : null);
  }

  onFocusChange({ focused }) {
    // SingleDatePicker requires 'onFocusChange' function and 'focused' boolean
    // but Fields of React-Form deals with onFocus & onBlur instead
    this.setState({ focused });
    if (focused) {
      this.props.onFocus();
    } else {
      this.props.onBlur();
    }
  }

  render() {
    const { focused } = this.state;
    /* eslint-disable no-unused-vars */
    const {
      className,
      initialDate,
      intl,
      name,
      placeholder,
      onBlur,
      onChange,
      onFocus,
      onDragStart,
      onDrop,
      phrases,
      screenReaderInputMessage,
      value,
      ...datePickerProps
    } = this.props;
    /* eslint-enable no-unused-vars */

    const initialMoment = initialDate ? moment(initialDate) : null;
    const date = value instanceof Date ? moment(value) : initialMoment;

    const placeholderText =
      placeholder || intl.formatMessage({ id: 'DateInput.defaultPlaceholder' });
    const screenReaderInputText =
      screenReaderInputMessage || intl.formatMessage({ id: 'DateInput.screenReaderInputMessage' });
    const closeDatePickerText = phrases.closeDatePicker
      ? phrases.closeDatePicker
      : intl.formatMessage({ id: 'DateInput.closeDatePicker' });
    const clearDateText = phrases.clearDate
      ? phrases.clearDate
      : intl.formatMessage({ id: 'DateInput.clearDate' });

    const classes = classNames(css.inputRoot, className);

    return (
      <div className={classes}>
        <SingleDatePicker
          {...datePickerProps}
          id="date-input"
          date={date}
          focused={focused}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          placeholder={placeholderText}
          screenReaderInputMessage={screenReaderInputText}
          phrases={{ closeDatePicker: closeDatePickerText, clearDate: clearDateText }}
        />
      </div>
    );
  }
}

DateInputComponent.defaultProps = { className: null, ...defaultProps };

const { func, instanceOf, shape, string, object } = PropTypes;

DateInputComponent.propTypes = {
  className: string,
  initialDate: instanceOf(Date),
  intl: intlShape.isRequired,
  name: string.isRequired,
  isOutsideRange: func,
  onChange: func.isRequired,
  onBlur: func.isRequired,
  onFocus: func.isRequired,
  onDragStart: func.isRequired,
  onDrop: func.isRequired,
  phrases: shape({
    closeDatePicker: string,
    clearDate: string,
  }),
  placeholder: string,
  screenReaderInputMessage: string,
  value: instanceOf(Date),
};

export const DateInput = injectIntl(DateInputComponent);

const DateInputFieldComponent = props => {
  const { rootClassName, className, id, label, input, meta, ...rest } = props;

  if (label && !id) {
    throw new Error('id required when a label is given');
  }

  const { valid, invalid, touched, error } = meta;

  // Error message and input error styles are only shown if the
  // field has been touched and the validation has failed.
  const hasError = touched && invalid && error;

  const inputClasses = classNames(css.input, {
    [css.inputSuccess]: valid,
    [css.inputError]: hasError,
  });

  const inputProps = { className: inputClasses, ...input, ...rest };
  const classes = classNames(rootClassName || css.fieldRoot, className);

  return (
    <div className={classes}>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <DateInput {...inputProps} />
      <ValidationError fieldMeta={meta} />
    </div>
  );
};

DateInputFieldComponent.defaultProps = {
  rootClassName: null,
  className: null,
  id: null,
  label: null,
  placeholder: null,
};

DateInputFieldComponent.propTypes = {
  rootClassName: string,
  className: string,
  id: string,
  label: string,
  input: object.isRequired,
  meta: object.isRequired,
};

const DateInputField = props => {
  return <Field component={DateInputFieldComponent} {...props} />;
};

export default DateInputField;
