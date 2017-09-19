/**
 * LayoutSideNavigation needs to have 2 children: content for a secondary side navigation
 * and main content. Side navigation (first child) will be shown aside on Desktop and
 * as sub bar under Topbar on mobile screens.
 */
import React, { PropTypes } from 'react';
import classNames from 'classnames';

import css from './LayoutSideNavigation.css';

const LayoutSideNavigation = props => {
  const { className, rootClassName, children } = props;

  if (React.Children.count(children) !== 2) {
    throw new Error('Menu needs to have two children: side navigation and main content.');
  }

  const classes = classNames(rootClassName || css.root, className);

  return (
    <div className={classes}>
      <aside className={css.navigation}>
        {children[0]}
      </aside>
      <div className={css.content}>
        {children[1]}
      </div>
    </div>
  );
};

LayoutSideNavigation.defaultProps = {
  className: null,
  rootClassName: '',
};

const { node, string } = PropTypes;

LayoutSideNavigation.propTypes = {
  children: node.isRequired,
  className: string,
  rootClassName: string,
};

export default LayoutSideNavigation;
