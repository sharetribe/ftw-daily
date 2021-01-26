/* eslint-disable no-console */
import PayoutDetailsForm from './PayoutDetailsForm';

export const USD = {
  component: PayoutDetailsForm,
  props: {
    onSubmit: values => {
      console.log('submit payout details:', values);
    },
    onChange: values => {
      console.log('payout details changed:', values);
    },
  },
  group: 'forms',
};
