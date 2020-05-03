/* eslint-disable no-console */
import EditListingHomeForm from './EditListingHomeForm';

export const Empty = {
  component: EditListingHomeForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditListingHomeForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save rules',
    updated: false,
    updateInProgress: false,
    availability: {
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
      onCreateAvailabilityException: () => console.log('onCreateHomeException called'),
      onDeleteAvailabilityException: () => console.log('onDeleteHomeException called'),
      onFetchAvailabilityExceptions: () => console.log('onFetchHomeExceptions called'),
      onFetchBookings: () => console.log('onFetchBookings called'),
    },
  },
  group: 'forms',
};
