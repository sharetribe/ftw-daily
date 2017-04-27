import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { createSlug } from '../../util/urlHelpers';
import { types } from '../../util/sdkLoader';
import { Avatar, BookingInfo, NamedLink } from '../../components';

import css from './OrderDetailsPanel.css';

const OrderDetailsPanel = props => {
  const { className, totalPrice, orderState, booking, listing, provider } = props;
  const { firstName, lastName } = provider.attributes.profile;
  const providerName = firstName ? `${firstName} ${lastName}` : '';

  const listingLinkParams = { id: listing.id.uuid, slug: createSlug(listing.attributes.title) };
  const listingLink = (
    <NamedLink name="ListingPage" params={listingLinkParams}>
      {listing.attributes.title}
    </NamedLink>
  );

  const title = orderState === propTypes.TX_STATE_PREAUTHORIZED
    ? <FormattedMessage
        id="OrderDetailsPanel.listingTitle"
        values={{ title: listingLink }}
      />
    : null;

  const message = orderState === propTypes.TX_STATE_PREAUTHORIZED
    ? <div className={css.message}>
        <div className={css.avatarWrapper}>
          <Avatar name={providerName} />
        </div>
        <div>
          <FormattedMessage id="OrderDetailsPanel.orderStatusMessage" values={{ providerName }} />
        </div>
      </div>
    : null;

  // TODO We can't use price from listing, since that might have changed.
  // When API includes unit price and possible additional fees, we need to change this.
  const unitPrice = listing.attributes.price;

  const bookingInfo = unitPrice
    ? <BookingInfo
        className={css.receipt}
        bookingStart={booking.attributes.start}
        bookingEnd={booking.attributes.end}
        unitPrice={unitPrice}
        totalPrice={totalPrice}
      />
    : <p className={css.error}>{'priceRequiredMessage'}</p>;

  return (
    <div className={className}>
      <h1 className={css.title}>{title}</h1>
      {message}
      {bookingInfo}
    </div>
  );
};

OrderDetailsPanel.defaultProps = { className: null };

const { instanceOf, string } = PropTypes;

OrderDetailsPanel.propTypes = {
  className: string,
  totalPrice: instanceOf(types.Money).isRequired,
  orderState: string.isRequired,
  booking: propTypes.booking.isRequired,
  listing: propTypes.listing.isRequired,
  provider: propTypes.user.isRequired,
};

export default OrderDetailsPanel;
