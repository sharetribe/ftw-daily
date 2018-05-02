/* eslint-disable no-console */
import { createCurrentUser } from '../../util/test-data';
import EmailVerificationForm from './EmailVerificationForm';

const notVerifiedUser = createCurrentUser('not-verified');
notVerifiedUser.attributes.emailVerified = false;

export const NotVerified = {
  component: EmailVerificationForm,
  props: {
    currentUser: notVerifiedUser,
    onSubmit(values) {
      console.log('submit values:', values);
    },
  },
  group: 'forms',
};

export const Verified = {
  component: EmailVerificationForm,
  props: {
    currentUser: createCurrentUser('verified'),
    onSubmit(values) {
      console.log('submit values:', values);
    },
  },
  group: 'forms',
};
