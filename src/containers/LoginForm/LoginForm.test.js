import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import LoginForm from './LoginForm';

const noop = () => null;

describe('LoginForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(<LoginForm intl={fakeIntl} onSubmit={noop} />);
    expect(tree).toMatchSnapshot();
  });
});
