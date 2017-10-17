/**
 * LayoutSideNavigation needs to have 3 children: TopbarWrapper, SideNavWrapper and ContentWrapper.
 * SideNavWrapper will be shown aside on Desktop layout and
 * as a sub bar under Topbar on mobile screens.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TopbarWrapper from './TopbarWrapper';
import SideNavWrapper from './SideNavWrapper';
import ContentWrapper from './ContentWrapper';

import css from './LayoutSideNavigation.css';

const prepareChildren = children => {
  if (React.Children.count(children) !== 3) {
    throw new Error(
      'Menu needs to have 3 children: TopbarWrapper, SideNavWrapper and ContentWrapper.'
    );
  }

  const childrenMap = {};

  React.Children.forEach(children, child => {
    if (child.type === TopbarWrapper) {
      childrenMap.topbarWrapper = child;
    } else if (child.type === SideNavWrapper) {
      childrenMap.sideNavWrapper = child;
    } else if (child.type === ContentWrapper) {
      childrenMap.contentWrapper = child;
    } else {
      throw new Error(
        `LayoutSideNavigation has an unknown child.
      Only TopbarWrapper, SideNavWrapper, and ContentWrapper are allowed.`
      );
    }
  });
  return childrenMap;
};

const LayoutSideNavigation = props => {
  const { className, rootClassName, containerClassName, children } = props;

  const preparedChildren = prepareChildren(children);
  const classes = classNames(rootClassName || css.root, className);
  const containerClasses = containerClassName || css.container;

  return (
    <div className={classes}>
      {preparedChildren.topbarWrapper}
      <div className={containerClasses}>
        {preparedChildren.sideNavWrapper}
        {preparedChildren.contentWrapper}
      </div>
    </div>
  );
};

LayoutSideNavigation.defaultProps = {
  className: null,
  rootClassName: null,
  containerClassName: null,
};

const { node, string } = PropTypes;

LayoutSideNavigation.propTypes = {
  children: node.isRequired,
  className: string,
  rootClassName: string,
  containerClassName: string,
};

export { ContentWrapper, SideNavWrapper, TopbarWrapper };

export default LayoutSideNavigation;
