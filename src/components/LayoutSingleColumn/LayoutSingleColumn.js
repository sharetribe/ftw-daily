/**
 * LayoutSingleColumn needs to have 2-3 children:
 * LayoutWrapperTopbar, LayoutWrapperMain, and possibly LayoutWrapperFooter.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { LayoutWrapperTopbar, LayoutWrapperMain, LayoutWrapperFooter } from '../../components';

import css from './LayoutSingleColumn.module.css';

const prepareChildren = children => {
  const childrenCount = React.Children.count(children);
  if (!(childrenCount === 2 || childrenCount === 3)) {
    throw new Error(
      `LayoutSingleColumn needs to have 2 - 3 children:
      LayoutWrapperTopbar, and LayoutWrapperMain,
      and optionally LayoutWrapperFooter.`
    );
  }

  const childrenMap = {};

  React.Children.forEach(children, child => {
    if (child.type === LayoutWrapperTopbar) {
      childrenMap.layoutWrapperTopbar = child;
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
        `LayoutSingleColumn has an unknown child.
      Only LayoutWrapperTopbar, LayoutWrapperMain, LayoutWrapperFooter are allowed.`
      );
    }
  });
  return childrenMap;
};

const LayoutSingleColumn = props => {
  const { className, rootClassName, children } = props;
  const preparedChildren = prepareChildren(children);
  const classes = classNames(rootClassName || css.root, className);
  const maybeFooter = preparedChildren.layoutWrapperFooter || null;

  return (
    <div className={classes}>
      {preparedChildren.layoutWrapperTopbar}
      {preparedChildren.layoutWrapperMain}
      {maybeFooter}
    </div>
  );
};

LayoutSingleColumn.defaultProps = {
  className: null,
  rootClassName: null,
};

const { node, string } = PropTypes;

LayoutSingleColumn.propTypes = {
  children: node.isRequired,
  className: string,
  rootClassName: string,
};

export default LayoutSingleColumn;
