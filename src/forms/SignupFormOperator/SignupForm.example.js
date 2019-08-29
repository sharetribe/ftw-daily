/* eslint-disable no-console */
import SignupForm from './SignupForm';

export const Empty = {
  component: SignupForm,
  props: {
    formId: 'SignupFormExample',
    onSubmit(values) {
      console.log('sign up with form values:', values);
    },
    onOpenTermsOfService() {
      console.log('open terms of service');
    },
  },
  group: 'forms',
};
