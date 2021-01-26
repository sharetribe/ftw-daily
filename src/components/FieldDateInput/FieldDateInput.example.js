/* eslint-disable no-console */
import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import moment from 'moment';
import { Button } from '../../components';
import { required, bookingDateRequired, composeValidators } from '../../util/validators';
import { createTimeSlots } from '../../util/test-data';
import FieldDateInput from './FieldDateInput';

const identity = v => v;

const createAvailableTimeSlots = (dayCount, availableDayCount) => {
  const slots = createTimeSlots(new Date(), dayCount);
  const availableSlotIndices = Array.from({ length: availableDayCount }, () =>
    Math.floor(Math.random() * dayCount)
  );

  return availableSlotIndices.sort().map(i => slots[i]);
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
        values,
      } = fieldRenderProps;
      const submitDisabled = pristine || submitting;
      if (values && values.bookingDates) {
        onChange(values.bookingDates);
      }

      return (
        <form
          style={style}
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <FormSpy onChange={onChange} />
          <FieldDateInput {...dateInputProps} />
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
      name: 'bookingDate',
      useMobileMargins: false,
      id: `EmptyDateInputForm.bookingDate`,
      label: 'Date',
      placeholderText: moment().format('ddd, MMMM D'),
      format: identity,
      validate: composeValidators(required('Required'), bookingDateRequired('Date is not valid')),
      onBlur: () => console.log('onBlur called from DateInput props.'),
      onFocus: () => console.log('onFocus called from DateInput props.'),
    },
    onChange: formState => {
      const { date } = formState.values;
      if (date) {
        console.log('Changed to', moment(date).format('L'));
      }
    },
    onSubmit: values => {
      console.log('Submitting a form with values:', values);
    },
  },
  group: 'custom inputs',
};

export const WithAvailableTimeSlots = {
  component: FormComponent,
  props: {
    dateInputProps: {
      name: 'bookingDate',
      useMobileMargins: false,
      id: `AvailableTimeSlotsDateInputForm.bookingDate`,
      label: 'Date',
      placeholderText: moment().format('ddd, MMMM D'),
      format: identity,
      timeSlots: createAvailableTimeSlots(90, 60),
      validate: composeValidators(required('Required'), bookingDateRequired('Date is not valid')),
      onBlur: () => console.log('onBlur called from DateInput props.'),
      onFocus: () => console.log('onFocus called from DateInput props.'),
    },
    onChange: formState => {
      const { date } = formState.values;
      if (date) {
        console.log('Changed to', moment(date).format('L'));
      }
    },
    onSubmit: values => {
      console.log('Submitting a form with values:', values);
    },
  },
  group: 'custom inputs',
};
