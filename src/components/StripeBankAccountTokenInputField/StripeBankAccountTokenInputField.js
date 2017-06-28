/* eslint-disable no-underscore-dangle */
import React, { Component, PropTypes } from 'react';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import classNames from 'classnames';
import { debounce } from 'lodash';
import config from '../../config';

import css from './StripeBankAccountTokenInputField.css';

const supportedCountries = config.stripe.supportedCountries.map(c => c.code);

// Since redux-form tracks the onBlur event for marking the field as
// touched (which triggers possible error validation rendering), only
// trigger the event asynchronously when no other input within this
// component has received focus.
//
// This prevents showing the validation error when the user selects a
// value and moves on to another input within this component.
const BLUR_TIMEOUT = 100;

const DEBOUNCE_WAIT_TIME = 1000;

/**
 * Create a single-use token from the given bank account data
 *
 * See: https://stripe.com/docs/stripe.js#collecting-bank-account-details
 *
 * @param {Object} data - bank account data sent to Stripe
 *
 * @return {Promise<String>} Promise that resolves with the bank
 * account token or rejects when the token creation fails
 */
const createToken = data =>
  new Promise((resolve, reject) => {
    window.Stripe.bankAccount.createToken(data, (status, response) => {
      if (response.error) {
        const e = new Error(response.error.message);
        e.stripeError = response.error;
        reject(e);
      } else {
        resolve(response.id);
      }
    });
  });

// In addition to the bank account number, Stripe requires a routing
// number when the currency is not EUR. When it is EUR, the account
// number is expected to be an IBAN number.
//
// See: https://stripe.com/docs/stripe.js#bank-account-createToken
const requiresRoutingNumber = currency => currency !== 'EUR';

const stripeErrorTranslation = (country, currency, intl, stripeError) => {
  console.error('Stripe error:', stripeError); // eslint-disable-line no-console
  const routingNumberRequired = requiresRoutingNumber(currency);

  const translationId = routingNumberRequired
    ? 'StripeBankAccountTokenInputField.genericStripeError'
    : 'StripeBankAccountTokenInputField.genericStripeErrorIban';

  return intl.formatMessage(
    {
      id: translationId,
      defaultMessage: stripeError.message,
    },
    { country, currency }
  );
};

const isRoutingNumberValid = (routingNumber, country) =>
  window.Stripe.bankAccount.validateRoutingNumber(routingNumber, country);

const isBankAccountNumberValid = (accountNumber, country) =>
  window.Stripe.bankAccount.validateAccountNumber(accountNumber, country);

class TokenInputFieldComponent extends Component {
  constructor(props) {
    super(props);
    const { currency, intl } = props;
    const routingNumberRequired = requiresRoutingNumber(currency);
    this.routingNumberRequiredMessage = intl.formatMessage({
      id: 'StripeBankAccountTokenInputField.routingNumberRequired',
    });
    this.accountNumberRequiredMessage = intl.formatMessage({
      id: routingNumberRequired
        ? 'StripeBankAccountTokenInputField.accountNumberRequired'
        : 'StripeBankAccountTokenInputField.accountNumberRequiredIban',
    });
    this.initialState = {
      routingNumber: '',
      routingNumberTouched: false,
      routingNumberError: this.routingNumberRequiredMessage,
      accountNumber: '',
      accountNumberTouched: false,
      accountNumberError: this.accountNumberRequiredMessage,
      stripeError: null,
    };

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

    this.handleRoutingNumberChange = this.handleRoutingNumberChange.bind(this);
    this.handleRoutingNumberFocus = this.handleRoutingNumberFocus.bind(this);
    this.handleRoutingNumberBlur = this.handleRoutingNumberBlur.bind(this);
    this.handleAccountNumberChange = this.handleAccountNumberChange.bind(this);
    this.handleAccountNumberFocus = this.handleAccountNumberFocus.bind(this);
    this.handleAccountNumberBlur = this.handleAccountNumberBlur.bind(this);
  }
  componentDidMount() {
    if (!window.Stripe) {
      throw new Error('Stripe must be loaded for StripeBankAccountTokenInputField');
    }
    this.stripe = window.Stripe(config.stripe.publishableKey);
    this._isMounted = true;
  }
  componentWillReceiveProps(nextProps) {
    const countryChanged = nextProps.country !== this.props.country;
    const currencyChanged = nextProps.currency !== this.props.currency;
    if (countryChanged || currencyChanged) {
      // Clear the possible routing and bank account numbers from the
      // state if the given country or currency changes.
      this.setState(this.initialState);
      nextProps.input.onChange('');
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
   * @param {String} accountNumber - bank account number
   * @param {String} routingNumber - routing number for non-IBAN bank accounts
   */
  requestToken(accountNumber, routingNumber) {
    const { country, currency, input: { onChange }, intl } = this.props;
    const routingNumberRequired = requiresRoutingNumber(currency);

    // First we have to clear the current token value so the parent
    // form doesn't submit with an old value.
    onChange('');

    const numbersMissing = !accountNumber || (routingNumberRequired && !routingNumber);
    const numbersInvalid = this.state.accountNumberError ||
      (routingNumberRequired && this.state.routingNumberError);

    if (numbersMissing || numbersInvalid) {
      // Incomplete/invalid info, not requesting token
      return;
    }

    const accountData = {
      country: this.props.country,
      currency: this.props.currency,
      account_number: accountNumber,
    };
    if (routingNumberRequired) {
      accountData.routing_number = routingNumber;
    }
    createToken(accountData)
      .then(token => {
        if (this._isMounted && accountNumber === this.state.accountNumber) {
          // Handle response only if the current number hasn't changed
          this.setState({
            routingNumberError: null,
            accountNumberError: null,
            stripeError: null,
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
            stripeError: stripeErrorTranslation(country, currency, intl, e.stripeError),
          });
        }
      });
  }
  handleRoutingNumberChange(e) {
    const { country, intl } = this.props;
    const value = e.target.value.trim();
    let routingNumberError = null;

    // Validate the changed routing number
    if (!value) {
      routingNumberError = this.routingNumberRequiredMessage;
    } else if (!isRoutingNumberValid(value, country)) {
      routingNumberError = intl.formatMessage(
        {
          id: 'StripeBankAccountTokenInputField.routingNumberInvalid',
        },
        { country }
      );
    }

    this.setState({
      routingNumber: value,
      routingNumberError,
      stripeError: null,
    });
    this.requestToken(this.state.accountNumber, value);
  }
  handleRoutingNumberFocus() {
    window.clearTimeout(this.blurTimeoutId);
  }
  handleRoutingNumberBlur() {
    this.setState({ routingNumberTouched: true });
    window.clearTimeout(this.blurTimeoutId);
    this.blurTimeoutId = window.setTimeout(this.props.input.onBlur, BLUR_TIMEOUT);
  }
  handleAccountNumberChange(e) {
    const { country, intl } = this.props;
    const value = e.target.value.trim();
    let accountNumberError = null;

    // Validate the changed account number
    if (!value) {
      accountNumberError = this.accountNumberRequiredMessage;
    } else if (!isBankAccountNumberValid(value, country)) {
      accountNumberError = intl.formatMessage(
        {
          id: 'StripeBankAccountTokenInputField.accountNumberInvalid',
        },
        { country }
      );
    }

    this.setState({
      accountNumber: value,
      accountNumberError,
      stripeError: null,
    });
    this.requestToken(value, this.state.routingNumber);
  }
  handleAccountNumberFocus() {
    window.clearTimeout(this.blurTimeoutId);
  }
  handleAccountNumberBlur() {
    this.setState({ accountNumberTouched: true });
    window.clearTimeout(this.blurTimeoutId);
    this.blurTimeoutId = window.setTimeout(this.props.input.onBlur, BLUR_TIMEOUT);
  }
  render() {
    const {
      rootClassName,
      className,
      country,
      currency,
      routingNumberId,
      accountNumberId,
      input,
      meta: formMeta,
      intl,
    } = this.props;

    const routingNumberRequired = requiresRoutingNumber(currency);

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

    const showRoutingNumberError = routingNumberRequired &&
      (this.state.routingNumberTouched || formMeta.touched) &&
      !!this.state.routingNumberError;
    const showAccountNumberError = (this.state.accountNumberTouched || formMeta.touched) &&
      !!this.state.accountNumberError;

    // Only show Stripe and form errors when the fields don't have
    // more specific errors.
    const showingFieldErrors = showRoutingNumberError || showAccountNumberError;
    const showStripeError = !!(this.state.stripeError && !showingFieldErrors && formMeta.touched);
    const showFormError = !!(formMeta.touched &&
      formMeta.error &&
      !showingFieldErrors &&
      !showStripeError);

    const routingNumberPlaceholder = intl.formatMessage({
      id: 'StripeBankAccountTokenInputField.routingNumberPlaceholder',
    });
    const routingInputClasses = classNames(css.input, {
      [css.inputSuccess]: !!this.state.routingNumber,
      [css.inputError]: showRoutingNumberError || showStripeError,
    });
    const routingNumberInputProps = {
      className: routingInputClasses,
      id: routingNumberId,
      value: this.state.routingNumber,
      placeholder: routingNumberPlaceholder,
      onChange: this.handleRoutingNumberChange,
      onFocus: this.handleRoutingNumberFocus,
      onBlur: this.handleRoutingNumberBlur,
    };
    const routingNumberError = <p className={css.error}>{this.state.routingNumberError}</p>;
    const routingNumberField = (
      <div>
        <label htmlFor={routingNumberId}>
          <FormattedMessage id="StripeBankAccountTokenInputField.routingNumberLabel" />
        </label>
        <input {...routingNumberInputProps} />
        {showRoutingNumberError ? routingNumberError : null}
      </div>
    );

    const accountNumberPlaceholder = routingNumberRequired
      ? intl.formatMessage({ id: 'StripeBankAccountTokenInputField.accountNumberPlaceholder' })
      : intl.formatMessage({ id: 'StripeBankAccountTokenInputField.accountNumberPlaceholderIban' });
    const accountInputClasses = classNames(css.input, {
      [css.inputSuccess]: !!this.state.accountNumber,
      [css.inputError]: showAccountNumberError || showStripeError,
    });
    const accountNumberInputProps = {
      className: accountInputClasses,
      id: accountNumberId,
      value: this.state.accountNumber,
      placeholder: accountNumberPlaceholder,
      onChange: this.handleAccountNumberChange,
      onFocus: this.handleAccountNumberFocus,
      onBlur: this.handleAccountNumberBlur,
    };
    const accountNumberLabel = routingNumberRequired
      ? <label className={css.withTopMargin} htmlFor={accountNumberId}>
          <FormattedMessage id="StripeBankAccountTokenInputField.accountNumberLabel" />
        </label>
      : <label htmlFor={accountNumberId}>
          <FormattedMessage id="StripeBankAccountTokenInputField.accountNumberLabelIban" />
        </label>;
    const accountNumberError = <p className={css.error}>{this.state.accountNumberError}</p>;

    return (
      <div className={classNames(rootClassName || css.root, className)}>
        {routingNumberRequired ? routingNumberField : null}

        {accountNumberLabel}
        <input {...accountNumberInputProps} />
        {showAccountNumberError ? accountNumberError : null}

        {showStripeError ? <p className={css.error}>{this.state.stripeError}</p> : null}
        {showFormError ? <p className={css.error}>{formMeta.error}</p> : null}
      </div>
    );
  }
}

TokenInputFieldComponent.defaultProps = { rootClassName: null, className: null };

const { string, shape, func, bool } = PropTypes;

TokenInputFieldComponent.propTypes = {
  rootClassName: string,
  className: string,

  country: string.isRequired,
  currency: string.isRequired,

  routingNumberId: string.isRequired,
  accountNumberId: string.isRequired,

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
