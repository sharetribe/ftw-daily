/*
 * Renders a group of checkboxes that can be used to select
 * multiple values from a set of options.
 *
 * The corresponding component when rendering the selected
 * values is PropertyGroup.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { FieldCheckbox } from '../../components';
import css from './FieldGroupCheckbox.css';

const FieldGroupCheckbox = props => {
  const { rootClassName, className, id, label, options, twoColumns } = props;

  const classes = classNames(rootClassName || css.root, className);
  const listClasses = twoColumns ? classNames(css.list, css.twoColumns) : css.list;

  return (
    <fieldset className={classes}>
      {label ? <legend>{label}</legend> : null}
      <ul className={listClasses}>
        {options.map(option => {
          const fieldId = `${id}.${option.key}`;
          return (
            <li key={fieldId} className={css.item}>
              <FieldCheckbox id={fieldId} name={option.key} label={option.label} />
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
};

FieldGroupCheckbox.defaultProps = {
  rootClassName: null,
  className: null,
  label: null,
  twoColumns: false,
};

const { arrayOf, bool, node, shape, string } = PropTypes;

FieldGroupCheckbox.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  label: node,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: node.isRequired,
    })
  ).isRequired,
  twoColumns: bool,
};

export default FieldGroupCheckbox;
