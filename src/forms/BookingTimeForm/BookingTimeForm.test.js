import React from 'react';
import { shallow } from 'enzyme';
import Decimal from 'decimal.js';
import { types as sdkTypes } from '../../util/sdkLoader';
import { calculateQuantityFromHours } from '../../util/dates';
import { renderShallow, renderDeep } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { LINE_ITEM_UNITS, TIME_SLOT_TIME } from '../../util/types';
import { BookingBreakdown } from '../../components';
import { BookingTimeFormComponent } from './BookingTimeForm';
import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe';

const { UUID, Money } = sdkTypes;

const noop = () => null;

const startDateInputProps = {
  name: 'bookingStartDate',
  useMobileMargins: false,
  id: `EmptyDateInputForm.bookingStartDate`,
  label: 'Start Date',
  placeholderText: 'Start date',
  format: v => v,
};

const endDateInputProps = {
  name: 'bookingEndDate',
  useMobileMargins: false,
  id: `EmptyDateInputForm.bookingEndDate`,
  label: 'End Date',
  placeholderText: 'End date',
  format: v => v,
};

const startTimeInputProps = {
  id: `EmptyDateInputForm.bookingStartDate`,
  name: 'bookingStartTime',
  label: 'Start Time',
};
const endTimeInputProps = {
  id: `EmptyDateInputForm.bookingEndDate`,
  name: 'bookingEndTime',
  label: 'End Time',
};

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
];

const monthlyTimeSlots = {
  '2019-10': {
    timeSlots,
    fetchTimeSlotsError: null,
    fetchTimeSlotsInProgress: null,
  },
};

describe('BookingTimeForm', () => {
  it('matches snapshot without selected dates', () => {
    const tree = renderShallow(
      <BookingTimeFormComponent
        unitType={LINE_ITEM_UNITS}
        price={new Money(1234, 'USD')}
        startDateInputProps={startDateInputProps}
        endDateInputProps={endDateInputProps}
        startTimeInputProps={startTimeInputProps}
        endTimeInputProps={endTimeInputProps}
        timeZone="Etc/UTC"
        monthlyTimeSlots={monthlyTimeSlots}
        initialValues={{ bookingStartDate: { date: new Date('2019-10-14T00:00:00Z') } }}
        onChange={noop}
        onSubmit={noop}
        onFetchTimeSlots={noop}
        intl={fakeIntl}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});

describe('EstimatedBreakdownMaybe', () => {
  it('renders nothing if missing start and end date', () => {
    const data = {
      unitType: LINE_ITEM_UNITS,
      unitPrice: new Money(1234, 'USD'),
      quantity: 1,
    };
    expect(renderDeep(<EstimatedBreakdownMaybe bookingData={data} />)).toBeFalsy();
  });
  it('renders nothing if missing end date', () => {
    const data = {
      unitType: LINE_ITEM_UNITS,
      unitPrice: new Money(1234, 'USD'),
      startDate: new Date(),
    };
    expect(renderDeep(<EstimatedBreakdownMaybe bookingData={data} />)).toBeFalsy();
  });
  it('renders breakdown with correct transaction data', () => {
    const unitPrice = new Money(1099, 'USD');
    const startDate = new Date(2017, 3, 16, 12, 0, 0);
    const endDate = new Date(2017, 3, 16, 14, 0, 0);
    const data = {
      unitType: LINE_ITEM_UNITS,
      unitPrice,
      startDate,
      endDate,
      // Calculate the quantity as hours between the booking start and booking end
      quantity: calculateQuantityFromHours(startDate, endDate),
      timeZone: 'UTC/Etc',
    };
    const tree = shallow(<EstimatedBreakdownMaybe bookingData={data} />);
    const breakdown = tree.find(BookingBreakdown);
    const { userRole, unitType, transaction, booking } = breakdown.props();

    expect(userRole).toEqual('customer');
    expect(unitType).toEqual(LINE_ITEM_UNITS);

    expect(booking.attributes.start).toEqual(startDate);
    expect(booking.attributes.end).toEqual(endDate);

    expect(transaction.attributes.payinTotal).toEqual(new Money(2198, 'USD'));
    expect(transaction.attributes.payoutTotal).toEqual(new Money(2198, 'USD'));
    expect(transaction.attributes.lineItems).toEqual([
      {
        code: 'line-item/units',
        includeFor: ['customer', 'provider'],
        unitPrice,
        quantity: new Decimal(2),
        lineTotal: new Money(2198, 'USD'),
        reversal: false,
      },
    ]);
  });
});
