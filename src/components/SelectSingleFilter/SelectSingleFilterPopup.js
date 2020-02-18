import React, { Component } from 'react';
import { string, func, array, number } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import { Menu, MenuContent, MenuItem, MenuLabel } from '..';
import css from './SelectSingleFilterPopup.css';

const flattenOptions = options => {
  return options.reduce((acc, o) => {
    o.children && o.children.length
      ? o.children.map(c => acc.push(c))
      : acc.push(o)

    return acc
  }, [])
};

const optionLabel = (options, key) => {
  const flattened = flattenOptions(options);
  const option = flattened.find(o => o.key === key);
  return option ? option.label : key;
};

const CategoryItems = (urlParam, initialValue, selectOption, options) => {
  const item = option => {
    // check if this option is selected
    const selected = initialValue === option.key;

    // menu item border class
    const menuItemBorderClass = selected ? css.menuItemBorderSelected : css.menuItemBorder;

    return (
      <MenuItem key={option.key}>
        <button
          className={css.menuItem}
          onClick={() => selectOption(urlParam, option.key)}
        >
          <span className={menuItemBorderClass} />
          {option.label}
        </button>
      </MenuItem>
    )
  }

  return options.map((option, index) => {
    if (option.children && option.children.length) return (
      <ul className={css.menuContent} key={`${index}.${option.label}`}>
        <li className={css.menuItem}><h3>{option.label}</h3></li>
        {option.children.map((c, i) => (item(c)))}
      </ul>
    );

    if (option.key) return item(option)
    return null
  })
};



class SelectSingleFilterPopup extends Component {
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
      urlParam,
      label,
      options,
      initialValue,
      contentPlacementOffset,
    } = this.props;

    // resolve menu label text and class
    const menuLabel = initialValue ? optionLabel(options, initialValue) : label;
    const menuLabelClass = initialValue ? css.menuLabelSelected : css.menuLabel;

    const classes = classNames(rootClassName || css.root, className);

    return (
      <Menu
        className={classes}
        useArrow={false}
        contentPlacementOffset={contentPlacementOffset}
        onToggleActive={this.onToggleActive}
        isOpen={this.state.isOpen}
      >
        <MenuLabel className={menuLabelClass}>{menuLabel}</MenuLabel>
        <MenuContent className={css.menuContent}>


          { CategoryItems(urlParam, initialValue, this.selectOption, options)  }

          <MenuItem key={'clearLink'}>
            <button className={css.clearMenuItem} onClick={() => this.selectOption(urlParam, null)}>
              <FormattedMessage id={'SelectSingleFilter.popupClear'} />
            </button>
          </MenuItem>
        </MenuContent>
      </Menu>
    );
  }
}

SelectSingleFilterPopup.defaultProps = {
  rootClassName: null,
  className: null,
  initialValue: null,
  contentPlacementOffset: 0,
};

SelectSingleFilterPopup.propTypes = {
  rootClassName: string,
  className: string,
  urlParam: string.isRequired,
  label: string.isRequired,
  onSelect: func.isRequired,
  options: array.isRequired,
  initialValue: string,
  contentPlacementOffset: number,
};

export default SelectSingleFilterPopup;
