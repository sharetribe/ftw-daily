import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import ChangePasswordForm from './ChangePasswordForm';

describe('ChangePasswordForm', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <TestProvider>
          <ChangePasswordForm />
        </TestProvider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
