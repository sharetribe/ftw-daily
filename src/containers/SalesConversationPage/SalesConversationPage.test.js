import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import SalesConversationPage from './SalesConversationPage';

describe('SalesConversationPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<SalesConversationPage params={{ id: 12345 }} />);
    expect(tree).toMatchSnapshot();
  });
});
