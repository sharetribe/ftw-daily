/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import { Field } from 'react-final-form';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import config from '../../config';

import {
  BANK_ACCOUNT_INPUTS,
  formatFieldMessage,
  requiredInputs,
  mapInputsToStripeAccountKeys,
  supportedCountries,
  translateStripeError,
} from './StripeBankAccountTokenInputField.util';
import StripeBankAccountRequiredInput from './StripeBankAccountRequiredInput';
import css from './StripeBankAccountTokenInputField.module.css';

// Since final-form tracks the onBlur event for marking the field as
// touched (which triggers possible error validation rendering), only
// trigger the event asynchronously when no other input within this
// component has received focus.
//
// This prevents showing the validation error when the user selects a
// value and moves on to another input within this component.
const BLUR_TIMEOUT = 100;
const DEBOUNCE_WAIT_TIME = 1000;
const MIN_INPUT_COUNT_FOR_TWO_COLUMNS = 6;

class TokenInputFieldComponent extends Component {
  constructor(props) {
    super(props);
    const intl = props.intl;

    // Initial state is needed when country (and currency) changes and values need to be cleared.
    this.initialState = {
      stripeError: null,
    };

    // Fill initialState with input type specific data
    BANK_ACCOUNT_INPUTS.forEach(inputType => {
      this.initialState[inputType] = {
        value: '',
        touched: false,
        error: formatFieldMessage(intl, inputType, 'required'),
      };
    });

    this.state = this.initialState;
    this.blurTimeoutId = null;

    // We keep track of the mounted state of the component to avoid
    // setting state or calling callback props if a createToken call
    // finishes after the component is already removed.
    //
    // The correct solution would be to cancel all ongoing operations
    // in componentWillUnmount, but since Promises don't have a
    // cancellation mechanism yet, we must use a different solution
    // for now.
    //
    // See: https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
    this._isMounted = false;

    this.requestToken = debounce(this.requestToken.bind(this), DEBOUNCE_WAIT_TIME);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  componentDidMount() {
    if (!window.Stripe) {
      throw new Error('Stripe must be loaded for StripeBankAccountTokenInputField');
    }
    this.stripe = window.Stripe(config.stripe.publishableKey);
    this._isMounted = true;
  }

  componentDidUpdate(prevProps) {
    const countryChanged = this.props.country !== prevProps.country;
    const currencyChanged = this.props.currency !== prevProps.currency;
    if (countryChanged || currencyChanged) {
      // Clear the possible input values from the state
      // if the given country or currency changes.
      this.setState(this.initialState);
      this.props.input.onChange('');
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.clearTimeout(this.blurTimeoutId);
  }

  /**
   * Request a token from the Stripe API with the given bank account data
   *
   * This function validates the given data and triggers onChange
   * events for the parent form to handle.
   *
   *
   * @param {Object} values - values from different input types
   */
  requestToken(values) {
    const {
      country,
      currency,
      input: { onChange },
      intl,
    } = this.props;

    // First we have to clear the current token value so the parent
    // form doesn't submit with an old value.
    onChange('');

    const inputsNeeded = requiredInputs(country);
    const missingValues = inputsNeeded.filter(inputType => !values[inputType]);
    const invalidValues = inputsNeeded.filter(inputType => !!this.state[inputType].error);

    const numbersMissing = missingValues.length > 0;
    const numbersInvalid = invalidValues.length > 0;

    if (numbersMissing || numbersInvalid) {
      // Incomplete/invalid info, not requesting token
      return;
    }

    // Gather data to be sent to Stripe (to create bank account)
    let accountData = {
      country,
      currency,
    };

    // Include input values with correct stripe keys
    const inputValueObj = mapInputsToStripeAccountKeys(country, values);
    accountData = { ...accountData, ...inputValueObj };

    // https://stripe.com/docs/stripe-js/reference#collecting-bank-account-details
    this.stripe
      .createToken('bank_account', accountData)
      .then(result => {
        if (result.error) {
          const e = new Error(result.error.message);
          e.stripeError = result.error;
          throw e;
        }
        return result.token.id;
      })
      .then(token => {
        // Check if value has changed during async call.
        const changedValues = inputsNeeded.filter(
          inputType => values[inputType] !== this.state[inputType].value
        );
        const valuesAreUnchanged = changedValues.length === 0;

        // Handle response only if the input values haven't changed
        if (this._isMounted && valuesAreUnchanged) {
          this.setState(prevState => {
            return { stripeError: null };
          });

          onChange(token);
        }
      })
      .catch(e => {
        if (!e.stripeError) {
          throw e;
        }
        if (this._isMounted) {
          this.setState({
            stripeError: translateStripeError(country, intl, e.stripeError),
          });
        }
      });
  }

  handleInputChange(e, inputType, country, intl) {
    const value = e.target.value;

    let inputError = null;

    // Validate the changed routing number
    if (!value) {
      inputError = intl.formatMessage({
        id: `StripeBankAccountTokenInputField.${inputType}.required`,
      });
    }

    // Save changes to the state
    this.setState(prevState => {
      const input = { ...prevState[inputType], value, error: inputError };
      return {
        [inputType]: input,
        stripeError: null,
      };
    });

    // Request new bank account token
    const unChangedValues = requiredInputs(country).reduce(
      (acc, iType) => ({ ...acc, [iType]: this.state[iType].value }),
      {}
    );
    this.requestToken({ ...unChangedValues, [inputType]: value });
  }

  handleInputFocus() {
    window.clearTimeout(this.blurTimeoutId);
  }

  handleInputBlur(inputType) {
    this.setState(prevState => {
      const inputData = { ...prevState[inputType], touched: true };
      return { [inputType]: inputData };
    });
    window.clearTimeout(this.blurTimeoutId);
    this.blurTimeoutId = window.setTimeout(this.props.input.onBlur, BLUR_TIMEOUT);
  }

  render() {
    const {
      rootClassName,
      className,
      country,
      formName,
      meta: formMeta,
      intl,
      disabled,
    } = this.props;

    if (!supportedCountries.includes(country)) {
      return (
        <div className={css.unsupportedCountryError}>
          <FormattedMessage
            id="StripeBankAccountTokenInputField.unsupportedCountry"
            values={{ country }}
          />
        </div>
      );
    }

    const hasInputErrors = requiredInputs(country).some(inputType => {
      return (this.state[inputType].touched || formMeta.touched) && !!this.state[inputType].error;
    });

    // Only show Stripe and form errors when the fields don't have
    // more specific errors.
    const showingFieldErrors = hasInputErrors;
    const showStripeError = !!(this.state.stripeError && !showingFieldErrors && formMeta.touched);
    const showFormError = !!(
      formMeta.touched &&
      formMeta.error &&
      !showingFieldErrors &&
      !showStripeError
    );

    const inputConfiguration = requiredInputs(country);

    // E.g. Japan has 6 fields in the bank account details so we want to
    // show the inputs in two columns on bigger screens
    const showInColumns = inputConfiguration.length >= MIN_INPUT_COUNT_FOR_TWO_COLUMNS;

    return (
      <div className={classNames(rootClassName || css.root, className)}>
        {inputConfiguration.map(inputType => {
          return (
            <StripeBankAccountRequiredInput
              disabled={disabled}
              key={inputType}
              inputType={inputType}
              formName={formName}
              value={this.state[inputType].value}
              placeholder={formatFieldMessage(intl, inputType, 'placeholder')}
              onChange={e => this.handleInputChange(e, inputType, country, intl)}
              onFocus={this.handleInputFocus}
              onBlur={() => this.handleInputBlur(inputType)}
              isTouched={this.state[inputType].touched || formMeta.touched}
              showStripeError={showStripeError}
              inputError={this.state[inputType].error}
              showInColumns={showInColumns}
            />
          );
        })}

        {showStripeError ? <p className={css.error}>{this.state.stripeError}</p> : null}
        {showFormError ? <p className={css.error}>{formMeta.error}</p> : null}
      </div>
    );
  }
}

TokenInputFieldComponent.defaultProps = {
  rootClassName: null,
  className: null,
  disabled: false,
};

const { string, shape, func, bool } = PropTypes;

TokenInputFieldComponent.propTypes = {
  rootClassName: string,
  className: string,
  country: string.isRequired,
  currency: string.isRequired,
  formName: string.isRequired,
  disabled: bool,

  input: shape({
    onChange: func.isRequired,
    onBlur: func.isRequired,
  }).isRequired,
  meta: shape({
    touched: bool.isRequired,
    error: string,
  }).isRequired,

  intl: intlShape.isRequired,
};

const EnhancedTokenInputFieldComponent = injectIntl(TokenInputFieldComponent);

const StripeBankAccountTokenInputField = props => {
  return <Field component={EnhancedTokenInputFieldComponent} {...props} />;
};

export default StripeBankAccountTokenInputField;
