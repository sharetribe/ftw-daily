import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import {
  txHasBeenAccepted,
  txHasFirstReview,
  txIsAccepted,
  txIsCanceled,
  txIsCompleted,
  txIsDeclined,
  txIsEnquired,
  txIsExpired,
  txIsRequested,
  txIsReviewed,
} from '../../util/types';
import { userDisplayName } from '../../util/data';
import { createSlug, stringify } from '../../util/urlHelpers';
import {
  ActivityFeed,
  BookingBreakdown,
  BookingPanel,
  ExternalLink,
  NamedLink,
  PrimaryButton,
  SecondaryButton,
} from '../../components';
import config from '../../config';

import css from './TransactionPanel.css';

// Functional component as a helper to build ActivityFeed section
export const FeedSection = props => {
  const {
    className,
    rootClassName,
    currentTransaction,
    currentUser,
    fetchMessagesError,
    fetchMessagesInProgress,
    initialMessageFailed,
    messages,
    oldestMessagePageFetched,
    onShowMoreMessages,
    onOpenReviewModal,
    totalMessagePages,
  } = props;

  const txTransitions = currentTransaction.attributes.transitions
    ? currentTransaction.attributes.transitions
    : [];
  const hasOlderMessages = totalMessagePages > oldestMessagePageFetched;

  const showFeed =
    messages.length > 0 || txTransitions.length > 0 || initialMessageFailed || fetchMessagesError;

  const classes = classNames(rootClassName || css.feedContainer, className);

  return showFeed ? (
    <div className={classes}>
      <h3 className={css.feedHeading}>
        <FormattedMessage id="TransactionPanel.activityHeading" />
      </h3>
      {initialMessageFailed ? (
        <p className={css.messageError}>
          <FormattedMessage id="TransactionPanel.initialMessageFailed" />
        </p>
      ) : null}
      {fetchMessagesError ? (
        <p className={css.messageError}>
          <FormattedMessage id="TransactionPanel.messageLoadingFailed" />
        </p>
      ) : null}
      <ActivityFeed
        className={css.feed}
        messages={messages}
        transaction={currentTransaction}
        currentUser={currentUser}
        hasOlderMessages={hasOlderMessages && !fetchMessagesInProgress}
        onOpenReviewModal={onOpenReviewModal}
        onShowOlderMessages={() => {
          onShowMoreMessages(currentTransaction.id);
        }}
        fetchMessagesInProgress={fetchMessagesInProgress}
      />
    </div>
  ) : null;
};

// Functional component as a helper to build AddressLinkMaybe
export const AddressLinkMaybe = props => {
  const { transaction, transactionRole, currentListing } = props;

  const isCustomer = transactionRole === 'customer';
  const txIsAcceptedForCustomer = isCustomer && txHasBeenAccepted(transaction);

  const publicData = currentListing.attributes.publicData || {};
  const { address, building } = publicData.location || {};
  const geolocation = currentListing.attributes.geolocation;

  const { lat, lng } = geolocation || {};
  const hrefToGoogleMaps = geolocation
    ? `https://maps.google.com/?q=${lat},${lng}`
    : address
    ? `https://maps.google.com/?q=${encodeURIComponent(address)}`
    : null;

  const fullAddress =
    typeof building === 'string' && building.length > 0 ? `${building}, ${address}` : address;

  return txIsAcceptedForCustomer && hrefToGoogleMaps ? (
    <p className={css.address}>
      <ExternalLink href={hrefToGoogleMaps}>{fullAddress}</ExternalLink>
    </p>
  ) : null;
};

// Functional component as a helper to build BookingBreakdown
export const BreakdownMaybe = props => {
  const { className, rootClassName, breakdownClassName, transaction, transactionRole } = props;
  const loaded = transaction && transaction.id && transaction.booking && transaction.booking.id;

  const classes = classNames(rootClassName || className);
  const breakdownClasses = classNames(css.breakdown, breakdownClassName);

  return loaded ? (
    <div className={classes}>
      <h3 className={css.bookingBreakdownTitle}>
        <FormattedMessage id="TransactionPanel.bookingBreakdownTitle" />
      </h3>
      <BookingBreakdown
        className={breakdownClasses}
        userRole={transactionRole}
        unitType={config.bookingUnitType}
        transaction={transaction}
        booking={transaction.booking}
      />
    </div>
  ) : null;
};

const createListingLink = (listing, label, searchParams = {}, className = '') => {
  const listingLoaded = !!listing.id;

  if (listingLoaded && !listing.attributes.deleted) {
    const title = listing.attributes.title;
    const params = { id: listing.id.uuid, slug: createSlug(title) };
    const to = { search: stringify(searchParams) };
    return (
      <NamedLink className={className} name="ListingPage" params={params} to={to}>
        {label}
      </NamedLink>
    );
  } else {
    return <FormattedMessage id="TransactionPanel.deletedListingOrderTitle" />;
  }
};

// Functional component as a helper to build detail card headings
export const DetailCardHeadingsMaybe = props => {
  const { transaction, transactionRole, listing, listingTitle, subTitle } = props;

  const isCustomer = transactionRole === 'customer';
  const canShowDetailCardHeadings = isCustomer && !txIsEnquired(transaction);

  return canShowDetailCardHeadings ? (
    <div className={css.detailCardHeadings}>
      <h2 className={css.detailCardTitle}>{listingTitle}</h2>
      <p className={css.detailCardSubtitle}>{subTitle}</p>
      <AddressLinkMaybe
        transaction={transaction}
        transactionRole={transactionRole}
        currentListing={listing}
      />
    </div>
  ) : null;
};

// Functional component as a helper to build a BookingPanel
export const BookingPanelMaybe = props => {
  const {
    authorDisplayName,
    transaction,
    transactionRole,
    listing,
    listingTitle,
    subTitle,
    provider,
    onSubmit,
    onManageDisableScrolling,
    timeSlots,
    fetchTimeSlotsError,
  } = props;

  const isProviderLoaded = !!provider.id;
  const isProviderBanned = isProviderLoaded && provider.attributes.banned;
  const isCustomer = transactionRole === 'customer';
  const canShowBookingPanel = isCustomer && txIsEnquired(transaction) && !isProviderBanned;

  return canShowBookingPanel ? (
    <BookingPanel
      className={css.bookingPanel}
      titleClassName={css.bookingTitle}
      isOwnListing={false}
      listing={listing}
      handleBookingSubmit={() => console.log('submit')}
      title={listingTitle}
      subTitle={subTitle}
      authorDisplayName={authorDisplayName}
      onSubmit={onSubmit}
      onManageDisableScrolling={onManageDisableScrolling}
      timeSlots={timeSlots}
      fetchTimeSlotsError={fetchTimeSlotsError}
    />
  ) : null;
};

// Functional component as a helper to build ActionButtons for
// provider when state is preauthorized
export const SaleActionButtonsMaybe = props => {
  const {
    className,
    rootClassName,
    canShowButtons,
    transaction,
    acceptInProgress,
    declineInProgress,
    acceptSaleError,
    declineSaleError,
    onAcceptSale,
    onDeclineSale,
  } = props;

  const buttonsDisabled = acceptInProgress || declineInProgress;

  const acceptErrorMessage = acceptSaleError ? (
    <p className={css.actionError}>
      <FormattedMessage id="TransactionPanel.acceptSaleFailed" />
    </p>
  ) : null;
  const declineErrorMessage = declineSaleError ? (
    <p className={css.actionError}>
      <FormattedMessage id="TransactionPanel.declineSaleFailed" />
    </p>
  ) : null;

  const classes = classNames(rootClassName || css.actionButtons, className);

  return canShowButtons ? (
    <div className={classes}>
      <div className={css.actionErrors}>
        {acceptErrorMessage}
        {declineErrorMessage}
      </div>
      <div className={css.actionButtonWrapper}>
        <SecondaryButton
          inProgress={declineInProgress}
          disabled={buttonsDisabled}
          onClick={() => onDeclineSale(transaction.id)}
        >
          <FormattedMessage id="TransactionPanel.declineButton" />
        </SecondaryButton>
        <PrimaryButton
          inProgress={acceptInProgress}
          disabled={buttonsDisabled}
          onClick={() => onAcceptSale(transaction.id)}
        >
          <FormattedMessage id="TransactionPanel.acceptButton" />
        </PrimaryButton>
      </div>
    </div>
  ) : null;
};

// Functional component as a helper to build order title
export const OrderTitle = props => {
  const {
    className,
    rootClassName,
    transaction,
    customerDisplayName: customerName,
    currentListing,
    listingTitle,
  } = props;
  const listingLink = createListingLink(currentListing, listingTitle);

  const classes = classNames(rootClassName || css.headingOrder, className);

  if (txIsEnquired(transaction)) {
    return (
      <h1 className={classes}>
        <span className={css.mainTitle}>
          <FormattedMessage id="TransactionPanel.orderEnquiredTitle" values={{ listingLink }} />
        </span>
      </h1>
    );
  } else if (txIsRequested(transaction)) {
    return (
      <h1 className={classes}>
        <span className={css.mainTitle}>
          <FormattedMessage
            id="TransactionPanel.orderPreauthorizedTitle"
            values={{ customerName }}
          />
        </span>
        <FormattedMessage
          id="TransactionPanel.orderPreauthorizedSubtitle"
          values={{ listingLink }}
        />
      </h1>
    );
  } else if (txIsAccepted(transaction)) {
    return (
      <h1 className={classes}>
        <span className={css.mainTitle}>
          <FormattedMessage id="TransactionPanel.orderAcceptedTitle" values={{ customerName }} />
        </span>
        <FormattedMessage id="TransactionPanel.orderAcceptedSubtitle" values={{ listingLink }} />
      </h1>
    );
  } else if (txIsDeclined(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.orderDeclinedTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (txIsExpired(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.orderDeclinedTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (txIsCanceled(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.orderCancelledTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (
    txIsCompleted(transaction) ||
    txHasFirstReview(transaction) ||
    txIsReviewed(transaction)
  ) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.orderDeliveredTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else {
    return null;
  }
};

// Functional component as a helper to build order message below title
export const OrderMessage = props => {
  const {
    className,
    rootClassName,
    transaction,
    authorDisplayName: providerName,
    listingDeleted,
  } = props;
  const classes = classNames(rootClassName || css.transactionInfoMessage, className);

  if (!listingDeleted && txIsRequested(transaction)) {
    return (
      <p className={classes}>
        <FormattedMessage id="TransactionPanel.orderPreauthorizedInfo" values={{ providerName }} />
      </p>
    );
  } else if (listingDeleted) {
    return (
      <p className={classes}>
        <FormattedMessage id="TransactionPanel.messageDeletedListing" />
      </p>
    );
  }
  return null;
};

// Functional component as a helper to build sale title
export const SaleTitle = props => {
  const {
    className,
    rootClassName,
    transaction,
    customerDisplayName: customerName,
    currentListing,
    listingTitle,
  } = props;
  const listingLink = createListingLink(currentListing, listingTitle);

  const classes = classNames(rootClassName || css.headingSale, className);

  if (txIsEnquired(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.saleEnquiredTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (txIsRequested(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.saleRequestedTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (txIsAccepted(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.saleAcceptedTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (txIsDeclined(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.saleDeclinedTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (txIsExpired(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.saleDeclinedTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (txIsCanceled(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.saleCancelledTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (
    txIsCompleted(transaction) ||
    txHasFirstReview(transaction) ||
    txIsReviewed(transaction)
  ) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.saleDeliveredTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else {
    return null;
  }
};

// Functional component as a helper to build sale message below title
export const SaleMessage = props => {
  const {
    className,
    rootClassName,
    transaction,
    customerDisplayName: customerName,
    isCustomerBanned,
  } = props;
  const classes = classNames(rootClassName || css.transactionInfoMessage, className);

  if (!isCustomerBanned && txIsRequested(transaction)) {
    return (
      <p className={classes}>
        <FormattedMessage id="TransactionPanel.saleRequestedInfo" values={{ customerName }} />
      </p>
    );
  } else if (isCustomerBanned) {
    return (
      <p className={classes}>
        <FormattedMessage id="TransactionPanel.customerBannedStatus" />
      </p>
    );
  }
  return null;
};

// Functional component as a helper to choose and show Order or Sale title
export const TransactionPageTitle = props => {
  return props.transactionRole === 'customer' ? (
    <OrderTitle {...props} />
  ) : (
    <SaleTitle {...props} />
  );
};

// Functional component as a helper to choose and show Order or Sale message
export const TransactionPageMessage = props => {
  return props.transactionRole === 'customer' ? (
    <OrderMessage {...props} />
  ) : (
    <SaleMessage {...props} />
  );
};

// Helper function to get display names for different roles
export const displayNames = (
  currentUser,
  currentProvider,
  currentCustomer,
  bannedUserDisplayName
) => {
  const authorDisplayName = userDisplayName(currentProvider, bannedUserDisplayName);
  const customerDisplayName = userDisplayName(currentCustomer, bannedUserDisplayName);

  let otherUserDisplayName = '';
  const currentUserIsCustomer =
    currentUser.id && currentCustomer.id && currentUser.id.uuid === currentCustomer.id.uuid;
  const currentUserIsProvider =
    currentUser.id && currentProvider.id && currentUser.id.uuid === currentProvider.id.uuid;

  if (currentUserIsCustomer) {
    otherUserDisplayName = authorDisplayName;
  } else if (currentUserIsProvider) {
    otherUserDisplayName = customerDisplayName;
  }

  return {
    authorDisplayName,
    customerDisplayName,
    otherUserDisplayName,
  };
};
