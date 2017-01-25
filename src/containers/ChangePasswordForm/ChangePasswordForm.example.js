/* eslint-disable no-console, import/prefer-default-export */
import ChangePasswordForm from './ChangePasswordForm';

export const Empty = {
  component: ChangePasswordForm,
  props: {
    onSubmit(values) {
      console.log('submit new password form values:', values);
    },
  },
};
