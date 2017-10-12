/**
 * LayoutSideNavigation needs to have 2 children: content for a secondary side navigation
 * and main content. Side navigation (first child) will be shown aside on Desktop and
 * as sub bar under Topbar on mobile screens.
 */
import React, { PropTypes } from 'react'; // eslint-disable-line react/no-deprecated
import classNames from 'classnames';

import css from './LayoutSideNavigation.css';

const SideNavWrapper = props => {
  const { className, rootClassName, children } = props;

  const classes = classNames(rootClassName || css.sideNavWrapper, className);

  return (
    <aside className={classes}>
      {children}
    </aside>
  );
};

SideNavWrapper.defaultProps = {
  className: null,
  rootClassName: null,
};

const { node, string } = PropTypes;

SideNavWrapper.propTypes = {
  children: node.isRequired,
  className: string,
  rootClassName: string,
};

export default SideNavWrapper;
