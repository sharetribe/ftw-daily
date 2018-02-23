import React from 'react';
import { arrayOf, bool, node, shape, string } from 'prop-types';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';

import { FieldGroupCheckbox, Form } from '../../components';

const SelectMultipleFilterPlainFormComponent = props => {
  const { form, className, name, options, twoColumns } = props;

  return (
    <Form className={className}>
      <FieldGroupCheckbox
        name={name}
        id={`${form}.${name}`}
        options={options}
        twoColumns={twoColumns}
      />
    </Form>
  );
};

SelectMultipleFilterPlainFormComponent.defaultProps = {
  className: null,
  twoColumns: false,
};

SelectMultipleFilterPlainFormComponent.propTypes = {
  ...formPropTypes,
  className: string,
  name: string.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: node.isRequired,
    })
  ).isRequired,
  twoColumns: bool,
};

const SelectMultipleFilterPlainForm = reduxForm({})(SelectMultipleFilterPlainFormComponent);

export default SelectMultipleFilterPlainForm;
