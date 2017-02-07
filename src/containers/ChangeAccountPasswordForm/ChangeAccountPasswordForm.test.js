import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import ChangeAccountPasswordForm from './ChangeAccountPasswordForm';

describe('ChangeAccountPasswordForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(<ChangeAccountPasswordForm />);
    expect(tree).toMatchSnapshot();
  });
});
