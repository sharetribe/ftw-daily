import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <TestProvider>
          <SignUpForm />
        </TestProvider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
