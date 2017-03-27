import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { Input } from '../../components';

import css from './LabeledField.css';

const LabeledField = props => {
  const { label, name, type } = props;

  return (
    <div>
      <label className={css.label} htmlFor={name}>{label}</label>
      <Field name={name} component={Input.fieldComponent} type={type} />
    </div>
  );
};

LabeledField.defaultProps = {
  type: 'input',
};

const { string } = PropTypes;

LabeledField.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  type: string,
};

export default LabeledField;
