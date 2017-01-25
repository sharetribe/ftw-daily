import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import InboxPage from './InboxPage';

describe('InboxPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <TestProvider>
          <InboxPage filter="inbox" />
        </TestProvider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
