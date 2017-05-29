/* eslint-disable no-console */
import ChangePasswordForm from './ChangePasswordForm';

export const Empty = {
  component: ChangePasswordForm,
  props: {
    onSubmit(values) {
      console.log('submit new password form values:', values);
    },
  },
  group: 'forms',
};
