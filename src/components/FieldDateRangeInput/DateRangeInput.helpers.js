import moment from 'moment';
import { isSameDay, isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';

import { ensureTimeSlot } from '../../util/data';
import { START_DATE, END_DATE, dateFromAPIToLocalNoon, isInRange } from '../../util/dates';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, TIME_SLOT_DAY } from '../../util/types';
import config from '../../config';

// Checks if time slot (propTypes.timeSlot) start time equals a day (moment)
const timeSlotEqualsDay = (timeSlot, day) => {
  // if (ensureTimeSlot(timeSlot).attributes.type === TIME_SLOT_DAY) {
  //   // Time slots describe available dates by providing a start and
  //   // an end date which is the following day. In the single date picker
  //   // the start date is used to represent available dates.
  const localStartDate = timeSlot.attributes.start;
  const localEndDate = timeSlot.attributes.end;

  return isInRange(day, localStartDate, localEndDate, 'day')
  // } else {
  //   return false;
  // }
};

/**
 * Return a boolean indicating if given date can be found in an array
 * of tile slots (start dates).
 */
const timeSlotsContain = (timeSlots, date) => {
  return timeSlots.findIndex(slot => timeSlotEqualsDay(slot, date)) > -1;
};

const findFirstInvalid = (slots, day, seats, asc = true) => {
  const invalidSlots = slots.filter(timeSlot => timeSlot.attributes.seats < seats);
  const matchedSlot = invalidSlots.find(({attributes: {start}}) => {
    const s = moment(start);
    return asc ? s.isAfter(day) : s.isBefore(day);
  });

  return matchedSlot ? matchedSlot.attributes.start : null;
};

/**
 * Find first blocked date between two dates.
 * If none is found, null is returned.
 *
 * @param {Array} timeSlots propTypes.timeSlot objects
 * @param {Moment} startDate start date, exclusive
 * @param {Moment} endDate end date, exclusive
 */
const firstBlockedBetween = (timeSlots, startDate, endDate, seats) => {
  const firstDate = moment(startDate).add(1, 'days');
  if (firstDate.isSame(endDate, 'date')) {
    return null;
  }

  const closestInvalidDateMaybe = seats && findFirstInvalid(timeSlots, startDate, seats);
  const closestInvalidDateStart = closestInvalidDateMaybe ? moment(closestInvalidDateMaybe).startOf('day') : null;
  const firstBlocked = timeSlotsContain(timeSlots, firstDate)
    ? firstBlockedBetween(timeSlots, firstDate, endDate, seats)
    : firstDate;

  return closestInvalidDateStart && moment(closestInvalidDateStart).isBefore(firstBlocked) ? closestInvalidDateStart : firstBlocked;
};

/**
 * Find last blocked date between two dates.
 * If none is found, null is returned.
 *
 * @param {Array} timeSlots propTypes.timeSlot objects
 * @param {Moment} startDate start date, exclusive
 * @param {Moment} endDate end date, exclusive
 */
const lastBlockedBetween = (timeSlots, startDate, endDate, seats) => {
  const previousDate = moment(endDate).subtract(1, 'days');
  if (previousDate.isSame(startDate, 'date')) {
    return null;
  }
  const closestInvalidDateMaybe = seats && findFirstInvalid(timeSlots, endDate, seats, false);

  const closestInvalidDateStart = closestInvalidDateMaybe ? moment(closestInvalidDateMaybe).startOf('day') : null;
  const firstBlocked = timeSlotsContain(timeSlots, previousDate)
    ? lastBlockedBetween(timeSlots, previousDate, startDate, seats)
    : previousDate;
  return closestInvalidDateStart && moment(closestInvalidDateStart).isAfter(firstBlocked) ? closestInvalidDateStart : firstBlocked;
};

/**
 * Check if a blocked date can be found between two dates.
 *
 * @param {Array} timeSlots propTypes.timeSlot objects
 * @param {Moment} startDate start date, exclusive
 * @param {Moment} endDate end date, exclusive
 */
export const isBlockedBetween = (timeSlots, startDate, endDate) =>
  !!firstBlockedBetween(timeSlots, startDate, endDate);

export const isStartDateSelected = (timeSlots, startDate, endDate, focusedInput) =>
  timeSlots && startDate && (!endDate || focusedInput === END_DATE) && focusedInput !== START_DATE;

export const isSelectingEndDateNightly = (timeSlots, startDate, endDate, focusedInput, unitType) =>
  timeSlots && !startDate && !endDate && focusedInput === END_DATE && unitType === LINE_ITEM_NIGHT;

export const apiEndDateToPickerDate = (unitType, endDate) => {
  const isValid = endDate instanceof Date;
  const isDaily = unitType === LINE_ITEM_DAY;

  if (!isValid) {
    return null;
  } else if (isDaily) {
    // API end dates are exlusive, so we need to shift them with daily
    // booking.
    return moment(endDate).subtract(1, 'days');
  } else {
    return moment(endDate);
  }
};

export const apiEndDateToPickerDateForDaily = endDate => {
  const isValid = endDate instanceof Date;

  if (!isValid) {
    return null;
  }

  return moment(endDate).subtract(1, 'days');
};

export const pickerEndDateToApiDate = (unitType, endDate) => {
  const isValid = endDate instanceof moment;
  const isDaily = unitType === LINE_ITEM_DAY;

  if (!isValid) {
    return null;
  } else if (isDaily) {
    // API end dates are exlusive, so we need to shift them with daily
    // booking.
    return endDate.add(1, 'days').toDate();
  } else {
    return endDate.toDate();
  }
};

export const pickerEndDateToApiDateForDaily = endDate => {
  const isValid = endDate instanceof moment;

  if (!isValid) {
    return null;
  }

  return endDate.add(1, 'days').toDate();
};

const invalidDaySlot = (day, timeSlots, seats) => {
  return timeSlots.find(timeSlot => moment(timeSlot.attributes.start).isSame(day, 'day') && timeSlot.attributes.seats < seats);
}

/**
 * Returns an isDayBlocked function that can be passed to
 * a react-dates DateRangePicker component.
 */
export const isDayBlockedFn = (timeSlots, startDate, endDate, focusedInput, unitType, seats) => {
  const endOfRange = config.dayCountAvailableForBooking - 1;
  const lastBookableDate = moment().add(endOfRange, 'days');

  // start date selected, end date missing
  const startDateSelected = isStartDateSelected(timeSlots, startDate, endDate, focusedInput);

  // find the next booking after a start date
  const nextBookingStarts = startDateSelected
    ? firstBlockedBetween(timeSlots, startDate, moment(lastBookableDate).add(1, 'days'))
    : null;

  // end date is focused but no dates are selected
  const selectingEndDate = isSelectingEndDateNightly(
    timeSlots,
    startDate,
    endDate,
    focusedInput,
    unitType
  );

  if (selectingEndDate) {
    // if end date is being selected first, block the day after a booked date
    // (as a booking can end on the day the following booking starts)
    return day => !!invalidDaySlot(moment(day).subtract(1, 'days'), timeSlots, seats) ||
      !timeSlots.find(timeSlot => timeSlotEqualsDay(timeSlot, moment(day).subtract(1, 'days')));
  } else if (nextBookingStarts || !timeSlots) {
    // a next booking is found or time slots are not provided
    // -> booking range handles blocking dates
    return () => false;
  } else {
    // otherwise return standard timeslots check
    return day => !!invalidDaySlot(day, timeSlots, seats) || !timeSlots.find(timeSlot => timeSlotEqualsDay(timeSlot, day));
  }
};

/**
 * Returns an isOutsideRange function that can be passed to
 * a react-dates DateRangePicker component.
 */
export const isOutsideRangeFn = (timeSlots, startDate, endDate, focusedInput, unitType, seats) => {
  const endOfRange = config.dayCountAvailableForBooking - 1;
  const lastBookableDate = moment().add(endOfRange, 'days');

  // start date selected, end date missing
  const startDateSelected = isStartDateSelected(timeSlots, startDate, endDate, focusedInput);
  const nextBookingStarts = startDateSelected
    ? firstBlockedBetween(timeSlots, startDate, moment(lastBookableDate).add(1, 'days'), seats)
    : null;

  if (nextBookingStarts) {
    // end the range so that the booking can end at latest on
    // nightly booking: the day the next booking starts
    // daily booking: the day before the next booking starts
    return day => {
      const lastDayToEndBooking = apiEndDateToPickerDateForDaily(nextBookingStarts.toDate());

      return (
        !isInclusivelyAfterDay(day, startDate) ||
        !isInclusivelyBeforeDay(day, lastDayToEndBooking)
      );
    };
  }

  // end date selected, start date missing
  // -> limit the earliest start date for the booking so that it
  // needs to be after the previous booked date
  const endDateSelected = timeSlots && endDate && !startDate
  // && focusedInput !== END_DATE;
  const previousBookedDate = endDateSelected
    ? lastBlockedBetween(timeSlots, moment(), endDate, seats)
    : null;

  if (previousBookedDate) {
    return day => {
      const firstDayToStartBooking = moment(previousBookedDate).add(1, 'days');
      return (
        !isInclusivelyAfterDay(day, firstDayToStartBooking) ||
        !isInclusivelyBeforeDay(day, lastBookableDate)
      );
    };
  }

  // standard isOutsideRange function
  return day => {
    return (
      !isInclusivelyAfterDay(day, moment()) ||
      !isInclusivelyBeforeDay(day, moment().add(endOfRange, 'days'))
    );
  };
};
