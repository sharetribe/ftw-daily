import BookingTimeInfo from './BookingTimeInfo';
import {
  fakeIntl,
  createBooking,
  createTransaction,
  createUser,
  createListing,
} from '../../util/test-data';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, LINE_ITEM_UNITS } from '../../util/types';

export const DateAndTimeSingleDay = {
  component: BookingTimeInfo,
  props: {
    isOrder: true,
    intl: fakeIntl,
    tx: createTransaction({
      customer: createUser('user1'),
      provider: createUser('user2'),
      listing: createListing('Listing'),
      booking: createBooking('example-booking', {
        displayStart: new Date(Date.UTC(2019, 8, 30, 3, 0)),
        displayEnd: new Date(Date.UTC(2019, 8, 30, 4, 0)),
        start: new Date(Date.UTC(2019, 8, 30, 3, 0)),
        end: new Date(Date.UTC(2019, 8, 30, 4, 0)),
      }),
    }),
    unitType: LINE_ITEM_UNITS,
    dateType: 'datetime',
  },
  group: 'inbox',
};

export const DateAndTimeMultipleDays = {
  component: BookingTimeInfo,
  props: {
    isOrder: true,
    intl: fakeIntl,
    tx: createTransaction({
      customer: createUser('user1'),
      provider: createUser('user2'),
      listing: createListing('Listing'),
      booking: createBooking('example-booking', {
        displayStart: new Date(Date.UTC(2019, 8, 28, 3, 0)),
        displayEnd: new Date(Date.UTC(2019, 8, 30, 5, 0)),
        start: new Date(Date.UTC(2019, 8, 28, 3, 0)),
        end: new Date(Date.UTC(2019, 8, 30, 5, 0)),
      }),
    }),
    unitType: LINE_ITEM_UNITS,
    dateType: 'datetime',
  },
  group: 'inbox',
};

export const OnlyDateSingleDay = {
  component: BookingTimeInfo,
  props: {
    isOrder: true,
    intl: fakeIntl,
    tx: createTransaction({
      customer: createUser('user1'),
      provider: createUser('user2'),
      listing: createListing('Listing'),
      booking: createBooking('example-booking', {
        displayStart: new Date(Date.UTC(2019, 8, 29, 3, 0)),
        displayEnd: new Date(Date.UTC(2019, 8, 30, 4, 0)),
        start: new Date(Date.UTC(2019, 8, 29, 3, 0)),
        end: new Date(Date.UTC(2019, 8, 30, 4, 0)),
      }),
    }),
    unitType: LINE_ITEM_DAY,
    dateType: 'date',
  },
  group: 'inbox',
};

export const OnlyDateMultipleDays = {
  component: BookingTimeInfo,
  props: {
    isOrder: true,
    intl: fakeIntl,
    tx: createTransaction({
      customer: createUser('user1'),
      provider: createUser('user2'),
      listing: createListing('Listing'),
      booking: createBooking('example-booking', {
        displayStart: new Date(Date.UTC(2019, 8, 28, 3, 0)),
        displayEnd: new Date(Date.UTC(2019, 8, 30, 5, 0)),
        start: new Date(Date.UTC(2019, 8, 28, 3, 0)),
        end: new Date(Date.UTC(2019, 8, 30, 5, 0)),
      }),
    }),
    unitType: LINE_ITEM_DAY,
    dateType: 'date',
  },
  group: 'inbox',
};

export const OnlyDateSingleNight = {
  component: BookingTimeInfo,
  props: {
    isOrder: true,
    intl: fakeIntl,
    tx: createTransaction({
      customer: createUser('user1'),
      provider: createUser('user2'),
      listing: createListing('Listing'),
      booking: createBooking('example-booking', {
        displayStart: new Date(Date.UTC(2019, 8, 29, 3, 0)),
        displayEnd: new Date(Date.UTC(2019, 8, 30, 4, 0)),
        start: new Date(Date.UTC(2019, 8, 29, 3, 0)),
        end: new Date(Date.UTC(2019, 8, 30, 4, 0)),
      }),
    }),
    unitType: LINE_ITEM_NIGHT,
    dateType: 'date',
  },
  group: 'inbox',
};

export const OnlyDateMultipleNights = {
  component: BookingTimeInfo,
  props: {
    isOrder: true,
    intl: fakeIntl,
    tx: createTransaction({
      customer: createUser('user1'),
      provider: createUser('user2'),
      listing: createListing('Listing'),
      booking: createBooking('example-booking', {
        displayStart: new Date(Date.UTC(2019, 8, 28, 3, 0)),
        displayEnd: new Date(Date.UTC(2019, 8, 30, 5, 0)),
        start: new Date(Date.UTC(2019, 8, 28, 3, 0)),
        end: new Date(Date.UTC(2019, 8, 30, 5, 0)),
      }),
    }),
    unitType: LINE_ITEM_NIGHT,
    dateType: 'date',
  },
  group: 'inbox',
};
