import React from 'react';
import { bool, string } from 'prop-types';
import { intlShape } from 'react-intl';
import * as validators from '../../util/validators';
import { FieldSelect, FieldTextInput } from '../../components';

import merchantCategoryCodesUS from './merchantCategoryCodesUS';
import css from './PayoutDetailsForm.css';

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
