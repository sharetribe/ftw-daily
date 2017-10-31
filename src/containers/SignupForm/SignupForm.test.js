import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import SignupForm from './SignupForm';

const noop = () => null;

describe('SignupForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(<SignupForm onOpenTermsOfService={noop} />);
    expect(tree).toMatchSnapshot();
  });
});
