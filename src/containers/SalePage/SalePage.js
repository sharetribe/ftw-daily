import React, { PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { ensureListing, ensureTransaction } from '../../util/data';
import {
  PrimaryButton,
  SecondaryButton,
  NamedRedirect,
  SaleDetailsPanel,
  PageLayout,
  Topbar,
} from '../../components';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { logout, authenticationInProgress } from '../../ducks/Auth.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { acceptSale, rejectSale, loadData } from './SalePage.duck';

import css from './SalePage.css';

// SalePage handles data loading
// It show loading data text or SaleDetailsPanel (and later also another panel for messages).
export const SalePageComponent = props => {
  const {
    authInProgress,
    currentUser,
    currentUserHasListings,
    fetchSaleError,
    history,
    intl,
    isAuthenticated,
    location,
    notificationCount,
    onAcceptSale,
    onLogout,
    onManageDisableScrolling,
    onRejectSale,
    params,
    scrollingDisabled,
    transaction,
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
    ? <SaleDetailsPanel className={detailsClassName} transaction={currentTransaction} />
    : loadingOrFailedFetching;

  const isPreauthorizedState = currentTransaction.attributes.state ===
    propTypes.TX_STATE_PREAUTHORIZED;
  const actionButtons = isDataAvailable && isPreauthorizedState
    ? <div className={css.actionButtons}>
        <SecondaryButton
          className={css.rejectButton}
          onClick={() => onRejectSale(currentTransaction.id)}
        >
          <FormattedMessage id="SalePage.rejectButton" />
        </SecondaryButton>
        <PrimaryButton
          className={css.acceptButton}
          onClick={() => onAcceptSale(currentTransaction.id)}
        >
          <FormattedMessage id="SalePage.acceptButton" />
        </PrimaryButton>
      </div>
    : null;

  return (
    <PageLayout
      title={intl.formatMessage({ id: 'SalePage.title' }, { title: listingTitle })}
      scrollingDisabled={scrollingDisabled}
    >
      <Topbar
        isAuthenticated={isAuthenticated}
        authInProgress={authInProgress}
        currentUser={currentUser}
        currentUserHasListings={currentUserHasListings}
        notificationCount={notificationCount}
        history={history}
        location={location}
        onLogout={onLogout}
        onManageDisableScrolling={onManageDisableScrolling}
      />
      <div className={css.root}>
        {panel}
        {actionButtons}
      </div>
    </PageLayout>
  );
};

SalePageComponent.defaultProps = {
  currentUser: null,
  fetchSaleError: null,
  notificationCount: 0,
  transaction: null,
};

const { bool, func, instanceOf, number, oneOf, shape, string } = PropTypes;

SalePageComponent.propTypes = {
  authInProgress: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentUserHasListings: bool.isRequired,
  fetchSaleError: instanceOf(Error),
  intl: intlShape.isRequired,
  isAuthenticated: bool.isRequired,
  notificationCount: number,
  onAcceptSale: func.isRequired,
  onLogout: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  onRejectSale: func.isRequired,
  params: shape({ id: string }).isRequired,
  scrollingDisabled: bool.isRequired,
  tab: oneOf(['details', 'discussion']).isRequired,
  transaction: propTypes.transaction,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => {
  const { fetchSaleError, transactionRef } = state.SalePage;
  const { isAuthenticated } = state.Auth;
  const {
    currentUser,
    currentUserHasListings,
    currentUserNotificationCount: notificationCount,
  } = state.user;

  const transactions = getMarketplaceEntities(state, transactionRef ? [transactionRef] : []);
  const transaction = transactions.length > 0 ? transactions[0] : null;

  return {
    transaction,
    fetchSaleError,
    isAuthenticated,
    authInProgress: authenticationInProgress(state),
    currentUser,
    currentUserHasListings,
    notificationCount,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAcceptSale: transactionId => dispatch(acceptSale(transactionId)),
    onRejectSale: transactionId => dispatch(rejectSale(transactionId)),
    onLogout: historyPush => dispatch(logout(historyPush)),
    onManageDisableScrolling: (componentId, disableScrolling) =>
      dispatch(manageDisableScrolling(componentId, disableScrolling)),
  };
};

const SalePage = compose(connect(mapStateToProps, mapDispatchToProps), withRouter, injectIntl)(
  SalePageComponent
);

SalePage.loadData = loadData;

export default SalePage;
