import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import CheckoutPage from './CheckoutPage';

describe('CheckoutPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(<CheckoutPage params={{ listingId: 'some-listing-id' }} />);
    expect(tree).toMatchSnapshot();
  });
});
