import React from 'react';
import { Link } from 'react-router';
import { Page } from '../components';

export default () => (
  <Page title="Search page">
    <Link to="/">index page</Link><br />
    <Link to="/home">home page</Link>
  </Page>
);
