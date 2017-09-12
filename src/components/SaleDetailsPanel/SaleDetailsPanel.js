import React, { PropTypes } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { createSlug } from '../../util/urlHelpers';
import { ensureListing, ensureTransaction, ensureUser } from '../../util/data';
import {
  AvatarLarge,
  BookingBreakdown,
  NamedLink,
  ResponsiveImage,
  PrimaryButton,
  SecondaryButton,
} from '../../components';

import css from './SaleDetailsPanel.css';

const breakdown = transaction => {
  const loaded = transaction && transaction.id && transaction.booking && transaction.booking.id;

  return loaded
    ? <BookingBreakdown
        userRole="provider"
        transaction={transaction}
        booking={transaction.booking}
      />
    : null;
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
    onAcceptSale,
    onRejectSale,
    acceptOrRejectInProgress,
  } = props;
  const currentTransaction = ensureTransaction(transaction);
  const currentListing = ensureListing(currentTransaction.listing);
  const currentCustomer = ensureUser(currentTransaction.customer);

  const customerDisplayName = currentCustomer.attributes.profile.displayName;
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

  const title = saleTitle(transactionState, listingLink, customerDisplayName, lastTransition);
  const message = saleMessage(
    transactionState,
    customerDisplayName,
    lastTransitionedAt,
    lastTransition
  );

  const listingTitle = currentListing.attributes.title;
  const firstImage = currentListing.images && currentListing.images.length > 0
    ? currentListing.images[0]
    : null;

  const isPreauthorizedState = currentTransaction.attributes.state ===
    propTypes.TX_STATE_PREAUTHORIZED;
  const actionButtons = isPreauthorizedState
    ? <div className={css.actionButtons}>
        <SecondaryButton
          className={css.rejectButton}
          disabled={acceptOrRejectInProgress}
          onClick={() => onRejectSale(currentTransaction.id)}
        >
          <FormattedMessage id="SalePage.rejectButton" />
        </SecondaryButton>
        <PrimaryButton
          className={css.acceptButton}
          disabled={acceptOrRejectInProgress}
          onClick={() => onAcceptSale(currentTransaction.id)}
        >
          <FormattedMessage id="SalePage.acceptButton" />
        </PrimaryButton>
      </div>
    : null;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.container}>
        <div className={css.aspectWrapperMobile}>
          <ResponsiveImage
            rootClassName={css.rootForImage}
            alt={listingTitle}
            image={firstImage}
            nameSet={[
              { name: 'landscape-crop', size: '400w' },
              { name: 'landscape-crop2x', size: '800w' },
            ]}
            sizes="100vw"
          />
        </div>
        <div className={css.avatarWrapperMobile}>
          <AvatarLarge user={currentCustomer} />
        </div>
        <div className={css.info}>
          <div className={css.avatarWrapperDesktop}>
            <AvatarLarge user={currentCustomer} />
          </div>
          <h1 className={css.title}>{title}</h1>
          <p className={css.message}>{message}</p>
          {actionButtons}
        </div>
        <div className={css.breakdownContainerMobile}>
          <h3 className={css.breakdownTitleMobile}>
            <FormattedMessage id="SaleDetailsPanel.bookingBreakdownTitle" />
          </h3>
          {bookingInfo}
        </div>
        <div className={css.breakdownContainerDesktop}>
          <div className={css.aspectWrapperDesktop}>
            <ResponsiveImage
              rootClassName={css.rootForImage}
              alt={listingTitle}
              image={firstImage}
              nameSet={[
                { name: 'landscape-crop', size: '400w' },
                { name: 'landscape-crop2x', size: '800w' },
              ]}
              sizes="100%"
            />
          </div>
          <h3 className={css.breakdownTitleDesktop}>
            <FormattedMessage id="SaleDetailsPanel.bookingBreakdownTitle" />
          </h3>
          <div className={css.breakdownDesktop}>
            {bookingInfo}
          </div>
        </div>
      </div>
    </div>
  );
};

SaleDetailsPanel.defaultProps = {
  rootClassName: null,
  className: null,
  lastTransition: null,
};

const { string, func, bool } = PropTypes;

SaleDetailsPanel.propTypes = {
  rootClassName: string,
  className: string,
  transaction: propTypes.transaction.isRequired,
  onAcceptSale: func.isRequired,
  onRejectSale: func.isRequired,
  acceptOrRejectInProgress: bool.isRequired,
};

export default SaleDetailsPanel;
