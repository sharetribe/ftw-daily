import React from 'react';
import { arrayOf, bool, node, shape, string, func } from 'prop-types';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

import { FieldCheckboxGroup, Form } from '../../components';

const SelectMultipleFilterPlainForm = props => {
  const { onChange, ...rest } = props;

  const handleChange = formState => {
    if (formState.dirty) {
      onChange(formState.values);
    }
  };

  return (
    <FinalForm
      {...rest}
      onSubmit={() => null}
      mutators={{ ...arrayMutators }}
      render={formRenderProps => {
        const { className, id, name, options, twoColumns } = formRenderProps;
        return (
          <Form className={className}>
            <FormSpy onChange={handleChange} subscription={{ values: true, dirty: true }} />
            <FieldCheckboxGroup name={name} id={id} options={options} twoColumns={twoColumns} />
          </Form>
        );
      }}
    />
  );
};

SelectMultipleFilterPlainForm.defaultProps = {
  className: null,
  twoColumns: false,
  onChange: () => null,
};

SelectMultipleFilterPlainForm.propTypes = {
  className: string,
  id: string.isRequired,
  name: string.isRequired,
  options: arrayOf(
    shape({
      key: string.isRequired,
      label: node.isRequired,
    })
  ).isRequired,
  twoColumns: bool,
  onChange: func,
};

export default SelectMultipleFilterPlainForm;
