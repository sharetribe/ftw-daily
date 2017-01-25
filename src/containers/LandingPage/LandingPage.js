import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NamedLink, PageLayout } from '../../components';

export default () => (
  <PageLayout title="Landing page">
    <NamedLink name="SearchPage" query={{ location: 'helsinki' }}>
      <FormattedMessage
        id="landingpage.examplelink"
        defaultMessage="Show nice studios! (default)"
      />
    </NamedLink>
  </PageLayout>
)
