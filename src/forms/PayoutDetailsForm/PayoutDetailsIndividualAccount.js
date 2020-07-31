import React, { useState } from 'react';
import { bool, object, shape } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import { createResourceLocatorString } from '../../util/routes';

import { stripeCountryConfigs } from './PayoutDetailsForm';
import PayoutDetailsAddress from './PayoutDetailsAddress';
import PayoutDetailsBankDetails from './PayoutDetailsBankDetails';
import PayoutDetailsPersonalDetails from './PayoutDetailsPersonalDetails';
import PayoutDetailsBusinessProfile from './PayoutDetailsBusinessProfile';
import css from './PayoutDetailsForm.css';
import { FieldRadioButton } from '../../components';

const PayoutDetailsIndividualAccountComponent = props => {
  const { fieldRenderProps, currentUserId, intl, appConfig } = props;
  const [stripeEnabled, setStripeFormVisibility] = useState(false)
  const { disabled, form, values } = fieldRenderProps;
  const { country } = values;

  const individualConfig =
    country && stripeCountryConfigs(country).individualConfig
      ? stripeCountryConfigs(country).individualConfig
      : {};

  const showEmailField = !!individualConfig.personalEmail;
  const showPhoneNumberField = !!individualConfig.personalPhone;
  const showPersonalIdNumberField =
    !!individualConfig.personalIdNumberRequired || !!individualConfig.ssnLast4Required;

  const showBusinessURLField = !!individualConfig.businessURL;
  const showMCCForUSField = !!individualConfig.mccForUS;
  const showBusinssProfileSection = showBusinessURLField || showMCCForUSField;

  const hasBusinessURL =
    values &&
    values.individual &&
    values.individual.businessProfile &&
    values.individual.businessProfile.url;

  // Use user profile page as business_url on this marketplace
  // or just fake it if it's dev environment using Stripe test endpoints.
  // NOTE: All US accounts need to provide business URL or product description
  if (showBusinssProfileSection && !hasBusinessURL && currentUserId) {
    const pathToProfilePage = uuid =>
      createResourceLocatorString('ProfilePage', routeConfiguration(), { id: uuid }, {});
    const defaultBusinessURL =
      appConfig && appConfig.canonicalRootURL && !appConfig.dev
        ? `${config.canonicalRootURL}${pathToProfilePage(currentUserId.uuid)}`
        : `https://test-marketplace.com${pathToProfilePage(currentUserId.uuid)}`;

    form.change('individual.businessProfile.url', defaultBusinessURL);
  }

  return (
    <React.Fragment>
      <PayoutDetailsPersonalDetails
        intl={intl}
        disabled={disabled}
        values={values}
        country={country}
        fieldId="individual"
        accountType="individual"
        showEmailField={showEmailField}
        showPersonalIdNumberField={showPersonalIdNumberField}
        showPhoneNumberField={showPhoneNumberField}
        form={form}
      />

      <PayoutDetailsAddress
        country={country}
        intl={intl}
        disabled={disabled}
        form={form}
        fieldId="individual.address"
      />

      {showBusinssProfileSection ? (
        <div className={css.sectionContainer}>
          <h3 className={css.subTitle}>
            <FormattedMessage id="PayoutDetailsForm.businessProfile" />
          </h3>
          <PayoutDetailsBusinessProfile
            disabled={disabled}
            fieldId="individual.businessProfile"
            form={form}
            showBusinessURLField={showBusinessURLField}
            showMCCForUSField={showMCCForUSField}
            intl={intl}
          />
        </div>
      ) : null}
      <p>In order to receive payments, you must specify your bank card details.</p> 
      <div className={css.radioButtonRow}>
              <FieldRadioButton
                id="bankAccountTokenStripeDisabled"
                name={"bankAccountTokenStripeEnabled"}
                label='Later'
                value='Later'
                onClick={() => setStripeFormVisibility(false)}
              />
              <FieldRadioButton
                id="bankAccountTokenStripeEnabled"
                name={"bankAccountTokenStripeEnabled"}
                label='Enable now'
                value='Enable now'
                onClick={() => setStripeFormVisibility(true)}
              />
        </div>
        {stripeEnabled && <PayoutDetailsBankDetails country={country} stripeEnabled={stripeEnabled} disabled={disabled} fieldId="individual" />}
    </React.Fragment>
  );
};

PayoutDetailsIndividualAccountComponent.defaultProps = {
  currentUserId: null,
  appConfig: config,
};

PayoutDetailsIndividualAccountComponent.propTypes = {
  fieldRenderProps: shape({
    disabled: bool,
    form: object.isRequired,
    values: object,
  }).isRequired,
  currentUserId: propTypes.uuid,
  appConfig: object,

  // from injectIntl
  intl: intlShape.isRequired,
};

const PayoutDetailsIndividualAccount = compose(injectIntl)(PayoutDetailsIndividualAccountComponent);

export default PayoutDetailsIndividualAccount;
