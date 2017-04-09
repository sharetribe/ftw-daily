/* eslint-disable no-console */
import ChangeAccountPasswordForm from './ChangeAccountPasswordForm';

export const Empty = {
  component: ChangeAccountPasswordForm,
  props: {
    onSubmit(values) {
      console.log('submit new password form values:', values);
    },
  },
};
