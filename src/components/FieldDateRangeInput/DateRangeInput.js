/**
 * DateRangeInput wraps DateRangePicker from React-dates and gives a list of all default props we use.
 * Styles for DateRangePicker can be found from 'public/reactDates.css'.
 *
 * N.B. *isOutsideRange* in defaultProps is defining what dates are available to booking.
 */
import React, { Component } from 'react';
import { bool, func, instanceOf, oneOf, shape, string, arrayOf } from 'prop-types';
import { DateRangePicker, isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';
import { intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import moment from 'moment';
import { START_DATE, END_DATE } from '../../util/dates';
import { LINE_ITEM_DAY, propTypes } from '../../util/types';
import config from '../../config';
import {
  isDayBlockedFn,
  isOutsideRangeFn,
  isBlockedBetween,
  apiEndDateToPickerDate,
  pickerEndDateToApiDate,
} from './DateRangeInput.helpers';

import { IconArrowHead } from '../../components';
import css from './DateRangeInput.module.css';

export const HORIZONTAL_ORIENTATION = 'horizontal';
export const ANCHOR_LEFT = 'left';

// Since final-form tracks the onBlur event for marking the field as
// touched (which triggers possible error validation rendering), only
// trigger the event asynchronously when no other input within this
// component has received focus.
//
// This prevents showing the validation error when the user selects a
// value and moves on to another input within this component.
const BLUR_TIMEOUT = 100;

// IconArrowHead component might not be defined if exposed directly to the file.
// This component is called before IconArrowHead component in components/index.js
const PrevIcon = props => (
  <IconArrowHead {...props} direction="left" rootClassName={css.arrowIcon} />
);
const NextIcon = props => (
  <IconArrowHead {...props} direction="right" rootClassName={css.arrowIcon} />
);

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
  readOnly: false,
  screenReaderInputMessage: null, // Handled inside component
  showClearDates: false,
  showDefaultInputIcon: false,
  customArrowIcon: <span />,
  customInputIcon: null,
  customCloseIcon: null,
  noBorder: true,
  block: false,

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  appendToBody: false,
  disableScroll: false,
  daySize: 38,
  isRTL: false,
  initialVisibleMonth: null,
  firstDayOfWeek: config.i18n.firstDayOfWeek,
  numberOfMonths: 1,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  renderCalendarInfo: null,
  hideKeyboardShortcutsPanel: true,

  // navigation related props
  navPrev: <PrevIcon />,
  navNext: <NextIcon />,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  transitionDuration: 200, // milliseconds between next month changes etc.

  renderCalendarDay: undefined, // If undefined, renders react-dates/lib/components/CalendarDay
  // day presentation and interaction related props
  renderDayContents: day => {
    return <span className="renderedDay">{day.format('D')}</span>;
  },
  minimumNights: 1,
  enableOutsideDays: false,
  isDayBlocked: () => false,

  // outside range -><- today ... today+available days -1 -><- outside range
  isOutsideRange: day => {
    const endOfRange = config.dayCountAvailableForBooking - 1;
    return (
      !isInclusivelyAfterDay(day, moment()) ||
      !isInclusivelyBeforeDay(day, moment().add(endOfRange, 'days'))
    );
  },
  isDayHighlighted: () => {},

  // Internationalization props
  // Multilocale support can be achieved with displayFormat like moment.localeData.longDateFormat('L')
  // https://momentjs.com/
  displayFormat: 'ddd, MMM D',
  monthFormat: 'MMMM YYYY',
  weekDayFormat: 'dd',
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
      currentStartDate: null,
    };

    this.blurTimeoutId = null;
    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Update focusedInput in case a new value for it is
    // passed in the props. This may occur if the focus
    // is manually set to the date picker.
    if (this.props.focusedInput && this.props.focusedInput !== prevProps.focusedInput) {
      this.setState({ focusedInput: this.props.focusedInput });
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.blurTimeoutId);
  }

  onDatesChange(dates) {
    const { unitType, timeSlots } = this.props;
    const { startDate, endDate } = dates;

    // both dates are selected, a new start date before the previous start
    // date is selected
    const startDateUpdated =
      timeSlots &&
      startDate &&
      endDate &&
      this.state.currentStartDate &&
      startDate.isBefore(this.state.currentStartDate);

    // clear the end date in case a blocked date can be found
    // between previous start date and new start date
    const clearEndDate = startDateUpdated
      ? isBlockedBetween(timeSlots, startDate, moment(this.state.currentStartDate).add(1, 'days'))
      : false;

    const startDateAsDate = startDate instanceof moment ? startDate.toDate() : null;
    const endDateAsDate = clearEndDate ? null : pickerEndDateToApiDate(unitType, endDate);

    this.setState(() => ({
      currentStartDate: startDateAsDate,
    }));

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
      this.blurTimeoutId = window.setTimeout(() => {
        this.props.onBlur();
      }, BLUR_TIMEOUT);
    }
  }

  render() {
    /* eslint-disable no-unused-vars */
    const {
      className,
      unitType,
      initialDates,
      intl,
      name,
      startDatePlaceholderText,
      endDatePlaceholderText,
      onBlur,
      onChange,
      onFocus,
      phrases,
      screenReaderInputMessage,
      useMobileMargins,
      value,
      children,
      render,
      timeSlots,
      ...datePickerProps
    } = this.props;
    /* eslint-enable no-unused-vars */

    const isDaily = unitType === LINE_ITEM_DAY;
    const initialStartMoment = initialDates ? moment(initialDates.startDate) : null;
    const initialEndMoment = initialDates ? moment(initialDates.endDate) : null;
    const startDate =
      value && value.startDate instanceof Date ? moment(value.startDate) : initialStartMoment;
    const endDate =
      apiEndDateToPickerDate(unitType, value ? value.endDate : null) || initialEndMoment;

    let isDayBlocked = isDayBlockedFn(
      timeSlots,
      startDate,
      endDate,
      this.state.focusedInput,
      unitType
    );

    let isOutsideRange = isOutsideRangeFn(
      timeSlots,
      startDate,
      endDate,
      this.state.focusedInput,
      unitType
    );

    const startDatePlaceholderTxt =
      startDatePlaceholderText ||
      intl.formatMessage({ id: 'FieldDateRangeInput.startDatePlaceholderText' });
    const endDatePlaceholderTxt =
      endDatePlaceholderText ||
      intl.formatMessage({ id: 'FieldDateRangeInput.endDatePlaceholderText' });
    const screenReaderInputText =
      screenReaderInputMessage ||
      intl.formatMessage({ id: 'FieldDateRangeInput.screenReaderInputMessage' });
    const closeDatePickerText = phrases.closeDatePicker
      ? phrases.closeDatePicker
      : intl.formatMessage({ id: 'FieldDateRangeInput.closeDatePicker' });
    const clearDateText = phrases.clearDate
      ? phrases.clearDate
      : intl.formatMessage({ id: 'FieldDateRangeInput.clearDate' });

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
          minimumNights={isDaily ? 0 : 1}
          onDatesChange={this.onDatesChange}
          startDatePlaceholderText={startDatePlaceholderTxt}
          endDatePlaceholderText={endDatePlaceholderTxt}
          screenReaderInputMessage={screenReaderInputText}
          phrases={{ closeDatePicker: closeDatePickerText, clearDate: clearDateText }}
          isDayBlocked={isDayBlocked}
          isOutsideRange={isOutsideRange}
        />
      </div>
    );
  }
}

DateRangeInputComponent.defaultProps = {
  className: null,
  useMobileMargins: false,
  timeSlots: null,
  ...defaultProps,
};

DateRangeInputComponent.propTypes = {
  className: string,
  startDateId: string,
  endDateId: string,
  unitType: propTypes.bookingUnitType.isRequired,
  focusedInput: oneOf([START_DATE, END_DATE]),
  initialDates: instanceOf(Date),
  intl: intlShape.isRequired,
  name: string.isRequired,
  isOutsideRange: func,
  onChange: func.isRequired,
  onBlur: func.isRequired,
  onFocus: func.isRequired,
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
  timeSlots: arrayOf(propTypes.timeSlot),
};

export default injectIntl(DateRangeInputComponent);
