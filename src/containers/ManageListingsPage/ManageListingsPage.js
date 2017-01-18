import React from 'react';
import { Link } from 'react-router';
import { Page } from '../../components';

export default () => (
  <Page title="Manage listings">
    <ul>
      <li><Link to="/l/1234">Listing 1234</Link></li>
    </ul>
  </Page>
)
