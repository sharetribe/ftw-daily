/**
 * This is a wrapper component for different Layouts.
 * Navigational 'aside' content should be added to this wrapper.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './LayoutWrapperSideNav.css';

const LayoutWrapperSideNav = props => {
  const { className, rootClassName, children } = props;
  const classes = classNames(rootClassName || css.root, className);
  return <aside className={classes}>{children}</aside>;
};

LayoutWrapperSideNav.defaultProps = {
  className: null,
  rootClassName: null,
};

const { node, string } = PropTypes;

LayoutWrapperSideNav.propTypes = {
  children: node.isRequired,
  className: string,
  rootClassName: string,
};

export default LayoutWrapperSideNav;
