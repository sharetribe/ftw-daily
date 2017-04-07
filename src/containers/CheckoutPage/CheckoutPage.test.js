import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { CheckoutPageComponent } from './CheckoutPage';

describe('CheckoutPage', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <CheckoutPageComponent intl={fakeIntl}/>
    );
    expect(tree).toMatchSnapshot();
  });
});
