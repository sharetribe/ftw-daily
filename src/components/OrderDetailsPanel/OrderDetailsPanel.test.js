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

const txDeclined = createTransaction({
  id: 'order-declined',
  lastTransition: propTypes.TX_TRANSITION_DECLINE,
  ...baseTxAttrs,
});

const txAutoDeclined = createTransaction({
  id: 'order-autodeclined',
  lastTransition: propTypes.TX_TRANSITION_AUTO_DECLINE,
  ...baseTxAttrs,
});

const txCanceled = createTransaction({
  id: 'order-canceled',
  lastTransition: propTypes.TX_TRANSITION_CANCELED,
  ...baseTxAttrs,
});

const txDelivered = createTransaction({
  id: 'order-delivered',
  lastTransition: propTypes.TX_TRANSITION_MARK_DELIVERED,
  ...baseTxAttrs,
});

describe('OrderDetailsPanel', () => {
  const panelBaseProps = {
    intl: fakeIntl,
    messages: [],
    initialMessageFailed: false,
  };

  it('preauthorized matches snapshot', () => {
    const tree = renderShallow(
      <OrderDetailsPanelComponent transaction={txPreauthorized} {...panelBaseProps} />
    );
    expect(tree).toMatchSnapshot();
  });
  it('accepted matches snapshot', () => {
    const tree = renderShallow(
      <OrderDetailsPanelComponent transaction={txAccepted} {...panelBaseProps} />
    );
    expect(tree).toMatchSnapshot();
  });
  it('declined matches snapshot', () => {
    const tree = renderShallow(
      <OrderDetailsPanelComponent transaction={txDeclined} {...panelBaseProps} />
    );
    expect(tree).toMatchSnapshot();
  });
  it('autodeclined matches snapshot', () => {
    const tree = renderShallow(
      <OrderDetailsPanelComponent transaction={txAutoDeclined} {...panelBaseProps} />
    );
    expect(tree).toMatchSnapshot();
  });
  it('canceled matches snapshot', () => {
    const tree = renderShallow(
      <OrderDetailsPanelComponent transaction={txCanceled} {...panelBaseProps} />
    );
    expect(tree).toMatchSnapshot();
  });
  it('delivered matches snapshot', () => {
    const tree = renderShallow(
      <OrderDetailsPanelComponent transaction={txDelivered} {...panelBaseProps} />
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
    const panel = shallow(<OrderDetailsPanelComponent transaction={tx} {...panelBaseProps} />);
    const breakdownProps = panel.find(BookingBreakdown).props();
    expect(breakdownProps.transaction.attributes.payinTotal).toEqual(new Money(16500, 'USD'));
  });
});
