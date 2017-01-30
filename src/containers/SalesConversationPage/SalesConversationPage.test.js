import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import SalesConversationPage from './SalesConversationPage';

describe('SalesConversationPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <TestProvider>
        <SalesConversationPage params={{ id: 12345 }} />
      </TestProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
