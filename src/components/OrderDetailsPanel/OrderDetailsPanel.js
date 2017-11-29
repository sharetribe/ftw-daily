import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { createSlug } from '../../util/urlHelpers';
import { ensureListing, ensureTransaction, ensureUser, userDisplayName } from '../../util/data';
import { isMobileSafari } from '../../util/userAgent';
import {
  ActivityFeed,
  AvatarMedium,
  BookingBreakdown,
  NamedLink,
  ResponsiveImage,
  ReviewModal,
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

export class OrderDetailsPanelComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMessageFormFocused: false,
      isReviewModalOpen: false,
      reviewSubmitted: false,
    };
    this.onOpenReviewModal = this.onOpenReviewModal.bind(this);
    this.onSubmitReview = this.onSubmitReview.bind(this);
  }

  onOpenReviewModal() {
    this.setState({ isReviewModalOpen: true });
  }

  onSubmitReview(values) {
    const { onSendReview, transaction } = this.props;
    const currentTransaction = ensureTransaction(transaction);
    const { reviewRating, reviewContent } = values;
    const rating = Number.parseInt(reviewRating, 10);
    onSendReview(currentTransaction.id, rating, reviewContent).then(r =>
      this.setState({ isReviewModalOpen: false, reviewSubmitted: true })
    );
  }

  render() {
    const {
      rootClassName,
      className,
      currentUser,
      transaction,
      totalMessages,
      messages,
      initialMessageFailed,
      fetchMessagesInProgress,
      fetchMessagesError,
      sendMessageInProgress,
      sendMessageError,
      sendReviewInProgress,
      sendReviewError,
      onManageDisableScrolling,
      onShowMoreMessages,
      onSendMessage,
      onResetForm,
      intl,
    } = this.props;

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

    const feedContainerClasses = classNames(css.feedContainer, {
      [css.feedContainerWithInfoAbove]: showInfoMessage,
    });
    const txTransitions = currentTransaction.attributes.transitions
      ? currentTransaction.attributes.transitions
      : [];
    const hasOlderMessages = totalMessages > messages.length;
    const handleShowOlderMessages = () => {
      onShowMoreMessages(currentTransaction.id);
    };
    const showFeed =
      messages.length > 0 || txTransitions.length > 0 || initialMessageFailed || fetchMessagesError;
    const feedContainer = showFeed ? (
      <div className={feedContainerClasses}>
        <h3 className={css.feedHeading}>
          <FormattedMessage id="OrderDetailsPanel.activityHeading" />
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
        <ActivityFeed
          className={css.feed}
          messages={messages}
          transaction={currentTransaction}
          currentUser={currentUser}
          hasOlderMessages={hasOlderMessages && !fetchMessagesInProgress}
          onOpenReviewModal={this.onOpenReviewModal}
          onShowOlderMessages={handleShowOlderMessages}
          fetchMessagesInProgress={fetchMessagesInProgress}
        />
      </div>
    ) : null;

    const sendMessagePlaceholder = intl.formatMessage(
      { id: 'OrderDetailsPanel.sendMessagePlaceholder' },
      { name: otherUserDisplayName }
    );

    const sendMessageFormName = 'OrderDetailsPanel.SendMessageForm';
    const scrollToMessage = messageId => {
      const selector = `#msg-${messageId.uuid}`;
      const el = document.querySelector(selector);
      if (el) {
        el.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }
    };
    const isMobSaf = isMobileSafari();
    const handleSendMessageFormFocus = () => {
      this.setState({ sendMessageFormFocused: true });
      if (isMobSaf) {
        // Scroll to bottom
        window.scroll({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' });
      }
    };
    const handleSendMessageFormBlur = () => {
      this.setState({ sendMessageFormFocused: false });
    };
    const handleMessageSubmit = values => {
      const message = values.message ? values.message.trim() : null;
      if (!message) {
        return;
      }
      onSendMessage(currentTransaction.id, message)
        .then(messageId => {
          onResetForm(sendMessageFormName);
          scrollToMessage(messageId);
        })
        .catch(e => {
          // Ignore, Redux handles the error
        });
    };
    const sendMessageFormClasses = classNames(css.sendMessageForm, {
      [css.sendMessageFormFocusedInMobileSafari]: isMobSaf && this.state.sendMessageFormFocused,
    });

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
            {feedContainer}
            <SendMessageForm
              form={sendMessageFormName}
              rootClassName={sendMessageFormClasses}
              messagePlaceholder={sendMessagePlaceholder}
              inProgress={sendMessageInProgress}
              sendMessageError={sendMessageError}
              onFocus={handleSendMessageFormFocus}
              onBlur={handleSendMessageFormBlur}
              onSubmit={handleMessageSubmit}
            />
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
        <ReviewModal
          id="ReviewOrderModal"
          isOpen={this.state.isReviewModalOpen}
          onCloseModal={() => this.setState({ isReviewModalOpen: false })}
          onManageDisableScrolling={onManageDisableScrolling}
          onSubmitReview={this.onSubmitReview}
          revieweeName={authorDisplayName}
          reviewSent={this.state.reviewSubmitted}
          sendReviewInProgress={sendReviewInProgress}
          sendReviewError={sendReviewError}
        />
      </div>
    );
  }
}

OrderDetailsPanelComponent.defaultProps = {
  rootClassName: null,
  className: null,
  currentUser: null,
  fetchMessagesError: null,
  sendMessageError: null,
  sendReviewError: null,
};

const { string, arrayOf, bool, func, number } = PropTypes;

OrderDetailsPanelComponent.propTypes = {
  rootClassName: string,
  className: string,

  currentUser: propTypes.currentUser,
  transaction: propTypes.transaction.isRequired,
  totalMessages: number.isRequired,
  messages: arrayOf(propTypes.message).isRequired,
  initialMessageFailed: bool.isRequired,
  fetchMessagesInProgress: bool.isRequired,
  fetchMessagesError: propTypes.error,
  sendMessageInProgress: bool.isRequired,
  sendMessageError: propTypes.error,
  sendReviewInProgress: bool.isRequired,
  sendReviewError: propTypes.error,
  onManageDisableScrolling: func.isRequired,
  onShowMoreMessages: func.isRequired,
  onSendMessage: func.isRequired,
  onSendReview: func.isRequired,
  onResetForm: func.isRequired,

  // from injectIntl
  intl: intlShape,
};

const OrderDetailsPanel = injectIntl(OrderDetailsPanelComponent);

export default OrderDetailsPanel;
