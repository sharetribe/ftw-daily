import React from 'react';
import { intlShape } from 'react-intl';
import { bool, object, string } from 'prop-types';
import * as validators from '../../util/validators';
import { FieldTextInput } from '../../components';

import css from './StripePaymentForm.css';

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
  const addressLine2Required = validators.required(
    intl.formatMessage({
      id: 'StripePaymentAddress.addressLine2Required',
    })
  );

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
  const stateRequired = validators.required(
    intl.formatMessage({
      id: 'StripePaymentAddress.stateRequired',
    })
  );

  const countryLabel = intl.formatMessage({ id: 'StripePaymentAddress.countryLabel' });
  const countryPlaceholder = intl.formatMessage({ id: 'StripePaymentAddress.countryPlaceholder' });
  const countryRequired = validators.required(
    intl.formatMessage({
      id: 'StripePaymentAddress.countryRequired',
    })
  );

  return (
    <div className={className ? className : css.sectionContainer}>
      <h3 className={css.subTitle}>{addressTitle}</h3>

      <FieldTextInput
        id={`${fieldId}.addressLine1`}
        name={`${fieldId}.addressLine1`}
        disabled={disabled}
        className={css.field}
        type="text"
        autoComplete="street-address-line1"
        label={addressLine1Label}
        placeholder={addressLine1Placeholder}
        validate={addressLine1Required}
        onUnmount={() => form.change(`${fieldId}.addressLine1`, undefined)}
      />

      <FieldTextInput
        id={`${fieldId}.addressLine2`}
        name={`${fieldId}.addressLine2`}
        disabled={disabled}
        className={css.field}
        type="text"
        autoComplete="street-address-line2"
        label={addressLine2Label}
        placeholder={addressLine2Placeholder}
        onUnmount={() => form.change(`${fieldId}.addressLine2`, undefined)}
      />

      <div className={css.formRow}>
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
          onChange={event => {
            const value = event.target.value;
            form.change(`${fieldId}.postalCode`, value);
            card.update({ value: { postalCode: value } });
          }}
        />

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
      </div>

      <FieldTextInput
        id={`${fieldId}.state`}
        name={`${fieldId}.state`}
        disabled={disabled}
        className={css.state}
        type="text"
        autoComplete="address-level1"
        label={stateLabel}
        placeholder={statePlaceholder}
        validate={stateRequired}
        onUnmount={() => form.change(`${fieldId}.state`, undefined)}
      />
      <FieldTextInput
        id={`${fieldId}.country`}
        name={`${fieldId}.country`}
        disabled={disabled}
        className={css.country}
        type="text"
        autoComplete="address-level1"
        label={countryLabel}
        placeholder={countryPlaceholder}
        validate={countryRequired}
        onUnmount={() => form.change(`${fieldId}.country`, undefined)}
      />
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
