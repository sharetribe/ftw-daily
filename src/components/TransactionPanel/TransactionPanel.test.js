import React from 'react';
import { shallow } from 'enzyme';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  createTxTransition,
  createTransaction,
  createBooking,
  createListing,
  createUser,
  createCurrentUser,
  createMessage,
} from '../../util/test-data';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import {
  TRANSITION_ACCEPT,
  TRANSITION_CANCELED,
  TRANSITION_COMPLETE,
  TRANSITION_DECLINE,
  TRANSITION_ENQUIRE,
  TRANSITION_EXPIRE,
  TRANSITION_REQUEST_PAYMENT,
  TRANSITION_CONFIRM_PAYMENT,
} from '../../util/transaction';
import BreakdownMaybe from './BreakdownMaybe';
import { TransactionPanelComponent } from './TransactionPanel';

const noop = () => null;

const { Money } = sdkTypes;

describe('TransactionPanel - Sale', () => {
  const providerId = 'provider';
  const customerId = 'customer';
  const start = new Date(Date.UTC(2017, 5, 10));
  const end = new Date(Date.UTC(2017, 5, 13));

  const baseTxAttrs = {
    total: new Money(16500, 'USD'),
    commission: new Money(1000, 'USD'),
    booking: createBooking('booking1', {
      start,
      end,
      displayStart: start,
      displayEnd: end,
    }),
    listing: createListing('listing1'),
    customer: createUser(customerId),
    provider: createUser(providerId),
    lastTransitionedAt: new Date(Date.UTC(2017, 5, 10)),
  };

  const txEnquired = createTransaction({
    id: 'sale-enquired',
    lastTransition: TRANSITION_ENQUIRE,
    ...baseTxAttrs,
  });

  const txPreauthorized = createTransaction({
    id: 'sale-preauthorized',
    lastTransition: TRANSITION_REQUEST_PAYMENT,
    ...baseTxAttrs,
  });

  const txAccepted = createTransaction({
    id: 'sale-accepted',
    lastTransition: TRANSITION_ACCEPT,
    ...baseTxAttrs,
  });

  const txDeclined = createTransaction({
    id: 'sale-declined',
    lastTransition: TRANSITION_DECLINE,
    ...baseTxAttrs,
  });

  const txAutoDeclined = createTransaction({
    id: 'sale-autodeclined',
    lastTransition: TRANSITION_EXPIRE,
    ...baseTxAttrs,
  });

  const txCanceled = createTransaction({
    id: 'sale-canceled',
    lastTransition: TRANSITION_CANCELED,
    ...baseTxAttrs,
  });

  const txDelivered = createTransaction({
    id: 'sale-delivered',
    lastTransition: TRANSITION_COMPLETE,
    transitions: [
      createTxTransition({
        createdAt: new Date(Date.UTC(2017, 4, 1)),
        by: 'customer',
        transition: TRANSITION_REQUEST_PAYMENT,
      }),
      createTxTransition({
        createdAt: new Date(Date.UTC(2017, 5, 1)),
        by: 'provider',
        transition: TRANSITION_ACCEPT,
      }),
      createTxTransition({
        createdAt: new Date(Date.UTC(2017, 6, 1)),
        by: 'system',
        transition: TRANSITION_COMPLETE,
      }),
    ],
    ...baseTxAttrs,
  });

  const panelBaseProps = {
    onAcceptSale: noop,
    onDeclineSale: noop,
    acceptInProgress: false,
    declineInProgress: false,
    currentUser: createCurrentUser(providerId),
    totalMessages: 2,
    totalMessagePages: 1,
    oldestMessagePageFetched: 1,
    messages: [
      createMessage('msg1', {}, { sender: createUser(customerId) }),
      createMessage('msg2', {}, { sender: createUser(providerId) }),
    ],
    initialMessageFailed: false,
    fetchMessagesInProgress: false,
    sendMessageInProgress: false,
    sendReviewInProgress: false,
    onManageDisableScrolling: noop,
    onOpenReviewModal: noop,
    onShowMoreMessages: noop,
    onSendMessage: noop,
    onSendReview: noop,
    onResetForm: noop,
    onSubmitBookingRequest: noop,
    onFetchTransactionLineItems: noop,
    fetchLineItemsInProgress: false,
    intl: fakeIntl,
  };

  it('enquired matches snapshot', () => {
    const props = {
      ...panelBaseProps,
      transaction: txEnquired,
    };
    const tree = renderShallow(<TransactionPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('preauthorized matches snapshot', () => {
    const props = {
      ...panelBaseProps,
      transaction: txPreauthorized,
    };
    const tree = renderShallow(<TransactionPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('accepted matches snapshot', () => {
    const props = {
      ...panelBaseProps,
      transaction: txAccepted,
    };
    const tree = renderShallow(<TransactionPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('declined matches snapshot', () => {
    const props = {
      ...panelBaseProps,
      transaction: txDeclined,
    };
    const tree = renderShallow(<TransactionPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('autodeclined matches snapshot', () => {
    const props = {
      ...panelBaseProps,
      transaction: txAutoDeclined,
    };
    const tree = renderShallow(<TransactionPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('canceled matches snapshot', () => {
    const props = {
      ...panelBaseProps,
      transaction: txCanceled,
    };
    const tree = renderShallow(<TransactionPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('delivered matches snapshot', () => {
    const props = {
      ...panelBaseProps,
      transaction: txDelivered,
    };
    const tree = renderShallow(<TransactionPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correct total price', () => {
    const start = new Date(Date.UTC(2017, 5, 10));
    const end = new Date(Date.UTC(2017, 5, 13));

    const transaction = createTransaction({
      id: 'sale-tx',
      lastTransition: TRANSITION_REQUEST_PAYMENT,
      total: new Money(16500, 'USD'),
      commission: new Money(1000, 'USD'),
      booking: createBooking('booking1', {
        start,
        end,
        displayStart: start,
        displayEnd: end,
      }),
      listing: createListing('listing1'),
      customer: createUser('customer1'),
      provider: createUser('provider1'),
      lastTransitionedAt: new Date(Date.UTC(2017, 5, 10)),
    });
    const props = {
      ...panelBaseProps,
      transaction,
    };
    const panel = shallow(<TransactionPanelComponent {...props} />);
    const breakdownProps = panel
      .find(BreakdownMaybe)
      .first()
      .props();

    // Total price for the provider should be transaction total minus the commission.
    expect(breakdownProps.transaction.attributes.payoutTotal).toEqual(new Money(15500, 'USD'));
  });
});

describe('TransactionPanel - Order', () => {
  const providerId = 'provider';
  const customerId = 'customer';
  const start = new Date(Date.UTC(2017, 5, 10));
  const end = new Date(Date.UTC(2017, 5, 13));
  const baseTxAttrs = {
    total: new Money(16500, 'USD'),
    booking: createBooking('booking1', {
      start,
      end,
      displayStart: start,
      displayEnd: end,
    }),
    listing: createListing('listing1'),
    provider: createUser(providerId),
    customer: createUser(customerId),
  };

  const txEnquired = createTransaction({
    id: 'order-enquired',
    lastTransition: TRANSITION_ENQUIRE,
    ...baseTxAttrs,
  });

  const txPreauthorized = createTransaction({
    id: 'order-preauthorized',
    lastTransition: TRANSITION_CONFIRM_PAYMENT,
    ...baseTxAttrs,
  });

  const txAccepted = createTransaction({
    id: 'order-accepted',
    lastTransition: TRANSITION_ACCEPT,
    ...baseTxAttrs,
  });

  const txDeclined = createTransaction({
    id: 'order-declined',
    lastTransition: TRANSITION_DECLINE,
    ...baseTxAttrs,
  });

  const txAutoDeclined = createTransaction({
    id: 'order-autodeclined',
    lastTransition: TRANSITION_EXPIRE,
    ...baseTxAttrs,
  });

  const txCanceled = createTransaction({
    id: 'order-canceled',
    lastTransition: TRANSITION_CANCELED,
    ...baseTxAttrs,
  });

  const txDelivered = createTransaction({
    id: 'order-delivered',
    lastTransition: TRANSITION_COMPLETE,
    transitions: [
      createTxTransition({
        createdAt: new Date(Date.UTC(2017, 4, 1)),
        by: 'customer',
        transition: TRANSITION_REQUEST_PAYMENT,
      }),
      createTxTransition({
        createdAt: new Date(Date.UTC(2017, 4, 1, 0, 0, 1)),
        by: 'customer',
        transition: TRANSITION_CONFIRM_PAYMENT,
      }),
      createTxTransition({
        createdAt: new Date(Date.UTC(2017, 5, 1)),
        by: 'provider',
        transition: TRANSITION_ACCEPT,
      }),
      createTxTransition({
        createdAt: new Date(Date.UTC(2017, 6, 1)),
        by: 'system',
        transition: TRANSITION_COMPLETE,
      }),
    ],
    ...baseTxAttrs,
  });

  const panelBaseProps = {
    intl: fakeIntl,
    currentUser: createCurrentUser(customerId),
    totalMessages: 2,
    totalMessagePages: 1,
    oldestMessagePageFetched: 1,
    messages: [
      createMessage('msg1', {}, { sender: createUser(customerId) }),
      createMessage('msg2', {}, { sender: createUser(providerId) }),
    ],
    initialMessageFailed: false,
    fetchMessagesInProgress: false,
    sendMessageInProgress: false,
    sendReviewInProgress: false,
    onManageDisableScrolling: noop,
    onOpenReviewModal: noop,
    onShowMoreMessages: noop,
    onSendMessage: noop,
    onSendReview: noop,
    onResetForm: noop,
    onAcceptSale: noop,
    onDeclineSale: noop,
    acceptInProgress: false,
    declineInProgress: false,
    onSubmitBookingRequest: noop,
    onFetchTransactionLineItems: noop,
    fetchLineItemsInProgress: false,
  };

  it('enquired matches snapshot', () => {
    const props = {
      ...panelBaseProps,
      transaction: txEnquired,
    };

    const tree = renderShallow(<TransactionPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('preauthorized matches snapshot', () => {
    const props = {
      ...panelBaseProps,
      transaction: txPreauthorized,
    };

    const tree = renderShallow(<TransactionPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('accepted matches snapshot', () => {
    const props = {
      ...panelBaseProps,
      transaction: txAccepted,
    };
    const tree = renderShallow(<TransactionPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('declined matches snapshot', () => {
    const props = {
      ...panelBaseProps,
      transaction: txDeclined,
    };
    const tree = renderShallow(<TransactionPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('autodeclined matches snapshot', () => {
    const props = {
      ...panelBaseProps,
      transaction: txAutoDeclined,
    };
    const tree = renderShallow(<TransactionPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('canceled matches snapshot', () => {
    const props = {
      ...panelBaseProps,
      transaction: txCanceled,
    };
    const tree = renderShallow(<TransactionPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('delivered matches snapshot', () => {
    const props = {
      ...panelBaseProps,
      transaction: txDelivered,
    };
    const tree = renderShallow(<TransactionPanelComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('renders correct total price', () => {
    const start = new Date(Date.UTC(2017, 5, 10));
    const end = new Date(Date.UTC(2017, 5, 13));
    const tx = createTransaction({
      id: 'order-tx',
      lastTransition: TRANSITION_REQUEST_PAYMENT,
      total: new Money(16500, 'USD'),
      booking: createBooking('booking1', {
        start,
        end,
        displayStart: start,
        displayEnd: end,
      }),
      listing: createListing('listing1'),
      provider: createUser(providerId),
      customer: createUser(customerId),
    });
    const props = {
      ...panelBaseProps,
      transaction: tx,
    };
    const panel = shallow(<TransactionPanelComponent {...props} />);
    const breakdownProps = panel
      .find(BreakdownMaybe)
      .first()
      .props();
    expect(breakdownProps.transaction.attributes.payinTotal).toEqual(new Money(16500, 'USD'));
  });
});
