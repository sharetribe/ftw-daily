import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import EditProfilePage from './EditProfilePage';

describe('EditProfilePage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <EditProfilePage params={{ displayName: 'my-shop' }} />
      </BrowserRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
