import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import {
  fakeIntl,
  createUser,
  createCurrentUser,
  createMessage,
  createTransaction,
} from '../../util/test-data';
import { ActivityFeedComponent } from './ActivityFeed';

const noop = () => null;

describe('ActivityFeed', () => {
  it('matches snapshot', () => {
    const props = {
      currentUser: createCurrentUser('user2'),
      transaction: createTransaction('tx1'),
      messages: [
        createMessage('msg1', {}, { sender: createUser('user1') }),
        createMessage('msg2', {}, { sender: createUser('user2') }),
      ],
      hasOlderMessages: false,
      onOpenReviewModal: noop,
      onShowOlderMessages: noop,
      fetchMessagesInProgress: false,
      intl: fakeIntl,
    };
    const tree = renderDeep(<ActivityFeedComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
