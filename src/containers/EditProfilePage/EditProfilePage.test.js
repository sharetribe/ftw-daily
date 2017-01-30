import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import EditProfilePage from './EditProfilePage';

describe('EditProfilePage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <TestProvider>
        <EditProfilePage params={{ displayName: 'my-shop' }} />
      </TestProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
