import React, { PropTypes } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { createSlug } from '../../util/urlHelpers';
import { types } from '../../util/sdkLoader';
import { BookingBreakdown, NamedLink } from '../../components';

import css from './OrderDetailsPanel.css';

const formatName = (user, defaultName) => {
  if (user && user.attributes && user.attributes.profile && user.attributes.profile.firstName) {
    return user.attributes.profile.firstName;
  }
  return defaultName;
};

const orderTitle = (orderState, listingLink, customerName, lastTransition) => {
  const rejectedTranslationId = lastTransition === propTypes.TX_TRANSITION_AUTO_REJECT
    ? 'OrderDetailsPanel.orderAutoRejectedTitle'
    : 'OrderDetailsPanel.orderRejectedTitle';

  switch (orderState) {
    case propTypes.TX_STATE_PREAUTHORIZED:
      return (
        <span>
          <span className={css.mainTitle}>
            <FormattedMessage
              id="OrderDetailsPanel.orderPreauthorizedTitle"
              values={{ customerName }}
            />
          </span>
          <FormattedMessage
            id="OrderDetailsPanel.orderPreauthorizedSubtitle"
            values={{ listingLink }}
          />
        </span>
      );
    case propTypes.TX_STATE_ACCEPTED:
      return (
        <span>
          <span className={css.mainTitle}>
            <FormattedMessage id="OrderDetailsPanel.orderAcceptedTitle" values={{ customerName }} />
          </span>
          <FormattedMessage id="OrderDetailsPanel.orderAcceptedSubtitle" values={{ listingLink }} />
        </span>
      );
    case propTypes.TX_STATE_REJECTED:
      return <FormattedMessage id={rejectedTranslationId} values={{ listingLink }} />;
    case propTypes.TX_STATE_DELIVERED:
      return (
        <FormattedMessage id="OrderDetailsPanel.orderDeliveredTitle" values={{ listingLink }} />
      );
    default:
      return null;
  }
};

const orderMessage = (
  orderState,
  listingTitle,
  providerName,
  lastTransitionedAt,
  lastTransition
) => {
  const transitionDate = (
    <span className={css.transitionDate}>
      <FormattedDate value={lastTransitionedAt} year="numeric" month="short" day="numeric" />
    </span>
  );

  const rejectedTranslationId = lastTransition === propTypes.TX_TRANSITION_AUTO_REJECT
    ? 'OrderDetailsPanel.orderAutoRejectedStatus'
    : 'OrderDetailsPanel.orderRejectedStatus';

  switch (orderState) {
    case propTypes.TX_STATE_PREAUTHORIZED:
      return (
        <FormattedMessage
          id="OrderDetailsPanel.orderPreauthorizedStatus"
          values={{ providerName }}
        />
      );
    case propTypes.TX_STATE_ACCEPTED:
      return (
        <FormattedMessage
          id="OrderDetailsPanel.orderAcceptedStatus"
          values={{ providerName, transitionDate }}
        />
      );
    case propTypes.TX_STATE_REJECTED:
      return (
        <FormattedMessage id={rejectedTranslationId} values={{ providerName, transitionDate }} />
      );
    case propTypes.TX_STATE_DELIVERED:
      return (
        <FormattedMessage
          id="OrderDetailsPanel.orderDeliveredStatus"
          values={{ providerName, transitionDate }}
        />
      );
    default:
      return null;
  }
};

const OrderDetailsPanel = props => {
  const {
    className,
    totalPrice,
    orderState,
    lastTransitionedAt,
    lastTransition,
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
    ? <BookingBreakdown
        className={css.receipt}
        bookingStart={booking.attributes.start}
        bookingEnd={booking.attributes.end}
        unitPrice={unitPrice}
        totalPrice={totalPrice}
      />
    : <p className={css.error}>{'priceRequiredMessage'}</p>;

  // orderState affects to both title and message section
  const title = orderTitle(orderState, listingLink, customerName, lastTransition);
  const message = orderMessage(
    orderState,
    listingLink,
    providerName,
    lastTransitionedAt,
    lastTransition
  );

  return (
    <div className={className}>
      <h1 className={css.title}>{title}</h1>
      <div className={css.message}>
        {message}
      </div>
      <h3 className={css.bookingBreakdownTitle}>
        <FormattedMessage id="OrderDetailsPanel.bookingBreakdownTitle" />
      </h3>
      {bookingInfo}
    </div>
  );
};

OrderDetailsPanel.defaultProps = { className: null, lastTransition: null };

const { instanceOf, string } = PropTypes;

OrderDetailsPanel.propTypes = {
  className: string,
  totalPrice: instanceOf(types.Money).isRequired,
  orderState: string.isRequired,
  lastTransitionedAt: instanceOf(Date).isRequired,
  lastTransition: string,
  booking: propTypes.booking.isRequired,
  listing: propTypes.listing.isRequired,
  provider: propTypes.user.isRequired,
  customer: propTypes.user.isRequired,
};

export default OrderDetailsPanel;
