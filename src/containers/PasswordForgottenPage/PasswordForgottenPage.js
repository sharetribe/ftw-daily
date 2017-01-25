import React from 'react';
import { PageLayout } from '../../components';
import { PasswordForgottenForm } from '../../containers';

const sendPasswordResetEmail = values => {
  // eslint-disable-next-line no-console
  console.log('submit with values:', values);
};

const PasswordForgottenPage = () => (
  <PageLayout title="Request new password">
    <PasswordForgottenForm onSubmit={sendPasswordResetEmail} />
  </PageLayout>
);

export default PasswordForgottenPage;
