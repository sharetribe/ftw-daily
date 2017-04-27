import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import * as propTypes from '../../util/propTypes';
import { ensureBooking, ensureListing, ensureTransaction, ensureUser } from '../../util/data';
import { SaleDetailsPanel, PageLayout } from '../../components';
import { getEntities } from '../../ducks/sdk.duck';
import { loadData } from './SalePage.duck';

import css from './SalePage.css';

// SalePage handles data loading
// It show loading data text or SaleDetailsPanel (and later also another panel for messages).
export const SalePageComponent = props => {
  const { intl, transaction } = props;
  const currentTransaction = ensureTransaction(transaction);
  const currentListing = ensureListing(currentTransaction.listing);
  const title = currentListing.attributes.title;

  const detailsProps = {
    subtotalPrice: currentTransaction.attributes.total,
    commission: currentTransaction.attributes.commission,
    saleState: currentTransaction.attributes.state,
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

  return (
    <PageLayout title={intl.formatMessage({ id: 'SalePage.title' }, { title })}>
      {panel}
    </PageLayout>
  );
};

SalePageComponent.defaultProps = { transaction: null };

const { oneOf } = PropTypes;

SalePageComponent.propTypes = {
  intl: intlShape.isRequired,
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

const SalePage = connect(mapStateToProps)(injectIntl(SalePageComponent));

SalePage.loadData = params => {
  return loadData(params);
};

export default SalePage;
