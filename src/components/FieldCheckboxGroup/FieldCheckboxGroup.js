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
import { FieldArray } from 'react-final-form-arrays';
import { FieldCheckbox, ValidationError } from '../../components';
import ReactTooltip from 'react-tooltip';
import css from './FieldCheckboxGroup.css';

const FieldCheckboxRenderer = props => {
  const {
    className,
    rootClassName,
    label,
    threeColumns,
    id,
    fields,
    options,
    meta,
    handleChange,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  // const listClasses = twoColumns ? classNames(css.list, css.twoColumns) : css.list;
  const listClasses = threeColumns ? classNames(css.list, css.threeColumns) : css.list;

  return (
    <fieldset className={classes}>
      {label ? <legend>{label}</legend> : null}
      <ul className={listClasses}>
        {options.map((option, index) => {
          // console.log('index',index);
          const fieldId = `${id}.${option.key}`;
          const tip = `${option.tip}`;
          return handleChange ? (
            <li key={fieldId} className={css.item} onClick={() => handleChange(index)}>
              <FieldCheckbox
                id={fieldId}
                name={fields.name}
                label={option.label}
                value={option.key}
              />
            </li>
          ) : (
            <li data-tip="" data-for={fieldId} key={fieldId} className={css.item}>
              <FieldCheckbox
                id={fieldId}
                name={fields.name}
                label={option.label}
                value={option.key}
              />
              {option.tip ? (
                <ReactTooltip id={fieldId} className={css.customTip} effect="solid">
                  <span className={css.tipColor}>{tip}</span>
                </ReactTooltip>
              ) : null}
            </li>
          );
        })}
      </ul>
      <ValidationError fieldMeta={{ ...meta }} />
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

const FieldCheckboxGroup = props => {
  return <FieldArray component={FieldCheckboxRenderer} {...props} />;
};

// Name and component are required fields for FieldArray.
// Component-prop we define in this file, name needs to be passed in
FieldCheckboxGroup.propTypes = {
  name: string.isRequired,
};

export default FieldCheckboxGroup;
