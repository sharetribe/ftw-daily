import React from 'react';
import { shallow } from 'enzyme';
import { types } from '../../util/sdkLoader';
import { createBooking, createListing, createUser, createTransaction } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { BookingBreakdown } from '../../components';
import { OrderDetailsPanelComponent } from './OrderDetailsPanel.js';

describe('OrderDetailsPanel', () => {
  it('matches snapshot', () => {
    const { Money } = types;
    const tx = createTransaction({
      id: 'order-tx',
      state: 'state/preauthorized',
      total: new Money(16500, 'USD'),
      booking: createBooking('booking1', {
        start: new Date(Date.UTC(2017, 5, 10)),
        end: new Date(Date.UTC(2017, 5, 13)),
      }),
      listing: createListing('listing1'),
      provider: createUser('provider'),
      customer: createUser('customer'),
    });
    const tree = renderShallow(<OrderDetailsPanelComponent transaction={tx} intl={fakeIntl} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correct total price', () => {
    const { Money } = types;
    const tx = createTransaction({
      id: 'order-tx',
      state: 'state/preauthorized',
      total: new Money(16500, 'USD'),
      booking: createBooking('booking1', {
        start: new Date(Date.UTC(2017, 5, 10)),
        end: new Date(Date.UTC(2017, 5, 13)),
      }),
      listing: createListing('listing1'),
      provider: createUser('provider'),
      customer: createUser('customer'),
    });
    const panel = shallow(<OrderDetailsPanelComponent transaction={tx} intl={fakeIntl} />);
    const breakdownProps = panel.find(BookingBreakdown).props();
    expect(breakdownProps.transaction.attributes.payinTotal).toEqual(new Money(16500, 'USD'));
  });
});
