/* eslint-disable no-console */
import SignupForm from './SignupForm';

export const Empty = {
  component: SignupForm,
  props: {
    onSubmit(values) {
      console.log('sign up with form values:', values);
    },
  },
};
