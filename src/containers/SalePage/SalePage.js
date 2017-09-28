import React, { PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { ensureListing, ensureTransaction } from '../../util/data';
import { NamedRedirect, SaleDetailsPanel, Page, Topbar } from '../../components';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { sendVerificationEmail } from '../../ducks/user.duck';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { acceptSale, rejectSale, loadData } from './SalePage.duck';

import css from './SalePage.css';

// SalePage handles data loading
// It show loading data text or SaleDetailsPanel (and later also another panel for messages).
export const SalePageComponent = props => {
  const {
    authInfoError,
    authInProgress,
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    fetchSaleError,
    acceptSaleError,
    rejectSaleError,
    acceptInProgress,
    rejectInProgress,
    history,
    intl,
    isAuthenticated,
    location,
    logoutError,
    notificationCount,
    onAcceptSale,
    onLogout,
    onManageDisableScrolling,
    onRejectSale,
    params,
    scrollingDisabled,
    transaction,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
    onResendVerificationEmail,
  } = props;
  const currentTransaction = ensureTransaction(transaction);
  const currentListing = ensureListing(currentTransaction.listing);
  const listingTitle = currentListing.attributes.title;

  // Redirect users with someone else's direct link to their own inbox/sales page.
  const isDataAvailable = currentUser &&
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

  const loadingOrFailedFetching = fetchSaleError
    ? <p className={css.error}><FormattedMessage id="SalePage.fetchSaleFailed" /></p>
    : <p className={css.loading}><FormattedMessage id="SalePage.loadingData" /></p>;

  const panel = isDataAvailable && currentTransaction.id
    ? <SaleDetailsPanel
        className={detailsClassName}
        transaction={currentTransaction}
        onAcceptSale={onAcceptSale}
        onRejectSale={onRejectSale}
        acceptInProgress={acceptInProgress}
        rejectInProgress={rejectInProgress}
        acceptSaleError={acceptSaleError}
        rejectSaleError={rejectSaleError}
      />
    : loadingOrFailedFetching;

  return (
    <Page
      authInfoError={authInfoError}
      logoutError={logoutError}
      title={intl.formatMessage({ id: 'SalePage.title' }, { title: listingTitle })}
      scrollingDisabled={scrollingDisabled}
    >
      <Topbar
        isAuthenticated={isAuthenticated}
        authInProgress={authInProgress}
        currentUser={currentUser}
        currentUserHasListings={currentUserHasListings}
        currentUserHasOrders={currentUserHasOrders}
        notificationCount={notificationCount}
        history={history}
        location={location}
        onLogout={onLogout}
        onManageDisableScrolling={onManageDisableScrolling}
        onResendVerificationEmail={onResendVerificationEmail}
        sendVerificationEmailInProgress={sendVerificationEmailInProgress}
        sendVerificationEmailError={sendVerificationEmailError}
      />
      <div className={css.root}>
        {panel}
      </div>
    </Page>
  );
};

SalePageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  currentUserHasOrders: null,
  fetchSaleError: null,
  acceptSaleError: null,
  rejectSaleError: null,
  logoutError: null,
  notificationCount: 0,
  transaction: null,
  sendVerificationEmailError: null,
};

const { bool, func, instanceOf, number, oneOf, shape, string } = PropTypes;

SalePageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  currentUserHasOrders: bool,
  fetchSaleError: instanceOf(Error),
  acceptSaleError: instanceOf(Error),
  rejectSaleError: instanceOf(Error),
  acceptInProgress: bool.isRequired,
  rejectInProgress: bool.isRequired,
  intl: intlShape.isRequired,
  isAuthenticated: bool.isRequired,
  logoutError: instanceOf(Error),
  notificationCount: number,
  onAcceptSale: func.isRequired,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onRejectSale: func.isRequired,
  params: shape({ id: string }).isRequired,
  scrollingDisabled: bool.isRequired,
  tab: oneOf(['details', 'discussion']).isRequired,
  transaction: propTypes.transaction,
  sendVerificationEmailInProgress: bool.isRequired,
  sendVerificationEmailError: instanceOf(Error),
  onResendVerificationEmail: func.isRequired,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => {
  const {
    fetchSaleError,
    acceptSaleError,
    rejectSaleError,
    acceptInProgress,
    rejectInProgress,
    transactionRef,
  } = state.SalePage;
  const { authInfoError, isAuthenticated, logoutError } = state.Auth;
  const {
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    currentUserNotificationCount: notificationCount,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  } = state.user;

  const transactions = getMarketplaceEntities(state, transactionRef ? [transactionRef] : []);
  const transaction = transactions.length > 0 ? transactions[0] : null;

  return {
    authInfoError,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    currentUserHasOrders,
    fetchSaleError,
    acceptSaleError,
    rejectSaleError,
    acceptInProgress,
    rejectInProgress,
    isAuthenticated,
    logoutError,
    notificationCount,
    scrollingDisabled: isScrollingDisabled(state),
    transaction,
    sendVerificationEmailInProgress,
    sendVerificationEmailError,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAcceptSale: transactionId => dispatch(acceptSale(transactionId)),
    onRejectSale: transactionId => dispatch(rejectSale(transactionId)),
    onLogout: historyPush => dispatch(logout(historyPush)),
    onManageDisableScrolling: (componentId, disableScrolling) =>
      dispatch(manageDisableScrolling(componentId, disableScrolling)),
    onResendVerificationEmail: () => dispatch(sendVerificationEmail()),
  };
};

const SalePage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter, injectIntl)(
  SalePageComponent
);

SalePage.loadData = loadData;

export default SalePage;
