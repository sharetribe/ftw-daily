import React, { PropTypes } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { createSlug } from '../../util/urlHelpers';
import { ensureListing, ensureTransaction, ensureBooking, ensureUser } from '../../util/data';
import { BookingBreakdown, NamedLink, ResponsiveImage, AvatarMedium } from '../../components';

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

  const providerProfile = currentProvider.attributes.profile;
  const authorFirstName = providerProfile.firstName;
  const authorLastName = providerProfile.lastName;
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

  const listingTitle = currentListing.attributes.title;

  const bookingInfo = breakdown(currentTransaction);
  const title = orderTitle(transactionState, listingLink, customerName, lastTransition);
  const message = orderMessage(
    transactionState,
    listingLink,
    authorFirstName,
    lastTransitionedAt,
    lastTransition
  );

  const firstImage = currentListing.images && currentListing.images.length > 0
    ? currentListing.images[0]
    : null;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.container}>
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
        <div className={classNames(css.avatarWrapper, css.avatarMobile)}>
          <AvatarMedium firstName={authorFirstName} lastName={authorLastName} />
        </div>
        <div className={css.orderInfo}>
          <h1 className={css.title}>{title}</h1>
          <div className={css.message}>
            {message}
          </div>
        </div>
        <div className={css.bookingBreakdownContainer}>
          <div className={css.breakdownMobile}>
            <h3 className={css.bookingBreakdownTitle}>
              <FormattedMessage id="OrderDetailsPanel.bookingBreakdownTitle" />
            </h3>
            {bookingInfo}
          </div>
          <div className={css.breakdownDesktop}>
            <div className={css.breakdownAspectWrapper}>
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
            <div className={css.avatarWrapper}>
              <AvatarMedium firstName={authorFirstName} lastName={authorLastName} />
            </div>
            <div className={css.breakdownHeadings}>
              <h2 className={css.breakdownTitle}>{listingTitle}</h2>
              <p className={css.breakdownSubtitle}>
                <FormattedMessage
                  id="OrderDetailsPanel.hostedBy"
                  values={{ name: authorFirstName }}
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
