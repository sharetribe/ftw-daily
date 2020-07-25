import React from 'react'
import { bool, node, string } from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import { useForm } from 'react-final-form'
import { updateListingAdHoc } from '../../containers/EditListingPage/EditListingPage.duck'
import { intlShape } from '../../util/reactIntl'
import { buildKey, uploadImage } from '../../util/s3_storage'
import { composeValidators, moneySubUnitAmountAtLeast, required } from '../../util/validators'
import { FieldTextInput, FieldCurrencyInput, SelectImage } from '../../components'
import config from '../../config'
import { formatMoney } from '../../util/currency'
import { types as sdkTypes } from '../../util/sdkLoader'
import EditListingPhotosForm from '../EditListingPhotosForm/EditListingPhotosForm'

import css from './EditListingProductsForm.css'

const { Money } = sdkTypes

const EditListingProductsProduct = (props) => {
  const {
    intl,
    disabled,
    fieldId,
    sectionTitle,
    listingId,
    product,
    updateProduct,
    ready,
    errors,
    imagesForProduct,
    onUpdateImageOrder,
    onRemoveImage,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    onChange,
    images,
    onImageUpload,
    onImageSubmit
  } = props

  console.log(props)

  const productTitle = sectionTitle || intl.formatMessage({ id: 'EditListingProductsForm.additionalProductTitle' })

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
  const productImages = images.filter((img) => _.includes(_.keys(product.photos), img.id.uuid))

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

      <div className={css.formRow}>
        <FieldCurrencyInput
          id={`${fieldId}.price`}
          name={`${fieldId}.price`}
          disabled={disabled}
          label={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductPriceTitle' })}
          placeholder={intl.formatMessage({ id: 'EditListingProductsForm.additionalProductPricePlaceholder' })}
          currencyConfig={config.currencyConfig}
          validate={priceValidators}
        />
      </div>
      <EditListingPhotosForm
        className={css.form}
        disabled={disabled}
        ready={ready}
        fetchErrors={errors}
        images={images}
        imagesToDisplay={productImages}
        onImageUpload={onImageUpload}
        onChange={onChange}
        onUpdateImageOrder={onUpdateImageOrder}
        onRemoveImage={onRemoveImage}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        onSubmit={(e) => onImageSubmit(e, product.id)}
      />
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

const mapStateToProps = (state, ownProps) => {
  return {
    currentListing: _.get(state, 'marketplaceData.entities.listing', {})[ownProps.listingId],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateListing: (listingId, data) => dispatch(updateListingAdHoc({
      id: listingId,
      publicData: {
        products: [data]
      }
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditListingProductsProduct)
