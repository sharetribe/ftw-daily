import React from 'react';
import { bool, object, string } from 'prop-types';
import { FieldSelect, FieldTextInput } from '../../components';
import * as validators from '../../util/validators';
import { intlShape } from 'react-intl';

import { stripeCountryConfigs } from './PayoutDetailsForm';
import css from './PayoutDetailsForm.css';

const CANADIAN_PROVINCES = [
  'AB',
  'BC',
  'MB',
  'NB',
  'NL',
  'NS',
  'NT',
  'NU',
  'ON',
  'PE',
  'QC',
  'SK',
  'YT',
];

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

  const showState = country && isRequired(countryConfig, 'state');

  const stateLabel = intl.formatMessage({ id: 'PayoutDetailsForm.stateLabel' });
  const statePlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.statePlaceholder' });
  const stateRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.stateRequired',
    })
  );

  const showProvince = country && isRequired(countryConfig, 'province');

  const provinceLabel = intl.formatMessage({ id: 'PayoutDetailsForm.canadianProvinceLabel' });
  const provincePlaceholder = intl.formatMessage({
    id: 'PayoutDetailsForm.canadianProvincePlaceholder',
  });
  const provinceRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.canadianProvinceRequired',
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
      {showState ? (
        <FieldTextInput
          id={`${fieldId}.state`}
          name={`${fieldId}.state`}
          disabled={disabled}
          className={css.state}
          type="text"
          autoComplete="state"
          label={stateLabel}
          placeholder={statePlaceholder}
          validate={stateRequired}
          onUnmount={() => form.change(`${fieldId}.state`, undefined)}
        />
      ) : null}

      {showProvince ? (
        <FieldSelect
          id={`${fieldId}.province`}
          name={`${fieldId}.province`}
          disabled={disabled}
          className={css.selectCountry}
          autoComplete="province"
          label={provinceLabel}
          validate={provinceRequired}
        >
          <option disabled value="">
            {provincePlaceholder}
          </option>
          {CANADIAN_PROVINCES.map(p => (
            <option key={p} value={p}>
              {intl.formatMessage({ id: `PayoutDetailsForm.canadianProvinceNames.${p}` })}
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
