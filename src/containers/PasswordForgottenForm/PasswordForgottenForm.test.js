import React from 'react';
import { renderTree } from '../../util/test-helpers';
import PasswordForgottenForm from './PasswordForgottenForm';

describe('PasswordForgottenForm', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<PasswordForgottenForm />);
    expect(tree).toMatchSnapshot();
  });
});
