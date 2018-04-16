/* eslint-disable no-console */
import React from 'react';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import moment from 'moment';
import { Button } from '../../components';
import { required, bookingDateRequired, composeValidators } from '../../util/validators';
import FieldDateInput from './FieldDateInput';

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
        values,
      } = fieldRenderProps;
      const submitDisabled = pristine || submitting;
      if (values && values.bookingDates) {
        onChange(values.bookingDates);
      }

      return (
        <form
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

const defaultFormName = 'FieldDateInputExampleForm';

export const Empty = {
  component: FormComponent,
  props: {
    dateInputProps: {
      name: 'bookingDate',
      useMobileMargins: false,
      id: `${defaultFormName}.bookingDate`,
      label: 'Date',
      placeholderText: moment().format('ddd, MMMM D'),
      format: null,
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
