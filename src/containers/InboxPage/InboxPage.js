import React from 'react';
import { arrayOf, bool, number, oneOf, shape, string } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import {
  txIsAccepted,
  txIsCanceled,
  txIsDeclined,
  txIsEnquired,
  txIsRequested,
  txHasBeenDelivered,
  txIsPaymentExpired,
  txIsPaymentPending,
} from '../../util/transaction';
import { propTypes, DATE_TYPE_DATE } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Avatar,
  BookingTimeInfo,
  NamedLink,
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
  IconSpinner,
  UserDisplayName,
} from '../../components';
import { TopbarContainer, NotFoundPage } from '../../containers';
import config from '../../config';

import css from './InboxPage.module.css';

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
export const txState = (intl, tx, type) => {
  const isOrder = type === 'order';

  if (txIsEnquired(tx)) {
    return {
      nameClassName: isOrder ? css.nameNotEmphasized : css.nameEmphasized,
      bookingClassName: css.bookingActionNeeded,
      lastTransitionedAtClassName: css.lastTransitionedAtEmphasized,
      stateClassName: css.stateActionNeeded,
      state: intl.formatMessage({
        id: 'InboxPage.stateEnquiry',
      }),
    };
  } else if (txIsRequested(tx)) {
    const requested = isOrder
      ? {
          nameClassName: css.nameNotEmphasized,
          bookingClassName: css.bookingNoActionNeeded,
          lastTransitionedAtClassName: css.lastTransitionedAtEmphasized,
          stateClassName: css.stateActionNeeded,
          state: intl.formatMessage({
            id: 'InboxPage.stateRequested',
          }),
        }
      : {
          nameClassName: css.nameEmphasized,
          bookingClassName: css.bookingActionNeeded,
          lastTransitionedAtClassName: css.lastTransitionedAtEmphasized,
          stateClassName: css.stateActionNeeded,
          state: intl.formatMessage({
            id: 'InboxPage.statePending',
          }),
        };

    return requested;
  } else if (txIsPaymentPending(tx)) {
    return {
      nameClassName: isOrder ? css.nameNotEmphasized : css.nameEmphasized,
      bookingClassName: css.bookingNoActionNeeded,
      lastTransitionedAtClassName: css.lastTransitionedAtNotEmphasized,
      stateClassName: isOrder ? css.stateActionNeeded : css.stateNoActionNeeded,
      state: intl.formatMessage({
        id: 'InboxPage.statePendingPayment',
      }),
    };
  } else if (txIsPaymentExpired(tx)) {
    return {
      nameClassName: css.nameNotEmphasized,
      bookingClassName: css.bookingNoActionNeeded,
      lastTransitionedAtClassName: css.lastTransitionedAtNotEmphasized,
      stateClassName: css.stateNoActionNeeded,
      state: intl.formatMessage({
        id: 'InboxPage.stateExpired',
      }),
    };
  } else if (txIsDeclined(tx)) {
    return {
      nameClassName: css.nameNotEmphasized,
      bookingClassName: css.bookingNoActionNeeded,
      lastTransitionedAtClassName: css.lastTransitionedAtNotEmphasized,
      stateClassName: css.stateNoActionNeeded,
      state: intl.formatMessage({
        id: 'InboxPage.stateDeclined',
      }),
    };
  } else if (txIsAccepted(tx)) {
    return {
      nameClassName: css.nameNotEmphasized,
      bookingClassName: css.bookingNoActionNeeded,
      lastTransitionedAtClassName: css.lastTransitionedAtNotEmphasized,
      stateClassName: css.stateSucces,
      state: intl.formatMessage({
        id: 'InboxPage.stateAccepted',
      }),
    };
  } else if (txIsCanceled(tx)) {
    return {
      nameClassName: css.nameNotEmphasized,
      bookingClassName: css.bookingNoActionNeeded,
      lastTransitionedAtClassName: css.lastTransitionedAtNotEmphasized,
      stateClassName: css.stateNoActionNeeded,
      state: intl.formatMessage({
        id: 'InboxPage.stateCanceled',
      }),
    };
  } else if (txHasBeenDelivered(tx)) {
    return {
      nameClassName: css.nameNotEmphasized,
      bookingClassName: css.bookingNoActionNeeded,
      lastTransitionedAtClassName: css.lastTransitionedAtNotEmphasized,
      stateClassName: css.stateNoActionNeeded,
      state: intl.formatMessage({
        id: 'InboxPage.stateDelivered',
      }),
    };
  } else {
    console.warn('This transition is unknown:', tx.attributes.lastTransition);
    return null;
  }
};

// Functional component as internal helper to print BookingTimeInfo if that is needed
const BookingInfoMaybe = props => {
  const { bookingClassName, isOrder, intl, tx, unitType } = props;
  const isEnquiry = txIsEnquired(tx);

  if (isEnquiry) {
    return null;
  }

  // If you want to show the booking price after the booking time on InboxPage you can
  // add the price after the BookingTimeInfo component. You can get the price by uncommenting
  // sthe following lines:

  // const bookingPrice = isOrder ? tx.attributes.payinTotal : tx.attributes.payoutTotal;
  // const price = bookingPrice ? formatMoney(intl, bookingPrice) : null;

  // Remember to also add formatMoney function from 'util/currency.js' and add this after BookingTimeInfo:
  // <div className={css.itemPrice}>{price}</div>

  return (
    <div className={classNames(css.bookingInfoWrapper, bookingClassName)}>
      <BookingTimeInfo
        bookingClassName={bookingClassName}
        isOrder={isOrder}
        intl={intl}
        tx={tx}
        unitType={unitType}
        dateType={DATE_TYPE_DATE}
      />
    </div>
  );
};

BookingInfoMaybe.propTypes = {
  intl: intlShape.isRequired,
  isOrder: bool.isRequired,
  tx: propTypes.transaction.isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
};

export const InboxItem = props => {
  const { unitType, type, tx, intl, stateData } = props;
  const { customer, provider } = tx;
  const isOrder = type === 'order';

  const otherUser = isOrder ? provider : customer;
  const otherUserDisplayName = <UserDisplayName user={otherUser} intl={intl} />;
  const isOtherUserBanned = otherUser.attributes.banned;

  const isSaleNotification = !isOrder && txIsRequested(tx);
  const rowNotificationDot = isSaleNotification ? <div className={css.notificationDot} /> : null;
  const lastTransitionedAt = formatDate(intl, tx.attributes.lastTransitionedAt);

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
          <BookingInfoMaybe
            bookingClassName={stateData.bookingClassName}
            intl={intl}
            isOrder={isOrder}
            tx={tx}
            unitType={unitType}
          />
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
  unitType: propTypes.bookingUnitType.isRequired,
  type: oneOf(['order', 'sale']).isRequired,
  tx: propTypes.transaction.isRequired,
  intl: intlShape.isRequired,
};

export const InboxPageComponent = props => {
  const {
    unitType,
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
  const ensuredCurrentUser = ensureCurrentUser(currentUser);

  const validTab = tab === 'orders' || tab === 'sales';
  if (!validTab) {
    return <NotFoundPage />;
  }

  const isOrders = tab === 'orders';

  const ordersTitle = intl.formatMessage({ id: 'InboxPage.ordersTitle' });
  const salesTitle = intl.formatMessage({ id: 'InboxPage.salesTitle' });
  const title = isOrders ? ordersTitle : salesTitle;

  const toTxItem = tx => {
    const type = isOrders ? 'order' : 'sale';
    const stateData = txState(intl, tx, type);

    // Render InboxItem only if the latest transition of the transaction is handled in the `txState` function.
    return stateData ? (
      <li key={tx.id.uuid} className={css.listItem}>
        <InboxItem unitType={unitType} type={type} tx={tx} intl={intl} stateData={stateData} />
      </li>
    ) : null;
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
      ? user.id && tx && tx.length > 0 && tx[0].customer.id.uuid === user.id.uuid
      : user.id && tx && tx.length > 0 && tx[0].provider.id.uuid === user.id.uuid;
  };
  const hasTransactions =
    !fetchInProgress && hasOrderOrSaleTransactions(transactions, isOrders, ensuredCurrentUser);
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
            {!fetchInProgress ? (
              transactions.map(toTxItem)
            ) : (
              <li className={css.listItemsLoading}>
                <IconSpinner />
              </li>
            )}
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
  unitType: config.bookingUnitType,
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

  unitType: propTypes.bookingUnitType,
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

const InboxPage = compose(
  connect(mapStateToProps),
  injectIntl
)(InboxPageComponent);

export default InboxPage;
