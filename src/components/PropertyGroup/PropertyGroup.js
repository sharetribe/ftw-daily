/*
 * Renders a set of options with selected and non-selected values.
 *
 * The corresponding component when selecting the values is
 * FieldCheckboxGroup.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import includes from 'lodash/includes';
import {  Icon } from '../../components';
import { amenities } from '../../marketplace-custom-config'
import css from './PropertyGroup.css';

const checkSelected = (options, selectedOptions) => {  
  return options.map(option => ({
    key: option.key,
    label: option.label,
    isSelected: includes(selectedOptions, option.key),
    icon: (amenities.find(category => option.key === category.key) !== undefined) ? 
      amenities.find(category => option.key === category.key).icon : 
      'null'
  }));
};

const Item = props => {
  const { label, isSelected, icon } = props;
  const labelClass = isSelected ? css.selectedLabel : css.notSelectedLabel;
  return (
    <li className={css.item}>
      <span className={css.iconWrapper}>
        <Icon icon={icon}/>
      </span>
      <div className={css.labelWrapper}>
        <span className={labelClass}>{label}</span>
      </div>
    </li>
  );
};

const PropertyGroup = props => {
  const { rootClassName, className, id, options, selectedOptions, twoColumns } = props;
  const classes = classNames(rootClassName || css.root, className);
  const listClasses = twoColumns ? classNames(classes, css.twoColumns) : classes;

  const checked = checkSelected(options, selectedOptions);
  return (
    <ul className={listClasses}>
      {checked.map(option => (
        option.isSelected ? 
          <Item key={`${id}.${option.key}`} label={option.label} isSelected={option.isSelected} icon={option.icon} />:
          null
      ))}
    </ul>
  );
};

PropertyGroup.defaultProps = {
  rootClassName: null,
  className: null,
  selectedOptions: [],
  twoColumns: false,
};

const { arrayOf, bool, node, shape, string } = PropTypes;

PropertyGroup.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: node.isRequired,
    })
  ),
  selectedOptions: arrayOf(string),
  twoColumns: bool,
};

export default PropertyGroup;
