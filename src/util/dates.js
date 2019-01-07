import moment from 'moment';

/**
 * Input names for the DateRangePicker from react-dates.
 */
export const START_DATE = 'startDate';
export const END_DATE = 'endDate';

/**
 * Check that the given parameter is a Date object.
 *
 * @param {Date} object that should be a Date.
 *
 * @returns {boolean} true if given parameter is a Date object.
 */
export const isDate = d =>
  d && Object.prototype.toString.call(d) === '[object Date]' && !Number.isNaN(d.getTime());

/**
 * Check if the given parameters represent the same Date value (timestamps are compared)
 *
 * @param {Date} first param that should be a Date and it should have same timestamp as second param.
 * @param {Date} second param that should be a Date and it should have same timestamp as second param.
 *
 * @returns {boolean} true if given parameters have the same timestamp.
 */
export const isSameDate = (a, b) => a && isDate(a) && b && isDate(b) && a.getTime() === b.getTime();

/**
 * Convert date given by API to something meaningful noon on browser's timezone
 * So, what happens is that date given by client
 * ("Fri Mar 30 2018 12:00:00 GMT-1100 (SST)" aka "Fri Mar 30 2018 23:00:00 GMT+0000 (UTC)")
 * will be read as UTC time. Then API normalizes night/day bookings to
 * start from 00:00 UTC (i.e. discards hours from UTC day).
 * So Api gives 00:00 UTC which (in our example) would be locally
 * "Thu Mar 29 2018 13:00:00 GMT-1100 (SST)".
 *
 * The resulting timestamp from API is:
 * localTimestamp.subtract(12h).add(timezoneoffset) (in eg. -23 h)
 *
 * So, this function adds those removed hours back.
 *
 * @param {Date} date is a local date object
 *
 * @returns {Date} date (given by API as UTC 00:00) converted back to local noon.
 */
export const dateFromAPIToLocalNoon = date => {
  const timezoneDiffInMinutes = moment(date).utcOffset();
  // Example timezone SST:
  // We get a Fri 00:00 UTC aka "Thu Mar 29 2018 13:00:00 GMT-1100 (SST)"
  // We need to subtract timezone difference (-11h), effectively adding 11h - to get to correct date
  const momentInLocalTimezone = moment(date).subtract(timezoneDiffInMinutes, 'minutes');
  // To be on the safe zone with leap seconds and stuff when using day / night picker
  // we'll add 12 h to get to the noon of day in local timezone.
  return momentInLocalTimezone.add(12, 'hours').toDate();
};

/**
 * Convert local date for API.
 * Date given by browser
 * ("Fri Mar 30 2018 12:00:00 GMT-1100 (SST)" aka "Fri Mar 30 2018 23:00:00 GMT+0000 (UTC)")
 * must be modified so that API will get correct moment also in UTC.
 * We achieve this by adding timezone offset to local date / timestamp.
 *
 * The resulting timestamp for the API is:
 * localTimestamp.add(timezoneoffset)
 * In eg. Fri Mar 30 2018 23:00:00 GMT-1100 (SST) aka "Fri Mar 30 2018 12:00:00 GMT+0000 (UTC)"
 *
 * @param {Date} date is a local date object
 *
 * @returns {Date} date (given by API as UTC 00:00) converted back to local noon.
 */
export const dateFromLocalToAPI = date => {
  const timezoneDiffInMinutes = moment(date).utcOffset();
  const momentInLocalTimezone = moment(date).add(timezoneDiffInMinutes, 'minutes');

  return momentInLocalTimezone.toDate();
};

/**
 * Calculate the number of nights between the given dates
 *
 * @param {Date} startDate start of the time period
 * @param {Date} endDate end of the time period
 *
 * @throws Will throw if the end date is before the start date
 * @returns {Number} number of nights between the given dates
 */
export const nightsBetween = (startDate, endDate) => {
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
export const daysBetween = (startDate, endDate) => {
  const days = moment(endDate).diff(startDate, 'days');
  if (days < 0) {
    throw new Error('End date cannot be before start date');
  }
  return days;
};

/**
 * Format the given date
 *
 * @param {Date} date to be formatted
 *
 * @returns {String} formatted month string
 */
export const monthIdString = date => moment(date).format('YYYY-MM');

/**
 * Format the given date
 *
 * @param {Object} intl Intl object from react-intl
 * @param {String} todayString translation for the current day
 * @param {Date} d Date to be formatted
 *
 * @returns {String} formatted date
 */
export const formatDate = (intl, todayString, d) => {
  const paramsValid = intl && d instanceof Date && typeof todayString === 'string';
  if (!paramsValid) {
    throw new Error(`Invalid params for formatDate: (${intl}, ${todayString}, ${d})`);
  }
  const now = moment(intl.now());
  const formattedTime = intl.formatTime(d);
  let formattedDate;

  if (now.isSame(d, 'day')) {
    // e.g. "Today, 9:10pm"
    formattedDate = todayString;
  } else if (now.isSame(d, 'week')) {
    // e.g. "Wed, 8:00pm"
    formattedDate = intl.formatDate(d, {
      weekday: 'short',
    });
  } else if (now.isSame(d, 'year')) {
    // e.g. "Aug 22, 7:40pm"
    formattedDate = intl.formatDate(d, {
      month: 'short',
      day: 'numeric',
    });
  } else {
    // e.g. "Jul 17 2016, 6:02pm"
    const date = intl.formatDate(d, {
      month: 'short',
      day: 'numeric',
    });
    const year = intl.formatDate(d, {
      year: 'numeric',
    });
    formattedDate = `${date} ${year}`;
  }

  return `${formattedDate}, ${formattedTime}`;
};
