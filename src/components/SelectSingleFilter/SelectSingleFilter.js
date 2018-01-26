import React, { Component } from 'react';
import { object, string, func, arrayOf, shape } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';

import { Menu, MenuContent, MenuItem, MenuLabel } from '../../components';
import css from './SelectSingleFilter.css';

const optionLabel = (options, key) => {
  const option = options.find(o => o.key === key);
  return option ? option.label : '';
};

class SelectSingleFilter extends Component {
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
    const { rootClassName, className, urlQueryParams, urlParam, paramLabel, options } = this.props;

    // current value of this custom attribute filter
    const currentValue = urlQueryParams[urlParam];

    // resolve menu label text and class
    const menuLabel = currentValue ? optionLabel(options, currentValue) : paramLabel;
    const menuLabelClass = currentValue ? css.menuLabelSelected : css.menuLabel;

    const classes = classNames(rootClassName || css.root, className);

    return (
      <Menu
        className={classes}
        useArrow={false}
        contentPlacementOffset={-14}
        onToggleActive={this.onToggleActive}
        isOpen={this.state.isOpen}
      >
        <MenuLabel className={menuLabelClass}>{menuLabel}</MenuLabel>
        <MenuContent className={css.menuContent}>
          {options.map(option => {
            // check if this option is selected
            const selected = currentValue === option.key;
            // menu item border class
            const menuItemBorderClass = selected ? css.menuItemBorderSelected : css.menuItemBorder;

            return (
              <MenuItem key={option.key}>
                <button
                  className={css.menuItem}
                  onClick={() => this.selectOption(urlParam, option.key)}
                >
                  <span className={menuItemBorderClass} />
                  {option.label}
                </button>
              </MenuItem>
            );
          })}
          <MenuItem key={'clearLink'}>
            <button className={css.clearMenuItem} onClick={() => this.selectOption(urlParam, null)}>
              <FormattedMessage id={'SelectSingleFilter.clear'} />
            </button>
          </MenuItem>
        </MenuContent>
      </Menu>
    );
  }
}

SelectSingleFilter.defaultProps = {
  rootClassName: null,
  className: null,
};

SelectSingleFilter.propTypes = {
  rootClassName: string,
  className: string,
  urlQueryParams: object.isRequired,
  urlParam: string.isRequired,
  paramLabel: string.isRequired,
  onSelect: func.isRequired,

  options: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
};

export default SelectSingleFilter;
