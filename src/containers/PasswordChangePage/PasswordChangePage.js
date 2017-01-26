import React from 'react';
import { PageLayout } from '../../components';
import { ChangePasswordForm } from '../../containers';

const changePassword = values => {
  // eslint-disable-next-line no-console
  console.log('submit with values:', values);
};

const PasswordChangePage = () => (
  <PageLayout title="Type new password">
    <ChangePasswordForm onSubmit={changePassword} />
  </PageLayout>
);

export default PasswordChangePage;
