import React from 'react';
import { intlShape } from '../../util/reactIntl';
import { bool, object, string } from 'prop-types';
import * as validators from '../../util/validators';
import { FieldSelect, FieldTextInput } from '../../components';

import { stripeCountryConfigs } from './PayoutDetailsForm';
import { CA_PROVINCES, US_STATES, AU_STATES } from './statesAndProvinces';
import css from './PayoutDetailsForm.css';

const PayoutDetailsAddress = props => {
  const { className, country, intl, disabled, form, fieldId } = props;
  const countryConfig = country ? stripeCountryConfigs(country).addressConfig : null;

  const isRequired = (countryConfig, field) => {
    return countryConfig[field];
  };

  const showTitle =
    fieldId === 'company.address' ||
    fieldId === 'individual' ||
    fieldId === 'company.personalAddress';
  const addressTitle = intl.formatMessage({
    id:
      fieldId === 'company.address'
        ? 'PayoutDetailsForm.companyAddressTitle'
        : 'PayoutDetailsForm.streetAddressLabel',
  });

  const showAddressLine = country && isRequired(countryConfig, 'addressLine');

  const streetAddressLabel = intl.formatMessage({
    id: 'PayoutDetailsForm.streetAddressLabel',
  });
  const streetAddressPlaceholder = intl.formatMessage({
    id: 'PayoutDetailsForm.streetAddressPlaceholder',
  });
  const streetAddressRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.streetAddressRequired',
    })
  );

  const showPostalCode = country && isRequired(countryConfig, 'postalCode');

  const postalCodeLabel = intl.formatMessage({ id: 'PayoutDetailsForm.postalCodeLabel' });
  const postalCodePlaceholder = intl.formatMessage({
    id: 'PayoutDetailsForm.postalCodePlaceholder',
  });
  const postalCodeRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.postalCodeRequired',
    })
  );

  const showCity = country && isRequired(countryConfig, 'city');

  const cityLabel = intl.formatMessage({ id: 'PayoutDetailsForm.cityLabel' });
  const cityPlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.cityPlaceholder' });
  const cityRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.cityRequired',
    })
  );

  const showStateUS = country && isRequired(countryConfig, 'stateUS');
  const showStateAU = country && isRequired(countryConfig, 'stateAU');
  const showProvinceCA = country && isRequired(countryConfig, 'provinceCA');

  // Choose the correct list of states/provinces to the source of data for dropdown
  const states = showStateUS
    ? US_STATES
    : showProvinceCA
    ? CA_PROVINCES
    : showStateAU
    ? AU_STATES
    : [];

  // Choose the translations depending on if the text should be province or state
  const stateLabel = showProvinceCA
    ? intl.formatMessage({ id: 'PayoutDetailsForm.canadianProvinceLabel' })
    : intl.formatMessage({ id: 'PayoutDetailsForm.stateLabel' });

  const statePlaceholder = showProvinceCA
    ? intl.formatMessage({
        id: 'PayoutDetailsForm.canadianProvincePlaceholder',
      })
    : intl.formatMessage({ id: 'PayoutDetailsForm.statePlaceholder' });

  const stateRequired = showProvinceCA
    ? validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.canadianProvinceRequired',
        })
      )
    : validators.required(
        intl.formatMessage({
          id: 'PayoutDetailsForm.stateRequired',
        })
      );

  return (
    <div className={className ? className : css.sectionContainer}>
      {showTitle ? <h3 className={css.subTitle}>{addressTitle}</h3> : null}

      {showAddressLine ? (
        <FieldTextInput
          id={`${fieldId}.streetAddress`}
          name={`${fieldId}.streetAddress`}
          disabled={disabled}
          className={css.field}
          type="text"
          autoComplete="street-address"
          label={streetAddressLabel}
          placeholder={streetAddressPlaceholder}
          validate={streetAddressRequired}
          onUnmount={() => form.change(`${fieldId}.streetAddress`, undefined)}
        />
      ) : null}
      <div className={css.formRow}>
        {showPostalCode ? (
          <FieldTextInput
            id={`${fieldId}.postalCode`}
            name={`${fieldId}.postalCode`}
            disabled={disabled}
            className={css.postalCode}
            type="text"
            autoComplete="postal-code"
            label={postalCodeLabel}
            placeholder={postalCodePlaceholder}
            validate={postalCodeRequired}
            onUnmount={() => form.change(`${fieldId}.postalCode`, undefined)}
          />
        ) : null}
        {showCity ? (
          <FieldTextInput
            id={`${fieldId}.city`}
            name={`${fieldId}.city`}
            disabled={disabled}
            className={css.city}
            type="text"
            autoComplete="address-level2"
            label={cityLabel}
            placeholder={cityPlaceholder}
            validate={cityRequired}
            onUnmount={() => form.change(`${fieldId}.city`, undefined)}
          />
        ) : null}
      </div>

      {states.length > 0 ? (
        <FieldSelect
          id={`${fieldId}.state`}
          name={`${fieldId}.state`}
          disabled={disabled}
          className={css.selectCountry}
          autoComplete="address-level1"
          label={stateLabel}
          validate={stateRequired}
        >
          <option disabled value="">
            {statePlaceholder}
          </option>
          {states.map(p => (
            <option key={p.key} value={p.key}>
              {p.label}
            </option>
          ))}
        </FieldSelect>
      ) : null}
    </div>
  );
};
PayoutDetailsAddress.defaultProps = {
  country: null,
  disabled: false,
  fieldId: null,
};

PayoutDetailsAddress.propTypes = {
  country: string,
  disabled: bool,
  form: object.isRequired,
  fieldId: string,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default PayoutDetailsAddress;
