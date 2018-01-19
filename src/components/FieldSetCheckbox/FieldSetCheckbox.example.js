import React from 'react';
import { reduxForm, propTypes as formPropTypes } from 'redux-form';
import { Button } from '../../components';
import FieldSetCheckbox from './FieldSetCheckbox';

const formName = 'Styleguide.FieldSetCheckbox.Form';

const legend = <h3>Amenities</h3>;

const componentProps = {
  name: 'amenities',
  legend: legend,
  options: [
    {
      name: 'towels',
      text: 'Towels',
    },
    {
      name: 'bathroom',
      text: 'Bathfoom',
    },
    {
      name: 'swimming_pool',
      text: 'Swimming pool',
    },
    {
      name: 'own_drinks',
      text: 'Own drinks allowed',
    },
    {
      name: 'jacuzzi',
      text: 'Jacuzzi',
    },
    {
      name: 'audiovisual_entertainment',
      text: 'Audiovisual entertainment',
    },
    {
      name: 'barbeque',
      text: 'Barbeque',
    },
    {
      name: 'own_food_allowed',
      text: 'Own food allowed',
    },
  ],
  twoColumns: true,
};

const FormComponent = props => {
  const { form, handleSubmit, invalid, pristine, submitting } = props;

  const submitDisabled = invalid || pristine || submitting;

  return (
    <form onSubmit={handleSubmit}>
      <FieldSetCheckbox {...componentProps} />

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
