import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import ProfilePage from './ProfilePage';

describe('ProfilePage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <BrowserRouter>
          <ProfilePage params={{ displayName: 'most-awesome-shop' }} />
        </BrowserRouter>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
