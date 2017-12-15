import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import * as propTypes from '../../util/propTypes';
import { formatMoney } from '../../util/currency';
import { userDisplayName } from '../../util/data';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Avatar,
  NamedLink,
  NamedRedirect,
  NotificationBadge,
  Page,
  PaginationLinks,
  TabNav,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { TopbarContainer } from '../../containers';

import { loadData } from './InboxPage.duck';
import css from './InboxPage.css';

const { arrayOf, bool, number, oneOf, shape, string } = PropTypes;

const formatDate = (intl, date) => {
  return {
    short: intl.formatDate(date, {
      month: 'short',
      day: 'numeric',
    }),
    long: `${intl.formatDate(date)} ${intl.formatTime(date)}`,
  };
};

// Translated name of the state of the given transaction
const txState = (intl, tx, isOrder) => {
  if (propTypes.txIsAccepted(tx)) {
    return {
      nameClassName: css.nameAccepted,
      bookingClassName: css.bookingAccepted,
      lastTransitionedAtClassName: css.lastTransitionedAtAccepted,
      stateClassName: css.stateAccepted,
      state: intl.formatMessage({
        id: 'InboxPage.stateAccepted',
      }),
    };
  } else if (propTypes.txIsDeclinedOrAutodeclined(tx)) {
    return {
      nameClassName: css.nameDeclined,
      bookingClassName: css.bookingDeclined,
      lastTransitionedAtClassName: css.lastTransitionedAtDeclined,
      stateClassName: css.stateDeclined,
      state: intl.formatMessage({
        id: 'InboxPage.stateDeclined',
      }),
    };
  } else if (propTypes.txIsCanceled(tx)) {
    return {
      nameClassName: css.nameCanceled,
      bookingClassName: css.bookingCanceled,
      lastTransitionedAtClassName: css.lastTransitionedAtCanceled,
      stateClassName: css.stateCanceled,
      state: intl.formatMessage({
        id: 'InboxPage.stateCanceled',
      }),
    };
  } else if (
    propTypes.txIsDelivered(tx) ||
    propTypes.txHasFirstReview(tx) ||
    propTypes.txIsReviewed(tx)
  ) {
    return {
      nameClassName: css.nameDelivered,
      bookingClassName: css.bookingDelivered,
      lastTransitionedAtClassName: css.lastTransitionedAtDelivered,
      stateClassName: css.stateDelivered,
      state: intl.formatMessage({
        id: 'InboxPage.stateDelivered',
      }),
    };
  }
  return {
    nameClassName: isOrder ? css.nameRequested : css.namePending,
    bookingClassName: isOrder ? css.bookingRequested : css.bookingPending,
    lastTransitionedAtClassName: isOrder
      ? css.lastTransitionedAtRequested
      : css.lastTransitionedAtPending,
    stateClassName: isOrder ? css.stateRequested : css.statePending,
    state: isOrder
      ? intl.formatMessage({
          id: 'InboxPage.stateRequested',
        })
      : intl.formatMessage({
          id: 'InboxPage.statePending',
        }),
  };
};

export const InboxItem = props => {
  const { type, tx, intl } = props;
  const { customer, provider, booking } = tx;
  const isOrder = type === 'order';

  const otherUser = isOrder ? provider : customer;
  const bannedUserDisplayName = intl.formatMessage({
    id: 'InboxPage.bannedUserDisplayName',
  });
  const isOtherUserBanned = otherUser.attributes.banned;
  const otherUserDisplayName = userDisplayName(otherUser, bannedUserDisplayName);

  const stateData = txState(intl, tx, isOrder);
  const isSaleNotification = !isOrder && propTypes.txIsPreauthorized(tx);
  const rowNotificationDot = isSaleNotification ? <div className={css.notificationDot} /> : null;
  const lastTransitionedAt = formatDate(intl, tx.attributes.lastTransitionedAt);

  const bookingPrice = isOrder ? tx.attributes.payinTotal : tx.attributes.payoutTotal;
  const hasBookingInfo = !!(booking && bookingPrice);
  const bookingStart = hasBookingInfo ? formatDate(intl, booking.attributes.start) : null;
  const bookingEnd = hasBookingInfo ? formatDate(intl, booking.attributes.end) : null;
  const price = hasBookingInfo ? formatMoney(intl, bookingPrice) : null;

  const linkClasses = classNames(css.itemLink, {
    [css.bannedUserLink]: isOtherUserBanned,
  });

  return (
    <div className={css.item}>
      <div className={css.itemAvatar}>
        <Avatar user={otherUser} />
      </div>
      <NamedLink
        className={linkClasses}
        name={isOrder ? 'OrderDetailsPage' : 'SaleDetailsPage'}
        params={{ id: tx.id.uuid }}
      >
        <div className={css.rowNotificationDot}>{rowNotificationDot}</div>
        <div className={css.itemInfo}>
          <div className={classNames(css.itemUsername, stateData.nameClassName)}>
            {otherUserDisplayName}
          </div>
          <div className={classNames(css.bookingInfo, stateData.bookingClassName)}>
            {hasBookingInfo ? `${bookingStart.short} - ${bookingEnd.short}` : null}
            {hasBookingInfo ? <span className={css.itemPrice}>{price}</span> : null}
          </div>
        </div>
        <div className={css.itemState}>
          <div className={classNames(css.stateName, stateData.stateClassName)}>
            {stateData.state}
          </div>
          <div
            className={classNames(css.lastTransitionedAt, stateData.lastTransitionedAtClassName)}
            title={lastTransitionedAt.long}
          >
            {lastTransitionedAt.short}
          </div>
        </div>
      </NamedLink>
    </div>
  );
};

InboxItem.propTypes = {
  type: oneOf(['order', 'sale']).isRequired,
  tx: propTypes.transaction.isRequired,
  intl: intlShape.isRequired,
};

export const InboxPageComponent = props => {
  const {
    currentUser,
    fetchInProgress,
    fetchOrdersOrSalesError,
    intl,
    pagination,
    params,
    providerNotificationCount,
    scrollingDisabled,
    transactions,
  } = props;
  const { tab } = params;

  const validTab = tab === 'orders' || tab === 'sales';
  if (!validTab) {
    return <NamedRedirect name="NotFoundPage" />;
  }

  const isOrders = tab === 'orders';

  const ordersTitle = intl.formatMessage({ id: 'InboxPage.ordersTitle' });
  const salesTitle = intl.formatMessage({ id: 'InboxPage.salesTitle' });
  const title = isOrders ? ordersTitle : salesTitle;

  const toTxItem = tx => {
    return (
      <li key={tx.id.uuid} className={css.listItem}>
        <InboxItem type={isOrders ? 'order' : 'sale'} tx={tx} intl={intl} />
      </li>
    );
  };

  const error = fetchOrdersOrSalesError ? (
    <p className={css.error}>
      <FormattedMessage id="InboxPage.fetchFailed" />
    </p>
  ) : null;

  const noResults =
    !fetchInProgress && transactions.length === 0 && !fetchOrdersOrSalesError ? (
      <li key="noResults" className={css.noResults}>
        <FormattedMessage id={isOrders ? 'InboxPage.noOrdersFound' : 'InboxPage.noSalesFound'} />
      </li>
    ) : null;

  const hasOrderOrSaleTransactions = (tx, isOrdersTab, user) => {
    return isOrdersTab
      ? tx && tx.length > 0 && tx[0].customer.id.uuid === user.id.uuid
      : tx && tx.length > 0 && tx[0].provider.id.uuid === user.id.uuid;
  };
  const hasTransactions =
    !fetchInProgress && hasOrderOrSaleTransactions(transactions, isOrders, currentUser);
  const pagingLinks =
    hasTransactions && pagination && pagination.totalPages > 1 ? (
      <PaginationLinks
        className={css.pagination}
        pageName="InboxPage"
        pagePathParams={params}
        pagination={pagination}
      />
    ) : null;

  const providerNotificationBadge =
    providerNotificationCount > 0 ? <NotificationBadge count={providerNotificationCount} /> : null;
  const tabs = [
    {
      text: (
        <span>
          <FormattedMessage id="InboxPage.ordersTabTitle" />
        </span>
      ),
      selected: isOrders,
      linkProps: {
        name: 'InboxPage',
        params: { tab: 'orders' },
      },
    },
    {
      text: (
        <span>
          <FormattedMessage id="InboxPage.salesTabTitle" />
          {providerNotificationBadge}
        </span>
      ),
      selected: !isOrders,
      linkProps: {
        name: 'InboxPage',
        params: { tab: 'sales' },
      },
    },
  ];
  const nav = <TabNav rootClassName={css.tabs} tabRootClassName={css.tab} tabs={tabs} />;

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer
            className={css.topbar}
            mobileRootClassName={css.mobileTopbar}
            desktopClassName={css.desktopTopbar}
            currentPage="InboxPage"
          />
        </LayoutWrapperTopbar>
        <LayoutWrapperSideNav className={css.navigation}>
          <h1 className={css.title}>
            <FormattedMessage id="InboxPage.title" />
          </h1>
          {nav}
        </LayoutWrapperSideNav>
        <LayoutWrapperMain>
          {error}
          <ul className={css.itemList}>
            {!fetchInProgress ? transactions.map(toTxItem) : null}
            {noResults}
          </ul>
          {pagingLinks}
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page>
  );
};

InboxPageComponent.defaultProps = {
  currentUser: null,
  currentUserHasOrders: null,
  fetchOrdersOrSalesError: null,
  pagination: null,
  providerNotificationCount: 0,
  sendVerificationEmailError: null,
};

InboxPageComponent.propTypes = {
  params: shape({
    tab: string.isRequired,
  }).isRequired,

  currentUser: propTypes.currentUser,
  fetchInProgress: bool.isRequired,
  fetchOrdersOrSalesError: propTypes.error,
  pagination: propTypes.pagination,
  providerNotificationCount: number,
  scrollingDisabled: bool.isRequired,
  transactions: arrayOf(propTypes.transaction).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { fetchInProgress, fetchOrdersOrSalesError, pagination, transactionRefs } = state.InboxPage;
  const { currentUser, currentUserNotificationCount: providerNotificationCount } = state.user;
  return {
    currentUser,
    fetchInProgress,
    fetchOrdersOrSalesError,
    pagination,
    providerNotificationCount,
    scrollingDisabled: isScrollingDisabled(state),
    transactions: getMarketplaceEntities(state, transactionRefs),
  };
};

const InboxPage = compose(connect(mapStateToProps), injectIntl)(InboxPageComponent);

InboxPage.loadData = loadData;

export default InboxPage;
