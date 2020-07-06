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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { MenuContent, MenuLabel } from '../../components';
import css from './Menu.css';

const KEY_CODE_ESCAPE = 27;
const CONTENT_PLACEMENT_OFFSET = 0;
const CONTENT_TO_LEFT = 'left';
const CONTENT_TO_RIGHT = 'right';
const MAX_MOBILE_SCREEN_WIDTH = 768;

const isControlledMenu = (isOpenProp, onToggleActiveProp) => {
  return isOpenProp !== null && onToggleActiveProp !== null;
};

// This should work, but it doesn't <div className="foo" onClick={() => {}} role="button" />
/* eslint-disable jsx-a11y/no-static-element-interactions */
class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false, ready: false };

    const { isOpen, onToggleActive } = props;
    const isIndependentMenu = isOpen === null && onToggleActive === null;
    if (!(isIndependentMenu || isControlledMenu(isOpen, onToggleActive))) {
      throw new Error(
        `Menu has invalid props:
          Both isOpen and onToggleActive need to be defined (controlled menu),
          or neither of them (menu uses its own state management).`
      );
    }

    this.onBlur = this.onBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.prepareChildren = this.prepareChildren.bind(this);
    this.positionStyleForMenuContent = this.positionStyleForMenuContent.bind(this);
    this.positionStyleForArrow = this.positionStyleForArrow.bind(this);

    this.menu = null;
    this.menuContent = null;
  }
  componentDidMount() {
    // Menu needs to know about DOM before it can calculate it's size proberly.
    this.setState({ ready: true });
  }

  onBlur(event) {
    // FocusEvent is fired faster than the link elements native click handler
    // gets its own event. Therefore, we need to check the origin of this FocusEvent.
    if (!this.menu.contains(event.relatedTarget)) {
      const { isOpen, onToggleActive } = this.props;

      if (isControlledMenu(isOpen, onToggleActive)) {
        onToggleActive(false);
      } else {
        this.setState({ isOpen: false });
      }
    }
  }

  onKeyDown(e) {
    // Gather all escape presses to close menu
    if (e.keyCode === KEY_CODE_ESCAPE) {
      this.toggleOpen(false);
    }
  }

  toggleOpen(enforcedState) {
    // If state is handled outside of Menu component, we call a passed in onToggleActive func
    const { isOpen, onToggleActive } = this.props;
    if (isControlledMenu(isOpen, onToggleActive)) {
      const isMenuOpen = enforcedState != null ? enforcedState : !isOpen;
      onToggleActive(isMenuOpen);
    } else {
      // If state is handled inside of Menu component, set state
      this.setState(prevState => {
        const isMenuOpen = enforcedState != null ? enforcedState : !prevState.isOpen;
        return { isOpen: isMenuOpen };
      });
    }
  }

  positionStyleForMenuContent(contentPosition) {
    if (this.menu && this.menuContent) {
      const windowWidth = window.innerWidth;
      const rect = this.menu.getBoundingClientRect();

      // Calculate wether we should show the menu to the left of the component or right
      const distanceToRight = windowWidth - rect.right;
      const menuWidth = this.menu.offsetWidth;
      const contentWidthBiggerThanLabel = this.menuContent.offsetWidth - menuWidth;
      const usePositionLeftFromLabel = contentPosition === CONTENT_TO_LEFT;
      const contentPlacementOffset = this.props.contentPlacementOffset;

      if (windowWidth <= MAX_MOBILE_SCREEN_WIDTH) {
        // Take full screen width on mobile
        return {
          left: -1 * (rect.left - 24),
          width: 'calc(100vw - 48px)',
        };
      }

      // Render menu content to the left according to the contentPosition
      // prop or if the content does not fit to the right. Otherwise render to
      // the right.
      return usePositionLeftFromLabel || distanceToRight < contentWidthBiggerThanLabel
        ? { right: contentPlacementOffset, minWidth: menuWidth }
        : { left: contentPlacementOffset, minWidth: menuWidth };
    }

    // When the MenuContent is rendered for the first time
    // (for the sake of width calculation),
    // move it outside of viewport to prevent possible overflow.
    return this.state.isOpen ? {} : { left: '-10000px' };
  }

  positionStyleForArrow(isPositionedRight) {
    if (this.menu) {
      const menuWidth = this.menu.offsetWidth;
      const contentPlacementOffset = this.props.contentPlacementOffset;
      return isPositionedRight
        ? Math.floor(menuWidth / 2) - contentPlacementOffset
        : Math.floor(menuWidth / 2);
    }
    return 0;
  }

  prepareChildren() {
    if (React.Children.count(this.props.children) !== 2) {
      throw new Error('Menu needs to have two children: MenuLabel and MenuContent.');
    }

    return React.Children.map(this.props.children, child => {
      const { isOpen: isOpenProp, onToggleActive } = this.props;
      const isOpen = isControlledMenu(isOpenProp, onToggleActive) ? isOpenProp : this.state.isOpen;

      if (child.type === MenuLabel) {
        // MenuLabel needs toggleOpen function
        // We pass that directly  so that component user doesn't need to worry about that
        return React.cloneElement(child, {
          isOpen,
          onToggleActive: this.toggleOpen,
        });
      } else if (child.type === MenuContent) {
        // MenuContent needs some styling data (width, arrowPosition, and isOpen info)
        // We pass those directly so that component user doesn't need to worry about those.
        const { contentPosition, useArrow } = this.props;
        const positionStyles = this.positionStyleForMenuContent(contentPosition);
        const arrowPosition = useArrow
          ? this.positionStyleForArrow(positionStyles.right != null)
          : null;
        return React.cloneElement(child, {
          arrowPosition,
          contentRef: node => {
            this.menuContent = node;
          },
          isOpen,
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
    const menuChildren = this.state.ready ? this.prepareChildren() : null;

    return (
      <div
        className={classes}
        onBlur={this.onBlur}
        tabIndex={0}
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

Menu.defaultProps = {
  className: null,
  rootClassName: '',
  contentPlacementOffset: CONTENT_PLACEMENT_OFFSET,
  contentPosition: CONTENT_TO_RIGHT,
  isOpen: null,
  onToggleActive: null,
  useArrow: true,
};

const { bool, func, node, number, string } = PropTypes;

Menu.propTypes = {
  children: node.isRequired,
  className: string,
  rootClassName: string,
  contentPosition: string,
  contentPlacementOffset: number,
  useArrow: bool,
  isOpen: bool,
  onToggleActive: func,
};

export default Menu;
