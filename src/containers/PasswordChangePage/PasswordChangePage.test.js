import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import PasswordChangePage from './PasswordChangePage';

describe('PasswordChangePage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<PasswordChangePage />);
    expect(tree).toMatchSnapshot();
  });
});
