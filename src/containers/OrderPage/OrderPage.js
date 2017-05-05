import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { NamedRedirect, OrderDetailsPanel, PageLayout } from '../../components';
import * as propTypes from '../../util/propTypes';
import { ensureBooking, ensureListing, ensureTransaction, ensureUser } from '../../util/data';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { loadData } from './OrderPage.duck';

import css from './OrderPage.css';

// OrderPage handles data loading
// It show loading data text or OrderDetailsPanel (and later also another panel for messages).
export const OrderPageComponent = props => {
  const { currentUser, fetchOrderError, intl, params, transaction } = props;
  const currentTransaction = ensureTransaction(transaction);
  const currentListing = ensureListing(currentTransaction.listing);
  const title = currentListing.attributes.title;

  // Redirect users with someone else's direct link to their own inbox/orders page.
  const isDataAvailable = currentUser &&
    currentTransaction.id &&
    currentTransaction.id.uuid === params.id &&
    currentTransaction.customer &&
    !fetchOrderError;
  const isOwnSale = isDataAvailable && currentUser.id.uuid === currentTransaction.customer.id.uuid;
  if (isDataAvailable && !isOwnSale) {
    // eslint-disable-next-line no-console
    console.error('Tried to access an order that was not owned by the current user');
    return <NamedRedirect name="InboxPage" params={{ tab: 'orders' }} />;
  }

  const detailsProps = {
    totalPrice: currentTransaction.attributes.total,
    orderState: currentTransaction.attributes.state,
    lastTransitionedAt: currentTransaction.attributes.lastTransitionedAt,
    listing: currentListing,
    booking: ensureBooking(currentTransaction.booking),
    provider: ensureUser(currentTransaction.provider),
  };

  const detailsClassName = classNames(css.tabContent, {
    [css.tabContentVisible]: props.tab === 'details',
  });

  const loadingOrFaildFetching = fetchOrderError
    ? <h1 className={css.title}><FormattedMessage id="OrderPage.fetchOrderFailed" /></h1>
    : <h1 className={css.title}><FormattedMessage id="OrderPage.loadingData" /></h1>;

  const panel = isDataAvailable && currentTransaction.id
    ? <OrderDetailsPanel className={detailsClassName} {...detailsProps} />
    : loadingOrFaildFetching;

  return (
    <PageLayout title={intl.formatMessage({ id: 'OrderPage.title' }, { title })}>
      {panel}
    </PageLayout>
  );
};

OrderPageComponent.defaultProps = { transaction: null, currentUser: null, fetchOrderError: null };

const { instanceOf, oneOf, shape, string } = PropTypes;

OrderPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  fetchOrderError: instanceOf(Error),
  intl: intlShape.isRequired,
  params: shape({ id: string }).isRequired,
  tab: oneOf(['details', 'discussion']).isRequired,
  transaction: propTypes.transaction,
};

const mapStateToProps = state => {
  const { fetchOrderError, transactionRef } = state.OrderPage;
  const { currentUser } = state.user;

  const transactions = getMarketplaceEntities(state, transactionRef ? [transactionRef] : []);
  const transaction = transactions.length > 0 ? transactions[0] : null;

  return { transaction, fetchOrderError, currentUser };
};

const OrderPage = connect(mapStateToProps)(injectIntl(OrderPageComponent));

OrderPage.loadData = loadData;

export default OrderPage;
