/*
 * Renders a group of checkboxes that can be used to select
 * multiple values from a set of options.
 *
 * The corresponding component when rendering the selected
 * values is PropertyGroup.
 *
 */

import React, { Component } from 'react';
import { arrayOf, bool, node, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FieldArray } from 'redux-form';
import { FieldCheckbox, ValidationError } from '../../components';

import css from './FieldGroupCheckbox.css';

class FieldCheckboxRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = { touched: false };
  }

  componentWillReceiveProps(nextProps) {
    // FieldArray doesn't have touched prop, so we'll keep track of it
    if (!this.state.touched) {
      this.setState({ touched: nextProps.meta.dirty });
    }
  }

  render() {
    const { className, rootClassName, label, twoColumns, id, options, fields, meta } = this.props;
    const name = fields.name;

    const touched = this.state.touched;

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
        </ul>
        <ValidationError fieldMeta={{ ...meta, touched }} />
      </fieldset>
    );
  }
}

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
