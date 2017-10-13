import React, { PropTypes } from 'react'; // eslint-disable-line react/no-deprecated
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { ensureListing, ensureTransaction } from '../../util/data';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { acceptSale, declineSale, loadData } from './SalePage.duck';
import { NamedRedirect, SaleDetailsPanel, Page } from '../../components';
import { TopbarContainer } from '../../containers';

import css from './SalePage.css';

// SalePage handles data loading
// It show loading data text or SaleDetailsPanel (and later also another panel for messages).
export const SalePageComponent = props => {
  const {
    authInfoError,
    currentUser,
    fetchSaleError,
    acceptSaleError,
    declineSaleError,
    acceptInProgress,
    declineInProgress,
    intl,
    logoutError,
    onAcceptSale,
    onDeclineSale,
    params,
    scrollingDisabled,
    transaction,
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
        transaction={currentTransaction}
        onAcceptSale={onAcceptSale}
        onDeclineSale={onDeclineSale}
        acceptInProgress={acceptInProgress}
        declineInProgress={declineInProgress}
        acceptSaleError={acceptSaleError}
        declineSaleError={declineSaleError}
      />
    ) : (
      loadingOrFailedFetching
    );

  return (
    <Page
      authInfoError={authInfoError}
      logoutError={logoutError}
      title={intl.formatMessage({ id: 'SalePage.title' }, { title: listingTitle })}
      scrollingDisabled={scrollingDisabled}
    >
      <TopbarContainer />
      <div className={css.root}>{panel}</div>
    </Page>
  );
};

SalePageComponent.defaultProps = {
  authInfoError: null,
  currentUser: null,
  fetchSaleError: null,
  acceptSaleError: null,
  declineSaleError: null,
  logoutError: null,
  transaction: null,
};

const { bool, func, instanceOf, oneOf, shape, string } = PropTypes;

SalePageComponent.propTypes = {
  authInfoError: instanceOf(Error),
  currentUser: propTypes.currentUser,
  fetchSaleError: instanceOf(Error),
  acceptSaleError: instanceOf(Error),
  declineSaleError: instanceOf(Error),
  acceptInProgress: bool.isRequired,
  declineInProgress: bool.isRequired,
  intl: intlShape.isRequired,
  logoutError: instanceOf(Error),
  onAcceptSale: func.isRequired,
  onDeclineSale: func.isRequired,
  params: shape({ id: string }).isRequired,
  scrollingDisabled: bool.isRequired,
  tab: oneOf(['details', 'discussion']).isRequired,
  transaction: propTypes.transaction,
};

const mapStateToProps = state => {
  const {
    fetchSaleError,
    acceptSaleError,
    declineSaleError,
    acceptInProgress,
    declineInProgress,
    transactionRef,
  } = state.SalePage;
  const { authInfoError, logoutError } = state.Auth;
  const { currentUser } = state.user;

  const transactions = getMarketplaceEntities(state, transactionRef ? [transactionRef] : []);
  const transaction = transactions.length > 0 ? transactions[0] : null;

  return {
    authInfoError,
    currentUser,
    fetchSaleError,
    acceptSaleError,
    declineSaleError,
    acceptInProgress,
    declineInProgress,
    logoutError,
    scrollingDisabled: isScrollingDisabled(state),
    transaction,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAcceptSale: transactionId => dispatch(acceptSale(transactionId)),
    onDeclineSale: transactionId => dispatch(declineSale(transactionId)),
  };
};

const SalePage = compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(
  SalePageComponent
);

SalePage.loadData = loadData;

export default SalePage;
