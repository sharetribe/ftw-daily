import React from 'react';
import { intlShape } from '../../util/reactIntl';
import { bool, object, string } from 'prop-types';
import config from '../../config';
import * as validators from '../../util/validators';
import getCountryCodes from '../../translations/countryCodes';
import { FieldTextInput, FieldSelect } from '../../components';

import css from './StripePaymentAddress.module.css';

const StripePaymentAddress = props => {
  const { className, intl, disabled, form, fieldId, card } = props;

  const optionalText = intl.formatMessage({
    id: 'StripePaymentAddress.optionalText',
  });

  const addressLine1Label = intl.formatMessage({
    id: 'StripePaymentAddress.addressLine1Label',
  });
  const addressLine1Placeholder = intl.formatMessage({
    id: 'StripePaymentAddress.addressLine1Placeholder',
  });
  const addressLine1Required = validators.required(
    intl.formatMessage({
      id: 'StripePaymentAddress.addressLine1Required',
    })
  );

  const addressLine2Label = intl.formatMessage(
    { id: 'StripePaymentAddress.addressLine2Label' },
    { optionalText: optionalText }
  );

  const addressLine2Placeholder = intl.formatMessage({
    id: 'StripePaymentAddress.addressLine2Placeholder',
  });

  const postalCodeLabel = intl.formatMessage({ id: 'StripePaymentAddress.postalCodeLabel' });
  const postalCodePlaceholder = intl.formatMessage({
    id: 'StripePaymentAddress.postalCodePlaceholder',
  });
  const postalCodeRequired = validators.required(
    intl.formatMessage({
      id: 'StripePaymentAddress.postalCodeRequired',
    })
  );

  const cityLabel = intl.formatMessage({ id: 'StripePaymentAddress.cityLabel' });
  const cityPlaceholder = intl.formatMessage({ id: 'StripePaymentAddress.cityPlaceholder' });
  const cityRequired = validators.required(
    intl.formatMessage({
      id: 'StripePaymentAddress.cityRequired',
    })
  );

  const stateLabel = intl.formatMessage(
    { id: 'StripePaymentAddress.stateLabel' },
    { optionalText: optionalText }
  );
  const statePlaceholder = intl.formatMessage({ id: 'StripePaymentAddress.statePlaceholder' });

  const countryLabel = intl.formatMessage({ id: 'StripePaymentAddress.countryLabel' });
  const countryPlaceholder = intl.formatMessage({ id: 'StripePaymentAddress.countryPlaceholder' });
  const countryRequired = validators.required(
    intl.formatMessage({
      id: 'StripePaymentAddress.countryRequired',
    })
  );

  const handleOnChange = event => {
    const value = event.target.value;
    form.change('postal', value);
    card.update({ value: { postalCode: value } });
  };

  // Use tha language set in config.locale to get the correct translations of the country names
  const countryCodes = getCountryCodes(config.locale);

  return (
    <div className={className ? className : css.root}>
      <div className={css.formRow}>
        <FieldTextInput
          id={`${fieldId}.addressLine1`}
          name="addressLine1"
          disabled={disabled}
          className={css.field}
          type="text"
          autoComplete="billing address-line1"
          label={addressLine1Label}
          placeholder={addressLine1Placeholder}
          validate={addressLine1Required}
          onUnmount={() => form.change('addressLine1', undefined)}
        />

        <FieldTextInput
          id={`${fieldId}.addressLine2`}
          name="addressLine2"
          disabled={disabled}
          className={css.field}
          type="text"
          autoComplete="billing address-line2"
          label={addressLine2Label}
          placeholder={addressLine2Placeholder}
          onUnmount={() => form.change('addressLine2', undefined)}
        />
      </div>
      <div className={css.formRow}>
        <FieldTextInput
          id={`${fieldId}.postalCode`}
          name="postal"
          disabled={disabled}
          className={css.field}
          type="text"
          autoComplete="billing postal-code"
          label={postalCodeLabel}
          placeholder={postalCodePlaceholder}
          validate={postalCodeRequired}
          onUnmount={() => form.change('postal', undefined)}
          onChange={event => handleOnChange(event)}
        />

        <FieldTextInput
          id={`${fieldId}.city`}
          name="city"
          disabled={disabled}
          className={css.field}
          type="text"
          autoComplete="billing address-level2"
          label={cityLabel}
          placeholder={cityPlaceholder}
          validate={cityRequired}
          onUnmount={() => form.change('city', undefined)}
        />
      </div>
      <div className={css.formRow}>
        <FieldTextInput
          id={`${fieldId}.state`}
          name="state"
          disabled={disabled}
          className={css.field}
          type="text"
          autoComplete="billing address-level1"
          label={stateLabel}
          placeholder={statePlaceholder}
          onUnmount={() => form.change('state', undefined)}
        />

        <FieldSelect
          id={`${fieldId}.country`}
          name="country"
          disabled={disabled}
          className={css.field}
          label={countryLabel}
          validate={countryRequired}
        >
          <option disabled value="">
            {countryPlaceholder}
          </option>
          {countryCodes.map(country => {
            return (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            );
          })}
        </FieldSelect>
      </div>
    </div>
  );
};
StripePaymentAddress.defaultProps = {
  country: null,
  disabled: false,
  fieldId: null,
};

StripePaymentAddress.propTypes = {
  country: string,
  disabled: bool,
  form: object.isRequired,
  fieldId: string,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default StripePaymentAddress;
