import React from 'react';
import routeConfiguration from '../../../routeConfiguration.js';
import { matchPathname } from '../../../util/routes.js';

import { NamedLink, ExternalLink } from '../../../components/index.js';
import css from './Link.module.css';

export const Link = React.forwardRef((props, ref) => {
  const { className, href, children } = props;
  const classes = className || css.link;
  const linkProps = { className: classes, href, children };

  // Markdown parser (rehype-sanitize) might return undefined href
  if (!href || !children) {
    return null;
  }

  if (href.charAt(0) === '/') {
    // Internal link
    const matchedRoutes = matchPathname(href, routeConfiguration());
    if (matchedRoutes.length > 0) {
      const found = matchedRoutes[0];
      const testURL = new URL('http://my.marketplace.com' + href);
      const to = { search: testURL.search, hash: testURL.hash };
      return (
        <NamedLink name={found.route.name} params={found.params} to={to} {...linkProps} ref={ref} />
      );
    }
  }

  return <ExternalLink {...linkProps} ref={ref} />;
});

Link.displayName = 'Link';
