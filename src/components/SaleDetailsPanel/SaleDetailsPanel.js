import React, { PropTypes } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { types } from '../../util/sdkLoader';
import { createSlug } from '../../util/urlHelpers';
import { Avatar, BookingInfo, NamedLink } from '../../components';

import css from './SaleDetailsPanel.css';

const SaleDetailsPanel = props => {
  const {
    className,
    subtotalPrice,
    saleState,
    booking,
    lastTransitionedAt,
    listing,
    customer,
    commission,
  } = props;
  const { firstName, lastName } = customer.attributes.profile;
  const customerName = firstName ? `${firstName} ${lastName}` : '';

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
        commission={commission}
        subtotalPrice={subtotalPrice}
      />
    : <p className={css.error}>{'priceRequiredMessage'}</p>;

  // saleState affects to both title and message section
  let stateMsgData = {};
  switch (saleState) {
    case propTypes.TX_STATE_PREAUTHORIZED:
      stateMsgData = {
        title: (
          <FormattedMessage
            id="SaleDetailsPanel.listingRequestedTitle"
            values={{ customerName: customerName, title: listingLink }}
          />
        ),
        message: (
          <div className={css.message}>
            <FormattedMessage id="SaleDetailsPanel.saleRequestedStatus" values={{ customerName }} />
          </div>
        ),
      };
      break;
    case propTypes.TX_STATE_ACCEPTED:
      stateMsgData = {
        title: (
          <FormattedMessage
            id="SaleDetailsPanel.listingAcceptedTitle"
            values={{ customerName: customerName, title: listingLink }}
          />
        ),
        message: (
          <div className={css.message}>
            <FormattedMessage id="SaleDetailsPanel.saleAcceptedStatus" />
            <FormattedMessage
              id="SaleDetailsPanel.onDate"
              values={{
                formattedDate: (
                  <FormattedDate
                    value={lastTransitionedAt}
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                ),
              }}
            />
          </div>
        ),
      };
      break;
    case propTypes.TX_STATE_REJECTED:
      stateMsgData = {
        title: (
          <FormattedMessage
            id="SaleDetailsPanel.listingRejectedTitle"
            values={{ customerName: customerName, title: listingLink }}
          />
        ),
        message: (
          <div className={css.message}>
            <FormattedMessage id="SaleDetailsPanel.saleRejectedStatus" />
            <FormattedMessage
              id="SaleDetailsPanel.onDate"
              values={{
                formattedDate: (
                  <FormattedDate
                    value={lastTransitionedAt}
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                ),
              }}
            />
          </div>
        ),
      };
      break;
    case propTypes.TX_STATE_DELIVERED:
      stateMsgData = {
        title: (
          <FormattedMessage
            id="SaleDetailsPanel.listingDeliveredTitle"
            values={{ customerName: customerName, title: listingLink }}
          />
        ),
        message: (
          <div className={css.message}>
            <FormattedMessage id="SaleDetailsPanel.saleDeliveredStatus" />
            <FormattedMessage
              id="SaleDetailsPanel.onDate"
              values={{
                formattedDate: (
                  <FormattedDate
                    value={lastTransitionedAt}
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                ),
              }}
            />
          </div>
        ),
      };
      break;
    default:
      stateMsgData = { title: null, message: null };
  }

  return (
    <div className={className}>
      <div className={css.messagesContainer}>
        <div className={css.avatarWrapper}>
          <Avatar firstName={firstName} lastName={lastName} />
        </div>
        <h1 className={css.title}>
          {stateMsgData.title}
        </h1>
        {stateMsgData.message}
      </div>
      {bookingInfo}
    </div>
  );
};

SaleDetailsPanel.defaultProps = { className: null };

const { instanceOf, string } = PropTypes;

SaleDetailsPanel.propTypes = {
  className: string,
  subtotalPrice: instanceOf(types.Money).isRequired,
  commission: instanceOf(types.Money).isRequired,
  saleState: string.isRequired,
  lastTransitionedAt: instanceOf(Date).isRequired,
  booking: propTypes.booking.isRequired,
  listing: propTypes.listing.isRequired,
  customer: propTypes.user.isRequired,
};

export default SaleDetailsPanel;
