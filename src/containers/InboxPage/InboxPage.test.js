import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import InboxPage from './InboxPage';

describe('InboxPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<InboxPage filter="inbox" />);
    expect(tree).toMatchSnapshot();
  });
});
