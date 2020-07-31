import React, { useState } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import classNames from 'classnames';
import config from '../../config';
import { propTypes } from '../../util/types';
import { isStripeInvalidPostalCode, isStripeError } from '../../util/errors';
import * as validators from '../../util/validators';
import { Button, ExternalLink, Form } from '../../components';

import css from './../../forms/PayoutDetailsForm/PayoutDetailsForm.css';
import { Redirect, withRouter } from 'react-router-dom';
import { loginFacebook } from '../../ducks/Auth.duck';
import { redirectState, publicDraft } from '../../ducks/stripe.duck';
import { connect } from 'react-redux';

const supportedCountries = config.stripe.supportedCountries.map(c => c.code);

export const stripeCountryConfigs = countryCode => {
  const country = config.stripe.supportedCountries.find(c => c.code === countryCode);

  if (!country) {
    throw new Error(`Country code not found in Stripe config ${countryCode}`);
  }
  return country;
};

const SkippingBlokComponent = props => (

    <FinalForm
      {...props}
      mutators={{
        ...arrayMutators,
      }}
      render={fieldRenderProps => {
        const {
          state,
          redirect,
          className,
          createStripeAccountError,
          disabled,
          handleSubmit,
          inProgress,
          intl,
          invalid,
          pristine,
          ready,
          submitButtonText,
          currentUserId,
          values,
        } = fieldRenderProps;

        const { country } = values;

        const accountType = values.accountType;

        const individualAccountLabel = intl.formatMessage({
          id: 'PayoutDetailsForm.individualAccount',
        });

        const companyAccountLabel = intl.formatMessage({ id: 'PayoutDetailsForm.companyAccount' });

        const countryLabel = intl.formatMessage({ id: 'PayoutDetailsForm.countryLabel' });
        const countryPlaceholder = intl.formatMessage({
          id: 'PayoutDetailsForm.countryPlaceholder',
        });
        const countryRequired = validators.required(
          intl.formatMessage({
            id: 'PayoutDetailsForm.countryRequired',
          })
        );

        const classes = classNames(css.root, className, {
          [css.disabled]: disabled,
        });

        const submitInProgress = inProgress;
        const submitDisabled = pristine || invalid || disabled || submitInProgress;
        const showAsRequired = pristine;

        const showIndividual = country && accountType && accountType === 'individual';
        const showCompany = country && accountType && accountType === 'company';

        let error = null;

        if (isStripeInvalidPostalCode(createStripeAccountError)) {
          error = (
            <div className={css.error}>
              <FormattedMessage id="PayoutDetailsForm.createStripeAccountFailedInvalidPostalCode" />
            </div>
          );
        } else if (isStripeError(createStripeAccountError)) {
          const stripeMessage = createStripeAccountError.apiErrors[0].meta.stripeMessage;
          error = (
            <div className={css.error}>
              <FormattedMessage
                id="PayoutDetailsForm.createStripeAccountFailedWithStripeError"
                values={{ stripeMessage }}
              />
            </div>
          );
        } else if (createStripeAccountError) {
          error = (
            <div className={css.error}>
              <FormattedMessage id="PayoutDetailsForm.createStripeAccountFailed" />
            </div>
          );
        }

        const stripeConnectedAccountTermsLink = (
          <ExternalLink href="https://stripe.com/connect-account/legal" className={css.termsLink}>
            <FormattedMessage id="PayoutDetailsForm.stripeConnectedAccountTermsLink" />
          </ExternalLink>
        );
        return config.stripe.publishableKey ? (
          redirect ? <Redirect to='/account/payments'/> :
            <div className={css.sectionContainer}>
              <Button
                type="submit"
                inProgress={submitInProgress}
                ready={ready}
                onClick={()=>props.onRedirectState()}>
                {submitButtonText ? (
                  submitButtonText
                ) : (
                  <FormattedMessage id="PayoutDetailsForm.submitButtonText" />
                )}
              </Button>
              <Button
                className={css.greyButton}
                type="submit"
                onClick={()=>props.onPublicDraft()}
                inProgress={submitInProgress}
                ready={ready}>
                {submitButtonText ? (
                  submitButtonText
                ) : (
                  <FormattedMessage
                    id="PayoutDetailsForm.laterButtonText" />
                )}
              </Button>
            </div>
        ) : (
          <div className={css.missingStripeKey}>
            <FormattedMessage id="PayoutDetailsForm.missingStripeKey" />
          </div>
        );
      }}
    />
  );


SkippingBlokComponent.defaultProps = {
  className: null,
  createStripeAccountError: null,
  disabled: false,
  inProgress: false,
  ready: false,
  submitButtonText: null,
  currentUserId: null,
  fieldRenderProps: null,
  redirect:false
};

SkippingBlokComponent.propTypes = {
  className: string,
  createStripeAccountError: object,
  disabled: bool,
  inProgress: bool,
  ready: bool,
  submitButtonText: string,
  currentUserId: propTypes.uuid,
  fieldRenderProps: shape({
    handleSubmit: func,
    invalid: bool,
    pristine: bool,
    values: object,
  }),

  // from injectIntl
  intl: intlShape.isRequired,
  onRedirectState: func.isRequired,
};
const mapStateToProps = state => {
  return {
    redirect: state.stripe.redirect}
}
const mapDispatchToProps = dispatch => ({
  onRedirectState: () => dispatch(redirectState()),
});
const SkippingBlock = compose(withRouter,connect(
  mapStateToProps,
  mapDispatchToProps
),injectIntl)(SkippingBlokComponent);

export default SkippingBlock;
