import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { PageLayout } from '../../components';

export default () => (
  <PageLayout title="Landing page">
    <Link to="/s?location=helsinki">
      <FormattedMessage
        id="landingpage.examplelink"
        defaultMessage="Show nice studios! (default)"
      />
    </Link>
  </PageLayout>
)
