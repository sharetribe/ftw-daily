import React from 'react';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button } from '../../components';
import FieldGroupCheckbox from './FieldGroupCheckbox';
import { requiredFieldArrayCheckbox } from '../../util/validators';

const formName = 'Styleguide.FieldGroupCheckboxForm';
const formNameRequired = 'Styleguide.FieldGroupCheckboxFormRequired';

const label = <h3>Amenities</h3>;

const commonProps = {
  label: label,
  options: [
    {
      key: 'towels',
      label: 'Towels',
    },
    {
      key: 'bathroom',
      label: 'Bathroom',
    },
    {
      key: 'swimming_pool',
      label: 'Swimming pool',
    },
    {
      key: 'own_drinks',
      label: 'Own drinks allowed',
    },
    {
      key: 'jacuzzi',
      label: 'Jacuzzi',
    },
    {
      key: 'audiovisual_entertainment',
      label: 'Audiovisual entertainment',
    },
    {
      key: 'barbeque',
      label: 'Barbeque',
    },
    {
      key: 'own_food_allowed',
      label: 'Own food allowed',
    },
  ],
  twoColumns: true,
};

const optionalProps = {
  name: 'amenities-optional',
  id: `${formName}.amenities-optional`,
  ...commonProps,
};

const requiredProps = {
  name: 'amenities-required',
  id: `${formNameRequired}.amenities-required`,
  ...commonProps,
  validate: requiredFieldArrayCheckbox('this is required'),
};

const FormComponent = props => {
  const { handleSubmit, invalid, submitting, componentProps } = props;

  const submitDisabled = invalid || submitting;

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroupCheckbox {...componentProps} />

      <Button style={{ marginTop: 24 }} type="submit" disabled={submitDisabled}>
        Submit
      </Button>
    </form>
  );
};

FormComponent.propTypes = formPropTypes;

const Form = formName => {
  return reduxForm({
    form: formName,
  })(FormComponent);
};

export const Optional = {
  component: Form(formName),
  props: {
    onSubmit: values => {
      console.log('Submit values: ', values);
    },
    componentProps: optionalProps,
  },
  group: 'inputs',
};

export const Required = {
  component: Form(formNameRequired),
  props: {
    onSubmit: values => {
      console.log('Submit values: ', values);
    },
    componentProps: requiredProps,
  },
  group: 'inputs',
};
