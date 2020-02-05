/* eslint-disable no-console */
import { types as sdkTypes } from '../../util/sdkLoader';
import { LINE_ITEM_UNITS, TIME_SLOT_TIME } from '../../util/types';
import BookingTimeForm from './BookingTimeForm';

const { UUID, Money } = sdkTypes;

const timeSlots = [
  {
    id: new UUID(1),
    type: 'timeSlot',
    attributes: {
      start: new Date('2019-10-14T09:00:00Z'),
      end: new Date('2019-10-14T10:00:00Z'),
      type: TIME_SLOT_TIME,
    },
  },
  {
    id: new UUID(2),
    type: 'timeSlot',
    attributes: {
      start: new Date('2019-10-14T16:00:00Z'),
      end: new Date('2019-10-14T20:00:00Z'),
      type: TIME_SLOT_TIME,
    },
  },
  {
    id: new UUID(3),
    type: 'timeSlot',
    attributes: {
      start: new Date('2019-10-20T09:00:00Z'),
      end: new Date('2019-10-22T18:00:00Z'),
      type: TIME_SLOT_TIME,
    },
  },
  {
    id: new UUID(4),
    type: 'timeSlot',
    attributes: {
      start: new Date('2019-10-17T09:00:00Z'),
      end: new Date('2019-10-17T18:00:00Z'),
      type: TIME_SLOT_TIME,
    },
  },
  {
    id: new UUID(5),
    type: 'timeSlot',
    attributes: {
      start: new Date('2019-10-28T09:00:00Z'),
      end: new Date('2019-11-03T18:00:00Z'),
      type: TIME_SLOT_TIME,
    },
  },
];

const monthlyTimeSlots = {
  '2019-10': {
    timeSlots,
    fetchTimeSlotsError: null,
    fetchTimeSlotsInProgress: null,
  },
};

const noop = () => null;

export const Form = {
  component: BookingTimeForm,
  props: {
    unitType: LINE_ITEM_UNITS,
    monthlyTimeSlots,
    startDatePlaceholder: new Date(2019, 9, 29).toString(),
    endDatePlaceholder: new Date(2019, 9, 29).toString(),
    initialValues: { bookingStartDate: { date: new Date(2019, 9, 29) } },
    onSubmit: values => {
      console.log('Submit BookingTimeForm with values:', values);
    },
    onFetchTimeSlots: noop,
    price: new Money(1099, 'USD'),
    timeZone: 'Etc/UTC',
  },
  group: 'forms',
};
