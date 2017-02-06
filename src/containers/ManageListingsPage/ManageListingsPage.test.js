import React from 'react';
import { renderTree } from '../../util/test-helpers';
import ManageListingsPage from './ManageListingsPage';

describe('ManageListingsPage', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<ManageListingsPage />);
    expect(tree).toMatchSnapshot();
  });
});
