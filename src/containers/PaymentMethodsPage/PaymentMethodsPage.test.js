import React from 'react';
import { BrowserRouter } from 'react-router';
import renderer from 'react-test-renderer';
import PaymentMethodsPage from './PaymentMethodsPage';

describe('PaymentMethodsPage', () => {
  it('matches snapshot', () => {
    const component = renderer.create(
      (
        <BrowserRouter>
          <PaymentMethodsPage />
        </BrowserRouter>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
