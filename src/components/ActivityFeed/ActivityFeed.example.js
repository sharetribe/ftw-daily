import React, { Component } from 'react';
import {
  createUser,
  createCurrentUser,
  createMessage,
  createTransaction,
  createListing,
  createTxTransition,
  createReview,
} from '../../util/test-data';
import {
  TRANSITION_ACCEPT,
  TRANSITION_COMPLETE,
  TRANSITION_DECLINE,
  TRANSITION_EXPIRE_REVIEW_PERIOD,
  TRANSITION_REQUEST,
  TX_TRANSITION_ACTOR_CUSTOMER,
  TX_TRANSITION_ACTOR_PROVIDER,
  TX_TRANSITION_REVIEW_BY_CUSTOMER_FIRST,
  TX_TRANSITION_REVIEW_BY_CUSTOMER_SECOND,
  TX_TRANSITION_REVIEW_BY_PROVIDER_FIRST,
  TX_TRANSITION_REVIEW_BY_PROVIDER_SECOND,
} from '../../util/types';
import ActivityFeed from './ActivityFeed';

const noop = () => null;

export const Empty = {
  component: ActivityFeed,
  props: {
    messages: [],
    hasOlderMessages: false,
    onOpenReviewModal: noop,
    onShowOlderMessages: noop,
    fetchMessagesInProgress: false,
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
    onOpenReviewModal: noop,
    onShowOlderMessages: noop,
    fetchMessagesInProgress: false,
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
    onOpenReviewModal: noop,
    onShowOlderMessages: noop,
    fetchMessagesInProgress: false,
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
          by: TX_TRANSITION_ACTOR_CUSTOMER,
          transition: TRANSITION_REQUEST,
        }),
        createTxTransition({
          at: new Date(Date.UTC(2017, 10, 9, 8, 12)),
          by: TX_TRANSITION_ACTOR_PROVIDER,
          transition: TRANSITION_ACCEPT,
        }),
        // this should not be visible in the feed
        createTxTransition({
          at: new Date(Date.UTC(2017, 10, 16, 8, 12)),
          by: TX_TRANSITION_ACTOR_PROVIDER,
          transition: TRANSITION_EXPIRE_REVIEW_PERIOD,
        }),
      ],
    }),
    messages: [],
    hasOlderMessages: false,
    onOpenReviewModal: noop,
    onShowOlderMessages: noop,
    fetchMessagesInProgress: false,
  },
  group: 'messages',
};

export const WithMessagesTransitionsAndReviews = {
  component: ActivityFeed,
  props: {
    currentUser: createCurrentUser('user2'),
    transaction: createTransaction({
      customer: createUser('user1'),
      provider: createUser('user2'),
      listing: createListing('Listing'),
      lastTransition: TX_TRANSITION_REVIEW_BY_CUSTOMER_SECOND,
      transitions: [
        createTxTransition({
          at: new Date(Date.UTC(2017, 10, 9, 8, 10)),
          by: TX_TRANSITION_ACTOR_CUSTOMER,
          transition: TRANSITION_REQUEST,
        }),
        createTxTransition({
          at: new Date(Date.UTC(2017, 10, 9, 8, 12)),
          by: TX_TRANSITION_ACTOR_PROVIDER,
          transition: TRANSITION_ACCEPT,
        }),
        createTxTransition({
          at: new Date(Date.UTC(2017, 10, 9, 10, 33)),
          by: TX_TRANSITION_ACTOR_PROVIDER,
          transition: TRANSITION_DECLINE,
        }),
        createTxTransition({
          at: new Date(Date.UTC(2017, 10, 9, 10, 34)),
          by: TX_TRANSITION_ACTOR_PROVIDER,
          transition: TRANSITION_COMPLETE,
        }),
        createTxTransition({
          at: new Date(Date.UTC(2017, 10, 9, 11, 34)),
          by: TX_TRANSITION_ACTOR_PROVIDER,
          transition: TX_TRANSITION_REVIEW_BY_PROVIDER_FIRST,
        }),
        createTxTransition({
          at: new Date(Date.UTC(2017, 10, 9, 12, 34)),
          by: TX_TRANSITION_ACTOR_CUSTOMER,
          transition: TX_TRANSITION_REVIEW_BY_CUSTOMER_SECOND,
        }),
      ],
      reviews: [
        createReview(
          'review1',
          { at: new Date(Date.UTC(2017, 10, 9, 11, 34)), rating: 3, type: 'ofCustomer' },
          { author: createUser('user2'), subject: createUser('user1') }
        ),
        createReview(
          'review2',
          { at: new Date(Date.UTC(2017, 10, 9, 12, 34)), rating: 5, type: 'ofProvider' },
          { author: createUser('user1'), subject: createUser('user2') }
        ),
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
    onOpenReviewModal: noop,
    onShowOlderMessages: noop,
    fetchMessagesInProgress: false,
  },
  group: 'messages',
};

export const WithAReviewFromBothUsers = {
  component: ActivityFeed,
  props: {
    currentUser: createCurrentUser('user1'),
    transaction: createTransaction({
      customer: createUser('user1'),
      provider: createUser('user2'),
      listing: createListing('Listing'),
      reviews: [
        createReview(
          'review1',
          { at: new Date(Date.UTC(2017, 10, 9, 8, 10)), rating: 3, type: 'ofProvider' },
          { author: createUser('user1'), subject: createUser('user2') }
        ),
        createReview(
          'review2',
          { at: new Date(Date.UTC(2017, 10, 10, 8, 10)), rating: 5, type: 'ofCustomer' },
          { author: createUser('user2'), subject: createUser('user1') }
        ),
      ],
      lastTransition: TX_TRANSITION_REVIEW_BY_PROVIDER_SECOND,
      transitions: [
        createTxTransition({
          at: new Date(Date.UTC(2017, 10, 9, 8, 10)),
          by: TX_TRANSITION_ACTOR_CUSTOMER,
          transition: TX_TRANSITION_REVIEW_BY_CUSTOMER_FIRST,
        }),
        createTxTransition({
          at: new Date(Date.UTC(2017, 10, 10, 8, 10)),
          by: TX_TRANSITION_ACTOR_PROVIDER,
          transition: TX_TRANSITION_REVIEW_BY_PROVIDER_SECOND,
        }),
      ],
    }),
    messages: [],
    hasOlderMessages: false,
    onOpenReviewModal: noop,
    onShowOlderMessages: noop,
    fetchMessagesInProgress: false,
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
      by: TX_TRANSITION_ACTOR_CUSTOMER,
      transition: TRANSITION_REQUEST,
    });
    const trans2 = createTxTransition({
      at: dates[2],
      by: TX_TRANSITION_ACTOR_PROVIDER,
      transition: TRANSITION_ACCEPT,
    });

    // Last transition timestamp is interleaved between the last two
    // messages.
    const trans3 = createTxTransition({
      at: dates[5],
      by: TX_TRANSITION_ACTOR_CUSTOMER,
      transition: TRANSITION_COMPLETE,
    });

    // First message timestamp is interleaved between the first two
    // transitions.
    const msg1 = createMessage('msg1', { at: dates[1] }, { sender: customer });

    const msg2 = createMessage('msg2', { at: dates[3] }, { sender: provider });
    const msg3 = createMessage('msg3', { at: dates[4] }, { sender: customer });
    const msg4 = createMessage('msg4', { at: dates[6] }, { sender: customer });

    const transaction = createTransaction({
      id: 'tx1',
      lastTransition: TRANSITION_COMPLETE,
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
      onOpenReviewModal: noop,
      onShowOlderMessages: handleShowOlder,
      fetchMessagesInProgress: false,
    };
    return <ActivityFeed {...feedProps} />;
  }
}

export const WithMessagePaging = {
  component: PagedFeed,
  props: {},
  group: 'messages',
};
