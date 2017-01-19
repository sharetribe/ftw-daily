import React from 'react';
import { Page } from '../../components';

export default ({ params }) => (
  <Page title={`Profile page with display name: ${params.displayName}`}>
  </Page>
)
