import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { CheckoutPageComponent } from './CheckoutPage';

const noop = () => null;

describe('CheckoutPage', () => {
  it('matches snapshot', () => {
    const props = {
      intl: fakeIntl,
      dispatch: noop,
      history: { push: noop },
      flattenedRoutes: [],
    };
    const tree = renderShallow(<CheckoutPageComponent {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
