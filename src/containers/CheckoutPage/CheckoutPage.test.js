import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import CheckoutPage from './CheckoutPage';

describe('CheckoutPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <CheckoutPage params={{ listingId: 'some-listing-id' }} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
