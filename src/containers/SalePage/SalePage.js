import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { reset as resetForm } from 'redux-form';
import * as propTypes from '../../util/propTypes';
import { ensureListing, ensureTransaction } from '../../util/data';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { isScrollingDisabled, manageDisableScrolling } from '../../ducks/UI.duck';
import {
  NamedRedirect,
  SaleDetailsPanel,
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
  sendMessage,
  sendReview,
  fetchMoreMessages,
} from './SalePage.duck';
import css from './SalePage.css';

// SalePage handles data loading
// It show loading data text or SaleDetailsPanel (and later also another panel for messages).
export const SalePageComponent = props => {
  const {
    currentUser,
    fetchSaleError,
    acceptSaleError,
    declineSaleError,
    acceptInProgress,
    declineInProgress,
    intl,
    onAcceptSale,
    onDeclineSale,
    params,
    scrollingDisabled,
    transaction,
    fetchMessagesInProgress,
    fetchMessagesError,
    totalMessagePages,
    oldestMessagePageFetched,
    messages,
    sendMessageInProgress,
    sendMessageError,
    sendReviewInProgress,
    sendReviewError,
    onManageDisableScrolling,
    onShowMoreMessages,
    onSendMessage,
    onSendReview,
    onResetForm,
  } = props;

  const currentTransaction = ensureTransaction(transaction);
  const currentListing = ensureListing(currentTransaction.listing);
  const listingTitle = currentListing.attributes.title;

  // Redirect users with someone else's direct link to their own inbox/sales page.
  const isDataAvailable =
    currentUser &&
    currentTransaction.id &&
    currentTransaction.id.uuid === params.id &&
    currentTransaction.provider &&
    !fetchSaleError;
  const isOwnSale = isDataAvailable && currentUser.id.uuid === currentTransaction.provider.id.uuid;
  if (isDataAvailable && !isOwnSale) {
    // eslint-disable-next-line no-console
    console.error('Tried to access a sale that was not owned by the current user');
    return <NamedRedirect name="InboxPage" params={{ tab: 'sales' }} />;
  }
  const detailsClassName = classNames(css.tabContent, {
    [css.tabContentVisible]: props.tab === 'details',
  });

  const loadingOrFailedFetching = fetchSaleError ? (
    <p className={css.error}>
      <FormattedMessage id="SalePage.fetchSaleFailed" />
    </p>
  ) : (
    <p className={css.loading}>
      <FormattedMessage id="SalePage.loadingData" />
    </p>
  );

  const panel =
    isDataAvailable && currentTransaction.id ? (
      <SaleDetailsPanel
        className={detailsClassName}
        currentUser={currentUser}
        transaction={currentTransaction}
        onAcceptSale={onAcceptSale}
        onDeclineSale={onDeclineSale}
        acceptInProgress={acceptInProgress}
        declineInProgress={declineInProgress}
        acceptSaleError={acceptSaleError}
        declineSaleError={declineSaleError}
        totalMessagePages={totalMessagePages}
        oldestMessagePageFetched={oldestMessagePageFetched}
        messages={messages}
        fetchMessagesInProgress={fetchMessagesInProgress}
        fetchMessagesError={fetchMessagesError}
        sendMessageInProgress={sendMessageInProgress}
        sendMessageError={sendMessageError}
        sendReviewInProgress={sendReviewInProgress}
        sendReviewError={sendReviewError}
        onManageDisableScrolling={onManageDisableScrolling}
        onShowMoreMessages={onShowMoreMessages}
        onSendMessage={onSendMessage}
        onSendReview={onSendReview}
        onResetForm={onResetForm}
      />
    ) : (
      loadingOrFailedFetching
    );

  return (
    <Page
      title={intl.formatMessage({ id: 'SalePage.title' }, { title: listingTitle })}
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

SalePageComponent.defaultProps = {
  currentUser: null,
  fetchSaleError: null,
  acceptSaleError: null,
  declineSaleError: null,
  transaction: null,
  fetchMessagesError: null,
  sendMessageError: null,
};

const { bool, func, oneOf, shape, string, arrayOf, number } = PropTypes;

SalePageComponent.propTypes = {
  params: shape({ id: string }).isRequired,
  tab: oneOf(['details', 'discussion']).isRequired,

  currentUser: propTypes.currentUser,
  fetchSaleError: propTypes.error,
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
  sendMessageInProgress: bool.isRequired,
  sendMessageError: propTypes.error,
  onShowMoreMessages: func.isRequired,
  onSendMessage: func.isRequired,
  onResetForm: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const {
    fetchSaleError,
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
    sendMessageInProgress,
    sendMessageError,
    sendReviewInProgress,
    sendReviewError,
  } = state.SalePage;
  const { currentUser } = state.user;

  const transactions = getMarketplaceEntities(state, transactionRef ? [transactionRef] : []);
  const transaction = transactions.length > 0 ? transactions[0] : null;

  return {
    currentUser,
    fetchSaleError,
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
    sendMessageInProgress,
    sendMessageError,
    sendReviewInProgress,
    sendReviewError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAcceptSale: transactionId => dispatch(acceptSale(transactionId)),
    onDeclineSale: transactionId => dispatch(declineSale(transactionId)),
    onShowMoreMessages: saleId => dispatch(fetchMoreMessages(saleId)),
    onSendMessage: (saleId, message) => dispatch(sendMessage(saleId, message)),
    onResetForm: formName => dispatch(resetForm(formName)),
    onManageDisableScrolling: (componentId, disableScrolling) =>
      dispatch(manageDisableScrolling(componentId, disableScrolling)),
    onSendReview: (tx, reviewRating, reviewContent) =>
      dispatch(sendReview(tx, reviewRating, reviewContent)),
  };
};

const SalePage = compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(
  SalePageComponent
);

SalePage.loadData = loadData;

export default SalePage;
