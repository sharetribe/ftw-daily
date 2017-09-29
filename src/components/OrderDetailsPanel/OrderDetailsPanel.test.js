import React from 'react';
import { shallow } from 'enzyme';
import { types } from '../../util/sdkLoader';
import { createBooking, createListing, createUser, createTransaction } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import {
  TX_TRANSITION_PREAUTHORIZE,
  TX_TRANSITION_REJECT,
  TX_TRANSITION_AUTO_REJECT,
} from '../../util/propTypes';
import { BookingBreakdown } from '../../components';
import { OrderDetailsPanelComponent } from './OrderDetailsPanel.js';

describe('OrderDetailsPanel', () => {
  it('preauthorized matches snapshot', () => {
    const { Money } = types;
    const tx = createTransaction({
      id: 'order-tx',
      lastTransition: TX_TRANSITION_PREAUTHORIZE,
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
  it('rejected matches snapshot', () => {
    const { Money } = types;
    const tx = createTransaction({
      id: 'order-rejected',
      lastTransition: TX_TRANSITION_REJECT,
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
  it('autorejected matches snapshot', () => {
    const { Money } = types;
    const tx = createTransaction({
      id: 'order-autorejected',
      lastTransition: TX_TRANSITION_AUTO_REJECT,
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
      lastTransition: TX_TRANSITION_PREAUTHORIZE,
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
