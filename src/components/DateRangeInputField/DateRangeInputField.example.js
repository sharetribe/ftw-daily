/* eslint-disable no-console */
import React from 'react';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import moment from 'moment';
import { Button } from '../../components';
import { required, bookingDatesRequired } from '../../util/validators';
import DateRangeInputField from './DateRangeInputField';

const FormComponent = props => {
  const { form, handleSubmit, pristine, submitting, dateInputProps } = props;
  const submitDisabled = pristine || submitting;
  return (
    <form onSubmit={handleSubmit}>
      <DateRangeInputField {...dateInputProps} />
      <Button type="submit" disabled={submitDisabled} style={{ marginTop: '24px' }}>
        Select
      </Button>
    </form>
  );
};

FormComponent.propTypes = formPropTypes;

const defaultFormName = 'Styleguide.DateRangeInput.Form';

const Form = reduxForm({
  form: defaultFormName,
})(FormComponent);

export const Empty = {
  component: Form,
  props: {
    dateInputProps: {
      name: 'bookingDates',
      startDateId: `${defaultFormName}.bookingStartDate`,
      startDateLabel: 'Start date',
      startDatePlaceholderText: moment().format('ddd, MMMM D'),
      endDateId: `${defaultFormName}.bookingEndDate`,
      endDateLabel: 'End date',
      endDatePlaceholderText: moment().add(1, 'days').format('ddd, MMMM D'),
      format: null,
      validate: [
        required('Required'),
        bookingDatesRequired('Start date is not valid', 'End date is not valid'),
      ],
      onBlur: () => console.log('onBlur called from DateRangeInput props.'),
      onFocus: () => console.log('onFocus called from DateRangeInput props.'),
    },
    onChange: values => {
      const { startDate, endDate } = values;
      console.log('Changed to', moment(startDate).format('L'), moment(endDate).format('L'));
    },
    onSubmit: values => {
      console.log('Submitting a form with values:', values);
    },
  },
  group: 'custom inputs',
};
