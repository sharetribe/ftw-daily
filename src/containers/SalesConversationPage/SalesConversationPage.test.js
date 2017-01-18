import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import SalesConversationPage from './SalesConversationPage';

describe('SalesConversationPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <SalesConversationPage params={{ id: 12345 }} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
