import React from 'react';
import { renderTree } from '../../util/test-helpers';
import PasswordChangePage from './PasswordChangePage';

describe('PasswordChangePage', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<PasswordChangePage />);
    expect(tree).toMatchSnapshot();
  });
});
