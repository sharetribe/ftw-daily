import React from 'react';
import { shallow } from 'enzyme';
import { types } from '../../util/sdkLoader';
import { createBooking, createListing, createUser, createTransaction } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import * as propTypes from '../../util/propTypes';
import { BookingBreakdown } from '../../components';
import { OrderDetailsPanelComponent } from './OrderDetailsPanel.js';

const { Money } = types;

const baseTxAttrs = {
  total: new Money(16500, 'USD'),
  booking: createBooking('booking1', {
    start: new Date(Date.UTC(2017, 5, 10)),
    end: new Date(Date.UTC(2017, 5, 13)),
  }),
  listing: createListing('listing1'),
  provider: createUser('provider'),
  customer: createUser('customer'),
};

const txPreauthorized = createTransaction({
  id: 'order-preauthorized',
  lastTransition: propTypes.TX_TRANSITION_PREAUTHORIZE,
  ...baseTxAttrs,
});

const txAccepted = createTransaction({
  id: 'order-accepted',
  lastTransition: propTypes.TX_TRANSITION_ACCEPT,
  ...baseTxAttrs,
});

const txRejected = createTransaction({
  id: 'order-rejected',
  lastTransition: propTypes.TX_TRANSITION_REJECT,
  ...baseTxAttrs,
});

const txAutoRejected = createTransaction({
  id: 'order-autorejected',
  lastTransition: propTypes.TX_TRANSITION_AUTO_REJECT,
  ...baseTxAttrs,
});

const txDelivered = createTransaction({
  id: 'order-delivered',
  lastTransition: propTypes.TX_TRANSITION_MARK_DELIVERED,
  ...baseTxAttrs,
});

describe('OrderDetailsPanel', () => {
  it('preauthorized matches snapshot', () => {
    const tree = renderShallow(
      <OrderDetailsPanelComponent transaction={txPreauthorized} intl={fakeIntl} />
    );
    expect(tree).toMatchSnapshot();
  });
  it('accepted matches snapshot', () => {
    const tree = renderShallow(
      <OrderDetailsPanelComponent transaction={txAccepted} intl={fakeIntl} />
    );
    expect(tree).toMatchSnapshot();
  });
  it('rejected matches snapshot', () => {
    const tree = renderShallow(
      <OrderDetailsPanelComponent transaction={txRejected} intl={fakeIntl} />
    );
    expect(tree).toMatchSnapshot();
  });
  it('autorejected matches snapshot', () => {
    const tree = renderShallow(
      <OrderDetailsPanelComponent transaction={txAutoRejected} intl={fakeIntl} />
    );
    expect(tree).toMatchSnapshot();
  });
  it('delivered matches snapshot', () => {
    const tree = renderShallow(
      <OrderDetailsPanelComponent transaction={txDelivered} intl={fakeIntl} />
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders correct total price', () => {
    const { Money } = types;
    const tx = createTransaction({
      id: 'order-tx',
      lastTransition: propTypes.TX_TRANSITION_PREAUTHORIZE,
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
