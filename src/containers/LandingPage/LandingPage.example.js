import { fallbackPage } from './LandingPage.js';

const pageSchemaForSEO = {
  '@context': 'http://schema.org',
  '@type': 'WebPage',
  description: 'schemaDescription',
  name: 'schemaTitle',
};

const FallbackPage = () => fallbackPage('title', 'description', pageSchemaForSEO, 'website');

export const FallbackPageExample = {
  component: FallbackPage,
  props: {},
  group: 'PageBuilder',
  rawOnly: true,
};
