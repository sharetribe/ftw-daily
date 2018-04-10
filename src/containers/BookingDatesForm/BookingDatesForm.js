import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, propTypes as formPropTypes } from 'redux-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import moment from 'moment';
import { required, bookingDatesRequired } from '../../util/validators';
import { START_DATE, END_DATE } from '../../util/dates';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Form, PrimaryButton, FieldDateRangeInput } from '../../components';
import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe';

import css from './BookingDatesForm.css';

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

    // This is the place to collect breakdown estimation data. See the
    // EstimatedBreakdownMaybe component to change the calculations
    // for customised payment processes.
    const bookingData =
      startDate && endDate
        ? {
            unitType,
            unitPrice,
            startDate,
            endDate,

            // NOTE: If unitType is `line-item/units`, a new picker
            // for the quantity should be added to the form.
            quantity: 1,
          }
        : null;
    const bookingInfo = bookingData ? (
      <div className={css.priceBreakdownContainer}>
        <h3 className={css.priceBreakdownTitle}>
          <FormattedMessage id="BookingDatesForm.priceBreakdownTitle" />
        </h3>
        <EstimatedBreakdownMaybe bookingData={bookingData} />
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
};

const { instanceOf, shape, string, bool } = PropTypes;

BookingDatesFormComponent.propTypes = {
  ...formPropTypes,

  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  unitType: propTypes.bookingUnitType.isRequired,
  price: propTypes.money,
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
