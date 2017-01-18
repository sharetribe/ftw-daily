import React from 'react';
import { Page } from '../../components';

export default (props, context) => {
  const { params } = props;
  return (
    <Page title={`Edit profile page with display name: ${params.displayName}`}>
    </Page>
  );
}
