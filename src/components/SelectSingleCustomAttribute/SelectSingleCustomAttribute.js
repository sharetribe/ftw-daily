import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import { omit } from 'lodash';

import config from '../../config';
import { stringify } from '../../util/urlHelpers';
import { Menu, MenuContent, MenuItem, MenuLabel, NamedLink } from '../../components';
import css from './SelectSingleCustomAttribute.css';

class SelectSingleCustomAttributeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.onToggleActive = this.onToggleActive.bind(this);
  }

  onToggleActive(isOpen) {
    this.setState({ isOpen: isOpen });
  }

  render() {
    const { rootClassName, className, customAttribute, urlQueryParams, intl } = this.props;

    const ca = customAttribute && config.customAttributes[customAttribute];

    // name of the corresponding query parameter
    const caParam = `ca_${customAttribute}`;
    // current value of this custom attribute filter
    const currentValue = urlQueryParams[caParam];
    // query params where this custom attribute is cleared
    const clearUrlQueryParams = omit(urlQueryParams, caParam);
    // query string for clearing this custom attribute
    const clearQueryString = stringify(clearUrlQueryParams);

    // resolve menu label text and class
    const menuLabel = currentValue
      ? intl.formatMessage({ id: `SelectSingleCustomAttribute.category.option.${currentValue}` })
      : intl.formatMessage({ id: `SelectSingleCustomAttribute.${customAttribute}.label` });
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
            // search query string with this option added
            const queryString = stringify({ ...urlQueryParams, [caParam]: v });
            // menu item border class
            const menuItemBorderClass = selected ? css.menuItemBorderSelected : css.menuItemBorder;

            return (
              <MenuItem key={v}>
                <NamedLink className={css.menuItem} name="SearchPage" to={{ search: queryString }}>
                  <span className={menuItemBorderClass} />
                  <FormattedMessage id={`SelectSingleCustomAttribute.category.option.${v}`} />
                </NamedLink>
              </MenuItem>
            );
          })}
          <MenuItem key={'clearLink'}>
            <NamedLink
              className={css.clearMenuItem}
              name="SearchPage"
              to={{ search: clearQueryString }}
            >
              <FormattedMessage id={'SelectSingleCustomAttribute.clear'} />
            </NamedLink>
          </MenuItem>
        </MenuContent>
      </Menu>
    );
  }
}

const { object, string } = PropTypes;

SelectSingleCustomAttributeComponent.defaultProps = {
  rootClassName: null,
  className: null,
};

SelectSingleCustomAttributeComponent.propTypes = {
  rootClassName: string,
  className: string,
  customAttribute: string.isRequired,
  urlQueryParams: object.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const SelectSingleCustomAttribute = injectIntl(SelectSingleCustomAttributeComponent);

export default SelectSingleCustomAttribute;
