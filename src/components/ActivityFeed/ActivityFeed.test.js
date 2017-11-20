import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { fakeIntl, createUser, createCurrentUser, createMessage } from '../../util/test-data';
import { MessagesComponent } from './Messages';

describe('Messages', () => {
  it('matches snapshot', () => {
    const props = {
      messages: [
        createMessage('msg1', {}, { sender: createUser('user1') }),
        createMessage('msg2', {}, { sender: createUser('user2') }),
      ],
      currentUser: createCurrentUser('user2'),
      intl: fakeIntl,
    };
    const tree = renderDeep(<MessagesComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
