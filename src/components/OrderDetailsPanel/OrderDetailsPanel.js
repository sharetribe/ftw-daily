import React, { PropTypes } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { createSlug } from '../../util/urlHelpers';
import { ensureListing, ensureTransaction, ensureBooking, ensureUser } from '../../util/data';
import { BookingBreakdown, NamedLink } from '../../components';

import css from './OrderDetailsPanel.css';

const breakdown = transaction => {
  const tx = ensureTransaction(transaction);
  const booking = ensureBooking(tx.booking);
  const bookingStart = booking.attributes.start;
  const bookingEnd = booking.attributes.end;
  const payinTotal = tx.attributes.payinTotal;
  const lineItems = tx.attributes.lineItems;

  if (!bookingStart || !bookingEnd || !payinTotal || !lineItems) {
    return null;
  }
  return (
    <BookingBreakdown
      className={css.receipt}
      bookingStart={bookingStart}
      bookingEnd={bookingEnd}
      payinTotal={payinTotal}
      lineItems={lineItems}
      userRole="customer"
    />
  );
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
    rootClassName,
    className,
    transaction,
  } = props;
  const currentTransaction = ensureTransaction(transaction);
  const currentListing = ensureListing(currentTransaction.listing);
  const currentProvider = ensureUser(currentTransaction.provider);
  const currentCustomer = ensureUser(currentTransaction.customer);

  const providerName = currentProvider.attributes.profile.firstName;
  const customerName = currentCustomer.attributes.profile.firstName;
  const transactionState = currentTransaction.attributes.state;
  const lastTransitionedAt = currentTransaction.attributes.lastTransitionedAt;
  const lastTransition = currentTransaction.attributes.lastTransitione;

  let listingLink = null;

  if (currentListing.id && currentListing.attributes.title) {
    const title = currentListing.attributes.title;
    const params = { id: currentListing.id.uuid, slug: createSlug(title) };
    listingLink = (
      <NamedLink name="ListingPage" params={params}>
        {title}
      </NamedLink>
    );
  }

  const bookingInfo = breakdown(currentTransaction);
  const title = orderTitle(transactionState, listingLink, customerName, lastTransition);
  const message = orderMessage(
    transactionState,
    listingLink,
    providerName,
    lastTransitionedAt,
    lastTransition
  );

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
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

OrderDetailsPanel.defaultProps = {
  rootClassName: null,
  className: null,
  lastTransition: null,
};

const { string } = PropTypes;

OrderDetailsPanel.propTypes = {
  rootClassName: string,
  className: string,
  transaction: propTypes.transaction.isRequired,
};

export default OrderDetailsPanel;
