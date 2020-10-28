import React from 'react';
import { bool, node, object, oneOf, string } from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import * as validators from '../../util/validators';
import { FieldBirthdayInput, FieldCheckbox, FieldTextInput } from '../../components';

import * as normalizePhoneNumberUS from './normalizePhoneNumberUS';
import css from './PayoutDetailsForm.module.css';

const MIN_STRIPE_ACCOUNT_AGE = 18;

const identity = v => v;

const PayoutDetailsPersonalDetails = props => {
  const {
    intl,
    disabled,
    values,
    country,
    fieldId,
    sectionTitle,
    showEmailField,
    showOrganizationTitleField,
    showOwnerField,
    showOwnershipPercentageField,
    showPersonalIdNumberField,
    showPhoneNumberField,
    form,
  } = props;

  const organizationTitleLabel = intl.formatMessage({
    id: 'PayoutDetailsForm.organizationTitleLabel',
  });
  const organizationTitlePlaceholder = intl.formatMessage({
    id: 'PayoutDetailsForm.organizationTitlePlaceholder',
  });

  const personalDetailsTitle = sectionTitle
    ? sectionTitle
    : intl.formatMessage({ id: 'PayoutDetailsForm.personalDetailsTitle' });

  const firstNameLabel = intl.formatMessage({ id: 'PayoutDetailsForm.firstNameLabel' });
  const firstNamePlaceholder = intl.formatMessage({
    id: 'PayoutDetailsForm.firstNamePlaceholder',
  });
  const firstNameRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.firstNameRequired',
    })
  );

  const lastNameLabel = intl.formatMessage({ id: 'PayoutDetailsForm.lastNameLabel' });
  const lastNamePlaceholder = intl.formatMessage({
    id: 'PayoutDetailsForm.lastNamePlaceholder',
  });
  const lastNameRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.lastNameRequired',
    })
  );

  const birthdayLabel = intl.formatMessage({ id: 'PayoutDetailsForm.birthdayLabel' });
  const birthdayLabelMonth = intl.formatMessage({
    id: 'PayoutDetailsForm.birthdayLabelMonth',
  });
  const birthdayLabelYear = intl.formatMessage({ id: 'PayoutDetailsForm.birthdayLabelYear' });
  const birthdayRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.birthdayRequired',
    })
  );
  const birthdayMinAge = validators.ageAtLeast(
    intl.formatMessage(
      {
        id: 'PayoutDetailsForm.birthdayMinAge',
      },
      {
        minAge: MIN_STRIPE_ACCOUNT_AGE,
      }
    ),
    MIN_STRIPE_ACCOUNT_AGE
  );

  const personalIdNumberRequired = validators.required(
    intl.formatMessage({
      id: `PayoutDetailsForm.personalIdNumberRequired`,
    })
  );

  let personalIdNumberLabel = null;
  let personalIdNumberPlaceholder = null;
  let personalIdNumberValid = personalIdNumberRequired;

  if (country === 'US') {
    personalIdNumberLabel = intl.formatMessage({
      id: `PayoutDetailsForm.personalIdNumberLabel.US`,
    });
    personalIdNumberPlaceholder = intl.formatMessage({
      id: `PayoutDetailsForm.personalIdNumberPlaceholder.US`,
    });

    const validSSN = validators.validSsnLast4(
      intl.formatMessage({
        id: `PayoutDetailsForm.personalIdNumberValid`,
      })
    );
    personalIdNumberValid = validators.composeValidators(personalIdNumberRequired, validSSN);
  } else if (country === 'HK') {
    personalIdNumberLabel = intl.formatMessage({
      id: `PayoutDetailsForm.personalIdNumberLabel.HK`,
    });
    personalIdNumberPlaceholder = intl.formatMessage({
      id: `PayoutDetailsForm.personalIdNumberPlaceholder.HK`,
    });
    const validHKID = validators.validHKID(
      intl.formatMessage({
        id: `PayoutDetailsForm.personalIdNumberValid`,
      })
    );
    personalIdNumberValid = validators.composeValidators(personalIdNumberRequired, validHKID);
  } else if (country === 'SG') {
    personalIdNumberLabel = intl.formatMessage({
      id: `PayoutDetailsForm.personalIdNumberLabel.SG`,
    });
    personalIdNumberPlaceholder = intl.formatMessage({
      id: `PayoutDetailsForm.personalIdNumberPlaceholder.SG`,
    });
    const validSGID = validators.validSGID(
      intl.formatMessage({
        id: `PayoutDetailsForm.personalIdNumberValid`,
      })
    );
    personalIdNumberValid = validators.composeValidators(personalIdNumberRequired, validSGID);
  }

  const phoneLabel = intl.formatMessage({ id: 'PayoutDetailsForm.personalPhoneLabel' });
  const phonePlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.personalPhonePlaceholder' });
  const phoneNumberForUSRequired = validators.required(
    intl.formatMessage({ id: 'PayoutDetailsForm.personalPhoneRequired' })
  );

  const emailLabel = intl.formatMessage({ id: 'PayoutDetailsForm.personalEmailLabel' });
  const emailPlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.personalEmailPlaceholder' });
  const emailRequired = validators.required(
    intl.formatMessage({ id: 'PayoutDetailsForm.personalEmailRequired' })
  );

  const parseOwnershipPercentage = value => {
    if (!value) {
      return value;
    }

    const pattern = /^\d{0,3}(?:\.\d{1,2})?$/;
    const hasCorrectFormat = value.match(pattern);
    const floatValue = Number.parseFloat(value);
    const isInRange = 0 <= floatValue && floatValue <= 100;

    return hasCorrectFormat && isInRange
      ? value
      : hasCorrectFormat && floatValue < 0
      ? 0
      : hasCorrectFormat && floatValue > 100
      ? 100
      : value.substring(0, value.length - 1);
  };

  // Note: fname and lname are input names for browser autofill functionality.
  return (
    <div className={css.sectionContainer}>
      <h3 className={css.subTitle}>{personalDetailsTitle}</h3>
      <div className={css.formRow}>
        <FieldTextInput
          id={`${fieldId}.firstName`}
          name={`${fieldId}.fname`}
          disabled={disabled}
          className={css.firstName}
          type="text"
          autoComplete="given-name"
          label={firstNameLabel}
          placeholder={firstNamePlaceholder}
          validate={firstNameRequired}
        />
        <FieldTextInput
          id={`${fieldId}.lastName`}
          name={`${fieldId}.lname`}
          disabled={disabled}
          className={css.lastName}
          type="text"
          autoComplete="family-name"
          label={lastNameLabel}
          placeholder={lastNamePlaceholder}
          validate={lastNameRequired}
        />
      </div>

      {showOwnerField ? (
        <fieldset className={css.roleField}>
          <legend>
            <FormattedMessage id="PayoutDetailsForm.role" />
          </legend>
          <FieldCheckbox
            id={`${fieldId}.owner`}
            className={css.textInputRow}
            name={`${fieldId}.role`}
            label={intl.formatMessage({ id: 'PayoutDetailsForm.owner' })}
            value="owner"
          />
        </fieldset>
      ) : null}

      {showOwnershipPercentageField ? (
        <FieldTextInput
          id={`${fieldId}.ownershipPercentage`}
          name={`${fieldId}.ownershipPercentage`}
          className={css.ownershipPercentage}
          disabled={disabled}
          label={intl.formatMessage({ id: 'PayoutDetailsForm.ownershipPercentageLabel' })}
          placeholder={intl.formatMessage({
            id: 'PayoutDetailsForm.ownershipPercentagePlaceholder',
          })}
          type="number"
          min={0}
          max={100}
          step="0.01"
          parse={parseOwnershipPercentage}
        />
      ) : null}

      {showOrganizationTitleField ? (
        <FieldTextInput
          id={`${fieldId}.title`}
          name={`${fieldId}.title`}
          className={css.textInputRow}
          autoComplete="organization-title"
          disabled={disabled}
          label={organizationTitleLabel}
          placeholder={organizationTitlePlaceholder}
          type="text"
        />
      ) : null}

      <div className={css.formRow}>
        <FieldBirthdayInput
          id={`${fieldId}.birthDate`}
          name={`${fieldId}.birthDate`}
          disabled={disabled}
          className={css.field}
          label={birthdayLabel}
          labelForMonth={birthdayLabelMonth}
          labelForYear={birthdayLabelYear}
          format={identity}
          valueFromForm={values.birthDate}
          validate={validators.composeValidators(birthdayRequired, birthdayMinAge)}
        />
      </div>

      {showPersonalIdNumberField ? (
        <FieldTextInput
          id={`${fieldId}.personalIdNumber`}
          name={`${fieldId}.personalIdNumber`}
          disabled={disabled}
          className={css.textInputRow}
          type="text"
          label={personalIdNumberLabel}
          placeholder={personalIdNumberPlaceholder}
          validate={personalIdNumberValid}
          onUnmount={() => form.change(`${fieldId}.personalIdNumber`, undefined)}
        />
      ) : null}

      {showPhoneNumberField ? (
        <FieldTextInput
          id={`${fieldId}.phone`}
          name={`${fieldId}.phone`}
          className={css.textInputRow}
          autoComplete="tel-national"
          disabled={disabled}
          format={normalizePhoneNumberUS.format}
          label={phoneLabel}
          parse={normalizePhoneNumberUS.parse}
          placeholder={phonePlaceholder}
          type="text"
          validate={phoneNumberForUSRequired}
        />
      ) : null}
      {showEmailField ? (
        <FieldTextInput
          id={`${fieldId}.email`}
          name={`${fieldId}.email`}
          className={css.textInputRow}
          autoComplete="email"
          disabled={disabled}
          label={emailLabel}
          placeholder={emailPlaceholder}
          type="text"
          validate={emailRequired}
        />
      ) : null}
    </div>
  );
};
PayoutDetailsPersonalDetails.defaultProps = {
  country: null,
  disabled: false,
  fieldId: null,
  sectionTitle: null,
  showEmailField: false,
  showOrganizationTitleField: false,
  showOwnerField: false,
  showOwnershipPercentageField: false,
  showPersonalIdNumberField: false,
  showPhoneNumberField: false,
  values: null,
};

PayoutDetailsPersonalDetails.propTypes = {
  accountType: oneOf(['company', 'individual']).isRequired,
  country: string,
  disabled: bool,
  fieldId: string,
  intl: intlShape.isRequired,
  sectionTitle: node,
  showEmailField: bool,
  showOrganizationTitleField: bool,
  showOwnerField: bool,
  showOwnershipPercentageField: bool,
  showPersonalIdNumberField: bool,
  showPhoneNumberField: bool,
  values: object,
};

export default PayoutDetailsPersonalDetails;
