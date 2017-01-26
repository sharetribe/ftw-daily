import React from 'react';
import renderer from 'react-test-renderer';
import { TestProvider } from '../../util/test-helpers';
import OrderDetailsPanel from './OrderDetailsPanel.js';
import { RoutesProvider } from '../../components';
import routesConfiguration from '../../routesConfiguration';

describe('OrderDetailsPanel', () => {
  it('matches snapshot', () => {
    const props = {
      orderId: 'some-test-order-id',
      title: 'Test order',
      imageUrl: 'http://example.com/img',
      info: {
        pricePerDay: '10$',
        bookingPeriod: 'some booking period',
        bookingDuration: 'some booking duration',
        total: '100$',
      },
      contact: {
        addressLine1: 'Some road 1',
        addressLine2: 'Some city, somewhere',
        phoneNumber: 'Some phone number',
      },
      confirmationCode: 'some-test-confirmation-code',
    };
    const component = renderer.create(
      (
        <TestProvider>
          <RoutesProvider routes={routesConfiguration}>
            <OrderDetailsPanel {...props} />
          </RoutesProvider>
        </TestProvider>
      ),
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
