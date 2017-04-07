/**
 * DateInput wraps SingleDatePicker from React-dates and gives a list of all default props we use.
 * Styles for SingleDatePicker can be found from 'public/reactDates.css'.
 * CSS modules can't handle global styles so they are currently added separately
 */
import React, { Component, PropTypes } from 'react';
import { intlShape, injectIntl } from 'react-intl';
import { SingleDatePicker, isInclusivelyAfterDay } from 'react-dates';
import moment from 'moment';

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
      initialDate,
      intl,
      placeholder,
      onBlur,
      onChange,
      onFocus,
      phrases,
      screenReaderInputMessage,
      value,
      ...datePickerProps
    } = this.props;
    /* eslint-enable no-unused-vars */

    const initialMoment = initialDate ? moment(initialDate) : null;
    const date = value instanceof Date ? moment(value) : initialMoment;

    const placeholderText = placeholder ||
      intl.formatMessage({ id: 'DateInput.defaultPlaceholder' });
    const screenReaderInputText = screenReaderInputMessage ||
      intl.formatMessage({ id: 'DateInput.screenReaderInputMessage' });
    const closeDatePickerText = phrases.closeDatePicker
      ? phrases.closeDatePicker
      : intl.formatMessage({ id: 'DateInput.closeDatePicker' });
    const clearDateText = phrases.clearDate
      ? phrases.clearDate
      : intl.formatMessage({ id: 'DateInput.clearDate' });

    return (
      <div>
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

DateInputComponent.defaultProps = defaultProps;

const { func, instanceOf, shape, string } = PropTypes;

DateInputComponent.propTypes = {
  initialDate: instanceOf(Date),
  intl: intlShape.isRequired,
  isOutsideRange: func,
  onChange: func.isRequired,
  onBlur: func.isRequired,
  onFocus: func.isRequired,
  phrases: shape({
    closeDatePicker: string,
    clearDate: string,
  }),
  placeholder: string,
  screenReaderInputMessage: string,
  value: instanceOf(Date),
};

const DateInput = injectIntl(DateInputComponent);

DateInput.displayName = 'DateInput';

export default DateInput;
