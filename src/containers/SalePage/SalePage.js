import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import * as propTypes from '../../util/propTypes';
import { ensureListing, ensureUser, ensureTransaction } from '../../util/data';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { acceptSale, declineSale, loadData } from './SalePage.duck';
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

  // We need to know if the customer is in pending state -
  // to show action buttons bar and reserve space below footer.
  // (accept reject buttons are position: fixed on mobile layout)
  const currentCustomer = ensureUser(currentTransaction.customer);
  const customerLoaded = !!currentCustomer.id;
  const isCustomerBanned = customerLoaded || currentCustomer.attributes.banned;
  const isPending = propTypes.txIsPreauthorized(currentTransaction) && !isCustomerBanned;

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
      logoutError={logoutError}
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
        <LayoutWrapperFooter className={classNames({ [css.footerWrapper]: isPending })}>
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
  logoutError: null,
  transaction: null,
};

const { bool, func, oneOf, shape, string } = PropTypes;

SalePageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  fetchSaleError: propTypes.error,
  acceptSaleError: propTypes.error,
  declineSaleError: propTypes.error,
  acceptInProgress: bool.isRequired,
  declineInProgress: bool.isRequired,
  intl: intlShape.isRequired,
  logoutError: propTypes.error,
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
  const { logoutError } = state.Auth;
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
