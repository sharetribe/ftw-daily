import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import * as propTypes from '../../util/propTypes';
import { ensureBooking, ensureListing, ensureTransaction, ensureUser } from '../../util/data';
import { Button, SaleDetailsPanel, PageLayout } from '../../components';
import { getEntities } from '../../ducks/sdk.duck';
import { acceptSale, loadData } from './SalePage.duck';

import css from './SalePage.css';

// SalePage handles data loading
// It show loading data text or SaleDetailsPanel (and later also another panel for messages).
export const SalePageComponent = props => {
  const { intl, onAcceptSale, transaction } = props;
  const currentTransaction = ensureTransaction(transaction);
  const currentListing = ensureListing(currentTransaction.listing);
  const title = currentListing.attributes.title;

  const detailsProps = {
    subtotalPrice: currentTransaction.attributes.total,
    commission: currentTransaction.attributes.commission,
    saleState: currentTransaction.attributes.state,
    lastTransitionedAt: currentTransaction.attributes.lastTransitionedAt,
    listing: currentListing,
    booking: ensureBooking(currentTransaction.booking),
    customer: ensureUser(currentTransaction.customer),
  };

  const detailsClassName = classNames(css.tabContent, {
    [css.tabContentVisible]: props.tab === 'details',
  });

  const panel = currentTransaction.id
    ? <SaleDetailsPanel className={detailsClassName} {...detailsProps} />
    : <h1 className={css.title}><FormattedMessage id="SalePage.loadingData" /></h1>;

  const actionButtons = currentTransaction.attributes.state === propTypes.TX_STATE_PREAUTHORIZED
    ? <div className={css.actionButtons}>
        <Button onClick={() => onAcceptSale(currentTransaction.id)}>
          <FormattedMessage id="SalePage.acceptButton" />
        </Button>
      </div>
    : null;

  return (
    <PageLayout title={intl.formatMessage({ id: 'SalePage.title' }, { title })}>
      {panel}
      {actionButtons}
    </PageLayout>
  );
};

SalePageComponent.defaultProps = { transaction: null };

const { func, oneOf } = PropTypes;

SalePageComponent.propTypes = {
  intl: intlShape.isRequired,
  onAcceptSale: func.isRequired,
  tab: oneOf(['details', 'discussion']).isRequired,
  transaction: propTypes.transaction,
};

const mapStateToProps = state => {
  const transactionRef = state.SalePage.transactionRef;
  const transactions = getEntities(state.data, transactionRef ? [transactionRef] : []);
  const transaction = transactions.length > 0 ? transactions[0] : null;
  return {
    transaction,
    showSaleError: state.ListingPage.showListingError,
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAcceptSale: transactionId => dispatch(acceptSale(transactionId)),
  };
};

const SalePage = connect(mapStateToProps, mapDispatchToProps)(injectIntl(SalePageComponent));

SalePage.loadData = params => {
  return loadData(params);
};

export default SalePage;
