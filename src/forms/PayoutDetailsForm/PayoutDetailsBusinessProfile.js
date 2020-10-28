import React from 'react';
import { bool, string } from 'prop-types';
import { intlShape } from '../../util/reactIntl';
import * as validators from '../../util/validators';
import { FieldSelect, FieldTextInput } from '../../components';

import merchantCategoryCodesUS from './merchantCategoryCodesUS';
import css from './PayoutDetailsForm.module.css';

const PayoutDetailsBusinessProfile = props => {
  const { fieldId, disabled, intl, showBusinessURLField, showMCCForUSField } = props;

  const isBusinessProfileNeeded = showBusinessURLField || showMCCForUSField;
  const mccLabel = intl.formatMessage({ id: 'PayoutDetailsForm.businessMCCForUSLabel' });
  const mccPlaceholder = intl.formatMessage({
    id: 'PayoutDetailsForm.businessMCCForUSPlaceholder',
  });
  const mccRequired = validators.required(
    intl.formatMessage({ id: 'PayoutDetailsForm.businessMCCForUSRequired' })
  );

  const businessUrlLabel = intl.formatMessage({ id: 'PayoutDetailsForm.businessURLLabel' });
  const businessUrlPlaceholder = intl.formatMessage({
    id: 'PayoutDetailsForm.businessURLPlaceholder',
  });

  const businessUrlRequired = validators.validBusinessURL(
    intl.formatMessage({ id: 'PayoutDetailsForm.businessURLRequired' })
  );

  // By default, all merchant category codes (MCC) are listed in the select field. You can edit the
  // merchantCategoryCodesUS.js and remove the codes that are not relevant to your marketplace or use a hard-coded
  // value if there is only one code you want to use.

  return isBusinessProfileNeeded ? (
    <React.Fragment>
      {showMCCForUSField ? (
        <FieldSelect
          id={`${fieldId}.mcc`}
          name={`${fieldId}.mcc`}
          className={css.selectMCC}
          autoComplete="mcc"
          disabled={disabled}
          label={mccLabel}
          validate={mccRequired}
        >
          <option disabled value="">
            {mccPlaceholder}
          </option>
          {merchantCategoryCodesUS.map(merchantCategory => (
            <option key={merchantCategory.category} value={merchantCategory.mcc}>
              {merchantCategory.label}
            </option>
          ))}
        </FieldSelect>
      ) : null}

      {showBusinessURLField ? (
        <FieldTextInput
          id={`${fieldId}.url`}
          name={`${fieldId}.url`}
          className={css.textInputRow}
          autoComplete="url"
          disabled={disabled}
          label={businessUrlLabel}
          placeholder={businessUrlPlaceholder}
          type="text"
          validate={businessUrlRequired}
        />
      ) : null}
    </React.Fragment>
  ) : null;
};

PayoutDetailsBusinessProfile.defaultProps = {
  fieldId: null,
  disabled: false,
  showBusinessURLField: false,
  showMCCForUSField: false,
};

PayoutDetailsBusinessProfile.propTypes = {
  fieldId: string,
  disabled: bool,
  showBusinessURLField: bool,
  showMCCForUSField: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default PayoutDetailsBusinessProfile;
