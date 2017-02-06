import React from 'react';
import { renderTree } from '../../util/test-helpers';
import ProfilePage from './ProfilePage';

describe('ProfilePage', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<ProfilePage params={{ displayName: 'most-awesome-shop' }} />);
    expect(tree).toMatchSnapshot();
  });
});
