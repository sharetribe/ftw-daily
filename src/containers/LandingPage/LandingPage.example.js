import React from 'react';
import FallbackPage from './FallbackPage.js';

const pageSchemaForSEO = {
  '@context': 'http://schema.org',
  '@type': 'WebPage',
  description: 'schemaDescription',
  name: 'schemaTitle',
};

const FallbackPageComponent = () => (
  <FallbackPage
    title="title"
    description="description"
    pageSchemaForSEO={pageSchemaForSEO}
    openGraphContentType="website"
  />
);

export const FallbackPageExample = {
  component: FallbackPageComponent,
  props: {},
  group: 'PageBuilder',
  rawOnly: true,
};
