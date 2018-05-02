/* eslint-disable no-console */
import LoginForm from './LoginForm';

export const Empty = {
  component: LoginForm,
  props: {
    formId: 'LoginFormExample',
    onSubmit(values) {
      console.log('log in with form values:', values);
    },
  },
  group: 'forms',
};
