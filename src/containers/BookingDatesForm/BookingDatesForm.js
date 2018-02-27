import React, { Component } from 'react';
import { instanceOf, shape, string, bool, number } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, propTypes as formPropTypes } from 'redux-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import moment from 'moment';
import Decimal from 'decimal.js';
import { types as sdkTypes } from '../../util/sdkLoader';
import { required, bookingDatesRequired } from '../../util/validators';
import { nightsBetween, daysBetween, START_DATE, END_DATE } from '../../util/dates';
import { unitDivisor, convertMoneyToNumber, convertUnitToSubUnit } from '../../util/currency';
import {
  LINE_ITEM_DAY,
  LINE_ITEM_NIGHT,
  LINE_ITEM_UNITS,
  TRANSITION_REQUEST,
  TX_TRANSITION_ACTOR_CUSTOMER,
  propTypes,
} from '../../util/types';
import config from '../../config';
import { Form, PrimaryButton, BookingBreakdown, FieldDateRangeInput } from '../../components';

import css from './BookingDatesForm.css';

const { Money, UUID } = sdkTypes;

const estimatedUnitsTotal = (unitPrice, unitCount) => {
  const numericPrice = convertMoneyToNumber(unitPrice);
  const numericTotalPrice = new Decimal(numericPrice).times(unitCount).toNumber();
  return new Money(
    convertUnitToSubUnit(numericTotalPrice, unitDivisor(unitPrice.currency)),
    unitPrice.currency
  );
};

const estimatedCustomerCommission = (unitsTotal, percentage) => {
  const numericTotal = convertMoneyToNumber(unitsTotal);
  // Divide the commission percentage with 100 to get the
  // commission multiplier and use precision of 2 when
  // rounding the sub units.
  const numericCommission = new Decimal(percentage)
    .div(100)
    .times(numericTotal)
    .toDP(2)
    .toNumber();

  return new Money(
    convertUnitToSubUnit(numericCommission, unitDivisor(unitsTotal.currency)),
    unitsTotal.currency
  );
};

const estimatedPayInTotal = (unitsTotal, customerCommission) => {
  const numericTotal = convertMoneyToNumber(unitsTotal);
  const numericCommission = convertMoneyToNumber(customerCommission);
  const numericPayIn = new Decimal(numericTotal).plus(numericCommission).toNumber();
  return new Money(
    convertUnitToSubUnit(numericPayIn, unitDivisor(unitsTotal.currency)),
    unitsTotal.currency
  );
};

// When we cannot speculatively initiate a transaction (i.e. logged
// out), we must estimate the booking breakdown. This function creates
// an estimated transaction object for that use case.
const estimatedTransaction = (
  unitType,
  bookingStart,
  bookingEnd,
  unitPrice,
  quantity,
  customerCommissionPercentage
) => {
  const now = new Date();
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitCount = isNightly
    ? nightsBetween(bookingStart, bookingEnd)
    : isDaily ? daysBetween(bookingStart, bookingEnd) : quantity;

  const isCommission = !!customerCommissionPercentage;

  const unitsTotal = estimatedUnitsTotal(unitPrice, unitCount);

  const unitLineItem = {
    code: unitType,
    includeFor: ['customer', 'provider'],
    unitPrice: unitPrice,
    quantity: new Decimal(unitCount),
    lineTotal: unitsTotal,
    reversal: false,
  };

  const commission = isCommission
    ? estimatedCustomerCommission(unitsTotal, customerCommissionPercentage)
    : null;

  const totalPrice = isCommission ? estimatedPayInTotal(unitsTotal, commission) : unitsTotal;

  const lineItems = isCommission
    ? [
        unitLineItem,
        {
          code: 'line-item/customer-commission',
          includeFor: ['customer'],
          unitPrice: unitsTotal,
          lineTotal: commission,
          reversal: false,
        },
      ]
    : [unitLineItem];

  return {
    id: new UUID('estimated-transaction'),
    type: 'transaction',
    attributes: {
      createdAt: now,
      lastTransitionedAt: now,
      lastTransition: TRANSITION_REQUEST,
      payinTotal: totalPrice,
      payoutTotal: totalPrice,
      lineItems,
      transitions: [
        {
          at: now,
          by: TX_TRANSITION_ACTOR_CUSTOMER,
          transition: TRANSITION_REQUEST,
        },
      ],
    },
    booking: {
      id: new UUID('estimated-booking'),
      type: 'booking',
      attributes: {
        start: bookingStart,
        end: bookingEnd,
      },
    },
  };
};

const estimatedBreakdown = (
  unitType,
  bookingStart,
  bookingEnd,
  unitPrice,
  quantity,
  customerCommissionPercentage
) => {
  const isUnits = unitType === LINE_ITEM_UNITS;
  const quantityIfUsingUnits = !isUnits || Number.isInteger(quantity);
  const canEstimatePrice = bookingStart && bookingEnd && unitPrice && quantityIfUsingUnits;
  if (!canEstimatePrice) {
    return null;
  }

  const tx = estimatedTransaction(
    unitType,
    bookingStart,
    bookingEnd,
    unitPrice,
    quantity,
    customerCommissionPercentage
  );

  return (
    <BookingBreakdown
      className={css.receipt}
      userRole="customer"
      unitType={unitType}
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
      submitButtonWrapperClassName,
      unitType,
      bookingDates,
      form,
      price: unitPrice,
      intl,
      startDatePlaceholder,
      endDatePlaceholder,
      isOwnListing,
      customerCommissionPercentage,
    } = this.props;

    const { startDate, endDate } = bookingDates;
    const classes = classNames(rootClassName || css.root, className);
    const submitButtonClasses = classNames(css.submitButtonWrapper, submitButtonWrapperClassName);

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
      id: 'FieldDateRangeInput.invalidStartDate',
    });
    const endDateErrorMessage = intl.formatMessage({ id: 'FieldDateRangeInput.invalidEndDate' });

    const hasBookingInfo = startDate && endDate;
    const bookingInfo = hasBookingInfo ? (
      <div className={css.priceBreakdownContainer}>
        <h3 className={css.priceBreakdownTitle}>
          <FormattedMessage id="BookingDatesForm.priceBreakdownTitle" />
        </h3>
        {estimatedBreakdown(
          unitType,
          startDate,
          endDate,
          unitPrice,
          null,
          customerCommissionPercentage
        )}
      </div>
    ) : null;

    const dateFormatOptions = {
      weekday: 'short',
      month: 'short',
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
        <FieldDateRangeInput
          className={css.bookingDates}
          name="bookingDates"
          unitType={unitType}
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
        <div className={submitButtonClasses}>
          <PrimaryButton type="submit">
            <FormattedMessage id="BookingDatesForm.requestToBook" />
          </PrimaryButton>
        </div>
      </Form>
    );
  }
}

BookingDatesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  price: null,
  isOwnListing: false,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  customerCommissionPercentage: null,
};

BookingDatesFormComponent.propTypes = {
  ...formPropTypes,

  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  unitType: propTypes.bookingUnitType.isRequired,
  price: propTypes.money,
  isOwnListing: bool,
  customerCommissionPercentage: number,

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
