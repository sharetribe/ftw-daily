import React, { Component } from 'react';
import { arrayOf, func, node, number, object, shape, string } from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import { Menu, MenuContent, MenuItem, MenuLabel } from '..';
import css from './SelectSingleFilterPopup.module.css';

//NOTE v2s1 filterupdate -- customizations removed in v5 update
// const flattenOptions = options => {
//   return options.reduce((acc, o) => {
//     o.children && o.children.length
//       ? o.children.map(c => acc.push(c))
//       : acc.push(o)
//
//     return acc
//   }, [])
// };

const optionLabel = (options, key) => {
  //NOTE v2s1 filterupdate -- customizations removed in v5 update
  // const flattened = flattenOptions(options);
  // const option = flattened.find(o => o.key === key);
  const option = options.find(o => o.key === key);
  return option ? option.label : key;
};

const getQueryParamName = queryParamNames => {
  return Array.isArray(queryParamNames) ? queryParamNames[0] : queryParamNames;
};

// NOTE v2s1 filterupdate -- call to it commented out below, prev custom nested filters, added this
// const CategoryItems = (urlParam, initialValue, selectOption, options) => {
//   const item = option => {
//     // check if this option is selected
//     const selected = initialValue === option.key;
//
//     // menu item border class
//     const menuItemBorderClass = selected ? css.menuItemBorderSelected : css.menuItemBorder;
//
//     return (
//       <MenuItem key={option.key}>
//         <button
//           className={css.menuItem}
//           onClick={() => selectOption(urlParam, option.key)}
//         >
//           <span className={menuItemBorderClass} />
//           {option.label}
//         </button>
//       </MenuItem>
//     )
//   }
//
//   return options.map((option, index) => {
//     if (option.children && option.children.length) return (
//       <ul className={css.menuContent} key={`${index}.${option.label}`}>
//         <li className={css.menuItem}><h3>{option.label}</h3></li>
//         {option.children.map((c, i) => (item(c)))}
//       </ul>
//     );
//
//     if (option.key) return item(option)
//     return null
//   })
// };

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

  selectOption(queryParamName, option) {
    this.setState({ isOpen: false });
    this.props.onSelect({ [queryParamName]: option });
  }

  render() {
    const {
      rootClassName,
      className,
      label,
      options,
      queryParamNames,
      initialValues,
      contentPlacementOffset,
    } = this.props;

    const queryParamName = getQueryParamName(queryParamNames);
    const initialValue =
      initialValues && initialValues[queryParamNames] ? initialValues[queryParamNames] : null;

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

          {/* NOTE v2s1 filterupdate -- prev custom nested filters, added this */}
          {/* { CategoryItems(urlParam, initialValue, this.selectOption, options)  } */}

          {options.map(option => {
            // check if this option is selected
            const selected = initialValue === option.key;
            // menu item border class
            const menuItemBorderClass = selected ? css.menuItemBorderSelected : css.menuItemBorder;

            return (
              <MenuItem key={option.key}>
                <button
                  className={css.menuItem}
                  onClick={() => this.selectOption(queryParamName, option.key)}
                >
                  <span className={menuItemBorderClass} />
                  {option.label}
                </button>
              </MenuItem>
            );
          })}
          <MenuItem key={'clearLink'}>
            <button
              className={css.clearMenuItem}
              onClick={() => this.selectOption(queryParamName, null)}
            >
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
  initialValues: null,
  contentPlacementOffset: 0,
};

SelectSingleFilterPopup.propTypes = {
  rootClassName: string,
  className: string,
  queryParamNames: arrayOf(string).isRequired,
  label: node.isRequired,
  onSelect: func.isRequired,
  // NOTE v2s1 filterupdate -- with custom nested filters, used to be this
  // options: array.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  // initialValues: object,
  contentPlacementOffset: number,
};

export default SelectSingleFilterPopup;
