/* eslint-disable no-console, import/prefer-default-export */
import LoginForm from './LoginForm';

export const Empty = {
  component: LoginForm,
  props: {
    onSubmit(values) {
      console.log('log in with form values:', values);
    },
  },
};
