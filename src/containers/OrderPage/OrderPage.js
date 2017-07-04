import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { NamedRedirect, OrderDetailsPanel, PageLayout } from '../../components';
import * as propTypes from '../../util/propTypes';
import { ensureListing, ensureTransaction } from '../../util/data';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { loadData } from './OrderPage.duck';

import css from './OrderPage.css';

// OrderPage handles data loading
// It show loading data text or OrderDetailsPanel (and later also another panel for messages).
export const OrderPageComponent = props => {
  const { currentUser, fetchOrderError, intl, params, transaction, scrollingDisabled } = props;
  const currentTransaction = ensureTransaction(transaction);
  const currentListing = ensureListing(currentTransaction.listing);
  const listingTitle = currentListing.attributes.title;

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

  const detailsClassName = classNames(css.tabContent, {
    [css.tabContentVisible]: props.tab === 'details',
  });

  const loadingOrFaildFetching = fetchOrderError
    ? <p className={css.error}><FormattedMessage id="OrderPage.fetchOrderFailed" /></p>
    : <p className={css.loading}><FormattedMessage id="OrderPage.loadingData" /></p>;

  const panel = isDataAvailable && currentTransaction.id
    ? <OrderDetailsPanel className={detailsClassName} transaction={currentTransaction} />
    : loadingOrFaildFetching;

  return (
    <PageLayout
      title={intl.formatMessage({ id: 'OrderPage.title' }, { listingTitle })}
      scrollingDisabled={scrollingDisabled}
    >
      {panel}
    </PageLayout>
  );
};

OrderPageComponent.defaultProps = { transaction: null, currentUser: null, fetchOrderError: null };

const { bool, instanceOf, oneOf, shape, string } = PropTypes;

OrderPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  fetchOrderError: instanceOf(Error),
  intl: intlShape.isRequired,
  params: shape({ id: string }).isRequired,
  scrollingDisabled: bool.isRequired,
  tab: oneOf(['details', 'discussion']).isRequired,
  transaction: propTypes.transaction,
};

const mapStateToProps = state => {
  const { fetchOrderError, transactionRef } = state.OrderPage;
  const { currentUser } = state.user;

  const transactions = getMarketplaceEntities(state, transactionRef ? [transactionRef] : []);
  const transaction = transactions.length > 0 ? transactions[0] : null;

  return {
    transaction,
    fetchOrderError,
    currentUser,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
});

const OrderPage = connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrderPageComponent));

OrderPage.loadData = loadData;

export default OrderPage;
