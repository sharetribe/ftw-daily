import React from 'react';
import { fakeIntl } from '../../util/test-data';
import { renderDeep } from '../../util/test-helpers';
import { types } from '../../util/sdkLoader';
import BookingInfo from './BookingInfo';

describe('BookingInfo', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(
      <BookingInfo
        unitPrice={new types.Money(1000, 'USD')}
        bookingStart={new Date(Date.UTC(2017, 3, 14))}
        bookingEnd={new Date(Date.UTC(2017, 3, 16))}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
