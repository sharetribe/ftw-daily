import React from 'react';
import { shallow } from 'enzyme';
import { types } from '../../util/sdkLoader';
import { createTransaction, createBooking, createListing, createUser } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import * as propTypes from '../../util/propTypes';
import { BookingBreakdown } from '../../components';
import { SaleDetailsPanelComponent } from './SaleDetailsPanel.js';

const noop = () => null;

const { Money } = types;

const baseTxAttrs = {
  total: new Money(16500, 'USD'),
  commission: new Money(1000, 'USD'),
  booking: createBooking('booking1', {
    start: new Date(Date.UTC(2017, 5, 10)),
    end: new Date(Date.UTC(2017, 5, 13)),
  }),
  listing: createListing('listing1'),
  customer: createUser('customer1'),
  lastTransitionedAt: new Date(Date.UTC(2017, 5, 10)),
};
const txPreauthorized = createTransaction({
  id: 'sale-preauthorized',
  lastTransition: propTypes.TX_TRANSITION_PREAUTHORIZE,
  ...baseTxAttrs,
});

const txAccepted = createTransaction({
  id: 'sale-accepted',
  lastTransition: propTypes.TX_TRANSITION_ACCEPT,
  ...baseTxAttrs,
});

const txRejected = createTransaction({
  id: 'sale-rejected',
  lastTransition: propTypes.TX_TRANSITION_REJECT,
  ...baseTxAttrs,
});

const txAutoRejected = createTransaction({
  id: 'sale-autorejected',
  lastTransition: propTypes.TX_TRANSITION_AUTO_REJECT,
  ...baseTxAttrs,
});

const txDelivered = createTransaction({
  id: 'sale-delivered',
  lastTransition: propTypes.TX_TRANSITION_MARK_DELIVERED,
  ...baseTxAttrs,
});

describe('SaleDetailsPanel', () => {
  it('preauthorized matches snapshot', () => {
    const props = {
      transaction: txPreauthorized,
      onAcceptSale: noop,
      onRejectSale: noop,
      acceptInProgress: false,
      rejectInProgress: false,
      intl: fakeIntl,
    };
    const tree = renderShallow(<SaleDetailsPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('accepted matches snapshot', () => {
    const props = {
      transaction: txAccepted,
      onAcceptSale: noop,
      onRejectSale: noop,
      acceptInProgress: false,
      rejectInProgress: false,
      intl: fakeIntl,
    };
    const tree = renderShallow(<SaleDetailsPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('rejected matches snapshot', () => {
    const props = {
      transaction: txRejected,
      onAcceptSale: noop,
      onRejectSale: noop,
      acceptInProgress: false,
      rejectInProgress: false,
      intl: fakeIntl,
    };
    const tree = renderShallow(<SaleDetailsPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('autorejected matches snapshot', () => {
    const props = {
      transaction: txAutoRejected,
      onAcceptSale: noop,
      onRejectSale: noop,
      acceptInProgress: false,
      rejectInProgress: false,
      intl: fakeIntl,
    };
    const tree = renderShallow(<SaleDetailsPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('delivered matches snapshot', () => {
    const props = {
      transaction: txDelivered,
      onAcceptSale: noop,
      onRejectSale: noop,
      acceptInProgress: false,
      rejectInProgress: false,
      intl: fakeIntl,
    };
    const tree = renderShallow(<SaleDetailsPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correct total price', () => {
    const transaction = createTransaction({
      id: 'sale-tx',
      lastTransition: propTypes.TX_TRANSITION_PREAUTHORIZE,
      total: new Money(16500, 'USD'),
      commission: new Money(1000, 'USD'),
      booking: createBooking('booking1', {
        start: new Date(Date.UTC(2017, 5, 10)),
        end: new Date(Date.UTC(2017, 5, 13)),
      }),
      listing: createListing('listing1'),
      customer: createUser('customer1'),
      lastTransitionedAt: new Date(Date.UTC(2017, 5, 10)),
    });
    const props = {
      transaction,
      onAcceptSale: noop,
      onRejectSale: noop,
      acceptInProgress: false,
      rejectInProgress: false,
      intl: fakeIntl,
    };
    const panel = shallow(<SaleDetailsPanelComponent {...props} />);
    const breakdownProps = panel.find(BookingBreakdown).props();

    // Total price for the provider should be transaction total minus the commission.
    expect(breakdownProps.transaction.attributes.payoutTotal).toEqual(new Money(15500, 'USD'));
  });
});
