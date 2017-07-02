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
import { convertMoneyToNumber, convertUnitToSubUnit } from '../../util/currency';
import config from '../../config';
import { Button, BookingBreakdown, DateRangeInputField } from '../../components';

import css from './BookingDatesForm.css';

// TODO: This is a temporary function to calculate the booking
// price. This should be removed when the API supports dry-runs and we
// can take the total price from the transaction itself.
const estimatedTotalPrice = (unitPrice, nightCount) => {
  const { subUnitDivisor } = config.currencyConfig;
  const numericPrice = convertMoneyToNumber(unitPrice, subUnitDivisor);
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
  const nightCount = nightsBetween(bookingStart, bookingEnd);
  const totalPrice = estimatedTotalPrice(unitPrice, nightCount);
  const lineItems = [
    {
      code: 'line-item.purchase/night',
      unitPrice: unitPrice,
      quantity: new Decimal(nightCount),
      lineTotal: totalPrice,
    },
  ];

  return (
    <BookingBreakdown
      className={css.receipt}
      bookingStart={bookingStart}
      bookingEnd={bookingEnd}
      unitPrice={unitPrice}
      userRole="customer"
      payinTotal={totalPrice}
      lineItems={lineItems}
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

  const bookingStartLabel = intl.formatMessage({ id: 'BookingDatesForm.bookingStartTitle' });
  const bookingEndLabel = intl.formatMessage({ id: 'BookingDatesForm.bookingEndTitle' });
  const requiredMessage = intl.formatMessage({ id: 'BookingDatesForm.requiredDate' });
  const startDateErrorMessage = intl.formatMessage({ id: 'DateRangeInputField.invalidStartDate' });
  const endDateErrorMessage = intl.formatMessage({ id: 'DateRangeInputField.invalidEndDate' });

  const hasBookingInfo = startDate && endDate;
  const bookingInfo = breakdown(startDate, endDate, unitPrice);

  const submitDisabled = submitting || invalid || !hasBookingInfo;

  // Multilocale support can be achieved with formatting like
  // moment().format('LL');  => e.g. 'June 29, 2017' in en-US, '29. kesäkuuta 2017' in fi-FI.
  // https://momentjs.com/
  const dateFormatString = 'ddd, MMMM D';

  const startDatePlaceholderText = startDatePlaceholder || moment().format(dateFormatString);
  const endDatePlaceholderText = endDatePlaceholder ||
    moment().add(1, 'days').format(dateFormatString);

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
      <Button className={css.submitButton} type="submit" disabled={submitDisabled}>
        <FormattedMessage id="BookingDatesForm.requestToBook" />
      </Button>
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

  // from inejctIntl
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
