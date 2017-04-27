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
  const { bookingStart, bookingEnd, className, intl, totalPrice, unitPrice } = props;

  const hasSelectedDays = bookingStart && bookingEnd;
  const bookingPeriod = hasSelectedDays
    ? <FormattedMessage
        id="BookingInfo.bookingPeriod"
        values={{
          bookingStart: intl.formatDate(bookingStart),
          bookingEnd: intl.formatDate(bookingEnd),
        }}
      />
    : '';
  const nightCount = hasSelectedDays ? moment(bookingEnd).diff(moment(bookingStart), 'days') : null;
  const nightCountMessage = nightCount
    ? <FormattedMessage id="BookingInfo.nightCount" values={{ count: nightCount }} />
    : null;

  const currencyConfig = config.currencyConfig;
  const subUnitDivisor = currencyConfig.subUnitDivisor;
  const unitPriceAsNumber = convertMoneyToNumber(unitPrice, subUnitDivisor);
  const formattedUnitPrice = intl.formatNumber(unitPriceAsNumber, currencyConfig);
  const calculatedTotalPriceAsNumber = !totalPrice && hasSelectedDays
    ? new Decimal(unitPriceAsNumber).times(nightCount).toNumber()
    : null;

  // Total price can be given (when it comes from API) or calculated based on unit price and nights
  const totalPriceAsNumber = totalPrice
    ? convertMoneyToNumber(totalPrice, subUnitDivisor)
    : calculatedTotalPriceAsNumber;
  const formattedTotalPrice = totalPriceAsNumber
    ? intl.formatNumber(totalPriceAsNumber, currencyConfig)
    : null;

  return (
    <div className={classNames(css.container, className)}>
      <div className={css.row}>
        <div className={css.priceUnitLabel}>
          <FormattedMessage id="BookingInfo.pricePerDay" />
        </div>
        <div className={css.priceUnitPrice}>
          {formattedUnitPrice}
        </div>
      </div>
      <div className={css.row}>
        <div className={css.bookingPeriodLabel}>
          <FormattedMessage id="BookingInfo.bookingPeriodLabel" />
          <br />
          {bookingPeriod}
        </div>
        <div className={css.bookedDatesCount}>
          {nightCountMessage}
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

BookingInfoComponent.defaultProps = {
  bookingStart: null,
  bookingEnd: null,
  className: '',
  totalPrice: null,
};

const { instanceOf, string } = PropTypes;

BookingInfoComponent.propTypes = {
  bookingStart: instanceOf(Date),
  bookingEnd: instanceOf(Date),
  className: string,
  intl: intlShape.isRequired,
  totalPrice: instanceOf(types.Money),
  unitPrice: instanceOf(types.Money).isRequired,
};

const BookingInfo = injectIntl(BookingInfoComponent);

BookingInfo.displayName = 'BookingInfo';

export default BookingInfo;
