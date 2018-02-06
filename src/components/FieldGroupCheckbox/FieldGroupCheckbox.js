/*
 * Renders a group of checkboxes that can be used to select
 * multiple values from a set of options.
 *
 * The corresponding component when rendering the selected
 * values is PropertyGroup.
 *
 */

import React from 'react';
import { arrayOf, bool, node, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FieldArray } from 'redux-form';
import { FieldCheckbox, ValidationError } from '../../components';

import css from './FieldGroupCheckbox.css';

const FieldCheckboxRenderer = props => {
  const { className, rootClassName, label, twoColumns, id, options, fields, meta } = props;
  const name = fields.name;

  // FieldArray doesn't have touched prop, so we fake it to ValidationError
  const touched = !!(meta.dirty || meta.submitFailed);

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
              <FieldCheckbox id={fieldId} name={`${name}.${option.key}`} label={option.label} />
            </li>
          );
        })}
        <ValidationError fieldMeta={{ ...meta, touched }} />
      </ul>
    </fieldset>
  );
};

FieldCheckboxRenderer.defaultProps = {
  rootClassName: null,
  className: null,
  label: null,
  twoColumns: false,
};

FieldCheckboxRenderer.propTypes = {
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

const FieldGroupCheckbox = props => <FieldArray component={FieldCheckboxRenderer} {...props} />;

// Name and component are required fields for FieldArray.
// Component-prop we define in this file, name needs to be passed in
FieldGroupCheckbox.propTypes = {
  name: string.isRequired,
};

export default FieldGroupCheckbox;
