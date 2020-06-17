import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { createResourceLocatorString, findRouteByRouteName } from '../../util/routes';
import routeConfiguration from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import { ensureListing, ensureTransaction } from '../../util/data';
import { dateFromAPIToLocalNoon } from '../../util/dates';
import { createSlug } from '../../util/urlHelpers';
import { txIsPaymentPending } from '../../util/transaction';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { isScrollingDisabled, manageDisableScrolling } from '../../ducks/UI.duck';
import { initializeCardPaymentData } from '../../ducks/stripe.duck.js';
import {
  NamedRedirect,
  TransactionPanel,
  Page,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { TopbarContainer } from '../../containers';

import {
  acceptSale,
  declineSale,
  loadData,
  setInitialValues,
  sendMessage,
  sendReview,
  fetchMoreMessages,
  fetchTransactionLineItems,
} from './TransactionPage.duck';
import css from './TransactionPage.css';

const PROVIDER = 'provider';
const CUSTOMER = 'customer';

// TransactionPage handles data loading for Sale and Order views to transaction pages in Inbox.
export const TransactionPageComponent = props => {
  const {
    currentUser,
    initialMessageFailedToTransaction,
    savePaymentMethodFailed,
    fetchMessagesError,
    fetchMessagesInProgress,
    totalMessagePages,
    oldestMessagePageFetched,
    fetchTransactionError,
    history,
    intl,
    messages,
    onManageDisableScrolling,
    onSendMessage,
    onSendReview,
    onShowMoreMessages,
    params,
    scrollingDisabled,
    sendMessageError,
    sendMessageInProgress,
    sendReviewError,
    sendReviewInProgress,
    transaction,
    transactionRole,
    acceptInProgress,
    acceptSaleError,
    declineInProgress,
    declineSaleError,
    onAcceptSale,
    onDeclineSale,
    timeSlots,
    fetchTimeSlotsError,
    processTransitions,
    callSetInitialValues,
    onInitializeCardPaymentData,
    onFetchTransactionLineItems,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
  } = props;

  const currentTransaction = ensureTransaction(transaction);
  const currentListing = ensureListing(currentTransaction.listing);
  const isProviderRole = transactionRole === PROVIDER;
  const isCustomerRole = transactionRole === CUSTOMER;

  const redirectToCheckoutPageWithInitialValues = (initialValues, listing) => {
    const routes = routeConfiguration();
    // Customize checkout page state with current listing and selected bookingDates
    const { setInitialValues } = findRouteByRouteName('CheckoutPage', routes);
    callSetInitialValues(setInitialValues, initialValues);

    // Clear previous Stripe errors from store if there is any
    onInitializeCardPaymentData();

    // Redirect to CheckoutPage
    history.push(
      createResourceLocatorString(
        'CheckoutPage',
        routes,
        { id: currentListing.id.uuid, slug: createSlug(currentListing.attributes.title) },
        {}
      )
    );
  };

  // If payment is pending, redirect to CheckoutPage
  if (
    txIsPaymentPending(currentTransaction) &&
    isCustomerRole &&
    currentTransaction.attributes.lineItems
  ) {
    const currentBooking = ensureListing(currentTransaction.booking);

    const initialValues = {
      listing: currentListing,
      // Transaction with payment pending should be passed to CheckoutPage
      transaction: currentTransaction,
      // Original bookingData content is not available,
      // but it is already used since booking is created.
      // (E.g. quantity is used when booking is created.)
      bookingData: {},
      bookingDates: {
        bookingStart: dateFromAPIToLocalNoon(currentBooking.attributes.start),
        bookingEnd: dateFromAPIToLocalNoon(currentBooking.attributes.end),
      },
    };

    redirectToCheckoutPageWithInitialValues(initialValues, currentListing);
  }

  // Customer can create a booking, if the tx is in "enquiry" state.
  const handleSubmitBookingRequest = values => {
    const { bookingDates, ...bookingData } = values;

    const initialValues = {
      listing: currentListing,
      // enquired transaction should be passed to CheckoutPage
      transaction: currentTransaction,
      bookingData,
      bookingDates: {
        bookingStart: bookingDates.startDate,
        bookingEnd: bookingDates.endDate,
      },
      confirmPaymentError: null,
    };

    redirectToCheckoutPageWithInitialValues(initialValues, currentListing);
  };

  const deletedListingTitle = intl.formatMessage({
    id: 'TransactionPage.deletedListing',
  });
  const listingTitle = currentListing.attributes.deleted
    ? deletedListingTitle
    : currentListing.attributes.title;

  // Redirect users with someone else's direct link to their own inbox/sales or inbox/orders page.
  const isDataAvailable =
    currentUser &&
    currentTransaction.id &&
    currentTransaction.id.uuid === params.id &&
    currentTransaction.attributes.lineItems &&
    currentTransaction.customer &&
    currentTransaction.provider &&
    !fetchTransactionError;

  const isOwnSale =
    isDataAvailable &&
    isProviderRole &&
    currentUser.id.uuid === currentTransaction.provider.id.uuid;
  const isOwnOrder =
    isDataAvailable &&
    isCustomerRole &&
    currentUser.id.uuid === currentTransaction.customer.id.uuid;

  if (isDataAvailable && isProviderRole && !isOwnSale) {
    // eslint-disable-next-line no-console
    console.error('Tried to access a sale that was not owned by the current user');
    return <NamedRedirect name="InboxPage" params={{ tab: 'sales' }} />;
  } else if (isDataAvailable && isCustomerRole && !isOwnOrder) {
    // eslint-disable-next-line no-console
    console.error('Tried to access an order that was not owned by the current user');
    return <NamedRedirect name="InboxPage" params={{ tab: 'orders' }} />;
  }

  const detailsClassName = classNames(css.tabContent, css.tabContentVisible);

  const fetchErrorMessage = isCustomerRole
    ? 'TransactionPage.fetchOrderFailed'
    : 'TransactionPage.fetchSaleFailed';
  const loadingMessage = isCustomerRole
    ? 'TransactionPage.loadingOrderData'
    : 'TransactionPage.loadingSaleData';

  const loadingOrFailedFetching = fetchTransactionError ? (
    <p className={css.error}>
      <FormattedMessage id={`${fetchErrorMessage}`} />
    </p>
  ) : (
    <p className={css.loading}>
      <FormattedMessage id={`${loadingMessage}`} />
    </p>
  );

  const initialMessageFailed = !!(
    initialMessageFailedToTransaction &&
    currentTransaction.id &&
    initialMessageFailedToTransaction.uuid === currentTransaction.id.uuid
  );

  // TransactionPanel is presentational component
  // that currently handles showing everything inside layout's main view area.
  const panel = isDataAvailable ? (
    <TransactionPanel
      className={detailsClassName}
      currentUser={currentUser}
      transaction={currentTransaction}
      fetchMessagesInProgress={fetchMessagesInProgress}
      totalMessagePages={totalMessagePages}
      oldestMessagePageFetched={oldestMessagePageFetched}
      messages={messages}
      initialMessageFailed={initialMessageFailed}
      savePaymentMethodFailed={savePaymentMethodFailed}
      fetchMessagesError={fetchMessagesError}
      sendMessageInProgress={sendMessageInProgress}
      sendMessageError={sendMessageError}
      sendReviewInProgress={sendReviewInProgress}
      sendReviewError={sendReviewError}
      onManageDisableScrolling={onManageDisableScrolling}
      onShowMoreMessages={onShowMoreMessages}
      onSendMessage={onSendMessage}
      onSendReview={onSendReview}
      transactionRole={transactionRole}
      onAcceptSale={onAcceptSale}
      onDeclineSale={onDeclineSale}
      acceptInProgress={acceptInProgress}
      declineInProgress={declineInProgress}
      acceptSaleError={acceptSaleError}
      declineSaleError={declineSaleError}
      nextTransitions={processTransitions}
      onSubmitBookingRequest={handleSubmitBookingRequest}
      timeSlots={timeSlots}
      fetchTimeSlotsError={fetchTimeSlotsError}
      onFetchTransactionLineItems={onFetchTransactionLineItems}
      lineItems={lineItems}
      fetchLineItemsInProgress={fetchLineItemsInProgress}
      fetchLineItemsError={fetchLineItemsError}
    />
  ) : (
    loadingOrFailedFetching
  );

  return (
    <Page
      title={intl.formatMessage({ id: 'TransactionPage.title' }, { title: listingTitle })}
      scrollingDisabled={scrollingDisabled}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.root}>{panel}</div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter className={css.footer}>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </Page>
  );
};

TransactionPageComponent.defaultProps = {
  currentUser: null,
  fetchTransactionError: null,
  acceptSaleError: null,
  declineSaleError: null,
  transaction: null,
  fetchMessagesError: null,
  initialMessageFailedToTransaction: null,
  savePaymentMethodFailed: false,
  sendMessageError: null,
  timeSlots: null,
  fetchTimeSlotsError: null,
  lineItems: null,
  fetchLineItemsError: null,
};

const { bool, func, oneOf, shape, string, array, arrayOf, number } = PropTypes;

TransactionPageComponent.propTypes = {
  params: shape({ id: string }).isRequired,
  transactionRole: oneOf([PROVIDER, CUSTOMER]).isRequired,
  currentUser: propTypes.currentUser,
  fetchTransactionError: propTypes.error,
  acceptSaleError: propTypes.error,
  declineSaleError: propTypes.error,
  acceptInProgress: bool.isRequired,
  declineInProgress: bool.isRequired,
  onAcceptSale: func.isRequired,
  onDeclineSale: func.isRequired,
  scrollingDisabled: bool.isRequired,
  transaction: propTypes.transaction,
  fetchMessagesError: propTypes.error,
  totalMessagePages: number.isRequired,
  oldestMessagePageFetched: number.isRequired,
  messages: arrayOf(propTypes.message).isRequired,
  initialMessageFailedToTransaction: propTypes.uuid,
  savePaymentMethodFailed: bool,
  sendMessageInProgress: bool.isRequired,
  sendMessageError: propTypes.error,
  onShowMoreMessages: func.isRequired,
  onSendMessage: func.isRequired,
  timeSlots: arrayOf(propTypes.timeSlot),
  fetchTimeSlotsError: propTypes.error,
  callSetInitialValues: func.isRequired,
  onInitializeCardPaymentData: func.isRequired,
  onFetchTransactionLineItems: func.isRequired,

  // line items
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    fetchTransactionError,
    acceptSaleError,
    declineSaleError,
    acceptInProgress,
    declineInProgress,
    transactionRef,
    fetchMessagesInProgress,
    fetchMessagesError,
    totalMessagePages,
    oldestMessagePageFetched,
    messages,
    initialMessageFailedToTransaction,
    savePaymentMethodFailed,
    sendMessageInProgress,
    sendMessageError,
    sendReviewInProgress,
    sendReviewError,
    timeSlots,
    fetchTimeSlotsError,
    processTransitions,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
  } = state.TransactionPage;
  const { currentUser } = state.user;

  const transactions = getMarketplaceEntities(state, transactionRef ? [transactionRef] : []);
  const transaction = transactions.length > 0 ? transactions[0] : null;

  return {
    currentUser,
    fetchTransactionError,
    acceptSaleError,
    declineSaleError,
    acceptInProgress,
    declineInProgress,
    scrollingDisabled: isScrollingDisabled(state),
    transaction,
    fetchMessagesInProgress,
    fetchMessagesError,
    totalMessagePages,
    oldestMessagePageFetched,
    messages,
    initialMessageFailedToTransaction,
    savePaymentMethodFailed,
    sendMessageInProgress,
    sendMessageError,
    sendReviewInProgress,
    sendReviewError,
    timeSlots,
    fetchTimeSlotsError,
    processTransitions,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAcceptSale: transactionId => dispatch(acceptSale(transactionId)),
    onDeclineSale: transactionId => dispatch(declineSale(transactionId)),
    onShowMoreMessages: txId => dispatch(fetchMoreMessages(txId)),
    onSendMessage: (txId, message) => dispatch(sendMessage(txId, message)),
    onManageDisableScrolling: (componentId, disableScrolling) =>
      dispatch(manageDisableScrolling(componentId, disableScrolling)),
    onSendReview: (role, tx, reviewRating, reviewContent) =>
      dispatch(sendReview(role, tx, reviewRating, reviewContent)),
    callSetInitialValues: (setInitialValues, values) => dispatch(setInitialValues(values)),
    onInitializeCardPaymentData: () => dispatch(initializeCardPaymentData()),
    onFetchTransactionLineItems: (bookingData, listingId, isOwnListing) =>
      dispatch(fetchTransactionLineItems(bookingData, listingId, isOwnListing)),
  };
};

const TransactionPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(TransactionPageComponent);

TransactionPage.loadData = loadData;
TransactionPage.setInitialValues = setInitialValues;

export default TransactionPage;
