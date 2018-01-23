/*
 * Renders a set of options with selected and non-selected values.
 *
 * The corresponding component when selecting the values is
 * FieldGroupCheckbox.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { includes } from 'lodash';

import css from './PropertyGroup.css';

const checkSelected = (options, selectedOptions) => {
  return options.map(option => ({
    text: option.text,
    value: option.value,
    isSelected: includes(selectedOptions, option.value),
  }));
};

const IconCheck = props => {
  const isVisible = props.isVisible;
  const classes = isVisible ? css.checkIcon : classNames(css.checkIcon, css.hidden);

  return (
    <svg width="9" height="9" xmlns="http://www.w3.org/2000/svg" className={classes}>
      <path
        className={css.marketplaceFill}
        d="M2.636621 7.7824771L.3573694 5.6447948c-.4764924-.4739011-.4764924-1.2418639 0-1.7181952.4777142-.473901 1.251098-.473901 1.7288122 0l1.260291 1.1254783L6.1721653.505847C6.565577-.0373166 7.326743-.1636902 7.8777637.227582c.5473554.3912721.6731983 1.150729.2797866 1.6951076L4.4924979 7.631801c-.2199195.306213-.5803433.5067096-.9920816.5067096-.3225487 0-.6328797-.1263736-.8637952-.3560334z"
        fillRule="evenodd"
      />
    </svg>
  );
};

const Item = props => {
  const { text, isSelected } = props;
  const textClass = isSelected ? css.selectedText : css.notSelectedText;
  return (
    <li className={css.item}>
      <div className={css.iconWrapper}>
        <IconCheck isVisible={isSelected} />
      </div>
      <div className={css.textWrapper}>
        <span className={textClass}>{text}</span>
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
        <Item key={`${id}.${option.value}`} text={option.text} isSelected={option.isSelected} />
      ))}
    </ul>
  );
};

PropertyGroup.defaultProps = {
  rootClassName: null,
  className: null,
  twoColumns: false,
};

const { arrayOf, bool, node, shape, string } = PropTypes;

PropertyGroup.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  options: arrayOf(
    shape({
      value: string.isRequired,
      text: node.isRequired,
    })
  ),
  selectedOptions: arrayOf(string).isRequired,
  twoColumns: bool,
};

export default PropertyGroup;
