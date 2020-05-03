// NOTE: renderdeep doesn't work due to map integration
import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { EditListingHomeFormComponent } from './EditListingHomeForm';

const noop = () => null;

describe('EditListingHomeForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <EditListingHomeFormComponent
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        saveActionMsg="Save rules"
        updated={false}
        updateInProgress={false}
        availability={{
          calendar: {
            // '2018-12': {
            //   bookings: [],
            //   exceptions: [],
            //   fetchExceptionsError: null,
            //   fetchExceptionsInProgress: false,
            //   fetchBookingsError: null,
            //   fetchBookingsInProgress: false,
            // },
          },
          onCreateAvailabilityException: noop,
          onDeleteAvailabilityException: noop,
          onFetchAvailabilityExceptions: noop,
          onFetchBookings: noop,
        }}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
