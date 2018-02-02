import React from 'react';
import { FormattedMessage, FormattedHTMLMessage, FormattedDate } from 'react-intl';
import moment from 'moment';
import { LINE_ITEM_NIGHT, propTypes } from '../../util/types';
import { daysBetween } from '../../util/dates';

import css from './BookingBreakdown.css';

const BookingPeriod = props => {
  const { isSingleDay, startDate, endDate } = props;
  const dateFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };

  if (isSingleDay) {
    return <FormattedDate value={startDate} {...dateFormatOptions} />;
  }

  return (
    <FormattedMessage
      id="BookingBreakdown.bookingPeriod"
      values={{
        bookingStart: (
          <span className={css.nowrap}>
            <FormattedDate value={startDate} {...dateFormatOptions} />
          </span>
        ),
        bookingEnd: (
          <span className={css.nowrap}>
            <FormattedDate value={endDate} {...dateFormatOptions} />
          </span>
        ),
      }}
    />
  );
};

const LineItemBookingPeriod = props => {
  const { transaction, booking, unitType } = props;

  const { start: startDate, end: endDateRaw } = booking.attributes;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_NIGHT;

  const dayCount = daysBetween(startDate, endDateRaw);
  const isSingleDay = !isNightly && dayCount === 1;
  const endDay = isNightly ? endDateRaw : moment(endDateRaw).subtract(1, 'days');

  const unitPurchase = transaction.attributes.lineItems.find(
    item => item.code === unitType && !item.reversal
  );

  const dayCountForLineItemUnits = dayCount + 1;
  const count = isNightly || isDaily ? unitPurchase.quantity.toFixed() : dayCountForLineItemUnits;

  const unitCountMessage = (
    <FormattedHTMLMessage
      id={isNightly ? 'BookingBreakdown.nightCount' : 'BookingBreakdown.dayCount'}
      values={{ count }}
    />
  );

  return (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <BookingPeriod isSingleDay={isSingleDay} startDate={startDate} endDate={endDay} />
      </span>
      <span className={css.itemValue}>{unitCountMessage}</span>
    </div>
  );
};

LineItemBookingPeriod.propTypes = {
  transaction: propTypes.transaction.isRequired,
  booking: propTypes.booking.isRequired,
};

export default LineItemBookingPeriod;
