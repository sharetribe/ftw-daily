import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import ChangeAccountPasswordForm from './ChangeAccountPasswordForm';

describe('ChangeAccountPasswordForm', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <TestProvider>
        <ChangeAccountPasswordForm />
      </TestProvider>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
