import React, { PropTypes } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import Decimal from 'decimal.js';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { types } from '../../util/sdkLoader';
import { createSlug } from '../../util/urlHelpers';
import { ensureListing, ensureTransaction, ensureBooking, ensureUser } from '../../util/data';
import { convertMoneyToNumber, convertUnitToSubUnit } from '../../util/currency';
import config from '../../config';
import { Avatar, BookingBreakdown, NamedLink } from '../../components';

import css from './SaleDetailsPanel.css';

// TODO: This is a temporary function to calculate the booking
// price. This should be removed when the API supports dry-runs and we
// can take the total price from the transaction itself.
const estimatedProviderTotalPrice = (customerTotalPrice, commission) => {
  const { subUnitDivisor, currency } = config.currencyConfig;
  if (customerTotalPrice.currency !== currency || commission.currency !== currency) {
    throw new Error('Transaction total or commission currency does not match marketplace currency');
  }

  const numericCustomerTotalPrice = convertMoneyToNumber(customerTotalPrice, subUnitDivisor);
  const numericCommission = convertMoneyToNumber(commission, subUnitDivisor);
  const numericTotalPrice = new Decimal(numericCustomerTotalPrice)
    .minus(numericCommission)
    .toNumber();

  return new types.Money(convertUnitToSubUnit(numericTotalPrice, subUnitDivisor), currency);
};

const breakdown = transaction => {
  const tx = ensureTransaction(transaction);
  const listing = ensureListing(tx.listing);
  const booking = ensureBooking(tx.booking);
  const bookingStart = booking.attributes.start;
  const bookingEnd = booking.attributes.end;
  const unitPrice = listing.attributes.price;
  const customerTotalPrice = tx.attributes.total;
  const commission = tx.attributes.commission;

  if (!bookingStart || !bookingEnd || !unitPrice || !customerTotalPrice || !commission) {
    return null;
  }

  const totalPrice = estimatedProviderTotalPrice(customerTotalPrice, commission);

  return (
    <BookingBreakdown
      className={css.receipt}
      bookingStart={bookingStart}
      bookingEnd={bookingEnd}
      unitPrice={unitPrice}
      totalPrice={totalPrice}
      commission={commission}
    />
  );
};

const saleTitle = (saleState, listingLink, customerName) => {
  switch (saleState) {
    case propTypes.TX_STATE_PREAUTHORIZED:
      return (
        <FormattedMessage
          id="SaleDetailsPanel.listingRequestedTitle"
          values={{ customerName: customerName, title: listingLink }}
        />
      );
    case propTypes.TX_STATE_ACCEPTED:
      return (
        <FormattedMessage
          id="SaleDetailsPanel.listingAcceptedTitle"
          values={{ customerName: customerName, title: listingLink }}
        />
      );
    case propTypes.TX_STATE_REJECTED:
      return (
        <FormattedMessage
          id="SaleDetailsPanel.listingRejectedTitle"
          values={{ customerName: customerName, title: listingLink }}
        />
      );
    case propTypes.TX_STATE_DELIVERED:
      return (
        <FormattedMessage
          id="SaleDetailsPanel.listingDeliveredTitle"
          values={{ customerName: customerName, title: listingLink }}
        />
      );
    default:
      return null;
  }
};

const saleMessage = (saleState, customerName, lastTransitionedAt, lastTransition) => {
  const rejectedStatusTranslationId = lastTransition === propTypes.TX_TRANSITION_AUTO_REJECT
    ? 'SaleDetailsPanel.saleAutoRejectedStatus'
    : 'SaleDetailsPanel.saleRejectedStatus';
  switch (saleState) {
    case propTypes.TX_STATE_PREAUTHORIZED:
      return (
        <div className={css.message}>
          <FormattedMessage id="SaleDetailsPanel.saleRequestedStatus" values={{ customerName }} />
        </div>
      );
    case propTypes.TX_STATE_ACCEPTED:
      return (
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
      );
    case propTypes.TX_STATE_REJECTED:
      return (
        <div className={css.message}>
          <FormattedMessage id={rejectedStatusTranslationId} />
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
      );
    case propTypes.TX_STATE_DELIVERED:
      return (
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

  const bookingInfo = breakdown(currentTransaction);
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
      <div className={css.messagesContainer}>
        <div className={css.avatarWrapper}>
          <Avatar firstName={customerFirstName} lastName={customerLastName} />
        </div>
        <h1 className={css.title}>
          {title}
        </h1>
        {message}
      </div>
      {bookingInfo}
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
