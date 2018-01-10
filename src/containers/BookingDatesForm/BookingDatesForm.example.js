/* eslint-disable no-console */
import { types } from '../../util/sdkLoader';
import * as propTypes from '../../util/propTypes';
import BookingDatesForm from './BookingDatesForm';

export const Form = {
  component: BookingDatesForm,
  props: {
    unitType: propTypes.LINE_ITEM_NIGHT,
    onSubmit: values => {
      console.log('Submit BookingDatesForm with values:', values);
    },
    price: new types.Money(1099, 'USD'),
  },
  group: 'forms',
};
