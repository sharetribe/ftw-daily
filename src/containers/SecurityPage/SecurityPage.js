import React from 'react';
import { PageLayout } from '../../components';
import { ChangeAccountPasswordForm } from '../../containers';

const changePassword = values => {
  // eslint-disable-next-line no-console
  console.log('change password to values:', values);
};

export default () => (
  <PageLayout title="Security">
    <ChangeAccountPasswordForm onSubmit={changePassword} />
  </PageLayout>
)
