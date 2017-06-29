import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, propTypes as formPropTypes } from 'redux-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';
import classNames from 'classnames';
import moment from 'moment';
import Decimal from 'decimal.js';
import { types } from '../../util/sdkLoader';
import { required } from '../../util/validators';
import { nightsBetween } from '../../util/dates';
import { convertMoneyToNumber, convertUnitToSubUnit } from '../../util/currency';
import config from '../../config';
import { Button, BookingBreakdown, DateInputField } from '../../components';

import css from './BookingDatesForm.css';

// TODO: This is a temporary function to calculate the booking
// price. This should be removed when the API supports dry-runs and we
// can take the total price from the transaction itself.
const estimatedTotalPrice = (startDate, endDate, unitPrice) => {
  const { subUnitDivisor } = config.currencyConfig;
  const numericPrice = convertMoneyToNumber(unitPrice, subUnitDivisor);
  const nightCount = nightsBetween(startDate, endDate);
  const numericTotalPrice = new Decimal(numericPrice).times(nightCount).toNumber();
  return new types.Money(
    convertUnitToSubUnit(numericTotalPrice, subUnitDivisor),
    unitPrice.currency
  );
};

const breakdown = (bookingStart, bookingEnd, unitPrice) => {
  if (!bookingStart || !bookingEnd || !unitPrice) {
    return null;
  }
  const totalPrice = estimatedTotalPrice(bookingStart, bookingEnd, unitPrice);
  return (
    <BookingBreakdown
      className={css.receipt}
      bookingStart={bookingStart}
      bookingEnd={bookingEnd}
      unitPrice={unitPrice}
      totalPrice={totalPrice}
    />
  );
};

export const BookingDatesFormComponent = props => {
  const {
    rootClassName,
    className,
    bookingStart,
    bookingEnd,
    form,
    invalid,
    handleSubmit,
    price: unitPrice,
    pristine,
    submitting,
    intl,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const { currency: marketplaceCurrency } = config.currencyConfig;

  if (!unitPrice) {
    return (
      <div className={classes}>
        <p className={css.error}>
          <FormattedMessage id="BookingDatesForm.listingPriceMissing" />
        </p>
      </div>
    );
  }
  if (unitPrice.currency !== marketplaceCurrency) {
    return (
      <div className={classes}>
        <p className={css.error}>
          <FormattedMessage id="BookingDatesForm.listingCurrencyInvalid" />
        </p>
      </div>
    );
  }

  const placeholderText = intl.formatMessage({ id: 'BookingDatesForm.placeholder' });
  const bookingStartLabel = intl.formatMessage({ id: 'BookingDatesForm.bookingStartTitle' });
  const bookingEndLabel = intl.formatMessage({ id: 'BookingDatesForm.bookingEndTitle' });
  const requiredMessage = intl.formatMessage({ id: 'BookingDatesForm.requiredDate' });

  // A day is outside range if it is between today and booking end date (if end date has been chosen)
  const isOutsideRangeStart = bookingEnd
    ? {
        isOutsideRange: day =>
          !(isInclusivelyAfterDay(day, moment()) &&
            isInclusivelyBeforeDay(day, moment(bookingEnd))),
      }
    : {};

  // A day is outside range if it is after booking start date (or today if none is chosen)
  const startOfBookingEndRange = bookingStart
    ? moment(bookingStart).add(1, 'days')
    : moment().add(1, 'days');
  const isOutsideRangeEnd = bookingStart
    ? { isOutsideRange: day => !isInclusivelyAfterDay(day, startOfBookingEndRange) }
    : {};

  const hasBookingInfo = bookingStart && bookingEnd;
  const bookingInfo = breakdown(bookingStart, bookingEnd, unitPrice);

  const submitDisabled = pristine || submitting || invalid || !hasBookingInfo;

  return (
    <form className={classes} onSubmit={handleSubmit}>
      {bookingInfo}
      <DateInputField
        name="bookingStart"
        id={`${form}.bookingStart`}
        label={bookingStartLabel}
        format={null}
        placeholder={placeholderText}
        {...isOutsideRangeStart}
        validate={[required(requiredMessage)]}
      />
      <DateInputField
        className={css.bookingEnd}
        name="bookingEnd"
        id={`${form}.bookingEnd`}
        label={bookingEndLabel}
        format={null}
        placeholder={placeholderText}
        {...isOutsideRangeEnd}
        validate={[required(requiredMessage)]}
      />
      <p className={css.smallPrint}>
        <FormattedMessage id="BookingDatesForm.youWontBeChargedInfo" />
      </p>
      <Button type="submit" disabled={submitDisabled}>
        <FormattedMessage id="BookingDatesForm.requestToBook" />
      </Button>
    </form>
  );
};

BookingDatesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  price: null,
  bookingStart: null,
  bookingEnd: null,
};

const { string, instanceOf } = PropTypes;

BookingDatesFormComponent.propTypes = {
  ...formPropTypes,

  rootClassName: string,
  className: string,
  price: instanceOf(types.Money),

  // from formValueSelector
  bookingStart: instanceOf(Date),
  bookingEnd: instanceOf(Date),

  // from inejctIntl
  intl: intlShape.isRequired,
};

const formName = 'BookingDates';

// When a field depends on the value of another field, we must connect
// to the store and select the required values to inject to the
// component.
//
// See: http://redux-form.com/6.6.1/examples/selectingFormValues/
const selector = formValueSelector(formName);
const mapStateToProps = state => selector(state, 'bookingStart', 'bookingEnd');

const BookingDatesForm = compose(
  connect(mapStateToProps),
  reduxForm({ form: formName }),
  injectIntl
)(BookingDatesFormComponent);
BookingDatesForm.displayName = 'BookingDatesForm';

export default BookingDatesForm;
