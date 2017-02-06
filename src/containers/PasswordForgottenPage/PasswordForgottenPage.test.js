import React from 'react';
import { renderTree } from '../../util/test-helpers';
import PasswordForgottenPage from './PasswordForgottenPage';

describe('PasswordForgottenPage', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<PasswordForgottenPage />);
    expect(tree).toMatchSnapshot();
  });
});
