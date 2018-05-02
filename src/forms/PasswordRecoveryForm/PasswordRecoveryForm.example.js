/* eslint-disable no-console */
import PasswordRecoveryForm from './PasswordRecoveryForm';

export const Empty = {
  component: PasswordRecoveryForm,
  props: {
    formId: 'PasswordRecoveryFormExample',
    onSubmit(values) {
      console.log('submit forgotten password email:', values);
    },
  },
  group: 'forms',
};
