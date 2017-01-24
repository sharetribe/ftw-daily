/* eslint-disable no-console, import/prefer-default-export */
import PasswordForgottenForm from './PasswordForgottenForm';

export const Empty = {
  component: PasswordForgottenForm,
  props: {
    onSubmit(values) {
      console.log('submit forgotten password email:', values);
    },
  },
};
