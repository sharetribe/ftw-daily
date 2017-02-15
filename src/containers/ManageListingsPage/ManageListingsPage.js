import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../../components';

export default () => (
  <PageLayout title="Manage listings">
    <ul>
      <li><Link to="/l/1234">Listing 1234</Link></li>
    </ul>
  </PageLayout>
);
