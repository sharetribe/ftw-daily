/* eslint-disable  no-console */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, propTypes as formPropTypes } from 'redux-form';
import { Button } from '../../components';
import StripeBankAccountToken from './StripeBankAccountToken';
import { required } from '../../util/validators';
import config from '../../config';

const invalidCountries = ['RU', 'CX', 'invalid'];
const countries = config.stripe.supportedCountries.concat(invalidCountries);
const currencies = ['USD', 'EUR'];

const FormComponent = props => {
  const { handleSubmit, pristine, submitting, country, currency } = props;
  return (
    <form onSubmit={handleSubmit}>
      <p>Select country and currency:</p>
      <Field name="country" component="select">
        {countries.map(c => <option key={c} value={c}>{c}</option>)}
      </Field>
      <Field name="currency" component="select">
        {currencies.map(c => <option key={c} value={c}>{c}</option>)}
      </Field>
      {country && currency
        ? <Field
            name="bankAccountToken"
            props={{ country, currency }}
            component={StripeBankAccountToken}
            validate={required('Bank account number required')}
          />
        : null}
      <Button style={{ marginTop: '1rem' }} type="submit" disabled={pristine || submitting}>
        Submit
      </Button>
    </form>
  );
};

FormComponent.propTypes = formPropTypes;

const formName = 'Styleguide.StripeBankAccountToken.Form';

const Form = reduxForm({
  form: formName,
  initialValues: { country: 'FI', currency: 'EUR' },
})(FormComponent);

// Since the account number field depends on the country and currency
// field values, we must select the current values from the Redux
// store to pass on to the FormComponent as props.
//
// See: http://redux-form.com/6.5.0/examples/selectingFormValues/
const selector = formValueSelector(formName);
const mapStateToProps = state => selector(state, 'country', 'currency');
const ConnectedForm = connect(mapStateToProps)(Form);

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { token: '' };
  }
  render() {
    const onSubmit = values => {
      console.log('submit form:', values);
      this.setState({ token: values.bankAccountToken });
    };
    return (
      <div>
        <ConnectedForm onSubmit={onSubmit} />
        {this.state.token ? <p>Token: {this.state.token}</p> : null}
      </div>
    );
  }
}

export const Empty = {
  component: FormContainer,
};
