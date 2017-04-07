/* eslint-disable no-console */
import SignUpForm from './SignUpForm';

export const Empty = {
  component: SignUpForm,
  props: {
    onSubmit(values) {
      console.log('sign up with form values:', values);
    },
  },
};
