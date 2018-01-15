import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';

import config from '../../config';
import { Menu, MenuContent, MenuItem, MenuLabel } from '../../components';
import css from './SelectSingleFilter.css';

class SelectSingleFilterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.onToggleActive = this.onToggleActive.bind(this);
    this.selectOption = this.selectOption.bind(this);
  }

  onToggleActive(isOpen) {
    this.setState({ isOpen: isOpen });
  }

  selectOption(customAttribute, option) {
    this.setState({ isOpen: false });
    this.props.onSelect(customAttribute, option);
  }

  render() {
    const { rootClassName, className, customAttribute, urlQueryParams, intl } = this.props;

    // custom attribute content
    const ca = customAttribute && config.customAttributes[customAttribute];
    // name of the corresponding query parameter
    const caParam = `ca_${customAttribute}`;
    // current value of this custom attribute filter
    const currentValue = urlQueryParams[caParam];

    // resolve menu label text and class
    const menuLabel = currentValue
      ? intl.formatMessage({ id: `SelectSingleFilter.category.option.${currentValue}` })
      : intl.formatMessage({ id: `SelectSingleFilter.${customAttribute}.label` });
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
          {ca.values.map(v => {
            // check if this option is selected
            const selected = currentValue === v;
            // menu item border class
            const menuItemBorderClass = selected ? css.menuItemBorderSelected : css.menuItemBorder;

            return (
              <MenuItem key={v}>
                <button
                  className={css.menuItem}
                  onClick={() => this.selectOption(customAttribute, v)}
                >
                  <span className={menuItemBorderClass} />
                  <FormattedMessage id={`SelectSingleFilter.category.option.${v}`} />
                </button>
              </MenuItem>
            );
          })}
          <MenuItem key={'clearLink'}>
            <button
              className={css.clearMenuItem}
              onClick={() => this.selectOption(customAttribute, null)}
            >
              <FormattedMessage id={'SelectSingleFilter.clear'} />
            </button>
          </MenuItem>
        </MenuContent>
      </Menu>
    );
  }
}

const { object, string, func } = PropTypes;

SelectSingleFilterComponent.defaultProps = {
  rootClassName: null,
  className: null,
};

SelectSingleFilterComponent.propTypes = {
  rootClassName: string,
  className: string,
  customAttribute: string.isRequired,
  urlQueryParams: object.isRequired,
  onSelect: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SelectSingleFilter = injectIntl(SelectSingleFilterComponent);

export default SelectSingleFilter;
