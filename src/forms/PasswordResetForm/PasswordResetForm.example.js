/* eslint-disable no-console */
import PasswordResetForm from './PasswordResetForm';

export const Empty = {
  component: PasswordResetForm,
  props: {
    formId: 'PasswordResetFormExample',
    onSubmit(values) {
      console.log('submit with values:', values);
    },
  },
  group: 'forms',
};
