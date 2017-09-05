import React from 'react';
import { shallow } from 'enzyme';
import { types } from '../../util/sdkLoader';
import { createTransaction, createBooking, createListing, createUser } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { BookingBreakdown } from '../../components';
import SaleDetailsPanel from './SaleDetailsPanel.js';

const noop = () => null;

describe('SaleDetailsPanel', () => {
  it('matches snapshot', () => {
    const { Money } = types;
    const transaction = createTransaction({
      id: 'sale-tx',
      state: 'state/preauthorized',
      total: new Money(16500, 'USD'),
      commission: new Money(1000, 'USD'),
      booking: createBooking(
        'booking1',
        new Date(Date.UTC(2017, 5, 10)),
        new Date(Date.UTC(2017, 5, 13))
      ),
      listing: createListing('listing1'),
      customer: createUser('customer1'),
      lastTransitionedAt: new Date(Date.UTC(2017, 5, 10)),
    });
    const props = {
      transaction,
      onAcceptSale: noop,
      onRejectSale: noop,
      acceptOrRejectInProgress: false,
    };
    const tree = renderShallow(<SaleDetailsPanel {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correct total price', () => {
    const { Money } = types;
    const transaction = createTransaction({
      id: 'sale-tx',
      state: 'state/preauthorized',
      total: new Money(16500, 'USD'),
      commission: new Money(1000, 'USD'),
      booking: createBooking(
        'booking1',
        new Date(Date.UTC(2017, 5, 10)),
        new Date(Date.UTC(2017, 5, 13))
      ),
      listing: createListing('listing1'),
      customer: createUser('customer1'),
      lastTransitionedAt: new Date(Date.UTC(2017, 5, 10)),
    });
    const props = {
      transaction,
      onAcceptSale: noop,
      onRejectSale: noop,
      acceptOrRejectInProgress: false,
    };
    const panel = shallow(<SaleDetailsPanel {...props} />);
    const breakdownProps = panel.find(BookingBreakdown).props();

    // Total price for the provider should be transaction total minus the commission.
    expect(breakdownProps.transaction.attributes.payoutTotal).toEqual(new Money(15500, 'USD'));
  });
});
