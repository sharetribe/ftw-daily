import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import EditProfilePage from './EditProfilePage';

describe('EditProfilePage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<EditProfilePage params={{ displayName: 'my-shop' }} />);
    expect(tree).toMatchSnapshot();
  });
});
