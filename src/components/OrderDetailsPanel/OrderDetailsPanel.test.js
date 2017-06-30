import React from 'react';
import { shallow } from 'enzyme';
import { types } from '../../util/sdkLoader';
import { createBooking, createListing, createUser, createTransaction } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { BookingBreakdown } from '../../components';
import OrderDetailsPanel from './OrderDetailsPanel.js';

describe('OrderDetailsPanel', () => {
  it('matches snapshot', () => {
    const { Money } = types;
    const tx = createTransaction({
      id: 'order-tx',
      state: 'state/preauthorized',
      total: new Money(16500, 'USD'),
      booking: createBooking(
        'booking1',
        new Date(Date.UTC(2017, 5, 10)),
        new Date(Date.UTC(2017, 5, 13))
      ),
      listing: createListing('listing1'),
      provider: createUser('provider'),
      customer: createUser('customer'),
    });
    const tree = renderShallow(<OrderDetailsPanel transaction={tx} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correct total price', () => {
    const { Money } = types;
    const tx = createTransaction({
      id: 'order-tx',
      state: 'state/preauthorized',
      total: new Money(16500, 'USD'),
      booking: createBooking(
        'booking1',
        new Date(Date.UTC(2017, 5, 10)),
        new Date(Date.UTC(2017, 5, 13))
      ),
      listing: createListing('listing1'),
      provider: createUser('provider'),
      customer: createUser('customer'),
    });
    const panel = shallow(<OrderDetailsPanel transaction={tx} />);
    const breakdownProps = panel.find(BookingBreakdown).props();
    expect(breakdownProps.payinTotal).toEqual(new Money(16500, 'USD'));
  });
});
