import React, { Component } from 'react';
import {
  createUser,
  createCurrentUser,
  createMessage,
  createTransaction,
  createListing,
  createTxTransition,
} from '../../util/test-data';
import * as propTypes from '../../util/propTypes';
import ActivityFeed from './ActivityFeed';

const noop = () => null;

export const Empty = {
  component: ActivityFeed,
  props: {
    messages: [],
    hasOlderMessages: false,
    onShowOlderMessages: noop,
  },
  group: 'messages',
};

export const WithoutCurrentUser = {
  component: ActivityFeed,
  props: {
    messages: [
      createMessage('msg1', {}, { sender: createUser('user1') }),
      createMessage('msg2', {}, { sender: createUser('user2') }),
    ],
    hasOlderMessages: false,
    onShowOlderMessages: noop,
  },
  group: 'messages',
};

export const WithCurrentUser = {
  component: ActivityFeed,
  props: {
    currentUser: createCurrentUser('user2'),
    messages: [
      createMessage('msg1', {}, { sender: createUser('user1') }),
      createMessage('msg2', {}, { sender: createUser('user2') }),
      createMessage('msg3', { content: 'ok' }, { sender: createUser('user2') }),
      createMessage('msg4', { content: 'ok' }, { sender: createUser('user1') }),
      createMessage('msg5', {}, { sender: createUser('user1') }),
    ],
    hasOlderMessages: false,
    onShowOlderMessages: noop,
  },
  group: 'messages',
};

export const WithTransitions = {
  component: ActivityFeed,
  props: {
    currentUser: createCurrentUser('user2'),
    transaction: createTransaction({
      customer: createUser('user1'),
      provider: createUser('user2'),
      listing: createListing('Listing'),
      transitions: [
        createTxTransition({
          at: new Date(Date.UTC(2017, 10, 9, 8, 10)),
          by: propTypes.TX_TRANSITION_ACTOR_CUSTOMER,
          transition: propTypes.TX_TRANSITION_PREAUTHORIZE,
        }),
        createTxTransition({
          at: new Date(Date.UTC(2017, 10, 9, 8, 12)),
          by: propTypes.TX_TRANSITION_ACTOR_PROVIDER,
          transition: propTypes.TX_TRANSITION_ACCEPT,
        }),
      ],
    }),
    messages: [],
    hasOlderMessages: false,
    onShowOlderMessages: noop,
  },
  group: 'messages',
};

export const WithMessagesAndTransitions = {
  component: ActivityFeed,
  props: {
    currentUser: createCurrentUser('user2'),
    transaction: createTransaction({
      customer: createUser('user1'),
      provider: createUser('user2'),
      listing: createListing('Listing'),
      transitions: [
        createTxTransition({
          at: new Date(Date.UTC(2017, 10, 9, 8, 10)),
          by: propTypes.TX_TRANSITION_ACTOR_CUSTOMER,
          transition: propTypes.TX_TRANSITION_PREAUTHORIZE,
        }),
        createTxTransition({
          at: new Date(Date.UTC(2017, 10, 9, 8, 12)),
          by: propTypes.TX_TRANSITION_ACTOR_PROVIDER,
          transition: propTypes.TX_TRANSITION_ACCEPT,
        }),
        createTxTransition({
          at: new Date(Date.UTC(2017, 10, 9, 10, 33)),
          by: propTypes.TX_TRANSITION_ACTOR_PROVIDER,
          transition: propTypes.TX_TRANSITION_DECLINE,
        }),
        createTxTransition({
          at: new Date(Date.UTC(2017, 10, 9, 10, 34)),
          by: propTypes.TX_TRANSITION_ACTOR_PROVIDER,
          transition: propTypes.TX_TRANSITION_MARK_DELIVERED,
        }),
      ],
    }),
    messages: [
      createMessage(
        'msg1',
        { at: new Date(Date.UTC(2017, 10, 9, 8, 11)) },
        { sender: createUser('user1') }
      ),
      createMessage(
        'msg2',
        { at: new Date(Date.UTC(2017, 10, 9, 8, 14)) },
        { sender: createUser('user1') }
      ),
      createMessage(
        'msg3',
        { at: new Date(Date.UTC(2017, 10, 9, 8, 17)) },
        { sender: createUser('user2') }
      ),
      createMessage(
        'msg4',
        { at: new Date(Date.UTC(2017, 10, 12, 13, 20)) },
        { sender: createUser('user2') }
      ),
    ],
    hasOlderMessages: false,
    onShowOlderMessages: noop,
  },
  group: 'messages',
};

class PagedFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { showAllMessages: false };
  }
  render() {
    const dates = [
      new Date(Date.UTC(2017, 10, 20, 12)),
      new Date(Date.UTC(2017, 10, 21, 12)),
      new Date(Date.UTC(2017, 10, 22, 12)),
      new Date(Date.UTC(2017, 10, 23, 12)),
      new Date(Date.UTC(2017, 10, 24, 12)),
      new Date(Date.UTC(2017, 10, 25, 12)),
      new Date(Date.UTC(2017, 10, 26, 12)),
    ];

    const currentUser = createCurrentUser('customer');
    const customer = createUser('customer');
    const provider = createUser('provider');

    const trans1 = createTxTransition({
      at: dates[0],
      by: propTypes.TX_TRANSITION_ACTOR_CUSTOMER,
      transition: propTypes.TX_TRANSITION_PREAUTHORIZE,
    });
    const trans2 = createTxTransition({
      at: dates[2],
      by: propTypes.TX_TRANSITION_ACTOR_PROVIDER,
      transition: propTypes.TX_TRANSITION_ACCEPT,
    });

    // Last transition timestamp is interleaved between the last two
    // messages.
    const trans3 = createTxTransition({
      at: dates[5],
      by: propTypes.TX_TRANSITION_ACTOR_CUSTOMER,
      transition: propTypes.TX_TRANSITION_MARK_DELIVERED,
    });

    // First message timestamp is interleaved between the first two
    // transitions.
    const msg1 = createMessage('msg1', { at: dates[1] }, { sender: customer });

    const msg2 = createMessage('msg2', { at: dates[3] }, { sender: provider });
    const msg3 = createMessage('msg3', { at: dates[4] }, { sender: customer });
    const msg4 = createMessage('msg4', { at: dates[6] }, { sender: customer });

    const transaction = createTransaction({
      id: 'tx1',
      lastTransition: propTypes.TX_TRANSITION_MARK_DELIVERED,
      lastTransitionedAt: dates[5],
      transitions: [trans1, trans2, trans3],
      listing: createListing('listing'),
      customer,
      provider,
    });
    const messages = this.state.showAllMessages ? [msg1, msg2, msg3, msg4] : [msg2, msg3, msg4];

    const handleShowOlder = () => {
      console.log('show older messages');
      this.setState({ showAllMessages: true });
    };

    const feedProps = {
      currentUser,
      transaction,
      messages,
      hasOlderMessages: !this.state.showAllMessages,
      onShowOlderMessages: handleShowOlder,
    };
    return <ActivityFeed {...feedProps} />;
  }
}

export const WithMessagePaging = {
  component: PagedFeed,
  props: {},
  group: 'messages',
};
