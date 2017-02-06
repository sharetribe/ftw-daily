import React from 'react';
import { renderTree } from '../../util/test-helpers';
import ChangePasswordForm from './ChangePasswordForm';

describe('ChangePasswordForm', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<ChangePasswordForm />);
    expect(tree).toMatchSnapshot();
  });
});
