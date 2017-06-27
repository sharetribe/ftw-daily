/**
 * This component will show the booking info and calculated total price.
 * I.e. dates and other details related to payment decision in receipt format.
 */
import React, { PropTypes } from 'react';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import Decimal from 'decimal.js';
import moment from 'moment';
import classNames from 'classnames';
import config from '../../config';
import { convertMoneyToNumber } from '../../util/currency';
import { types } from '../../util/sdkLoader';

import css from './BookingBreakdown.css';

export const BookingBreakdownComponent = props => {
  const {
    bookingStart,
    bookingEnd,
    className,
    commission,
    intl,
    subtotalPrice,
    totalPrice,
    unitPrice,
  } = props;

  const hasSelectedNights = bookingStart && bookingEnd;

  // If there's not enough info, render an empty container
  if (!hasSelectedNights) {
    return <div className={classNames(css.container, className)} />;
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

  // diff gives night count between dates
  const nightCount = moment(bookingEnd).diff(moment(bookingStart), 'days');
  const nightCountMessage = (
    <FormattedMessage id="BookingBreakdown.nightCount" values={{ count: nightCount }} />
  );

  const currencyConfig = config.currencyConfig;
  const subUnitDivisor = currencyConfig.subUnitDivisor;

  const unitPriceAsNumber = convertMoneyToNumber(unitPrice, subUnitDivisor);
  const formattedUnitPrice = intl.formatNumber(unitPriceAsNumber, currencyConfig);

  // Subtotal price can be given (when it comes from API)
  // or calculated: unit price * booked nights
  const subtotalPriceAsNumber = subtotalPrice
    ? convertMoneyToNumber(subtotalPrice, subUnitDivisor)
    : new Decimal(unitPriceAsNumber).times(nightCount).toNumber();
  const formattedSubtotal = commission
    ? intl.formatNumber(subtotalPriceAsNumber, currencyConfig)
    : null;

  // If commission is passed it will be reduced from sub total.
  const commissionAsNumber = commission ? convertMoneyToNumber(commission, subUnitDivisor) : 0;
  const formattedCommission = commission
    ? intl.formatNumber(new Decimal(commissionAsNumber).negated().toNumber(), currencyConfig)
    : null;

  // Total price can be given (when it comes from API)
  // or calculated: sub total - commission
  const totalPriceAsNumber = totalPrice
    ? convertMoneyToNumber(totalPrice, subUnitDivisor)
    : new Decimal(subtotalPriceAsNumber).minus(commissionAsNumber).toNumber();
  const formattedTotalPrice = totalPriceAsNumber
    ? intl.formatNumber(totalPriceAsNumber, currencyConfig)
    : null;

  // Sub total is shown if commission is given
  const subtotalInfo = commission
    ? <div className={css.row}>
        <div className={css.subtotalLabel}>
          <FormattedMessage id="BookingBreakdown.subtotal" />
        </div>
        <div className={css.subtotal}>
          {formattedSubtotal}
        </div>
      </div>
    : null;

  const commissionInfo = commission
    ? <div className={css.row}>
        <div className={css.commissionLabel}>
          <FormattedMessage id="BookingBreakdown.commission" values={{ marketplace: 'Saunatime' }} />
        </div>
        <div className={css.commission}>
          {formattedCommission}
        </div>
      </div>
    : null;

  return (
    <div className={classNames(css.container, className)}>
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
      {subtotalInfo}
      {commissionInfo}
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
  bookingStart: null,
  bookingEnd: null,
  className: '',
  subtotalPrice: null,
  totalPrice: null,
  commission: null,
};

const { instanceOf, string } = PropTypes;

BookingBreakdownComponent.propTypes = {
  bookingStart: instanceOf(Date),
  bookingEnd: instanceOf(Date),
  className: string,
  commission: instanceOf(types.Money),
  intl: intlShape.isRequired,
  subtotalPrice: instanceOf(types.Money),
  totalPrice: instanceOf(types.Money),
  unitPrice: instanceOf(types.Money).isRequired,
};

const BookingBreakdown = injectIntl(BookingBreakdownComponent);

BookingBreakdown.displayName = 'BookingBreakdown';

export default BookingBreakdown;
