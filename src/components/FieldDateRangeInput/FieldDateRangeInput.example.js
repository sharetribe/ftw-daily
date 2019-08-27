/* eslint-disable no-console */
import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import moment from 'moment';
import { Button } from '../../components';
import { required, bookingDatesRequired, composeValidators } from '../../util/validators';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';
import { createTimeSlots } from '../../util/test-data';
import FieldDateRangeInput from './FieldDateRangeInput';

const identity = v => v;

const createAvailableTimeSlots = (dayCount, availableDayCount) => {
  const slots = createTimeSlots(new Date(), dayCount);

  const availableSlotIndices = [];
  while (availableSlotIndices.length < availableDayCount) {
    const newIndex = Math.floor(Math.random() * dayCount);
    if (availableSlotIndices.indexOf(newIndex) > -1) continue;
    availableSlotIndices[availableSlotIndices.length] = newIndex;
  }

  return availableSlotIndices.sort((a, b) => a - b).map(i => slots[i]);
};

const FormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        style,
        form,
        handleSubmit,
        onChange,
        pristine,
        submitting,
        dateInputProps,
      } = fieldRenderProps;
      const submitDisabled = pristine || submitting;

      return (
        <form
          style={style}
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <FormSpy onChange={onChange} />
          <FieldDateRangeInput {...dateInputProps} />
          <Button type="submit" disabled={submitDisabled} style={{ marginTop: '24px' }}>
            Select
          </Button>
        </form>
      );
    }}
  />
);

export const Empty = {
  component: FormComponent,
  props: {
    style: { marginBottom: '140px' },
    dateInputProps: {
      name: 'bookingDates',
      unitType: LINE_ITEM_NIGHT,
      startDateId: 'EmptyDateRange.bookingStartDate',
      startDateLabel: 'Start date',
      startDatePlaceholderText: moment().format('ddd, MMMM D'),
      endDateId: 'EmptyDateRangeInputForm.bookingEndDate',
      endDateLabel: 'End date',
      endDatePlaceholderText: moment()
        .add(1, 'days')
        .format('ddd, MMMM D'),
      format: identity,
      validate: composeValidators(
        required('Required'),
        bookingDatesRequired('Start date is not valid', 'End date is not valid')
      ),
      onBlur: () => console.log('onBlur called from DateRangeInput props.'),
      onFocus: () => console.log('onFocus called from DateRangeInput props.'),
    },
    onChange: formState => {
      const { startDate, endDate } = formState.values;
      if (startDate || endDate) {
        console.log('Changed to', moment(startDate).format('L'), moment(endDate).format('L'));
      }
    },
    onSubmit: values => {
      console.log('Submitting a form with values:', values);
    },
  },
  group: 'custom inputs',
};

export const WithAvailableTimeSlotsNighlyBooking = {
  component: FormComponent,
  props: {
    style: { marginBottom: '140px' },
    dateInputProps: {
      name: 'bookingDates',
      unitType: LINE_ITEM_NIGHT,
      startDateId: 'WithAvailableTimeSlotsDateRangeNightly.bookingStartDate',
      startDateLabel: 'Start date',
      startDatePlaceholderText: moment().format('ddd, MMMM D'),
      endDateId: 'WithAvailableTimeSlotsDateRangeNightly.bookingEndDate',
      endDateLabel: 'End date',
      endDatePlaceholderText: moment()
        .add(1, 'days')
        .format('ddd, MMMM D'),
      format: identity,
      timeSlots: createAvailableTimeSlots(90, 60),
      validate: composeValidators(
        required('Required'),
        bookingDatesRequired('Start date is not valid', 'End date is not valid')
      ),
      onBlur: () => console.log('onBlur called from DateRangeInput props.'),
      onFocus: () => console.log('onFocus called from DateRangeInput props.'),
    },
    onChange: formState => {
      const { startDate, endDate } = formState.values;
      if (startDate || endDate) {
        console.log('Changed to', moment(startDate).format('L'), moment(endDate).format('L'));
      }
    },
    onSubmit: values => {
      console.log('Submitting a form with values:', values);
    },
  },
  group: 'custom inputs',
};

export const WithAvailableTimeSlotsDailyBooking = {
  component: FormComponent,
  props: {
    dateInputProps: {
      name: 'bookingDates',
      unitType: LINE_ITEM_DAY,
      startDateId: 'WithAvailableTimeSlotsDateRangeDaily.bookingStartDate',
      startDateLabel: 'Start date',
      startDatePlaceholderText: moment().format('ddd, MMMM D'),
      endDateId: 'WithAvailableTimeSlotsDateRangeDaily.bookingEndDate',
      endDateLabel: 'End date',
      endDatePlaceholderText: moment()
        .add(1, 'days')
        .format('ddd, MMMM D'),
      format: identity,
      timeSlots: createAvailableTimeSlots(90, 60),
      validate: composeValidators(
        required('Required'),
        bookingDatesRequired('Start date is not valid', 'End date is not valid')
      ),
      onBlur: () => console.log('onBlur called from DateRangeInput props.'),
      onFocus: () => console.log('onFocus called from DateRangeInput props.'),
    },
    onChange: formState => {
      const { startDate, endDate } = formState.values;
      if (startDate || endDate) {
        console.log('Changed to', moment(startDate).format('L'), moment(endDate).format('L'));
      }
    },
    onSubmit: values => {
      console.log('Submitting a form with values:', values);
    },
  },
  group: 'custom inputs',
};
