import React, { PropTypes } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { createSlug } from '../../util/urlHelpers';
import { ensureListing, ensureTransaction, ensureBooking, ensureUser } from '../../util/data';
import { AvatarMedium, BookingBreakdown, NamedLink } from '../../components';

import css from './SaleDetailsPanel.css';

const breakdown = (transaction, totalLabelMessage) => {
  const tx = ensureTransaction(transaction);
  const booking = ensureBooking(tx.booking);
  const bookingStart = booking.attributes.start;
  const bookingEnd = booking.attributes.end;
  const payinTotal = tx.attributes.payinTotal;
  const payoutTotal = tx.attributes.payoutTotal;
  const lineItems = tx.attributes.lineItems;

  if (!bookingStart || !bookingEnd || !payinTotal || !payoutTotal || !lineItems) {
    return null;
  }

  return (
    <BookingBreakdown
      className={css.breakdown}
      bookingStart={bookingStart}
      bookingEnd={bookingEnd}
      payinTotal={payinTotal}
      payoutTotal={payoutTotal}
      lineItems={lineItems}
      userRole="provider"
      totalLabelMessage={totalLabelMessage}
    />
  );
};

const saleTitle = (saleState, listingLink, customerName) => {
  switch (saleState) {
    case propTypes.TX_STATE_PREAUTHORIZED:
      return (
        <FormattedMessage
          id="SaleDetailsPanel.listingRequestedTitle"
          values={{ customerName, listingLink }}
        />
      );
    case propTypes.TX_STATE_ACCEPTED:
      return (
        <FormattedMessage
          id="SaleDetailsPanel.listingAcceptedTitle"
          values={{ customerName, listingLink }}
        />
      );
    case propTypes.TX_STATE_REJECTED:
      return (
        <FormattedMessage
          id="SaleDetailsPanel.listingRejectedTitle"
          values={{ customerName, listingLink }}
        />
      );
    case propTypes.TX_STATE_DELIVERED:
      return (
        <FormattedMessage
          id="SaleDetailsPanel.listingDeliveredTitle"
          values={{ customerName, listingLink }}
        />
      );
    default:
      return null;
  }
};

const saleMessage = (saleState, customerName, lastTransitionedAt, lastTransition) => {
  const formattedDate = (
    <span className={css.nowrap}>
      <FormattedDate
        value={lastTransitionedAt}
        year="numeric"
        month="short"
        day="numeric"
        weekday="long"
      />
    </span>
  );
  const rejectedStatusTranslationId = lastTransition === propTypes.TX_TRANSITION_AUTO_REJECT
    ? 'SaleDetailsPanel.saleAutoRejectedStatus'
    : 'SaleDetailsPanel.saleRejectedStatus';
  switch (saleState) {
    case propTypes.TX_STATE_PREAUTHORIZED:
      return (
        <FormattedMessage id="SaleDetailsPanel.saleRequestedStatus" values={{ customerName }} />
      );
    case propTypes.TX_STATE_ACCEPTED: {
      return (
        <FormattedMessage id="SaleDetailsPanel.saleAcceptedStatus" values={{ formattedDate }} />
      );
    }
    case propTypes.TX_STATE_REJECTED:
      return <FormattedMessage id={rejectedStatusTranslationId} values={{ formattedDate }} />;
    case propTypes.TX_STATE_DELIVERED:
      return (
        <FormattedMessage id="SaleDetailsPanel.saleDeliveredStatus" values={{ formattedDate }} />
      );
    default:
      return null;
  }
};

const SaleDetailsPanel = props => {
  const {
    rootClassName,
    className,
    transaction,
  } = props;
  const currentTransaction = ensureTransaction(transaction);
  const currentListing = ensureListing(currentTransaction.listing);
  const currentCustomer = ensureUser(currentTransaction.customer);

  const customerFirstName = currentCustomer.attributes.profile.firstName;
  const customerLastName = currentCustomer.attributes.profile.lastName;
  const transactionState = currentTransaction.attributes.state;
  const lastTransitionedAt = currentTransaction.attributes.lastTransitionedAt;
  const lastTransition = currentTransaction.attributes.lastTransition;

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

  const wasRejected = transactionState === propTypes.TX_STATE_REJECTED;
  const totalMessage = wasRejected
    ? <FormattedMessage id="SaleDetailsPanel.providerRejectedTotal" />
    : <FormattedMessage id="SaleDetailsPanel.providerTotal" />;

  const bookingInfo = breakdown(currentTransaction, totalMessage);

  const title = saleTitle(transactionState, listingLink, customerFirstName, lastTransition);
  const message = saleMessage(
    transactionState,
    customerFirstName,
    lastTransitionedAt,
    lastTransition
  );

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.header}>
        <h1 className={css.title}>
          {title}
        </h1>
        <div className={css.avatarWrapper}>
          <AvatarMedium firstName={customerFirstName} lastName={customerLastName} />
        </div>
      </div>
      <p className={css.message}>{message}</p>
      <div className={css.bookingBreakdownContainer}>
        <h3 className={css.bookingBreakdownTitle}>
          <FormattedMessage id="SaleDetailsPanel.bookingBreakdownTitle" />
        </h3>
        {bookingInfo}
      </div>
    </div>
  );
};

SaleDetailsPanel.defaultProps = {
  rootClassName: null,
  className: null,
  lastTransition: null,
};

const { string } = PropTypes;

SaleDetailsPanel.propTypes = {
  rootClassName: string,
  className: string,
  transaction: propTypes.transaction.isRequired,
};

export default SaleDetailsPanel;
