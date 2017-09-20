/**
 * LayoutSideNavigation needs to have 2 children: content for a secondary side navigation
 * and main content. Side navigation (first child) will be shown aside on Desktop and
 * as sub bar under Topbar on mobile screens.
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './LayoutSideNavigation.css';

const ContentWrapper = props => {
  const { className, rootClassName, children } = props;

  const classes = classNames(rootClassName || css.contentWrapper, className);

  return (
    <div className={classes} role="main">
      {children}
    </div>
  );
};

ContentWrapper.defaultProps = {
  className: null,
  rootClassName: null,
};

const { node, string } = PropTypes;

ContentWrapper.propTypes = {
  children: node.isRequired,
  className: string,
  rootClassName: string,
};

export default ContentWrapper;
