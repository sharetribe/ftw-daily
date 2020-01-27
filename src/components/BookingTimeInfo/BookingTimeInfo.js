import React from 'react';
import moment from 'moment';
import { bool } from 'prop-types';
import classNames from 'classnames';
import { txIsEnquired } from '../../util/transaction';
import { dateFromAPIToLocalNoon, daysBetween, formatDateToText } from '../../util/dates';
import { injectIntl, intlShape } from '../../util/reactIntl';
import {
  LINE_ITEM_DAY,
  LINE_ITEM_NIGHT,
  LINE_ITEM_UNITS,
  DATE_TYPE_DATE,
  DATE_TYPE_DATETIME,
  propTypes,
} from '../../util/types';

import css from './BookingTimeInfo.css';

const bookingData = (unitType, tx, isOrder, intl) => {
  // Attributes: displayStart and displayEnd can be used to differentiate shown time range
  // from actual start and end times used for availability reservation. It can help in situations
  // where there are preparation time needed between bookings.
  // Read more: https://www.sharetribe.com/api-reference/marketplace.html#bookings
  const { start, end, displayStart, displayEnd } = tx.booking.attributes;
  const startDate = dateFromAPIToLocalNoon(displayStart || start);
  const endDateRaw = dateFromAPIToLocalNoon(displayEnd || end);
  const isDaily = unitType === LINE_ITEM_DAY;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isUnits = unitType === LINE_ITEM_UNITS;
  const isSingleDay = !isNightly && daysBetween(startDate, endDateRaw) <= 1;
  const bookingStart = formatDateToText(intl, startDate);
  // Shift the exclusive API end date with daily bookings
  const endDate =
    isDaily || isUnits
      ? moment(endDateRaw)
          .subtract(1, 'days')
          .toDate()
      : endDateRaw;
  const bookingEnd = formatDateToText(intl, endDate);
  return { bookingStart, bookingEnd, isSingleDay };
};

const BookingTimeInfoComponent = props => {
  const { bookingClassName, isOrder, intl, tx, unitType, dateType } = props;
  const isEnquiry = txIsEnquired(tx);

  if (isEnquiry) {
    return null;
  }

  const bookingTimes = bookingData(unitType, tx, isOrder, intl);

  const { bookingStart, bookingEnd, isSingleDay } = bookingTimes;

  if (isSingleDay && dateType === DATE_TYPE_DATE) {
    return (
      <div className={classNames(css.bookingInfo, bookingClassName)}>
        <span className={css.dateSection}>{`${bookingStart.date}`}</span>
      </div>
    );
  } else if (dateType === DATE_TYPE_DATE) {
    return (
      <div className={classNames(css.bookingInfo, bookingClassName)}>
        <span className={css.dateSection}>{`${bookingStart.date} -`}</span>
        <span className={css.dateSection}>{`${bookingEnd.date}`}</span>
      </div>
    );
  } else if (isSingleDay && dateType === DATE_TYPE_DATETIME) {
    return (
      <div className={classNames(css.bookingInfo, bookingClassName)}>
        <span className={css.dateSection}>
          {`${bookingStart.date}, ${bookingStart.time} - ${bookingEnd.time}`}
        </span>
      </div>
    );
  } else {
    return (
      <div className={classNames(css.bookingInfo, bookingClassName)}>
        <span className={css.dateSection}>{`${bookingStart.dateAndTime} - `}</span>
        <span className={css.dateSection}>{`${bookingEnd.dateAndTime}`}</span>
      </div>
    );
  }
};

BookingTimeInfoComponent.defaultProps = { dateType: null };

BookingTimeInfoComponent.propTypes = {
  intl: intlShape.isRequired,
  isOrder: bool.isRequired,
  tx: propTypes.transaction.isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
  dateType: propTypes.dateType,
};

const BookingTimeInfo = injectIntl(BookingTimeInfoComponent);

export default BookingTimeInfo;
