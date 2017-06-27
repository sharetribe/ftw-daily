import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, propTypes as formPropTypes } from 'redux-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';
import { types } from '../../util/sdkLoader';
import { required } from '../../util/validators';
import { Button, BookingBreakdown, DateInputField } from '../../components';

import css from './BookingDatesForm.css';

export const BookingDatesFormComponent = props => {
  const {
    bookingStart,
    bookingEnd,
    className,
    form,
    handleSubmit,
    intl,
    price,
    pristine,
    submitting,
  } = props;
  const placeholderText = intl.formatMessage({ id: 'BookingDatesForm.placeholder' });
  const bookingStartLabel = intl.formatMessage({ id: 'BookingDatesForm.bookingStartTitle' });
  const bookingEndLabel = intl.formatMessage({ id: 'BookingDatesForm.bookingEndTitle' });
  const priceRequiredMessage = intl.formatMessage({ id: 'BookingDatesForm.priceRequired' });
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

  const bookingInfo = price
    ? <BookingBreakdown
        className={css.receipt}
        bookingStart={bookingStart}
        bookingEnd={bookingEnd}
        unitPrice={price}
      />
    : <p className={css.error}>{priceRequiredMessage}</p>;

  const invalid = !(bookingStart && bookingEnd && price);

  return (
    <form className={className} onSubmit={handleSubmit}>
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
      <Button type="submit" disabled={pristine || submitting || invalid}>
        <FormattedMessage id="BookingDatesForm.requestToBook" />
      </Button>
    </form>
  );
};

BookingDatesFormComponent.defaultProps = { price: null };

const { instanceOf } = PropTypes;

BookingDatesFormComponent.propTypes = {
  ...formPropTypes,
  intl: intlShape.isRequired,
  price: instanceOf(types.Money),
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
