import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { ensureListing, ensureTransaction, ensureUser } from '../../util/data';
import { isMobileSafari } from '../../util/userAgent';
import { AvatarMedium, AvatarLarge, ResponsiveImage, ReviewModal } from '../../components';
import { SendMessageForm } from '../../containers';

// These are internal components that make this file more readable.
import {
  ActionButtonsMaybe,
  BreakdownMaybe,
  FeedSection,
  TransactionPageTitle,
  TransactionPageMessage,
  displayNames,
} from './TransactionPanel.helpers';
import css from './TransactionPanel.css';

export class TransactionPanelComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMessageFormFocused: false,
      isReviewModalOpen: false,
      reviewSubmitted: false,
    };
    this.isMobSaf = false;
    this.sendMessageFormName = 'TransactionPanel.SendMessageForm';

    this.onOpenReviewModal = this.onOpenReviewModal.bind(this);
    this.onSubmitReview = this.onSubmitReview.bind(this);
    this.onSendMessageFormFocus = this.onSendMessageFormFocus.bind(this);
    this.onSendMessageFormBlur = this.onSendMessageFormBlur.bind(this);
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
    this.scrollToMessage = this.scrollToMessage.bind(this);
  }

  componentWillMount() {
    this.isMobSaf = isMobileSafari();
  }

  onOpenReviewModal() {
    this.setState({ isReviewModalOpen: true });
  }

  onSubmitReview(values) {
    const { onSendReview, transaction } = this.props;
    const currentTransaction = ensureTransaction(transaction);
    const { reviewRating, reviewContent } = values;
    const rating = Number.parseInt(reviewRating, 10);
    onSendReview(currentTransaction, rating, reviewContent)
      .then(r => this.setState({ isReviewModalOpen: false, reviewSubmitted: true }))
      .catch(e => {
        // Do nothing.
      });
  }

  onSendMessageFormFocus() {
    this.setState({ sendMessageFormFocused: true });
    if (this.isMobSaf) {
      // Scroll to bottom
      window.scroll({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' });
    }
  }

  onSendMessageFormBlur() {
    this.setState({ sendMessageFormFocused: false });
  }

  onMessageSubmit(values) {
    const message = values.message ? values.message.trim() : null;
    const { transaction, onResetForm, onSendMessage } = this.props;
    const ensuredTransaction = ensureTransaction(transaction);

    if (!message) {
      return;
    }
    onSendMessage(ensuredTransaction.id, message)
      .then(messageId => {
        onResetForm(this.sendMessageFormName);
        this.scrollToMessage(messageId);
      })
      .catch(e => {
        // Ignore, Redux handles the error
      });
  }

  scrollToMessage(messageId) {
    const selector = `#msg-${messageId.uuid}`;
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }

  render() {
    const {
      rootClassName,
      className,
      currentUser,
      transaction,
      totalMessagePages,
      oldestMessagePageFetched,
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
      transactionRole,
      intl,
      onAcceptSale,
      onDeclineSale,
      acceptInProgress,
      declineInProgress,
      acceptSaleError,
      declineSaleError,
    } = this.props;

    const currentTransaction = ensureTransaction(transaction);
    const currentListing = ensureListing(currentTransaction.listing);
    const currentProvider = ensureUser(currentTransaction.provider);
    const currentCustomer = ensureUser(currentTransaction.customer);
    const isCustomer = transactionRole === 'customer';
    const isProvider = transactionRole === 'provider';

    const listingLoaded = !!currentListing.id;
    const listingDeleted = listingLoaded && currentListing.attributes.deleted;
    const customerLoaded = !!currentCustomer.id;
    const isCustomerBanned = customerLoaded && currentCustomer.attributes.banned;
    const canShowButtons =
      isProvider && propTypes.txIsPreauthorized(currentTransaction) && !isCustomerBanned;

    const bannedUserDisplayName = intl.formatMessage({
      id: 'TransactionPanel.bannedUserDisplayName',
    });
    const deletedListingTitle = intl.formatMessage({
      id: 'TransactionPanel.deletedListingTitle',
    });

    const { authorDisplayName, customerDisplayName, otherUserDisplayName } = displayNames(
      currentUser,
      currentProvider,
      currentCustomer,
      bannedUserDisplayName
    );

    const listingTitle = currentListing.attributes.deleted
      ? deletedListingTitle
      : currentListing.attributes.title;

    const firstImage =
      currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

    const actionButtonClasses = classNames(css.actionButtons, {
      [css.actionButtonsWithFormFocused]: this.state.sendMessageFormFocused,
    });

    const actionButtons = (
      <ActionButtonsMaybe
        rootClassName={actionButtonClasses}
        canShowButtons={canShowButtons}
        transaction={currentTransaction}
        acceptInProgress={acceptInProgress}
        declineInProgress={declineInProgress}
        acceptSaleError={acceptSaleError}
        declineSaleError={declineSaleError}
        onAcceptSale={onAcceptSale}
        onDeclineSale={onDeclineSale}
      />
    );

    const sendMessagePlaceholder = intl.formatMessage(
      { id: 'TransactionPanel.sendMessagePlaceholder' },
      { name: otherUserDisplayName }
    );

    const sendMessageFormClasses = classNames(css.sendMessageForm, {
      [css.sendMessageFormFixed]: !canShowButtons || this.state.sendMessageFormFocused,
      [css.sendMessageFormFocusedInMobileSafari]:
        this.isMobSaf && this.state.sendMessageFormFocused,
    });

    const showInfoMessage =
      listingDeleted || (!listingDeleted && propTypes.txIsPreauthorized(transaction)); // !!orderInfoMessage;

    const feedContainerClasses = classNames(css.feedContainer, {
      [css.feedContainerWithInfoAbove]: showInfoMessage,
    });

    const classes = classNames(rootClassName || css.root, className);

    return (
      <div className={classes}>
        <div className={css.container}>
          <div className={css.txInfo}>
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
            <div className={classNames(css.avatarWrapperMobile, css.avatarMobile)}>
              <AvatarMedium user={currentProvider} />
            </div>
            {isProvider ? (
              <div className={css.avatarWrapper}>
                <AvatarLarge user={currentCustomer} className={css.avatarDesktop} />
              </div>
            ) : null}

            <TransactionPageTitle
              transaction={currentTransaction}
              customerDisplayName={customerDisplayName}
              currentListing={currentListing}
              listingTitle={listingTitle}
              transactionRole={transactionRole}
            />
            <TransactionPageMessage
              transaction={currentTransaction}
              authorDisplayName={authorDisplayName}
              customerDisplayName={customerDisplayName}
              listingDeleted={listingDeleted}
              isCustomerBanned={isCustomerBanned}
              transactionRole={transactionRole}
            />

            <div className={css.breakdownMobile}>
              <h3 className={css.bookingBreakdownTitle}>
                <FormattedMessage id="TransactionPanel.bookingBreakdownTitle" />
              </h3>
              <BreakdownMaybe transaction={currentTransaction} transactionRole={transactionRole} />
            </div>

            <FeedSection
              rootClassName={feedContainerClasses}
              currentTransaction={currentTransaction}
              currentUser={currentUser}
              fetchMessagesError={fetchMessagesError}
              fetchMessagesInProgress={fetchMessagesInProgress}
              initialMessageFailed={initialMessageFailed}
              messages={messages}
              oldestMessagePageFetched={oldestMessagePageFetched}
              onOpenReviewModal={this.onOpenReviewModal}
              onShowMoreMessages={onShowMoreMessages}
              totalMessagePages={totalMessagePages}
            />

            <SendMessageForm
              form={this.sendMessageFormName}
              rootClassName={sendMessageFormClasses}
              messagePlaceholder={sendMessagePlaceholder}
              inProgress={sendMessageInProgress}
              sendMessageError={sendMessageError}
              onFocus={this.onSendMessageFormFocus}
              onBlur={this.onSendMessageFormBlur}
              onSubmit={this.onMessageSubmit}
            />
            {isProvider && canShowButtons ? (
              <div className={css.mobileActionButtons}>{actionButtons}</div>
            ) : null}
          </div>

          <div className={css.desktopAside}>
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
              {isCustomer ? (
                <div className={css.avatarWrapperCustomerDesktop}>
                  <AvatarMedium user={currentProvider} />
                </div>
              ) : null}
              {isCustomer ? (
                <div className={css.breakdownHeadings}>
                  <h2 className={css.breakdownTitle}>{listingTitle}</h2>
                  <p className={css.breakdownSubtitle}>
                    <FormattedMessage
                      id="TransactionPanel.hostedBy"
                      values={{ name: authorDisplayName }}
                    />
                  </p>
                </div>
              ) : null}
              <BreakdownMaybe transaction={currentTransaction} transactionRole={transactionRole} />
              {isProvider && canShowButtons ? (
                <div className={css.desktopActionButtons}>{actionButtons}</div>
              ) : null}
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

TransactionPanelComponent.defaultProps = {
  rootClassName: null,
  className: null,
  currentUser: null,
  acceptSaleError: null,
  declineSaleError: null,
  fetchMessagesError: null,
  initialMessageFailed: null,
  sendMessageError: null,
  sendReviewError: null,
};

const { arrayOf, bool, func, number, string } = PropTypes;

TransactionPanelComponent.propTypes = {
  rootClassName: string,
  className: string,

  currentUser: propTypes.currentUser,
  transaction: propTypes.transaction.isRequired,
  totalMessagePages: number.isRequired,
  oldestMessagePageFetched: number.isRequired,
  messages: arrayOf(propTypes.message).isRequired,
  initialMessageFailed: bool,
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

  // Sale related props
  onAcceptSale: func.isRequired,
  onDeclineSale: func.isRequired,
  acceptInProgress: bool.isRequired,
  declineInProgress: bool.isRequired,
  acceptSaleError: propTypes.error,
  declineSaleError: propTypes.error,

  // from injectIntl
  intl: intlShape,
};

const TransactionPanel = injectIntl(TransactionPanelComponent);

export default TransactionPanel;
