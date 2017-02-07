import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import BookingInfo from './BookingInfo';

describe('BookingInfo', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(
      <BookingInfo
        pricePerDay="55\\u20AC"
        bookingPeriod="Jan 2nd - Jan 4th"
        bookingDuration="3 days"
        total="165\u20AC"
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
