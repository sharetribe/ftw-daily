import React, { Component } from 'react';
import { string, func, arrayOf, shape, number } from 'prop-types';
import classNames from 'classnames';

import { Menu, MenuContent, MenuItem, MenuLabel } from '../../components';
import css from './SortByPopup.module.css';

const optionLabel = (options, key) => {
  const option = options.find(o => o.key === key);
  return option ? option.label : key;
};

const SortByIcon = () => {
  return (
    <svg className={css.icon} width="10" height="16" xmlns="http://www.w3.org/2000/svg">
      <g
        stroke="#4a4a4a"
        strokeWidth="1.5"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.25 7.125v7.438M5 12.813l-1.75 1.75-1.75-1.75M6.75 8.875V1.438M5 3.188l1.75-1.75 1.75 1.75" />
      </g>
    </svg>
  );
};

class SortByPopup extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.onToggleActive = this.onToggleActive.bind(this);
    this.selectOption = this.selectOption.bind(this);
  }

  onToggleActive(isOpen) {
    this.setState({ isOpen: isOpen });
  }

  selectOption(urlParam, option) {
    this.setState({ isOpen: false });
    this.props.onSelect(urlParam, option);
  }

  render() {
    const {
      rootClassName,
      className,
      menuLabelRootClassName,
      urlParam,
      label,
      options,
      initialValue,
      contentPlacementOffset,
    } = this.props;

    // resolve menu label text and class
    const menuLabel = initialValue ? optionLabel(options, initialValue) : label;

    const classes = classNames(rootClassName || css.root, className);
    const menuLabelClasses = classNames(menuLabelRootClassName || css.menuLabel);

    return (
      <Menu
        className={classes}
        useArrow={false}
        contentPlacementOffset={contentPlacementOffset}
        onToggleActive={this.onToggleActive}
        isOpen={this.state.isOpen}
      >
        <MenuLabel className={menuLabelClasses}>
          <SortByIcon />
          {menuLabel}
        </MenuLabel>
        <MenuContent className={css.menuContent}>
          <MenuItem key="sort-by">
            <h4 className={css.menuHeading}>{label}</h4>
          </MenuItem>
          {options.map(option => {
            // check if this option is selected
            const selected = initialValue === option.key;
            // menu item border class
            const menuItemBorderClass = selected ? css.menuItemBorderSelected : css.menuItemBorder;

            return (
              <MenuItem key={option.key}>
                <button
                  className={css.menuItem}
                  disabled={option.disabled}
                  onClick={() => (selected ? null : this.selectOption(urlParam, option.key))}
                >
                  <span className={menuItemBorderClass} />
                  {option.longLabel || option.label}
                </button>
              </MenuItem>
            );
          })}
        </MenuContent>
      </Menu>
    );
  }
}

SortByPopup.defaultProps = {
  rootClassName: null,
  className: null,
  menuLabelRootClassName: null,
  initialValue: null,
  contentPlacementOffset: 0,
};

SortByPopup.propTypes = {
  rootClassName: string,
  className: string,
  menuLabelRootClassName: string,
  urlParam: string.isRequired,
  label: string.isRequired,
  onSelect: func.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  initialValue: string,
  contentPlacementOffset: number,
};

export default SortByPopup;
