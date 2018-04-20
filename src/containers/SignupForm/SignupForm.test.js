import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import SignupForm from './SignupForm';

const noop = () => null;

describe('SignupForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(
      <SignupForm intl={fakeIntl} onOpenTermsOfService={noop} onSubmit={noop} />
    );
    expect(tree).toMatchSnapshot();
  });
});
