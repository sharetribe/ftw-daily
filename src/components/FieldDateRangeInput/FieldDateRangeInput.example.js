/* eslint-disable no-console */
import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import moment from 'moment';
import { Button } from '../../components';
import { required, bookingDatesRequired, composeValidators } from '../../util/validators';
import { LINE_ITEM_NIGHT } from '../../util/types';
import FieldDateRangeInput from './FieldDateRangeInput';

const FormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
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

const defaultFormName = 'FieldDateRangeInputExampleForm';

export const Empty = {
  component: FormComponent,
  props: {
    dateInputProps: {
      name: 'bookingDates',
      unitType: LINE_ITEM_NIGHT,
      startDateId: `${defaultFormName}.bookingStartDate`,
      startDateLabel: 'Start date',
      startDatePlaceholderText: moment().format('ddd, MMMM D'),
      endDateId: `${defaultFormName}.bookingEndDate`,
      endDateLabel: 'End date',
      endDatePlaceholderText: moment()
        .add(1, 'days')
        .format('ddd, MMMM D'),
      format: null,
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
      return false;
    },
  },
  group: 'custom inputs',
};
