const moment = require('moment');

/** Helper functions for handling dates
 * These helper functions are copied from src/util/dates.js
 */

/**
 * Calculate the number of nights between the given dates
 *
 * @param {Date} startDate start of the time period
 * @param {Date} endDate end of the time period
 *
 * @throws Will throw if the end date is before the start date
 * @returns {Number} number of nights between the given dates
 */
exports.nightsBetween = (startDate, endDate) => {
  const nights = moment(endDate).diff(startDate, 'days');
  if (nights < 0) {
    throw new Error('End date cannot be before start date');
  }
  return nights;
};

/**
 * Calculate the number of days between the given dates
 *
 * @param {Date} startDate start of the time period
 * @param {Date} endDate end of the time period. NOTE: with daily
 * bookings, it is expected that this date is the exclusive end date,
 * i.e. the last day of the booking is the previous date of this end
 * date.
 *
 * @throws Will throw if the end date is before the start date
 * @returns {Number} number of days between the given dates
 */
exports.daysBetween = (startDate, endDate) => {
  const days = moment.utc(endDate).diff(moment.utc(startDate), 'days');
  if (days < 0) {
    throw new Error('End date cannot be before start date');
  }

  return days;
};

exports.weeksBetween = (startDate, endDate) => {
  const weeks = moment.utc(endDate).diff(moment.utc(startDate), 'weeks');
  if (weeks < 1) {
    throw new Error('Duration is less than a week');
  }

  return weeks;
};

exports.monthsBetween = (startDate, endDate) => {
  const months = moment.utc(endDate).diff(moment.utc(startDate), 'days') / 30;
  if (months < 1) {
    throw new Error('Duration is less than a month');
  }

  return Math.floor(months);
};

exports.hoursBeetwen = (startDate, endDate) => moment.utc(endDate).diff(moment.utc(startDate), 'hours', true)