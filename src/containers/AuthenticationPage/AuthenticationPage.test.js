import React from 'react';
import { renderTree } from '../../util/test-helpers';
import AuthenticationPage from './AuthenticationPage';

describe('AuthenticationPage', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<AuthenticationPage location={{ state: { from: '/protected' } }} />);
    expect(tree).toMatchSnapshot();
  });
});
