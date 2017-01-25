import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import CheckoutPage from './CheckoutPage';

describe('CheckoutPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <TestProvider>
          <CheckoutPage params={{ listingId: 'some-listing-id' }} />
        </TestProvider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
