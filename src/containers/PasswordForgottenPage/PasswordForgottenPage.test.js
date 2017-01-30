import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import PasswordForgottenPage from './PasswordForgottenPage';

describe('PasswordForgottenPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <TestProvider>
        <PasswordForgottenPage />
      </TestProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
