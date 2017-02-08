import React from 'react';
import { PageLayout, NamedLink } from '../../components';

export default () => (
  <PageLayout title="Manage listings">
    <ul>
      <li>
        <NamedLink name="ListingPage" params={{ id: '1234', slug: 'some-listing' }}>
          Listing 1234
        </NamedLink>
      </li>
    </ul>
  </PageLayout>
);
