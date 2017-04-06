/**
 * DateInput wraps SingleDatePicker from React-dates and gives a list of all default props we use.
 * Styles for SingleDatePicker can be found from 'public/reactDates.css'.
 * CSS modules can't handle global styles so they are currently added separately
 */
import React, { PropTypes } from 'react';
import moment from 'moment';
import { SingleDatePicker, isInclusivelyAfterDay } from 'react-dates';

const HORIZONTAL_ORIENTATION = 'horizontal';
const ANCHOR_LEFT = 'left';

// Possible configuration options of React-dates
const defaultProps = {
  initialDate: null, // Possible initial date passed for the component
  value: null, // Value should keep track of selected date.

  // input related props
  id: 'date',
  placeholder: 'Date',
  disabled: false,
  required: true,
  screenReaderInputMessage: '',
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
    closeDatePicker: 'Close',
    clearDate: 'Clear Date',
  },
};

class DateInput extends React.Component {
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
    // eslint-disable-next-line no-unused-vars
    const { initialDate, onBlur, onChange, onFocus, value, ...datePickerProps } = this.props;
    const initialMoment = initialDate ? moment(initialDate) : null;
    const date = value instanceof Date ? moment(value) : initialMoment;

    return (
      <div>
        <SingleDatePicker
          {...datePickerProps}
          id="date-input"
          date={date}
          focused={focused}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
        />
      </div>
    );
  }
}

DateInput.defaultProps = defaultProps;

const { func, instanceOf, string } = PropTypes;

DateInput.propTypes = {
  initialDate: instanceOf(Date),
  isOutsideRange: func,
  onChange: func.isRequired,
  onBlur: func.isRequired,
  onFocus: func.isRequired,
  placeholder: string,
  value: instanceOf(Date),
};

export default DateInput;
