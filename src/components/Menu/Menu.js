/**
 * Menu is component that shows extra content when it is clicked.
 * Clicking it toggles visibility of MenuContent.
 *
 * Example:
 *  <Menu>
 *    <MenuLabel>
 *      <span>Open menu</span>
 *    </MenuLabel>
 *    <MenuContent>
 *      <MenuItem key="first item">
 *        <Button onClick={onClick}>Click this</Button>
 *      </MenuItem>
 *    </MenuContent>
 *  </Menu>
 *
 */

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { MenuContent, MenuLabel } from '../../components';
import css from './Menu.css';

const KEY_CODE_ESCAPE = 27;
const CONTENT_PLACEMENT_OFFSET = 0;

// This should work, but it doesn't <div className="foo" onClick={() => {}} role="button" />
/* eslint-disable jsx-a11y/no-static-element-interactions */
class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };

    this.onBlur = this.onBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.prepareChildren = this.prepareChildren.bind(this);
    this.positionStyleForMenuContent = this.positionStyleForMenuContent.bind(this);
    this.positionStyleForArrow = this.positionStyleForArrow.bind(this);

    this.menu = null;
    this.menuContent = null;
  }

  onBlur(event) {
    // FocusEvent is fired faster than the link elements native click handler
    // gets its own event. Therefore, we need to check the origin of this FocusEvent.
    if (!this.menu.contains(event.relatedTarget)) {
      this.setState({ isOpen: false });
    }
  }

  onKeyDown(e) {
    // Gather all escape presses to close menu
    if (e.keyCode === KEY_CODE_ESCAPE) {
      this.toggleOpen(false);
    }
  }

  toggleOpen(enforcedState) {
    this.setState(prevState => {
      const isOpen = enforcedState != null ? enforcedState : !prevState.isOpen;
      return { isOpen };
    });
  }

  positionStyleForMenuContent() {
    if (this.menu && this.menuContent) {
      // Calculate wether we should show the menu to the left of the component or right
      const distanceToRight = window.innerWidth - this.menu.getBoundingClientRect().right;
      const menuWidth = this.menu.offsetWidth;
      const contentWidthBiggerThanLabel = this.menuContent.offsetWidth - menuWidth;
      return distanceToRight < contentWidthBiggerThanLabel
        ? { right: -1 * CONTENT_PLACEMENT_OFFSET, minWidth: menuWidth }
        : { left: 0, minWidth: menuWidth };
    }
    return {};
  }

  positionStyleForArrow(isPositionedRight) {
    if (this.menu) {
      const menuWidth = this.menu.offsetWidth;
      return isPositionedRight
        ? Math.floor(menuWidth / 2) + CONTENT_PLACEMENT_OFFSET
        : Math.floor(menuWidth / 2);
    }
    return 0;
  }

  prepareChildren() {
    if (React.Children.count(this.props.children) !== 2) {
      throw new Error('Menu needs to have two children: MenuLabel and MenuContent.');
    }

    return React.Children.map(this.props.children, child => {
      if (child.type === MenuLabel) {
        // MenuLabel needs toggleOpen function
        // We pass that directly  so that component user doesn't need to worry about that
        return React.cloneElement(child, { onToggleActive: this.toggleOpen });
      } else if (child.type === MenuContent) {
        // MenuContent needs some styling data (width, arrowPosition, and isOpen info)
        // We pass those directly so that component user doesn't need to worry about those.
        const positionStyles = this.positionStyleForMenuContent();
        return React.cloneElement(child, {
          arrowPosition: this.positionStyleForArrow(positionStyles.right != null),
          contentRef: node => {
            this.menuContent = node;
          },
          isOpen: this.state.isOpen,
          style: { ...child.props.style, ...positionStyles },
        });
      } else {
        throw new Error('Menu has an unknown child. Only MenuLabel and MenuContent are allowed.');
      }
    });
  }

  render() {
    const { className, rootClassName } = this.props;
    const rootClass = rootClassName || css.root;
    const classes = classNames(rootClass, className);
    const menuChildren = this.prepareChildren();

    return (
      <div
        className={classes}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        ref={c => {
          this.menu = c;
        }}
      >
        {menuChildren}
      </div>
    );
  }
}
/* eslint-enable jsx-a11y/no-static-element-interactions */

Menu.defaultProps = { className: null, rootClassName: '' };

const { node, string } = PropTypes;

Menu.propTypes = {
  children: node.isRequired,
  className: string,
  rootClassName: string,
};

export default Menu;
