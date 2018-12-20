import React from 'react';
import { bool, string } from 'prop-types';
import { FieldBirthdayInput, FieldTextInput } from '../../components';
import * as validators from '../../util/validators';
import { intlShape } from 'react-intl';

import { stripeCountryConfigs } from './PayoutDetailsForm';
import css from './PayoutDetailsForm.css';

const MIN_STRIPE_ACCOUNT_AGE = 18;

const PayoutDetailsPersonalDetails = props => {
  const { intl, disabled, values, country, fieldId } = props;

  const personalDetailsTitle = intl.formatMessage({
    id:
      fieldId === 'company' || fieldId === 'individual'
        ? 'PayoutDetailsForm.personalDetailsTitle'
        : 'PayoutDetailsForm.personalDetailsAdditionalOwnerTitle',
  });

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

  const showPersonalIdNumber =
    (country && stripeCountryConfigs(country).personalIdNumberRequired) ||
    (country && stripeCountryConfigs(country).ssnLast4Required);

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
  }

  return (
    <div className={css.sectionContainer}>
      <h3 className={css.subTitle}>{personalDetailsTitle}</h3>
      <div className={css.formRow}>
        <FieldTextInput
          id={`${fieldId}.firstName`}
          name={`${fieldId}.firstName`}
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
          name={`${fieldId}.lastName`}
          disabled={disabled}
          className={css.lastName}
          type="text"
          autoComplete="family-name"
          label={lastNameLabel}
          placeholder={lastNamePlaceholder}
          validate={lastNameRequired}
        />
      </div>
      <div className={css.formRow}>
        <FieldBirthdayInput
          id={`${fieldId}.birthDate`}
          name={`${fieldId}.birthDate`}
          disabled={disabled}
          className={css.field}
          label={birthdayLabel}
          labelForMonth={birthdayLabelMonth}
          labelForYear={birthdayLabelYear}
          format={null}
          valueFromForm={values.birthDate}
          validate={validators.composeValidators(birthdayRequired, birthdayMinAge)}
        />
      </div>

      {showPersonalIdNumber ? (
        <FieldTextInput
          id={`${fieldId}.personalIdNumber`}
          name={`${fieldId}.personalIdNumber`}
          disabled={disabled}
          className={css.personalIdNumber}
          type="text"
          label={personalIdNumberLabel}
          placeholder={personalIdNumberPlaceholder}
          validate={personalIdNumberValid}
        />
      ) : null}
    </div>
  );
};
PayoutDetailsPersonalDetails.defaultProps = {
  country: null,
  disabled: false,
  fieldId: null,
};

PayoutDetailsPersonalDetails.propTypes = {
  country: string,
  disabled: bool,
  fieldId: string,
  intl: intlShape.isRequired,
};

export default PayoutDetailsPersonalDetails;
