import PayoutDetailsForm from './PayoutDetailsForm';

export const USD = {
  component: PayoutDetailsForm,
  props: {
    currency: 'USD',
    onSubmit: values => {
      console.log('submit payout details:', values); // eslint-disable-line
    },
  },
};
