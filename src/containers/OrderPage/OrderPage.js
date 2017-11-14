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

import { loadData, setInitialValues } from './OrderPage.duck';
import css from './OrderPage.css';

// OrderPage handles data loading
// It show loading data text or OrderDetailsPanel (and later also another panel for messages).
export const OrderPageComponent = props => {
  const {
    currentUser,
    fetchOrderError,
    fetchMessagesError,
    messages,
    messageSendingFailedToTransaction,
    intl,
    params,
    scrollingDisabled,
    transaction,
  } = props;
  const currentTransaction = ensureTransaction(transaction);
  const currentListing = ensureListing(currentTransaction.listing);
  const listingTitle = currentListing.attributes.title;

  const initialMessageFailed = !!(
    messageSendingFailedToTransaction &&
    currentTransaction.id &&
    messageSendingFailedToTransaction.uuid === currentTransaction.id.uuid
  );

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
      <OrderDetailsPanel
        className={detailsClassName}
        currentUser={currentUser}
        transaction={currentTransaction}
        messages={messages}
        initialMessageFailed={initialMessageFailed}
        fetchMessagesError={fetchMessagesError}
      />
    ) : (
      loadingOrFaildFetching
    );

  return (
    <Page
      title={intl.formatMessage({ id: 'OrderPage.title' }, { listingTitle })}
      scrollingDisabled={scrollingDisabled}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain className={css.mainContent}>{panel}</LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer className={css.footer} />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
};

OrderPageComponent.defaultProps = {
  currentUser: null,
  fetchOrderError: null,
  fetchMessagesError: null,
  messageSendingFailedToTransaction: null,
  transaction: null,
};

const { bool, oneOf, shape, string, array } = PropTypes;

OrderPageComponent.propTypes = {
  params: shape({ id: string }).isRequired,
  tab: oneOf(['details', 'discussion']).isRequired,

  currentUser: propTypes.currentUser,
  fetchOrderError: propTypes.error,
  fetchMessagesError: propTypes.error,
  messages: array.isRequired,
  messageSendingFailedToTransaction: propTypes.uuid,
  scrollingDisabled: bool.isRequired,
  transaction: propTypes.transaction,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    fetchOrderError,
    transactionRef,
    fetchMessagesError,
    messages,
    messageSendingFailedToTransaction,
  } = state.OrderPage;
  const transactions = getMarketplaceEntities(state, transactionRef ? [transactionRef] : []);
  const transaction = transactions.length > 0 ? transactions[0] : null;

  return {
    currentUser,
    fetchOrderError,
    fetchMessagesError,
    messages,
    messageSendingFailedToTransaction,
    scrollingDisabled: isScrollingDisabled(state),
    transaction,
  };
};

const OrderPage = compose(connect(mapStateToProps), injectIntl)(OrderPageComponent);

OrderPage.setInitialValues = setInitialValues;
OrderPage.loadData = loadData;

export default OrderPage;
