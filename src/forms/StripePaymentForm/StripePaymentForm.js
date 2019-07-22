/**
 * Note: This form is using card from Stripe Elements https://stripe.com/docs/stripe-js#elements
 * Card is not a Final Form field so it's not available trough Final Form.
 * It's also handled separately in handleSubmit function.
 */
import React, { Component } from 'react';
import { bool, func, object, string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import config from '../../config';
import { Form, PrimaryButton, FieldTextInput } from '../../components';
import StripePaymentAddress from './StripePaymentAddress';
import css from './StripePaymentForm.css';

/**
 * Translate a Stripe API error object.
 *
 * To keep up with possible keys from the Stripe API, see:
 *
 * https://stripe.com/docs/api#errors
 *
 * Note that at least at moment, the above link doesn't list all the
 * error codes that the API returns.
 *
 * @param {Object} intl - react-intl object from injectIntl
 * @param {Object} stripeError - error object from Stripe API
 *
 * @return {String} translation message for the specific Stripe error,
 * or the given error message (not translated) if the specific error
 * type/code is not defined in the translations
 *
 */
const stripeErrorTranslation = (intl, stripeError) => {
  const { message, code, type } = stripeError;

  if (!code || !type) {
    // Not a proper Stripe error object
    return intl.formatMessage({ id: 'StripePaymentForm.genericError' });
  }

  const translationId =
    type === 'validation_error'
      ? `StripePaymentForm.stripe.validation_error.${code}`
      : `StripePaymentForm.stripe.${type}`;

  return intl.formatMessage({
    id: translationId,
    defaultMessage: message,
  });
};

const stripeElementsOptions = {
  fonts: [
    {
      family: 'sofiapro',
      fontSmoothing: 'antialiased',
      src:
        'local("sofiapro"), local("SofiaPro"), local("Sofia Pro"), url("https://assets-sharetribecom.sharetribe.com/webfonts/sofiapro/sofiapro-medium-webfont.woff2") format("woff2")',
    },
  ],
};

const cardStyles = {
  base: {
    fontFamily: '"sofiapro", Helvetica, Arial, sans-serif',
    fontSize: '18px',
    fontSmoothing: 'antialiased',
    lineHeight: '24px',
    letterSpacing: '-0.1px',
    color: '#4A4A4A',
    '::placeholder': {
      color: '#B2B2B2',
    },
  },
};

const initialState = {
  error: null,
  cardValueValid: false,
};

/**
 * Payment form that asks for credit card info using Stripe Elements.
 *
 * When the card is valid and the user submits the form, a request is
 * sent to the Stripe API to handle payment. `stripe.handleCardPayment`
 * may ask more details from cardholder if 3D security steps are needed.
 *
 * See: https://stripe.com/docs/payments/payment-intents
 *      https://stripe.com/docs/elements
 */
class StripePaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleCardValueChange = this.handleCardValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.paymentForm = this.paymentForm.bind(this);
    this.finalFormAPI = null;
  }
  componentDidMount() {
    if (!window.Stripe) {
      throw new Error('Stripe must be loaded for StripePaymentForm');
    }

    if (config.stripe.publishableKey) {
      this.stripe = window.Stripe(config.stripe.publishableKey);
      this.props.onStripeInitialized(this.stripe);

      if (!this.props.hasHandledCardPayment) {
        const elements = this.stripe.elements(stripeElementsOptions);
        this.card = elements.create('card', { style: cardStyles });
        this.card.mount(this.cardContainer);
        this.card.addEventListener('change', this.handleCardValueChange);
        // EventListener is the only way to simulate breakpoints with Stripe.
        window.addEventListener('resize', () => {
          if (window.innerWidth < 1024) {
            this.card.update({ style: { base: { fontSize: '18px', lineHeight: '24px' } } });
          } else {
            this.card.update({ style: { base: { fontSize: '20px', lineHeight: '32px' } } });
          }
        });
      }
    }
  }
  componentWillUnmount() {
    if (this.card) {
      this.card.removeEventListener('change', this.handleCardValueChange);
      this.card.unmount();
    }
  }
  handleCardValueChange(event) {
    const { intl } = this.props;
    const { error, complete } = event;

    const postalCode = event.value.postalCode;
    if (this.finalFormAPI) {
      this.finalFormAPI.change('postal', postalCode);
    }

    this.setState(prevState => {
      return {
        error: error ? stripeErrorTranslation(intl, error) : null,
        cardValueValid: complete,
      };
    });
  }
  handleSubmit(values) {
    const { onSubmit, inProgress, formId, hasHandledCardPayment } = this.props;
    const { initialMessage } = values;
    const cardInputNeedsAttention = !(hasHandledCardPayment || this.state.cardValueValid);

    if (inProgress || cardInputNeedsAttention) {
      // Already submitting or card value incomplete/invalid
      return;
    }

    const params = {
      message: initialMessage ? initialMessage.trim() : null,
      card: this.card,
      formId,
      formValues: values,
    };
    onSubmit(params);
  }

  paymentForm(formRenderProps) {
    const {
      className,
      rootClassName,
      inProgress: submitInProgress,
      formId,
      paymentInfo,
      authorDisplayName,
      showInitialMessageInput,
      intl,
      initiateOrderError,
      handleCardPaymentError,
      confirmPaymentError,
      invalid,
      handleSubmit,
      form,
      hasHandledCardPayment,
    } = formRenderProps;

    this.finalFormAPI = form;
    const billingDetailsNeeded = !(confirmPaymentError || hasHandledCardPayment);
    const cardInputNeedsAttention = !(hasHandledCardPayment || this.state.cardValueValid);
    const submitDisabled = invalid || cardInputNeedsAttention || submitInProgress;
    const hasCardError = this.state.error && !submitInProgress;
    const hasPaymentErrors = handleCardPaymentError || confirmPaymentError;
    const classes = classNames(rootClassName || css.root, className);
    const cardClasses = classNames(css.card, {
      [css.cardSuccess]: this.state.cardValueValid,
      [css.cardError]: hasCardError,
    });

    // TODO: handleCardPayment can create all kinds of errors.
    // Currently, we provide translation support for one:
    // https://stripe.com/docs/error-codes
    const piAuthenticationFailure = 'payment_intent_authentication_failure';
    const paymentErrorMessage =
      handleCardPaymentError && handleCardPaymentError.code === piAuthenticationFailure
        ? intl.formatMessage({ id: 'StripePaymentForm.handleCardPaymentError' })
        : handleCardPaymentError
        ? handleCardPaymentError.message
        : confirmPaymentError
        ? intl.formatMessage({ id: 'StripePaymentForm.confirmPaymentError' })
        : intl.formatMessage({ id: 'StripePaymentForm.genericError' });

    const billingDetailsNameLabel = intl.formatMessage({
      id: 'StripePaymentForm.billingDetailsNameLabel',
    });

    const billingDetailsNamePlaceholder = intl.formatMessage({
      id: 'StripePaymentForm.billingDetailsNamePlaceholder',
    });

    const messagePlaceholder = intl.formatMessage(
      { id: 'StripePaymentForm.messagePlaceholder' },
      { name: authorDisplayName }
    );

    const messageOptionalText = intl.formatMessage({
      id: 'StripePaymentForm.messageOptionalText',
    });

    const initialMessageLabel = intl.formatMessage(
      { id: 'StripePaymentForm.messageLabel' },
      { messageOptionalText: messageOptionalText }
    );

    // Asking billing address is recommended in PaymentIntent flow.
    // In CheckoutPage, we send name and email as billing details, but address only if it exists.
    const billingAddress = (
      <StripePaymentAddress intl={intl} form={form} fieldId={formId} card={this.card} />
    );

    const hasStripeKey = config.stripe.publishableKey;

    return hasStripeKey ? (
      <Form className={classes} onSubmit={handleSubmit}>
        {billingDetailsNeeded ? (
          <React.Fragment>
            <h3 className={css.paymentHeading}>
              <FormattedMessage id="StripePaymentForm.paymentHeading" />
            </h3>
            <label className={css.paymentLabel} htmlFor={`${formId}-card`}>
              <FormattedMessage id="StripePaymentForm.creditCardDetails" />
            </label>

            <div
              className={cardClasses}
              id={`${formId}-card`}
              ref={el => {
                this.cardContainer = el;
              }}
            />
            {hasCardError ? <span className={css.error}>{this.state.error}</span> : null}
            <div className={css.paymentAddressField}>
              <h3 className={css.billingHeading}>
                <FormattedMessage id="StripePaymentForm.billingDetails" />
              </h3>

              <FieldTextInput
                className={css.field}
                type="text"
                id="name"
                name="name"
                autoComplete="cc-name"
                label={billingDetailsNameLabel}
                placeholder={billingDetailsNamePlaceholder}
              />

              {billingAddress}
            </div>
          </React.Fragment>
        ) : null}

        {initiateOrderError ? (
          <span className={css.errorMessage}>{initiateOrderError.message}</span>
        ) : null}
        {showInitialMessageInput ? (
          <div>
            <h3 className={css.messageHeading}>
              <FormattedMessage id="StripePaymentForm.messageHeading" />
            </h3>

            <FieldTextInput
              type="textarea"
              id={`${formId}-message`}
              name="initialMessage"
              label={initialMessageLabel}
              placeholder={messagePlaceholder}
              className={css.message}
            />
          </div>
        ) : null}
        <div className={css.submitContainer}>
          {hasPaymentErrors ? (
            <span className={css.errorMessage}>{paymentErrorMessage}</span>
          ) : null}
          <p className={css.paymentInfo}>{paymentInfo}</p>
          <PrimaryButton
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
          >
            {billingDetailsNeeded ? (
              <FormattedMessage id="StripePaymentForm.submitPaymentInfo" />
            ) : (
              <FormattedMessage id="StripePaymentForm.submitConfirmPaymentInfo" />
            )}
          </PrimaryButton>
        </div>
      </Form>
    ) : (
      <div className={css.missingStripeKey}>
        <FormattedMessage id="StripePaymentForm.missingStripeKey" />
      </div>
    );
  }

  render() {
    const { onSubmit, ...rest } = this.props;
    return <FinalForm onSubmit={this.handleSubmit} {...rest} render={this.paymentForm} />;
  }
}

StripePaymentForm.defaultProps = {
  className: null,
  rootClassName: null,
  inProgress: false,
  showInitialMessageInput: true,
  hasHandledCardPayment: false,
  initiateOrderError: null,
  handleCardPaymentError: null,
  confirmPaymentError: null,
};

StripePaymentForm.propTypes = {
  className: string,
  rootClassName: string,
  inProgress: bool,
  initiateOrderError: object,
  handleCardPaymentError: object,
  confirmPaymentError: object,
  formId: string.isRequired,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  paymentInfo: string.isRequired,
  authorDisplayName: string.isRequired,
  showInitialMessageInput: bool,
  hasHandledCardPayment: bool,
};

export default injectIntl(StripePaymentForm);
