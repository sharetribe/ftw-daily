import React from 'react';
import { renderTree } from '../../util/test-helpers';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<LoginForm />);
    expect(tree).toMatchSnapshot();
  });
});
