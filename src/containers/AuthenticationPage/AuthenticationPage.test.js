import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import AuthenticationPage from './AuthenticationPage';

describe('AuthenticationPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <TestProvider>
        <AuthenticationPage location={{ state: { from: '/protected' } }} />
      </TestProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
