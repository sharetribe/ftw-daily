import React from 'react';
import { PageLayout, NamedLink } from '../../components';

export default () => (
  <PageLayout title="Manage listings">
    <ul>
      <li>
        <NamedLink name="ListingPage" params={{ id: 'some-id', slug: 'some-slug' }}>
          Listing some-id
        </NamedLink>
      </li>
    </ul>
  </PageLayout>
);
