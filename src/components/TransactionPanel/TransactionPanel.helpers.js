import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { userDisplayName } from '../../util/data';
import { createSlug } from '../../util/urlHelpers';
import {
  ActivityFeed,
  BookingBreakdown,
  NamedLink,
  PrimaryButton,
  SecondaryButton,
} from '../../components';
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

// Functional component as a helper to build BookingBreakdown
export const BreakdownMaybe = props => {
  const { className, rootClassName, transaction, transactionRole } = props;
  const loaded = transaction && transaction.id && transaction.booking && transaction.booking.id;

  const classes = classNames(rootClassName || css.breakdown, className);
  return loaded ? (
    <div>
      <h3 className={css.bookingBreakdownTitle}>
        <FormattedMessage id="TransactionPanel.bookingBreakdownTitle" />
      </h3>
      <BookingBreakdown
        className={classes}
        userRole={transactionRole}
        transaction={transaction}
        booking={transaction.booking}
      />
    </div>
  ) : null;
};

const createListingLink = (listing, label, listingPageName = 'ListingPage', className = '') => {
  const listingLoaded = !!listing.id;

  if (listingLoaded && !listing.attributes.deleted) {
    const title = listing.attributes.title;
    const params = { id: listing.id.uuid, slug: createSlug(title) };
    return (
      <NamedLink className={className} name={listingPageName} params={params}>
        {label}
      </NamedLink>
    );
  } else {
    return <FormattedMessage id="TransactionPanel.deletedListingOrderTitle" />;
  }
};

// Functional component as a helper to build ActionButtons for
// provider when state is preauthorized
export const OrderActionButtonMaybe = props => {
  const { className, rootClassName, canShowButtons, listing } = props;

  const title = <FormattedMessage id="TransactionPanel.requestToBook" />;
  const listingLink = createListingLink(listing, title, 'ListingPageBook', css.requestToBookButton);
  const classes = classNames(rootClassName || css.actionButtons, className);

  return canShowButtons ? <div className={classes}>{listingLink}</div> : null;
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

  if (propTypes.txIsEnquired(transaction)) {
    return (
      <h1 className={classes}>
        <span className={css.mainTitle}>
          <FormattedMessage id="TransactionPanel.orderEnquiredTitle" values={{ listingLink }} />
        </span>
      </h1>
    );
  } else if (propTypes.txIsPreauthorized(transaction)) {
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
  } else if (propTypes.txIsAccepted(transaction)) {
    return (
      <h1 className={classes}>
        <span className={css.mainTitle}>
          <FormattedMessage id="TransactionPanel.orderAcceptedTitle" values={{ customerName }} />
        </span>
        <FormattedMessage id="TransactionPanel.orderAcceptedSubtitle" values={{ listingLink }} />
      </h1>
    );
  } else if (propTypes.txIsDeclined(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.orderDeclinedTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (propTypes.txIsAutodeclined(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.orderDeclinedTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (propTypes.txIsCanceled(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.orderCancelledTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (
    propTypes.txIsDelivered(transaction) ||
    propTypes.txHasFirstReview(transaction) ||
    propTypes.txIsReviewed(transaction)
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

  if (!listingDeleted && propTypes.txIsPreauthorized(transaction)) {
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

  if (propTypes.txIsEnquired(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.saleEnquiredTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (propTypes.txIsPreauthorized(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.saleRequestedTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (propTypes.txIsAccepted(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.saleAcceptedTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (propTypes.txIsDeclined(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.saleDeclinedTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (propTypes.txIsAutodeclined(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.saleDeclinedTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (propTypes.txIsCanceled(transaction)) {
    return (
      <h1 className={classes}>
        <FormattedMessage
          id="TransactionPanel.saleCancelledTitle"
          values={{ customerName, listingLink }}
        />
      </h1>
    );
  } else if (
    propTypes.txIsDelivered(transaction) ||
    propTypes.txHasFirstReview(transaction) ||
    propTypes.txIsReviewed(transaction)
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

  if (!isCustomerBanned && propTypes.txIsPreauthorized(transaction)) {
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
