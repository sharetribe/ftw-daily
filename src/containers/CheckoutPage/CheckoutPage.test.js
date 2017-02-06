import React from 'react';
import { renderTree } from '../../util/test-helpers';
import CheckoutPage from './CheckoutPage';
import { RoutesProvider } from '../../components';
import routesConfiguration from '../../routesConfiguration';

describe('CheckoutPage', () => {
  it('matches snapshot', () => {
    const tree = renderTree(
      <RoutesProvider routes={routesConfiguration}>
        <CheckoutPage params={{ listingId: 'some-listing-id' }} />
      </RoutesProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
