/**
 * MenuContent is a immediate child of Menu component sibling to MenuLabel.
 * Clicking MenuLabel toggles visibility of MenuContent.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './MenuContent.module.css';

const MenuContent = props => {
  const {
    arrowPosition,
    children,
    className,
    contentClassName,
    contentRef,
    isOpen,
    rootClassName,
    style,
  } = props;

  const rootClass = rootClassName || css.root;
  const openClasses = isOpen ? css.isOpen : css.isClosed;
  const classes = classNames(rootClass, className, openClasses);
  const contentClasses = classNames(contentClassName || css.content);

  const arrowPositionStyle =
    arrowPosition && style.right != null
      ? { position: 'absolute', right: arrowPosition, top: 0 }
      : { position: 'absolute', left: arrowPosition, top: 0 };

  const arrow = arrowPosition ? (
    <div style={arrowPositionStyle}>
      <div className={css.arrowBelow} />
      <div className={css.arrowTop} />
    </div>
  ) : null;

  return (
    <div className={classes} ref={contentRef} style={style}>
      {arrow}
      <ul className={contentClasses}>{children}</ul>
    </div>
  );
};

MenuContent.defaultProps = {
  arrowPosition: null,
  className: null,
  contentClassName: null,
  contentRef: null,
  isOpen: false,
  rootClassName: '',
  style: null,
};

const { bool, func, node, number, object, string } = PropTypes;

MenuContent.propTypes = {
  arrowPosition: number,
  children: node.isRequired,
  className: string,
  contentClassName: string,
  contentRef: func,
  isOpen: bool,
  rootClassName: string,
  style: object,
};

export default MenuContent;
