import React from 'react';
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
import { Button, ExternalLink, FieldSelect, Form } from '../../components';

import PayoutDetailsIndividualAccount from './../../forms/PayoutDetailsForm/PayoutDetailsIndividualAccount';
import css from './../../forms/PayoutDetailsForm/PayoutDetailsForm.css';
import { publicDraft, payloadFormViewState } from '../../ducks/stripe.duck';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { requestPublishListingDraft } from '../../containers/EditListingPage/EditListingPage.duck';

const supportedCountries = config.stripe.supportedCountries.map(c => c.code);

export const stripeCountryConfigs = countryCode => {
  const country = config.stripe.supportedCountries.find(c => c.code === countryCode);

  if (!country) {
    throw new Error(`Country code not found in Stripe config ${countryCode}`);
  }
  return country;
};

const ApprovedBlockComponent = props => (
  <FinalForm
    {...props}
    mutators={{
      ...arrayMutators,
    }}
    render={fieldRenderProps => {
      const {
        redirect,
        payloadFormView,
        stripeAccountCreated,
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

      const accountType = 'individual'

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
      /*const showCompany = country && accountType && accountType === 'company';*/

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
      return  (
        <div>
          {payloadFormView ? (
        <Form className={classes} onSubmit={handleSubmit}>
          <React.Fragment>
            <div className={css.sectionContainer}>
              <h3 className={css.subTitle}>Country</h3>
              <FieldSelect
                id="country"
                name="country"
                disabled={disabled}
                className={css.selectCountry}
                autoComplete="country"
                label={countryLabel}
                validate={countryRequired}
              >
                <option disabled value="">
                  {countryPlaceholder}
                </option>
                {supportedCountries.map(c => (
                  <option key={c} value={c}>
                    {intl.formatMessage({ id: `PayoutDetailsForm.countryNames.${c}` })}
                  </option>
                ))}
              </FieldSelect>
            </div>

            {showIndividual && (
              <PayoutDetailsIndividualAccount
                fieldRenderProps={fieldRenderProps}
                country={country}
                currentUserId={currentUserId}
              />
            )}
            {error}
            <p className={css.termsText}>
              <FormattedMessage
                id="PayoutDetailsForm.stripeToSText"
                values={{ stripeConnectedAccountTermsLink }}
              />
            </p>
            <Button
              className={css.submitButton}
              type="submit"
              inProgress={submitInProgress}
              disabled={submitDisabled}
              ready={ready}
            >
              {payloadFormView ? submitButtonText ? (
                  submitButtonText
                ) : (
                  <FormattedMessage id="PayoutPreferencesPage.submitButtonText" />
                ) :
                submitButtonText ? (
                  submitButtonText
                ) : (
                  <FormattedMessage id="PayoutDetailsForm.submitButtonText" />
                )
              }
            </Button>
          </React.Fragment>
        </Form>
      ) : (
          <Button
            type="submit"
            inProgress={submitInProgress}
            ready={ready}
            onClick={()=>props.onPayloadFormViewState()}>
            {submitButtonText ? (
              submitButtonText
            ) : (
              <FormattedMessage id="PayoutDetailsForm.submitInformationButtonText" />
            )}
          </Button>)}
          {redirect ? props.onPublicDraft(false) :
            <Button
              type="submit"
              onClick={()=>props.onPublishListingDraft()}
              className={css.approvedBlock__greyButton}
              inProgress={submitInProgress}
              ready={ready}>
              {submitButtonText ? (
                submitButtonText
              ) : (
                <FormattedMessage
                  id="PayoutDetailsForm.laterButtonText" />
              )}
            </Button>}
          </div>
      );
    }}
  />
);

ApprovedBlockComponent.defaultProps = {
  className: null,
  createStripeAccountError: null,
  disabled: false,
  inProgress: false,
  ready: false,
  submitButtonText: null,
  currentUserId: null,
  fieldRenderProps: null,
  redirect:false,
  stripeAccountCreated: false,
};

ApprovedBlockComponent.propTypes = {
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
  onPublicDraft: func.isRequired,
  onPayloadFormViewState: func.isRequired,
  onPublishListingDraft: func.isRequired,

};

const mapStateToProps = state => {
  return {
    redirect: state.stripe.redirect,
    payloadFormView: state.stripe.payloadFormView,
    stripeAccountCreated: state.stripe.stripeAccountCreated
  }
}
const mapDispatchToProps = dispatch => ({
  onPublicDraft: (state) => dispatch(publicDraft(state)),
  onPayloadFormViewState: () => dispatch(payloadFormViewState()),
  onPublishListingDraft: () => dispatch(requestPublishListingDraft()),

});

const ApprovedBlock = compose(withRouter,connect(
  mapStateToProps,
  mapDispatchToProps
),injectIntl)(ApprovedBlockComponent);

export default ApprovedBlock
