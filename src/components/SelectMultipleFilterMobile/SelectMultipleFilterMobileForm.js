import React from 'react';
import { arrayOf, shape, string, node } from 'prop-types';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';

import { FieldGroupCheckbox, Form } from '../../components';

const SelectMultipleFilterMobileFormComponent = props => {
  const { form, className, name, options } = props;

  return (
    <Form className={className}>
      <FieldGroupCheckbox name={name} id={`${form}.${name}`} options={options} />
    </Form>
  );
};

SelectMultipleFilterMobileFormComponent.defaultProps = {
  className: null,
};

SelectMultipleFilterMobileFormComponent.propTypes = {
  ...formPropTypes,
  className: string,
  name: string.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: node.isRequired,
    })
  ).isRequired,
};

const SelectMultipleFilterMobileForm = reduxForm({})(SelectMultipleFilterMobileFormComponent);

export default SelectMultipleFilterMobileForm;
