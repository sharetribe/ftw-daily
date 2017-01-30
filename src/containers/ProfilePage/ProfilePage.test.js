import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import ProfilePage from './ProfilePage';

describe('ProfilePage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <TestProvider>
        <ProfilePage params={{ displayName: 'most-awesome-shop' }} />
      </TestProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
