import React from 'react';
import { Link } from 'react-router';
import { Page } from '../../components';

export default () => (
  <Page title="Index page">
    <Link to="/search">search page</Link>
  </Page>
);
