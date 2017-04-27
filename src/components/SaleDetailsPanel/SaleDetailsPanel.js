import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { types } from '../../util/sdkLoader';
import { createSlug } from '../../util/urlHelpers';
import { Avatar, BookingInfo, NamedLink } from '../../components';

import css from './SaleDetailsPanel.css';

const SaleDetailsPanel = props => {
  const { className, totalPrice, saleState, booking, listing, customer } = props;
  const { firstName, lastName } = customer.attributes.profile;
  const customerName = firstName ? `${firstName} ${lastName}` : '';

  const listingLinkParams = { id: listing.id.uuid, slug: createSlug(listing.attributes.title) };
  const listingLink = (
    <NamedLink name="ListingPage" params={listingLinkParams}>
      {listing.attributes.title}
    </NamedLink>
  );

  const title = saleState === propTypes.TX_STATE_PREAUTHORIZED
    ? <FormattedMessage
        id="SaleDetailsPanel.listingTitle"
        values={{ customerName: customerName, title: listingLink }}
      />
    : null;

  const message = saleState === propTypes.TX_STATE_PREAUTHORIZED
    ? <div className={css.message}>
        <FormattedMessage id="SaleDetailsPanel.saleStatusMessage" values={{ customerName }} />
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
      <div className={css.messagesContainer}>
        <div className={css.avatarWrapper}>
          <Avatar name={customerName} />
        </div>
        <h1 className={css.title}>{title}</h1>
        {message}
      </div>
      {bookingInfo}
    </div>
  );
};

SaleDetailsPanel.defaultProps = { className: null };

const { instanceOf, string } = PropTypes;

SaleDetailsPanel.propTypes = {
  className: string,
  totalPrice: instanceOf(types.Money).isRequired,
  saleState: string.isRequired,
  booking: propTypes.booking.isRequired,
  listing: propTypes.listing.isRequired,
  customer: propTypes.user.isRequired,
};

export default SaleDetailsPanel;
