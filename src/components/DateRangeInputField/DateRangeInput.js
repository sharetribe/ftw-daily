/**
 * DateRangeInput wraps DateRangePicker from React-dates and gives a list of all default props we use.
 * Styles for DateRangePicker can be found from 'public/reactDates.css'.
 *
 * N.B. *isOutsideRange* in defaultProps is defining what dates are available to booking.
 */
import React, { Component, PropTypes } from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { DateRangePicker, isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';
import classNames from 'classnames';
import moment from 'moment';

import NextMonthIcon from './NextMonthIcon';
import PreviousMonthIcon from './PreviousMonthIcon';
import css from './DateRangeInput.css';

export const START_DATE = 'startDate';
export const END_DATE = 'endDate';
export const HORIZONTAL_ORIENTATION = 'horizontal';
export const ANCHOR_LEFT = 'left';

// Since redux-form tracks the onBlur event for marking the field as
// touched (which triggers possible error validation rendering), only
// trigger the event asynchronously when no other input within this
// component has received focus.
//
// This prevents showing the validation error when the user selects a
// value and moves on to another input within this component.
const BLUR_TIMEOUT = 100;

// Possible configuration options of React-dates
const defaultProps = {
  initialDates: null, // Possible initial date passed for the component
  value: null, // Value should keep track of selected date.

  // input related props
  startDateId: 'startDate',
  endDateId: 'endDate',
  startDatePlaceholderText: null, // Handled inside component
  endDatePlaceholderText: null, // Handled inside component
  disabled: false,
  required: false,
  screenReaderInputMessage: null, // Handled inside component
  showClearDates: false,
  showDefaultInputIcon: false,
  customArrowIcon: <span />,
  customInputIcon: null,
  customCloseIcon: null,

  // calendar presentation and interaction related props
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 1,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  renderCalendarInfo: null,
  daySize: 38,

  // navigation related props
  navPrev: <PreviousMonthIcon />,
  navNext: <NextMonthIcon />,
  onPrevMonthClick() {},
  onNextMonthClick() {},

  // day presentation and interaction related props
  renderDay: day => {
    return <span className="renderedDay">{day.format('D')}</span>;
  },
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: () => false,

  // Stripe holds funds in a reserve for up to 90 days from charge creation.
  // outside range -><- today ... today+89 days -><- outside range
  isOutsideRange: day => {
    const daysCountAvailableToBook = 90;
    const endOfRange = daysCountAvailableToBook - 1;
    return !isInclusivelyAfterDay(day, moment()) ||
      !isInclusivelyBeforeDay(day, moment().add(endOfRange, 'days'));
  },
  isDayHighlighted: () => {},

  // Internationalization props
  // Multilocale support can be achieved with displayFormat like moment.localeData.longDateFormat('L')
  // https://momentjs.com/
  displayFormat: 'ddd, MMMM D',
  monthFormat: 'MMMM YYYY',
  phrases: {
    closeDatePicker: null, // Handled inside component
    clearDate: null, // Handled inside component
  },
};

class DateRangeInputComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: null,
    };

    this.blurTimeoutId = null;
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Update focusedInput in case a new value for it is
    // passed in the props. This may occur if the focus
    // is manually set to the date picker.
    if (nextProps.focusedInput && nextProps.focusedInput !== this.props.focusedInput) {
      this.setState({ focusedInput: nextProps.focusedInput });
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.blurTimeoutId);
  }

  onDatesChange(dates) {
    const { startDate, endDate } = dates;
    const startDateAsDate = startDate instanceof moment ? startDate.toDate() : null;
    const endDateAsDate = endDate instanceof moment ? endDate.toDate() : null;
    this.props.onChange({ startDate: startDateAsDate, endDate: endDateAsDate });
  }

  onFocusChange(focusedInput) {
    // DateRangePicker requires 'onFocusChange' function and 'focusedInput'
    // but Fields of React-Form deals with onFocus & onBlur instead
    this.setState({ focusedInput });

    if (focusedInput) {
      window.clearTimeout(this.blurTimeoutId);
      this.props.onFocus(focusedInput);
    } else {
      window.clearTimeout(this.blurTimeoutId);
      this.blurTimeoutId = window.setTimeout(
        () => {
          this.props.onBlur();
        },
        BLUR_TIMEOUT
      );
    }
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {
      className,
      initialDates,
      intl,
      name,
      startDatePlaceholderText,
      endDatePlaceholderText,
      onBlur,
      onChange,
      onFocus,
      onDragStart,
      onDrop,
      phrases,
      screenReaderInputMessage,
      useMobileMargins,
      value,
      ...datePickerProps
    } = this.props;
    /* eslint-enable no-unused-vars */

    const initialStartMoment = initialDates ? moment(initialDates.startDate) : null;
    const initialEndMoment = initialDates ? moment(initialDates.endDate) : null;
    const startDate = value && value.startDate instanceof Date
      ? moment(value.startDate)
      : initialStartMoment;
    const endDate = value && value.endDate instanceof Date
      ? moment(value.endDate)
      : initialEndMoment;

    const startDatePlaceholderTxt = startDatePlaceholderText ||
      intl.formatMessage({ id: 'DateRangeInputField.startDatePlaceholderText' });
    const endDatePlaceholderTxt = endDatePlaceholderText ||
      intl.formatMessage({ id: 'DateRangeInputField.endDatePlaceholderText' });
    const screenReaderInputText = screenReaderInputMessage ||
      intl.formatMessage({ id: 'DateRangeInputField.screenReaderInputMessage' });
    const closeDatePickerText = phrases.closeDatePicker
      ? phrases.closeDatePicker
      : intl.formatMessage({ id: 'DateRangeInputField.closeDatePicker' });
    const clearDateText = phrases.clearDate
      ? phrases.clearDate
      : intl.formatMessage({ id: 'DateRangeInputField.clearDate' });

    const classes = classNames(css.inputRoot, className, {
      [css.withMobileMargins]: useMobileMargins,
    });

    return (
      <div className={classes}>
        <DateRangePicker
          {...datePickerProps}
          focusedInput={this.state.focusedInput}
          onFocusChange={this.onFocusChange}
          startDate={startDate}
          endDate={endDate}
          onDatesChange={this.onDatesChange}
          startDatePlaceholderText={startDatePlaceholderTxt}
          endDatePlaceholderText={endDatePlaceholderTxt}
          screenReaderInputMessage={screenReaderInputText}
          phrases={{ closeDatePicker: closeDatePickerText, clearDate: clearDateText }}
        />
      </div>
    );
  }
}

DateRangeInputComponent.defaultProps = {
  className: null,
  useMobileMargins: false,
  ...defaultProps,
};

const { bool, func, instanceOf, oneOf, shape, string } = PropTypes;

DateRangeInputComponent.propTypes = {
  className: string,
  focusedInput: oneOf([START_DATE, END_DATE]),
  initialDates: instanceOf(Date),
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
  useMobileMargins: bool,
  startDatePlaceholderText: string,
  endDatePlaceholderText: string,
  screenReaderInputMessage: string,
  value: shape({
    startDate: instanceOf(Date),
    endDate: instanceOf(Date),
  }),
};

export default injectIntl(DateRangeInputComponent);
