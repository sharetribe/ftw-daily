import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import PasswordForgottenForm from './PasswordForgottenForm';

describe('PasswordForgottenForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(<PasswordForgottenForm />);
    expect(tree).toMatchSnapshot();
  });
});
