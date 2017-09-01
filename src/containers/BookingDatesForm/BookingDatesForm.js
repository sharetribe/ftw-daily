import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, propTypes as formPropTypes } from 'redux-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import moment from 'moment';
import Decimal from 'decimal.js';
import { types } from '../../util/sdkLoader';
import { required, bookingDatesRequired } from '../../util/validators';
import { nightsBetween } from '../../util/dates';
import { unitDivisor, convertMoneyToNumber, convertUnitToSubUnit } from '../../util/currency';
import * as propTypes from '../../util/propTypes';
import config from '../../config';
import { PrimaryButton, BookingBreakdown, DateRangeInputField } from '../../components';

import css from './BookingDatesForm.css';

const estimatedTotalPrice = (unitPrice, nightCount) => {
  const numericPrice = convertMoneyToNumber(unitPrice);
  const numericTotalPrice = new Decimal(numericPrice).times(nightCount).toNumber();
  return new types.Money(
    convertUnitToSubUnit(numericTotalPrice, unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );
};

// When we cannot speculatively initiate a transaction (i.e. logged
// out), we must estimate the booking breakdown. This function creates
// an estimated transaction object for that use case.
const estimatedTransaction = (bookingStart, bookingEnd, unitPrice) => {
  const now = new Date();
  const nightCount = nightsBetween(bookingStart, bookingEnd);
  const totalPrice = estimatedTotalPrice(unitPrice, nightCount);

  return {
    id: new types.UUID('estimated-transaction'),
    type: 'transaction',
    attributes: {
      createdAt: now,
      lastTransitionedAt: now,
      lastTransition: propTypes.TX_TRANSITION_PREAUTHORIZE,
      state: propTypes.TX_STATE_PREAUTHORIZED,
      payinTotal: totalPrice,
      payoutTotal: totalPrice,
      lineItems: [
        {
          code: 'line-item/night',
          unitPrice: unitPrice,
          quantity: new Decimal(nightCount),
          lineTotal: totalPrice,
        },
      ],
    },
    booking: {
      id: new types.UUID('estimated-booking'),
      type: 'booking',
      attributes: {
        start: bookingStart,
        end: bookingEnd,
      },
    },
  };
};

const estimatedBreakdown = (bookingStart, bookingEnd, unitPrice) => {
  const canEstimatePrice = bookingStart && bookingEnd && unitPrice;
  if (!canEstimatePrice) {
    return null;
  }

  const tx = estimatedTransaction(bookingStart, bookingEnd, unitPrice);

  return (
    <BookingBreakdown
      className={css.receipt}
      userRole="customer"
      bookingStart={tx.booking.attributes.start}
      bookingEnd={tx.booking.attributes.end}
      transactionState={tx.attributes.state}
      payinTotal={tx.attributes.payinTotal}
      lineItems={tx.attributes.lineItems}
    />
  );
};

export const BookingDatesFormComponent = props => {
  const {
    rootClassName,
    className,
    bookingDates,
    form,
    invalid,
    handleSubmit,
    price: unitPrice,
    submitting,
    intl,
    startDatePlaceholder,
    endDatePlaceholder,
  } = props;

  const { startDate, endDate } = bookingDates;
  const classes = classNames(rootClassName || css.root, className);

  if (!unitPrice) {
    return (
      <div className={classes}>
        <p className={css.error}>
          <FormattedMessage id="BookingDatesForm.listingPriceMissing" />
        </p>
      </div>
    );
  }
  if (unitPrice.currency !== config.currency) {
    return (
      <div className={classes}>
        <p className={css.error}>
          <FormattedMessage id="BookingDatesForm.listingCurrencyInvalid" />
        </p>
      </div>
    );
  }

  const bookingStartLabel = intl.formatMessage({ id: 'BookingDatesForm.bookingStartTitle' });
  const bookingEndLabel = intl.formatMessage({ id: 'BookingDatesForm.bookingEndTitle' });
  const requiredMessage = intl.formatMessage({ id: 'BookingDatesForm.requiredDate' });
  const startDateErrorMessage = intl.formatMessage({ id: 'DateRangeInputField.invalidStartDate' });
  const endDateErrorMessage = intl.formatMessage({ id: 'DateRangeInputField.invalidEndDate' });

  const hasBookingInfo = startDate && endDate;
  const bookingInfo = hasBookingInfo
    ? <div className={css.priceBreakdownContainer}>
        <h3 className={css.priceBreakdownTitle}>
          <FormattedMessage id="BookingDatesForm.priceBreakdownTitle" />
        </h3>
        {estimatedBreakdown(startDate, endDate, unitPrice)}
      </div>
    : null;

  const submitDisabled = submitting || invalid || !hasBookingInfo;

  const dateFormatOptions = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  };

  const now = moment();
  const today = now.startOf('day').toDate();
  const tomorrow = now.startOf('day').add(1, 'days').toDate();
  const startDatePlaceholderText = startDatePlaceholder ||
    intl.formatDate(today, dateFormatOptions);
  const endDatePlaceholderText = endDatePlaceholder || intl.formatDate(tomorrow, dateFormatOptions);

  return (
    <form className={className} onSubmit={handleSubmit}>
      <DateRangeInputField
        className={css.bookingDates}
        name="bookingDates"
        startDateId={`${form}.bookingStartDate`}
        startDateLabel={bookingStartLabel}
        startDatePlaceholderText={startDatePlaceholderText}
        endDateId={`${form}.bookingEndDate`}
        endDateLabel={bookingEndLabel}
        endDatePlaceholderText={endDatePlaceholderText}
        format={null}
        useMobileMargins
        validate={[
          required(requiredMessage),
          bookingDatesRequired(startDateErrorMessage, endDateErrorMessage),
        ]}
      />
      {bookingInfo}
      <p className={css.smallPrint}>
        <FormattedMessage id="BookingDatesForm.youWontBeChargedInfo" />
      </p>
      <PrimaryButton className={css.submitButton} type="submit" disabled={submitDisabled}>
        <FormattedMessage id="BookingDatesForm.requestToBook" />
      </PrimaryButton>
    </form>
  );
};

BookingDatesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  price: null,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
};

const { instanceOf, shape, string } = PropTypes;

BookingDatesFormComponent.propTypes = {
  ...formPropTypes,

  rootClassName: string,
  className: string,
  price: instanceOf(types.Money),

  // from formValueSelector
  bookingDates: shape({
    startDate: instanceOf(Date),
    endDate: instanceOf(Date),
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,

  // for tests
  startDatePlaceholder: string,
  endDatePlaceholder: string,
};

const formName = 'BookingDates';

// When a field depends on the value of another field, we must connect
// to the store and select the required values to inject to the
// component.
//
// See: http://redux-form.com/6.6.1/examples/selectingFormValues/
const selector = formValueSelector(formName);
const mapStateToProps = state => ({ bookingDates: selector(state, 'bookingDates') || {} });

const BookingDatesForm = compose(
  connect(mapStateToProps),
  reduxForm({ form: formName }),
  injectIntl
)(BookingDatesFormComponent);
BookingDatesForm.displayName = 'BookingDatesForm';

export default BookingDatesForm;
