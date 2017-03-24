import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import { Input } from '../../components';

import css from './TextFieldOneLiner.css';

const TextFieldOneLiner = props => {
  const { label, name, type } = props;

  return (
    <div>
      <label className={css.label} htmlFor={name}>{label}</label>
      <Field name={name} component={Input.fieldComponent} type={type} />
    </div>
  );
};

TextFieldOneLiner.defaultProps = {
  type: "input",
}

const { string } = PropTypes;

TextFieldOneLiner.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  type: string,
}

export default TextFieldOneLiner;
