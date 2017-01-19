import React from 'react';
import { Link } from 'react-router';
import { Page } from '../../components';

export default () => (
  <Page title="Landing page">
    <Link to="/s?location=helsinki">Find studios</Link>
  </Page>
)
