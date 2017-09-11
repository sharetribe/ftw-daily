/* eslint-disable no-console */
import PasswordResetForm from './PasswordResetForm';

export const Empty = {
  component: PasswordResetForm,
  props: {
    onSubmit(values) {
      console.log('submit with values:', values);
    },
  },
  group: 'forms',
};
