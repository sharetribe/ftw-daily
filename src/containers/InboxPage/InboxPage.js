import React, { PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import {
  Avatar,
  NamedLink,
  NamedRedirect,
  NotificationBadge,
  PageLayout,
  PaginationLinks,
  TabNav,
  Topbar,
} from '../../components';
import * as propTypes from '../../util/propTypes';
import { formatMoney } from '../../util/currency';
import { userDisplayName } from '../../util/data';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { sendVerificationEmail } from '../../ducks/user.duck';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { loadData } from './InboxPage.duck';

import css from './InboxPage.css';

const { arrayOf, bool, func, instanceOf, number, object, oneOf, shape, string } = PropTypes;

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
  const { attributes: { state } } = tx;
  if (state === propTypes.TX_STATE_ACCEPTED) {
    return {
      nameClassName: css.nameAccepted,
      bookingClassName: css.bookingAccepted,
      lastTransitionedAtClassName: css.lastTransitionedAtAccepted,
      stateClassName: css.stateAccepted,
      state: intl.formatMessage({
        id: 'InboxPage.stateAccepted',
      }),
    };
  } else if (state === propTypes.TX_STATE_REJECTED) {
    return {
      nameClassName: css.nameDeclined,
      bookingClassName: css.bookingDeclined,
      lastTransitionedAtClassName: css.lastTransitionedAtRejected,
      stateClassName: css.stateDeclined,
      state: intl.formatMessage({
        id: 'InboxPage.stateDeclined',
      }),
    };
  } else if (state === propTypes.TX_STATE_DELIVERED) {
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
  const isSaleNotification = !isOrder && tx.attributes.state === propTypes.TX_STATE_PREAUTHORIZED;
  const rowNotificationDot = isSaleNotification ? <div className={css.notificationDot} /> : null;
  const lastTransitionedAt = formatDate(intl, tx.attributes.lastTransitionedAt);
  const bookingStart = formatDate(intl, booking.attributes.start);
  const bookingEnd = formatDate(intl, booking.attributes.end);
  const bookingPrice = isOrder ? tx.attributes.payinTotal : tx.attributes.payoutTotal;
  const price = formatMoney(intl, bookingPrice);

  const linkClasses = classNames(css.itemLink, {
    [css.bannedUserLink]: isOtherUserBanned,
  });

  return (
    <NamedLink
      className={linkClasses}
      name={isOrder ? 'OrderDetailsPage' : 'SaleDetailsPage'}
      params={{ id: tx.id.uuid }}
    >
      <div className={css.itemAvatar}>
        <Avatar user={otherUser} />
      </div>
      <div className={css.rowNotificationDot}>
        {rowNotificationDot}
      </div>
      <div className={css.itemInfo}>
        <div className={classNames(css.itemUsername, stateData.nameClassName)}>
          {otherUserDisplayName}
        </div>
        <div className={classNames(css.bookingInfo, stateData.bookingClassName)}>
          {bookingStart.short} - {bookingEnd.short}
          <span className={css.itemPrice}>{price}</span>
        </div>
      </div>
      <div className={css.itemState}>
        <div className={classNames(css.stateName, stateData.stateClassName)}>{stateData.state}</div>
        <div
          className={classNames(css.lastTransitionedAt, stateData.lastTransitionedAtClassName)}
          title={lastTransitionedAt.long}
        >
          {lastTransitionedAt.short}
        </div>
      </div>
    </NamedLink>
  );
};

InboxItem.propTypes = {
  type: oneOf(['order', 'sale']).isRequired,
  tx: propTypes.transaction.isRequired,
  intl: intlShape.isRequired,
};

export const InboxPageComponent = props => {
  const {
    authInfoError,
    authInProgress,
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    fetchInProgress,
    fetchOrdersOrSalesError,
    history,
    intl,
    isAuthenticated,
    location,
    logoutError,
    onLogout,
    onManageDisableScrolling,
    pagination,
    params,
    providerNotificationCount,
    scrollingDisabled,
    transactions,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    onResendVerificationEmail,
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

  const error = fetchOrdersOrSalesError
    ? <p className={css.error}>
        <FormattedMessage id="InboxPage.fetchFailed" />
      </p>
    : null;

  const noResults = !fetchInProgress && transactions.length === 0 && !fetchOrdersOrSalesError
    ? <li key="noResults" className={css.noResults}>
        <FormattedMessage id={isOrders ? 'InboxPage.noOrdersFound' : 'InboxPage.noSalesFound'} />
      </li>
    : null;

  const hasTransactions = !fetchInProgress && transactions && transactions.length > 0;
  const pagingLinks = hasTransactions && pagination && pagination.totalPages > 1
    ? <PaginationLinks
        className={css.pagination}
        pageName="InboxPage"
        pagePathParams={params}
        pagination={pagination}
      />
    : null;

  const providerNotificationBadge = providerNotificationCount > 0
    ? <NotificationBadge count={providerNotificationCount} />
    : null;
  const tabs = [
    {
      text: <span><FormattedMessage id="InboxPage.ordersTabTitle" /></span>,
      selected: isOrders,
      linkProps: {
        name: 'InboxPage',
        params: { tab: 'orders' },
      },
    },
    {
      text: (
        <span><FormattedMessage id="InboxPage.salesTabTitle" />{providerNotificationBadge}</span>
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
    <PageLayout
      authInfoError={authInfoError}
      logoutError={logoutError}
      title={title}
      scrollingDisabled={scrollingDisabled}
    >
      <Topbar
        className={css.topbar}
        mobileRootClassName={css.mobileTopbar}
        isAuthenticated={isAuthenticated}
        authInProgress={authInProgress}
        currentUser={currentUser}
        currentUserHasListings={currentUserHasListings}
        currentUserHasOrders={currentUserHasOrders}
        currentPage="InboxPage"
        notificationCount={providerNotificationCount}
        history={history}
        location={location}
        onLogout={onLogout}
        onManageDisableScrolling={onManageDisableScrolling}
        onResendVerificationEmail={onResendVerificationEmail}
        sendVerificationEmailInProgress={sendVerificationEmailInProgress}
        sendVerificationEmailError={sendVerificationEmailError}
      />
      <div className={css.container}>
        <div className={css.navigation}>
          <h1 className={css.title}>
            <FormattedMessage id="InboxPage.title" />
          </h1>
          {nav}
        </div>
        <div className={css.content}>
          {error}
          <ul className={css.itemList}>
            {!fetchInProgress ? transactions.map(toTxItem) : null}
            {noResults}
          </ul>
          {pagingLinks}
        </div>
      </div>
    </PageLayout>
  );
};

InboxPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  currentUserHasOrders: null,
  fetchOrdersOrSalesError: null,
  logoutError: null,
  pagination: null,
  providerNotificationCount: 0,
  sendVerificationEmailError: null,
};

InboxPageComponent.propTypes = {
  params: shape({
    tab: string.isRequired,
  }).isRequired,

  authInfoError: instanceOf(Error),
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  currentUserHasOrders: bool,
  fetchInProgress: bool.isRequired,
  fetchOrdersOrSalesError: instanceOf(Error),
  isAuthenticated: bool.isRequired,
  logoutError: instanceOf(Error),
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  pagination: propTypes.pagination,
  providerNotificationCount: number,
  scrollingDisabled: bool.isRequired,
  transactions: arrayOf(propTypes.transaction).isRequired,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: instanceOf(Error),
  onResendVerificationEmail: func.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: object.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    fetchInProgress,
    fetchOrdersOrSalesError,
    pagination,
    transactionRefs,
  } = state.InboxPage;
  const { authInfoError, isAuthenticated, logoutError } = state.Auth;
  const {
    currentUser,
    currentUserHasListings,
    currentUserNotificationCount: providerNotificationCount,
    currentUserHasOrders,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  } = state.user;
  return {
    authInfoError,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    fetchInProgress,
    fetchOrdersOrSalesError,
    isAuthenticated,
    logoutError,
    pagination,
    providerNotificationCount,
    scrollingDisabled: isScrollingDisabled(state),
    transactions: getMarketplaceEntities(state, transactionRefs),
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout: historyPush => dispatch(logout(historyPush)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
});

const InboxPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter, injectIntl)(
  InboxPageComponent
);

InboxPage.loadData = loadData;

export default InboxPage;
