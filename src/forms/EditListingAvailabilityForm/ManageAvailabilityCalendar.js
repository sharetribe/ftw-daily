import React, { Component } from 'react';
import { func, object, shape, string } from 'prop-types';
import {
  DayPickerSingleDateController,
  isSameDay,
  isInclusivelyBeforeDay,
  isInclusivelyAfterDay,
} from 'react-dates';
import { FormattedMessage } from '../../util/reactIntl';
import memoize from 'lodash/memoize';
import classNames from 'classnames';
import moment from 'moment';
import {
  ensureBooking,
  ensureAvailabilityException,
  ensureDayAvailabilityPlan,
} from '../../util/data';
import { DAYS_OF_WEEK, propTypes } from '../../util/types';
import { monthIdString, monthIdStringInUTC } from '../../util/dates';
import { IconArrowHead, IconSpinner } from '../../components';

import css from './ManageAvailabilityCalendar.module.css';

// Constants

const HORIZONTAL_ORIENTATION = 'horizontal';
const MAX_AVAILABILITY_EXCEPTIONS_RANGE = 365;
const MAX_BOOKINGS_RANGE = 180;
const TODAY_MOMENT = moment().startOf('day');
const END_OF_RANGE_MOMENT = TODAY_MOMENT.clone()
  .add(MAX_AVAILABILITY_EXCEPTIONS_RANGE - 1, 'days')
  .startOf('day');
const END_OF_BOOKING_RANGE_MOMENT = TODAY_MOMENT.clone()
  .add(MAX_BOOKINGS_RANGE - 1, 'days')
  .startOf('day');

// Constants for calculating day width (aka table cell dimensions)
const TABLE_BORDER = 2;
const TABLE_COLUMNS = 7;
const MIN_CONTENT_WIDTH = 272;
const MIN_CELL_WIDTH = Math.floor(MIN_CONTENT_WIDTH / TABLE_COLUMNS); // 38
const MAX_CONTENT_WIDTH_DESKTOP = 756;
const MAX_CELL_WIDTH_DESKTOP = Math.floor(MAX_CONTENT_WIDTH_DESKTOP / TABLE_COLUMNS); // 108
const VIEWPORT_LARGE = 1024;

// Helper functions

// Calculate the width for a calendar day (table cell)
const dayWidth = (wrapperWidth, windowWith) => {
  if (windowWith >= VIEWPORT_LARGE) {
    // NOTE: viewportLarge has a layout with sidebar.
    // In that layout 30% is reserved for paddings and 282 px goes to sidebar and gutter.
    const width = windowWith * 0.7 - 282;
    return width > MAX_CONTENT_WIDTH_DESKTOP
      ? MAX_CELL_WIDTH_DESKTOP
      : Math.floor((width - TABLE_BORDER) / TABLE_COLUMNS);
  } else {
    return wrapperWidth > MIN_CONTENT_WIDTH
      ? Math.floor((wrapperWidth - TABLE_BORDER) / TABLE_COLUMNS)
      : MIN_CELL_WIDTH;
  }
};

// Get a function that returns the start of the previous month
const prevMonthFn = currentMoment =>
  currentMoment
    .clone()
    .subtract(1, 'months')
    .startOf('month');

// Get a function that returns the start of the next month
const nextMonthFn = currentMoment =>
  currentMoment
    .clone()
    .add(1, 'months')
    .startOf('month');

// Get the start and end Dates in UTC
const dateStartAndEndInUTC = date => {
  const start = moment(date)
    .utc()
    .startOf('day')
    .toDate();
  const end = moment(date)
    .utc()
    .add(1, 'days')
    .startOf('day')
    .toDate();
  return { start, end };
};

const momentToUTCDate = dateMoment =>
  dateMoment
    .clone()
    .utc()
    .add(dateMoment.utcOffset(), 'minutes')
    .toDate();

// outside range -><- today ... today+MAX_AVAILABILITY_EXCEPTIONS_RANGE -1 -><- outside range
const isDateOutsideRange = date => {
  return (
    !isInclusivelyAfterDay(date, TODAY_MOMENT) || !isInclusivelyBeforeDay(date, END_OF_RANGE_MOMENT)
  );
};
const isOutsideRange = memoize(isDateOutsideRange);

const isMonthInRange = (monthMoment, startOfRange, endOfRange) => {
  const isAfterThisMonth = monthMoment.isSameOrAfter(startOfRange, 'month');
  const isBeforeEndOfRange = monthMoment.isSameOrBefore(endOfRange, 'month');
  return isAfterThisMonth && isBeforeEndOfRange;
};

const isPast = date => !isInclusivelyAfterDay(date, TODAY_MOMENT);
const isAfterEndOfRange = date => !isInclusivelyBeforeDay(date, END_OF_RANGE_MOMENT);
const isAfterEndOfBookingRange = date => !isInclusivelyBeforeDay(date, END_OF_BOOKING_RANGE_MOMENT);

const isBooked = (bookings, day) => {
  return !!bookings.find(b => {
    const booking = ensureBooking(b);
    const start = booking.attributes.start;
    const end = booking.attributes.end;
    const dayInUTC = day.clone().utc();

    // '[)' means that the range start is inclusive and range end is exclusive
    return dayInUTC.isBetween(moment(start).utc(), moment(end).utc(), null, '[)');
  });
};

const findException = (exceptions, day) => {
  return exceptions.find(exception => {
    const availabilityException = ensureAvailabilityException(exception.availabilityException);
    const start = availabilityException.attributes.start;
    const dayInUTC = day.clone().utc();
    return isSameDay(moment(start).utc(), dayInUTC);
  });
};

const isBlocked = (availabilityPlan, exception, date) => {
  const planEntries = ensureDayAvailabilityPlan(availabilityPlan).entries;
  const planEntry = planEntries.find(
    weekDayEntry => weekDayEntry.dayOfWeek === DAYS_OF_WEEK[date.isoWeekday() - 1]
  );
  const seatsFromPlan = planEntry ? planEntry.seats : 0;

  const seatsFromException =
    exception && ensureAvailabilityException(exception.availabilityException).attributes.seats;

  const seats = exception ? seatsFromException : seatsFromPlan;
  return seats === 0;
};

const dateModifiers = (availabilityPlan, exceptions, bookings, date) => {
  const exception = findException(exceptions, date);

  return {
    isOutsideRange: isOutsideRange(date),
    isSameDay: isSameDay(date, TODAY_MOMENT),
    isBlocked: isBlocked(availabilityPlan, exception, date),
    isBooked: isBooked(bookings, date),
    isInProgress: exception && exception.inProgress,
    isFailed: exception && exception.error,
  };
};

const renderDayContents = (calendar, availabilityPlan) => date => {
  // This component is for day/night based processes. If time-based process is used,
  // you might want to deal with local dates using monthIdString instead of monthIdStringInUTC.
  const { exceptions = [], bookings = [] } = calendar[monthIdStringInUTC(date)] || {};
  const { isOutsideRange, isSameDay, isBlocked, isBooked, isInProgress, isFailed } = dateModifiers(
    availabilityPlan,
    exceptions,
    bookings,
    date
  );

  const dayClasses = classNames(css.default, {
    [css.outsideRange]: isOutsideRange,
    [css.today]: isSameDay,
    [css.blocked]: isBlocked,
    [css.reserved]: isBooked,
    [css.exceptionError]: isFailed,
  });

  return (
    <div className={css.dayWrapper}>
      <span className={dayClasses}>
        {isInProgress ? (
          <IconSpinner rootClassName={css.inProgress} />
        ) : (
          <span className={css.dayNumber}>{date.format('D')}</span>
        )}
      </span>
    </div>
  );
};

const makeDraftException = (exceptions, start, end, seats) => {
  const draft = ensureAvailabilityException({ attributes: { start, end, seats } });
  return { availabilityException: draft };
};

////////////////////////////////
// ManageAvailabilityCalendar //
////////////////////////////////
class ManageAvailabilityCalendar extends Component {
  constructor(props) {
    super(props);

    // DOM refs
    this.dayPickerWrapper = null;
    this.dayPicker = null;

    this.state = {
      currentMonth: moment().startOf('month'),
      focused: true,
      date: null,
    };

    this.fetchMonthData = this.fetchMonthData.bind(this);
    this.onDayAvailabilityChange = this.onDayAvailabilityChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.onMonthClick = this.onMonthClick.bind(this);
  }

  componentDidMount() {
    // Fetch month data if user have navigated to availability tab in EditListingWizard
    this.fetchMonthData(this.state.currentMonth);
    // Fetch next month too.
    this.fetchMonthData(nextMonthFn(this.state.currentMonth));
  }

  fetchMonthData(monthMoment) {
    const { availability, listingId } = this.props;

    // Don't fetch exceptions for past months or too far in the future
    if (isMonthInRange(monthMoment, TODAY_MOMENT, END_OF_RANGE_MOMENT)) {
      // Use "today", if the first day of given month is in the past
      const startMoment = isPast(monthMoment) ? TODAY_MOMENT : monthMoment;
      const start = momentToUTCDate(startMoment);

      // Use END_OF_RANGE_MOMENT, if the first day of the next month is too far in the future
      const nextMonthMoment = nextMonthFn(monthMoment);
      const endMoment = isAfterEndOfRange(nextMonthMoment)
        ? END_OF_RANGE_MOMENT.clone().add(1, 'days')
        : nextMonthMoment;
      const end = momentToUTCDate(endMoment);

      // Fetch AvailabilityExceptions for this month
      availability.onFetchAvailabilityExceptions({ listingId, start, end });

      // Fetch Bookings if the month is within bookable range (180 days)
      if (isMonthInRange(startMoment, TODAY_MOMENT, END_OF_BOOKING_RANGE_MOMENT)) {
        const endMomentForBookings = isAfterEndOfBookingRange(nextMonthMoment)
          ? END_OF_BOOKING_RANGE_MOMENT.clone().add(1, 'days')
          : nextMonthMoment;
        const endForBookings = momentToUTCDate(endMomentForBookings);

        // Fetch Bookings for this month (if they are in pending or accepted state)
        const state = ['pending', 'accepted'].join(',');
        availability.onFetchBookings({ listingId, start, end: endForBookings, state });
      }
    }
  }

  onDayAvailabilityChange(date, seats, exceptions) {
    const { availabilityPlan, listingId } = this.props;
    const { start, end } = dateStartAndEndInUTC(date);

    const planEntries = ensureDayAvailabilityPlan(availabilityPlan).entries;
    const seatsFromPlan = planEntries.find(
      weekDayEntry => weekDayEntry.dayOfWeek === DAYS_OF_WEEK[date.isoWeekday() - 1]
    ).seats;

    const currentException = findException(exceptions, date);
    const draftException = makeDraftException(exceptions, start, end, seatsFromPlan);
    const exception = currentException || draftException;
    const hasAvailabilityException = currentException && currentException.availabilityException.id;

    if (hasAvailabilityException) {
      const id = currentException.availabilityException.id;
      const isResetToPlanSeats = seatsFromPlan === seats;

      if (isResetToPlanSeats) {
        // Delete the exception, if the exception is redundant
        // (it has the same content as what user has in the plan).
        this.props.availability.onDeleteAvailabilityException({
          id,
          currentException: exception,
          seats: seatsFromPlan,
        });
      } else {
        // If availability exception exists, delete it first and then create a new one.
        // NOTE: currently, API does not support update (only deleting and creating)
        this.props.availability
          .onDeleteAvailabilityException({ id, currentException: exception, seats: seatsFromPlan })
          .then(r => {
            const params = { listingId, start, end, seats, currentException: exception };
            this.props.availability.onCreateAvailabilityException(params);
          });
      }
    } else {
      // If there is no existing AvailabilityExceptions, just create a new one
      const params = { listingId, start, end, seats, currentException: exception };
      this.props.availability.onCreateAvailabilityException(params);
    }
  }

  onDateChange(date) {
    this.setState({ date });

    const { availabilityPlan, availability } = this.props;
    const calendar = availability.calendar;
    // This component is for day/night based processes. If time-based process is used,
    // you might want to deal with local dates using monthIdString instead of monthIdStringInUTC.
    const { exceptions = [], bookings = [] } = calendar[monthIdStringInUTC(date)] || {};
    const { isPast, isBlocked, isBooked, isInProgress } = dateModifiers(
      availabilityPlan,
      exceptions,
      bookings,
      date
    );

    if (isBooked || isPast || isInProgress) {
      // Cannot allow or block a reserved or a past date or inProgress
      return;
    } else if (isBlocked) {
      // Unblock the date (seats = 1)
      this.onDayAvailabilityChange(date, 1, exceptions);
    } else {
      // Block the date (seats = 0)
      this.onDayAvailabilityChange(date, 0, exceptions);
    }
  }

  onFocusChange() {
    // Force the state.focused to always be truthy so that date is always selectable
    this.setState({ focused: true });
  }

  onMonthClick(monthFn) {
    const onMonthChanged = this.props.onMonthChanged;
    this.setState(
      prevState => ({ currentMonth: monthFn(prevState.currentMonth) }),
      () => {
        // Callback function after month has been updated.
        // react-dates component has next and previous months ready (but inivisible).
        // we try to populate those invisible months before user advances there.
        this.fetchMonthData(monthFn(this.state.currentMonth));

        // If previous fetch for month data failed, try again.
        const monthId = monthIdString(this.state.currentMonth);
        const currentMonthData = this.props.availability.calendar[monthId];
        const { fetchExceptionsError, fetchBookingsError } = currentMonthData || {};
        if (currentMonthData && (fetchExceptionsError || fetchBookingsError)) {
          this.fetchMonthData(this.state.currentMonth);
        }

        // Call onMonthChanged function if it has been passed in among props.
        if (onMonthChanged) {
          onMonthChanged(monthIdString(this.state.currentMonth));
        }
      }
    );
  }

  render() {
    const {
      className,
      rootClassName,
      listingId,
      availability,
      availabilityPlan,
      onMonthChanged,
      monthFormat,
      ...rest
    } = this.props;
    const { focused, date, currentMonth } = this.state;
    const { clientWidth: width } = this.dayPickerWrapper || { clientWidth: 0 };
    const hasWindow = typeof window !== 'undefined';
    const windowWidth = hasWindow ? window.innerWidth : 0;

    const daySize = dayWidth(width, windowWidth);
    const calendarGridWidth = daySize * TABLE_COLUMNS + TABLE_BORDER;

    const calendar = availability.calendar;
    const currentMonthData = calendar[monthIdString(currentMonth)];
    const {
      fetchExceptionsInProgress,
      fetchBookingsInProgress,
      fetchExceptionsError,
      fetchBookingsError,
    } = currentMonthData || {};
    const isMonthDataFetched =
      !isMonthInRange(currentMonth, TODAY_MOMENT, END_OF_RANGE_MOMENT) ||
      (!!currentMonthData && !fetchExceptionsInProgress && !fetchBookingsInProgress);

    const monthName = currentMonth.format('MMMM');
    const classes = classNames(rootClassName || css.root, className);

    return (
      <div
        className={classes}
        ref={c => {
          this.dayPickerWrapper = c;
        }}
      >
        {width > 0 ? (
          <div style={{ width: `${calendarGridWidth}px` }}>
            <DayPickerSingleDateController
              {...rest}
              ref={c => {
                this.dayPicker = c;
              }}
              numberOfMonths={1}
              navPrev={<IconArrowHead direction="left" />}
              navNext={<IconArrowHead direction="right" />}
              weekDayFormat="ddd"
              daySize={daySize}
              renderDayContents={renderDayContents(calendar, availabilityPlan)}
              focused={focused}
              date={date}
              onDateChange={this.onDateChange}
              onFocusChange={this.onFocusChange}
              onPrevMonthClick={() => this.onMonthClick(prevMonthFn)}
              onNextMonthClick={() => this.onMonthClick(nextMonthFn)}
              hideKeyboardShortcutsPanel
              horizontalMonthPadding={9}
              renderMonthElement={({ month }) => (
                <div className={css.monthElement}>
                  <span className={css.monthString}>{month.format(monthFormat)}</span>
                  {!isMonthDataFetched ? <IconSpinner rootClassName={css.monthInProgress} /> : null}
                </div>
              )}
            />
          </div>
        ) : null}
        <div className={css.legend} style={{ width: `${calendarGridWidth}px` }}>
          <div className={css.legendRow}>
            <span className={css.legendAvailableColor} />
            <span className={css.legendText}>
              <FormattedMessage id="EditListingAvailabilityForm.availableDay" />
            </span>
          </div>
          <div className={css.legendRow}>
            <span className={css.legendBlockedColor} />
            <span className={css.legendText}>
              <FormattedMessage id="EditListingAvailabilityForm.blockedDay" />
            </span>
          </div>
          <div className={css.legendRow}>
            <span className={css.legendReservedColor} />
            <span className={css.legendText}>
              <FormattedMessage id="EditListingAvailabilityForm.bookedDay" />
            </span>
          </div>
        </div>
        {fetchExceptionsError && fetchBookingsError ? (
          <p className={css.error}>
            <FormattedMessage
              id="EditListingAvailabilityForm.fetchMonthDataFailed"
              values={{ month: monthName }}
            />
          </p>
        ) : null}
      </div>
    );
  }
}

ManageAvailabilityCalendar.defaultProps = {
  className: null,
  rootClassName: null,

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  isDayBlocked: () => false,
  isOutsideRange,
  isDayHighlighted: () => false,
  enableOutsideDays: true,

  // calendar presentation and interaction related props
  orientation: HORIZONTAL_ORIENTATION,
  withPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  onOutsideClick() {},
  keepOpenOnDateSelect: false,
  renderCalendarInfo: null,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},

  // internationalization
  monthFormat: 'MMMM YYYY',
  onMonthChanged: null,
};

ManageAvailabilityCalendar.propTypes = {
  className: string,
  rootClassName: string,
  availability: shape({
    calendar: object.isRequired,
    onFetchAvailabilityExceptions: func.isRequired,
    onFetchBookings: func.isRequired,
    onDeleteAvailabilityException: func.isRequired,
    onCreateAvailabilityException: func.isRequired,
  }).isRequired,
  availabilityPlan: propTypes.availabilityPlan.isRequired,
  onMonthChanged: func,
};

export default ManageAvailabilityCalendar;
