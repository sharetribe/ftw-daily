import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { createSlug } from '../../util/urlHelpers';
import { ensureListing, ensureTransaction, ensureUser, userDisplayName } from '../../util/data';
import { isMobileSafari } from '../../util/userAgent';
import {
  AvatarLarge,
  AvatarMedium,
  BookingBreakdown,
  NamedLink,
  ResponsiveImage,
  PrimaryButton,
  SecondaryButton,
  Messages,
} from '../../components';
import { SendMessageForm } from '../../containers';

import css from './SaleDetailsPanel.css';

const breakdown = transaction => {
  const loaded = transaction && transaction.id && transaction.booking && transaction.booking.id;

  return loaded ? (
    <BookingBreakdown
      className={css.breakdown}
      userRole="provider"
      transaction={transaction}
      booking={transaction.booking}
    />
  ) : null;
};

const saleTitle = (transaction, listingLink, customerName) => {
  if (propTypes.txIsPreauthorized(transaction)) {
    return (
      <FormattedMessage
        id="SaleDetailsPanel.listingRequestedTitle"
        values={{ customerName, listingLink }}
      />
    );
  } else if (propTypes.txIsAccepted(transaction)) {
    return (
      <FormattedMessage
        id="SaleDetailsPanel.listingAcceptedTitle"
        values={{ customerName, listingLink }}
      />
    );
  } else if (propTypes.txIsDeclined(transaction)) {
    return (
      <FormattedMessage
        id="SaleDetailsPanel.listingDeclinedTitle"
        values={{ customerName, listingLink }}
      />
    );
  } else if (propTypes.txIsAutodeclined(transaction)) {
    return (
      <FormattedMessage
        id="SaleDetailsPanel.listingDeclinedTitle"
        values={{ customerName, listingLink }}
      />
    );
  } else if (propTypes.txIsCanceled(transaction)) {
    return (
      <FormattedMessage
        id="SaleDetailsPanel.listingCanceledTitle"
        values={{ customerName, listingLink }}
      />
    );
  } else if (propTypes.txIsDelivered(transaction)) {
    return (
      <FormattedMessage
        id="SaleDetailsPanel.listingDeliveredTitle"
        values={{ customerName, listingLink }}
      />
    );
  } else {
    return null;
  }
};

const saleInfoText = (transaction, customerName) => {
  if (propTypes.txIsPreauthorized(transaction)) {
    return <FormattedMessage id="SaleDetailsPanel.saleRequestedStatus" values={{ customerName }} />;
  }
  return null;
};

export class SaleDetailsPanelComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { sendMessageFormFocused: false };
  }
  render() {
    const {
      rootClassName,
      className,
      currentUser,
      transaction,
      onAcceptSale,
      onDeclineSale,
      acceptInProgress,
      declineInProgress,
      acceptSaleError,
      declineSaleError,
      fetchMessagesError,
      messages,
      sendMessageInProgress,
      sendMessageError,
      onSendMessage,
      onResetForm,
      intl,
    } = this.props;

    const currentTransaction = ensureTransaction(transaction);
    const currentListing = ensureListing(currentTransaction.listing);
    const currentCustomer = ensureUser(currentTransaction.customer);
    const currentProvider = ensureUser(currentTransaction.provider);
    const customerLoaded = !!currentCustomer.id;
    const isCustomerBanned = customerLoaded && currentCustomer.attributes.banned;

    const bannedUserDisplayName = intl.formatMessage({
      id: 'SaleDetailsPanel.bannedUserDisplayName',
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

    const title = saleTitle(currentTransaction, listingLink, customerDisplayName);
    const infoText = isCustomerBanned
      ? intl.formatMessage({
          id: 'SaleDetailsPanel.customerBannedStatus',
        })
      : saleInfoText(currentTransaction, customerDisplayName);
    const showInfoText = !!infoText;

    const listingTitle = currentListing.attributes.title;
    const firstImage =
      currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

    const messagesContainerClasses = classNames(css.messagesContainer, {
      [css.messagesContainerWithInfoAbove]: showInfoText,
    });
    const showMessages = messages.length > 0 || fetchMessagesError;
    const messagesContainer = showMessages ? (
      <div className={messagesContainerClasses}>
        <h3 className={css.messagesHeading}>
          <FormattedMessage id="SaleDetailsPanel.messagesHeading" />
        </h3>
        {fetchMessagesError ? (
          <p className={css.messagesError}>
            <FormattedMessage id="SaleDetailsPanel.messageLoadingFailed" />
          </p>
        ) : null}
        <Messages className={css.messages} messages={messages} currentUser={currentUser} />
      </div>
    ) : null;

    const canShowButtons = propTypes.txIsPreauthorized(currentTransaction) && !isCustomerBanned;
    const buttonsDisabled = acceptInProgress || declineInProgress;

    const acceptErrorMessage = acceptSaleError ? (
      <p className={css.actionError}>
        <FormattedMessage id="SaleDetailsPanel.acceptSaleFailed" />
      </p>
    ) : null;
    const declineErrorMessage = declineSaleError ? (
      <p className={css.actionError}>
        <FormattedMessage id="SaleDetailsPanel.declineSaleFailed" />
      </p>
    ) : null;

    const actionButtonClasses = classNames(css.actionButtons, {
      [css.actionButtonsWithFormFocused]: this.state.sendMessageFormFocused,
    });
    const actionButtons = canShowButtons ? (
      <div className={actionButtonClasses}>
        <div className={css.actionErrors}>
          {acceptErrorMessage}
          {declineErrorMessage}
        </div>
        <div className={css.actionButtonWrapper}>
          <SecondaryButton
            inProgress={declineInProgress}
            disabled={buttonsDisabled}
            onClick={() => onDeclineSale(currentTransaction.id)}
          >
            <FormattedMessage id="SalePage.declineButton" />
          </SecondaryButton>
          <PrimaryButton
            inProgress={acceptInProgress}
            disabled={buttonsDisabled}
            onClick={() => onAcceptSale(currentTransaction.id)}
          >
            <FormattedMessage id="SalePage.acceptButton" />
          </PrimaryButton>
        </div>
      </div>
    ) : null;

    const sendMessagePlaceholder = intl.formatMessage(
      { id: 'SaleDetailsPanel.sendMessagePlaceholder' },
      { name: otherUserDisplayName }
    );

    const sendMessageFormName = 'SaleDetailsPanel.SendMessageForm';
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
      [css.sendMessageFormFixed]: this.state.sendMessageFormFocused || !canShowButtons,
      [css.sendMessageFormFocusedInMobileSafari]: isMobSaf && this.state.sendMessageFormFocused,
    });

    const classes = classNames(rootClassName || css.root, className);

    return (
      <div className={classes}>
        <div className={css.container}>
          <div className={css.saleInfo}>
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
            <div className={css.avatarWrapper}>
              <AvatarMedium user={currentCustomer} className={css.avatarMobile} />
            </div>
            <div className={css.avatarWrapper}>
              <AvatarLarge user={currentCustomer} className={css.avatarDesktop} />
            </div>
            <h1 className={css.title}>{title}</h1>
            {showInfoText ? <p className={css.infoText}>{infoText}</p> : null}
            <div className={css.breakdownContainerMobile}>
              <h3 className={css.breakdownTitleMobile}>
                <FormattedMessage id="SaleDetailsPanel.bookingBreakdownTitle" />
              </h3>
              {bookingInfo}
            </div>
            {messagesContainer}
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
            <div className={css.mobileActionButtons}>{actionButtons}</div>
          </div>
          <div className={css.desktopAside}>
            <div className={css.breakdownContainerDesktop}>
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
              <h3 className={css.breakdownTitleDesktop}>
                <FormattedMessage id="SaleDetailsPanel.bookingBreakdownTitle" />
              </h3>
              <div className={css.breakdownDesktop}>{bookingInfo}</div>
              <div className={css.desktopActionButtons}>{actionButtons}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SaleDetailsPanelComponent.defaultProps = {
  rootClassName: null,
  className: null,
  currentUser: null,
  acceptSaleError: null,
  declineSaleError: null,
  fetchMessagesError: null,
  sendMessageError: null,
};

const { bool, func, string, arrayOf } = PropTypes;

SaleDetailsPanelComponent.propTypes = {
  rootClassName: string,
  className: string,

  currentUser: propTypes.currentUser,
  transaction: propTypes.transaction.isRequired,
  onAcceptSale: func.isRequired,
  onDeclineSale: func.isRequired,
  acceptInProgress: bool.isRequired,
  declineInProgress: bool.isRequired,
  acceptSaleError: propTypes.error,
  declineSaleError: propTypes.error,

  fetchMessagesError: propTypes.error,
  messages: arrayOf(propTypes.message).isRequired,
  sendMessageInProgress: bool.isRequired,
  sendMessageError: propTypes.error,
  onSendMessage: func.isRequired,
  onResetForm: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SaleDetailsPanel = injectIntl(SaleDetailsPanelComponent);

export default SaleDetailsPanel;
