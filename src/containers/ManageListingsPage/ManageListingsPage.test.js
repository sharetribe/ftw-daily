import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import ManageListingsPage from './ManageListingsPage';

describe('ManageListingsPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<ManageListingsPage />);
    expect(tree).toMatchSnapshot();
  });
});
