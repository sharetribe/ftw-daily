import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import ChangePasswordForm from './ChangePasswordForm';

describe('ChangePasswordForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(<ChangePasswordForm />);
    expect(tree).toMatchSnapshot();
  });
});
