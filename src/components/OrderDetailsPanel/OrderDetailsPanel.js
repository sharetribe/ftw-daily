import React, { PropTypes } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { createSlug } from '../../util/urlHelpers';
import { types } from '../../util/sdkLoader';
import { Avatar, BookingInfo, NamedLink } from '../../components';

import css from './OrderDetailsPanel.css';

const OrderDetailsPanel = props => {
  const {
    className,
    totalPrice,
    orderState,
    lastTransitionedAt,
    booking,
    listing,
    provider,
  } = props;
  const { firstName, lastName } = provider.attributes.profile;
  const providerName = firstName ? `${firstName} ${lastName}` : '';

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
            values={{ title: listingLink }}
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
        <div className={css.avatarWrapper}>
          <Avatar name={providerName} />
        </div>
        {stateMsgData.message}
      </div>
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
};

export default OrderDetailsPanel;
