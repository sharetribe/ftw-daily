import React from 'react';
import { renderTree } from '../../util/test-helpers';
import SalesConversationPage from './SalesConversationPage';

describe('SalesConversationPage', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<SalesConversationPage params={{ id: 12345 }} />);
    expect(tree).toMatchSnapshot();
  });
});
