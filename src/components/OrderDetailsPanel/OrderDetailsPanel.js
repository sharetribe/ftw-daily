import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { createSlug } from '../../util/urlHelpers';
import { ensureListing, ensureTransaction, ensureUser, userDisplayName } from '../../util/data';
import {
  BookingBreakdown,
  NamedLink,
  ResponsiveImage,
  AvatarMedium,
  Messages,
} from '../../components';
import { SendMessageForm } from '../../containers';

import css from './OrderDetailsPanel.css';

const breakdown = transaction => {
  const loaded = transaction && transaction.id && transaction.booking && transaction.booking.id;

  return loaded ? (
    <BookingBreakdown
      className={css.breakdown}
      userRole="customer"
      transaction={transaction}
      booking={transaction.booking}
    />
  ) : null;
};

const orderTitle = (transaction, listingLink, customerName) => {
  if (propTypes.txIsPreauthorized(transaction)) {
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
  } else if (propTypes.txIsAccepted(transaction)) {
    return (
      <span>
        <span className={css.mainTitle}>
          <FormattedMessage id="OrderDetailsPanel.orderAcceptedTitle" values={{ customerName }} />
        </span>
        <FormattedMessage id="OrderDetailsPanel.orderAcceptedSubtitle" values={{ listingLink }} />
      </span>
    );
  } else if (propTypes.txIsDeclined(transaction)) {
    return <FormattedMessage id="OrderDetailsPanel.orderDeclinedTitle" values={{ listingLink }} />;
  } else if (propTypes.txIsAutodeclined(transaction)) {
    return (
      <FormattedMessage id="OrderDetailsPanel.orderAutoDeclinedTitle" values={{ listingLink }} />
    );
  } else if (propTypes.txIsCanceled(transaction)) {
    return <FormattedMessage id="OrderDetailsPanel.orderCanceledTitle" values={{ listingLink }} />;
  } else if (propTypes.txIsDelivered(transaction)) {
    return <FormattedMessage id="OrderDetailsPanel.orderDeliveredTitle" values={{ listingLink }} />;
  } else {
    return null;
  }
};

const orderMessage = (transaction, providerName) => {
  if (propTypes.txIsPreauthorized(transaction)) {
    return (
      <FormattedMessage id="OrderDetailsPanel.orderPreauthorizedStatus" values={{ providerName }} />
    );
  }
  return null;
};

export const OrderDetailsPanelComponent = props => {
  const {
    rootClassName,
    className,
    currentUser,
    transaction,
    messages,
    initialMessageFailed,
    fetchMessagesError,
    intl,
  } = props;
  const currentTransaction = ensureTransaction(transaction);
  const currentListing = ensureListing(currentTransaction.listing);
  const currentProvider = ensureUser(currentTransaction.provider);
  const currentCustomer = ensureUser(currentTransaction.customer);

  const listingLoaded = !!currentListing.id;
  const listingDeleted = listingLoaded && currentListing.attributes.deleted;

  const bannedUserDisplayName = intl.formatMessage({
    id: 'OrderDetailsPanel.bannedUserDisplayName',
  });
  const deletedListingTitle = intl.formatMessage({
    id: 'OrderDetailsPanel.deletedListingTitle',
  });
  const deletedListingOrderTitle = intl.formatMessage({
    id: 'OrderDetailsPanel.deletedListingOrderTitle',
  });
  const orderMessageDeletedListing = intl.formatMessage({
    id: 'OrderDetailsPanel.messageDeletedListing',
  });

  const authorDisplayName = userDisplayName(currentProvider, bannedUserDisplayName);
  const customerDisplayName = userDisplayName(currentCustomer, bannedUserDisplayName);

  let listingLink = null;

  if (listingLoaded && currentListing.attributes.title) {
    const title = currentListing.attributes.title;
    const params = { id: currentListing.id.uuid, slug: createSlug(title) };
    listingLink = (
      <NamedLink name="ListingPage" params={params}>
        {title}
      </NamedLink>
    );
  } else {
    listingLink = deletedListingOrderTitle;
  }

  const listingTitle = currentListing.attributes.deleted
    ? deletedListingTitle
    : currentListing.attributes.title;

  const bookingInfo = breakdown(currentTransaction);
  const orderHeading = orderTitle(currentTransaction, listingLink, customerDisplayName);
  const orderInfoText = listingDeleted
    ? orderMessageDeletedListing
    : orderMessage(currentTransaction, authorDisplayName);
  const showInfoMessage = !!orderInfoText;

  const firstImage =
    currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

  const messagesContainerClasses = classNames(css.messagesContainer, {
    [css.messagesContainerWithInfoAbove]: showInfoMessage,
  });
  const showMessages = messages.length > 0 || initialMessageFailed || fetchMessagesError;
  const messagesContainer = showMessages ? (
    <div className={messagesContainerClasses}>
      <h3 className={css.messagesHeading}>
        <FormattedMessage id="OrderDetailsPanel.messagesHeading" />
      </h3>
      {initialMessageFailed ? (
        <p className={css.error}>
          <FormattedMessage id="OrderDetailsPanel.initialMessageFailed" />
        </p>
      ) : null}
      {fetchMessagesError ? (
        <p className={css.error}>
          <FormattedMessage id="OrderDetailsPanel.messageLoadingFailed" />
        </p>
      ) : null}
      <Messages className={css.messages} messages={messages} currentUser={currentUser} />
    </div>
  ) : null;

  const sendMessagePlaceholder = intl.formatMessage(
    { id: 'OrderDetailsPanel.sendMessagePlaceholder' },
    { name: 'Juho' }
  );
  const sendMessageForm = (
    <SendMessageForm
      rootClassName={css.sendMessageForm}
      messagePlaceholder={sendMessagePlaceholder}
    />
  );

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.container}>
        <div className={css.orderInfo}>
          <div className={css.imageWrapperMobile}>
            <div className={css.aspectWrapper}>
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
          </div>
          <div className={classNames(css.avatarWrapper, css.avatarMobile)}>
            <AvatarMedium user={currentProvider} />
          </div>
          <h1 className={css.heading}>{orderHeading}</h1>
          {showInfoMessage ? <p className={css.orderInfoText}>{orderInfoText}</p> : null}
          {showInfoMessage ? <hr className={css.infoTextDivider} /> : null}
          <div className={css.breakdownMobile}>
            <h3 className={css.bookingBreakdownTitle}>
              <FormattedMessage id="OrderDetailsPanel.bookingBreakdownTitle" />
            </h3>
            {bookingInfo}
          </div>
          {messagesContainer}
          {sendMessageForm}
        </div>
        <div className={css.bookingBreakdownContainer}>
          <div className={css.breakdownDesktop}>
            <div className={css.breakdownImageWrapper}>
              <div className={css.aspectWrapper}>
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
            </div>
            <div className={css.avatarWrapper}>
              <AvatarMedium user={currentProvider} />
            </div>
            <div className={css.breakdownHeadings}>
              <h2 className={css.breakdownTitle}>{listingTitle}</h2>
              <p className={css.breakdownSubtitle}>
                <FormattedMessage
                  id="OrderDetailsPanel.hostedBy"
                  values={{ name: authorDisplayName }}
                />
              </p>
            </div>
            <h3 className={css.bookingBreakdownTitle}>
              <FormattedMessage id="OrderDetailsPanel.bookingBreakdownTitle" />
            </h3>
            {bookingInfo}
          </div>
        </div>
      </div>
    </div>
  );
};

OrderDetailsPanelComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchMessagesError: null,
};

const { string, arrayOf, bool } = PropTypes;

OrderDetailsPanelComponent.propTypes = {
  rootClassName: string,
  className: string,

  currentUser: propTypes.currentUser,
  transaction: propTypes.transaction.isRequired,
  messages: arrayOf(propTypes.message).isRequired,
  initialMessageFailed: bool.isRequired,
  fetchMessagesError: propTypes.error,

  // from injectIntl
  intl: intlShape,
};

const OrderDetailsPanel = injectIntl(OrderDetailsPanelComponent);

export default OrderDetailsPanel;
