import React from 'react';
import { renderTree } from '../../util/test-helpers';
import ChangeAccountPasswordForm from './ChangeAccountPasswordForm';

describe('ChangeAccountPasswordForm', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<ChangeAccountPasswordForm />);
    expect(tree).toMatchSnapshot();
  });
});
