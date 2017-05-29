/* eslint-disable no-console */
import { types } from '../../util/sdkLoader';
import BookingDatesForm from './BookingDatesForm';

export const Empty = {
  component: BookingDatesForm,
  props: {
    onSubmit: values => {
      console.log('Submit BookingDatesForm with values:', values);
    },
    price: new types.Money(1099, 'USD'),
  },
  group: 'forms',
};
