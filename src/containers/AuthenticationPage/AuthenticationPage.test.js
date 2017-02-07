import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import AuthenticationPage from './AuthenticationPage';

describe('AuthenticationPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<AuthenticationPage location={{ state: { from: '/protected' } }} />);
    expect(tree).toMatchSnapshot();
  });
});
