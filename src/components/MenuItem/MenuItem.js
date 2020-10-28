/**
 * MenuItem is part of Menu and specifically a child of MenuContent.
 * MenuItems should have a 'key' prop specified.
 * https://facebook.github.io/react/docs/lists-and-keys.html#keys
 *
 * Example:
 *   <MenuItem key="item 1"><a href="example.com">Click me</a><MenuItem>
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './MenuItem.module.css';

const MenuItem = props => {
  const { children, className, rootClassName } = props;
  const rootClass = rootClassName || css.root;
  const classes = classNames(rootClass, className);

  return (
    <li className={classes} role="menuitem">
      {children}
    </li>
  );
};

MenuItem.defaultProps = {
  className: null,
  rootClassName: '',
};

const { node, string } = PropTypes;

MenuItem.propTypes = {
  children: node.isRequired,
  className: string,
  rootClassName: string,
};

export default MenuItem;
