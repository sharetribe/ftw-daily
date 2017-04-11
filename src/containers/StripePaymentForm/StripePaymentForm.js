import React, { Component, PropTypes } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Button } from '../../components';
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

  const translationId = type === 'validation_error'
    ? `StripePaymentForm.stripe.validation_error.${code}`
    : `StripePaymentForm.stripe.${type}`;

  return intl.formatMessage({
    id: translationId,
    defaultMessage: message,
  });
};

const cardStyles = {
  base: {
    fontFamily: '"Chalkboard", "Comic Sans MS", sans-serif',
    color: '#4A4A4A',
    fontSize: '16px',
    letterSpacing: '-0.4px',
  },
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
    this.state = { error: null, submitting: false, cardValueValid: false };
    this.handleCardValueChange = this.handleCardValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (!window.Stripe) {
      throw new Error('Stripe must be loaded for StripePaymentForm');
    }
    this.stripe = window.Stripe(config.stripe.publishableKey);
    const elements = this.stripe.elements();
    this.card = elements.create('card', { style: cardStyles });
    this.card.mount(this.cardContainer);
    this.card.addEventListener('change', this.handleCardValueChange);
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
    this.setState({
      error: error ? stripeErrorTranslation(intl, error) : null,
      cardValueValid: complete,
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    if (this.state.submitting || !this.state.cardValueValid) {
      // Already submitting or card value incomplete/invalid
      return;
    }

    const { intl, onSubmit } = this.props;
    this.setState({ submitting: true });

    this.stripe
      .createToken(this.card)
      .then(result => {
        const { error, token } = result;
        if (error) {
          this.setState({
            submitting: false,
            error: stripeErrorTranslation(intl, error),
          });
        } else {
          this.setState({ submitting: false });
          onSubmit(token.id);
        }
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.setState({
          submitting: false,
          error: stripeErrorTranslation(intl, e),
        });
      });
  }
  render() {
    const { disableSubmit } = this.props;
    const submitDisabled = disableSubmit || this.state.submitting || !this.state.cardValueValid;
    return (
      <form onSubmit={this.handleSubmit}>
        <div
          className={css.card}
          ref={el => {
            this.cardContainer = el;
          }}
        />
        {this.state.error ? <span style={{ color: 'red' }}>{this.state.error}</span> : null}
        <Button className={css.submitButton} type="submit" disabled={submitDisabled}>
          <FormattedMessage id="StripePaymentForm.submitPaymentInfo" />
        </Button>
      </form>
    );
  }
}

StripePaymentForm.defaultProps = { disableSubmit: false };

const { func, bool } = PropTypes;

StripePaymentForm.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  disableSubmit: bool,
};

export default injectIntl(StripePaymentForm);
