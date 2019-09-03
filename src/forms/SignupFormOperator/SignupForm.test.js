import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import SignupFormOperator from './SignupFormOperator';

const noop = () => null;

describe('SignupForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(
      <SignupFormOperator intl={fakeIntl} onOpenTermsOfService={noop} onSubmit={noop} />
    );
    expect(tree).toMatchSnapshot();
  });
});
