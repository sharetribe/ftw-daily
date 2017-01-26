import React, { PropTypes } from 'react';
import { PageLayout, NamedLink } from '../../components';

import css from './CheckoutPage.css';

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

const { string, shape } = PropTypes;

BookingInfo.propTypes = {
  pricePerDay: string.isRequired,
  bookingPeriod: string.isRequired,
  bookingDuration: string.isRequired,
  total: string.isRequired,
};

const CheckoutPage = props => {
  const { params } = props;
  const { listingId } = params;

  const info = {
    title: 'Banyan Studios',
    imageUrl: 'http://placehold.it/750x470',
    pricePerDay: '55\u20AC',
    bookingPeriod: 'Jan 2nd - Jan 4th',
    bookingDuration: '3 days',
    total: '165\u20AC',
  };

  return (
    <PageLayout title={`Book ${info.title} (${listingId})`}>
      <img alt={info.title} src={info.imageUrl} style={{ width: '100%' }} />
      <BookingInfo {...info} />
      <p>By confirming I accept the booking terms and conditions.</p>
      <NamedLink className={css.buttonLink} name="OrderDetailsPage" params={{ id: 12345 }}>
        Confirm & Pay
      </NamedLink>
    </PageLayout>
  );
};

CheckoutPage.propTypes = { params: shape({ listingId: string.isRequired }).isRequired };

export default CheckoutPage;
