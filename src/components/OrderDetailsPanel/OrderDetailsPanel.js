import React, { PropTypes } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { createSlug } from '../../util/urlHelpers';
import { types } from '../../util/sdkLoader';
import { Avatar, BookingInfo, NamedLink } from '../../components';

import css from './OrderDetailsPanel.css';

const formatName = (user, defaultName) => {
  if (user && user.attributes && user.attributes.profile && user.attributes.profile.firstName) {
    return user.attributes.profile.firstName;
  }
  return defaultName;
};

const OrderDetailsPanel = props => {
  const {
    className,
    totalPrice,
    orderState,
    lastTransitionedAt,
    booking,
    listing,
    provider,
    customer,
  } = props;
  const providerName = formatName(provider, '');
  const customerName = formatName(customer, '');

  const listingLinkParams = { id: listing.id.uuid, slug: createSlug(listing.attributes.title) };
  const listingLink = (
    <NamedLink name="ListingPage" params={listingLinkParams}>
      {listing.attributes.title}
    </NamedLink>
  );

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

  // orderState affects to both title and message section
  let stateMsgData = {};
  switch (orderState) {
    case propTypes.TX_STATE_PREAUTHORIZED:
      stateMsgData = {
        title: (
          <FormattedMessage
            id="OrderDetailsPanel.orderRequestedTitle"
            values={{ customerName, listingTitle: listingLink }}
          />
        ),
        message: (
          <div className={css.messagesContainer}>
            <FormattedMessage
              id="OrderDetailsPanel.orderRequestedStatus"
              values={{ providerName }}
            />
          </div>
        ),
      };
      break;
    case propTypes.TX_STATE_ACCEPTED:
      stateMsgData = {
        title: (
          <FormattedMessage
            id="OrderDetailsPanel.orderAcceptedTitle"
            values={{ title: listingLink }}
          />
        ),
        message: (
          <div className={css.messagesContainer}>
            <FormattedMessage
              id="OrderDetailsPanel.orderAcceptedStatus"
              values={{ providerName }}
            />
            <FormattedDate value={lastTransitionedAt} year="numeric" month="short" day="numeric" />
          </div>
        ),
      };
      break;
    case propTypes.TX_STATE_REJECTED:
      stateMsgData = {
        title: (
          <FormattedMessage
            id="OrderDetailsPanel.orderRejectedTitle"
            values={{ title: listingLink }}
          />
        ),
        message: (
          <div className={css.messagesContainer}>
            <FormattedMessage
              id="OrderDetailsPanel.orderRejectedStatus"
              values={{ providerName }}
            />
            <FormattedDate value={lastTransitionedAt} year="numeric" month="short" day="numeric" />
          </div>
        ),
      };
      break;
    case propTypes.TX_STATE_DELIVERED:
      stateMsgData = {
        title: (
          <FormattedMessage
            id="OrderDetailsPanel.orderDeliveredTitle"
            values={{ title: listingLink }}
          />
        ),
        message: (
          <div className={css.messagesContainer}>
            <FormattedMessage
              id="OrderDetailsPanel.orderDeliveredStatus"
              values={{ providerName }}
            />
            <FormattedDate value={lastTransitionedAt} year="numeric" month="short" day="numeric" />
          </div>
        ),
      };
      break;
    default:
      stateMsgData = { title: null, message: null };
  }

  return (
    <div className={className}>
      <h1 className={css.title}>{stateMsgData.title}</h1>
      <div className={css.message}>
        {stateMsgData.message}
      </div>
      <h3 className={css.bookingBreakdownTitle}>
        <FormattedMessage id="OrderDetailsPanel.bookingBreakdownTitle" />
      </h3>
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
  lastTransitionedAt: instanceOf(Date).isRequired,
  booking: propTypes.booking.isRequired,
  listing: propTypes.listing.isRequired,
  provider: propTypes.user.isRequired,
  customer: propTypes.user.isRequired,
};

export default OrderDetailsPanel;
