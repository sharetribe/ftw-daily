import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, propTypes as formPropTypes } from 'redux-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import moment from 'moment';
import Decimal from 'decimal.js';
import { types } from '../../util/sdkLoader';
import { required, bookingDatesRequired } from '../../util/validators';
import { nightsBetween, START_DATE, END_DATE } from '../../util/dates';
import { unitDivisor, convertMoneyToNumber, convertUnitToSubUnit } from '../../util/currency';
import * as propTypes from '../../util/propTypes';
import config from '../../config';
import { Form, PrimaryButton, BookingBreakdown, DateRangeInputField } from '../../components';

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
const estimatedNightlyTransaction = (bookingStart, bookingEnd, unitPrice) => {
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

  const tx = estimatedNightlyTransaction(bookingStart, bookingEnd, unitPrice);

  return (
    <BookingBreakdown
      className={css.receipt}
      userRole="customer"
      transaction={tx}
      booking={tx.booking}
    />
  );
};

export class BookingDatesFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { focusedInput: null };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onFocusedInputChange = this.onFocusedInputChange.bind(this);
  }

  // Function that can be passed to nested components
  // so that they can notify this component when the
  // focused input changes.
  onFocusedInputChange(focusedInput) {
    this.setState({ focusedInput });
  }

  // In case start or end date for the booking is missing
  // focus on that input, otherwise continue with the
  // default handleSubmit function.
  handleFormSubmit(e) {
    const { startDate, endDate } = this.props.bookingDates;
    if (!startDate) {
      e.preventDefault();
      this.setState({ focusedInput: START_DATE });
    } else if (!endDate) {
      e.preventDefault();
      this.setState({ focusedInput: END_DATE });
    } else {
      this.props.handleSubmit(e);
    }
  }

  render() {
    const {
      rootClassName,
      className,
      bookingDates,
      form,
      price: unitPrice,
      intl,
      startDatePlaceholder,
      endDatePlaceholder,
      isOwnListing,
    } = this.props;

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
    const startDateErrorMessage = intl.formatMessage({
      id: 'DateRangeInputField.invalidStartDate',
    });
    const endDateErrorMessage = intl.formatMessage({ id: 'DateRangeInputField.invalidEndDate' });

    const hasBookingInfo = startDate && endDate;
    const bookingInfo = hasBookingInfo ? (
      <div className={css.priceBreakdownContainer}>
        <h3 className={css.priceBreakdownTitle}>
          <FormattedMessage id="BookingDatesForm.priceBreakdownTitle" />
        </h3>
        {estimatedBreakdown(startDate, endDate, unitPrice)}
      </div>
    ) : null;

    const dateFormatOptions = {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
    };

    const now = moment();
    const today = now.startOf('day').toDate();
    const tomorrow = now
      .startOf('day')
      .add(1, 'days')
      .toDate();
    const startDatePlaceholderText =
      startDatePlaceholder || intl.formatDate(today, dateFormatOptions);
    const endDatePlaceholderText =
      endDatePlaceholder || intl.formatDate(tomorrow, dateFormatOptions);

    return (
      <Form className={className} onSubmit={this.handleFormSubmit}>
        <DateRangeInputField
          className={css.bookingDates}
          name="bookingDates"
          startDateId={`${form}.bookingStartDate`}
          startDateLabel={bookingStartLabel}
          startDatePlaceholderText={startDatePlaceholderText}
          endDateId={`${form}.bookingEndDate`}
          endDateLabel={bookingEndLabel}
          endDatePlaceholderText={endDatePlaceholderText}
          focusedInput={this.state.focusedInput}
          onFocusedInputChange={this.onFocusedInputChange}
          format={null}
          useMobileMargins
          validate={[
            required(requiredMessage),
            bookingDatesRequired(startDateErrorMessage, endDateErrorMessage),
          ]}
        />
        {bookingInfo}
        <p className={css.smallPrint}>
          <FormattedMessage
            id={
              isOwnListing ? 'BookingDatesForm.ownListing' : 'BookingDatesForm.youWontBeChargedInfo'
            }
          />
        </p>
        <PrimaryButton className={css.submitButton} type="submit">
          <FormattedMessage id="BookingDatesForm.requestToBook" />
        </PrimaryButton>
      </Form>
    );
  }
}

BookingDatesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  price: null,
  isOwnListing: false,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
};

const { instanceOf, shape, string, bool } = PropTypes;

BookingDatesFormComponent.propTypes = {
  ...formPropTypes,

  rootClassName: string,
  className: string,
  price: instanceOf(types.Money),
  isOwnListing: bool,

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
