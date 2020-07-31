import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import React from 'react'
import { bool, node, string } from 'prop-types'
import { FieldArray } from 'react-final-form-arrays'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Field, useForm } from 'react-final-form'
import { IconAdd } from '../../assets/IconAdd'
import { IconSubtract } from '../../assets/IconSubtract'
import Button from '../../components/Button/Button';
import FieldReactSelect from '../../components/FieldReactSelect/FieldReactSelect'
import { IconButton } from '../../components/IconButton/IconButton'
import { updateListingAdHoc } from '../../containers/EditListingPage/EditListingPage.duck'
import { intlShape } from '../../util/reactIntl'
import { buildKey, uploadImage } from '../../util/s3_storage'
import { composeValidators, moneySubUnitAmountAtLeast, required } from '../../util/validators'
import { FieldTextInput, FieldCurrencyInput, SelectImage } from '../../components'
import config from '../../config'
import { formatMoney } from '../../util/currency'
import { types as sdkTypes } from '../../util/sdkLoader'

import css from './EditListingProductsForm.css'

const { Money } = sdkTypes

const EditListingProductsProduct = (props) => {
  const {
    intl,
    disabled,
    fieldId,
    sectionTitle,
    form,
    product,
    onImageSubmit,
    onImageDelete
  } = props

  const productTitle = sectionTitle || intl.formatMessage({ id: 'EditListingProductsForm.additionalProductTitle' })
  const bedTypeTitle = intl.formatMessage({ id: 'EditListingProductsForm.additionalProductBedTypeSelection' })
  const bathroomType = intl.formatMessage({ id: 'EditListingProductsForm.additionalProductBathroomTypeSelection' })
  const losDiscountTitle = intl.formatMessage({ id: 'EditListingProductsForm.additionalProductLengthOfStayDiscount' })
  const roomPhotos = intl.formatMessage({ id: 'EditListingProductsForm.additionalProductPhotosOfTheRoom' })
  const priceTitle = intl.formatMessage({ id: 'EditListingProductsForm.additionalProductPriceTitle' })

  const priceRequired = required(
    intl.formatMessage({
      id: 'EditListingPricingForm.priceRequired',
    })
  )
  const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency)
  const minPriceRequired = moneySubUnitAmountAtLeast(
    intl.formatMessage(
      { id: 'EditListingPricingForm.priceTooLow' },
      { minPrice: formatMoney(intl, minPrice) }
    ),
    config.listingMinimumPriceSubUnits
  )
  const priceValidators = config.listingMinimumPriceSubUnits
    ? composeValidators(priceRequired, minPriceRequired)
    : priceRequired

  return (
    <div className={css.sectionContainer}>
      <h3 className={css.subTitle}>{productTitle}</h3>
      <div className={css.formRow}>
        <FieldTextInput
          id={`${fieldId}.type`}
          name={`${fieldId}.type`}
          disabled={disabled}
          type="text"
          label={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductTypeTitle' })}
          placeholder={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductTypePlaceholder' })}
          validate={required(intl.formatMessage({ id: 'EditListingProductsForm.additionalProductTypeInvalid' }))}
        />
      </div>
      <div className={css.formRow}>
        <FieldTextInput
          id={`${fieldId}.description`}
          name={`${fieldId}.description`}
          disabled={disabled}
          type="textarea"
          label={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductDescriptionTitle' })}
          placeholder={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductDescriptionPlaceholder' })}
        />
      </div>
      <div className={css.sectionContainer}>
        <h3 className={css.subTitle}>{bedTypeTitle}</h3>
        <Field
          id={`${fieldId}.beds`}
          name={`${fieldId}.beds`}
          component={FieldReactSelect}
          disabled={disabled}
          options={[
            {
              value: 'one-queen',
              label: '1 Queen Bed'
            },
            {
              value: 'two-queens',
              label: '2 Queen Beds'
            },
            {
              value: 'single-twin',
              label: '1 Twin Bed'
            },
            {
              value: 'double-twins',
              label: '2 Twin Beds'
            },
            {
              value: 'dorm',
              label: 'Dorm'
            }
          ]}
        />
      </div>
      <div className={css.sectionContainer}>
        <h3 className={css.subTitle}>{bathroomType}</h3>
        <Field
          id={`${fieldId}.bathroom`}
          name={`${fieldId}.bathroom`}
          component={FieldReactSelect}
          disabled={disabled}
          options={[
            {
              value: 'private',
              label: 'Private Bathroom'
            },
            {
              value: 'shared',
              label: 'Shared Bathroom'
            }
          ]}
        />
      </div>
      <div className={css.formRow}>
        <h3 className={css.subTitle}>{priceTitle}</h3>
        <FieldCurrencyInput
          id={`${fieldId}.price`}
          name={`${fieldId}.price`}
          disabled={disabled}
          label={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductPriceSubTitle' })}
          placeholder={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductPricePlaceholder' })}
          currencyConfig={config.currencyConfig}
          validate={priceValidators}
        />
        <h3 className={css.subTitle}>{losDiscountTitle}</h3>
        <FieldArray id={`${fieldId}.lengthOfStayDiscount`} name={`${fieldId}.lengthOfStayDiscount`}>
          {({ fields }) => (
            <div style={{ marginTop: 40 }}>
              {fields.map((name, index) => (
                <div key={name} className={css.mappingRow}>
                  <div className={css.lodSection}>
                    <TextField
                      label="With normal TextField"
                      id="outlined-start-adornment"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">Days</InputAdornment>,
                      }}
                      variant="outlined"
                    />
                    <FieldTextInput
                      inputRootClass={css.numericInput}
                      id={`${name}.days`}
                      name={`${name}.days`}
                      disabled={disabled}
                      type="textarea"
                      label={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductLengthOfStayDiscountLOS' })}
                      placeholder={30}
                    />
                  </div>
                  <div className={css.lodSection}>
                    <FieldTextInput
                      inputRootClass={css.numericInput}
                      id={`${name}.percent`}
                      name={`${name}.percent`}
                      disabled={disabled}
                      type="textarea"
                      label={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductLengthOfStayDiscountPercentOff' })}
                      placeholder={25}
                    />
                  </div>
                </div>
              ))}
              <span className={css.contactWrapper}>
                <Button
                  className={css.addDiscountButton}
                  onClick={() => fields.push({ days: '', percent: '' })}
                >
                  <FormattedMessage id="EditListingProductsForm.additionalProductAddLOSDiscount" />
                </Button>
              </span>
            </div>
          )}
        </FieldArray>
      </div>
      <div className={css.formRow}>
        <h3 className={css.subTitle}>{roomPhotos}</h3>
        <SelectImage
          onUpload={(photoId) => {
            onImageSubmit(photoId, product.id)
          }}
          onDelete={(photoId) => {
            onImageDelete(photoId, product.id)
          }}
          disabled={form.getState().invalid}
          imagesToDisplay={_.keys(product.photos)}
        />
      </div>
    </div>
  )
}

EditListingProductsProduct.defaultProps = {
  disabled: false,
  fieldId: null,
  sectionTitle: null
}

EditListingProductsProduct.propTypes = {
  disabled: bool,
  fieldId: string,
  intl: intlShape.isRequired,
  sectionTitle: node
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateListingAdHoc: (update) => dispatch(updateListingAdHoc(update))
  }
}

export default connect(null, mapDispatchToProps)(EditListingProductsProduct)
