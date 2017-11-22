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

export const Empty = {
  component: ActivityFeed,
  props: {
    messages: [],
    currentUser: null,
    transaction: null,
    customer: null,
    provider: null,
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
    currentUser: null,
  },
  group: 'messages',
};

export const WithCurrentUser = {
  component: ActivityFeed,
  props: {
    messages: [
      createMessage('msg1', {}, { sender: createUser('user1') }),
      createMessage('msg2', {}, { sender: createUser('user2') }),
      createMessage('msg3', { content: 'ok' }, { sender: createUser('user2') }),
      createMessage('msg4', { content: 'ok' }, { sender: createUser('user1') }),
      createMessage('msg5', {}, { sender: createUser('user1') }),
    ],
    currentUser: createCurrentUser('user2'),
  },
  group: 'messages',
};

export const WithTransitions = {
  component: ActivityFeed,
  props: {
    messages: [],
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
    currentUser: createCurrentUser('user2'),
  },
  group: 'messages',
};

export const WithMessagesAndTransitions = {
  component: ActivityFeed,
  props: {
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
    currentUser: createCurrentUser('user2'),
  },
  group: 'messages',
};
