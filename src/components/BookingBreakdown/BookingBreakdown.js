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
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id="BookingBreakdown.commission" />
      </span>
      <span className={css.itemValue}>{formattedCommission}</span>
    </div>
  );

  const totalPriceAsNumber = convertMoneyToNumber(totalPrice, subUnitDivisor);
  const formattedTotalPrice = totalPriceAsNumber
    ? intl.formatNumber(totalPriceAsNumber, currencyConfig)
    : null;

  return (
    <div className={classes}>
      <div className={css.lineItem}>
        <span className={css.itemLabel}>
          <FormattedMessage id="BookingBreakdown.pricePerNight" />
        </span>
        <span className={css.itemValue}>{formattedUnitPrice}</span>
      </div>
      <div className={css.lineItem}>
        <span className={css.itemLabel}>
          {bookingPeriod}
        </span>
        <span className={css.itemValue}>{nightCountMessage}</span>
      </div>
      {commission ? commissionInfo : null}
      <hr className={css.totalDivider} />
      <div className={css.lineItem}>
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
  commission: null,
};

const { string, instanceOf } = PropTypes;

BookingBreakdownComponent.propTypes = {
  rootClassName: string,
  className: string,

  bookingStart: instanceOf(Date).isRequired,
  bookingEnd: instanceOf(Date).isRequired,

  unitPrice: propTypes.money.isRequired,
  totalPrice: propTypes.money.isRequired,
  commission: propTypes.money,

  // from injectIntl
  intl: intlShape.isRequired,
};

const BookingBreakdown = injectIntl(BookingBreakdownComponent);

BookingBreakdown.displayName = 'BookingBreakdown';

export default BookingBreakdown;
