/* eslint-disable no-console, import/prefer-default-export */
import SignUpForm from './SignUpForm';

export const Empty = {
  component: SignUpForm,
  props: {
    onSubmit(values) {
      console.log('sign up with form values:', values);
    },
  },
};
