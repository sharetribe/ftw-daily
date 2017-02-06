import React from 'react';
import { renderTree } from '../../util/test-helpers';
import EditProfilePage from './EditProfilePage';

describe('EditProfilePage', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<EditProfilePage params={{ displayName: 'my-shop' }} />);
    expect(tree).toMatchSnapshot();
  });
});
