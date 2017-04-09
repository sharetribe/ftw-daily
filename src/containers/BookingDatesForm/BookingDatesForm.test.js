import React from 'react';
import { types } from '../../util/sdkLoader';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl, fakeFormProps } from '../../util/test-data';
import { BookingDatesFormComponent } from './BookingDatesForm';

const noop = () => null;

describe('BookingDatesForm', () => {
  it('matches snapshot', () => {
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
});
