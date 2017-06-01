/**
 * MenuLabel is the only always visible part of Menu.
 * Clicking it toggles visibility of MenuContent.
 */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import css from './MenuLabel.css';

class MenuLabel extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onToggleActive();
  }

  render() {
    const { children, className, rootClassName } = this.props;

    const rootClass = rootClassName || css.root;
    const classes = classNames(rootClass, className);

    return (
      <button className={classes} onClick={this.onClick}>
        {children}
      </button>
    );
  }
}
/* eslint-enable jsx-a11y/no-static-element-interactions */

MenuLabel.defaultProps = { className: null, onToggleActive: null, rootClassName: '' };

const { func, node, string } = PropTypes;

MenuLabel.propTypes = {
  children: node.isRequired,
  className: string,
  onToggleActive: func,
  rootClassName: string,
};

export default MenuLabel;
