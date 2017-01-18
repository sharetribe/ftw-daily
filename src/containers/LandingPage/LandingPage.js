import React from 'react';
import { Link } from 'react-router';
import { PageLayout } from '../../components';

export default () => (
  <PageLayout title="Landing page">
    <Link to="/s?location=helsinki">Find studios</Link>
  </PageLayout>
);
