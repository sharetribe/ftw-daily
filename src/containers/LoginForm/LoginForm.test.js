import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <TestProvider>
        <LoginForm />
      </TestProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
