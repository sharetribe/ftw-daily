/**
 * This component will show the booking info and calculated total price.
 * I.e. dates and other details related to payment decision in receipt format.
 */
import React, { PropTypes } from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import Decimal from 'decimal.js';
import classNames from 'classnames';
import config from '../../config';
import { convertMoneyToNumber } from '../../util/currency';
import * as propTypes from '../../util/propTypes';
import { nightsBetween } from '../../util/dates';

import css from './BookingBreakdown.css';

export const BookingBreakdownComponent = props => {
  const {
    rootClassName,
    className,
    bookingStart,
    bookingEnd,
    unitPrice,
    commission,
    totalPrice,
    intl,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const hasSelectedNights = bookingStart && bookingEnd;

  // If there's not enough info, render an empty container
  if (!hasSelectedNights) {
    return <div className={classes} />;
  }

  const bookingPeriod = (
    <FormattedMessage
      id="BookingBreakdown.bookingPeriod"
      values={{
        bookingStart: intl.formatDate(bookingStart),
        bookingEnd: intl.formatDate(bookingEnd),
      }}
    />
  );

  const nightCount = nightsBetween(bookingStart, bookingEnd);
  const nightCountMessage = (
    <FormattedMessage id="BookingBreakdown.nightCount" values={{ count: nightCount }} />
  );

  const currencyConfig = config.currencyConfig;
  const subUnitDivisor = currencyConfig.subUnitDivisor;

  const unitPriceAsNumber = convertMoneyToNumber(unitPrice, subUnitDivisor);
  const formattedUnitPrice = intl.formatNumber(unitPriceAsNumber, currencyConfig);

  // If commission is passed it will be shown as a fee already reduces from the total price
  const commissionAsNumber = commission ? convertMoneyToNumber(commission, subUnitDivisor) : 0;
  const formattedCommission = commission
    ? intl.formatNumber(new Decimal(commissionAsNumber).negated().toNumber(), currencyConfig)
    : null;

  const commissionInfo = (
    <div className={css.row}>
      <div className={css.commissionLabel}>
        <FormattedMessage id="BookingBreakdown.commission" />
      </div>
      <div className={css.commission}>
        {formattedCommission}
      </div>
    </div>
  );

  // Total price can be given (when it comes from API)
  // or calculated: sub total - commission
  const totalPriceAsNumber = totalPrice ? convertMoneyToNumber(totalPrice, subUnitDivisor) : 0;
  const formattedTotalPrice = totalPriceAsNumber
    ? intl.formatNumber(totalPriceAsNumber, currencyConfig)
    : null;

  return (
    <div className={classes}>
      <div className={css.row}>
        <div className={css.priceUnitLabel}>
          <FormattedMessage id="BookingBreakdown.pricePerDay" />
        </div>
        <div className={css.priceUnitPrice}>
          {formattedUnitPrice}
        </div>
      </div>
      <div className={css.row}>
        <div className={css.bookingPeriodLabel}>
          {bookingPeriod}
        </div>
        <div className={css.bookedDatesCount}>
          {nightCountMessage}
        </div>
      </div>
      {commission ? commissionInfo : null}
      <hr className={css.totalDivider} />
      <div className={css.row}>
        <div className={css.totalLabel}>
          <FormattedMessage id="BookingBreakdown.total" />
        </div>
        <div className={css.totalPrice}>
          {formattedTotalPrice}
        </div>
      </div>
    </div>
  );
};

BookingBreakdownComponent.defaultProps = {
  rootClassName: null,
  className: null,
  bookingStart: null,
  bookingEnd: null,
  unitPrice: null,
  commission: null,
  totalPrice: null,
};

const { string, instanceOf } = PropTypes;

BookingBreakdownComponent.propTypes = {
  rootClassName: string,
  className: string,

  bookingStart: instanceOf(Date),
  bookingEnd: instanceOf(Date),

  unitPrice: propTypes.money,
  commission: propTypes.money,
  totalPrice: propTypes.money,

  // from injectIntl
  intl: intlShape.isRequired,
};

const BookingBreakdown = injectIntl(BookingBreakdownComponent);

BookingBreakdown.displayName = 'BookingBreakdown';

export default BookingBreakdown;
