import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import OrderDiscussionPanel from './OrderDiscussionPanel.js';

describe('OrderDiscussionPanel', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(<OrderDiscussionPanel />);
    expect(tree).toMatchSnapshot();
  });
});
