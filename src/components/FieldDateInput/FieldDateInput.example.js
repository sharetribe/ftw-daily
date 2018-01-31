/* eslint-disable no-console */
import React from 'react';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import moment from 'moment';
import { Button } from '../../components';
import { required, bookingDateRequired } from '../../util/validators';
import FieldDateInput from './FieldDateInput';

const FormComponent = props => {
  const { form, handleSubmit, pristine, submitting, dateInputProps } = props;
  const submitDisabled = pristine || submitting;
  return (
    <form onSubmit={handleSubmit}>
      <FieldDateInput {...dateInputProps} />
      <Button type="submit" disabled={submitDisabled} style={{ marginTop: '24px' }}>
        Select
      </Button>
    </form>
  );
};

FormComponent.propTypes = formPropTypes;

const defaultFormName = 'Styleguide.DateInput.Form';

const Form = reduxForm({
  form: defaultFormName,
})(FormComponent);

export const Empty = {
  component: Form,
  props: {
    dateInputProps: {
      name: 'bookingDate',
      useMobileMargins: false,
      id: `${defaultFormName}.bookingDate`,
      label: 'Date',
      placeholderText: moment().format('ddd, MMMM D'),
      format: null,
      validate: [required('Required'), bookingDateRequired('Date is not valid')],
      onBlur: () => console.log('onBlur called from DateInput props.'),
      onFocus: () => console.log('onFocus called from DateInput props.'),
    },
    onChange: values => {
      const { date } = values;
      console.log('Changed to', moment(date).format('L'));
    },
    onSubmit: values => {
      console.log('Submitting a form with values:', values);
    },
  },
  group: 'custom inputs',
};
