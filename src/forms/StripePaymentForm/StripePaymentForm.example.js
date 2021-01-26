import { fakeIntl } from '../../util/test-data';
import StripePaymentForm from './StripePaymentForm';

const noop = () => null;

export const Empty = {
  component: StripePaymentForm,
  props: {
    formId: 'StripePaymentFormExample',
    authorDisplayName: 'Janne K',
    paymentInfo: 'You might or might not be charged yet',
    onChange: values => {
      console.log('form onChange:', values);
    },
    onSubmit: values => {
      console.log('form onSubmit:', values);
    },
    intl: fakeIntl,
    onCreateStripePaymentToken: noop,
    onStripeInitialized: noop,
    stripePaymentTokenInProgress: false,
    stripePaymentTokenError: null,
  },
  group: 'forms',
};
