import { createUser, createCurrentUser, createMessage } from '../../util/test-data';
import Messages from './Messages';

export const Empty = {
  component: Messages,
  props: {
    messages: [],
    currentUser: null,
  },
  group: 'messages',
};

export const WithoutCurrentUser = {
  component: Messages,
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
  component: Messages,
  props: {
    messages: [
      createMessage('msg1', {}, { sender: createUser('user1') }),
      createMessage('msg2', {}, { sender: createUser('user2') }),
      createMessage('msg3', {}, { sender: createUser('user1') }),
    ],
    currentUser: createCurrentUser('user2'),
  },
  group: 'messages',
};
