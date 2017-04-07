import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, propTypes as formPropTypes } from 'redux-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';
import { types } from '../../util/sdkLoader';
import { required } from '../../util/validators';
import { Button, BookingInfo, DateInput } from '../../components';
import css from './BookingDatesForm.css';

const EnhancedDateInput = props => {
  const { input, isOutsideRange, labelMessage, placeholder, meta } = props;
  const { onBlur, onChange, onFocus, value } = input;
  const { touched, error } = meta;
  const maybeIsOutsideRange = isOutsideRange ? { isOutsideRange } : {};
  const inputProps = { ...maybeIsOutsideRange, onBlur, onChange, onFocus, placeholder, value };

  return (
    <div>
      {labelMessage ? <label htmlFor="bookingStart">{labelMessage}</label> : null}
      <DateInput {...inputProps} />
      {touched && error ? <span className={css.error}>{error}</span> : null}
    </div>
  );
};

EnhancedDateInput.defaultProps = {
  input: null,
  isOutsideRange: null,
  labelMessage: null,
  placeholder: 'Date',
};

const { bool, func, instanceOf, node, object, shape, string } = PropTypes;

EnhancedDateInput.propTypes = {
  input: object,
  isOutsideRange: func,
  labelMessage: node,
  meta: shape({
    touched: bool,
    error: string,
  }).isRequired,
  placeholder: string,
};

export const BookingDatesFormComponent = props => {
  const {
    bookingStart,
    bookingEnd,
    className,
    handleSubmit,
    intl,
    price,
    pristine,
    submitting,
  } = props;
  const placeholderText = intl.formatMessage({ id: 'BookingDatesForm.placeholder' });
  const bookingStartLabel = intl.formatMessage({ id: 'BookingDatesForm.bookingStartTitle'});
  const bookingEndLabel = intl.formatMessage({ id: 'BookingDatesForm.bookingEndTitle'});
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
  const startOfBookingEndRange = bookingStart ? moment(bookingStart) : moment();
  const isOutsideRangeEnd = bookingStart
    ? { isOutsideRange: day => !isInclusivelyAfterDay(day, startOfBookingEndRange) }
    : {};

  const bookingInfo = price
    ? <BookingInfo
        className={css.receipt}
        bookingStart={bookingStart}
        bookingEnd={bookingEnd}
        unitPrice={price}
      />
    : null;

  const invalid = !(bookingStart && bookingEnd);

  return (
    <form className={className} onSubmit={handleSubmit}>
      <Field
        name="bookingStart"
        labelMessage={bookingStartLabel}
        component={EnhancedDateInput}
        format={null}
        placeholder={placeholderText}
        {...isOutsideRangeStart}
        validate={[required(requiredMessage)]}
      />
      <Field
        name="bookingEnd"
        labelMessage={bookingEndLabel}
        component={EnhancedDateInput}
        format={null}
        placeholder={placeholderText}
        {...isOutsideRangeEnd}
        validate={[required(requiredMessage)]}
      />
      {bookingInfo}
      <p className={css.smallPrint}>
        <FormattedMessage id="BookingDatesForm.youWontBeChargedInfo" />
      </p>
      <Button type="submit" disabled={pristine || submitting || invalid}>
        <FormattedMessage id="BookingDatesForm.requestToBook" />
      </Button>
    </form>
  );
};

BookingDatesFormComponent.propTypes = {
  ...formPropTypes,
  intl: intlShape.isRequired,
  price: instanceOf(types.Money).isRequired,
};

const formName = 'bookingDates';

// When a field depends on the value of another field, we must connect
// to the store and select the required values to inject to the
// component.
//
// See: http://redux-form.com/6.6.1/examples/selectingFormValues/
const selector = formValueSelector(formName);
const mapStateToProps = state => {
  return selector(state, 'bookingStart', 'bookingEnd');
};

const BookingDatesForm = compose(
  connect(mapStateToProps),
  reduxForm({ form: formName }),
  injectIntl
)(BookingDatesFormComponent);
BookingDatesForm.displayName = 'BookingDatesForm';

export default BookingDatesForm;
