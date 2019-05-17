import React from 'react';
import { intlShape } from 'react-intl';
import { bool, object, string } from 'prop-types';
import * as validators from '../../util/validators';
import { FieldTextInput } from '../../components';

import css from './StripePaymentForm.css';

const StripePaymentAddress = props => {
  const { className, intl, disabled, form, fieldId, card } = props;

  const addressTitle = intl.formatMessage({
    id:
      fieldId === 'company.address'
        ? 'PayoutDetailsForm.companyAddressTitle'
        : 'PayoutDetailsForm.streetAddressLabel',
  });

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

  const postalCodeLabel = intl.formatMessage({ id: 'PayoutDetailsForm.postalCodeLabel' });
  const postalCodePlaceholder = intl.formatMessage({
    id: 'PayoutDetailsForm.postalCodePlaceholder',
  });
  const postalCodeRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.postalCodeRequired',
    })
  );

  const cityLabel = intl.formatMessage({ id: 'PayoutDetailsForm.cityLabel' });
  const cityPlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.cityPlaceholder' });
  const cityRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.cityRequired',
    })
  );

  const stateLabel = intl.formatMessage({ id: 'PayoutDetailsForm.stateLabel' });
  const statePlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.statePlaceholder' });
  const stateRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.stateRequired',
    })
  );

  const countryLabel = intl.formatMessage({ id: 'PayoutDetailsForm.countryLabel' });
  const countryPlaceholder = intl.formatMessage({ id: 'PayoutDetailsForm.countryPlaceholder' });
  const countryRequired = validators.required(
    intl.formatMessage({
      id: 'PayoutDetailsForm.countryRequired',
    })
  );

  return (
    <div className={className ? className : css.sectionContainer}>
      <h3 className={css.subTitle}>{addressTitle}</h3>

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
