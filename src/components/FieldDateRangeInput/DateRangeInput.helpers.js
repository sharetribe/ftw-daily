import moment from 'moment';
import { isSameDay, isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';

import { ensureTimeSlot } from '../../util/data';
import { START_DATE, END_DATE, dateFromAPIToLocalNoon } from '../../util/dates';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, TIME_SLOT_DAY } from '../../util/types';
import config from '../../config';

// Checks if time slot (propTypes.timeSlot) start time equals a day (moment)
const timeSlotEqualsDay = (timeSlot, day) => {
  if (ensureTimeSlot(timeSlot).attributes.type === TIME_SLOT_DAY) {
    // Time slots describe available dates by providing a start and
    // an end date which is the following day. In the single date picker
    // the start date is used to represent available dates.
    const localStartDate = dateFromAPIToLocalNoon(timeSlot.attributes.start);

    return isSameDay(day, moment(localStartDate));
  } else {
    return false;
  }
};

/**
 * Return a boolean indicating if given date can be found in an array
 * of tile slots (start dates).
 */
const timeSlotsContain = (timeSlots, date) => {
  return timeSlots.findIndex(slot => timeSlotEqualsDay(slot, date)) > -1;
};

/**
 * Find first blocked date between two dates.
 * If none is found, null is returned.
 *
 * @param {Array} timeSlots propTypes.timeSlot objects
 * @param {Moment} startDate start date, exclusive
 * @param {Moment} endDate end date, exclusive
 */
const firstBlockedBetween = (timeSlots, startDate, endDate) => {
  const firstDate = moment(startDate).add(1, 'days');
  if (firstDate.isSame(endDate, 'date')) {
    return null;
  }

  return timeSlotsContain(timeSlots, firstDate)
    ? firstBlockedBetween(timeSlots, firstDate, endDate)
    : firstDate;
};

/**
 * Find last blocked date between two dates.
 * If none is found, null is returned.
 *
 * @param {Array} timeSlots propTypes.timeSlot objects
 * @param {Moment} startDate start date, exclusive
 * @param {Moment} endDate end date, exclusive
 */
const lastBlockedBetween = (timeSlots, startDate, endDate) => {
  const previousDate = moment(endDate).subtract(1, 'days');
  if (previousDate.isSame(startDate, 'date')) {
    return null;
  }

  return timeSlotsContain(timeSlots, previousDate)
    ? lastBlockedBetween(timeSlots, startDate, previousDate)
    : previousDate;
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

/**
 * Returns an isDayBlocked function that can be passed to
 * a react-dates DateRangePicker component.
 */
export const isDayBlockedFn = (timeSlots, startDate, endDate, focusedInput, unitType) => {
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
    return day =>
      !timeSlots.find(timeSlot => timeSlotEqualsDay(timeSlot, moment(day).subtract(1, 'days')));
  } else if (nextBookingStarts || !timeSlots) {
    // a next booking is found or time slots are not provided
    // -> booking range handles blocking dates
    return () => false;
  } else {
    // otherwise return standard timeslots check
    return day => !timeSlots.find(timeSlot => timeSlotEqualsDay(timeSlot, day));
  }
};

/**
 * Returns an isOutsideRange function that can be passed to
 * a react-dates DateRangePicker component.
 */
export const isOutsideRangeFn = (timeSlots, startDate, endDate, focusedInput, unitType) => {
  const endOfRange = config.dayCountAvailableForBooking - 1;
  const lastBookableDate = moment().add(endOfRange, 'days');

  // start date selected, end date missing
  const startDateSelected = isStartDateSelected(timeSlots, startDate, endDate, focusedInput);
  const nextBookingStarts = startDateSelected
    ? firstBlockedBetween(timeSlots, startDate, moment(lastBookableDate).add(1, 'days'))
    : null;

  if (nextBookingStarts) {
    // end the range so that the booking can end at latest on
    // nightly booking: the day the next booking starts
    // daily booking: the day before the next booking starts
    return day => {
      const lastDayToEndBooking = apiEndDateToPickerDate(unitType, nextBookingStarts.toDate());

      return (
        !isInclusivelyAfterDay(day, startDate) || !isInclusivelyBeforeDay(day, lastDayToEndBooking)
      );
    };
  }

  // end date selected, start date missing
  // -> limit the earliest start date for the booking so that it
  // needs to be after the previous booked date
  const endDateSelected = timeSlots && endDate && !startDate && focusedInput !== END_DATE;
  const previousBookedDate = endDateSelected
    ? lastBlockedBetween(timeSlots, moment(), endDate)
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
