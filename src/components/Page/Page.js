import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import { canonicalURL, metaTagProps } from '../../util/seo';

import facebookImage from '../../assets/saunatimeFacebook-1200x630.jpg';
import twitterImage from '../../assets/saunatimeTwitter-600x314.jpg';
import css from './Page.css';

const scrollToTop = () => {
  // Todo: this might need fine tuning later
  window.scrollTo(0, 0);
};

const preventDefault = e => {
  e.preventDefault();
};

class PageComponent extends Component {
  componentDidMount() {
    this.historyUnlisten = this.props.history.listen(() => scrollToTop());

    // By default a dropped file is loaded in the browser window as a
    // file URL. We want to prevent this since it might loose a lot of
    // data the user has typed but not yet saved. Preventing requires
    // handling both dragover and drop events.
    document.addEventListener('dragover', preventDefault);
    document.addEventListener('drop', preventDefault);
  }

  componentWillUnmount() {
    if (this.historyUnlisten) {
      this.historyUnlisten();
    }
    document.removeEventListener('dragover', preventDefault);
    document.removeEventListener('drop', preventDefault);
  }

  render() {
    const {
      className,
      rootClassName,
      authInfoError,
      children,
      history,
      intl,
      logoutError,
      scrollingDisabled,
      author,
      contentType,
      description,
      facebookImages,
      published,
      schema,
      tags,
      title,
      twitterHandle,
      twitterImages,
      updated,
    } = this.props;

    // TODO: use FlashMessages for auth errors

    /* eslint-disable no-console */
    if (authInfoError && console && console.error) {
      console.error(authInfoError);
    }
    if (logoutError && console && console.error) {
      console.error(logoutError);
    }
    /* eslint-enable no-console */

    const classes = classNames(rootClassName || css.root, className, {
      [css.scrollingDisabled]: scrollingDisabled,
    });

    const { pathname, search = '' } = history.location;
    const pathWithSearch = `${pathname}${search}`;

    const schemaTitle = intl.formatMessage({ id: 'Page.schemaTitle' });
    const schemaDescription = intl.formatMessage({ id: 'Page.schemaDescription' });
    const metaTitle = title || schemaTitle;
    const metaDescription = description || schemaDescription;
    const facebookImgs = facebookImages || [
      { name: 'facebook', url: `${config.canonicalRootURL}${facebookImage}`, width: 1200, height: 630 },
    ];
    const twitterImgs = twitterImages || [
      { name: 'twitter', url: `${config.canonicalRootURL}${twitterImage}`, width: 600, height: 314 },
    ];

    const metaToHead = metaTagProps({
      author,
      contentType,
      description: metaDescription,
      facebookImages: facebookImgs,
      twitterImages: twitterImgs,
      published,
      tags,
      title: metaTitle,
      twitterHandle,
      updated,
      url: canonicalURL(pathWithSearch),
      locale: intl.locale,
    });

    // eslint-disable-next-line react/no-array-index-key
    const metaTags = metaToHead.map((metaProps, i) => <meta key={i} {...metaProps} />);

    // Schema for search engines (helps them to understand what this page is about)
    // http://schema.org
    // We are using JSON-LD format
    const schemaJSONString = schema ||
      JSON.stringify({
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        description: schemaDescription,
        name: schemaTitle,
      });

    return (
      <div className={classes}>
        <Helmet
          htmlAttributes={{
            lang: intl.locale,
          }}
        >
          <title>{title}</title>
          <link rel="canonical" href={canonicalURL(pathWithSearch)} />
          {metaTags}
          <script type="application/ld+json">
            {schemaJSONString}
          </script>

        </Helmet>
        {authInfoError
          ? <div style={{ color: 'red' }}>
              <FormattedMessage id="Page.authInfoFailed" />
            </div>
          : null}
        {logoutError
          ? <div style={{ color: 'red' }}>
              <FormattedMessage id="Page.logoutFailed" />
            </div>
          : null}
        <div className={css.content}>
          {children}
        </div>
      </div>
    );
  }
}

const { any, arrayOf, bool, func, instanceOf, number, shape, string } = PropTypes;

PageComponent.defaultProps = {
  className: null,
  rootClassName: null,
  children: null,
  authInfoError: null,
  logoutError: null,
  scrollingDisabled: false,
  author: null,
  contentType: 'website',
  description: null,
  facebookImages: null,
  twitterImages: null,
  published: null,
  schema: null,
  tags: null,
  twitterHandle: null,
  updated: null,
};

PageComponent.propTypes = {
  className: string,
  rootClassName: string,
  children: any,
  authInfoError: instanceOf(Error),
  logoutError: instanceOf(Error),
  scrollingDisabled: bool,

  // SEO related props
  author: string,
  contentType: string, // og:type
  description: string, // page description
  facebookImages: arrayOf(
    shape({
      width: number.isRequired,
      height: number.isRequired,
      url: string.isRequired,
    })
  ),
  twitterImages: arrayOf(
    shape({
      width: number.isRequired,
      height: number.isRequired,
      url: string.isRequired,
    })
  ),
  published: string, // article:published_time
  schema: string, // http://schema.org
  tags: string, // article:tag
  title: string.isRequired, // page title
  twitterHandle: string, // twitter handle
  updated: string, // article:modified_time

  // from withRouter
  history: shape({
    listen: func.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const Page = injectIntl(withRouter(PageComponent));
Page.displayName = 'Page';

export default Page;
