import React from 'react';
import { shallow } from 'enzyme';
import { types } from '../../util/sdkLoader';
import { createTransaction, createBooking, createListing, createUser } from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import {
  TX_TRANSITION_PREAUTHORIZE,
  TX_TRANSITION_REJECT,
  TX_TRANSITION_AUTO_REJECT,
} from '../../util/propTypes';
import { BookingBreakdown } from '../../components';
import { SaleDetailsPanelComponent } from './SaleDetailsPanel.js';

const noop = () => null;

describe('SaleDetailsPanel', () => {
  it('preauthorized matches snapshot', () => {
    const { Money } = types;
    const transaction = createTransaction({
      id: 'sale-tx',
      lastTransition: TX_TRANSITION_PREAUTHORIZE,
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
    const tree = renderShallow(<SaleDetailsPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('rejected matches snapshot', () => {
    const { Money } = types;
    const transaction = createTransaction({
      id: 'sale-tx',
      lastTransition: TX_TRANSITION_REJECT,
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
    const tree = renderShallow(<SaleDetailsPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('autorejected matches snapshot', () => {
    const { Money } = types;
    const transaction = createTransaction({
      id: 'sale-tx',
      lastTransition: TX_TRANSITION_AUTO_REJECT,
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
    const tree = renderShallow(<SaleDetailsPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correct total price', () => {
    const { Money } = types;
    const transaction = createTransaction({
      id: 'sale-tx',
      lastTransition: TX_TRANSITION_PREAUTHORIZE,
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
