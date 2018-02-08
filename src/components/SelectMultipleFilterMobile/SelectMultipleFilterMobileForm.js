import React from 'react';
import { arrayOf, shape, string, node } from 'prop-types';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';

import { FieldGroupCheckbox, Form } from '../../components';

const SelectMultipleFilterMobileFormComponent = props => {
  const { form, name, options } = props;

  return (
    <Form>
      <FieldGroupCheckbox name={name} id={`${form}.${name}`} options={options} />
    </Form>
  );
};

SelectMultipleFilterMobileFormComponent.defaultProps = {};

SelectMultipleFilterMobileFormComponent.propTypes = {
  ...formPropTypes,
  name: string.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: node.isRequired,
    })
  ).isRequired,
};

const defaultFormName = 'SelectMultipleFilterMobileForm';

export default reduxForm({ form: defaultFormName })(SelectMultipleFilterMobileFormComponent);
