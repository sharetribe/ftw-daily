import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import ProfilePage from './ProfilePage';

describe('ProfilePage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<ProfilePage params={{ displayName: 'most-awesome-shop' }} />);
    expect(tree).toMatchSnapshot();
  });
});
