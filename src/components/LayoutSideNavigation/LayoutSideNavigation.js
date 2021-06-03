/**
 * LayoutSideNavigation needs to have 3-4 children:
 * LayoutWrapperTopbar, LayoutWrapperSideNav, LayoutWrapperMain, and possibly LayoutWrapperFooter.
 * SideNavWrapper will be shown aside on Desktop layout and
 * as a sub bar under Topbar on mobile screens.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  LayoutWrapperTopbar,
  LayoutWrapperSideNav,
  LayoutWrapperAccountSettingsSideNav,
  LayoutWrapperMain,
  LayoutWrapperFooter,
} from '../../components';

import css from './LayoutSideNavigation.module.css';

const prepareChildren = children => {
  const childrenCount = React.Children.count(children);
  if (!(childrenCount === 3 || childrenCount === 4)) {
    throw new Error(
      `Menu needs to have 3 - 4 children:
      LayoutWrapperTopbar, LayoutWrapperSideNav, and LayoutWrapperMain,
      and optionally LayoutWrapperFooter.`
    );
  }

  const childrenMap = {};

  React.Children.forEach(children, child => {
    if (child.type === LayoutWrapperTopbar) {
      childrenMap.layoutWrapperTopbar = child;
    } else if ([LayoutWrapperSideNav, LayoutWrapperAccountSettingsSideNav].includes(child.type)) {
      childrenMap.layoutWrapperSideNav = child;
    } else if (child.type === LayoutWrapperMain) {
      // LayoutWrapperMain needs different rootClassName
      const childWithAddedCSS = React.cloneElement(child, {
        rootClassName: css.layoutWrapperMain,
      });
      childrenMap.layoutWrapperMain = childWithAddedCSS;
    } else if (child.type === LayoutWrapperFooter) {
      childrenMap.layoutWrapperFooter = child;
    } else {
      throw new Error(
        `LayoutSideNavigation has an unknown child.
      Only LayoutWrapperTopbar, LayoutWrapperSideNav, LayoutWrapperMain, LayoutWrapperFooter are allowed.`
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

  const maybeFooter = preparedChildren.layoutWrapperFooter || null;

  return (
    <div className={classes}>
      {preparedChildren.layoutWrapperTopbar}
      <div className={containerClasses}>
        {preparedChildren.layoutWrapperSideNav}
        {preparedChildren.layoutWrapperMain}
      </div>
      {maybeFooter}
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

export default LayoutSideNavigation;
