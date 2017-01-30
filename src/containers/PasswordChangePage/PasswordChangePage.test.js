import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import PasswordChangePage from './PasswordChangePage';

describe('PasswordChangePage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <TestProvider>
        <PasswordChangePage />
      </TestProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
