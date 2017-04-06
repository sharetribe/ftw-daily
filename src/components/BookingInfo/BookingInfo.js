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
import css from './BookingInfo.css';

const BookingInfoComponent = props => {
  const { bookingStart, bookingEnd, className, intl, unitPrice } = props;

  const hasSelectedDays = bookingStart && bookingEnd;
  const bookingPeriod = hasSelectedDays
    ? <FormattedMessage
        id="BookingInfo.bookingPeriod"
        values={{
          bookingStart: moment(bookingStart).format('L'),
          bookingEnd: moment(bookingEnd).format('L'),
        }}
      />
    : '';
  const dayCount = hasSelectedDays
    ? moment(bookingEnd).diff(moment(bookingStart), 'days') + 1
    : null;
  const dayCountMessage = dayCount
    ? <FormattedMessage id="BookingInfo.dayCount" values={{ count: dayCount }} />
    : null;

  const priceAsNumber = convertMoneyToNumber(unitPrice, config.currencyConfig.subUnitDivisor);
  const formattedPrice = intl.formatNumber(priceAsNumber, config.currencyConfig);
  const totalPriceAsNumber = hasSelectedDays
    ? new Decimal(priceAsNumber).times(dayCount).toNumber()
    : null;
  const formattedTotalPrice = hasSelectedDays
    ? intl.formatNumber(totalPriceAsNumber, config.currencyConfig)
    : null;

  return (
    <div className={classNames(css.container, className)}>
      <div className={css.row}>
        <div className={css.priceUnitLabel}>
          <FormattedMessage id="BookingInfo.pricePerDay" />
        </div>
        <div className={css.priceUnitPrice}>
          {formattedPrice}
        </div>
      </div>
      <div className={css.row}>
        <div className={css.bookingPeriodLabel}>
          <FormattedMessage id="BookingInfo.bookingPeriodLabel" />
          <br />
          {bookingPeriod}
        </div>
        <div className={css.bookedDatesCount}>
          {dayCountMessage}
        </div>
      </div>
      <hr className={css.totalDivider} />
      <div className={css.row}>
        <div className={css.totalLabel}>
          <FormattedMessage id="BookingInfo.total" />
        </div>
        <div className={css.totalPrice}>
          {formattedTotalPrice}
        </div>
      </div>
    </div>
  );
};

BookingInfoComponent.defaultProps = { bookingStart: null, bookingEnd: null, className: '' };

const { instanceOf, string } = PropTypes;

BookingInfoComponent.propTypes = {
  bookingStart: instanceOf(Date),
  bookingEnd: instanceOf(Date),
  className: string,
  intl: intlShape.isRequired,
  unitPrice: instanceOf(types.Money).isRequired,
};

const BookingInfo = injectIntl(BookingInfoComponent);

BookingInfo.displayName = 'BookingInfo';

export default BookingInfo;
