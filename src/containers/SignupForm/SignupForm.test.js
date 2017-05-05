import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import SignupForm from './SignupForm';

describe('SignupForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(<SignupForm />);
    expect(tree).toMatchSnapshot();
  });
});
