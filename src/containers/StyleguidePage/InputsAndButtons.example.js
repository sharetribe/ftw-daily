/* eslint-disable no-console, jsx-a11y/href-no-hash */
import React from 'react';
import { Field, reduxForm, propTypes as formPropTypes } from 'redux-form';
import * as validators from '../../util/validators';
import { InputField } from '../../components';

import css from './InputsAndButtons.css';

const InputsFormComponent = props => {
  const { handleSubmit, pristine, submitting } = props;
  const required = validators.required('Required value missing');
  const buttonStyles = { marginTop: 24 };
  const submitDisabled = pristine || submitting;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="input1"
        type="text"
        label="Label for required input"
        placeholder="Placeholder..."
        validate={required}
        component={InputField}
      />
      <Field
        name="input2"
        type="text"
        label="Example input label"
        placeholder="Example input placeholder..."
        component={InputField}
      />
      <Field
        name="input3"
        type="text"
        placeholder="No label in this input..."
        component={InputField}
      />
      <Field
        name="input4"
        type="text"
        label="Label for input with initial value"
        component={InputField}
      />
      <Field
        name="textarea1"
        type="textarea"
        label="Label for textarea"
        placeholder="Textarea placeholder..."
        validate={required}
        component={InputField}
      />
      <button type="submit" disabled={submitDisabled} style={buttonStyles}>Submit form</button>
    </form>
  );
};

InputsFormComponent.propTypes = formPropTypes;

const defaultFormName = 'Styleguide.InputsAndButtons.InputsForm';

const InputsForm = reduxForm({
  form: defaultFormName,
})(InputsFormComponent);

const InputsExample = () => {
  const handleSubmit = values => {
    console.log('submit values:', values);
  };
  return (
    <div>
      <h2>Default inputs:</h2>
      <input className={css.withTopMargin} name="input1" placeholder="Default input" />
      <textarea className={css.withTopMargin} name="textarea1" placeholder="Default textarea" />
      <h2>Form with inputs:</h2>
      <InputsForm onSubmit={handleSubmit} />
    </div>
  );
};

const preventDefault = e => {
  e.preventDefault();
};

const ButtonsExample = () => {
  return (
    <div>
      <div className={css.withTopMargin}>
        Lorem ipsum <a href="#" onClick={preventDefault}>Link that looks like a link</a> dolor sit amet
      </div>
      <div className={css.withTopMargin}>
        Lorem ipsum <button className={css.buttonThatLooksLikeLink}>Button that looks like a link</button> dolor sit amet
      </div>
      <div className={css.withTopMargin}>
        <a className={css.linkThatLooksLikeButton} onClick={preventDefault} href="#">
          Link that looks like a button
        </a>
      </div>
      <button className={css.withTopMargin}>Button that look like a button</button>
      <button className={css.withTopMargin} disabled>Disabled button</button>
    </div>
  );
};

export const Inputs = {
  component: InputsExample,
  group: 'inputs and buttons',
};

export const Buttons = {
  component: ButtonsExample,
  group: 'inputs and buttons',
};
