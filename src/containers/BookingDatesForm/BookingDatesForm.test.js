import React from 'react';
import { types } from '../../util/sdkLoader';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl, fakeFormProps } from '../../util/test-data';
import { BookingDatesFormComponent } from './BookingDatesForm';

const noop = () => null;

describe('BookingDatesForm', () => {
  it('matches snapshot without selected dates', () => {
    const tree = renderShallow(
      <BookingDatesFormComponent
        {...fakeFormProps}
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        price={new types.Money(1099, 'USD')}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it('matches snapshot with selected dates', () => {
    const tree = renderShallow(
      <BookingDatesFormComponent
        {...fakeFormProps}
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        price={new types.Money(1099, 'USD')}
        bookingStart={new Date(Date.UTC(2017, 3, 14))}
        bookingEnd={new Date(Date.UTC(2017, 3, 16))}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
