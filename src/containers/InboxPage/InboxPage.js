import React, { PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import {
  Avatar,
  NamedLink,
  NamedRedirect,
  PageLayout,
  PaginationLinks,
  TabNav,
} from '../../components';
import { Topbar } from '../../containers';
import * as propTypes from '../../util/propTypes';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { loadData } from './InboxPage.duck';

import css from './InboxPage.css';

const { arrayOf, bool, func, instanceOf, object, oneOf, shape, string } = PropTypes;

// Formatted username
const username = user => {
  const profile = user && user.attributes && user.attributes.profile ? user.attributes.profile : {};
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    name: profile.firstName ? `${profile.firstName} ${profile.lastName}` : '',
  };
};

// Localised timestamp when the given transaction was updated
const timestamp = (intl, tx) => {
  const defaultValue = { datetime: '', date: '' };
  const date = tx.attributes ? tx.attributes.lastTransitionedAt : null;
  return date
    ? {
        datetime: `${intl.formatDate(date)} ${intl.formatTime(date)}`,
        date: intl.formatDate(date),
      }
    : defaultValue;
};

// Translated name of the state of the given transaction
const txState = (intl, tx) => {
  const { attributes: { state } } = tx;
  if (state === propTypes.TX_STATE_ACCEPTED) {
    return intl.formatMessage({
      id: 'InboxPage.stateAccepted',
    });
  } else if (state === propTypes.TX_STATE_REJECTED) {
    return intl.formatMessage({
      id: 'InboxPage.stateRejected',
    });
  } else if (state === propTypes.TX_STATE_DELIVERED) {
    return intl.formatMessage({
      id: 'InboxPage.stateDelivered',
    });
  }
  return intl.formatMessage({
    id: 'InboxPage.statePending',
  });
};

export const InboxItem = props => {
  const { type, tx, intl } = props;
  const { customer, provider } = tx;
  const isOrder = type === 'order';
  const otherUser = username(isOrder ? provider : customer);
  const changedDate = timestamp(intl, tx);
  return (
    <NamedLink
      className={css.itemLink}
      name={isOrder ? 'OrderDetailsPage' : 'SaleDetailsPage'}
      params={{ id: tx.id.uuid }}
    >
      <div className={css.itemAvatar}>
        <Avatar firstName={otherUser.firstName} lastName={otherUser.lastName} />
      </div>
      <div className={css.itemInfo}>
        <div>
          <span className={css.itemUsername}>{otherUser.name}</span>
          <span className={css.itemTimestamp} title={changedDate.datetime}>{changedDate.date}</span>
        </div>
        <div className={css.itemState}>{txState(intl, tx)}</div>
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
    fetchInProgress,
    fetchOrdersOrSalesError,
    history,
    location,
    pagination,
    scrollingDisabled,
    transactions,
    intl,
    params,
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

  const tabs = [
    {
      text: intl.formatMessage({
        id: 'InboxPage.ordersTabTitle',
      }),
      selected: isOrders,
      linkProps: {
        name: 'InboxPage',
        params: { tab: 'orders' },
      },
    },
    {
      text: intl.formatMessage({
        id: 'InboxPage.salesTabTitle',
      }),
      selected: !isOrders,
      linkProps: {
        name: 'InboxPage',
        params: { tab: 'sales' },
      },
    },
  ];
  const nav = <TabNav className={css.tabs} tabs={tabs} />;

  return (
    <PageLayout title={title} scrollingDisabled={scrollingDisabled}>
      <Topbar history={history} location={location} />
      <h1 className={css.title}>
        <FormattedMessage id="InboxPage.title" />
      </h1>
      {nav}
      {error}
      <ul>
        {!fetchInProgress ? transactions.map(toTxItem) : null}
        {noResults}
      </ul>
      {pagingLinks}
    </PageLayout>
  );
};

InboxPageComponent.defaultProps = {
  fetchOrdersOrSalesError: null,
  pagination: null,
};

InboxPageComponent.propTypes = {
  params: shape({
    tab: string.isRequired,
  }).isRequired,

  fetchInProgress: bool.isRequired,
  fetchOrdersOrSalesError: instanceOf(Error),
  pagination: propTypes.pagination,
  scrollingDisabled: bool.isRequired,
  transactions: arrayOf(propTypes.transaction).isRequired,

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
  return {
    fetchInProgress,
    fetchOrdersOrSalesError,
    pagination,
    transactions: getMarketplaceEntities(state, transactionRefs),
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});

const InboxPage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter, injectIntl)(
  InboxPageComponent
);

InboxPage.loadData = loadData;

export default InboxPage;
