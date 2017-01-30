import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import ManageListingsPage from './ManageListingsPage';

describe('ManageListingsPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <TestProvider>
        <ManageListingsPage />
      </TestProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
