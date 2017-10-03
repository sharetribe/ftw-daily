import React, { PropTypes } from 'react';
import { injectIntl, intlShape, FormattedDate, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { createSlug } from '../../util/urlHelpers';
import { ensureListing, ensureTransaction, ensureUser, userDisplayName } from '../../util/data';
import { BookingBreakdown, NamedLink, ResponsiveImage, AvatarMedium } from '../../components';

import css from './OrderDetailsPanel.css';

const breakdown = transaction => {
  const loaded = transaction && transaction.id && transaction.booking && transaction.booking.id;

  return loaded
    ? <BookingBreakdown
        className={css.receipt}
        userRole="customer"
        transaction={transaction}
        booking={transaction.booking}
      />
    : null;
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
  } else if (propTypes.txIsRejected(transaction)) {
    return <FormattedMessage id="OrderDetailsPanel.orderRejectedTitle" values={{ listingLink }} />;
  } else if (propTypes.txIsAutorejected(transaction)) {
    return (
      <FormattedMessage id="OrderDetailsPanel.orderAutoRejectedTitle" values={{ listingLink }} />
    );
  } else if (propTypes.txIsDelivered(transaction)) {
    return <FormattedMessage id="OrderDetailsPanel.orderDeliveredTitle" values={{ listingLink }} />;
  } else {
    return null;
  }
};

const orderMessage = (transaction, listingTitle, providerName) => {
  const transitionDate = (
    <span className={css.transitionDate}>
      <FormattedDate
        value={transaction.attributes.lastTransitionedAt}
        year="numeric"
        month="short"
        day="numeric"
      />
    </span>
  );
  if (propTypes.txIsPreauthorized(transaction)) {
    return (
      <FormattedMessage id="OrderDetailsPanel.orderPreauthorizedStatus" values={{ providerName }} />
    );
  } else if (propTypes.txIsAccepted(transaction)) {
    return (
      <FormattedMessage
        id="OrderDetailsPanel.orderAcceptedStatus"
        values={{ providerName, transitionDate }}
      />
    );
  } else if (propTypes.txIsRejected(transaction)) {
    return (
      <FormattedMessage
        id="OrderDetailsPanel.orderRejectedStatus"
        values={{ providerName, transitionDate }}
      />
    );
  } else if (propTypes.txIsAutorejected(transaction)) {
    return (
      <FormattedMessage
        id="OrderDetailsPanel.orderAutoRejectedStatus"
        values={{ providerName, transitionDate }}
      />
    );
  } else if (propTypes.txIsDelivered(transaction)) {
    return (
      <FormattedMessage
        id="OrderDetailsPanel.orderDeliveredStatus"
        values={{ providerName, transitionDate }}
      />
    );
  } else {
    return null;
  }
};

export const OrderDetailsPanelComponent = props => {
  const {
    rootClassName,
    className,
    transaction,
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
  const message = listingDeleted
    ? orderMessageDeletedListing
    : orderMessage(currentTransaction, listingLink, authorDisplayName);

  const firstImage = currentListing.images && currentListing.images.length > 0
    ? currentListing.images[0]
    : null;

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <div className={css.container}>
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
        <div className={css.orderInfo}>
          <h1 className={css.heading}>{orderHeading}</h1>
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
};

const { string } = PropTypes;

OrderDetailsPanelComponent.propTypes = {
  rootClassName: string,
  className: string,
  transaction: propTypes.transaction.isRequired,

  // from injectIntl
  intl: intlShape,
};

const OrderDetailsPanel = injectIntl(OrderDetailsPanelComponent);

export default OrderDetailsPanel;
