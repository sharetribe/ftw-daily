import React from 'react';
import { shape, string } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { parse } from '../../util/urlHelpers';
import { NamedRedirect } from '../../components';

// Get page asset name from asset path
const getPageAssetName = assetPath => {
  const cmsPageRegex = new RegExp('content/pages/(.*).json');
  const matches = assetPath.match(cmsPageRegex);
  // The asset name is found from the matches array;
  return matches?.[1];
};

// This page resolves what route on the client app should be shown,
// when Console redirects the operator to the client app.
// The URL that Flex Console uses looks like this:
// https://my.marketplace.com/preview?asset-path=content/pages/privacy-policy.json
//
// If the asset path starts with "content/pages",
// we try to pick the asset name (e.g. privacy-policy) and resolve the correct route based on that.
const PreviewResolverPage = props => {
  const search = props?.location?.search;
  const parsedQueryString = parse(search);
  const assetPath = parsedQueryString?.['asset-path'] || '';
  const pageAssetName = getPageAssetName(assetPath);
  const hasCMSPagePath = !!pageAssetName;

  const toTermsOfServicePage = <NamedRedirect name="TermsOfServicePage" />;
  const toPrivacyPolicyPage = <NamedRedirect name="PrivacyPolicyPage" />;
  const toCMSPage = <NamedRedirect name="CMSPage" params={{ pageId: pageAssetName }} />;
  const toLandingPage = <NamedRedirect name="LandingPage" />;

  // Check if a specific page should be shown
  // If pageAssetName can't be detected, redirect to LandingPage
  return pageAssetName === 'terms-of-service'
    ? toTermsOfServicePage
    : pageAssetName === 'privacy-policy'
    ? toPrivacyPolicyPage
    : pageAssetName === 'landing-page'
    ? toLandingPage
    : hasCMSPagePath
    ? toCMSPage
    : toLandingPage;
};

PreviewResolverPage.propTypes = {
  // from withRouter
  location: shape({
    search: string.isRequired,
  }).isRequired,
};

export default withRouter(PreviewResolverPage);
