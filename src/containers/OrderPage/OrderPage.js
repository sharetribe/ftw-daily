import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { ensureListing, ensureTransaction } from '../../util/data';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  NamedRedirect,
  OrderDetailsPanel,
  Page,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { TopbarContainer } from '../../containers';

import { loadData } from './OrderPage.duck';
import css from './OrderPage.css';

// OrderPage handles data loading
// It show loading data text or OrderDetailsPanel (and later also another panel for messages).
export const OrderPageComponent = props => {
  const {
    authInfoError,
    currentUser,
    fetchOrderError,
    intl,
    logoutError,
    params,
    scrollingDisabled,
    transaction,
  } = props;
  const currentTransaction = ensureTransaction(transaction);
  const currentListing = ensureListing(currentTransaction.listing);
  const listingTitle = currentListing.attributes.title;

  // Redirect users with someone else's direct link to their own inbox/orders page.
  const isDataAvailable =
    currentUser &&
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

  const loadingOrFaildFetching = fetchOrderError ? (
    <p className={css.error}>
      <FormattedMessage id="OrderPage.fetchOrderFailed" />
    </p>
  ) : (
    <p className={css.loading}>
      <FormattedMessage id="OrderPage.loadingData" />
    </p>
  );

  const panel =
    isDataAvailable && currentTransaction.id ? (
      <OrderDetailsPanel className={detailsClassName} transaction={currentTransaction} />
    ) : (
      loadingOrFaildFetching
    );

  return (
    <Page
      authInfoError={authInfoError}
      logoutError={logoutError}
      title={intl.formatMessage({ id: 'OrderPage.title' }, { listingTitle })}
      scrollingDisabled={scrollingDisabled}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain className={css.mainContent}>{panel}</LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
};

OrderPageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  fetchOrderError: null,
  logoutError: null,
  transaction: null,
};

const { bool, oneOf, shape, string } = PropTypes;

OrderPageComponent.propTypes = {
  authInfoError: propTypes.error,
  currentUser: propTypes.currentUser,
  fetchOrderError: propTypes.error,
  intl: intlShape.isRequired,
  logoutError: propTypes.error,
  params: shape({ id: string }).isRequired,
  scrollingDisabled: bool.isRequired,
  tab: oneOf(['details', 'discussion']).isRequired,
  transaction: propTypes.transaction,
};

const mapStateToProps = state => {
  const { fetchOrderError, transactionRef } = state.OrderPage;
  const { authInfoError, logoutError } = state.Auth;
  const { currentUser } = state.user;
  const transactions = getMarketplaceEntities(state, transactionRef ? [transactionRef] : []);
  const transaction = transactions.length > 0 ? transactions[0] : null;

  return {
    authInfoError,
    currentUser,
    fetchOrderError,
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
    transaction,
  };
};

const OrderPage = compose(connect(mapStateToProps), injectIntl)(OrderPageComponent);

OrderPage.loadData = loadData;

export default OrderPage;
