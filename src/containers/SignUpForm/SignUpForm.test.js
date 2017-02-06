import React from 'react';
import { renderTree } from '../../util/test-helpers';
import SignUpForm from './SignUpForm';

describe('SignUpForm', () => {
  it('matches snapshot', () => {
    const tree = renderTree(<SignUpForm />);
    expect(tree).toMatchSnapshot();
  });
});
