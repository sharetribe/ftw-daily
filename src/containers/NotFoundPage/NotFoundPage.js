import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../components';

export default () => (
  <PageLayout title="Page not found">
    <Link to="/">Index page</Link>
  </PageLayout>
);
