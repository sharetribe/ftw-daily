import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import { Form, PrimaryButton, ExpandingTextarea } from '../../components';
import * as log from '../../util/log';
import config from '../../config';

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
  submitting: false,
  cardValueValid: false,
  token: null,
  message: '',
};

/**
 * Payment form that asks for credit card info using Stripe Elements.
 *
 * When the card is valid and the user submits the form, a request is
 * sent to the Stripe API to fetch a token that is passed to the
 * onSubmit prop of this form.
 *
 * See: https://stripe.com/docs/elements
 */
class StripePaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleCardValueChange = this.handleCardValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (!window.Stripe) {
      throw new Error('Stripe must be loaded for StripePaymentForm');
    }
    this.stripe = window.Stripe(config.stripe.publishableKey);
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
  componentWillUnmount() {
    if (this.card) {
      this.card.removeEventListener('change', this.handleCardValueChange);
      this.card.unmount();
    }
  }
  handleCardValueChange(event) {
    const { intl, onChange } = this.props;
    const { error, complete } = event;

    // A change in the card should clear the token and trigger a call
    // to the onChange prop with the cleared token and the current
    // message.

    this.setState(prevState => {
      const { message } = prevState;
      const token = null;
      onChange({ token, message });
      return {
        error: error ? stripeErrorTranslation(intl, error) : null,
        cardValueValid: complete,
        token,
      };
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    if (this.state.submitting || !this.state.cardValueValid) {
      // Already submitting or card value incomplete/invalid
      return;
    }

    const { intl, onSubmit } = this.props;

    if (this.state.token) {
      // Token already fetched for the current card value
      onSubmit({ token: this.state.token, message: this.state.message.trim() });
      return;
    }

    this.setState({ submitting: true });

    this.stripe
      .createToken(this.card)
      .then(result => {
        const { error, token } = result;
        if (error) {
          this.setState({
            submitting: false,
            error: stripeErrorTranslation(intl, error),
            token: null,
          });
        } else {
          this.setState({ submitting: false, token: token.id });
          onSubmit({ token: token.id, message: this.state.message.trim() });
        }
      })
      .catch(e => {
        log.error(e, 'stripe-payment-form-submit-failed', {
          stripeErrorType: e.type,
          stripeErrorCode: e.code,
        });

        this.setState({
          submitting: false,
          error: stripeErrorTranslation(intl, e),
        });
      });
  }
  render() {
    const {
      className,
      rootClassName,
      inProgress,
      formId,
      paymentInfo,
      onChange,
      authorDisplayName,
      showInitialMessageInput,
      intl,
    } = this.props;
    const submitInProgress = this.state.submitting || inProgress;
    const submitDisabled = !this.state.cardValueValid || submitInProgress;
    const classes = classNames(rootClassName || css.root, className);
    const cardClasses = classNames(css.card, {
      [css.cardSuccess]: this.state.cardValueValid,
      [css.cardError]: this.state.error && !submitInProgress,
    });

    const messagePlaceholder = intl.formatMessage(
      { id: 'StripePaymentForm.messagePlaceholder' },
      { name: authorDisplayName }
    );

    const handleMessageChange = e => {
      // A change in the message should call the onChange prop with
      // the current token and the new message.
      const message = e.target.value;
      this.setState(prevState => {
        const { token } = prevState;
        const newState = { token, message };
        onChange(newState);
        return newState;
      });
    };

    const messageOptionalText = (
      <span className={css.messageOptional}>
        <FormattedMessage id="StripePaymentForm.messageOptionalText" />
      </span>
    );

    const initialMessage = showInitialMessageInput ? (
      <div>
        <h3 className={css.messageHeading}>
          <FormattedMessage id="StripePaymentForm.messageHeading" />
        </h3>
        <label className={css.messageLabel} htmlFor={`${formId}-message`}>
          <FormattedMessage id="StripePaymentForm.messageLabel" values={{ messageOptionalText }} />
        </label>
        <ExpandingTextarea
          id={`${formId}-message`}
          className={css.message}
          placeholder={messagePlaceholder}
          value={this.state.message}
          onChange={handleMessageChange}
        />
      </div>
    ) : null;

    return (
      <Form className={classes} onSubmit={this.handleSubmit}>
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
        {this.state.error && !submitInProgress ? (
          <span style={{ color: 'red' }}>{this.state.error}</span>
        ) : null}
        {initialMessage}
        <div className={css.submitContainer}>
          <p className={css.paymentInfo}>{paymentInfo}</p>
          <PrimaryButton
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
          >
            <FormattedMessage id="StripePaymentForm.submitPaymentInfo" />
          </PrimaryButton>
        </div>
      </Form>
    );
  }
}

StripePaymentForm.defaultProps = {
  className: null,
  rootClassName: null,
  inProgress: false,
  onChange: () => null,
  showInitialMessageInput: true,
};

const { bool, func, string } = PropTypes;

StripePaymentForm.propTypes = {
  className: string,
  rootClassName: string,
  inProgress: bool,
  formId: string.isRequired,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  onChange: func,
  paymentInfo: string.isRequired,
  authorDisplayName: string.isRequired,
  showInitialMessageInput: bool,
};

export default injectIntl(StripePaymentForm);
