import React from 'react';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button } from '../../components';
import FieldGroupCheckbox from './FieldGroupCheckbox';

const formName = 'Styleguide.FieldGroupCheckboxForm';

const label = <h3>Amenities</h3>;

const componentProps = {
  id: `${formName}.amenities`,
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

const FormComponent = props => {
  const { handleSubmit, invalid, pristine, submitting } = props;

  const submitDisabled = invalid || pristine || submitting;

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

const Form = reduxForm({
  form: formName,
})(FormComponent);

export const WithTwoColumns = {
  component: Form,
  props: {
    onSubmit: values => {
      console.log('Submit values: ', values);
    },
  },
  group: 'inputs',
};
