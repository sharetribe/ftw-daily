import React from 'react';
import { renderTree } from '../../util/test-helpers';
import InboxPage from './InboxPage';

describe('InboxPage', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<InboxPage filter="inbox" />);
    expect(tree).toMatchSnapshot();
  });
});
