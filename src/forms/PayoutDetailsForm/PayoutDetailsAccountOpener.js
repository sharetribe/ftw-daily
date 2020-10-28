import React from 'react';
import { bool, object, string } from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';

import PayoutDetailsAddress from './PayoutDetailsAddress';
import PayoutDetailsPersonalDetails from './PayoutDetailsPersonalDetails';

import css from './PayoutDetailsForm.module.css';

const PayoutDetailsAccountOpener = props => {
  const {
    fieldId,
    country,
    disabled,
    form,
    intl,
    showEmailField,
    showOrganizationTitleField,
    showOwnerField,
    showPersonalAddressField,
    showPersonalIdNumberField,
    showPhoneNumberField,
    values,
  } = props;

  const showOwnershipPercentageField =
    showOwnerField &&
    values &&
    values[fieldId] &&
    values[fieldId].role &&
    values[fieldId].role.find(r => r === 'owner');

  return (
    <div className={css.accountOpenerWrapper}>
      <div className={css.accountOpenerInputsWrapper}>
        <PayoutDetailsPersonalDetails
          accountType="company"
          country={country}
          disabled={disabled}
          fieldId={fieldId}
          intl={intl}
          showEmailField={showEmailField}
          showOrganizationTitleField={showOrganizationTitleField}
          showOwnerField={showOwnerField}
          showOwnershipPercentageField={!!showOwnershipPercentageField}
          showPersonalIdNumberField={showPersonalIdNumberField}
          showPhoneNumberField={showPhoneNumberField}
          sectionTitle={intl.formatMessage({ id: 'PayoutDetailsForm.accountOpenerTitle' })}
          values={values}
          form={form}
        />
        {showPersonalAddressField ? (
          <PayoutDetailsAddress
            className={css.personalAddressContainer}
            country={country}
            disabled={disabled}
            fieldId={`${fieldId}.address`}
            form={form}
            intl={intl}
          />
        ) : null}
      </div>

      <p className={css.accountOpenerInfo}>
        <FormattedMessage id="PayoutDetailsForm.accountOpenerInfoText" />
      </p>
    </div>
  );
};

PayoutDetailsAccountOpener.defaultProps = {
  disabled: false,
  showEmailField: false,
  showOrganizationTitleField: false,
  showOwnerField: false,
  showPersonalAddressField: false,
  showPersonalIdNumberField: false,
  showPhoneNumberField: false,
  values: null,
};

PayoutDetailsAccountOpener.propTypes = {
  country: string.isRequired,
  fieldId: string.isRequired,
  form: object.isRequired,
  disabled: bool,
  showEmailField: bool,
  showOrganizationTitleField: bool,
  showOwnerField: bool,
  showPersonalAddressField: bool,
  showPersonalIdNumberField: bool,
  showPhoneNumberField: bool,
  values: object,

  // from parent
  intl: intlShape.isRequired,
};

export default PayoutDetailsAccountOpener;
