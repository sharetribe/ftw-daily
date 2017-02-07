import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(<SignUpForm />);
    expect(tree).toMatchSnapshot();
  });
});
