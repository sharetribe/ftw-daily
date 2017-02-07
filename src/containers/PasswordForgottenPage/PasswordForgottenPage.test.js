import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import PasswordForgottenPage from './PasswordForgottenPage';

describe('PasswordForgottenPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<PasswordForgottenPage />);
    expect(tree).toMatchSnapshot();
  });
});
