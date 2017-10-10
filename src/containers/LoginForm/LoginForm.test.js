import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(<LoginForm />);
    expect(tree).toMatchSnapshot();
  });
});
