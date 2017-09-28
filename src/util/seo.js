import config from '../config';

export const canonicalURL = path => `${config.canonicalRootURL}${path}`;

/**
 * These will be used with Helmet <meta {...openGraphMetaProps} />
 */
export const openGraphMetaProps = data => {
  const {
    canonicalRootURL,
    contentType,
    description,
    facebookAppId,
    facebookImages,
    published,
    siteTitle,
    tags,
    title,
    updated,
    url,
  } = data;

  if (
    !(title &&
      description &&
      contentType &&
      url &&
      facebookImages &&
      facebookImages.length > 0 &&
      canonicalRootURL)
  ) {
    /* eslint-disable no-console */
    if (console && console.warning) {
      console.warning(
        `Can't create Openg Graph meta tags:
        title, description, contentType, url, facebookImages, and canonicalRootURL are needed.`
      );
    }
    /* eslint-enable no-console */
    return [];
  }

  const openGraphMeta = [
    { property: 'og:description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:type', content: contentType },
    { property: 'og:url', content: url },
  ];

  facebookImages.forEach(i => {
    openGraphMeta.push({
      property: 'og:image',
      content: `${canonicalRootURL}${i.url}`,
    });

    if (i.width && i.height) {
      openGraphMeta.push({ property: 'og:image:width', content: i.width });
      openGraphMeta.push({ property: 'og:image:height', content: i.height });
    }
  });

  if (siteTitle) {
    openGraphMeta.push({ property: 'og:site_name', content: siteTitle });
  }

  if (facebookAppId) {
    openGraphMeta.push({ property: 'fb:app_id', content: facebookAppId });
  }

  if (published) {
    openGraphMeta.push({ property: 'article:published_time', content: published });
  }

  if (updated) {
    openGraphMeta.push({ property: 'article:modified_time', content: updated });
  }

  if (tags) {
    openGraphMeta.push({ property: 'article:tag', content: tags });
  }

  return openGraphMeta;
};

/**
 * These will be used with Helmet <meta {...twitterMetaProps} />
 */
export const twitterMetaProps = data => {
  const {
    canonicalRootURL,
    description,
    siteTwitterHandle,
    title,
    twitterHandle,
    twitterImages,
  } = data;

  if (!(title && description && siteTwitterHandle)) {
    /* eslint-disable no-console */
    if (console && console.warning) {
      console.warning(
        `Can't create twitter card meta tags:
        title, description, and siteTwitterHandle are needed.`
      );
    }
    /* eslint-enable no-console */
    return [];
  }

  const twitterMeta = [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:site', content: siteTwitterHandle },
  ];

  if (canonicalRootURL && twitterImages && twitterImages.length > 0) {
    twitterImages.forEach(i => {
      twitterMeta.push({
        name: 'twitter:image:src',
        content: `${canonicalRootURL}${i.url}`,
      });
    });
  }

  if (twitterHandle) {
    // TODO: this needs API support for listings
    twitterMeta.push({ name: 'twitter:creator', content: twitterHandle });
  }

  return twitterMeta;
};

/**
 * These will be used with Helmet <meta {...metaTagProps} />
 * Creates data for Open Graph and Twitter meta tags.
 */
export const metaTagProps = tagData => {
  const {
    canonicalRootURL,
    facebookAppId,
    siteTitle,
    siteTwitterHandle,
  } = config;

  const openGraphMeta = openGraphMetaProps({
    ...tagData,
    canonicalRootURL,
    facebookAppId,
    siteTitle,
  });

  const twitterMeta = twitterMetaProps({
    ...tagData,
    canonicalRootURL,
    siteTwitterHandle,
  });

  return [...openGraphMeta, ...twitterMeta];
};
