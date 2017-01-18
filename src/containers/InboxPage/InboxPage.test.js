import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import InboxPage from './InboxPage';

describe('InboxPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <BrowserRouter>
          <InboxPage filter='inbox' />
        </BrowserRouter>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
