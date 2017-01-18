import React from 'react';
import { Link } from 'react-router';
import { PageLayout } from '../../components';

export default () => (
  <PageLayout title="Page not found">
    <Link to="/">Index page</Link>
  </PageLayout>
);
