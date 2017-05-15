import React, { Component, PropTypes } from 'react';
import { Input, ValidationError } from '../components';

/**
 * Hoc to convert a component used within a Field to one that renders
 * a label and possible errors.
 *
 * @param {Component|String} Comp component or a String that is used
 * to create an input element
 *
 * @param {Object} options extra class names to inject to the child
 * components
 *
 * @return {Component} new component that wraps the given one with a
 * label and possible errors
 */
export const enhancedField = (Comp, options = {}) => {
  const { rootClassName = '', labelClassName = '', errorClassName = '' } = options;

  class EnhancedField extends Component {
    componentWillUnmount() {
      if (this.props.clearOnUnmount) {
        this.props.input.onChange('');
      }
    }
    render() {
      /* eslint-disable no-unused-vars */
      const { clearOnUnmount, ...restProps } = this.props;
      /* eslint-enable no-unused-vars */
      const { input, type, label, placeholder, meta, ...otherProps } = restProps;

      let component = null;

      if (typeof Comp !== 'string') {
        component = <Comp {...restProps} />;
      } else if (Comp === 'textarea') {
        component = <textarea {...otherProps} {...input} placeholder={placeholder} />;
      } else {
        component = <Input {...otherProps} {...input} type={type} placeholder={placeholder} />;
      }
      const labelInfo = label
        ? <label className={labelClassName} htmlFor={input.name}>{label}</label>
        : null;

      return (
        <div className={rootClassName}>
          {labelInfo}
          {component}
          <ValidationError className={errorClassName} fieldMeta={meta} />
        </div>
      );
    }
  }

  let displayName = Comp;
  if (Comp && typeof Comp !== 'string') {
    displayName = Comp.displayName || Comp.name;
  }
  EnhancedField.displayName = `EnhancedField(${displayName})`;

  EnhancedField.defaultProps = { type: null, placeholder: '', label: null, clearOnUnmount: false };

  const { shape, func, string, object, bool } = PropTypes;

  EnhancedField.propTypes = {
    input: shape({
      onChange: func.isRequired,
      name: string.isRequired,
    }).isRequired,
    type: string,
    label: string,
    placeholder: string,
    meta: object.isRequired,
    clearOnUnmount: bool,
  };

  return EnhancedField;
};
