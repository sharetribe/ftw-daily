import React, { PropTypes } from 'react';

const BookingInfo = props => {
  const { pricePerDay, bookingPeriod, bookingDuration, total } = props;
  return (
    <dl>
      <dt>
        Price per day:
      </dt>
      <dd>{pricePerDay}</dd>
      <dt>
        Booking period:
      </dt>
      <dd>{`${bookingPeriod}, ${bookingDuration}`}</dd>
      <dt>
        Total
      </dt>
      <dd>{total}</dd>
    </dl>
  );
};

const { string } = PropTypes;

BookingInfo.propTypes = {
  pricePerDay: string.isRequired,
  bookingPeriod: string.isRequired,
  bookingDuration: string.isRequired,
  total: string.isRequired,
};

export default BookingInfo;
