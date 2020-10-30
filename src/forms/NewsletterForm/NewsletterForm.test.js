import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import NewsletterForm from './NewsletterForm';

const noop = () => null;

describe('NewsletterForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(<NewsletterForm intl={fakeIntl} onSubmit={noop} />);
    expect(tree).toMatchSnapshot();
  });
});
