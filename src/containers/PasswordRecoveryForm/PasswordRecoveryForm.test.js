import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import PasswordRecoveryForm from './PasswordRecoveryForm';

describe('PasswordRecoveryForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(<PasswordRecoveryForm />);
    expect(tree).toMatchSnapshot();
  });
});
