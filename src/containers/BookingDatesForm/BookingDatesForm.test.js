// TODO: renderdeep doesn't work due to
// "Invariant Violation: getNodeFromInstance: Invalid argument."
// refs and findDOMNode are not supported by react-test-renderer
// (react-sortable-hoc uses them)
import React from 'react';
import { types } from '../../util/sdkLoader';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl, fakeFormProps } from '../../util/test-data';
import { BookingDatesFormComponent } from './BookingDatesForm';

const noop = () => null;

describe('EditListingForm', () => {
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
