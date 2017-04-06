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
        bookingStart={new Date('Fri, 14 Apr 2017 GMT')}
        bookingEnd={new Date('Sun, 16 Apr 2017 GMT')}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
