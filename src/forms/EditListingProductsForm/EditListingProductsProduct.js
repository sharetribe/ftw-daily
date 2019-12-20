import React from 'react';
import { bool, node, string } from 'prop-types';
import { intlShape } from '../../util/reactIntl';
import { composeValidators, moneySubUnitAmountAtLeast, required } from '../../util/validators';
import { FieldTextInput, FieldCurrencyInput } from '../../components';
import config from '../../config';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';

import css from './EditListingProductsForm.css';

const { Money } = sdkTypes;

const EditListingProductsProduct = props => {
  const {
    intl,
    disabled,
    fieldId,
    sectionTitle
  } = props;

  const productTitle = sectionTitle
    ? sectionTitle
    : intl.formatMessage({ id: "EditListingProductsForm.additionalProductTitle" });

  const priceRequired = required(
    intl.formatMessage({
      id: 'EditListingPricingForm.priceRequired',
    })
  );
  const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
  const minPriceRequired = moneySubUnitAmountAtLeast(
    intl.formatMessage(
      { id: 'EditListingPricingForm.priceTooLow' },
      { minPrice: formatMoney(intl, minPrice) }
    ),
    config.listingMinimumPriceSubUnits
  );
  const priceValidators = config.listingMinimumPriceSubUnits
    ? composeValidators(priceRequired, minPriceRequired)
    : priceRequired;

  return (
    <div className={css.sectionContainer}>
      <h3 className={css.subTitle}>{productTitle}</h3>
      <div className={css.formRow}>
        <FieldTextInput
          id={`${fieldId}.type`}
          name={`${fieldId}.type`}
          disabled={disabled}
          type="text"
          label={intl.formatMessage({ id: "EditListingProductsForm.additionalProductTypeTitle" })}
          placeholder={intl.formatMessage({ id: "EditListingProductsForm.additionalProductTypePlaceholder" })}
          validate={required(intl.formatMessage({ id: "EditListingProductsForm.additionalProductTypeInvalid" }))}
        />
      </div>

      <div className={css.formRow}>
        <FieldTextInput
          id={`${fieldId}.description`}
          name={`${fieldId}.description`}
          disabled={disabled}
          type="textarea"
          label={intl.formatMessage({ id: "EditListingProductsForm.additionalProductDescriptionTitle" })}
          placeholder={intl.formatMessage({ id: "EditListingProductsForm.additionalProductDescriptionPlaceholder" })}
        />
      </div>

      <div className={css.formRow}>
        <FieldCurrencyInput
          id={`${fieldId}.price`}
          name={`${fieldId}.price`}
          disabled={disabled}
          label={intl.formatMessage({ id: "EditListingProductsForm.additionalProductPriceTitle" })}
          placeholder={intl.formatMessage({ id: "EditListingProductsForm.additionalProductPricePlaceholder" })}
          currencyConfig={config.currencyConfig}
          validate={priceValidators}
        />
      </div>
    </div>
  );
};

EditListingProductsProduct.defaultProps = {
  disabled: false,
  fieldId: null,
  sectionTitle: null
};

EditListingProductsProduct.propTypes = {
  disabled: bool,
  fieldId: string,
  intl: intlShape.isRequired,
  sectionTitle: node
};

export default EditListingProductsProduct;