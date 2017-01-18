import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import ConversationPage from './ConversationPage';

describe('ConversationPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <ConversationPage params={{ id: 'some-conversation-id' }} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
