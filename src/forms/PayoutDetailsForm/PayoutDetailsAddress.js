import React from 'react';
import { bool, object, string } from 'prop-types';
import { FieldSelect, FieldTextInput } from '../../components';
import * as validators from '../../util/validators';

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
  const { country, intl, disabled, form } = props;
  const countryConfig = country ? stripeCountryConfigs(country).addressConfig : null;

  const isRequired = (countryConfig, field) => {
    return countryConfig[field];
  };

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
    <div>
      {showAddressLine ? (
        <FieldTextInput
          id="streetAddress"
          name="streetAddress"
          disabled={disabled}
          className={css.field}
          type="text"
          autoComplete="street-address"
          label={streetAddressLabel}
          placeholder={streetAddressPlaceholder}
          validate={streetAddressRequired}
          onUnmount={() => form.change('streetAddress', undefined)}
        />
      ) : null}
      <div className={css.formRow}>
        {showPostalCode ? (
          <FieldTextInput
            id="postalCode"
            name="postalCode"
            disabled={disabled}
            className={css.postalCode}
            type="text"
            autoComplete="postal-code"
            label={postalCodeLabel}
            placeholder={postalCodePlaceholder}
            validate={postalCodeRequired}
            onUnmount={() => form.change('postalCode', undefined)}
          />
        ) : null}
        {showCity ? (
          <FieldTextInput
            id="city"
            name="city"
            disabled={disabled}
            className={css.city}
            type="text"
            autoComplete="address-level2"
            label={cityLabel}
            placeholder={cityPlaceholder}
            validate={cityRequired}
            onUnmount={() => form.change('city', undefined)}
          />
        ) : null}
      </div>
      {showState ? (
        <FieldTextInput
          id="state"
          name="state"
          disabled={disabled}
          className={css.state}
          type="text"
          autoComplete="state"
          label={stateLabel}
          placeholder={statePlaceholder}
          validate={stateRequired}
          onUnmount={() => form.change('state', undefined)}
        />
      ) : null}

      {showProvince ? (
        <FieldSelect
          id="province"
          name="province"
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
};

PayoutDetailsAddress.propTypes = {
  country: string,
  disabled: bool,
  form: object.isRequired,
};

export default PayoutDetailsAddress;
